/*
 *                   江城子 . 程序员之歌
 *
 *               十年生死两茫茫，写程序，到天亮。
 *                   千行代码，Bug何处藏。
 *               纵使上线又怎样，朝令改，夕断肠。
 *
 *               领导每天新想法，天天改，日日忙。
 *                   相顾无言，惟有泪千行。
 *               每晚灯火阑珊处，夜难寐，加班狂。
 *
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2021-01-07 11:11:17
 * @LastEditTime: 2021-01-07 11:11:17
 * @Description:
 * @FilePath: \teacher-development\src\pages\teacher\train\index.js
 */

import {
  connect,useCallback
  // useSelector,
  //   useDispatch,
} from "react-redux";
import React, {
  // useCallback,
  memo,
  useMemo,
  useEffect,
  useState,
  useReducer,
  // useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import "./index.scss";
import { withRouter } from "react-router-dom";
import FileDetail from "@/component/fileDetail";
import { getCruitList } from "@/api/train";
import moment from "moment";
import { Search } from "@/component/common";
import { autoAlert } from "@/util/public";
import {  applyTrain } from "@/api/train";

function Train(props, ref) {
  let {
    history,
    roleMsg: { schoolID, collegeID, selectLevel },
  } = props;
 const onApplyClick = useCallback(
   (data,title,callback) => {
    applyTrain(data).then((res) => {
      if (res.result) {
        autoAlert({
          title: title + "成功",
          type: "success",
          autoHide: true,
          // cancelShow: true,
        });
        callback();
      } else {
        autoAlert({
          title: title + "失败",
          type: "error",
          autoHide: true,
          // cancelShow: true,
        });
      }
    });
   
   },
   [],
 )
  return (
    <div className="frame-type-route teacher-train-details">
       <FileDetail canControlApply={onApplyClick}></FileDetail>
    </div>
  );
}

const mapStateToProps = (state) => {
  let {
    handleData: { teacherRecruitMsg },
    commonData: { roleMsg },
  } = state;
  return { teacherRecruitMsg, roleMsg };
};
export default connect(mapStateToProps)(withRouter(memo(forwardRef(Train))));
