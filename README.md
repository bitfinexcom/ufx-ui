# μfinex [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

μfinex (Microfinex) is an open-source UI library that lets you quickly build a trading interface connected to the Bitfinex API.

---

## :warning: Beta Disclaimer :warning:

Please be advised that the library is under development and has yet to reach a stable state. You may freely use the library, but be aware that it’s subject to breaking changes.

---

## Getting started

### Installation

Add `ufx-ui` to package.json#dependencies

```json
{
  "dependencies": {
    "ufx-ui": "git+https://github.com/bitfinexcom/ufx-ui",
    ...
  }
  ...
}
```

### Usage

```jsx
// App.js

import React, { Component } from "react";

import { StoreProvider } from "ufx-ui";
import "ufx-ui/dist/css/index.css";

import Example from "./Example";

class App extends Component {
  render() {
    return (
      <StoreProvider>
        <Example />
      </StoreProvider>
    );
  }
}
```

```jsx
// Example.js
import React, { Component } from "react";

import { Ticker } from "ufx-ui";

class Example extends Component {
  render() {
    return <Ticker />;
  }
}
```

## Bug Reporting

Incase of a bug or issue, feel free to create a new issue or submit a pull request.

## License

Apache-2.0
