/*
 *           佛曰:
 *                   写字楼里写字间，写字间里程序员；
 *                   程序人员写程序，又拿程序换酒钱。
 *                   酒醒只在网上坐，酒醉还来网下眠；
 *                   酒醉酒醒日复日，网上网下年复年。
 *                   但愿老死电脑间，不愿鞠躬老板前；
 *                   奔驰宝马贵者趣，公交自行程序员。
 *                   别人笑我忒疯癫，我笑自己命太贱；
 *                   不见满街漂亮妹，哪个归得程序员？
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-12-04 14:08:10
 * @LastEditTime: 2020-12-24 09:19:38
 * @Description:
 * @FilePath: \teacher-development\src\component\bar\index.js
 */

import React, {
  //   useCallback,
  memo,
  // useEffect,
  useState,
  useImperativeHandle,
  // useMemo,
  // useReducer,
  // createContext,
  // useContext,
  useLayoutEffect,
  useRef,
  forwardRef,
} from "react";
import $ from "jquery";
import "./index.scss";
import { Loading, Empty } from "../common";

/**
 * @description: 在frame中使用的bar
 * @param {*}
 * @return {*}
 */
function $Bar(props, ref) {
  let {
    topContext,
    width,
    marginLR,
    style,
    className,
    barName,
    loading,
    barId,
    children,
    isEmpty,
    emptyTitle,
    ...reset
  } = props;
  // bar的高度
  // const [barHeight, setBarHeight] = useState(0);
  // 获取bar ref
  const barRef = useRef(null);
  // 挂载后
  // useLayoutEffect(() => {
  //   let bar = $(barRef.current);
  //   // setBarHeight(bar.height());
  //   console.log(barRef.current.height, bar.outerHeight(true));
  // }, []);
  useImperativeHandle(ref, () => {
    return barRef.current;
  });
  return (
    <div
      ref={barRef}
      style={Object.assign(
        {},
        {
          width: `calc(${width ? width : "100%"} - ${
            typeof marginLR === "number" ? marginLR * 2 : 32
          }px)`,
          marginLeft: typeof marginLR === "number" ? marginLR + "px" : "16px",
          marginRight: typeof marginLR === "number" ? marginLR + "px" : "16px",
        },
        style instanceof Object ? style : {}
      )}
      className={`frame-bar-context ${className ? className : ""}`}
      {...reset}
    >
      <div className="fbc-top">
        <span className="ftc-bar-name" title={barName}>
          {barName}
        </span>
        {topContext ? (
          <span className="ftc-top-custom">
            {
              //当loading为true时，阻止该区域点击,下级的捕获
              /** 后期自己看是否需要加可控属性 */
            }
            {loading ? (
              <div
                style={{ height: "100%", width: "100%", position: "absolute" }}
              ></div>
            ) : (
              ""
            )}
            {/* 判断是否是reactDom，是渲染，否用组件的 */}
            {/* *topContext:{
            title:按钮名称,存在才渲染
            icon:有就用这个，没有就有默认的
            className:类
            onClick:点击
          } */}
            {topContext.$$typeof ? (
              topContext
            ) : topContext.title ? (
              <span
                className={`ftc-default-btn ${
                  topContext.className ? topContext.className : ""
                }`}
                onClick={() => {
                  typeof topContext.onClick === "function" &&
                    topContext.onClick();
                }}
                style={
                  topContext.icon
                    ? {
                        background: `url(${topContext.icon}) no-repeat left center/15px 15px`,
                      }
                    : {}
                }
              >
                {topContext.title}
              </span>
            ) : (
              ""
            )}
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="fbc-contain">
        <Loading
          spinning={loading ? loading : false}
          opacity={false}
          tip={"加载中..."}
        >
          {isEmpty === undefined || !isEmpty ? (
            <div className="fbc-contain-box">{children}</div>
          ) : (
            <Empty
              className={"bar-empty"}
              title={emptyTitle ? emptyTitle : "暂无数据..."}
              type={"4"}
            ></Empty>
          )}
        </Loading>
      </div>
    </div>
  );
}
// $Context.Bar = $Bar
export default memo(forwardRef($Bar));
