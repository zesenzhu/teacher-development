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
import Frame from "../../component/frame";
import Bar from "../../component/Bar";
import {
  withRouter,
  // , Route, Switch, NavLink
} from "react-router-dom";
import Test from "../teachersStatisticAnalysis";
import Recruit from "../recruit";
import { handleRoute, deepMap } from "../../util/public";
// let { get } = fetch;
function App(props, ref) {
  // let commonData = useSelector((state) => state.commonData);
  const {
    history,
    location,
    commonData: { leftMenu },
    handleData: {
      teacherRecruitMsg: {
        tabName: recruitName,
        tabId: recruitId,
        params: recruitParams,
      },
    },
  } = props;
  let dispatch = useDispatch();
  const [SchoolName, setSchoolName] = useState("各校师资");
  const [TeacherName, setTeacherName] = useState("教师画像查询");
  // const [RecruitName, setRecruitName] = useState(recruitName);
  const [Path, setPath] = useState([]);
  useEffect(() => {
    let Path = handleRoute(location.pathname);
    setPath(Path);
    // 没有就默认给个
    if (!Path[0] && leftMenu instanceof Array && leftMenu.length > 0) {
      // history.push("/" + leftMenu[0].key);
      controlRoute(leftMenu[0].key);
      return;
    } else if (
      Path[0] === recruitId &&
      Path[1] &&
      !recruitParams.find((child) => {
        return child.key === Path[1];
      })
    ) {
      //教师招聘计划管理,默认
      // console.log(Path)
      controlRoute(Path[0]);
      // setRecruitName()
      return;
    }

    //遍历下path[0]是否存在leftmenushang
    let isExist = false;
    deepMap(leftMenu, (child) => {
      // console.log();
      if (child.child.key === Path[0]) {
        isExist = true;
      }
    });
    console.log(isExist);
    // 不存在
    if (!isExist) {
      controlRoute(leftMenu[0].key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, leftMenu]);
  useEffect(() => {
    // let a = 0;
    // let time = setInterval(() => {
    //   history.push("/schoolResource/" + Math.round(Math.random() * 1000));
    //   setSchoolName("蓝鸽学校-" + Math.round(Math.random() * 1000));
    //   a++;
    //   if (a > 10) {
    //     clearInterval(time);
    //   }
    // }, 3000);
    // return () => {
    //   clearInterval(time);
    // };
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
  // 手动路由控制
  function controlRoute() {
    let path = "";
    for (let key in arguments) {
      path += "/" + arguments[key];
    }
    history.push(path);
  }
  // 初始化方法
  const pageInit = (data) => {
    // 保证返回的data包含identityDetail，userInfo，basePlatformMsg
    dispatch({
      type: commonActions.COMMON_SET_IDENTITY,
      data: data.identityDetail,
    });
    dispatch({
      type: commonActions.COMMON_SET_USER_INFO,
      data: data.userInfo,
    });
    dispatch({
      type: commonActions.COMMON_SET_BASE_PLAT_FORM_MSG,
      data: data.basePlatformMsg,
    });
    dispatch({
      type: commonActions.COMMON_SET_ROLE_MSG,
      data: data.role,
    });
    // }
  };
  // console.log(recruitParams.find((child)=>{return child.key===(Path[1]?Path[1]:'')}).title)
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
        <Bar
          barName={"教师信息化能力"}
          topContext={
            <div
              onClick={() => {
                console.log("sdas");
              }}
            >
              123
            </div>
          }
        ></Bar>
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
      <Recruit
        tabid={recruitId}
        tabname={
          recruitParams.find((child) => {
            return child.key === (Path[1] ? Path[1] : "");
          }) &&
          recruitParams.find((child) => {
            return child.key === (Path[1] ? Path[1] : "");
          }).title
        }
        param={"pageName"}
        paramList={recruitParams}
      >
        教师招聘计划管理
      </Recruit>
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
