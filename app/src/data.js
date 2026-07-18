// MOCK: demo data for the frontend. The listing, personas, credentials,
// commitments, nullifiers, and transaction ids are sample values; nothing here
// came from a chain or a real issuer. Shapes follow interface.md. Labeled in
// the README limitations section.

export const LISTING = {
  id: 'LST-0007',
  title: 'Two bedroom on Marlowe Street',
  rent: 2200,
  ratio: 3,
  minMonths: 12,
  maxLate: 1,
  deposit: 2200,
  maxReveals: 3,
}

// Hard badges, all required, all or nothing (interface.md section 6)
export const BADGES = [
  {
    key: 'income',
    label: 'Income ratio',
    requirement: (L) => `income at least ${L.ratio}x rent`,
    pass: (p, L) => p.income.monthlyIncome >= L.ratio * L.rent,
  },
  {
    key: 'months',
    label: 'Months rented',
    requirement: (L) => `rented at least ${L.minMonths} months`,
    pass: (p, L) => p.reference.monthsRented >= L.minMonths,
  },
  {
    key: 'late',
    label: 'Late count',
    requirement: (L) => `never more than ${L.maxLate} late`,
    pass: (p, L) => p.reference.lateCount <= L.maxLate,
  },
  {
    key: 'deposit',
    label: 'Deposit returned',
    requirement: () => 'last deposit returned in full',
    pass: (p) => p.reference.depositReturned === true,
  },
]

export const qualifies = (p, L) => BADGES.every((b) => b.pass(p, L))

export const PERSONAS = [
  {
    key: 'avery',
    name: 'Avery',
    identity: { name: 'Avery Reyes', dob: '14 Mar 1998', contact: 'avery.reyes@mail.example' },
    commitment: 'c41d9a…07be',
    nullifier: '9e2f11…c3a4',
    income: { monthlyIncome: 7200, issuer: 'mock-paystream-payroll', expiresAt: '12 Jan 2027' },
    reference: { monthsRented: 26, lateCount: 0, depositReturned: true, issuer: 'mock-rentflow-platform', expiresAt: '02 Feb 2027' },
    soft: { moveIn: '2026-08-01', moveInText: '01 Aug 2026', leaseMonths: 12, pets: 'None', occupants: 1 },
  },
  {
    key: 'sam',
    name: 'Sam',
    identity: { name: 'Sam Okafor', dob: '02 Nov 1994', contact: 'sam.okafor@mail.example' },
    commitment: 'a8c3f2…5d19',
    nullifier: '44b7e0…f28c',
    income: { monthlyIncome: 6900, issuer: 'mock-paystream-payroll', expiresAt: '30 Nov 2026' },
    reference: { monthsRented: 14, lateCount: 1, depositReturned: true, issuer: 'mock-rentflow-platform', expiresAt: '21 Dec 2026' },
    soft: { moveIn: '2026-08-15', moveInText: '15 Aug 2026', leaseMonths: 24, pets: 'Cat', occupants: 2 },
  },
  {
    key: 'jordan',
    name: 'Jordan',
    identity: { name: 'Jordan Vale', dob: '27 Jun 2001', contact: 'jordan.vale@mail.example' },
    commitment: 'f10b64…9ac2',
    nullifier: '7d95a3…e611',
    income: { monthlyIncome: 8400, issuer: 'mock-paystream-payroll', expiresAt: '18 Mar 2027' },
    reference: { monthsRented: 31, lateCount: 0, depositReturned: true, issuer: 'mock-rentflow-platform', expiresAt: '09 Jan 2027' },
    soft: { moveIn: '2026-09-01', moveInText: '01 Sep 2026', leaseMonths: 12, pets: 'Dog', occupants: 2 },
  },
  {
    key: 'riley',
    name: 'Riley',
    identity: { name: 'Riley Chen', dob: '08 Sep 1999', contact: 'riley.chen@mail.example' },
    commitment: 'b72e18…4f0d',
    nullifier: '1ca6d9…88b5',
    income: { monthlyIncome: 5800, issuer: 'mock-paystream-payroll', expiresAt: '25 Oct 2026' },
    reference: { monthsRented: 9, lateCount: 0, depositReturned: true, issuer: 'mock-rentflow-platform', expiresAt: '15 Nov 2026' },
    soft: { moveIn: '2026-08-01', moveInText: '01 Aug 2026', leaseMonths: 12, pets: 'None', occupants: 1 },
  },
]

export const personaByKey = (key) => PERSONAS.find((p) => p.key === key)

// Two entries are pre-seeded so the pool is alive before the live demo
// applicant joins (battle plan: two proofs precomputed, one generated live).
export const SEED_POOL = [
  { no: '0001', personaKey: 'sam', date: '16 Jul 2026', status: 'entered', tx: '8f3a4c…c21e' },
  { no: '0002', personaKey: 'jordan', date: '17 Jul 2026', status: 'entered', tx: 'd90b17…44aa' },
]

export const fmtMoney = (n) => '$' + n.toLocaleString('en-US')
