import { Layout, useInjectBfxData } from "@ufx-ui/bfx-containers";
import React from "react";

const UfxPages = () => {
    useInjectBfxData();
    return <Layout />;
};

export default UfxPages;
