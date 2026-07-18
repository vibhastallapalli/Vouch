import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_2 = __compactRuntime.CompactTypeBoolean;

class _PoolEntry_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment());
  }
  fromValue(value_0) {
    return {
      listingId: _descriptor_0.fromValue(value_0),
      c: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.listingId).concat(_descriptor_0.toValue(value_0.c));
  }
}

const _descriptor_3 = new _PoolEntry_0();

const _descriptor_4 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

class _IdentityFields_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment())));
  }
  fromValue(value_0) {
    return {
      nameHash: _descriptor_0.fromValue(value_0),
      dobHash: _descriptor_0.fromValue(value_0),
      contactHash: _descriptor_0.fromValue(value_0),
      pk: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nameHash).concat(_descriptor_0.toValue(value_0.dobHash).concat(_descriptor_0.toValue(value_0.contactHash).concat(_descriptor_0.toValue(value_0.pk))));
  }
}

const _descriptor_5 = new _IdentityFields_0();

const _descriptor_6 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

const _descriptor_7 = new __compactRuntime.CompactTypeVector(3, _descriptor_0);

class _Either_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_8 = new _Either_0();

const _descriptor_9 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_10 = new _ContractAddress_0();

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    if (typeof(witnesses_0.identitySecret) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named identitySecret');
    }
    if (typeof(witnesses_0.identityBlinding) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named identityBlinding');
    }
    if (typeof(witnesses_0.identityNameHash) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named identityNameHash');
    }
    if (typeof(witnesses_0.identityDobHash) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named identityDobHash');
    }
    if (typeof(witnesses_0.identityContactHash) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named identityContactHash');
    }
    if (typeof(witnesses_0.monthlyIncome) !== 'function') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor does not contain a function-valued field named monthlyIncome');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      apply: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`apply: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const listingId_0 = args_1[1];
        const monthlyRent_0 = args_1[2];
        const incomeRatio_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('apply',
                                     'argument 1 (as invoked from Typescript)',
                                     'rentpool.compact line 57 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(listingId_0.buffer instanceof ArrayBuffer && listingId_0.BYTES_PER_ELEMENT === 1 && listingId_0.length === 32)) {
          __compactRuntime.typeError('apply',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'rentpool.compact line 57 char 1',
                                     'Bytes<32>',
                                     listingId_0)
        }
        if (!(typeof(monthlyRent_0) === 'bigint' && monthlyRent_0 >= 0n && monthlyRent_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('apply',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'rentpool.compact line 57 char 1',
                                     'Uint<0..18446744073709551616>',
                                     monthlyRent_0)
        }
        if (!(typeof(incomeRatio_0) === 'bigint' && incomeRatio_0 >= 0n && incomeRatio_0 <= 255n)) {
          __compactRuntime.typeError('apply',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'rentpool.compact line 57 char 1',
                                     'Uint<0..256>',
                                     incomeRatio_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(listingId_0).concat(_descriptor_1.toValue(monthlyRent_0).concat(_descriptor_4.toValue(incomeRatio_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_4.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._apply_0(context,
                                       partialProofData,
                                       listingId_0,
                                       monthlyRent_0,
                                       incomeRatio_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      commitToApplicant(context, ...args_1) {
        return { result: pureCircuits.commitToApplicant(...args_1), context };
      },
      revealAndDeposit(context, ...args_1) {
        return { result: pureCircuits.revealAndDeposit(...args_1), context };
      },
      confirmRelease(context, ...args_1) {
        return { result: pureCircuits.confirmRelease(...args_1), context };
      },
      refund(context, ...args_1) {
        return { result: pureCircuits.refund(...args_1), context };
      }
    };
    this.impureCircuits = { apply: this.circuits.apply };
    this.provableCircuits = { apply: this.circuits.apply };
  }
  initialState(...args_0) {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const issuerIncomeKey_0 = args_0[1];
    const issuerReferenceKey_0 = args_0[2];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialPrivateState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialPrivateState' in argument 1 (as invoked from Typescript)`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(issuerIncomeKey_0.buffer instanceof ArrayBuffer && issuerIncomeKey_0.BYTES_PER_ELEMENT === 1 && issuerIncomeKey_0.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 1 (argument 2 as invoked from Typescript)',
                                 'rentpool.compact line 48 char 1',
                                 'Bytes<32>',
                                 issuerIncomeKey_0)
    }
    if (!(issuerReferenceKey_0.buffer instanceof ArrayBuffer && issuerReferenceKey_0.BYTES_PER_ELEMENT === 1 && issuerReferenceKey_0.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 2 (argument 3 as invoked from Typescript)',
                                 'rentpool.compact line 48 char 1',
                                 'Bytes<32>',
                                 issuerReferenceKey_0)
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('apply', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(1n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(2n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(3n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(0n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(issuerIncomeKey_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(1n),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(issuerReferenceKey_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_6, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_7, value_0);
    return result_0;
  }
  _persistentCommit_0(value_0, rand_0) {
    const result_0 = __compactRuntime.persistentCommit(_descriptor_5,
                                                       value_0,
                                                       rand_0);
    return result_0;
  }
  _identitySecret_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.identitySecret(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('identitySecret',
                                 'return value',
                                 'rentpool.compact line 37 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _identityBlinding_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.identityBlinding(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('identityBlinding',
                                 'return value',
                                 'rentpool.compact line 38 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _identityNameHash_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.identityNameHash(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('identityNameHash',
                                 'return value',
                                 'rentpool.compact line 39 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _identityDobHash_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.identityDobHash(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('identityDobHash',
                                 'return value',
                                 'rentpool.compact line 40 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _identityContactHash_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.identityContactHash(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(result_0.buffer instanceof ArrayBuffer && result_0.BYTES_PER_ELEMENT === 1 && result_0.length === 32)) {
      __compactRuntime.typeError('identityContactHash',
                                 'return value',
                                 'rentpool.compact line 41 char 1',
                                 'Bytes<32>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_0.toValue(result_0),
      alignment: _descriptor_0.alignment()
    });
    return result_0;
  }
  _monthlyIncome_0(context, partialProofData) {
    const witnessContext_0 = __compactRuntime.createWitnessContext(ledger(context.currentQueryContext.state), context.currentPrivateState, context.currentQueryContext.address);
    const [nextPrivateState_0, result_0] = this.witnesses.monthlyIncome(witnessContext_0);
    context.currentPrivateState = nextPrivateState_0;
    if (!(typeof(result_0) === 'bigint' && result_0 >= 0n && result_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError('monthlyIncome',
                                 'return value',
                                 'rentpool.compact line 46 char 1',
                                 'Uint<0..18446744073709551616>',
                                 result_0)
    }
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
    });
    return result_0;
  }
  _apply_0(context, partialProofData, listingId_0, monthlyRent_0, incomeRatio_0)
  {
    let t_0;
    __compactRuntime.assert((t_0 = this._monthlyIncome_0(context,
                                                         partialProofData),
                             t_0 >= incomeRatio_0 * monthlyRent_0),
                            'income below listing threshold');
    const s_0 = this._identitySecret_0(context, partialProofData);
    const pk_0 = this._persistentHash_0([new Uint8Array([114, 101, 110, 116, 112, 111, 111, 108, 58, 112, 107, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                         s_0]);
    const c_0 = this._persistentCommit_0({ nameHash:
                                             this._identityNameHash_0(context,
                                                                      partialProofData),
                                           dobHash:
                                             this._identityDobHash_0(context,
                                                                     partialProofData),
                                           contactHash:
                                             this._identityContactHash_0(context,
                                                                         partialProofData),
                                           pk: pk_0 },
                                         this._identityBlinding_0(context,
                                                                  partialProofData));
    const nullifier_0 = this._persistentHash_1([new Uint8Array([114, 101, 110, 116, 112, 111, 111, 108, 58, 110, 117, 108, 108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                                s_0,
                                                listingId_0]);
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_4.toValue(2n),
                                                                                                                   alignment: _descriptor_4.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'already applied to this listing');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_4.toValue(2n),
                                                                  alignment: _descriptor_4.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(nullifier_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = { listingId: listingId_0, c: c_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_4.toValue(3n),
                                                                  alignment: _descriptor_4.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _commitToApplicant_0(listingId_0, applicantC_0) { return []; }
  _revealAndDeposit_0(listingId_0) { return []; }
  _confirmRelease_0(listingId_0) { return []; }
  _refund_0(listingId_0) { return []; }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get approvedIssuerIncome() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_4.toValue(0n),
                                                                                                   alignment: _descriptor_4.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get approvedIssuerReference() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_4.toValue(1n),
                                                                                                   alignment: _descriptor_4.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    nullifiers: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(2n),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(2n),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(elem_0.buffer instanceof ArrayBuffer && elem_0.BYTES_PER_ELEMENT === 1 && elem_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'rentpool.compact line 31 char 1',
                                     'Bytes<32>',
                                     elem_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(2n),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2];
        return self_0.asMap().keys().map((elem) => _descriptor_0.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    pool: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(3n),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                                 alignment: _descriptor_1.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(3n),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(typeof(elem_0) === 'object' && elem_0.listingId.buffer instanceof ArrayBuffer && elem_0.listingId.BYTES_PER_ELEMENT === 1 && elem_0.listingId.length === 32 && elem_0.c.buffer instanceof ArrayBuffer && elem_0.c.BYTES_PER_ELEMENT === 1 && elem_0.c.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'rentpool.compact line 34 char 1',
                                     'struct PoolEntry<listingId: Bytes<32>, c: Bytes<32>>',
                                     elem_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(3n),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(elem_0),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[3];
        return self_0.asMap().keys().map((elem) => _descriptor_3.fromValue(elem.value))[Symbol.iterator]();
      }
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({
  identitySecret: (...args) => undefined,
  identityBlinding: (...args) => undefined,
  identityNameHash: (...args) => undefined,
  identityDobHash: (...args) => undefined,
  identityContactHash: (...args) => undefined,
  monthlyIncome: (...args) => undefined
});
export const pureCircuits = {
  commitToApplicant: (...args_0) => {
    if (args_0.length !== 2) {
      throw new __compactRuntime.CompactError(`commitToApplicant: expected 2 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const listingId_0 = args_0[0];
    const applicantC_0 = args_0[1];
    if (!(listingId_0.buffer instanceof ArrayBuffer && listingId_0.BYTES_PER_ELEMENT === 1 && listingId_0.length === 32)) {
      __compactRuntime.typeError('commitToApplicant',
                                 'argument 1',
                                 'rentpool.compact line 85 char 1',
                                 'Bytes<32>',
                                 listingId_0)
    }
    if (!(applicantC_0.buffer instanceof ArrayBuffer && applicantC_0.BYTES_PER_ELEMENT === 1 && applicantC_0.length === 32)) {
      __compactRuntime.typeError('commitToApplicant',
                                 'argument 2',
                                 'rentpool.compact line 85 char 1',
                                 'Bytes<32>',
                                 applicantC_0)
    }
    return _dummyContract._commitToApplicant_0(listingId_0, applicantC_0);
  },
  revealAndDeposit: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`revealAndDeposit: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const listingId_0 = args_0[0];
    if (!(listingId_0.buffer instanceof ArrayBuffer && listingId_0.BYTES_PER_ELEMENT === 1 && listingId_0.length === 32)) {
      __compactRuntime.typeError('revealAndDeposit',
                                 'argument 1',
                                 'rentpool.compact line 90 char 1',
                                 'Bytes<32>',
                                 listingId_0)
    }
    return _dummyContract._revealAndDeposit_0(listingId_0);
  },
  confirmRelease: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`confirmRelease: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const listingId_0 = args_0[0];
    if (!(listingId_0.buffer instanceof ArrayBuffer && listingId_0.BYTES_PER_ELEMENT === 1 && listingId_0.length === 32)) {
      __compactRuntime.typeError('confirmRelease',
                                 'argument 1',
                                 'rentpool.compact line 94 char 1',
                                 'Bytes<32>',
                                 listingId_0)
    }
    return _dummyContract._confirmRelease_0(listingId_0);
  },
  refund: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`refund: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const listingId_0 = args_0[0];
    if (!(listingId_0.buffer instanceof ArrayBuffer && listingId_0.BYTES_PER_ELEMENT === 1 && listingId_0.length === 32)) {
      __compactRuntime.typeError('refund',
                                 'argument 1',
                                 'rentpool.compact line 98 char 1',
                                 'Bytes<32>',
                                 listingId_0)
    }
    return _dummyContract._refund_0(listingId_0);
  }
};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
