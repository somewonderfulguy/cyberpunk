import request from '@repo/shared/utils/request'

import {
  ToUsd,
  EthScan,
  BtcScan,
  TonScan,
  SolScan,
  NotScan
} from './balanceTypes'
import {
  getRatesCoingeckoUrl,
  getBlastBalanceUrl,
  getBtcBalanceUrl,
  getEtherBalanceUrl,
  getScrollBalanceUrl,
  getOptimismBalanceUrl,
  getBaseBalanceUrl,
  getZoraBalanceUrl,
  getTonBalanceUrl,
  getTonTokensUrl,
  getSolanaBaseUrl
} from './balanceUrls'

export const getRatesCoingecko = () => request<ToUsd>(getRatesCoingeckoUrl)

export const getEtherBalance = (address: string) =>
  request<EthScan>(getEtherBalanceUrl(address))

export const getBlastBalance = (address: string) =>
  request<EthScan>(getBlastBalanceUrl(address))

export const getScrollBalance = (address: string) =>
  request<EthScan>(getScrollBalanceUrl(address))

export const getOptimismBalance = (address: string) =>
  request<EthScan>(getOptimismBalanceUrl(address))

export const getBaseBalance = (address: string) =>
  request<EthScan>(getBaseBalanceUrl(address))

export const getZoraBalance = (address: string) =>
  request<EthScan>(getZoraBalanceUrl(address))

export const getBtcBalance = (address: string) =>
  request<BtcScan>(getBtcBalanceUrl(address))

export const getTonBalance = (address: string) =>
  request<TonScan>(getTonBalanceUrl(address))

export const getTonTokens = (address: string) =>
  request<NotScan>(getTonTokensUrl(address))

export const getSolBalance = (address: string) =>
  request<SolScan>(getSolanaBaseUrl(address))