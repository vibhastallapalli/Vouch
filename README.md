# Private applicant pools for rentals

Many people apply for one apartment, each proves they qualify, the landlord
narrows the anonymous pool by neutral filters, and only the single person he
commits to at the end is ever unmasked. Nobody hands a stranger their income,
employer, id, or rental history just to be one of many the landlord sorts
through and ghosts.

Built on Midnight. Zero-knowledge proofs let an applicant prove a fact is
true (income clears the ratio, solid rental track record) without showing
the thing behind it (the number, the address, the identity).

Not a rental app, a reusable pattern: private applicant pools with
conditional reveal. Same shape runs jobs, lending, grants, admissions.
Rentals are the beachhead because the pain is sharpest and money legally
moves.

## Why this matters (verified numbers)

- Fraud: 93.3 percent of surveyed rental housing providers experienced
  application fraud in twelve months; 84.3 percent of those saw falsified
  pay stubs, employment references, or income documentation; respondents
  wrote off on average nearly 4.2 million dollars in bad debt.
  A photoshopped PDF passes screening today; a proof signed by a registry
  issuer cannot be forged. Source: NMHC Pulse Survey on rental application
  fraud, January 2024 (US data; the fraud mechanism is universal).
  https://www.nmhc.org/research-insight/research-report/nmhc-pulse-survey-analyzing-the-operational-impact-of-rental-application-fraud-and-bad-debt/
- Discrimination: a CCHR paired-testing audit of 1,370 units found
  newcomers face on average 11 times as much discrimination securing a
  rental; the 2025 national follow-up found landlords demanded extra income
  and employment proof from racialized individuals and women. The document
  demands are the discrimination channel; qualification-only filtering
  deletes it. Source: Canadian Centre for Housing Rights, 2022 Toronto
  audit and March 2025 national report.
  https://housingrightscanada.com/reports/measuring-discrimination-in-rental-housing-across-canada/
- Breach liability: Canadian organizations paid on average CA$6.98 million
  per data breach in 2025. A landlord holding a folder of SINs and pay
  stubs carries a seven-figure liability he never priced; here the
  documents are never stored. Source: IBM Cost of a Data Breach Report
  2025, Canadian findings.
  https://canada.newsroom.ibm.com/2025-07-30-IBM-Report-Canadians-Data-Security-Under-Increased-Threat,-While-Breach-Costs-Surge

## How selection works

Everyone joins the pool wearing badges. Hard badges are proven by
zero-knowledge credential (income clears the ratio, rented at least N
months, never more than K late, deposit returned). Soft preferences are
self-claimed plaintext (move-in date, lease length, pets, occupants);
lying about those hurts nobody, so they need no proof.

The landlord filters the anonymous pool on any combination of badges. The
pool shrinks and grows live while everyone stays a ghost. Narrowing to two,
five, or zero is fine, because nobody is exposed during filtering. He
commits to ONE. The commit marks the winner; only that applicant then opens
their identity and pays the deposit, in one transaction. The contract
cannot decrypt anyone: the applicant alone holds the opening of their
identity commitment.

The bright line: we prove the things where lying causes harm (can they pay,
were they a good tenant) and leave self-claim for the things where it does
not (move-in date, pets). The landlord can only filter on neutral tenancy
facts, never anything a human rights code protects.

Qualification is all or nothing. The contract only accepts an application
that satisfies every required hard badge, because the pattern of which
checks passed could itself fingerprint someone. Every pool entry is
qualified by construction.

## What is public vs private

See the table in interface.md section 10; it moves here once the contract
is deployed.

## The landlord side

- Qualification-only selection shields the landlord from discrimination
  claims: the protected attributes are never visible to him.
- Never storing id documents kills his data breach liability.
- The private track record catches what income cannot: the tenant who pays
  fine but wrecks the place.
- The listing bond: the landlord posts his own funds up front (not a tenant
  deposit, so the RTA does not touch it). Reveals are capped at three,
  mirroring a real shortlist depth. Each repick after a reveal draws down
  the bond, and the drawn amount pays the applicant who was unmasked and
  passed over. This stops serial unmasking as a demographic screen.
  Drawdown economics are documented here, not built (see limitations).

## Honest limitations

- Issuers and the approved issuer registry are mocked. Keys are generated
  locally; the institutions are fake. Every mocked component is labeled in
  code and listed here.
- The rental reference assumes platform-issued payment data (rent payment
  platforms, property software). Not every tenancy has it; renters without
  it would lean on the guarantor branch, which is roadmap, not built.
- The previous-landlord reference in the apply screen is a demo mock:
  attaching a bill grants a permanent LANDLORD VERIFIED badge without
  reading or checking any document ("we take their word for it"). It stands
  in for an issuer signature over a landlord attestation; a real build would
  verify that signature in circuit, not trust an upload. Labeled in
  app/src/screens/Apply.jsx.
- Guarantor OR branch for first-timers, listing bond drawdown automation,
  timeout repick when a committed applicant ghosts, and joint applicants
  summing incomes are specified here and not built in the weekend contract.
- Soft preference badges are self-claimed and unproven by design; only
  fraud-sensitive facts are proven.
- Dropped the legal residency check: a landlord cannot lawfully ask it in
  Ontario.
- Contract mid-build status: apply proves the income threshold, binds the
  identity commitment, and spends the per-listing nullifier in circuit.
  The registry check (issuer signature and credential expiry verified in
  circuit) is a later task, so right now the income figure is
  applicant-asserted, not issuer-certified; the witness carries a MOCKED
  trust label until that lands. Credential expiry is checked in circuit
  once it does; stale income does not pass.
- The identity commitment C is one stable value per applicant, because
  credentials bind to it, and every pool entry publishes it. Two entries
  with the same C are therefore linkable across listings, and once a
  winner reveals on one listing, their unrevealed entries elsewhere become
  identity-linked as well. The nullifier channel stays unlinkable as
  designed; the C channel does not. A per-listing wrapper commitment over
  C would close this but changes interface.md, which is a team decision.
- The frontend in app/ is the full demo flow on mock data: the listing,
  the three applicant personas, their credentials, commitments,
  nullifiers, and every transaction id are sample values defined in
  app/src/data.js, labeled there. Proof generation is a timed animation,
  not a real proof. Wallet connect goes through the real Midnight dapp
  connector (enumerates injected wallets, connects on preprod, shows the
  address); with no wallet extension installed it falls back to a local
  mock toggle with a placeholder address, labeled in the code. Wiring the
  flow to the deployed contract replaces data.js.

## Repo layout

- interface.md: the locked contract interface. The contract contains the
  circuits listed there and nothing else.
- _ds/: the Notary Desk design system (tokens, component bundle, style
  guide) the UI is built on.
- app/: the frontend (Vite + React), presented in the UI as Vouch (one
  constant in app/src/data.js if the name changes). Notary Desk design
  system, tokens imported straight from _ds/. Screens: listing desk,
  applicant credential wallet and proof flow, the anonymous pool with
  live badge filtering and commit, reveal-and-pay, and the per-listing
  event register. Run with npm install then npm run dev inside app/.
