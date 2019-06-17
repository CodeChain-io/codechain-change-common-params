import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import ParamsEditor from "./Components/ParamsEditor";
import { RLPBytesToParams } from "./types";
import { Row, Container, Col } from "react-bootstrap";
import { blake256 } from "codechain-primitives";
import * as RLP from "rlp";

type Props = RouteComponentProps;

class Viewer extends Component<Props> {
  public render() {
    const encodedParams = (this.props.match.params as any).encodedParams;
    const paramsAndSeq = RLPBytesToParams(encodedParams);
    return (
      <Container>
        <Row className="mt-5">
          <ParamsEditor paramsAndSeq={paramsAndSeq} onChangeParamsAndSeq={this.noOp} disabled />
        </Row>
        <Row className="mb-5 mt-3">
          <Col xs={12} className="border rounded px-5 py-3 bg-light overflow-wrap">
            Encoded Params: {encodedParams}
            <br />
            <br />
            Hash of the Params: {blake256(RLP.encode(encodedParams).toString("hex"))}
          </Col>
        </Row>
      </Container>
    );
  }

  private noOp() {}
}

export default withRouter(Viewer);
