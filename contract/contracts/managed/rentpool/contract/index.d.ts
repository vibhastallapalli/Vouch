import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  apply(context: __compactRuntime.CircuitContext<PS>,
        listingId_0: Uint8Array,
        nullifier_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  apply(context: __compactRuntime.CircuitContext<PS>,
        listingId_0: Uint8Array,
        nullifier_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  commitToApplicant(listingId_0: Uint8Array, applicantC_0: Uint8Array): [];
  revealAndDeposit(listingId_0: Uint8Array): [];
  confirmRelease(listingId_0: Uint8Array): [];
  refund(listingId_0: Uint8Array): [];
}

export type Circuits<PS> = {
  apply(context: __compactRuntime.CircuitContext<PS>,
        listingId_0: Uint8Array,
        nullifier_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  commitToApplicant(context: __compactRuntime.CircuitContext<PS>,
                    listingId_0: Uint8Array,
                    applicantC_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  revealAndDeposit(context: __compactRuntime.CircuitContext<PS>,
                   listingId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  confirmRelease(context: __compactRuntime.CircuitContext<PS>,
                 listingId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  refund(context: __compactRuntime.CircuitContext<PS>, listingId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly approvedIssuerIncome: Uint8Array;
  readonly approvedIssuerReference: Uint8Array;
  nullifiers: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               issuerIncomeKey_0: Uint8Array,
               issuerReferenceKey_0: Uint8Array): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
