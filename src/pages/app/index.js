import "./index.scss";
import {
  connect,
  // useSelector,
  useDispatch,
} from "react-redux";
import React, {
  useCallback,
  memo,
  useEffect,
  useState,
  // useMemo,
  // useImperativeHandle,
  useRef,
  forwardRef,
  useLayoutEffect,
} from "react";
import { commonActions, handleActions } from "../../redux/actions";
// import fetch from "../../util/fetch";
// import config from "../../util/ipConfig";
import Frame from "../../component/frame";
import Bar from "../../component/bar";
import {
  withRouter,
  // , Route, Switch, NavLink
} from "react-router-dom";
import Analysis from "../teachersStatisticAnalysis";
import Recruit from "../recruit";
import Train from "../train";
import TeacherPersonal from "../teacherPersonal";
import { handleRoute, deepMap } from "../../util/public";
// let { get } = fetch;
function App(props, ref) {
  // let commonData = useSelector((state) => state.commonData);
  const {
    history,
    location,
    commonData: { leftMenu, params },
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
  const [RecruitDetail, setRecruitDetail] = useState("detailID");
  // const [RecruitName, setRecruitName] = useState(recruitName);
  const [Path, setPath] = useState([]);
  // 存frame返回的数据
  // const [tabRef,setTabRef]
  // frame的ref
  const frameRef = useRef({});
  // 在这做路由做配置，监听路由变化不合法的时候给它做合法方案

  useLayoutEffect(() => {
    let Path = handleRoute(location.pathname);
    setPath(Path);
    // 没有就默认给个
    if (!Path[0] && leftMenu instanceof Array && leftMenu.length > 0) {
      // history.push("/" + leftMenu[0].key);
      controlRoute(leftMenu[0].key);
      return;
    } else if (Path[0] === "recruitDetail") {
      //教师招聘计划管理,默认
      if (Path[1]) {
        // setRecruitDetail(Path[1]);
      } else {
        controlRoute(recruitId);
      }
      // setRecruitName()
      return;
    }
    // else if (
    //   Path[0] === recruitId &&
    //   Path[1] &&
    //   !recruitParams.find((child) => {
    //     return child.key === Path[1];
    //   })
    // ) {
    //   //教师招聘计划管理,默认
    //   // console.log(Path)
    //   controlRoute(Path[0]);
    //   // setRecruitName()
    //   return;
    // }

    //遍历下path[0]是否存在leftmenushang
    // 这个是为了控制不在左侧上出现的id，但要挂载某个菜单上的操作

    let isExist = false;
    deepMap(leftMenu, (child) => {
      if (
        child.child.key === Path[0] ||
        (child.child.params instanceof Array &&
          child.child.params.some((param) => Path[0] === param.key))
      ) {
        isExist = true;
      }
    });
    // isExist = !isExist
    //   ? params.some((child) => {
    //       return child.key === Path[0];
    //     })
    //   : isExist;
    // 不存在

    if (!isExist && leftMenu.length > 0) {
      // 第一次进来的时候frame还没挂载，所以为undefined，需要自己控制，后面不是undefined了可以使用frame返回的方法
      frameRef.current.removeTab
        ? RemoveTab("", "")
        : controlRoute(leftMenu[0].key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, leftMenu]);
  // 测试tab功能，可以删掉
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

  // 手动路由控制
  function controlRoute() {
    let path = "";
    for (let key in arguments) {
      path += arguments[key] ? "/" + arguments[key] : "";
    }
    history.push(path);
  }
  // 初始化方法
  const pageInit = (data) => {
    // 保证返回的data包含identityDetail，userInfo，basePlatformMsg，role
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
    dispatch({
      type: commonActions.COMMON_SET_TERM_INFO,
      data: data.termInfo,
    });
    // 根据版本级别，显示不同的左侧
    dispatch(commonActions.SetLeftMenu(data.role.level));

    // }
  };
  // // 移除tab
  const RemoveTab =
    // useCallback(
    (...arg) => {
      // console.log(frameRef)
      // if(frameRef.current.tabList.length===1){
      //   controlRoute(leftMenu[0].key);
      // }
      typeof frameRef.current.removeTab === "function" &&
        frameRef.current.removeTab(...arg);
    };
  // ,
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [frameRef.current.removeTab, frameRef.current.tabList]
  // );
  // 保存活动的tab,实时获取
  const getActiveTab = (activeTab) => {
    dispatch(handleActions.setActiveTab(activeTab));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  return (
    <Frame
      pageInit={pageInit}
      type={"default"}
      leftMenu={leftMenu}
      search={<div>搜索</div>}
      ref={frameRef}
      getActiveTab={getActiveTab}
      onContentresize={(height, width) => {
        // 获取主区域的宽高
        dispatch({
          type: commonActions.COMMON_SET_CONTENT_HW,
          data: { height, width },
        });
      }}
      tabPorps={{
        onChange: (e) => {
          console.log(e);
        },
        onEdit: (e, action) => {
          console.log(e, action);
        },
      }}
    >
       
      <Analysis
        tabid={"schoolResource"}
        tabname={SchoolName}
        param={"SchoolID"}
      >
        {SchoolName}
      </Analysis>
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
      <Analysis tabid={"teachingAbility"} tabname={"教师教学能力"}>
        教师教学能力
      </Analysis>
      <Analysis tabid={"workMsg"} tabname={"教师工作量"}>
        教师工作量
      </Analysis>
      <Analysis tabid={"teacherBaseMsg"} tabname={"教师基本信息"}>
        教师基本信息
      </Analysis>
      <Analysis
        tabid={"teacherPersona"}
        tabname={TeacherName}
        param={"TeacherID"}
      >
        {TeacherName}
      </Analysis>
      <Recruit
        tabid={recruitId}
        tabname={"教师招聘计划管理"}
        param={"home"}
        // paramList={recruitParams}
      >
        教师招聘计划管理
      </Recruit>

      <div tabid={"notice"} tabname={"通知公告"}>
        通知公告
      </div>
      <Recruit
        tabid={"publishRecruit"}
        tabname={"发布招聘计划"}
        param={"publish"}
        removeTab={RemoveTab}
      >
        发布招聘计划
      </Recruit>
      <Recruit
        tabid={"recruitDetail"}
        tabname={"招聘计划详情"}
        param={"detail"}
        removeTab={RemoveTab}
      >
        招聘计划详情
      </Recruit>
      <Recruit
        tabid={"editRecruit"}
        tabname={"编辑招聘计划"}
        param={"edit"}
        mustparam={"true"}
        redirect={"teacherRecruit"}
        removeTab={RemoveTab}
      >
        编辑招聘计划
      </Recruit>
      <Train tabid={"teacherTrain"} tabname={"教师培训计划管理"} param={"home"}>
        教师培训计划管理
      </Train>
      <Train
        tabid={"publishTrain"}
        tabname={"发布培训计划"}
        param={"publish"}
        removeTab={RemoveTab}
      >
        发布培训计划
      </Train>
      <Train
        tabid={"trainDetail"}
        tabname={"培训计划详情"}
        param={"detail"}
        removeTab={RemoveTab}
      >
        培训计划详情
      </Train>
      <Train
        tabid={"editTrain"}
        tabname={"编辑培训计划"}
        param={"edit"}
        mustparam={"true"}
        redirect={"teacherTrain"}
        removeTab={RemoveTab}
      >
        编辑培训计划
      </Train>
      <TeacherPersonal
        tabid={"teacherPersonal"}
        tabname={"教师画像查询"}
        param={"list"}
        // mustparam={"true"}
        // redirect={"teacherTrain"}
        removeTab={RemoveTab}
      >
        教师画像查询
      </TeacherPersonal>
      <TeacherPersonal
        tabid={"personalDetail"}
        tabname={"教师画像详情"}
        param={"detail"}
        // mustparam={"true"}
        // redirect={"teacherTrain"}
        removeTab={RemoveTab}
      >
        教师画像详情
      </TeacherPersonal>
    </Frame>
  );
}

const mapStateToProps = (state) => {
  // let { UIState, DataState, PublicState } = state;
  // console.log(state)
  return state;
};
export default connect(mapStateToProps)(withRouter(memo(forwardRef(App))));
