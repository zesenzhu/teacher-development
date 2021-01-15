/*
 * _______________#########_______________________
 * ______________############_____________________
 * ______________#############____________________
 * _____________##__###########___________________
 * ____________###__######_#####__________________
 * ____________###_#######___####_________________
 * ___________###__##########_####________________
 * __________####__###########_####_______________
 * ________#####___###########__#####_____________
 * _______######___###_########___#####___________
 * _______#####___###___########___######_________
 * ______######___###__###########___######_______
 * _____######___####_##############__######______
 * ____#######__#####################_#######_____
 * ____#######__##############################____
 * ___#######__######_#################_#######___
 * ___#######__######_######_#########___######___
 * ___#######____##__######___######_____######___
 * ___#######________######____#####_____#####____
 * ____######________#####_____#####_____####_____
 * _____#####________####______#####_____###______
 * ______#####______;###________###______#________
 * ________##_______####________####______________
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2021-01-12 19:19:01
 * @LastEditTime: 2021-01-12 19:19:01
 * @Description:
 * @FilePath: \teacher-development\src\pages\personalDetail\card.js
 */
import React, {
  useCallback,
  memo,
  useEffect,
  useState,
  // useImperativeHandle,
  // useMemo,
  // useReducer,
  // createContext,
  // useContext,
  useRef,
  forwardRef,
  useLayoutEffect,
} from "react";
import "./index.scss";
import { Loading, Empty } from "@/component/common";
/**
 * @description: 暂无数据表明是没有这个系统id或返回错误，加锁是没有权限看,前者权重大于后者
 * @param {*} props
 * @param {*} ref
 * @return {*}
 */
function Card(props, ref) {
  let {
    className,
    width,
    height,
    title,
    cardid,
    select,
    loading, //控制loading
    lock, //控制锁显示
    data, //主要控制空数据显示问题
    component: Component,
    componentProps, //组件的props
  } = props;
  return (
    <div
      className={`personal-card ${className ? className : ""} ${
        select === cardid ? "card-select" : ""
      }`}
      style={{
        width: width ? width : "100%",
      }}
    >
      <span className={`pc-title pc-title-bg ${"pc-title-" + cardid}`}>
        {/* {title} */}
        <i></i>
      </span>
      <Loading
        spinning={loading ? true : false}
        opacity={true}
        //   tip={"加载中..."}
      >
        <div
          className="pc-content"
          style={{
            height: height ? height : "100%",
          }}
        >
          {!loading ? (
            data ? (
              lock ? (
                <Empty
                  className="pc-lock"
                  title={"暂不开放该模块"}
                  type={"3"}
                ></Empty>
              ) : Component ? (
                <Component data={data} {...componentProps}></Component>
              ) : (
                ""
              )
            ) : (
              <Empty title={"暂无数据"} className="pc-empty" type={"3"}></Empty>
            )
          ) : (
            ""
          )}
        </div>
      </Loading>
    </div>
  );
}

export default memo(forwardRef(Card));
