## @ufx-ui/core

UI components to build a trading interface

### Installation

```
npm install @ufx-ui/core --save
```

### Usage

```jsx
// App.js
import React, { Component } from "react";

import { StoreProvider } from "@ufx-ui/core";
import "~@ufx-ui/core/dist/css/ufx-core.css";

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

import { Ticker } from "@ufx-ui/core";

class Example extends Component {
  render() {
    return (
      <Ticker
      // {...pass props here}
      />
    );
  }
}
```

## License

Apache-2.0
