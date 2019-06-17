import React from "react";
import ParamsLoader from "./Components/ParamsLoader";
import ParamsEditor from "./Components/ParamsEditor";
import PermalinkPrinter from "./Components/PermalinkPrinter";
import SignatureCollector from "./Components/SignatureCollector";
import TransactionCreator from "./Components/TransactionCreator";
import { Params, defaultParams, Signature, ParamsAndSeq } from "./types";
import { Container, Row } from "react-bootstrap";
import { Route } from "react-router-dom";
import Viewer from "./Viewer";

type AppState = {
  seq: number;
  params: Params;
  signatures: Signature[];
  // The `paramsEditorKey` is changed when the params and seq are updated from the loader.
  // New ParamsEditor will be created if the paramsEditorKey is changed.
  paramsEditorKey: number;
};

export default class App extends React.Component<{}, AppState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      seq: 0,
      params: defaultParams(),
      paramsEditorKey: 0,
      signatures: [],
    };
  }

  public render() {
    return (
      <>
        <Route exact path={"/"} component={this.Index} />
        <Route path={"/:encodedParams"} component={Viewer} />
      </>
    );
  }

  private Index = () => {
    return (
      <Container>
        <h1 className="mt-3">Change Common Params</h1>
        <Row className="mt-1">
          <ParamsLoader onLoadParamsAndSeq={this.handleLoadParamsAndSeq} />
        </Row>
        <Row className="mt-3">
          <ParamsEditor
            key={this.state.paramsEditorKey}
            paramsAndSeq={{ params: this.state.params, seq: this.state.seq }}
            onChangeParamsAndSeq={this.handleChangeParamsAndSeq}
          />
        </Row>
        <Row className="mt-3">
          <PermalinkPrinter params={this.state.params} seq={this.state.seq} />
        </Row>
        <Row className="mt-3">
          <SignatureCollector
            signatures={this.state.signatures}
            onAddSignature={this.handleAddSignature}
            onRemoveSignature={this.handleRemoveSignature}
          />
        </Row>
        <Row className="mt-3 mb-5">
          {/* The key props reset the TransactionCreator component when the signatures state is changed. */}
          <TransactionCreator
            params={this.state.params}
            seq={this.state.seq}
            signatures={this.state.signatures}
            key={this.state.signatures.join("-")}
          />
        </Row>
      </Container>
    );
  };

  private handleLoadParamsAndSeq = ({ params, seq }: ParamsAndSeq) => {
    this.setState({
      params,
      seq,
      paramsEditorKey: Math.random(),
    });
  };

  private handleChangeParamsAndSeq = (changedParamsAndSeq: ParamsAndSeq) => {
    this.setState({
      params: changedParamsAndSeq.params,
      seq: changedParamsAndSeq.seq,
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

  private handleRemoveSignature = (toRemove: Signature) => {
    this.setState(prevState => {
      const newSignatures = [...prevState.signatures];
      const index = prevState.signatures.indexOf(toRemove);
      newSignatures.splice(index, 1);
      return {
        ...prevState,
        signatures: newSignatures,
      };
    });
  };
}
