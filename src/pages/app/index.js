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
  useState,
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
  const { history } = props;
  let dispatch = useDispatch();
  const [SchoolID, setSchoolID] = useState("各校师资");
  useEffect(() => {
    // let a = 0;
    // let time = setInterval(() => {
    //   history.push("/schoolResource/" + Math.round(Math.random() * 1000));
    //   setSchoolID("蓝鸽学校-" + Math.round(Math.random() * 1000));
    //   a++;
    //   if (a > 10) {
    //     clearInterval(time);
    //   }
    // }, 3000);
  }, []);
  useEffect(() => {
    dispatch({ type: commonActions.COMMON_SET_TEST });
    // get({
    //   url:
    //     "http://192.168.129.1:30103/UserMgr/UserInfoMgr/GetStudentToPage?schoolID=S27-511-AF57&pageIndex=0&pageSize=10&sortFiled=UserID",
    // });
    return () => {};
  }, [dispatch]);
  // console.log(SchoolID);
  // 初始化方法
  const pageInit =(data)=>{
console.log(data)
  }
  return (
    <Frame pageInit={pageInit} type={"default"} search={<div>搜索</div>}>
      <div tabid={"schoolResource"} tabname={SchoolID} param={"SchoolID"}>
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
