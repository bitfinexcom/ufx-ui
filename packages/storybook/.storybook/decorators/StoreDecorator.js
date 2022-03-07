import React, { Suspense } from "react";

/* TODO:
For ufx-ui/core stories, i18n only worh with StoreProviderCore(../../../core/src/store)
For ufx-ui/bfx-containers stories, i18n only work with StoreProvider(@ufx-ui/core)
*/
import { StoreProvider as StoreProviderCore } from "../../../core/src/store";
import { Spinner, StoreProvider } from "@ufx-ui/core";
import {
  useInjectBfxData,
  ReduxStoreProvider,
} from "../../../bfx-containers/src/index.js";

const BfxDataWrapper = ({ content }) => {
  useInjectBfxData();
  return content;
};

const Wrapper = ({ children }) => (
  <ReduxStoreProvider>
    <StoreProvider>
      <Suspense fallback={<Spinner />}>
        <BfxDataWrapper content={children} />
      </Suspense>
    </StoreProvider>
  </ReduxStoreProvider>
);

const ContainerStories = "Containers/";

// store wrapper for storybook
const StoreDecorator = (Story, metadata) => {
  const { kind } = metadata;

  // add redux wrapper only for container stories
  if (kind.includes(ContainerStories)) {
    return (
      <Wrapper>
        <Story />
      </Wrapper>
    );
  }

  return (
    <StoreProviderCore>
      <Story />
    </StoreProviderCore>
  );
};

export default StoreDecorator;
