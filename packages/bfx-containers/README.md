## @ufx-ui/bfx-containers

UI components connected with bitfinex apis

### Installation

```
npm install @ufx-ui/bfx-containers --save
```

### Usage

```jsx
// App.js
import React, { Component } from "react";

import { StoreProvider } from "@ufx-ui/bfx-containers";
import "~@ufx-ui/bfx-containers/dist/css/ufx-bfx-containers.css";

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

import { TickerContainer } from "@ufx-ui/bfx-containers";

class Example extends Component {
  render() {
    return <TickerContainer />;
  }
}
```

## License

Apache-2.0
