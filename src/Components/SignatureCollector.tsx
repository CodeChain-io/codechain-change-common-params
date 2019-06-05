import React, { Component } from "react";
import { Signature } from "../types";

interface OwnProps {
  signatures: Signature[];
  onAddSignature: (added: Signature) => void;
  onRemoveSignature: (removed: number) => void;
}

export default class SignatureCollector extends Component<OwnProps, any> {
  public render() {
    return <div>Imput signatures</div>;
  }
}
