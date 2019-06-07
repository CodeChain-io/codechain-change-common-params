import React, { Component } from "react";
import { Params, Signature, paramsAndSignaturesToRLPBytes } from "../types";
import { Col, Button } from "react-bootstrap";
import { SDK } from "codechain-sdk";

interface OwnProps {
  params: Params;
  signatures: Signature[];
}

interface OwnState {
  transaction: string | null;
}

export default class TransactionCreator extends Component<OwnProps, any> {
  public constructor(props: OwnProps) {
    super(props);
    this.state = {
      transaction: null,
    };
  }

  public render() {
    return (
      <Col xs="12" className="border rounded px-5 py-3 bg-light">
        <div className="mb-3">
          <span>
            Create Transaction
            <br />
            <em>
              If you collected enough signatures, press the button below to create
              ChangeCommonParams transaction.
            </em>
          </span>
        </div>

        <Button onClick={this.handleClick} className="mb-3">
          {" "}
          Create Transaction{" "}
        </Button>

        {this.state.transaction && (
          <p className="overflow-wrap">
            <em>Transaction is created.</em>
            <br />
            <em>Please use the encoded transaction in the stakeholder SDK.</em>
            <br />
            <br />
            <span>{this.state.transaction}</span>
          </p>
        )}
      </Col>
    );
  }

  private handleClick = (_event: any) => {
    const rlpBytes = paramsAndSignaturesToRLPBytes(this.props.params, this.props.signatures);
    const sdk = new SDK({
      // Use meaningless URL to create a instance of the SDK.
      server: "http://dummy.codechain.io",
    });
    const transaction = sdk.core.createCustomTransaction({
      handlerId: 2,
      bytes: rlpBytes,
    });
    // Sequence and fee should be changed by the fee payer.
    transaction.setSeq(0);
    transaction.setFee(1);
    this.setState({
      transaction: transaction.rlpBytes().toString("hex"),
    });
  };
}
