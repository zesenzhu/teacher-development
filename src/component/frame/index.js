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
 * @Date: 2020-11-18 19:36:59
 * @LastEditTime: 2020-12-22 16:49:55
 * @Description: 平台框架
 * @FilePath: \teacher-development\src\component\frame\index.js
 */
import React, {
  //   useCallback,
  memo,
  useEffect,
  useState,
  useImperativeHandle,
  // useMemo,
  useReducer,
  createContext,
  // useContext,
  useRef,
  forwardRef,
  useLayoutEffect,
  ForwardedRef,
  useCallback,
} from "react";
import "./index.scss";
import { withRouter, useLocation } from "react-router-dom";
import $ from "jquery";

import logo from "./images/image-top-name.png";
import { init } from "@/util/init";
import { Loading } from "@/component/common";

import LeftMenu from "./leftMenu";

import Tab from "./Tab";
import TopBar from "./TopBar";
import RouteTab from "./routeTab";
import Page from "./page";
import { handleRoute } from "@/util/public";
// 创建frame的context
export const frameContext = createContext();
const initState = {
  contentHeight: 0,
};
const frameReducer = (state, actions) => {
  switch (actions.type) {
    case "RESIZE_CONTENT":
      return Object.assign({}, state, {
        contentHeight: actions.data,
      });

    default:
      return state;
  }
};
/**
 * @description: frame的children的属性需要包含tabid，tabname，可有param
 * @param {*}
 * @return {*}
 */
