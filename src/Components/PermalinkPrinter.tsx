import React, { Component } from "react";
import { Params, paramsToRLPBytes } from "../types";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

interface OwnProps {
  params: Params;
}

export default class PermalinkPrinter extends Component<OwnProps, any> {
  public render() {
    let rlpBytes = null;
    try {
      rlpBytes = paramsToRLPBytes(this.props.params).toString("hex");
    } catch (_err) {
      rlpBytes = null;
    }

    return (
      <Col xs="12" className="border rounded px-5 py-3 bg-light text-wrap">
        <h2>Result</h2>
        <p>Please provide the link below to other stakeholders for signing.</p>
        {rlpBytes && (
          <Link to={`/${rlpBytes}`} className="overflow-wrap">
            {`${window.location.href}${rlpBytes}`}
          </Link>
        )}
        <p className="overflow-wrap mt-1">RLP data of the Params: {rlpBytes || "Invalid Params"}</p>
      </Col>
    );
  }
}
