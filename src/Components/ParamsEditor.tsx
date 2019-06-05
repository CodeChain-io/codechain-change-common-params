import React, { Component, FormEvent } from "react";
import { Params, ParamsKeys } from "../types";
import { Row, Col, Form } from "react-bootstrap";

interface OwnParams {
  params: Params;
  onChangeParams: (changedParams: Params) => void;
}

export default class ParamsEditor extends Component<OwnParams, any> {
  public render() {
    return (
      <Col xs={12} className="border rounded px-5 py-3 bg-light">
        <Row>
          <Col xs={12}>
            <h2>Params</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form className="row">
              {ParamsKeys.map(key => {
                return (
                  <Form.Group key={key} className="col-12 col-lg-6 row">
                    <Form.Label className="col-12 col-lg-8" column>
                      {key}
                    </Form.Label>
                    <Col xs={"12"} lg={"4"}>
                      <Form.Control
                        type="text"
                        value={String(this.props.params[key])}
                        onChange={(event: any) => this.handleInputChange(key, event)}
                      />
                    </Col>
                  </Form.Group>
                );
              })}
            </Form>
          </Col>
        </Row>
      </Col>
    );
  }

  private handleInputChange = (key: keyof Params, event: FormEvent) => {
    const text = (event.target as HTMLInputElement).value;
    const newParams = {
      ...this.props.params,
      [key]: text,
    };
    this.props.onChangeParams(newParams);
  };
}
