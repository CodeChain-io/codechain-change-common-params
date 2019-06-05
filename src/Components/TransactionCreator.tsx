import React, { Component } from "react";
import { Params, Signature } from "../types";

interface Props {
  params: Params;
  signatures: Signature[];
}

export default class TransactionCreator extends Component<Props, any> {
  public render() {
    return <div>Create Transaction</div>;
  }
}
