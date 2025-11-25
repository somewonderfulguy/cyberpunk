// old https://api.etherscan.io/api?&action=balance&apikey=YourEtherscanApiKey
// new https://api.etherscan.io/v2/api?chainid=1&action=balance&apikey=YourEtherscanApiKey

export const getEtherBalanceUrl = (address: string) =>
  `https://api.etherscan.io/v2/api?chainid=1&module=account&action=balance&address=${address}&tag=latest&apikey=AX8E1T47R1BH42MKRGM3SW1F1RXTNDMMRB`

export const getUSDTBalanceUrl = (address: string) =>
  `https://api.etherscan.io/v2/api?chainid=1&module=account&action=tokenbalance&contractaddress=0xdAC17F958D2ee523a2206206994597C13D831ec7&address=${address}&tag=latest&apikey=AX8E1T47R1BH42MKRGM3SW1F1RXTNDMMRB`

export const getMantleBalanceUrl = (address: string) =>
  `https://api.etherscan.io/v2/api?chainid=5000&module=account&action=balance&address=${address}&tag=latest&apikey=AX8E1T47R1BH42MKRGM3SW1F1RXTNDMMRB`

export const getBlastBalanceUrl = (address: string) =>
  `https://api.etherscan.io/v2/api?chainid=81457&module=account&action=balance&address=${address}&tag=latest&apikey=AX8E1T47R1BH42MKRGM3SW1F1RXTNDMMRB`

export const getScrollBalanceUrl = (address: string) =>
  `https://api.etherscan.io/v2/api?chainid=534352&module=account&action=balance&address=${address}&tag=latest&apikey=AX8E1T47R1BH42MKRGM3SW1F1RXTNDMMRB`

export const getOptimismBalanceUrl = (address: string) =>
  `https://api.etherscan.io/v2/api?chainid=10&module=account&action=balance&address=${address}&tag=latest&apikey=AX8E1T47R1BH42MKRGM3SW1F1RXTNDMMRB`

export const getBaseBalanceUrl = (address: string) =>
  `https://api.etherscan.io/v2/api?chainid=8453&module=account&action=balance&address=${address}&tag=latest&apikey=AX8E1T47R1BH42MKRGM3SW1F1RXTNDMMRB`

export const getZoraBalanceUrl = (address: string) =>
  `https://api.etherscan.io/v2/api?chainid=7777777&module=account&action=balance&address=${address}&tag=latest&apikey=AX8E1T47R1BH42MKRGM3SW1F1RXTNDMMRB`

export const getBtcBalanceUrl = (address: string) => `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`

export const getTonBalanceUrl = (address: string) => `https://toncenter.com/api/v2/getAddressBalance?address=${address}`

export const getTonTokensUrl = (address: string) =>
  `https://keeper.tonapi.io/v2/accounts/${encodeURIComponent(
    address
  )}/jettons?currencies=USD&supported_extensions=custom_payload`

export const getSolanaBaseUrl = (address: string) => `/api/solana?address=${address}`

export const getRatesCoingeckoUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,notcoin,the-open-network,mantle,tron&vs_currencies=usd,uah,gbp,eur,pln,jpy`

export const getSolanaUsdtUrl = (address: string) => `/api/solana-usdt?address=${address}`
