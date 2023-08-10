import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

// import { version  } from '../package.json'
// import { version as ufxuicoreVersion } from '../node_modules/ufx-ui/package.json'

/* eslint-disable no-console */
// console.log('App: ', version);
// console.log('ufx-ui: ', ufxuicoreVersion);
/* eslint-enable no-console */

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>);
