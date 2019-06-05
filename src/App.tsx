import React from "react";

type AppState = {};

export default class App extends React.Component<{}, AppState> {
  public constructor() {
    super({});

    this.state = {};
  }

  public render() {
    return (
      <div className="App">
        <div className="App-body">Hello World</div>
      </div>
    );
  }
}