function Frame(props, ref) {
  // type控制显示骨架类型，不存在或false则界面loading
  // type:*default:默认模式，存在左侧菜单和默认头部，children为中部内容区
  // *default-teacher:没有左侧区域，只有中间区域
  // search为tab的搜索区域，undefined则不会出现
  const {
    type,
    // 初始化回调
    pageInit,
    className,
    moduleID,
    // 平台信息，头部的logo和名称
    platMsg,
    // 左侧菜单，结构看leftmenu里面注释
    leftMenu,
    children,
    // 主动获取frame当前的活动标签页，回调函数
    getActiveTab,
    // 控制tab的props，与antd的tabs一样配置
    tabPorps,
    // 回调函数，获取标签页主要区域的宽高
    onContentresize,

    search,
  } = props;
  // 是否初始化
  let [Init, setInit] = useState(false);
  // 身份信息
  let [Identity, setIdentity] = useState(false);
  // 用户信息
  let [UserInfo, setUserInfo] = useState(false);
  // 基础平台信息
  let [BasePlatFormMsg, setBasePlatFormMsg] = useState(false);
  // 可用区域高度
  // const [contentHeight, setContentHeight] = useState(0);
  // 骨架外层loading
  let [FrameLoading, setFrameLoading] = useState(true);
  // 平台信息
  let [PlatMsg, setPlatMsg] = useState({ logo });
  // 各服务器url
  let [SystemServer, setSystemServer] = useState(null);
// // init 的所有数据
// const [InitData,setInitData] =useState(null)
  // 左侧菜单
  let [MenuList, setMenuList] = useState([]);
  // tab的ref；
  const tabRef = useRef({});
  // reduce
  const [state, dispatch] = useReducer(frameReducer, initState);
  // ComponentList
  const [ComponentList, setComponentList] = useState([]);

  // 单页面的,还保留头部的
  //   存得到路由标签
  const [routeList, setRouteList] = useState([]);
  //   存普通的节点
  const [domList, setDomList] = useState([]);
  //   存底部版本
  const [proversion, setProVersion] = useState("");

  // 路由
  const location = useLocation();

  // 设置modulename
  const [moduleName, setModuleName] = useState(undefined);
  // end 单页面

  // 单页面2
  //   存得到路由标签
  const [pageList, setPageList] = useState([]);
  // let { ComponentList, TabList } = state;
  // init成功
  const [initData, setInitData] = useState(false);
  // 页面初始化副作用，依赖moduleID，pageInit,type
  useEffect(() => {
    //初始化，didmount，只依赖moduleid，依赖type会请求多次
    init(
      moduleID,
      (data) => {
        //成功
        console.log(data);

        if (data.identityDetail && data.role.version !== "noPower") {
          //true表示该身份有效
          setIdentity(data.identityDetail);
          data.userInfo && setUserInfo(data.userInfo);
          data.basePlatformMsg && setBasePlatFormMsg(data.basePlatformMsg);
          setSystemServer(data.systemServer?data.systemServer:false)
          // typeof pageInit === "function" && pageInit(data);
          setInitData(data);
          // type && setFrameLoading(false); //加载完毕，去掉laoding，需要type存在
          setInit(true);
        } else {
          //身份无效
          // console.log('无效')
          document.location.href =
            data.basePlatformMsg.BasicWebRootUrl + "/Error.aspx?errcode=E011";
        }
      },
      () => {
        // type && setFrameLoading(true); //加载完毕，去掉laoding，需要type存在
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleID]);

  // 监听type变化，修改loading,解决接口因为type变化请求多次问题请求多次
  // 初始化成功后的逻辑与初始化分开比较好
  useEffect(() => {
    // 初始化成功和loading还在才运行
    if (Init && FrameLoading) {
        typeof pageInit === "function" && pageInit(initData).then(isInit=>{
        if (isInit) {
          type && setFrameLoading(false);
        }
      })
     
    }
  }, [type, initData, Init, pageInit, FrameLoading]);
  // 平台信息副作用,
  useEffect(() => {
    // 对platMsg做把控，防止传进来的数据不对
    platMsg instanceof Object &&
      setPlatMsg({
        logo: platMsg.logo ? platMsg.logo : logo,
        ...platMsg,
      });
  }, [platMsg]);
  // 初始化左侧菜单列表和顶部数据
  useEffect(() => {
    // 对platMsg做把控，防止传进来的数据不对
    platMsg instanceof Object &&
      setPlatMsg({
        logo: platMsg.logo ? platMsg.logo : logo,
        ...platMsg,
      });
    leftMenu instanceof Array && setMenuList(leftMenu);
  }, [platMsg, leftMenu]);
  // 路由变化,控制头部modulename
  useEffect(() => {
    let Path = handleRoute(location.pathname);
    routeList.forEach((child, index) => {
      if (child.props.routeid === Path[0]) {
        setModuleName(child.props.routename);
      }
    });

    return () => {};
  }, [location, routeList]);
  // 当type不一样的时候，处理界面显示不同的模式，返回不同的节点列表
  useEffect(() => {
    // 默认的才有tab

    if (checkType("default")) {
      let List = [];
      children.forEach((child) => {
        try {
          // 不存在这两个参数的不要
          if (
            !child.props ||
            child.props.tabid === undefined ||
            child.props.tabname === undefined
          ) {
            return "";
          }
        } catch {
          return "";
        }

        List.push({
          children: child,
          props: {
            ...child.props,
            redirect:
              "/" +
              (child.props.redirect
                ? child.props.redirect
                : leftMenu[0]
                ? leftMenu[0].key
                : ""),
          },
        });
      });
      // 存compoent
      setComponentList(List);
    }
    // 教师端，也就是有路由的
    if (checkType("teacher")) {
      let routeList = [];
      let domList = [];
      let proversion = [];

      children instanceof Array &&
        children.forEach((child) => {
          // frametype为teacher的都是要的
          if (child.props.frametype === "teacher") {
            if (child.props.routeid) {
              routeList.push(child);
            } else if (child.props.proversion) {
              proversion.push(child);
            } else {
              domList.push(child);
            }
          }
        });
      setRouteList(routeList);
      setProVersion(proversion);
      setDomList(domList);
    }

    // 单页面,新开界面
    if (checkType("page")) {
      let pageList = [];
      let domList = [];
      let proversion = [];
      children instanceof Array &&
        children.forEach((child) => {
          // frametype为page的都是要的
          if (child.props.frametype === "page") {
            if (child.props.pageid) {
              pageList.push(child);
            } else if (child.props.proversion) {
              proversion.push(child);
            } else {
              domList.push(child);
            }
          }
        });

      setPageList(pageList);
      setProVersion(proversion);
      setDomList(domList);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, type, leftMenu]);

  // 对type字段解析，查看是否包含
  const checkType = useCallback(
    (key = null) => {
      return typeof type === "string" && type.includes(key);
    },
    [type]
  );
  let { activeTab, tabList, removeTab } = tabRef.current ? tabRef.current : {};
  // 返回方法，外部使用
  useImperativeHandle(
    ref,
    () => {
      return {
        // pageInit,
        activeTab,
        tabList,
        removeTab,
        contentHeight: state.contentHeight,
      };
    },
    [activeTab, tabList, removeTab, state.contentHeight]
  );
  // 保存活动的tab
  useEffect(() => {
    typeof getActiveTab === "function" && getActiveTab(activeTab);
    // dispatch(handleActions.setActiveTab(activeTab));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <frameContext.Provider value={{ state, dispatch }}>
      <Loading
        spinning={FrameLoading || MenuList.length === 0}
        opacity={false}
        tip={"加载中..."}
      >
        <div
          id="Frame"
          style={checkType("page") ? { minWidth: "auto" } : {}}
          className={`Frame ${className ? className : ""}`}
        >
          {checkType("page") ? (
            BasePlatFormMsg && (
              <Page
                pageList={pageList}
                useScrollbars={false}
                basePlatFormMsg={BasePlatFormMsg}
                domList={domList}
                ProVersion={proversion}
              ></Page>
            )
          ) : (
            <>
              <TopBar
                userInfo={UserInfo}
                basePlatFormMsg={BasePlatFormMsg}
                platMsg={PlatMsg}
                identity={Identity}
                type={type}
                systemServer={SystemServer}
                moduleName={moduleName}
                initData={initData}
              ></TopBar>

              {type ? (
                <div
                  className={`Frame-contain  ${
                    checkType("teacher") ? "Frame-contain-2" : ""
                  }`}
                >
                  {checkType("default") ? (
                    <div className="Frame-contain-left">
                      <LeftMenu list={MenuList}></LeftMenu>
                    </div>
                  ) : (
                    ""
                  )}

                  <div
                    className={`Frame-contain-right ${
                      checkType("teacher") ? "only-center" : ""
                    }`}
                  >
                    {Init ? (
                      checkType("teacher") ? (
                        <RouteTab
                          routeList={routeList}
                          domList={domList}
                          basePlatFormMsg={BasePlatFormMsg}
                          ProVersion={proversion}
                        >
                          {children}
                        </RouteTab>
                      ) : ComponentList instanceof Array &&
                        ComponentList.length > 0 ? (
                        <Tab
                          tabPorps={tabPorps}
                          ref={tabRef}
                          componentList={ComponentList}
                          search={search}
                          type={type}
                          onContentresize={onContentresize}
                        >
                          {children}
                        </Tab>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </Loading>
    </frameContext.Provider>
  );
}
export default memo(forwardRef(Frame));
