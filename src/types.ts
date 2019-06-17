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
  maxCandidateMetadataSize: U64Value;
}

export interface ParamsAndSeq {
  params: Params;
  seq: number;
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
  "maxCandidateMetadataSize",
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
    maxCandidateMetadataSize: 0,
  };
}

// This is unsafe. Please use when you are confident that it is safe.
function U64ValueToNumber(value: U64Value | null) {
  return parseInt(U64.ensure(value || 0).toString(10), 10);
}

export function paramsFromRPCParams(rpcParams: any): Params {
  return {
    maxExtraDataSize: U64ValueToNumber(rpcParams.maxExtraDataSize),
    maxAssetSchemeMetadataSize: U64ValueToNumber(rpcParams.maxAssetSchemeMetadataSize),
    maxTransferMetadataSize: U64ValueToNumber(rpcParams.maxTransferMetadataSize),
    maxTextContentSize: U64ValueToNumber(rpcParams.maxTextContentSize),
    networkId: rpcParams.networkID,
    minPayTransactionCost: U64ValueToNumber(rpcParams.minPayCost),
    minSetRegularKeyTransactionCost: U64ValueToNumber(rpcParams.minSetRegularKeyCost),
    minCreateShardTransactionCost: U64ValueToNumber(rpcParams.minCreateShardCost),
    minSetShardOwnersTransactionCost: U64ValueToNumber(rpcParams.minSetShardOwnersCost),
    minSetShardUsersTransactionCost: U64ValueToNumber(rpcParams.minSetShardUsersCost),
    minWrapCccTransactionCost: U64ValueToNumber(rpcParams.minWrapCccCost),
    minCustomTransactionCost: U64ValueToNumber(rpcParams.minCustomCost),
    minStoreTransactionCost: U64ValueToNumber(rpcParams.minStoreCost),
    minRemoveTransactionCost: U64ValueToNumber(rpcParams.minRemoveCost),
    minAssetMintCost: U64ValueToNumber(rpcParams.minMintAssetCost),
    minAssetTransferCost: U64ValueToNumber(rpcParams.minTransferAssetCost),
    minAssetSchemeChangeCost: U64ValueToNumber(rpcParams.minChangeAssetSchemeCost),
    minAssetSupplyIncreaseCost: U64ValueToNumber(rpcParams.minIncreaseAssetSupplyCost),
    minAssetComposeCost: U64ValueToNumber(rpcParams.minComposeAssetCost),
    minAssetDecomposeCost: U64ValueToNumber(rpcParams.minDecomposeAssetCost),
    minAssetUnwrapCccCost: U64ValueToNumber(rpcParams.minUnwrapCccCost),
    maxBodySize: U64ValueToNumber(rpcParams.maxBodySize),
    snapshotPeriod: U64ValueToNumber(rpcParams.snapshotPeriod),
    termSeconds: U64ValueToNumber(rpcParams.termSeconds),
    nominationExpiration: U64ValueToNumber(rpcParams.nominationExpiration),
    custodyPeriod: U64ValueToNumber(rpcParams.custodyPeriod),
    releasePeriod: U64ValueToNumber(rpcParams.releasePeriod),
    maxNumOfValidators: U64ValueToNumber(rpcParams.maxNumOfValidators),
    minNumOfValidators: U64ValueToNumber(rpcParams.minNumOfValidators),
    delegationThreshold: U64ValueToNumber(rpcParams.delegationThreshold),
    minDeposit: U64ValueToNumber(rpcParams.minDeposit),
    maxCandidateMetadataSize: U64ValueToNumber(rpcParams.max_candidate_metadata_size),
  };
}

export function paramsToRLPBytes({ params, seq }: ParamsAndSeq): Buffer {
  return RLP.encode([
    0xff,
    seq,
    ParamsKeys.map(key => {
      // FIXME: This code would be broken easily when a field is added to the Params.
      if (key === "networkId") {
        return params[key];
      } else {
        return U64ValueToNumber(params[key]);
      }
    }),
  ]);
}

export function paramsAndSignaturesToRLPBytes(
  { params, seq }: ParamsAndSeq,
  signatures: Signature[],
): Buffer {
  return RLP.encode([
    0xff,
    seq,
    ParamsKeys.map(key => {
      // FIXME: This code would be broken easily when a field is added to the Params.
      if (key === "networkId") {
        return params[key];
      } else {
        return U64ValueToNumber(params[key]);
      }
    }),
    ...signatures.map(signature => {
      if (signature.startsWith("0x")) {
        return signature;
      } else {
        return `0x${signature}`;
      }
    }),
  ]);
}

function bufferToNumber(value: Buffer, debugFieldName: string): number {
  try {
    if (value.length === 0) {
      return 0;
    } else {
      return value.readUIntBE(0, value.length);
    }
  } catch (err) {
    const newError = new Error(`Failed to decode ${debugFieldName}`);
    (newError as any).original = err;
    throw newError;
  }
}

