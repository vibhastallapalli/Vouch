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

// Numeric preference fields. The applicant sets their own value (self-claimed,
// unproven); the landlord filters each with a direction (gte/lte) + target.
// dir/target here are the defaults applied when a filter is first switched on.
export const SOFT_FIELDS = [
  { key: 'leaseMonths', label: 'LEASE LENGTH', unit: 'MO', min: 6, max: 36, step: 6, dir: 'gte', target: 18 },
  { key: 'moveInWeeks', label: 'MOVE-IN WITHIN', unit: 'WK', min: 1, max: 12, step: 1, dir: 'lte', target: 4 },
  { key: 'occupants', label: 'OCCUPANTS', unit: '', min: 1, max: 6, step: 1, dir: 'lte', target: 2 },
  { key: 'pets', label: 'PETS', unit: '', min: 0, max: 4, step: 1, dir: 'lte', target: 1 },
]

// Persona A applies live during the demo; the rest are already in the pool.
// Everyone clears the proven badges by construction, so the spread lives in the
// soft fields: A and B are the two top contenders (identical except B moves in a
// week sooner), C-F are middling, G-J are weak. Only A's credentials are ever
// rendered, so the pre-applied ghosts carry just what the pool and ledger show.
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
    soft: { leaseMonths: 24, moveInWeeks: 2, occupants: 1, pets: 0 },
    preApplied: false,
  },
  {
    id: 'B',
    entryNo: '0105',
    identity: 'Daniel Roy',
    commitment: '4b0e77…c2d9',
    nullifier: '9a31cd…5f02',
    soft: { leaseMonths: 24, moveInWeeks: 1, occupants: 1, pets: 0 },
    note: {
      brief: 'Relocating for a hospital job, can start early.',
      full: 'Moving in for a nursing role at the regional hospital. I can sign and start paying as soon as the unit is ready and I am flexible on the exact date. Quiet, no pets, hoping to stay several years.',
    },
    preApplied: true,
    tx: '8f3a4c…c21e',
    date: '17 Jul 2026',
  },
  {
    id: 'C',
    entryNo: '0106',
    identity: 'Lena Park',
    commitment: 'e2a95c…1b44',
    nullifier: '77d0be…88c1',
    soft: { leaseMonths: 12, moveInWeeks: 6, occupants: 2, pets: 1 },
    preApplied: true,
    tx: 'd90b17…44aa',
    date: '17 Jul 2026',
  },
  {
    id: 'D',
    entryNo: '0110',
    identity: 'Priya Shah',
    commitment: '1f7c30…a2e8',
    nullifier: '3b8e21…9c04',
    soft: { leaseMonths: 18, moveInWeeks: 5, occupants: 2, pets: 0 },
    note: {
      brief: 'Two remote workers, no pets, long-term.',
      full: 'My partner and I both work from home and want a stable long-term place. We keep to ourselves and can share references from our current landlord if that helps.',
    },
    preApplied: true,
    tx: 'a1b2c3…d4e5',
    date: '16 Jul 2026',
  },
  {
    id: 'E',
    entryNo: '0111',
    identity: 'Sam Ellis',
    commitment: '7a2d90…4f1b',
    nullifier: '2c9f57…b310',
    soft: { leaseMonths: 12, moveInWeeks: 4, occupants: 3, pets: 1 },
    note: {
      brief: 'Small family, one cat, need move-in flexibility.',
      full: 'Family of three with one well-behaved cat. Our current lease ends soon so we would need about a month of flexibility on move-in, and we are happy to sign a longer lease for the right place.',
    },
    preApplied: true,
    tx: 'b2c3d4…e5f6',
    date: '16 Jul 2026',
  },
  {
    id: 'F',
    entryNo: '0112',
    identity: 'Tom Becker',
    commitment: '0e5b46…d7c2',
    nullifier: '8f14a0…6e2d',
    soft: { leaseMonths: 12, moveInWeeks: 8, occupants: 2, pets: 2 },
    preApplied: true,
    tx: 'c3d4e5…f607',
    date: '15 Jul 2026',
  },
  {
    id: 'G',
    entryNo: '0113',
    identity: 'Rob Nunez',
    commitment: 'b3c8f1…2a90',
    nullifier: '4d70e9…1f5c',
    soft: { leaseMonths: 6, moveInWeeks: 10, occupants: 4, pets: 2 },
    preApplied: true,
    tx: 'd4e5f6…0718',
    date: '15 Jul 2026',
  },
  {
    id: 'H',
    entryNo: '0114',
    identity: 'Casey Wood',
    commitment: '66a2be…09d3',
    nullifier: 'c018f4…7b62',
    soft: { leaseMonths: 6, moveInWeeks: 12, occupants: 5, pets: 1 },
    preApplied: true,
    tx: 'e5f607…1829',
    date: '14 Jul 2026',
  },
  {
    id: 'I',
    entryNo: '0115',
    identity: 'Nadia Haddad',
    commitment: '90fe12…3c8a',
    nullifier: '5a2d0b…e491',
    soft: { leaseMonths: 6, moveInWeeks: 9, occupants: 3, pets: 3 },
    preApplied: true,
    tx: 'f60718…293a',
    date: '14 Jul 2026',
  },
  {
    id: 'J',
    entryNo: '0116',
    identity: 'Wes Carter',
    commitment: '2d47c9…b015',
    nullifier: 'e83f16…0a7d',
    soft: { leaseMonths: 12, moveInWeeks: 11, occupants: 4, pets: 2 },
    preApplied: true,
    tx: '071829…3a4b',
    date: '13 Jul 2026',
  },
]

export const APPLY_TX = '4b21e7…8d3f'
export const COMMIT_TX = 'a90c44…17de'
export const REVEAL_TX = '7c31be…e402'

// Ledger seed: one recorded application per pre-applied persona (keeps the pool
// and the public register in sync), plus the listing-opened event.
export const SEED_EVENTS = [
  ...PERSONAS.filter((p) => p.preApplied).map((p) => ({
    no: p.entryNo,
    date: p.date,
    event: 'Application recorded',
    detail: 'Nullifier ' + p.nullifier,
    tx: p.tx,
    kind: 'recorded',
  })),
  { no: '0104', date: '13 Jul 2026', event: 'Listing opened', detail: 'LST-0007 · rent 2,200 · deposit 2,200', tx: '21c8e0…9f3b', kind: 'recorded' },
]

export const today = () =>
  new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
