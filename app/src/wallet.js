// Midnight DApp connector wiring. The wallet extension injects its API under
// window.midnight keyed by a per-wallet UUID, so wallets must be enumerated,
// never read from a fixed key.

export const NETWORK_ID = 'preprod' // must match the network selected in the Lace extension

export const listWallets = () =>
  Object.values(window.midnight ?? {}).filter((w) => w && typeof w.connect === 'function')

export const shortAddress = (a) => (a.length > 17 ? a.slice(0, 10) + '···' + a.slice(-4) : a)

export async function connectWallet(w) {
  if ((w.apiVersion ?? '').split('.')[0] !== '4') {
    throw new Error('Wallet connector version ' + w.apiVersion + ' is not supported. Expected 4.x.')
  }
  try {
    const api = await w.connect(NETWORK_ID)
    const { unshieldedAddress } = await api.getUnshieldedAddress()
    return { api, address: unshieldedAddress }
  } catch (err) {
    // Connector errors are plain objects ({type, code, reason}), never Error instances
    if (err && err.code === 'PermissionRejected') {
      throw new Error('Connection request was declined in the wallet.')
    }
    throw new Error((err && err.reason) || 'Wallet connection failed. Check that Lace is unlocked and set to ' + NETWORK_ID + '.')
  }
}
