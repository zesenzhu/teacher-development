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
  useMemo,
  // useImperativeHandle,
  useRef,
  forwardRef,
  useLayoutEffect,
} from "react";
import { commonActions, handleActions } from "../../redux/actions";
// import fetch from "../../util/fetch";
// import config from "../../util/ipConfig";
import Frame from "../../component/frame";
import Bar from "@/component/bar";
import {
  withRouter,
  // , Route, Switch, NavLink
} from "react-router-dom";
import Analysis from "../teachersStatisticAnalysis";
import Recruit from "../recruit";
import Train from "../train";
import Notice from "../notice";
import TeacherTrain from "@/pages/teacher/train";
import Details from "@/pages/train/detail";
import TeacherPersonal from "../teacherPersonal";
import { handleRoute, deepMap, getQueryVariable } from "../../util/public";
import Search from "@/component/search";
import { getSearch } from "@/api/search";
import { Empty } from "@/component/common";
import SearchchAll from "../searchAll";
import PersonalDetail from "../personalDetail";
import { GetUserDetailForHX } from "@/api/personal";
import School from "../school";
import LastTime from "@/component/lastTime";
import Import from "../import";
import { getBasePlatformMsg } from "@/util/init";
// let { get } = fetch;
function App(props, ref) {
  // let commonData = useSelector((state) => state.commonData);
  const {
    history,
    location,
    commonData: {
      leftMenu,
      params,
      basePlatFormMsg: { ProVersion },
      roleMsg: { schoolID, collegeID, selectLevel, productLevel },
    },
    handleData: {
      teacherRecruitMsg: {
        tabName: recruitName,
        tabId: recruitId,
        params: recruitParams,
      },
      tabMsg,
    },
  } = props;
  let dispatch = useDispatch();
  const [SchoolName, setSchoolName] = useState("各校师资");
  const [TeacherName, setTeacherName] = useState("教师画像查询");
  const [RecruitDetail, setRecruitDetail] = useState("detailID");
  // 设置frame Type
  const [frameType, setFrameType] = useState(undefined);
  // const [RecruitName, setRecruitName] = useState(recruitName);
  const [Path, setPath] = useState([]);
  // 存page的个人画像的教师信息
  const [TeacherMsg, setTeacherMsg] = useState(null);
  // 教师id
  const [TeacherID, setTeacherID] = useState(null);
  // 存模块id
  const [ModuleID, setModuleID] = useState(null);
  // 需不需要初始化
  const [OnlyBase, setOnlyBase] = useState(false);
  // 招聘详情id
  const [RecruitID, setRecruitID] = useState(null);

  // 模块类型
  const [ModuleType, setModuleType] = useState("");
  // 存frame返回的数据
  // const [tabRef,setTabRef]
  // frame的ref
  const frameRef = useRef({});
  // 在这做路由做配置，监听路由变化不合法的时候给它做合法方案
  // 看是大学还是教育局，各校，各院，
  const NameData = useMemo(() => {
    let data = { schoolList: "各校师资", schoolDetail: "学校详情" };
    switch (productLevel) {
      case 2:
        data = { schoolList: "各院师资", schoolDetail: "学院详情" };

        break;
      default:
    }
    return data;
  }, [productLevel]);
  useEffect(() => {
    let message = window.addEventListener("message", (e) => {
      try {
        let { btnName, sysid, url } = JSON.parse(e.data);
        if (btnName && url) {
          // window.open(url);
          // console.log('/notice/'+encodeURIComponent(url))
          let Url = encodeURIComponent(url);
          dispatch(
            handleActions.setTabMsg({
              ["notice|" + Url]: {
                name: "查看: " + btnName,
                title: "通知公告详情：" + btnName,
              },
            })
          );
          history.push("/notice/" + Url);
        }
      } catch (e) {}
    });
    return () => {
      window.removeEventListener("message", message);
    };
  }, [history]);
  //  提前检查路由
  useEffect(() => {
    let Path = handleRoute(location.pathname);
    // 在教育局中默认传了edu，现在还没有要使用这个的功能，因为教育局就只有一个角色，不用身份验证，模块id一般用来验证身份权限
    let moduleType =
      getQueryVariable("moduleType") || getQueryVariable("ModuleType"); //模块类型：*admin或缺省：管理员，*teacher:教师
    // 单页面
    if (Path[0] === "page" && Path[1]) {
      // 招聘详情界面
      if (Path[1] === "recruit") {
        // 不需要初始化
        setOnlyBase(true);
      }
      setFrameType("page");
      // 现在Path[1]只有教师个人画像，不需要身份验证，也没有模块id，后面加page看情况配置mioduleid
      setModuleID("");
    } else {
      //       L10001 师资发展管理       管理员、教师（学校领导）
      // 默认权限身份IC0002、IC0010

      // L10002   师资发展培训  教师
      // 默认权限身份IC0011、IC0012、IC0013
      if (moduleType === "teacher") {
        setModuleID("L10002");
        // setModuleID("");
        setFrameType("teacher");
      } else {
        //默认管理员模块
        setModuleID("L10001");
        setFrameType("default");
        // setModuleID("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useLayoutEffect(() => {
    // 平台模式类型不确定，不允许进来
    if (!frameType) {
      return;
    }
    let Path = handleRoute(location.pathname);
    setPath(Path);
    // 管理员的
    if (frameType === "default") {
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
    }

    if (frameType === "teacher") {
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, leftMenu, frameType]);

  // 手动路由控制
  function controlRoute() {
    let path = "";
    for (let key in arguments) {
      path += arguments[key] ? "/" + arguments[key] : "";
    }
    history.push(path);
  }
  // 初始化方法
  const pageInit = useCallback(
    async (data) => {
      let isInit = true;
      let Path = handleRoute(location.pathname);
      // data为false表示没有初始化
      if (data) {
        // OnlyBase
        // 保证返回的data包含identityDetail，userInfo，basePlatformMsg，role
        data.identityDetail &&
          dispatch({
            type: commonActions.COMMON_SET_IDENTITY,
            data: data.identityDetail,
          });
        data.userInfo &&
          dispatch({
            type: commonActions.COMMON_SET_USER_INFO,
            data: data.userInfo,
          });
        data.basePlatformMsg &&
          dispatch({
            type: commonActions.COMMON_SET_BASE_PLAT_FORM_MSG,
            data: data.basePlatformMsg,
          });
        data.role &&
          dispatch({
            type: commonActions.COMMON_SET_ROLE_MSG,
            data: data.role,
          });
        data.termInfo &&
          dispatch({
            type: commonActions.COMMON_SET_TERM_INFO,
            data: data.termInfo,
          });
        data.systemServer &&
          dispatch({
            type: commonActions.COMMON_SET_SYSTEM_SERVER,
            data: data.systemServer,
          });
        data.token &&
          data.token &&
          dispatch(commonActions.SetCommonData({ token: data.token }));

        // systemServer
        // 根据版本级别，显示不同的左侧,400为通知公告的系统id，没有就不显示通知告
        data.role &&
          dispatch(
            commonActions.SetLeftMenu(
              data.role.productLevel,
              !!data.systemServer[400],
              !!data.systemServer["E34"] || data.role.selectLevel === 1 //教育局没有导入
            )
          );

        // // 为空表示是学生，家长，不允许进来
        // if(!data.role.frameType){

        // }
        // 如果还没定义可以再定义框架类型，因为上面的是先检查是否是page了
        if (!frameType) {
          // 根据用户角色显示不同的界面

          setFrameType(data.role.frameType);
        } else {
          //在单页面page的时候做用户信息处理，看是否合法，不合法跳转，只做page的检测，再具体的就由内部做
          // 刚开始的page只有新版教师个人画像，所以会有多种角色查看该界面，暂不做当前登陆用户角色
          if (Path[0] === "page" && Path[1]) {
            // 教育局，没有自己的个人画像
            if (data.role.IsEdu) {
              // 个人画像详情界面
              if (Path[1] === "personalDetail") {
                // 回首页
                window.location.replace("");
              }
            }
            //先获取所看的用户id，检查是否有效
            if (Path[1] === "personalDetail" && Path[2]) {
              let res = await GetUserDetailForHX({
                baseIP: data.basePlatformMsg.BasicWebRootUrl,
                userID: Path[2],
              });
              if (res.StatusCode === 200) {
                setTeacherMsg(res.Data);
                setTeacherID(Path[2]); //这个要在最后改变，因为他控制个人画像里面的副作用的运行
              } else {
                // if (res.ErrCode === -2) {//id有误
                window.location.href =
                  data.basePlatformMsg.BasicWebRootUrl +
                  "/Error.aspx?errcode=E012";
                isInit = false;
                // }
              }
            } else if (Path[1] === "recruit" && Path[2]) {
              setRecruitID(Path[2]);
            } else {
              isInit = false;
              // return ;
              window.location.replace(
                data.basePlatformMsg.BasicWebRootUrl +
                  "/Error.aspx?errcode=E012"
              ); //缺参数
            }
          }

          // 解决地夜歌标签页是各校/各院的标签页名字不对bug
          if (Path[0] === "schoolResource") {
            dispatch(
              handleActions.setTabMsg({
                schoolResource: {
                  name: NameData.schoolList,
                  title: NameData.schoolList,
                },
              })
            );
          }
        }
      }
      // else {
      //   let res = await getBasePlatformMsg();
      //   console.log(res);
      //   // 招聘详情界面
      //   if (Path[0] === "page" && Path[1] === "recruit"&&Path[2]) {

      //     setRecruitID(Path[2])
      //   } else {
      //     isInit = false;
      //     // return ;
      //     window.location.href =
      //     res.BasicWebRootUrl + "/Error.aspx?errcode=E012"; //缺参数
      //   }
      // }

      // }
      return isInit;
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [frameType]
  );
  // 搜索api
  const searchApi = useCallback(
    (payload) => {
      // console.log(payload);
      return getSearch.call(this, {
        schoolID,
        collegeID,
        selectLevel,
        ...payload,
      });
    },
    [schoolID, collegeID, selectLevel]
  );
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
  const onReload = useCallback(
    (time, isFirst) => {
      if (!isFirst) {
        console.log(history, window.location);
        history.replace(history.location.pathname);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Frame
      pageInit={pageInit}
      type={frameType}
      leftMenu={leftMenu}
      moduleID={ModuleID}
      onlyBase={OnlyBase}
      tabMsg={tabMsg}
      search={
        <Search
          api={searchApi}
          // overlayStyle={{width:'402px'}}
          searchResult={(res, keyword) => {
            return <SearchchAll keyword={keyword} data={res}></SearchchAll>;
          }}
          className="frame-search-all"
        ></Search>
      }
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
      otherMsg={{
        otherProps: {},
        children: <LastTime onReload={onReload}></LastTime>,
      }}
    >
      {/* <Analysis
        tabid={"schoolResource"}
        tabname={SchoolName}
        param={"SchoolID"}
      >
        {SchoolName}
      </Analysis> */}

      <Analysis tabid={"informationizeAbility"} tabname={"教师信息化能力"}>
        教师教学能力
      </Analysis>
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
        mustparam={"true"}
        redirect={"teacherRecruit"}
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
        mustparam={"true"}
        redirect={"teacherTrain"}
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
      <Notice tabid={"notice"} tabname={"通知公告"} param={"id"}></Notice>
      {/* 有frame类型的属性，*teacher：为教师类型，缺省则为default类型 */}
      {/* 教师端 */}
      <TeacherTrain
        frametype={"teacher"}
        routeid={"teacherTrain"}
      ></TeacherTrain>
      <Details
        frametype={"teacher"}
        routeid={"trainDetail"}
        routename={"培训计划详情"}
        param={"id"}
        controlSize={""}
        useScrollbars={false}
      >
        培训计划详情
      </Details>
      <p
        proversion={ProVersion}
        className="teacher-ProVersion"
        frametype={"teacher"}
      >
        {ProVersion}
      </p>
      {/* 教师端end */}
      {/* 个人画像 */}
      <PersonalDetail
        frametype={"page"}
        pageTitle={"教师个人画像"}
        pageid={"personalDetail"}
        param={"id"}
        teachermsg={TeacherMsg}
        teacherid={TeacherID}
      ></PersonalDetail>

      {/* 个人画像end */}
      {/* 招聘详情 */}
      <Recruit
        pageTitle={"招聘计划详情"}
        frametype={"page"}
        pageid={"recruit"}
        param={"recruit"}
        recruitid={RecruitID}
      ></Recruit>

      {/* PersonalDetail */}
      {/* 多学校 */}

      <School
        tabid={"schoolResource"}
        tabname={NameData.schoolList}
        param={"list"}
        removeTab={RemoveTab}
      ></School>
      <School
        tabname={NameData.schoolDetail}
        tabid={"schoolDetail"}
        param={"detail"}
        mustparam={"true"}
        redirect={"schoolResource"}
        removeTab={RemoveTab}
      ></School>
      <Import
        tabid={"import"}
        tabname={"导入师资信息"}
        // mustparam={"true"}
        param={"type"}
        removeTab={RemoveTab}
        title
      ></Import>
      <p proversion={ProVersion} className="page-ProVersion" frametype={"page"}>
        {ProVersion}
      </p>
    </Frame>
  );
}

const mapStateToProps = (state) => {
  // let { UIState, DataState, PublicState } = state;
  // console.log(state)
  return state;
};
export default connect(mapStateToProps)(withRouter(memo(forwardRef(App))));
