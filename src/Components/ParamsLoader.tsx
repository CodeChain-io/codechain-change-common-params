import React, { Component } from "react";
import { Params, RLPBytesToParams } from "../types";
import { Col, Form, Button, Row } from "react-bootstrap";

interface OwnProps {
  onLoadParams: (params: Params) => void;
}

interface OwnState {
  typed: string;
}

export default class ParamsLoader extends Component<OwnProps, OwnState> {
  public constructor(props: OwnProps) {
    super(props);
    this.state = {
      typed: "",
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
              value={this.state.typed}
              onChange={this.handleInputChange}
              placeholder="Paste RLP encoded data of the Common Params"
            />
          </Col>
          <Col xs="12" lg="3">
            <Button onClick={this.handleClick} variant="primary">
              Import
            </Button>
          </Col>
        </Row>
      </Col>
    );
  }

  private handleInputChange = (event: any) => {
    const text = event.target.value;
    this.setState({
      typed: text,
    });
  };

  private handleClick = (_event: any) => {
    const rawParams = this.state.typed;

    try {
      const newParams = RLPBytesToParams(rawParams);
      this.props.onLoadParams(newParams);
    } catch (err) {
      console.error(err);
      // FIXME: show the error message in the page.
      alert(err);
    }
  };
}
