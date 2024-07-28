// import { applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// // import rootSaga from './sagas';
// import rootReducer from './root-reducer';
// import logger from "redux-logger";
// const sagaMiddleware = createSagaMiddleware();
// import { configureStore } from '@reduxjs/toolkit';
// const middleware = [sagaMiddleware]

// if(process.env.NODE_ENV === "development"){
//     middleware.push(logger);
// }

// const store = configureStore(
//   rootReducer,
//   applyMiddleware(sagaMiddleware)
// );

// sagaMiddleware.run(rootSaga);

// export default store;


import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import rootSaga from './sagas'; 

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(middleware),
});

sagaMiddleware.run(rootSaga);

export default store;
