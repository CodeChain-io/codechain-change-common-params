import { U64Value, U64 } from "codechain-primitives";
import * as RLP from "rlp";

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
    maxExtraDataSize: 0x20,
    maxAssetSchemeMetadataSize: 0x400,
    maxTransferMetadataSize: 0x100,
    maxTextContentSize: 0x200,
    networkId: "tc",
    minPayTransactionCost: 100,
    minSetRegularKeyTransactionCost: 10000,
    minCreateShardTransactionCost: 1000000,
    minSetShardOwnersTransactionCost: 100000,
    minSetShardUsersTransactionCost: 10000,
    minWrapCccTransactionCost: 100000,
    minCustomTransactionCost: 0,
    minStoreTransactionCost: 5000,
    minRemoveTransactionCost: 5000,
    minAssetMintCost: 100000,
    minAssetTransferCost: 100,
    minAssetSchemeChangeCost: 100000,
    minAssetSupplyIncreaseCost: 100000,
    minAssetComposeCost: 100000,
    minAssetDecomposeCost: 100000,
    minAssetUnwrapCccCost: 100,
    maxBodySize: 4194304,
    snapshotPeriod: 16384,
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

export function paramsToRLPBytes(params: Params): Buffer {
  return RLP.encode([
    0xff,
    0,
    ...ParamsKeys.map(key => {
      // FIXME: This code would be broken easily when a field is added to the Params.
      if (key === "networkId") {
        return params[key];
      } else {
        return U64.ensure(params[key]).rlpBytes();
      }
    }),
  ]);
}

function rlpToU64(value: Buffer, debugFieldName: string) {
  try {
    if (value.length === 0) {
      return new U64(0);
    } else {
      return U64.fromBytes(value);
    }
  } catch (err) {
    const newError = new Error(`Failed to decode ${debugFieldName}`);
    (newError as any).original = err;
    throw newError;
  }
}

export function RLPBytesToParams(hex: string): Params {
  const decoded: Buffer[] = RLP.decode(new Buffer(hex, "hex")) as any;

  if (decoded.length !== ParamsKeys.length + 2) {
    throw new Error(
      `Invalid RLP: length of the input: ${decoded.length} should be ${ParamsKeys.length + 2}`,
    );
  }

  if (decoded[0].toString("hex") !== "ff") {
    throw new Error(`Invalid format:  expected: "ff" but found ${decoded[0].toString("hex")}`);
  }
  if (decoded[1].length !== 0) {
    throw new Error(`Invalid format`);
  }
  const [
    ,
    ,
    maxExtraDataSizeRaw,
    maxAssetSchemeMetadataSizeRaw,
    maxTransferMetadataSizeRaw,
    maxTextContentSizeRaw,
    networkIdRaw,
    minPayTransactionCostRaw,
    minSetRegularKeyTransactionCostRaw,
    minCreateShardTransactionCostRaw,
    minSetShardOwnersTransactionCostRaw,
    minSetShardUsersTransactionCostRaw,
    minWrapCccTransactionCostRaw,
    minCustomTransactionCostRaw,
    minStoreTransactionCostRaw,
    minRemoveTransactionCostRaw,
    minAssetMintCostRaw,
    minAssetTransferCostRaw,
    minAssetSchemeChangeCostRaw,
    minAssetSupplyIncreaseCostRaw,
    minAssetComposeCostRaw,
    minAssetDecomposeCostRaw,
    minAssetUnwrapCccCostRaw,
    maxBodySizeRaw,
    snapshotPeriodRaw,
    termSecondsRaw,
    nominationExpirationRaw,
    custodyPeriodRaw,
    releasePeriodRaw,
    maxNumOfValidatorsRaw,
    minNumOfValidatorsRaw,
    delegationThresholdRaw,
    minDepositRaw,
  ] = decoded;

  return {
    maxExtraDataSize: rlpToU64(maxExtraDataSizeRaw, "maxExtraDataSize"),
    maxAssetSchemeMetadataSize: rlpToU64(
      maxAssetSchemeMetadataSizeRaw,
      "maxAssetSchemeMetadataSize",
    ),
    maxTransferMetadataSize: rlpToU64(maxTransferMetadataSizeRaw, "maxTransferMetadataSize"),
    maxTextContentSize: rlpToU64(maxTextContentSizeRaw, "maxTextContentSize"),
    networkId: networkIdRaw.toString("ascii"),
    minPayTransactionCost: rlpToU64(minPayTransactionCostRaw, "minPayTransactionCost"),
    minSetRegularKeyTransactionCost: rlpToU64(
      minSetRegularKeyTransactionCostRaw,
      "minSetRegularKeyTransactionCost",
    ),
    minCreateShardTransactionCost: rlpToU64(
      minCreateShardTransactionCostRaw,
      "minCreateShardTransactionCost",
    ),
    minSetShardOwnersTransactionCost: rlpToU64(
      minSetShardOwnersTransactionCostRaw,
      "minSetShardOwnersTransactionCost",
    ),
    minSetShardUsersTransactionCost: rlpToU64(
      minSetShardUsersTransactionCostRaw,
      "minSetShardUsersTransactionCost",
    ),
    minWrapCccTransactionCost: rlpToU64(minWrapCccTransactionCostRaw, "minWrapCccTransactionCost"),
    minCustomTransactionCost: rlpToU64(minCustomTransactionCostRaw, "minCustomTransactionCost"),
    minStoreTransactionCost: rlpToU64(minStoreTransactionCostRaw, "minStoreTransactionCost"),
    minRemoveTransactionCost: rlpToU64(minRemoveTransactionCostRaw, "minRemoveTransactionCost"),
    minAssetMintCost: rlpToU64(minAssetMintCostRaw, "minAssetMintCost"),
    minAssetTransferCost: rlpToU64(minAssetTransferCostRaw, "minAssetTransferCost"),
    minAssetSchemeChangeCost: rlpToU64(minAssetSchemeChangeCostRaw, "minAssetSchemeChangeCost"),
    minAssetSupplyIncreaseCost: rlpToU64(
      minAssetSupplyIncreaseCostRaw,
      "minAssetSupplyIncreaseCost",
    ),
    minAssetComposeCost: rlpToU64(minAssetComposeCostRaw, "minAssetComposeCost"),
    minAssetDecomposeCost: rlpToU64(minAssetDecomposeCostRaw, "minAssetDecomposeCost"),
    minAssetUnwrapCccCost: rlpToU64(minAssetUnwrapCccCostRaw, "minAssetUnwrapCccCost"),
    maxBodySize: rlpToU64(maxBodySizeRaw, "maxBodySize"),
    snapshotPeriod: rlpToU64(snapshotPeriodRaw, "snapshotPeriod"),
    termSeconds: rlpToU64(termSecondsRaw, "termSeconds"),
    nominationExpiration: rlpToU64(nominationExpirationRaw, "nominationExpiration"),
    custodyPeriod: rlpToU64(custodyPeriodRaw, "custodyPeriod"),
    releasePeriod: rlpToU64(releasePeriodRaw, "releasePeriod"),
    maxNumOfValidators: rlpToU64(maxNumOfValidatorsRaw, "maxNumOfValidators"),
    minNumOfValidators: rlpToU64(minNumOfValidatorsRaw, "minNumOfValidators"),
    delegationThreshold: rlpToU64(delegationThresholdRaw, "delegationThreshold"),
    minDeposit: rlpToU64(minDepositRaw, "minDeposit"),
  };
}

export type Signature = string;
