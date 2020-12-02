import "./index.css";
import {
  connect,
  // useSelector,
  useDispatch,
} from "react-redux";
import React, {
  // useCallback,
  memo,
  useEffect,
  // useState,
  // useImperativeHandle,
  // useRef,
  forwardRef,
} from "react";
import { commonActions } from "../../redux/actions";
// import fetch from "../../util/fetch";
// import config from "../../util/ipConfig";
import Frame, { Tab } from "../../component/frame";
import {
  withRouter,
  // , Route, Switch, NavLink
} from "react-router-dom";
// import Test from "../teachersStatisticAnalysis";
// let { get } = fetch;
function App(props, ref) {
  // let commonData = useSelector((state) => state.commonData);
  let dispatch = useDispatch();

  useEffect(() => {
    // console.log(props);
  }, [props]);
  useEffect(() => {
    dispatch({ type: commonActions.COMMON_SET_TEST });
    // get({
    //   url:
    //     "http://192.168.129.1:30103/UserMgr/UserInfoMgr/GetStudentToPage?schoolID=S27-511-AF57&pageIndex=0&pageSize=10&sortFiled=UserID",
    // });
    return () => {};
  }, [dispatch]);
  return (
    <Frame type={"default"}>
      123
      <div tabid={"schoolResource"} tabname={"各校师资"} param={"123"}>
        各校师资
      </div>
      <div
        tabid={"informationizeAbility"}
        tabname={"教师信息化能力"}
        param={"123"}
      >
        教师信息化能力
      </div>
      <div tabid={"teachingAbility"} tabname={"教师教学能力"} param={"123"}>
        教师教学能力
      </div>
      <div tabid={"workMsg"} tabname={"教师工作量"} param={"123"}>
        教师工作量
      </div>
      <div tabid={"teacherBaseMsg"} tabname={"教师基本信息"} param={"123"}>
        教师基本信息
      </div>
    </Frame>
  );
}

const mapStateToProps = (state) => {
  // let { UIState, DataState, PublicState } = state;
  // console.log(state)
  return state;
};
export default connect(mapStateToProps)(withRouter(memo(forwardRef(App))));
