import React, { Component } from "react";
import { Params } from "../types";

interface OwnProps {
  params: Params;
}

export default class PermalinkPrinter extends Component<OwnProps, any> {
  public render() {
    return <div>Params perma link</div>;
  }
}
