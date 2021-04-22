# μfinex. 

μfinex (Microfinex) is an open-source UI library that lets you quickly build a trading interface connected to the Bitfinex API.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

---

## Beta Disclaimer

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

import { QuickSwap } from "ufx-ui";

class Example extends Component {
  render() {
    return <QuickSwap />;
  }
}
```

## Bug Reporting

Incase of a bug or issue, feel free to create a new issue or submit a pull request.

## Contributing

### Build storybook

```
npm install
npm run install:peer
npm run build:storybook
```

It will generate bundle at 'storybook-static' path

### Build Example app

Environment variables for authentication:

```
REACT_APP_UFX_API_KEY=<api-key>
REACT_APP_UFX_API_SECRET=<api-secret>
```

```
npm install
npm run install:peer
cd example
<setup env variables at this path>
npm install
npm run build
```

It will generate bundle at 'example/build' path

## License

Apache-2.0
