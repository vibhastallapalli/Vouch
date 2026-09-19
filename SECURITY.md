# Security Policy

Vouch is experimental software and is not production-ready.

The repository currently contains mocked and incomplete components documented
in the README. Do not use it to protect real applicant data, hold real deposits,
or make real tenancy decisions.

## Reporting a vulnerability

Please do not publish an exploitable vulnerability, secret, credential, seed
phrase, or private key in a public GitHub issue.

For a security-sensitive report, contact the maintainer privately through the
contact method listed on the maintainer's GitHub profile. Include:

- the affected component
- reproduction steps
- expected and observed behavior
- impact
- a suggested fix, if available

Non-sensitive bugs and design issues should use the public issue templates.

## Scope

Security review is especially welcome around:

- identity commitment unlinkability
- nullifier construction
- issuer signature verification
- credential expiry checks
- frontend-to-contract trust boundaries
- proof generation and verification
- escrow and wallet integration
