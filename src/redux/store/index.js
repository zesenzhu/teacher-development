/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑       永不宕机     永无BUG
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-11-17 14:05:17
 * @LastEditTime: 2020-11-17 15:13:16
 * @Description: redux的store
 * @FilePath: \teacher-development\src\redux\store\index.js
 */

// import React, { useReducer, createContext } from "react";

import rootReducers, { initialState } from "../reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import DevTools from "./DevTools"; // 辅助工具

let enhancer = applyMiddleware(thunk);
if (process.env.NODE_ENV === "development") {
  enhancer = compose(
    applyMiddleware(thunk, createLogger()),
    DevTools.instrument()
  );
}

let store = createStore(rootReducers, initialState, enhancer);

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }
}
// 增强store功能简略原理
const logEnhancer = (createStore) => (reducer, preloadedState, enhancer) => {
  const store = createStore(reducer, preloadedState, enhancer);
  const originalDispatch = store.dispatch;
  store.dispatch = (action) => {
    console.log(action);
    originalDispatch(action);
  };

  return store;
};
// export const StoreContext = createContext({});

/**
 *  action 支持传入一个异步的函数,如：
 *  const increaseCount = async dispatch => {
 *      await sleep(1000);
 *      dispatch({ type: 'increase' });
 *  }
 *  调用：
 *  dispatch(increaseCount)
 */
// const StoreReducer = (props) => {
//   const [state, origin_dispatch] = useReducer(reducer, initialState);
//   const dispatch = (action) => {
//     if (typeof action === "function") {
//       return action(origin_dispatch);
//     }
//     return origin_dispatch(action);
//   };
//   return (
//     <StoreContext.Provider value={{ state, dispatch }}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

export default store;
