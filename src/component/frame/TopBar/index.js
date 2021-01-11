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
  useCallback,
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
    type,
    moduleName,
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
  const onMsgClick = useCallback(() => {}, []);
  return (
    <div
      className={` Frame-topBar ${
        type === "teacher" ? "Frame-topBar-teacher" : "Frame-topBar-default"
      }`}
    >
      {type === "default" && (
        <>
          {" "}
          <i
            className="Frame-logo"
            style={{ background: `url(${PlatMsg.logo}) no-repeat` }}
          ></i>
          {UserInfo ? (
            <div className={"Frame-userMsg  Frame-devide"}>
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
                {Identity.IdentityCode.includes("IC1")
                  ? Identity.IdentityName
                  : ""}
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
          <div className="Frame-open Frame-devide">
            <span className="open-msg" onClick={onMsgClick}>
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
          {Time ? <div className="Frame-time  Frame-devide">{Time}</div> : ""}
        </>
      )}
      {type === "teacher" && (
        <>
          <div className="tb-bar">
            <i
              className="tb-logo"
              style={{
                background: `url(${BasePlatFormMsg.ProductLogoUrl}) no-repeat center center/contain`,
              }}
            ></i>
            <span className="tb-title">{BasePlatFormMsg.ProductName?BasePlatFormMsg.ProductName:'一体化智慧校园'}</span>
            {UserInfo ? (
              <div className={"Frame-userMsg  Frame-devide"}>
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
                  {Identity.IdentityCode.includes("IC1")
                    ? Identity.IdentityName
                    : ""}
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
            <div className="Frame-open Frame-devide">
              <span className="open-msg" onClick={onMsgClick}></span>
            </div>
          </div>
          <div className="tb-name">
            {moduleName ? (
              <span className="tb-module-name">{moduleName}</span>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default memo(forwardRef(TopBar));
