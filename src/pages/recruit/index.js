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
 * @LastEditTime: 2020-12-07 19:26:42
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
  // useImperativeHandle,
  // useRef,
  forwardRef,
} from "react";
import Home from "./home";
import "./index.scss";
import { handleRoute } from "../../util/public";
import { withRouter } from "react-router-dom";
function Recruit(props, ref) {
  let {
    teacherRecruitMsg:{
        params
    } ,
    location,
  } = props;
  const [Component, setComponent] = useState("");
  useEffect(() => {
    let { pathname } = location;
    let path = handleRoute(pathname)[1]?handleRoute(pathname)[1]:'home';
    console.log(pathname,handleRoute(pathname)[1],path)

    setComponent(path);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  return <div className="Recruit">{Component === "home"||Component === "" ? <Home></Home> : ""}</div>;
}

const mapStateToProps = (state) => {
  let {
    handleData: { teacherRecruitMsg },
    commonData: { roleMsg },
  } = state;
  return { teacherRecruitMsg, roleMsg };
};
export default connect(mapStateToProps)(withRouter(memo(forwardRef(Recruit))));
