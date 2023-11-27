import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import createReducer from '../reducers';
import sagas from '../sagas';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const loggerMiddleware = createLogger({ predicate: () => __DEV__ });
const sagaMiddleware = createSagaMiddleware();

/**
 *
 * @param {any} initialState
 * @return {import('redux').Store}
 */
export default function configureStore(initialState = {}) {
  const middlewares = [
    sagaMiddleware,
    // __DEV__ && loggerMiddleware,
  ].filter((v) => v);

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  if (__DEV__) {
    // enhancers.push(devTools());
  }

  const rootReducer = createReducer();
  const pReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    pReducer,
    initialState,
    compose(...enhancers),
  );


  // Extensions
  sagaMiddleware.run(sagas, store.dispatch);
  return store;
}

export const store = configureStore();
export const persistor = persistStore(store);
