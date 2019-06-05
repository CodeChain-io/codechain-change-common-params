import { U64Value } from "codechain-primitives";

export type NetworkId = string;

export interface Params {
  maxExtraDataSize: U64Value;
  maxAssetSchemeMetadataSize: U64Value;
  maxTransferMetadataSize: U64Value;
  maxTextContentSize: U64Value;
  networkId: NetworkId;
  minPayTransactionCost: U64Value;
  minSetRegularKeyTransactionCost: U64Value;
  minCreateShardTransactionCost: U64Value;
  minSetShardOwnersTransactionCost: U64Value;
  minSetShardUsersTransactionCost: U64Value;
  minWrapCccTransactionCost: U64Value;
  minCustomTransactionCost: U64Value;
  minStoreTransactionCost: U64Value;
  minRemoveTransactionCost: U64Value;
  minAssetMintCost: U64Value;
  minAssetTransferCost: U64Value;
  minAssetSchemeChangeCost: U64Value;
  minAssetSupplyIncreaseCost: U64Value;
  minAssetComposeCost: U64Value;
  minAssetDecomposeCost: U64Value;
  minAssetUnwrapCccCost: U64Value;
  maxBodySize: U64Value;
  snapshotPeriod: U64Value;
  termSeconds: U64Value;
  nominationExpiration: U64Value;
  custodyPeriod: U64Value;
  releasePeriod: U64Value;
  maxNumOfValidators: U64Value;
  minNumOfValidators: U64Value;
  delegationThreshold: U64Value;
  minDeposit: U64Value;
}

export const ParamsKeys: (keyof Params)[] = [
  "maxExtraDataSize",
  "maxAssetSchemeMetadataSize",
  "maxTransferMetadataSize",
  "maxTextContentSize",
  "networkId",
  "minPayTransactionCost",
  "minSetRegularKeyTransactionCost",
  "minCreateShardTransactionCost",
  "minSetShardOwnersTransactionCost",
  "minSetShardUsersTransactionCost",
  "minWrapCccTransactionCost",
  "minCustomTransactionCost",
  "minStoreTransactionCost",
  "minRemoveTransactionCost",
  "minAssetMintCost",
  "minAssetTransferCost",
  "minAssetSchemeChangeCost",
  "minAssetSupplyIncreaseCost",
  "minAssetComposeCost",
  "minAssetDecomposeCost",
  "minAssetUnwrapCccCost",
  "maxBodySize",
  "snapshotPeriod",
  "termSeconds",
  "nominationExpiration",
  "custodyPeriod",
  "releasePeriod",
  "maxNumOfValidators",
  "minNumOfValidators",
  "delegationThreshold",
  "minDeposit",
];

export function defaultParams(): Params {
  // FIXME: use the real default value.
  return {
    maxExtraDataSize: 0,
    maxAssetSchemeMetadataSize: 0,
    maxTransferMetadataSize: 0,
    maxTextContentSize: 0,
    networkId: "tc",
    minPayTransactionCost: 0,
    minSetRegularKeyTransactionCost: 0,
    minCreateShardTransactionCost: 0,
    minSetShardOwnersTransactionCost: 0,
    minSetShardUsersTransactionCost: 0,
    minWrapCccTransactionCost: 0,
    minCustomTransactionCost: 0,
    minStoreTransactionCost: 0,
    minRemoveTransactionCost: 0,
    minAssetMintCost: 0,
    minAssetTransferCost: 0,
    minAssetSchemeChangeCost: 0,
    minAssetSupplyIncreaseCost: 0,
    minAssetComposeCost: 0,
    minAssetDecomposeCost: 0,
    minAssetUnwrapCccCost: 0,
    maxBodySize: 0,
    snapshotPeriod: 0,
    termSeconds: 0,
    nominationExpiration: 0,
    custodyPeriod: 0,
    releasePeriod: 0,
    maxNumOfValidators: 0,
    minNumOfValidators: 0,
    delegationThreshold: 0,
    minDeposit: 0,
  };
}

export type Signature = string;
