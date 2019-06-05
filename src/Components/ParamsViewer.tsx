import React, { Component } from "react";
import { Params } from "../types";

interface OwnParams {
  params: Params;
}

export default class ParamsViewer extends Component<OwnParams, any> {
  public render() {
    return <div> Show Parameters here </div>;
  }
}
