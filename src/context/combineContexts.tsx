import { createElement, Fragment } from "react";

export const combineContexts = (...contexts: any) => {
  return contexts.reduce(
    (AccumulatedContexts: any, CurrentContext: any) => {
      return ({ children }: any) => {
        return createElement(
          AccumulatedContexts,
          null,
          createElement(CurrentContext, null, children),
        );
      };
    },
    ({ children }: any) => createElement(Fragment, null, children),
  );
};
