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
import { Carousel } from "antd";
import { Loading, Empty } from "@/component/common";
import moment from "moment";
/**
 * @description: 暂无数据表明是没有这个系统id或返回错误，加锁是没有权限看,前者权重大于后者
 * @param {*} props
 * @param {*} ref
 * @return {*}
 */
function Archives(props, ref) {
  let {
    className,

    data,
    children,
  } = props;
 
  let {
    UserName,
    UserID,
    birthday,
    nation,
    Gender,
    nativeSpace,
    politicStatus,
    IDCardNo,
    TitleName,
    SubjectNames,
    degree,
    educationBackground,
    Telephone,
    Email,
    HomeAddress,
    PhotoPath,
    EducationBackgroundDetailData,
  } = data;
  const eduStageList = { 1: "博士研究生", 2: "硕士研究生", 3: "学士", 4: "无" };
  return (
    <div className={`card-content card-archives ${className ? className : ""}`}>
      <div className="cc-div-box-1">
        <div className="cc-div-box-2 ">
          <p className="cc-p-1" title={UserName}>
            {UserName ? UserName : "--"}
            <span className="cc-span-1" title={UserID}>
              ({UserID ? UserID : "--"})
            </span>
          </p>
          <div className="cc-div-box-1">
            <p className="cc-p-2">
              出生年月:
              <span className="cc-span-2" title={birthday}>
                {birthday ? birthday : "--"}
              </span>
            </p>
            <p className="cc-p-2">
              民族:
              <span className="cc-span-2" title={nation}>
                {nation ? nation : "--"}
              </span>
            </p>
            <p className="cc-p-2">
              性别:
              <span className="cc-span-2" title={Gender}>
                {Gender ? Gender : "--"}
              </span>
            </p>
          </div>
          <div className="cc-div-box-1">
            <p className="cc-p-2">
              籍贯:
              <span className="cc-span-2" title={nativeSpace}>
                {nativeSpace ? nativeSpace : "--"}
              </span>
            </p>
            <p className="cc-p-2">
              政治面貌:
              <span className="cc-span-2" title={politicStatus}>
                {politicStatus ? politicStatus : "--"}
              </span>
            </p>
          </div>
          <div className="cc-div-box-1">
            <p className="cc-p-2">
              身份证号:
              <span className="cc-span-2 IDCardNo" title={IDCardNo}>
                {IDCardNo ? IDCardNo : "--"}
              </span>
            </p>
            <p className="cc-p-2">
              职称:
              <span className="cc-span-2" title={TitleName}>
                {TitleName ? TitleName : "--"}
              </span>
            </p>
          </div>
        </div>
        <div
          className="ca-photo"
          style={{
            background: `url(${PhotoPath}) no-repeat center top/100%  `,
          }}
        ></div>
      </div>
      <div className="cc-div-box-1">
        <p className="cc-p-2 SubjectNames">
          所教学科:
          <span className="cc-span-2 " title={SubjectNames}>
            {SubjectNames ? SubjectNames : "--"}
          </span>
        </p>
        <p className="cc-p-2">
          最高学历:
          <span className="cc-span-2" title={degree}>
            {degree ? degree : "--"}
          </span>
        </p>
        <p className="cc-p-2">
          最高学位:
          <span className="cc-span-2" title={educationBackground}>
            {educationBackground ? educationBackground : "--"}
          </span>
        </p>
      </div>
      <div className="cc-div-box-1">
        <p className="cc-p-2 Telephone">
          预留电话:
          <span className="cc-span-2" title={Telephone}>
            {Telephone ? Telephone : "--"}
          </span>
        </p>
        <p className="cc-p-2 Email">
          电子邮箱:
          <span className="cc-span-2" title={Email}>
            {Email ? Email : "--"}
          </span>
        </p>
      </div>
      <p className="cc-p-2">
        家庭地址:
        <span className="cc-span-2" title={HomeAddress}>
          {HomeAddress ? HomeAddress : "--"}
        </span>
      </p>
      <div className="cc-hr"></div>
      <div className="ca-title"></div>
      <div className="ca-education-bg">
        {EducationBackgroundDetailData instanceof Array &&
        EducationBackgroundDetailData.length > 0 ? (
          <Carousel dotPosition={"bottom"} dots={{ className: "edu-card-dot" }}>
            {EducationBackgroundDetailData.map((child, index) => {
              return (
                <div key={index} className="edu-card">
                  {child.map((detail, index2) => {
                    let {
                      startTime,
                      endTime,
                      currentSchool,
                      extend1,
                      extend2,
                      eduStage,
                    } = detail;
                    return (
                      <p key={index2} className="cc-p-2 edu-details">
                        {moment(startTime).format("YYYY.MM") +
                          "~" +
                          moment(endTime).format("YYYY.MM")}
                        <span className="cc-span-2">
                          {currentSchool ? currentSchool : ""}
                          {eduStage && eduStageList[eduStage]
                            ? "，" + eduStageList[eduStage]
                            : ""}
                        </span>
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </Carousel>
        ) : (
          <p className="cc-empty">暂无教育背景</p>
        )}
      </div>
    </div>
  );
}

export default memo(forwardRef(Archives));
