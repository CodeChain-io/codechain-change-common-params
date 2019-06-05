export interface Params {
  maxExtraDataSize: number;
  // ...
}

export function defaultParams(): Params {
  return {
    maxExtraDataSize: 0,
  };
}

export type Signature = string;
