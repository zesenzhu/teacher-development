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

/**
 * @description: 暂无数据表明是没有这个系统id或返回错误，加锁是没有权限看,前者权重大于后者
 * @param {*} props
 * @param {*} ref
 * @return {*}
 */
function Accout(props, ref) {
  let {
    className,

    data,
  } = props;
  let {
    QQ,

    LastTimeLogin,
    UserName,
    Weibo,
    Weixin,
    Telephone2,
    CreateTime,
    LoginTimeSpan_Txt,
  } = data;
  return (
    <div className={`card-content card-accout ${className ? className : ""}`}>
      <div className="cc-div-box-1">
        <p className="cc-p-2  ">
          用户名:
          <span className="cc-span-2" title={UserName}>
            {UserName ? UserName : "--"}
          </span>
        </p>
        <p className="cc-p-2  ">
          最后登录:
          <span className="cc-span-2" title={LastTimeLogin}>
            {LastTimeLogin ? LastTimeLogin : "--"}
          </span>
        </p>
      </div>
      <div className="cc-div-box-1">
        <p className="cc-p-2  ">
          QQ:
          <span className="cc-span-2" title={QQ}>
            {QQ ? QQ : "--"}
          </span>
        </p>
        <p className="cc-p-2  ">
          微博:
          <span className="cc-span-2" title={Weibo}>
            {Weibo ? Weibo : "--"}
          </span>
        </p>
      </div>
      <div className="cc-div-box-1">
        <p className="cc-p-2  ">
          微信:
          <span className="cc-span-2" title={Weixin}>
            {Weixin ? Weixin : "--"}
          </span>
        </p>
        <p className="cc-p-2  ">
          联系电话:
          <span className="cc-span-2" title={Telephone2}>
            {Telephone2 ? Telephone2 : "--"}
          </span>
        </p>
      </div>
      <div className="cc-div-box-1">
        <p className="cc-p-2  ">
          注册时间:
          <span className="cc-span-2" title={CreateTime}>
            {CreateTime ? CreateTime : "--"}
          </span>
        </p>
        <p className="cc-p-2  ">
          累计在线:
          <span className="cc-span-2" title={LoginTimeSpan_Txt}>
            {LoginTimeSpan_Txt ? LoginTimeSpan_Txt : "--"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default memo(forwardRef(Accout));
