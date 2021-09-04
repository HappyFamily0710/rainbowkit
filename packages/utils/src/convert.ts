import { chains } from './chains'

export const connectorByWallet = (name: string) => {
  switch (name) {
    case 'metamask':
    case 'trust':
      return 'Injected'
    case 'coinbase':
    case 'walletlink':
      return 'WalletLink'
  }
}

export const walletByConnector = (connector: string) => {
  switch (connector) {
    case 'InjectedConnector':
      return 'metamask'
    case 'WalletLinkConnector':
      return 'coinbase'
  }
}

export const chainNametoID = (name: string) => {
  return chains.find((chain) => chain.aliases.includes(name)).chainId
}

export const chainIDToToken = (id: number) => {
  return chains.find((chain) => chain.chainId === id).nativeCurrency.symbol
}

export const chainIDToExplorer = (id: number) => {
  return chains.find((chain) => chain.chainId === (!id || id === 0 ? 1 : id)).explorers[0]
}
