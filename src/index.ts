import { watchEffect, reactive } from 'vue';

interface State {
  [key: string]: any;
}

interface Options {
  stateName: string;
}

const globalOptions: Options = {
  stateName: 'persistedState',
};

function initPersistedState(defaultState: State, stateName: string) {
  const isStateExist = localStorage[stateName] && localStorage[stateName] !== '{}';
  if (!isStateExist) {
    localStorage[stateName] = JSON.stringify(defaultState);
  }
}

export function usePersistedState(defaultState: State, options?: Options) {
  let { stateName } = globalOptions;

  if (options && options.stateName) {
    stateName = options.stateName;
  }

  initPersistedState(defaultState, stateName);

  const getPersistedState = () => {
    const localStorageState = JSON.parse(localStorage[stateName]);
    return reactive(localStorageState);
  };
  const subscribeOnState = (state: State) => {
    watchEffect(() => {
      localStorage[stateName] = JSON.stringify(state);
    });
  };
  const clearPersistedState = () => {
    localStorage.removeItem(stateName);
  };

  return { getPersistedState, subscribeOnState, clearPersistedState };
}

export default {
  usePersistedState,
};
