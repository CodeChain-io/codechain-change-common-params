import React, { Component } from "react";
import { Params, RLPBytesToParams, paramsFromRPCParams, ParamsAndSeq } from "../types";
import { Col, Form, Button, Row } from "react-bootstrap";
import { SDK } from "codechain-sdk";

interface OwnProps {
  onLoadParamsAndSeq: (paramsAndSeq: ParamsAndSeq) => void;
}

interface OwnState {
  typedRLPEncoded: string;
  typedCodeChainRPCURL: string;
}

async function loadParamsFromRPC(rpcURL: string): Promise<Params> {
  const sdk = new SDK({
    server: rpcURL,
  });
  const rpcParams = await sdk.rpc.sendRpcRequest("chain_getCommonParams", [null]);
  return paramsFromRPCParams(rpcParams);
}

function loadSeqFromRPC(rpcURL: string): Promise<number> {
  const sdk = new SDK({
    server: rpcURL,
  });
  return sdk.rpc.sendRpcRequest("chain_getMetadataSeq", [null]);
}

export default class ParamsLoader extends Component<OwnProps, OwnState> {
  public constructor(props: OwnProps) {
    super(props);
    this.state = {
      typedRLPEncoded: "",
      typedCodeChainRPCURL: "",
    };
  }

  public render() {
    return (
      <Col xs="12" className="border rounded px-5 py-3 bg-light">
        <Row>
          <span className="col-12 col-lg-12 mb-3">Load params from RLP Encoded Data</span>
          <Col xs="12" lg="9" className="mb-3">
            <Form.Control
              type="text"
              value={this.state.typedRLPEncoded}
              onChange={this.handleRLPEncodedInputChange}
              placeholder="Paste RLP encoded data of the Common Params"
            />
          </Col>
          <Col xs="12" lg="3">
            <Button onClick={this.handleRLPEncodedClick} variant="primary">
              Import
            </Button>
          </Col>
        </Row>
        <Row>
          <span className="col-12 mb-3"> Load from RPC </span>
          <Col xs="12" lg="9" className="mb-3">
            <Form.Control
              type="text"
              value={this.state.typedCodeChainRPCURL}
              onChange={this.handleRPCURLInputChange}
              placeholder="Paste RLP encoded data of the Common Params"
            />
          </Col>
          <Col xs="12" lg="3">
            <Button onClick={this.handleRPCURLClick} variant="primary">
              Import
            </Button>
          </Col>
        </Row>
      </Col>
    );
  }

  private handleRLPEncodedInputChange = (event: any) => {
    const text = event.target.value;
    this.setState({
      typedRLPEncoded: text,
    });
  };

  private handleRLPEncodedClick = (_event: any) => {
    const rawParams = this.state.typedRLPEncoded;

    try {
      const newParamsAndSeq = RLPBytesToParams(rawParams);
      this.props.onLoadParamsAndSeq(newParamsAndSeq);
    } catch (err) {
      console.error(err);
      // FIXME: show the error message in the page.
      alert(err);
    }
  };

  private handleRPCURLInputChange = (event: any) => {
    const text = event.target.value;
    this.setState({
      typedCodeChainRPCURL: text,
    });
  };

  private handleRPCURLClick = async (_event: any) => {
    const rpcURL = this.state.typedCodeChainRPCURL;

    try {
      const [newParams, newSeq] = await Promise.all([
        loadParamsFromRPC(rpcURL),
        loadSeqFromRPC(rpcURL),
      ]);
      this.props.onLoadParamsAndSeq({
        params: newParams,
        seq: newSeq,
      });
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };
}
