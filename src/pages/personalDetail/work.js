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

/**
 * @description: 暂无数据表明是没有这个系统id或返回错误，加锁是没有权限看,前者权重大于后者
 * @param {*} props
 * @param {*} ref
 * @return {*}
 */
function Work(props, ref) {
  let {
    className,

    data,
  } = props;
  const workList = [
    {
      title: "课程总节数",
      color: "#2edba6",
    },
    {
      title: "行政班数",
      l_title: "班主任",
      color: "#3caeff",
    },
    { title: "教学班数", color: "#8099ff", l_title: "任课教师" },
    { title: "任课教师", color: "#fd8276" },
  ];
  return (
    <div className={`card-content card-work ${className ? className : ""}`}>
      {data instanceof Array &&
        data.map((child, index) => {
          let work = workList[index];
          return (
            <div key={index} className="ct-card" style={{width:100/data.length+'%'}}>
              <span
                className="ct-ball"
                
                title={child}
              >
                <span style={{ background: work.color }} className='ball-bg'></span>
                {child}
              </span>
              <p className="cw-title">{work.title}</p>
          {work.l_title?<p className="cw-l_title">({work.l_title})</p>:''}
            </div>
          );
        })}
    </div>
  );
}

export default memo(forwardRef(Work));
