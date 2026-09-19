# Contributing to Vouch

Thanks for taking an interest in Vouch.

Vouch is an experimental privacy-preserving applicant-pool system. The rental
flow is the reference implementation, but the underlying pattern is intended
to be reusable in domains such as hiring, grants, admissions, and lending.

## Before contributing

Please read the README, especially the "What is built vs what is specified but
not built" and "Honest limitations" sections. Several parts of the project are
intentionally mocked or incomplete, and contributions should preserve that
clarity rather than presenting simulated behavior as production-ready.

## Good first contribution areas

Useful contributions include:

- tests for Compact contract logic and frontend state transitions
- privacy and unlinkability improvements
- accessibility improvements
- documentation and setup fixes
- issuer-registry and credential-verification work
- replacing mocked escrow paths with testable implementations
- examples showing how the applicant-pool pattern can be adapted to other domains

## Development setup

### Frontend

```bash
cd app
npm install
npm run dev
```

### Mock credentials

```bash
node issuer/mint.mjs
```

### Contract

The Compact toolchain is required:

```bash
cd contract
npm run compile
```

See `contract/deploy.md` for the current deployment workflow and limitations.

## Pull requests

1. Open an issue first for substantial changes so the approach can be discussed.
2. Keep pull requests focused on one concern.
3. Add or update tests when behavior changes.
4. Update documentation when setup, interfaces, or limitations change.
5. Do not remove or weaken labels that distinguish mocked, simulated, specified,
   compiled, deployed, or production-ready behavior.

## Commit messages

Use short, descriptive commit messages that explain the change, for example:

```
add issuer signature verification test
document per-listing wrapper commitment
fix keyboard focus in applicant filter
```

## Security and privacy

Please do not post sensitive data, private credentials, seed phrases, wallet
secrets, or exploitable security details in public issues. For security-sensitive
reports, use the process in `SECURITY.md`.

## License

By contributing, you agree that your contributions will be licensed under the
MIT License used by this repository.
