import React, { Component } from "react";
import { Params, RLPBytesToParams } from "../types";
import { Col, Form, Button } from "react-bootstrap";

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
        <Form className="row">
          <Form.Group className="row col-12 col-lg-9">
            <Form.Label column className="col-12 col-lg-3">
              Load from RLP Data
            </Form.Label>
            <Form.Control
              type="text"
              value={this.state.typed}
              onChange={this.handleInputChange}
              className="col"
              placeholder="Paste RLP data of the Common Params"
            />
          </Form.Group>
          <Col xs="12" lg="3">
            <Button onClick={this.handleClick} variant="primary">
              Import
            </Button>
          </Col>
        </Form>
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
