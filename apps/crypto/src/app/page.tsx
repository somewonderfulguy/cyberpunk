'use client'

import TonWeb from 'tonweb'

import classNames from '@repo/shared/utils/classNames'

import {
  useGetRatesCoingecko,
  useGetEtherBalance,
  useGetBtcBalance,
  useGetTonBalance,
  useGetSolBalance,
  useTonTokens,
  useGetUSDTBalance,
  useGetMantleBalance
} from '../apiClient/balance'
import { formatFiat } from '../utils'

import { btcWallet, ethWallet1, ethWallet2, ethWallet3, solWallet, tonWallet } from './wallets'

import styles from './Crypto.module.css'

const tonWeb = tonWallet ? new TonWeb.utils.Address(tonWallet) : null
const hashPartHex = (tonWeb ? Array.from(tonWeb.hashPart) : null)
  ?.map((byte) => byte.toString(16).padStart(2, '0')) // Convert each byte to a hex string and pad with zeros if necessary
  .join('')
const tonRawHexAddress = `${tonWeb?.wc}:${hashPartHex}`

const getSumEth = (balancesWei: string[], rate: number) => {
  const sumWei = balancesWei.reduce((acc, wei) => acc + parseInt(wei), 0)
  const sumEth = sumWei / 1e18
  const sumUst = sumEth * rate

  return {
    ethFull: sumEth,
    ethShort: sumEth.toFixed(4),
    ustFull: sumUst,
    ustShort: formatFiat(sumUst, 'usd')
  }
}

const initialData = { balance: 0, balanceShort: 0 }

