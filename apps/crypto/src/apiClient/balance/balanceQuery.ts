import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { TronWeb } from 'tronweb'

import request from '@repo/shared/utils/request'

import { ToUsd, EthScan, BtcScan, TonScan, SolScan, TonJettonsScan, TransformedBalance } from './balanceTypes'
import {
  getBlastBalance,
  getEtherBalance,
  getRatesCoingecko,
  getScrollBalance,
  getOptimismBalance,
  getBaseBalance,
  getZoraBalance,
  getTonBalance,
  getTonTokens,
  getSolBalance,
  getSolUsdtBalance,
  getUSDTBalance,
  getMantleBalance
} from './balanceApi'

type QueryOptions<T> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>

const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
  headers: { 'TRON-PRO-API-KEY': 'c86f1038-8c84-4f2f-8ac5-9957bcf4b589' }
})

const USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'

const getUSDTBalanceTron = async (address: string) => {
  tronWeb.setAddress(address)

  const contract = await tronWeb.contract().at(USDT_CONTRACT)

  const balanceRaw = (await contract.methods.balanceOf(address).call()) as unknown as bigint
  const decimalsRaw = (await contract.methods.decimals().call()) as unknown as bigint

  const balance = BigInt(balanceRaw)
  const decimals = BigInt(decimalsRaw)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Number(balance) / Number(10n ** decimals)
}

const getTronBalance = async (address: string) => {
  const balance = await tronWeb.trx.getBalance(address)
  const adjusted = tronWeb.toBigNumber(balance).dividedBy(1e6) // Adjust for TRX decimals
  return Number(adjusted)
}

export const useGetUSDTBalanceTron = (address: string, options: QueryOptions<unknown> = {}) =>
  useQuery<unknown>({
    queryKey: ['usdtBalanceTron', address],
    queryFn: () => getUSDTBalanceTron(address),
    ...options
  })

export const useGetTronBalance = (address: string, options: QueryOptions<unknown> = {}) =>
  useQuery<unknown>({
    queryKey: ['tronBalance', address],
    queryFn: () => getTronBalance(address),
    ...options
  })

export const useGetRatesCoingecko = (options: QueryOptions<ToUsd> = {}) =>
  useQuery<ToUsd>({
    queryKey: ['ratesCoinGecko'],
    queryFn: getRatesCoingecko,
    ...options
  })

export const useGetBtcBalance = (address: string, options: QueryOptions<TransformedBalance> = {}) =>
  useQuery<TransformedBalance>({
    queryKey: ['btcBalance', address],
    queryFn: () =>
      request<BtcScan>(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`).then(
        ({ final_balance }) => ({
          balance: final_balance / 1e8,
          balanceShort: +(final_balance / 1e8).toFixed(4)
        })
      ),
    ...options
  })

export const useGetEtherBalance = (address: string, options: QueryOptions<EthScan> = {}) =>
  useQuery<EthScan>({
    queryKey: ['ethBalance', address],
    queryFn: () => getEtherBalance(address),
    ...options
  })

export const useGetUSDTBalance = (address: string, options: QueryOptions<EthScan> = {}) =>
  useQuery<EthScan>({
    queryKey: ['usdtBalance', address],
    queryFn: () => getUSDTBalance(address),
    ...options
  })

export const useGetMantleBalance = (address: string, options: QueryOptions<EthScan> = {}) =>
  useQuery<EthScan>({
    queryKey: ['mantleBalance', address],
    queryFn: () => getMantleBalance(address),
    ...options
  })

export const useGetBlastBalance = (address: string, options: QueryOptions<EthScan> = {}) =>
  useQuery<EthScan>({
    queryKey: ['blastBalance', address],
    queryFn: () => getBlastBalance(address),
    ...options
  })

export const useGetScrollBalance = (address: string, options: QueryOptions<EthScan> = {}) =>
  useQuery<EthScan>({
    queryKey: ['scrollBalance', address],
    queryFn: () => getScrollBalance(address),
    ...options
  })

export const useGetOptimismBalance = (address: string, options: QueryOptions<EthScan> = {}) =>
  useQuery<EthScan>({
    queryKey: ['optimismBalance', address],
    queryFn: () => getOptimismBalance(address),
    ...options
  })

export const useGetBaseBalance = (address: string, options: QueryOptions<EthScan> = {}) =>
  useQuery<EthScan>({
    queryKey: ['baseBalance', address],
    queryFn: () => getBaseBalance(address),
    ...options
  })

export const useGetZoraBalance = (address: string, options: QueryOptions<EthScan> = {}) =>
  useQuery<EthScan>({
    queryKey: ['zoraBalance', address],
    queryFn: () => getZoraBalance(address),
    ...options
  })

export const useGetTonBalance = (address: string, options: QueryOptions<TonScan> = {}) =>
  useQuery<TonScan>({
    queryKey: ['tonBalance', address],
    queryFn: () => getTonBalance(address),
    ...options
  })

export const useTonTokens = (address: string, options: QueryOptions<TonJettonsScan> = {}) =>
  useQuery<TonJettonsScan>({
    queryKey: ['notBalance', address],
    queryFn: () => getTonTokens(address),
    ...options
  })

export const useGetSolBalance = (address: string, options: QueryOptions<SolScan> = {}) =>
  useQuery<SolScan>({
    queryKey: ['solBalance', address],
    queryFn: () => getSolBalance(address),
    ...options
  })

export const useGetSolUsdtBalance = (address: string, options: QueryOptions<SolScan> = {}) =>
  useQuery<SolScan>({
    queryKey: ['solUsdtBalance', address],
    queryFn: () => getSolUsdtBalance(address),
    ...options
  })
