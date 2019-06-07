import React, { Component } from "react";
import { Signature } from "../types";
import { Col, Form, Button } from "react-bootstrap";

interface OwnProps {
  signatures: Signature[];
  onAddSignature: (added: Signature) => void;
  onRemoveSignature: (removed: Signature) => void;
}

interface OwnState {
  typed: string;
}

export default class SignatureCollector extends Component<OwnProps, any> {
  public constructor(props: OwnProps) {
    super(props);
    this.state = {
      typed: "",
    };
  }

  public render() {
    return (
      <Col xs="12" className="border rounded px-5 py-3 bg-light">
        {this.props.signatures.length > 0 && (
          <>
            <p>Collected Signatures </p>
            <ul>
              {this.props.signatures.map(signature => (
                <li key={signature} className="my-1 overflow-wrap">
                  {signature}
                  <Button
                    size="sm"
                    className="ml-1"
                    name={signature}
                    onClick={this.handleRemoveClick}
                    variant="outline-primary"
                  >
                    delete
                  </Button>
                </li>
              ))}
            </ul>
          </>
        )}

        <Form className="row">
          <Form.Group className="row col-12 col-lg-9">
            <Form.Label column className="col-12 col-lg-3">
              Collect signature
            </Form.Label>
            <Form.Control
              type="text"
              className="col"
              value={this.state.typed}
              onChange={this.handleInputChange}
              placeholder="Paste signature"
            />
          </Form.Group>
          <Col xs="12" lg="3">
            <Button variant="primary" onClick={this.handleAddButtonClick}>
              Collect
            </Button>
          </Col>
        </Form>
      </Col>
    );
  }

  private handleRemoveClick = (event: any) => {
    const toRemove: Signature = event.target.name;
    this.props.onRemoveSignature(toRemove);
  };

  private handleInputChange = (event: any) => {
    const text = event.target.value;
    this.setState({
      typed: text,
    });
  };

  private handleAddButtonClick = (_event: any) => {
    if (this.state.typed === "") {
      return;
    }

    if (this.props.signatures.indexOf(this.state.typed) !== -1) {
      // FXME: Use custom error window instead of the alert
      alert("Cannot add duplicated signature");
      return;
    }

    this.props.onAddSignature(this.state.typed);
    this.setState({
      typed: "",
    });
  };
}
