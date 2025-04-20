export const getEtherBalanceUrl = (address: string) =>
  `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=AX8E1T47R1BH42MKRGM3SW1F1RXTNDMMRB`

export const getUSDTBalanceUrl = (address: string) =>
  `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xdAC17F958D2ee523a2206206994597C13D831ec7&address=${address}&tag=latest&apikey=AX8E1T47R1BH42MKRGM3SW1F1RXTNDMMRB`

export const getMantleBalanceUrl = (address: string) =>
  `https://api.mantlescan.xyz/api?module=account&action=balance&address=${address}&tag=latest&apikey=3NDPNF8IM2E3XHAMQBQAF7D5XBRQPU2S4Q`

export const getBlastBalanceUrl = (address: string) =>
  `https://api.blastscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=VBJ6D9KKUTW862GR3XSJM3J3GKX9UG2GWR`

export const getScrollBalanceUrl = (address: string) =>
  `https://api.scrollscan.com/api?module=account&action=balance&address=${address}&tag=latest&apikey=VJBQK1AIXJ8THNVYHH7XENVUYXQRR3ITZT`

export const getOptimismBalanceUrl = (address: string) =>
  `https://api-optimistic.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=K424BIE5G9FGFEY3G6E6VNZUWBG6WVHRG3`

export const getBaseBalanceUrl = (address: string) =>
  `https://api.basescan.org/api?module=account&action=balance&address=${address}&tag=latest&apikey=BDP6D9NDXBPIA44AGZ8DTGQJFC5CFQRYFQ`

export const getZoraBalanceUrl = (address: string) =>
  `https://api.routescan.io/v2/network/mainnet/evm/8453/etherscan/api?module=account&action=balance&address=${address}&tag=latest`

export const getBtcBalanceUrl = (address: string) => `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`

export const getTonBalanceUrl = (address: string) => `https://toncenter.com/api/v2/getAddressBalance?address=${address}`

export const getTonTokensUrl = (address: string) =>
  `https://keeper.tonapi.io/v2/accounts/${encodeURIComponent(
    address
  )}/jettons?currencies=USD&supported_extensions=custom_payload`

export const getSolanaBaseUrl = (address: string) => `/api/solana?address=${address}`

export const getRatesCoingeckoUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,notcoin,the-open-network,mantle&vs_currencies=usd,uah,gbp,eur,pln,jpy`
