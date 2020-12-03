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
import Test from "../teachersStatisticAnalysis";
// let { get } = fetch;
function App(props, ref) {
  // let commonData = useSelector((state) => state.commonData);
  const {
    history,
    location,
    commonData: { leftMenu },
  } = props;
  let dispatch = useDispatch();
  const [SchoolName, setSchoolName] = useState("各校师资");
  const [TeacherName, setTeacherName] = useState("教师画像查询");
  useEffect(() => {
    
    console.log(location);
    // 没有就默认给个
    if (
      location.pathname === "/" &&
      leftMenu instanceof Array &&
      leftMenu.length > 0
    ) {
      history.push("/" + leftMenu[0].key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, leftMenu]);
  useEffect(() => {
    let a = 0;
    let time = setInterval(() => {
      history.push("/schoolResource/" + Math.round(Math.random() * 1000));
      setSchoolName("蓝鸽学校-" + Math.round(Math.random() * 1000));
      a++;
      if (a > 10) {
        clearInterval(time);
      }
    }, 3000);
    return () => {
      clearInterval(time);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch({ type: commonActions.COMMON_SET_TEST });
    // get({
    //   url:
    //     "http://192.168.129.1:30103/UserMgr/UserInfoMgr/GetStudentToPage?schoolID=S27-511-AF57&pageIndex=0&pageSize=10&sortFiled=UserID",
    // });
    return () => {};
  }, [dispatch]);
  // console.log(SchoolName);
  // 初始化方法
  const pageInit = (data) => {
    console.log(data);
    // 保证返回的data包含identityDetail，userInfo，basePlatformMsg
    dispatch({
      type: commonActions.COMMON_SET_IDENTITY,
      data: data.identityDetail,
    });
    dispatch({ type: commonActions.COMMON_SET_USER_INFO, data: data.userInfo });
    dispatch({
      type: commonActions.COMMON_SET_BASE_PLAT_FORM_MSG,
      data: data.basePlatformMsg,
    });
  };

  return (
    <Frame
      pageInit={pageInit}
      type={"default"}
      leftMenu={leftMenu}
      search={<div>搜索</div>}
    >
      <Test tabid={"schoolResource"} tabname={SchoolName} param={"SchoolID"}>
        {SchoolName}
      </Test>
      <div tabid={"informationizeAbility"} tabname={"教师信息化能力"}>
        教师信息化能力
      </div>
      <div tabid={"teachingAbility"} tabname={"教师教学能力"}>
        教师教学能力
      </div>
      <div tabid={"workMsg"} tabname={"教师工作量"}>
        教师工作量
      </div>
      <div tabid={"teacherBaseMsg"} tabname={"教师基本信息"}>
        教师基本信息
      </div>
      <div tabid={"teacherPersona"} tabname={TeacherName} param={"TeacherID"}>
        {TeacherName}
      </div>
      <div tabid={"teacherRecruit"} tabname={"教师招聘计划管理"}>
        教师招聘计划管理
      </div>
      <div tabid={"teacherTrain"} tabname={"教师培训计划管理"}>
        教师培训计划管理
      </div>
      <div tabid={"notice"} tabname={"通知公告"}>
        通知公告
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
