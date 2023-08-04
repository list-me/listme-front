interface GlobalState {
  user: any | undefined;
}

interface GlobalContextValues {
  global: GlobalState;
}

export type { GlobalState, GlobalContextValues };
