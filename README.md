# vue3-persistedstate

## Install
```
npm install --save vue3-persistedstate
```
or
```
yarn add --save vue3-persistedstate
```

## Usage

With Vue 3 and new composition api you no need more to use vuex in your project, because you can use composition api instead

#### State example using composition api

Prepare your state and use it like global reactive constant

```
const defaultState = {
  title: '',
};

export const state = reactive(defaultState);

export const actions = {
  setTitle: (value: string) => {
    state.title = value;
  },
};

export default {
  state,
  actions,
};
```

#### Persisted state plugin usage

```
...
const { getPersistedState, subscribeOnState } = usePersistedState(defaultState, {});

export const state = reactive(getPersistedState());
subscribeOnState(state);
...
```

`usePersistedState(state, options)` get 2 parameters:
- current state
- options

`getPersistedState()` - method that returns current state

`subscribeOnState(state)` - method that implements subscribing and updates the persisted state
