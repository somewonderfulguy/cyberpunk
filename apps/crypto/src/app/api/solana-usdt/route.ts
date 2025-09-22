import { NextResponse } from 'next/server'

const isValidSolanaAddress = (address: string) => {
  const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
  return solanaAddressRegex.test(address)
}

// Known USDT (SPL) mint addresses on Solana mainnet (some wallets may show different mints)
const USDT_MINTS = new Set<string>([
  'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11BMZDT6P6w7CH', // widely-used mint
  'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB' // wallet-reported mint
])

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: 'No address provided' }, { status: 400 })
  }

  if (!isValidSolanaAddress(address)) {
    return NextResponse.json({ error: 'Invalid Solana address' }, { status: 400 })
  }

  try {
    // Query by Token Program and filter by USDT mint on the server to avoid 'could not find mint' RPC errors across nodes
    const TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'

    const accountsRes = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getTokenAccountsByOwner',
        params: [address, { programId: TOKEN_PROGRAM_ID }, { encoding: 'jsonParsed' }]
      })
    })

    const accountsData = await accountsRes.json()

    if (accountsData.error) {
      return NextResponse.json({ error: accountsData.error.message }, { status: 400 })
    }

    type ParsedTokenAccount = {
      account: {
        data: {
          parsed: {
            info: {
              mint: string
              tokenAmount: {
                uiAmount: number
                uiAmountString?: string
                amount: string
                decimals: number
              }
            }
          }
        }
      }
    }

    const accounts = (accountsData?.result?.value ?? []) as Array<ParsedTokenAccount>

    if (!accounts.length) {
      return NextResponse.json({ balance: 0 })
    }

    // Filter only USDT mint accounts and sum all UI amounts in case there are multiple token accounts
    let totalUiAmount = accounts.reduce((sum, acc) => {
      const mint = acc?.account?.data?.parsed?.info?.mint
      if (!USDT_MINTS.has(mint)) return sum
      const t = acc?.account?.data?.parsed?.info?.tokenAmount
      if (!t) return sum
      // Prefer exact calculation
      const amountNum = Number(t.amount)
      if (!Number.isNaN(amountNum) && typeof t.decimals === 'number') {
        return sum + amountNum / 10 ** t.decimals
      }
      // Fallback to uiAmountString or uiAmount
      const fromUiString = t.uiAmountString ? Number(t.uiAmountString) : undefined
      const ui = fromUiString ?? t.uiAmount
      return sum + (typeof ui === 'number' ? ui : 0)
    }, 0)

    // Fallback: if zero, try direct mint queries (some RPCs fail programId filter completeness)
    if (!totalUiAmount) {
      for (const mint of Array.from(USDT_MINTS)) {
        try {
          const mintRes = await fetch('https://api.mainnet-beta.solana.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: 1,
              method: 'getTokenAccountsByOwner',
              params: [address, { mint }, { encoding: 'jsonParsed' }]
            })
          })
          const mintData = await mintRes.json()
          if (!mintData?.result?.value) continue
          const vals = mintData.result.value as Array<ParsedTokenAccount>
          const sumMint = vals.reduce((sum, acc) => {
            const t = acc?.account?.data?.parsed?.info?.tokenAmount
            if (!t) return sum
            const amountNum = Number(t.amount)
            if (!Number.isNaN(amountNum) && typeof t.decimals === 'number') {
              return sum + amountNum / 10 ** t.decimals
            }
            const fromUiString = t.uiAmountString ? Number(t.uiAmountString) : undefined
            const ui = fromUiString ?? t.uiAmount
            return sum + (typeof ui === 'number' ? ui : 0)
          }, 0)
          totalUiAmount += sumMint
        } catch {
          // ignore and continue
        }
      }
    }

    return NextResponse.json({ balance: totalUiAmount })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching Solana USDT balance:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
