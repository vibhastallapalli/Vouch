// MOCK: demo data for the frontend. The listing, personas, credentials,
// commitments, nullifiers, and transaction ids are sample values; nothing here
// came from a chain or a real issuer. Shapes follow interface.md. Labeled in
// the README limitations section.

export const APP_NAME = 'Vouch'

export const LISTING = {
  id: 'LST-0007',
  title: 'Two bedroom on Marlowe Street',
  rent: 2200,
  ratio: 3,
  deposit: 2200,
  available: 'Sep 1, 2026',
}

export const HARD_BADGES = [
  { key: 'income', label: 'INCOME 3X RENT', rule: 'monthly income clears 3 times the rent' },
  { key: 'months', label: '12+ MONTHS RENTED', rule: 'at least 12 months of tenancy history' },
  { key: 'late', label: 'AT MOST 2 LATE', rule: 'no more than 2 late payments on record' },
  { key: 'deposit', label: 'DEPOSIT RETURNED', rule: 'last deposit returned in full' },
]

export const SOFT_FILTERS = [
  { key: 'moveIn', label: 'MOVE-IN BY SEP 1', matches: (p) => p.soft.moveInBySep },
  { key: 'lease12', label: '12-MONTH LEASE', matches: (p) => p.soft.leaseMonths === 12 },
  { key: 'noPets', label: 'NO PETS', matches: (p) => p.soft.pets === 'None' },
]

// Persona A applies live during the demo; B and C are already in the pool.
export const PERSONAS = [
  {
    id: 'A',
    entryNo: '0107',
    identity: 'Maya Okafor',
    commitment: 'c9d4a1…77b0',
    nullifier: '5e12f8…03aa',
    credentials: {
      income: { issuer: 'Northline Payroll', monthlyIncome: 7400, expires: '12 Jan 2027' },
      reference: { issuer: 'RentTrack Payments', monthsRented: 31, lateCount: 1, depositReturned: true },
    },
    soft: { moveIn: 'Aug 1', moveInBySep: true, leaseMonths: 12, pets: 'None', occupants: 1 },
    preApplied: false,
  },
  {
    id: 'B',
    entryNo: '0105',
    identity: 'Daniel Roy',
    commitment: '4b0e77…c2d9',
    nullifier: '9a31cd…5f02',
    credentials: {
      income: { issuer: 'Northline Payroll', monthlyIncome: 8100, expires: '03 Mar 2027' },
      reference: { issuer: 'RentTrack Payments', monthsRented: 44, lateCount: 0, depositReturned: true },
    },
    soft: { moveIn: 'Sep 15', moveInBySep: false, leaseMonths: 24, pets: 'Cat', occupants: 2 },
    preApplied: true,
    tx: '8f3a4c…c21e',
    date: '16 Jul 2026',
  },
  {
    id: 'C',
    entryNo: '0106',
    identity: 'Lena Park',
    commitment: 'e2a95c…1b44',
    nullifier: '77d0be…88c1',
    credentials: {
      income: { issuer: 'Northline Payroll', monthlyIncome: 6900, expires: '28 Feb 2027' },
      reference: { issuer: 'RentTrack Payments', monthsRented: 19, lateCount: 2, depositReturned: true },
    },
    soft: { moveIn: 'Aug 15', moveInBySep: true, leaseMonths: 12, pets: 'Dog', occupants: 2 },
    preApplied: true,
    tx: 'd90b17…44aa',
    date: '17 Jul 2026',
  },
]

export const APPLY_TX = '4b21e7…8d3f'
export const COMMIT_TX = 'a90c44…17de'
export const REVEAL_TX = '7c31be…e402'

export const SEED_EVENTS = [
  { no: '0106', date: '17 Jul 2026', event: 'Application recorded', detail: 'Nullifier 77d0be…88c1', tx: 'd90b17…44aa', kind: 'recorded' },
  { no: '0105', date: '16 Jul 2026', event: 'Application recorded', detail: 'Nullifier 9a31cd…5f02', tx: '8f3a4c…c21e', kind: 'recorded' },
  { no: '0104', date: '16 Jul 2026', event: 'Listing opened', detail: 'LST-0007 · rent 2,200 · deposit 2,200', tx: '21c8e0…9f3b', kind: 'recorded' },
]

export const today = () =>
  new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