export function RLPBytesToParams(hex: string): ParamsAndSeq {
  const decoded: Buffer[] = RLP.decode(new Buffer(hex, "hex")) as any;

  if (decoded.length !== 3) {
    throw new Error(`Invalid RLP: length of the input: ${decoded.length} should be 3}`);
  }

  if (decoded[2].length !== 32) {
    throw new Error(`Invalid RLP: length of the input: ${decoded.length} should be 32}`);
  }

  if (decoded[0].toString("hex") !== "ff") {
    throw new Error(`Invalid format:  expected: "ff" but found ${decoded[0].toString("hex")}`);
  }
  const seq = bufferToNumber(decoded[1], "seq");

  const [
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
    maxCandidateMetadataSizeRaw,
  ] = decoded[2] as any;

  const params = {
    maxExtraDataSize: bufferToNumber(maxExtraDataSizeRaw, "maxExtraDataSize"),
    maxAssetSchemeMetadataSize: bufferToNumber(
      maxAssetSchemeMetadataSizeRaw,
      "maxAssetSchemeMetadataSize",
    ),
    maxTransferMetadataSize: bufferToNumber(maxTransferMetadataSizeRaw, "maxTransferMetadataSize"),
    maxTextContentSize: bufferToNumber(maxTextContentSizeRaw, "maxTextContentSize"),
    networkId: networkIdRaw.toString("ascii"),
    minPayTransactionCost: bufferToNumber(minPayTransactionCostRaw, "minPayTransactionCost"),
    minSetRegularKeyTransactionCost: bufferToNumber(
      minSetRegularKeyTransactionCostRaw,
      "minSetRegularKeyTransactionCost",
    ),
    minCreateShardTransactionCost: bufferToNumber(
      minCreateShardTransactionCostRaw,
      "minCreateShardTransactionCost",
    ),
    minSetShardOwnersTransactionCost: bufferToNumber(
      minSetShardOwnersTransactionCostRaw,
      "minSetShardOwnersTransactionCost",
    ),
    minSetShardUsersTransactionCost: bufferToNumber(
      minSetShardUsersTransactionCostRaw,
      "minSetShardUsersTransactionCost",
    ),
    minWrapCccTransactionCost: bufferToNumber(
      minWrapCccTransactionCostRaw,
      "minWrapCccTransactionCost",
    ),
    minCustomTransactionCost: bufferToNumber(
      minCustomTransactionCostRaw,
      "minCustomTransactionCost",
    ),
    minStoreTransactionCost: bufferToNumber(minStoreTransactionCostRaw, "minStoreTransactionCost"),
    minRemoveTransactionCost: bufferToNumber(
      minRemoveTransactionCostRaw,
      "minRemoveTransactionCost",
    ),
    minAssetMintCost: bufferToNumber(minAssetMintCostRaw, "minAssetMintCost"),
    minAssetTransferCost: bufferToNumber(minAssetTransferCostRaw, "minAssetTransferCost"),
    minAssetSchemeChangeCost: bufferToNumber(
      minAssetSchemeChangeCostRaw,
      "minAssetSchemeChangeCost",
    ),
    minAssetSupplyIncreaseCost: bufferToNumber(
      minAssetSupplyIncreaseCostRaw,
      "minAssetSupplyIncreaseCost",
    ),
    minAssetComposeCost: bufferToNumber(minAssetComposeCostRaw, "minAssetComposeCost"),
    minAssetDecomposeCost: bufferToNumber(minAssetDecomposeCostRaw, "minAssetDecomposeCost"),
    minAssetUnwrapCccCost: bufferToNumber(minAssetUnwrapCccCostRaw, "minAssetUnwrapCccCost"),
    maxBodySize: bufferToNumber(maxBodySizeRaw, "maxBodySize"),
    snapshotPeriod: bufferToNumber(snapshotPeriodRaw, "snapshotPeriod"),
    termSeconds: bufferToNumber(termSecondsRaw, "termSeconds"),
    nominationExpiration: bufferToNumber(nominationExpirationRaw, "nominationExpiration"),
    custodyPeriod: bufferToNumber(custodyPeriodRaw, "custodyPeriod"),
    releasePeriod: bufferToNumber(releasePeriodRaw, "releasePeriod"),
    maxNumOfValidators: bufferToNumber(maxNumOfValidatorsRaw, "maxNumOfValidators"),
    minNumOfValidators: bufferToNumber(minNumOfValidatorsRaw, "minNumOfValidators"),
    delegationThreshold: bufferToNumber(delegationThresholdRaw, "delegationThreshold"),
    minDeposit: bufferToNumber(minDepositRaw, "minDeposit"),
    maxCandidateMetadataSize: bufferToNumber(
      maxCandidateMetadataSizeRaw,
      "maxCandidateMetadataSize",
    ),
  };

  return {
    params,
    seq,
  };
}

export type Signature = string;
