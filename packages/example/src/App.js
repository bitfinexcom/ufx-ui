import { ReduxStoreProvider } from "@ufx-ui/bfx-containers";
import { StoreProvider } from "@ufx-ui/core";
import React from "react";

import "./index.scss";

import UfxPages from "./UfxPages";

const config = {
    lang: localStorage.getItem("locale3"),
    timeFormat: "DD-MM-YY HH:mm:ss",
    timezoneOffset: 330
};

const App = () => (
    <ReduxStoreProvider>
        <StoreProvider value={ config }>
            <div className="app">
                <UfxPages />
            </div>
        </StoreProvider>
    </ReduxStoreProvider>
);

export default App;
