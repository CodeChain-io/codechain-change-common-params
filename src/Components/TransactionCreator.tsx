import React, { Component } from "react";
import { Params, Signature, paramsAndSignaturesToRLPBytes } from "../types";
import { Col, Button } from "react-bootstrap";

interface OwnProps {
  params: Params;
  seq: number;
  signatures: Signature[];
}

interface OwnState {
  paramsAndSignatures: string | null;
}

export default class TransactionCreator extends Component<OwnProps, OwnState> {
  public constructor(props: OwnProps) {
    super(props);
    this.state = {
      paramsAndSignatures: null,
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

        {this.state.paramsAndSignatures && (
          <p className="overflow-wrap">
            <em>Transaction is created.</em>
            <br />
            <em>Please use the encoded paramsAndSignatures in the stakeholder SDK.</em>
            <br />
            <br />
            <span>{this.state.paramsAndSignatures}</span>
          </p>
        )}
      </Col>
    );
  }

  private handleClick = (_event: any) => {
    const rlpBytes = paramsAndSignaturesToRLPBytes(
      {
        params: this.props.params,
        seq: this.props.seq,
      },
      this.props.signatures,
    );
    this.setState({
      paramsAndSignatures: rlpBytes.toString("hex"),
    });
  };
}
