# Deploying rentpool to preprod

Runbook for the machine that has the toolchain (Docker plus the Compact CLI).
The Windows machine without WSL or Docker cannot run any step below; do not
try. Grounded in the official deploy guide
(https://docs.midnight.network/guides/deploy-mn-app) and the proof server
guide (https://docs.midnight.network/guides/run-proof-server), checked
18 Jul 2026.

## The blocker, resolved

The wallet-sync-vs-preprod failure blocks the BROWSER wallet, not the
deployment. The official preprod flow deploys from a seed-based environment
wallet (MIDNIGHT_PREPROD_SEED or MIDNIGHT_PREPROD_MNEMONIC), never touching
the Lace extension. Treat the two problems separately:

1. Deployment: use the env wallet below. Lace is not involved.
2. Demo wallet in the browser: Lace has known intermittent preprod sync
   issues (https://forum.midnight.network/t/lace-midnight-preview-wallet-doesnt-sync/662).
   The community-verified workaround is the 1AM wallet, where DUST credits
   immediately. Also: set the wallet to preprod BEFORE copying the address
   for the faucet, and wait for sync to finish before any transaction.

Two more known preprod failure modes to recognize on sight:

- OutOfDustValidityWindow (custom error 171) on every submission: the
  preprod indexer is lagging the chain, sometimes by hours
  (https://forum.midnight.network/t/preprod-indexer-23h-behind-chain-wallet-ctime-stuck-at-stale-block-timestamp-causes-custom-error-171-outofdustvaliditywindow-for-all-submissions/1230).
  Nothing on our side is wrong; wait and retry, and check indexer head vs
  chain head before burning time debugging.
- Lace does not implement getProvingProvider
  (https://forum.midnight.network/t/lace-wallet-doesnt-implement-getprovingprovider-expected-behavior-or-version-gap/1213),
  so wallet-delegated proving is off the table; proofs go through the local
  proof server via midnight-js providers.

## Steps

1. Issuer keys first. The constructor takes the two approved issuer public
   keys (income, reference). These come from the mock issuer service task;
   if it has not landed yet, generate and record two 32-byte keys now and
   the issuer service adopts them. Record both in this file when done.

2. Env wallet. In the deploy workspace (the example project from the
   smoke test, adapted to rentpool):

   ```
   cp .env.preprod.example .env.preprod
   # set exactly one of:
   # MIDNIGHT_PREPROD_MNEMONIC=word1 ... word24
   # MIDNIGHT_PREPROD_SEED=<64 hex chars>
   ```

   Never commit .env.preprod.

3. Fund it. Preprod faucet: https://midnight-tmnight-preprod.nethermind.dev/
   Request tNIGHT to the env wallet address, then delegate tNIGHT to
   generate spendable tDUST. No tDUST means the deploy transaction cannot
   pay fees.

4. Proof server up (separate terminal, Docker running):

   ```
   yarn proof:up
   ```

   Serves http://127.0.0.1:6300. The deploy proves the constructor
   transaction through it; it must be up first.

5. Deploy. Adapt the working example deploy script from the smoke test to
   point at contracts/managed/rentpool and pass the constructor args
   (issuerIncomeKey, issuerReferenceKey). The run prints
   "Contract deployed at: <64-char hex address>" plus the deploy
   transaction. Capture both.

6. Wire it in. Paste the address into CONTRACT_ADDRESS in
   app/src/chain.js (the drawer flips from DEPLOY PENDING to the address)
   and put the address plus tx hash in the README. Record the pinned
   versions used (compact compiler, proof server image tag, node) in the
   README setup section in the same commit.

## Recorded on deploy (fill in)

- Issuer income key:
- Issuer reference key:
- Contract address:
- Deploy tx hash:
- Versions (compactc / proof-server image / node):
