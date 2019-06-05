import React from "react";
import ParamsLoader from "./Components/ParamsLoader";
import ParamsEditor from "./Components/ParamsEditor";
import PermalinkPrinter from "./Components/PermalinkPrinter";
import SignatureCollector from "./Components/SignatureCollector";
import TransactionCreator from "./Components/TransactionCreator";
import { Params, defaultParams, Signature } from "./types";
import { Container, Row } from "react-bootstrap";

type AppState = {
  params: Params;
  signatures: Signature[];
};

export default class App extends React.Component<{}, AppState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      params: defaultParams(),
      signatures: [],
    };
  }

  public render() {
    return (
      <Container>
        <Row>
          <ParamsLoader onLoadParams={this.handleLoadParams} />
        </Row>
        <Row>
          <ParamsEditor params={this.state.params} onChangeParams={this.handleChangeParams} />
        </Row>
        <Row className="mt-3">
          <PermalinkPrinter params={this.state.params} />
        </Row>
        <Row>
          <SignatureCollector
            signatures={this.state.signatures}
            onAddSignature={this.handleAddSignature}
            onRemoveSignature={this.handleRemoveSignature}
          />
        </Row>
        <Row>
          <TransactionCreator params={this.state.params} signatures={this.state.signatures} />
        </Row>
      </Container>
    );
  }

  private handleLoadParams = (newParams: Params) => {
    this.setState({
      params: newParams,
    });
  };

  private handleChangeParams = (changedParams: Params) => {
    this.setState({
      params: changedParams,
    });
  };

  private handleAddSignature = (signature: Signature) => {
    this.setState(prevState => {
      return {
        ...prevState,
        signatures: [...prevState.signatures, signature],
      };
    });
  };

  private handleRemoveSignature = (index: number) => {
    this.setState(prevState => {
      const newSignatures = [...prevState.signatures];
      newSignatures.splice(index, 1);
      return {
        ...prevState,
        signatures: newSignatures,
      };
    });
  };
}
