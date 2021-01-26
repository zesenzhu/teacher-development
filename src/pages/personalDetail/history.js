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
 * @FilePath: \worker-development\src\pages\personalDetail\card.js
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
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars";
/**
 * @description: 暂无数据表明是没有这个系统id或返回错误，加锁是没有权限看,前者权重大于后者
 * @param {*} props
 * @param {*} ref
 * @return {*}
 */
function History(props, ref) {
  let {
    className,

    data,
  } = props;
  // 小于5个补
  if (data.length < 5) {
    let more = ["", "", "", "", ""];
    data = data.concat(more.slice(0, 5 - data.length));
    console.log(data);
  }
  return (
    <div className={`card-content card-history ${className ? className : ""}`}>
      {
        <Scrollbars className='ch-scrollbars'>
          <div className="ch-dot-box">
            {data.map((child, index) => {
              // 第一个前面要有一个球，最后加4个，旗最长7个球的长度
              let dom = [];
              if (index === 0) {
                dom.push("dot");
              }
              // 看child有没有值
              dom = dom.concat([child ? "active" : "dot", "dot", "dot", "dot"]);
              if (index === data.length - 1) {
                dom = dom.concat(["dot", "dot", "dot", "dot"]);
              }
              return (
                <React.Fragment key={index}>
                  {dom.map((dot, index2) => {
                    return dot === "active" ? (
                      <div key={index2} className=" ch-dot ch-dot-active">
                        <span className="ch-dot-polo">
                          <div className="ch-content">
                            <p className="ch-content-time" title={child.time}>
                              {child.time}
                            </p>
                            <p className="ch-content-title" title={child.title}>
                              {child.title}
                            </p>
                          </div>
                        </span>
                      </div>
                    ) : (
                      <span key={index2} className="ch-dot"></span>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </Scrollbars>
      }
    </div>
  );
}

export default memo(forwardRef(History));
