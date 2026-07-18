// Chain wiring for the Midnight stack. The connected wallet's configuration
// is the source of truth for node, indexer, and proof server URIs; nothing
// here is hardcoded, per the platform's privacy rules.

import { NETWORK_ID } from './wallet.js'

// Deployed rentpool contract address on preprod. Empty until the deploy task
// lands. While it is empty every screen runs the labeled demo simulation and
// the desk drawer reads DEPLOY PENDING; setting it is the switch that turns
// chain mode on. The proving key material it will need is already served at
// /zk/rentpool (see vite.config.js).
export const CONTRACT_ADDRESS = ''

// Read the wallet's provider configuration. Returns null for the mock wallet
// fallback, which has no configuration API.
export async function readWalletConfig(api) {
  if (!api || typeof api.getConfiguration !== 'function') return null
  const cfg = await api.getConfiguration()
  return {
    networkId: cfg.networkId,
    indexerUri: cfg.indexerUri,
    indexerWsUri: cfg.indexerWsUri,
    proverServerUri: cfg.proverServerUri,
    substrateNodeUri: cfg.substrateNodeUri,
    networkMatches: cfg.networkId === NETWORK_ID,
  }
}

// Reachability probe for the wallet-configured proof server. Opaque no-cors
// fetch: resolves if anything answers on the address, throws if nothing does.
export async function probeProofServer(uri) {
  if (!uri) return false
  try {
    await fetch(uri, { mode: 'no-cors' })
    return true
  } catch {
    return false
  }
}