const CryptoApp = () => {
  const { data: rates } = useGetRatesCoingecko()
  const { data: etherBalance1 } = useGetEtherBalance(ethWallet1)
  const { data: etherBalance2 } = useGetEtherBalance(ethWallet2)
  const { data: etherBalance3 } = useGetEtherBalance(ethWallet3)
  const { data: etherBalance1Usdt1 } = useGetUSDTBalance(ethWallet1)
  const { data: etherBalance1Usdt2 } = useGetUSDTBalance(ethWallet2)
  const { data: etherBalance1Usdt3 } = useGetUSDTBalance(ethWallet3)
  const { data: { balance: btc, balanceShort: btcShort } = initialData } = useGetBtcBalance(btcWallet)
  const { data: solBalance } = useGetSolBalance(solWallet)
  const { data: tonBalance } = useGetTonBalance(tonWallet)
  const { data: tonTokens } = useTonTokens(tonRawHexAddress)
  const { data: mantleBalance } = useGetMantleBalance(ethWallet1)

  const notcoin = tonTokens?.balances.find((balance) => balance.jetton.name === 'Notcoin')
  const notcoinRawBalance = +(notcoin?.balance ?? 0)
  const notBalance = notcoinRawBalance / 1e9
  const notInUst = notBalance * (rates?.notcoin.usd ?? 1)

  const tonUsdt = tonTokens?.balances.find((balance) => balance.jetton.name === 'Tether USD')
  const tonUsdtDecimals = tonUsdt?.jetton.decimals ?? 0
  const tonUsdtBalance = +(tonUsdt?.balance ?? 0) / 10 ** tonUsdtDecimals

  const tonRawBalance = +(tonBalance?.result ?? 0) / 1_000_000_000 // 1e9
  const tonInUst = tonRawBalance * (rates?.['the-open-network'].usd ?? 1)

  const solRawBalance = +(solBalance?.balance ?? 0)
  const solInNative = solRawBalance / 1_000_000_000 // 1e9
  const solInUst = solInNative * (rates?.solana.usd ?? 1)

  const btcRate = rates?.bitcoin.usd ?? NaN
  const btcUst = btc * btcRate || 0

  const usdt1 = Number(etherBalance1Usdt1?.result) / 1e6 || 0
  const usdt2 = Number(etherBalance1Usdt2?.result) / 1e6 || 0
  const usdt3 = Number(etherBalance1Usdt3?.result) / 1e6 || 0

  const mantle = +(mantleBalance?.result ?? 0) / 1e18
  const mantleInUst = mantle * (rates?.mantle.usd ?? 1)

  const sumEth1 = getSumEth([etherBalance1?.result ?? '0'], rates?.ethereum.usd ?? NaN)
  const sumEth2 = getSumEth([etherBalance2?.result ?? '0'], rates?.ethereum.usd ?? NaN)
  const sumEth3 = getSumEth([etherBalance3?.result ?? '0'], rates?.ethereum.usd ?? NaN)

  const sum =
    sumEth1.ustFull +
    sumEth2.ustFull +
    sumEth3.ustFull +
    btcUst +
    tonInUst +
    notInUst +
    solInUst +
    tonUsdtBalance +
    usdt1 +
    usdt2 +
    usdt3 +
    mantleInUst

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h1 className={styles.h1}>Crypto Balance</h1>
        <p title={String(sum)} className={styles.overallBalance}>
          {formatFiat(sum, 'usd')}
        </p>
      </div>

      <div className={styles.grid}>
        <div>
          <h2 className={classNames(styles.h2, styles.headerSpace)}>
            Bitcoin <span className={styles.titleNote}>BTC</span>
          </h2>
          <p className={styles.cryptoCurrencyPrice}>
            Price:{' '}
            {formatFiat(rates?.bitcoin.usd ?? 0, 'usd', {
              maximumSignificantDigits: 21
            })}
          </p>
          <p style={{ marginBottom: 16 }}>
            Wallet:{' '}
            <span title={btcWallet}>
              {/* TODO: add copy */}
              {btcWallet.slice(0, 7)}...{btcWallet.slice(-5)}
            </span>
          </p>
          <div title={String(btc)}>{btcShort} BTC</div>
          <div title={formatFiat(btcUst, 'usd')}>{formatFiat(btcUst, 'usd')}</div>

          <h2 className={classNames(styles.h2, styles.headerSpace)}>
            Solana <span className={styles.titleNote}>SOL</span>
          </h2>
          <p className={styles.cryptoCurrencyPrice}>
            Price:{' '}
            {formatFiat(rates?.solana.usd ?? 0, 'usd', {
              maximumSignificantDigits: 21
            })}
          </p>
          <p style={{ marginBottom: 16 }}>
            Wallet:{' '}
            <span title={solWallet}>
              {/* TODO: add copy */}
              {solWallet.slice(0, 7)}...{solWallet.slice(-5)}
            </span>
          </p>
          <div title={String(0)}>
            <div title={String(solInNative)}>{solInNative.toFixed(4)} SOL</div>
            <div title={String(solInUst)}>{formatFiat(solInUst, 'usd')}</div>
          </div>

          <h2 className={classNames(styles.h2, styles.headerSpace)}>
            Mantle <span className={styles.titleNote}>MNT</span>
          </h2>
          <p className={styles.cryptoCurrencyPrice}>
            Price:{' '}
            {formatFiat(rates?.mantle.usd ?? 0, 'usd', {
              maximumSignificantDigits: 21
            })}
          </p>
          <p style={{ marginBottom: 16 }}>
            Wallet:{' '}
            <span title={ethWallet1}>
              {/* TODO: add copy */}
              {ethWallet1.slice(0, 7)}...{ethWallet1.slice(-5)}
            </span>
          </p>
          <div title={String(mantle)}>{mantle.toFixed(4)} MNT</div>
          <div title={String(mantleInUst)}>{formatFiat(mantleInUst, 'usd')}</div>
        </div>

        <div>
          <div>
            <h2 className={classNames(styles.h2, styles.headerSpace)}>
              Ethereum <span className={styles.titleNote}>ETH</span>
            </h2>
            <p className={styles.cryptoCurrencyPrice}>
              Price:{' '}
              {formatFiat(rates?.ethereum.usd ?? 0, 'usd', {
                maximumSignificantDigits: 21
              })}
            </p>
            <p style={{ marginBottom: 16 }}>
              Wallet:{' '}
              <span title={ethWallet1}>
                {/* TODO: add copy */}
                {ethWallet1.slice(0, 7)}...{ethWallet1.slice(-5)}
              </span>
            </p>
            <div title={String(sumEth1.ethFull)}>{sumEth1.ethShort} ETH</div>
            <div title={String(sumEth1.ustFull)}>{sumEth1.ustShort}</div>

            <h3 className={classNames(styles.h3, styles.headerSpace)}>USDT</h3>
            <div title={String(usdt1)}>{formatFiat(usdt1, 'usd')}</div>
          </div>
          <div>
            <h2 className={classNames(styles.h2, styles.headerSpace)}>
              Ethereum <span className={styles.titleNote}>ETH</span>
            </h2>
            <p className={styles.cryptoCurrencyPrice}>
              Price:{' '}
              {formatFiat(rates?.ethereum.usd ?? 0, 'usd', {
                maximumSignificantDigits: 21
              })}
            </p>
            <p style={{ marginBottom: 16 }}>
              Wallet:{' '}
              <span title={ethWallet2}>
                {/* TODO: add copy */}
                {ethWallet2.slice(0, 7)}...{ethWallet2.slice(-5)}
              </span>
            </p>
            <div title={String(sumEth2.ethFull)}>{sumEth2.ethShort} ETH</div>
            <div title={String(sumEth2.ustFull)}>{sumEth2.ustShort}</div>

            <h3 className={classNames(styles.h3, styles.headerSpace)}>USDT</h3>
            <div title={String(usdt2)}>{formatFiat(usdt2, 'usd')}</div>
          </div>
          <div>
            <h2 className={classNames(styles.h2, styles.headerSpace)}>
              Ethereum <span className={styles.titleNote}>ETH</span>
            </h2>
            <p className={styles.cryptoCurrencyPrice}>
              Price:{' '}
              {formatFiat(rates?.ethereum.usd ?? 0, 'usd', {
                maximumSignificantDigits: 21
              })}
            </p>
            <p style={{ marginBottom: 16 }}>
              Wallet:{' '}
              <span title={ethWallet3}>
                {/* TODO: add copy */}
                {ethWallet3.slice(0, 7)}...{ethWallet3.slice(-5)}
              </span>
            </p>
            <div title={String(sumEth3.ethFull)}>{sumEth3.ethShort} ETH</div>
            <div title={String(sumEth3.ustFull)}>{sumEth3.ustShort}</div>

            <h3 className={classNames(styles.h3, styles.headerSpace)}>USDT</h3>
            <div title={String(usdt3)}>{formatFiat(usdt3, 'usd')}</div>
          </div>
        </div>

        <div>
          <h2 className={classNames(styles.h2, styles.headerSpace)}>
            TON <span className={styles.titleNote}>TON</span>
          </h2>
          <p className={styles.cryptoCurrencyPrice}>
            Price:{' '}
            {formatFiat(rates?.['the-open-network'].usd ?? 0, 'usd', {
              maximumSignificantDigits: 21
            })}
          </p>
          <p style={{ marginBottom: 16 }}>
            Wallet:{' '}
            <span title={tonWallet}>
              {/* TODO: add copy */}
              {tonWallet.slice(0, 7)}...{tonWallet.slice(-5)}
            </span>
          </p>
          <div title={String(tonRawBalance)}>{tonRawBalance.toFixed(4)} TON</div>
          <div title={String(tonInUst)}>{formatFiat(tonInUst, 'usd')}</div>

          <h3 className={classNames(styles.h3, styles.headerSpace)}>NOT</h3>
          <p className={styles.cryptoCurrencyPrice}>
            Price:{' '}
            {formatFiat(rates?.notcoin.usd ?? 0, 'usd', {
              maximumSignificantDigits: 21
            })}
          </p>
          <div title={String(notcoinRawBalance)}>{notBalance.toFixed(4)} NOT</div>
          <div title={String(notInUst)}>{formatFiat(notInUst, 'usd')}</div>

          <h3 className={classNames(styles.h3, styles.headerSpace)}>Tether USD</h3>
          <div title={String(tonUsdtBalance)}>{tonUsdtBalance.toFixed(2)} USDT</div>
        </div>
      </div>
    </div>
  )
}

export default CryptoApp
