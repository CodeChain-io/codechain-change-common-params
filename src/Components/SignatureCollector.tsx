import React, { Component } from "react";
import { Signature } from "../types";
import { Col, Form, Button, Row } from "react-bootstrap";

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
        <Row>
          <Col xs="12" className="mb-3">
            <span>Collect signature</span>
            <br />
            <em>Paste signatures from other stake holders to the input box below.</em>
          </Col>
        </Row>

        <Row>
          <Col className="mb-3">
            <Form.Control
              type="text"
              value={this.state.typed}
              onChange={this.handleInputChange}
              placeholder="Paste signature"
            />
          </Col>

          <Col xs="12" lg="3">
            <Button variant="primary" onClick={this.handleAddButtonClick}>
              Collect
            </Button>
          </Col>
        </Row>

        {this.props.signatures.length > 0 && (
          <>
            <span>Collected Signatures </span>
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
