/*
 *                   ___====-_  _-====___
 *             _--^^^#####//      \\#####^^^--_
 *          _-^##########// (    ) \\##########^-_
 *         -############//  |\^^/|  \\############-
 *       _/############//   (@::@)   \############\_
 *      /#############((     \\//     ))#############\
 *     -###############\\    (oo)    //###############-
 *    -#################\\  / VV \  //#################-
 *   -###################\\/      \//###################-
 *  _#/|##########/\######(   /\   )######/\##########|\#_
 *  |/ |#/\#/\#/\/  \#/\##\  |  |  /##/\#/  \/\#/\#/\#| \|
 *  `  |/  V  V  `   V  \#\| |  | |/#/  V   '  V  V  \|  '
 *     `   `  `      `   / | |  | | \   '      '  '   '
 *                      (  | |  | |  )
 *                     __\ | |  | | /__
 *                    (vvv(VVV)(VVV)vvv)
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *                神兽保佑            永无BUG
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-12-07 15:17:40
 * @LastEditTime: 2020-12-09 14:06:43
 * @Description: 招聘计划管理,可复用，所以尽量不要用reduce全局状态处理
 * @FilePath: \teacher-development\src\pages\recruit\index.js
 */

import {
  connect,
  // useSelector,
  //   useDispatch,
} from "react-redux";
import React, {
  // useCallback,
  memo,
  useEffect,
  useState,
  useReducer,
  // useImperativeHandle,
  // useRef,
  forwardRef,
} from "react";
import Home from "./home";
import Publish from "./publish";
import "./index.scss";
// import { handleRoute } from "../../util/public";
import { withRouter } from "react-router-dom";
import { Reducer, Context, initState } from "./reducer";
function Recruit(props, ref) {
  let {
    teacherRecruitMsg: { params },
    location,
    param, //param控制显示的模块
  } = props;
  const [Component, setComponent] = useState("");
  const [state, setDispatch] = useReducer(Reducer, initState);

  useEffect(() => {
    // let { pathname } = location;
    // let path = handleRoute(pathname)[1]?handleRoute(pathname)[1]:'home';
    // console.log(pathname,handleRoute(pathname)[1],path)
    // setComponent(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setComponent(param);
  }, [param]);
  return (
    <Context.Provider value={{ state, setDispatch }}>
      <div className="Recruit">
        {Component === "home" || Component === "" ? <Home></Home> : ""}
        {Component === "publish" ? <Publish></Publish> : ""}
        {Component === "edit" ? <Home></Home> : ""}
        {Component === "details" ? <Home></Home> : ""}
      </div>
    </Context.Provider>
  );
}

const mapStateToProps = (state) => {
  let {
    handleData: { teacherRecruitMsg },
    commonData: { roleMsg },
  } = state;
  return { teacherRecruitMsg, roleMsg };
};
export default connect(mapStateToProps)(withRouter(memo(forwardRef(Recruit))));
