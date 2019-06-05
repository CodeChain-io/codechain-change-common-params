import React, { Component } from "react";
import { Params } from "../types";

interface OwnProps {
  onLoadParams: (params: Params) => void;
}

export default class ParamsLoader extends Component<OwnProps, any> {
  public render() {
    return <div>Load ChangeParams</div>;
  }
}
