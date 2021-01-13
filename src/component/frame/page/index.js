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
 *        佛曰:
 *                写字楼里写字间，写字间里程序员；
 *                程序人员写程序，又拿程序换酒钱。
 *                酒醒只在网上坐，酒醉还来网下眠；
 *                酒醉酒醒日复日，网上网下年复年。
 *                但愿老死电脑间，不愿鞠躬老板前；
 *                奔驰宝马贵者趣，公交自行程序员。
 *                别人笑我忒疯癫，我笑自己命太贱；
 *                不见满街漂亮妹，哪个归得程序员？
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-12-08 13:54:00
 * @LastEditTime: 2020-12-09 14:34:41
 * @Description:
 * @FilePath: \teacher-development\src\component\temple\index.js
 */

import React, {
  //   useCallback,
  memo,
  useEffect,
  useState,
  // useImperativeHandle,
  // useMemo,
  // useReducer,
  // createContext,
  // useContext,
  //   useRef,
  forwardRef,
} from "react";
import { withRouter, Router, Route, HashRouter } from "react-router-dom";
import { handleRoute } from "@/util/public";
import { Scrollbars } from "react-custom-scrollbars";
import { EmptyReact } from "@/component/common";
import "./index.scss";
//   import { Search, Empty } from "../common";

function Page(props, ref) {
  let {
    className,
    basePlatFormMsg,
    pageList,
    location,
    history,
    useScrollbars,
    ProVersion,
    domList,
  } = props;
  useEffect(() => {
    let Path = handleRoute(location.pathname);
    let isExist = false;
    pageList.forEach((child, index) => {
      if (child.props.pageid === Path[1]) {
        isExist = true;
        // 路由上有parma，但组件没有，改变路由
        if (Path[2] && !child.props.param) {
          history.push("/page/" + child.props.pageid);
        } else if (!Path[2] && child.props.param) {
          //有设置param但路由没有,如果第一个也没有就有组件自己控制
          if (!pageList[0].props.param) {
            history.push("/page/" + pageList[0].props.pageid);
          } else {
            window.location.href =
              basePlatFormMsg.BasicWebRootUrl + "/Error.aspx?errcode=E012";

            //http://192.168.2.207:10108/Error.aspx?errcode=E012
          }
        }
      }
    });
    if (!isExist && pageList.length > 0) {
      history.push("/page/" + pageList[0].props.pageid);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageList, location]);
  return (
    <EmptyReact
      component={useScrollbars === undefined || useScrollbars ? Scrollbars : ""}
    >
      <div className={`lg-page ${className ? className : ""}`}>
        <HashRouter>
          {pageList.map((child, index) => {
            let param = child.props.param ? "/:" + child.props.param : "";
            return (
              <Route
                key={index}
                path={"/page/" + child.props.pageid + param}
                //   component={child}
              >
                {child}
              </Route>
            );
          })}
        </HashRouter>
        {/* <p className='lg-page-proversion'>{ProVersion}</p> */}
      </div>
    </EmptyReact>
  );
}
export default withRouter(memo(forwardRef(Page)));
