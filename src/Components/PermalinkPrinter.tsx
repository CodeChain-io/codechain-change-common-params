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
        <span>Share</span>
        <p>
          <em>Please provide the link below to other stakeholders for signing.</em>
          <br />
          {rlpBytes && (
            <Link to={`/${rlpBytes}`} className="overflow-wrap">
              {`${window.location.href}${rlpBytes}`}
            </Link>
          )}
        </p>

        <p className="overflow-wrap mt-1">
          <em>Please use the below RLP data of the Params to load later:</em>
          <br />
          {rlpBytes || "Invalid Params"}
        </p>
      </Col>
    );
  }
}
