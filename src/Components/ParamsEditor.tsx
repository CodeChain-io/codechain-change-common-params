import React, { Component, FormEvent } from "react";
import { Params, ParamsKeys, ParamsAndSeq } from "../types";
import { Row, Col, Form } from "react-bootstrap";

interface OwnProps {
  paramsAndSeq: ParamsAndSeq;
  onChangeParamsAndSeq: (changedParams: ParamsAndSeq) => void;
  disabled?: boolean;
}

interface OwnState {
  typedSeq: string;
}

class ParamsEditor extends Component<OwnProps, OwnState> {
  public constructor(props: OwnProps) {
    super(props);

    this.state = {
      typedSeq: props.paramsAndSeq.seq.toString(),
    };
  }

  public render() {
    return (
      <Col xs={12} className="border rounded px-5 py-3 bg-light">
        <Row>
          <Col xs={12}>
            {this.props.disabled || (
              <span>
                Edit Params
                <br />
                <em>Change parameters as you want</em>
              </span>
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form className="row">
              <Form.Group className="col-12 col-lg-6 row">
                <Form.Label className="col-12 col-lg-8" column>
                  Seq
                </Form.Label>
                <Col xs={"12"} lg={"4"}>
                  <Form.Control
                    type="text"
                    value={String(this.state.typedSeq)}
                    onChange={this.handleSeqInputChange}
                    disabled={this.props.disabled}
                  />
                </Col>
              </Form.Group>
            </Form>
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
                        value={String(this.props.paramsAndSeq.params[key])}
                        onChange={(event: any) => this.handleParamsInputChange(key, event)}
                        disabled={this.props.disabled}
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

  private handleSeqInputChange = (event: any) => {
    const text = (event.target as HTMLInputElement).value;
    this.setState({
      typedSeq: text,
    });
    try {
      const newSeq = parseInt(text, 10);
      this.props.onChangeParamsAndSeq({
        params: this.props.paramsAndSeq.params,
        seq: newSeq,
      });
    } catch (_err) {
      this.props.onChangeParamsAndSeq({
        params: this.props.paramsAndSeq.params,
        seq: 0,
      });
    }
  };

  private handleParamsInputChange = (key: keyof Params, event: FormEvent) => {
    const text = (event.target as HTMLInputElement).value;
    const newParams = {
      ...this.props.paramsAndSeq.params,
      [key]: text,
    };
    this.props.onChangeParamsAndSeq({
      params: newParams,
      seq: this.props.paramsAndSeq.seq,
    });
  };
}

(ParamsEditor as any).defaultProps = {
  disabled: false,
};

export default ParamsEditor;
