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
 * @Date: 2020-12-03 09:17:03
 * @LastEditTime: 2020-12-07 09:23:40
 * @Description:
 * @FilePath: \teacher-development\src\component\frame\TopBar\index.js
 */
import React, {
  //   useCallback,
  memo,
  useEffect,
  useState,
  //   useImperativeHandle,
  //   useMemo,
  //   useReducer,
  //   createContext,
  //   useContext,
  //   useRef,
  forwardRef,
} from "react";
import { getDataStorage } from "../../../util/public";
import { LogOut } from "../../../util/connect";
import "./index.scss";
import moment from "moment";
function TopBar(props, ref) {
  let {
    userInfo: UserInfo,
    basePlatFormMsg: BasePlatFormMsg,
    platMsg: PlatMsg,
    identity: Identity,
  } = props;
  const [Time, setTime] = useState("");
  useEffect(() => {
    let Interval = setInterval(() => {
      let Moment = moment();
      let now = (
        <>
          {Moment.format("YYYY-MM-DD")}
          <span className={"time-space"}></span>
          {Moment.format("dddd")}
          <span className={"time-space"}></span>
          {Moment.format("hh:mm")}
        </>
      );
      // console.log(
      //   now
      // );
      setTime(now);
    }, 1000);
    return () => {
      clearInterval(Interval);
    };
  }, []);
  return (
    <div className="Frame-topBar-1">
      <i
        className="Frame-logo"
        style={{ background: `url(${PlatMsg.logo})` }}
      ></i>
      {UserInfo ? (
        <div className={"Frame-userMsg"}>
          <i
            className="user-pic"
            style={{
              background: `url(${UserInfo.PhotoPath}) no-repeat center center/28px 28px`,
              cursor: BasePlatFormMsg ? "pointer" : "auto",
            }}
            onClick={() => {
              BasePlatFormMsg &&
                window.open(
                  BasePlatFormMsg.BasicWebRootUrl +
                    "/html/personalMgr/?lg_tk" +
                    getDataStorage("token") +
                    "#/"
                );
            }}
          >
            {" "}
          </i>
          <span title={UserInfo.UserName} className={"user-name"}>
            {UserInfo.UserName}
          </span>
          <span
            className="user-iden"
            style={{
              background: `url(${Identity.IconUrl}) no-repeat center center/contain  `,
            }}
          >
            {Identity.IdentityCode.includes("IC1") ? Identity.IdentityName : ""}
          </span>
          <span
            className="logout"
            onClick={() => {
              LogOut({});
            }}
          ></span>
        </div>
      ) : (
        ""
      )}
      <div className="Frame-open">
        <span
          className="open-msg"
          onClick={() => {
            console.log("消息");
          }}
        >
          消息
        </span>
        <span
          className="open-help"
          onClick={() => {
            console.log("帮助");
          }}
        >
          帮助
        </span>
      </div>
      {Time ? <div className="Frame-time">{Time}</div> : ""}
    </div>
  );
}
export default memo(forwardRef(TopBar));
