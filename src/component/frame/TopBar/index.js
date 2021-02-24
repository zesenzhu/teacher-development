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
  useRef,
  forwardRef,
} from "react";
import {
  getDataStorage,
  addElement,
  addScript,
  autoAlert,
} from "@/util/public";
import { LogOut } from "@/util/connect";
import fetch from "@/util/fetch";
import "./index.scss";
import moment from "moment";
import $ from "jquery";
let { get, post } = fetch;

function TopBar(props, ref) {
  let {
    userInfo: UserInfo,
    basePlatFormMsg: BasePlatFormMsg,
    platMsg: PlatMsg,
    identity: Identity,
    type,
    systemServer,
    moduleName,
    initData,
  } = props;
  const [Time, setTime] = useState("");
  // 消息中心加载完成
  const [MsgInit, setMsgInit] = useState(false);
  const msgRef = useRef(null);
  // 获取消息中心
  useEffect(() => {
    // if (BasePlatFormMsg && BasePlatFormMsg.BasicWebRootUrl) {
    //   let { BasicWebRootUrl: baseIP } = BasePlatFormMsg;
    //   post({
    //     url: `${baseIP}Base/WS/Service_Basic.asmx/WS_G_GetSubSystemServerInfo`,
    //     body: {
    //       subjectID: "",
    //       sysID: 200,
    //     },
    //     // securityLevel: 2,
    //   })
    //     .then((result) => {
    //       return result.json();
    //     })
    //     .then((res) => {
    //       if (res.StatusCode === 200) {
    //         let data = {};
    //         console.log(res);
    //         return data;
    //       } else {
    //         return {};
    //       }
    //     });
    // }
    if (initData && initData.systemServer && initData.systemServer[200]) {
      let wsAddr = initData.systemServer[200].WebSvrAddr;
      let {
        token,
        basePlatformMsg: { BasicWebRootUrl },
      } = initData;
      //1.动态引入css
      addElement(
        {
          rel: "stylesheet",
          type: "text/css",
          id: "PsnMgr_link_assistantInfoCenter",

          href:
            wsAddr +
            "/PsnMgr/LgAssistant/css/lancoo.cp.assistantInfoCenter.css",
        },
        "link",
        "body"
      );
      // 2.将用户Token，基础平台地址MainServerAddr，
      // 个人信息管理系统地址LgAssistantAddr，三个值保存到sessionStorage
      sessionStorage.setItem("PsnMgrToken", token); //用户Token
      sessionStorage.setItem("PsnMgrMainServerAddr", BasicWebRootUrl); //基础平台IP地址和端口号形如：http://192.168.129.1:30103/
      sessionStorage.setItem("PsnMgrLgAssistantAddr", wsAddr); //个人信息管理系统Web站点IP地址和端口号形如：http://192.168.129.1:10103/
      // 3.引入js
      //
      addScript({
        src: wsAddr + "/PsnMgr/LgAssistant/js/jquery-1.7.2.min.js",
        id: "PsnMgr_script_jq",
      }).then((res) => {
        if (res) {
          addScript({
            src: wsAddr + "/PsnMgr/LgAssistant/assets/jquery.pagination.js",
            id: "PsnMgr_script_pagination",
          }).then((res) => {
            if (res) {
              addScript({
                src:
                  wsAddr +
                  "/PsnMgr/LgAssistant/js/lancoo.cp.assistantInfoCenter.js",
                id: "PsnMgr_script_assistantInfoCenter",
              }).then((res) => {
                if (res) {
                  setMsgInit(true);
                }
              });
            }
          });
        }
      });
    }
    // console.log(systemServer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initData]);
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
  // 点击消息字也可以打开消息中心
  const onMsgClick = useCallback(() => {
    $(msgRef.current).click();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MsgInit]);
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
                        "/html/personalMgr/?lg_tk=" +
                        getDataStorage("token") +
                        "#/"
                    );
                }}
              >
                {" "}
              </i>
              <span
                onClick={() => {
                  BasePlatFormMsg &&
                    window.open(
                      BasePlatFormMsg.BasicWebRootUrl +
                        "/html/personalMgr/?lg_tk=" +
                        getDataStorage("token") +
                        "#/"
                    );
                }}
                title={UserInfo.UserName}
                className={"user-name"}
              >
                {UserInfo.UserName}
              </span>
              <span
                className="user-iden"
                style={{
                  background: `url(${Identity.IconUrl}) no-repeat center center/contain  `,
                }}
              >
                {Identity.IdentityCode && Identity.IdentityCode.includes("IC1")
                  ? Identity.IdentityName
                  : ""}
              </span>
              <span
                className="logout"
                onClick={() => {
                  autoAlert({
                    title: "确定要退出登录吗?",
                    type: "btn-warn",
                    cancelShow: true,
                    onOk: () => {
                      LogOut({});
                    },
                  });
                }}
              ></span>
            </div>
          ) : (
            ""
          )}
          {/* 帮助没实现，暂不放出，放出后要把下面的MsgInit &&去掉 */}
          {MsgInit && (
            <div className="Frame-open Frame-devide">
              {MsgInit ? (
                <span className="open-msg" onClick={onMsgClick}>
                  <i
                    ref={msgRef}
                    className="msg"
                    id={"Assistant_infoCenter"}
                  ></i>
                  消息
                </span>
              ) : (
                ""
              )}
              {/* <span
              className="open-help"
              onClick={() => {
                console.log("帮助");
              }}
            >
              帮助
            </span> */}
            </div>
          )}
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
            <span className="tb-title">
              {BasePlatFormMsg.ProductName
                ? BasePlatFormMsg.ProductName
                : "一体化智慧校园"}
            </span>
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
                          "/html/personalMgr/?lg_tk=" +
                          getDataStorage("token") +
                          "#/"
                      );
                  }}
                >
                  {" "}
                </i>
                <span
                  onClick={() => {
                    BasePlatFormMsg &&
                      window.open(
                        BasePlatFormMsg.BasicWebRootUrl +
                          "/html/personalMgr/?lg_tk=" +
                          getDataStorage("token") +
                          "#/"
                      );
                  }}
                  title={UserInfo.UserName}
                  className={"user-name"}
                >
                  {UserInfo.UserName}
                </span>
                <span
                  className="user-iden"
                  style={{
                    background: `url(${Identity.IconUrl}) no-repeat center center/contain  `,
                  }}
                >
                  {Identity.IdentityCode &&
                  Identity.IdentityCode.includes("IC1")
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
              {MsgInit ? (
                <span className="open-msg" onClick={onMsgClick}>
                  <i
                    ref={msgRef}
                    className="msg"
                    id={"Assistant_infoCenter"}
                  ></i>
                  {/* 消息 */}
                </span>
              ) : (
                ""
              )}
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
