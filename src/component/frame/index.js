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
 * @LastEditTime: 2020-12-07 14:10:08
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
  // useReducer,
  // createContext,
  // useContext,
  //   useRef,
  forwardRef,
} from "react";
import "./index.scss";
import { withRouter } from "react-router-dom";

import logo from "./images/image-top-name.png";
import { init } from "../../util/init";
import { Loading, Empty } from "../../component/common";

import LeftMenu from "./leftMenu";

import Tab from "./Tab";
import TopBar from "./TopBar";

/**
 * @description: frame的children的属性需要包含tabid，tabname，可有param
 * @param {*}
 * @return {*}
 */
function Frame(props, ref) {
  // type控制显示骨架类型，不存在或false则界面loading
  // type:*default:默认模式，存在左侧菜单和默认头部，children为中部内容区
  // *default-no-left:没有左侧区域，只有中间区域
  // search为tab的搜索区域，undefined则不会出现
  const {
    type,
    pageInit,
    className,
    moduleID,
    platMsg,
    leftMenu,
    children,

    search,
  } = props;
  // 是否初始化
  let [Init, setInit] = useState(true);
  // 身份信息
  let [Identity, setIdentity] = useState(false);
  // 用户信息
  let [UserInfo, setUserInfo] = useState(false);
  // 基础平台信息
  let [BasePlatFormMsg, setBasePlatFormMsg] = useState(false);

  // 骨架外层loading
  let [FrameLoading, setFrameLoading] = useState(true);
  // 平台信息
  let [PlatMsg, setPlatMsg] = useState({ logo });
  // 左侧菜单
  let [MenuList, setMenuList] = useState([]);

  // reduce
  // const [state, dispatch] = useReducer(frameReducer, initState);
  // ComponentList
  const [ComponentList, setComponentList] = useState([]);

  // let { ComponentList, TabList } = state;
  // 页面初始化副作用，依赖moduleID，pageInit,type
  useEffect(() => {
    //初始化，didmount
    init(
      moduleID,
      (data) => {
        //成功
        // console.log(data);
        
        if (data.identityDetail && data.role.version !== "noPower") {
          //true表示该身份有效
          setIdentity(data.identityDetail);
          data.userInfo && setUserInfo(data.userInfo);
          data.basePlatformMsg && setBasePlatFormMsg(data.basePlatformMsg);

          setInit(true);
          typeof pageInit === "function" && pageInit(data);
          type && setFrameLoading(false); //加载完毕，去掉laoding，需要type存在
        } else {
          //身份无效
          // console.log('无效')
          document.location.href = data.basePlatformMsg.WebRootUrl + "/Error.aspx?errcode=E011";
        }
      },
      () => {
        // type && setFrameLoading(true); //加载完毕，去掉laoding，需要type存在
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleID, type]);
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
  // 测试输出副作用
  useEffect(() => {
    // props.children.map((child, index) => {
    //   console.log(child.type);
    // });
    return () => {};
  }, []);
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
          },
        });
      });
      // 存compoent
      setComponentList(List);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, type]);

  // 对type字段解析，查看是否包含
  const checkType = (key = null) => {
    return typeof type === "string" && type.includes(key);
  };
  // 返回方法，外部使用
  useImperativeHandle(ref, () => ({
    // pageInit,
  }));

  return (
    <Loading spinning={FrameLoading} opacity={false} tip={"加载中..."}>
      <div id="Frame" className={`Frame ${className ? className : ""}`}>
        {checkType("default") ? (
          <TopBar
            userInfo={UserInfo}
            basePlatFormMsg={BasePlatFormMsg}
            platMsg={PlatMsg}
            identity={Identity}
          ></TopBar>
        ) : (
          ""
        )}
        <div
          className={`Frame-contain  ${
            checkType("no-left") ? "Frame-contain-2" : ""
          }`}
        >
          {type === "default" ? (
            <div className="Frame-contain-left">
              <LeftMenu list={MenuList}></LeftMenu>
            </div>
          ) : (
            ""
          )}
          <div
            className={`Frame-contain-right ${
              checkType("no-left") ? "only-center" : ""
            }`}
          >
            {Init ? (
              ComponentList instanceof Array && ComponentList.length > 0 ? (
                <Tab componentList={ComponentList} search={search} type={type}>
                  {children}
                </Tab>
              ) : (
                children
              )
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Loading>
  );
}
export default withRouter(memo(forwardRef(Frame)));
