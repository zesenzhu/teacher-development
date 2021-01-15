/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑       永不宕机     永无BUG
 *
 *        佛曰:
 *                写字楼里写字间，写字间里程序员；
 *                程序人员写程序，又拿程序换酒钱。
 *                酒醒只在网上坐，酒醉还来网下眠；
 *                酒醉酒醒日复日，网上网下年复年。
 *                但愿老死电脑间，不愿鞠躬老板前；
 *                奔驰宝马贵者趣，公交自行程序员。
 *                别人笑我忒疯癫，我笑自己命太贱；
 *                不见满街漂亮妹，哪个归得程序员？
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-12-08 13:54:00
 * @LastEditTime: 2020-12-09 14:34:41
 * @Description:
 * @FilePath: \teacher-development\src\component\temple\index.js
 */
import {
  connect,
  // useSelector,
  //   useDispatch,
} from "react-redux";
import React, {
  useCallback,
  memo,
  useEffect,
  useState,
  // useImperativeHandle,
  useMemo,
  // useReducer,
  // createContext,
  // useContext,
  useRef,
  forwardRef,
  useLayoutEffect,
} from "react";
import "./index.scss";
//   import { Search, Empty } from "../common";
import { handleRoute } from "@/util/public";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import { debounce } from "@/util/public";
import {
  GetSubSystemsMainServerBySubjectID,
  getTeacherDetailIntroduction,
  GetTermAndPeriodAndWeekNOInfo,
  GetTeacherResView,
  GetTeachPlanStatistics,
  GetTeacherpercentage,
  GetAllTerm,
  GetTeacherWork,
} from "@/api/personal";
import Card from "./card";
import Archives from "./archives";
import Accout from "./accout";
import Teach from "./teach";
import Work from "./work";
import HistoryDom from "./history";
import Information from "./information";
import Data from "./data";
function PersonalDetail(props, ref) {
  let {
    className,
    history,
    location,
    basePlatFormMsg,
    teachermsg,
    teacherid,
    token,
    ...reset
  } = props;
  const [rate, setRate] = useState(null);
  // 缩放模式，*ratio:等比，以宽的比例为准，*full:全屏，宽高各自比例
  const [zoomType, setZoomType] = useState("full");
  // 宽高
  const [content, setContent] = useState(null);
  const personalRef = useRef(null);
  // 动画状态修改
  const [animationType, setAnimationType] = useState(true);
  // 设置暂停
  const [paused, setPaused] = useState(false);
  // 设置选中
  const [SelectCard, setSelectCard] = useState(false);

  // 存系统url
  const [SysUrl, setSysUrl] = useState(null);
  // 档案
  const [archives, setArchives] = useState(null);
  // 账号
  const [accout, setAccout] = useState(null);
  // 信息化
  const [information, setInformation] = useState(null);
  // 教研
  const [teach, setTeach] = useState(null);
  // 教学资料
  const [data, setData] = useState(null);
  const [TeachPlan, setTeachPlan] = useState(null); //教学方案
  const [Percentage, setPercentage] = useState(null); //精品课程
  const [ResView, setResView] = useState(null); //电子资源
  const [SubjectList, setSubjectList] = useState(null); //学科列表
  // 工作量
  const [work, setWork] = useState(null);
  const [WorkTerm, setWorkTerm] = useState(null);
  const [WorkTermList, setWorkTermList] = useState(null);
  // 档案
  const [History, setHistory] = useState(null);

  // 存周次列表
  const [WeekList, setWeekList] = useState(null);
  const [WeekData, setWeekData] = useState(null);
  // 存教学资料的参数
  const [DataParams, setDataParams] = useState({});

  // 存卡
  const cardList = [
    "accout",
    "information",
    "teach",
    "data",
    "work",
    "archives",
    "history",
  ];
 
  // 获取各平台地址
  useEffect(() => {
    let sysIDs = [
      310, //教学方案
      // 300, //教学方案
      "D21", //精品课程
      "E34", //档案
      "C10", //电子资源
      // 'D21', //课程精品
    ];
    // console.log(basePlatFormMsg)
    if (!SysUrl && basePlatFormMsg.BasicWebRootUrl) {
      GetSubSystemsMainServerBySubjectID({
        sysIDs,
        baseIP: basePlatFormMsg.BasicWebRootUrl,
      }).then((res) => {
        // console.log(res);
        if (res.StatusCode === 200) {
          setSysUrl(res.data);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basePlatFormMsg]);

  // 获取接口
  useEffect(() => {
    let baseIP = basePlatFormMsg.BasicWebRootUrl;
    let userID = teacherid;
    if (SysUrl) {
      // 档案啊
      if (SysUrl["E34"] && SysUrl["E34"].WebSvrAddr) {
        // 获取档案-教务
        getTeacherDetailIntroduction({
          userID,
          baseIP: SysUrl["E34"].WebSvrAddr,
        }).then((res) => {
          if (res.StatusCode === 200) {
            setArchives({ ...archives, ...res.Data });
          }
        });
        // 获取教师工作量学期
        GetAllTerm({ proxy: SysUrl["E34"].WsSvrAddr }).then((res) => {
          if (res.StatusCode === 200) {
            // console.log(res.Data)
            setWorkTermList(res.Data);
            setWorkTerm(res.Data[0]);
          } else {
            setWorkTerm(false);
          }
        });
      }
      // 教研
      if (true) {
        setTeach([96, 18, 13]);
        // setWork([96, 2, 18, 13]);
        setHistory([
          { time: "2020-1", title: "荣获“三育人”先进个人称号" },
          { time: "2020-1", title: "荣获“三育人”先进个人称号" },
          { time: "2020-1", title: "荣获“三育人”先进个人称号" },
          { time: "2020-1", title: "荣获“三育人”先进个人称号" },
          { time: "2020-1", title: "荣获“三育人”先进个人称号" },
          { time: "2020-1", title: "荣获“三育人”先进个人称号" },
          { time: "2020-1", title: "荣获“三育人”先进个人称号" },
        ]);

        // changeData({
        //   // ResView: {
        //   //   AllCount: 456,
        //   //   UseCount: 135,
        //   //   AllScale: 100,
        //   //   AllSubject: [
        //   //     // { SubjectName: "英语", SUbjectID: "1", Scale: null },
        //   //     { SubjectName: "语文", SUbjectID: "2", Scale: 10 },
        //   //     { SubjectName: "数学", SUbjectID: "3", Scale: 50 },
        //   //   ],
        //   // }, //电子资源
        //   // Data?...Data:{},
        //   Percentage: {
        //     AllCount: 12,
        //     UseCount: 154,
        //     AllScale: 95,
        //     AllSubject: [
        //       { SubjectName: "英语", SUbjectID: "1", Scale: 60 },
        //       { SubjectName: "语文", SUbjectID: "2", Scale: 100 },
        //       { SubjectName: "数学", SUbjectID: "3", Scale: 50 },
        //     ],
        //   }, //精品课程
        //   // TeachPlan: {
        //   //   AllCount: 1222,
        //   //   UseCount: 10,
        //   //   AllScale: 50,
        //   //   AllSubject: [
        //   //     { SubjectName: "英语", SUbjectID: "1", Scale: 6 },
        //   //     { SubjectName: "语文", SUbjectID: "2", Scale: 30 },
        //   //     { SubjectName: "数学", SUbjectID: "3", Scale: 80 },
        //   //   ],
        //   // }, //教学方案
        //   SubjectList: [
        //     // { key: "same", value: "同学科" },
        //     { key: "1", value: "英语" },
        //     { key: "2", value: "语文" },
        //     { key: "3", value: "数学" },
        //   ],
        // });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SysUrl]);

  // 不需要系统url的接口
  useEffect(() => {
    let userID = teacherid;
    if (basePlatFormMsg) {
      if (teachermsg) {
        setDataParams({
          ...DataParams,
          schoolID: teachermsg.SchoolID || "S-666",
          subjectIDs: teachermsg.SubjectIDs,
          subjectNames: teachermsg.SubjectNames,
          baseIP: basePlatFormMsg.BasicWebRootUrl,
        });
        if (typeof teachermsg.SubjectNames === "string") {
          let SubjectList = [];
          let SubjectIDList =
            typeof teachermsg.SubjectIDs === "string"
              ? teachermsg.SubjectIDs.split(",")
              : [];
          teachermsg.SubjectNames.split(",").forEach((child, index) => {
            SubjectList.push({
              key: SubjectIDList[index] || index,
              value: child,
            });
          });
          setSubjectList(SubjectList);
        }

        // setSubjectList([
        //   // { key: "same", value: "同学科" },
        //   { key: "1", value: "英语" },
        //   { key: "2", value: "语文" },
        //   { key: "3", value: "数学" },
        // ]);
        //获取学期周次
        GetTermAndPeriodAndWeekNOInfo({
          userID,
          baseIP: basePlatFormMsg.BasicWebRootUrl,
          schoolID: teachermsg.SchoolID || "S-666",
        }).then((res) => {
          if (res.StatusCode === 200) {
            setWeekList(res.Data.WeekList);
            setWeekData(res.Data.NowWeekSelect);
          } else {
            setWeekData(false);
          }
        });

        setArchives(teachermsg);
        setAccout(teachermsg);

        setInformation({
          TimeSpan: 48, //累计上机时长
          DayAvgTimeSpan: 1.2, //累计上机时长
          LoginCount: 485, //上机总次数
          AvgLoginTimeSpan: 48, //平均每次上机时长
          DayTimeList: [
            {
              Time: "06:00~09:00",
              Count: 10,
            },
            {
              Time: "09:00~12:00",
              Count: 70,
            },
            {
              Time: "12:00~15:00",
              Count: 20,
            },
            {
              Time: "15:00~18:00",
              Count: 80,
            },
            {
              Time: "18:00~21:00",
              Count: 10,
            },
            {
              Time: "21:00~23:59",
              Count: 50,
            },
          ], //平均每日上机时间段分布
          DayOnlineList: [
            //平均每日在线办公/
            //教学时长占比
            {
              NodeName: "在线办公",
              Time: 20,
            },
            {
              NodeName: "在线教学",
              Time: 20,
            },
          ],
        });
      }

      // GetUserDetailForHX({userID:}).then((res) => {
      //   if (res.StatusCode === 200) {
      //     setSysUrl(res.data);
      //   }
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherid]);
  // 工作量，依赖学期和sysurl
  useEffect(() => {
    if (!SysUrl || !WorkTerm) {
      return;
    }
    let userID = teacherid;
    let userName = teachermsg.UserName;

    if (SysUrl["E34"] && SysUrl["E34"].WebSvrAddr && WeekData) {
      GetTeacherWork({
        userName:userID,
        baseIP: DataParams.baseIP,
        proxy: SysUrl["E34"].WebSvrAddr,
        token,
        semester: WorkTerm.value,
      }).then((res) => {
        if (res.StatusCode === 200) {
          setWork(res.Data);
          // changeData({ ResView: res.Data });
        } else {
          setWork(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SysUrl, WorkTerm]);
  // 教学资料需要依赖周次和sysURl
  useEffect(() => {
    let userID = teacherid;
    if (!SysUrl) {
      return;
    }
    // 电子资源
    if (SysUrl["C10"] && SysUrl["C10"].WebSvrAddr && WeekData) {
      GetTeacherResView({
        userID,
        baseIP: DataParams.baseIP,
        proxy: SysUrl["C10"].WebSvrAddr,
        token,
        schoolID: DataParams.schoolID,
        subjectIDs: DataParams.subjectIDs,
        subjectNames: DataParams.subjectNames,
        startTime: WeekData.startTime,
        endTime: WeekData.endTime,
      }).then((res) => {
        if (res.StatusCode === 200) {
          setResView(res.Data);
          // changeData({ ResView: res.Data });
        }
      });
    }
    // 教学方案
    if (SysUrl["310"] && SysUrl["310"].WebSvrAddr && WeekData) {
      GetTeachPlanStatistics({
        userID,
        baseIP: DataParams.baseIP,
        proxy: SysUrl["310"].WebSvrAddr,
        token,
        // schoolID: DataParams.schoolID,
        // subjectIDs: DataParams.subjectIDs,
        // subjectNames: DataParams.subjectNames,
        startTime: WeekData.startTime,
        endTime: WeekData.endTime,
      }).then((res) => {
        if (res.StatusCode === 200) {
          // console.log(res.Data);
          setTeachPlan(res.Data);
          // changeData({ TeachPlan: res.Data });
        }
      });
    }
    // 精品课程
    if (SysUrl["D21"] && SysUrl["D21"].WsSvrAddr && WeekData) {
      GetTeacherpercentage({
        userID,
        baseIP: DataParams.baseIP,
        proxy: SysUrl["D21"].WsSvrAddr,
        token,
        schoolID: DataParams.schoolID,
        subjectIDs: DataParams.subjectIDs,
        subjectNames: DataParams.subjectNames,
        startTime: WeekData.startTime,
        endTime: WeekData.endTime,
      }).then((res) => {
        if (res.StatusCode === 200) {
          console.log(res.Data)
          setPercentage(res.Data);
          // changeData({ ResView: res.Data });
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SysUrl, WeekData]);
  // 控制初始进来的时候是什么模式
  useLayoutEffect(() => {
    let page = $(personalRef.current);
    let height = page.height();
    let width = page.width();
    if (height > width) {
      setZoomType("ratio");
    }
    // body去掉overflow
    // $('body').css('overflow-x','hidden')
  }, []);

  useLayoutEffect(() => {
    let page = $(personalRef.current);
    let InitWidth = 1920;
    let InitHeight = 1080;

    const resize = () => {
      let height = page.height();
      let width = page.width();

      setContent([width, height]);
      // console.log(width, height)
      setRate([
        width / InitWidth,
        zoomType === "ratio" ? width / InitWidth : height / InitHeight,
      ]);
    };
    resize();
    window.addEventListener("resize", debounce(resize, 500), false);

    return () => {
      window.removeEventListener("resize", debounce(resize, 500));
    };
  }, [zoomType]);
  // 获取长度
  const getPX = useCallback(
    (old = [1920, 1080]) => {
      // rate[0] = rate[0] || 1;
      // rate[1] = rate[1] || 1;
      return {
        width: old[0]
          ? old[0] * 1
          : // rate[0]
            "100%",
        height: old[1]
          ? old[1] * 1
          : // rate[1]
            "100%",
      };
    },
    [rate]
  );
  useEffect(() => {
    console.log(props);
  }, [location]);
  // 点击card 高亮模块
  const onCardClick = useCallback((id) => {}, []);

  return (
    <div
      ref={personalRef}
      className={`lg-PersonalDetail ${className ? className : ""}`}
    >
      {rate ? (
        <div
          className="pd-content"
          style={
            rate
              ? {
                  ...getPX([1920, 1080]),
                  transform: `scale(${rate[0]},${rate[1]})`,
                  left: (-(1 - rate[0]) / 2) * 1920 + "px",
                  top: (-(1 - rate[1]) / 2) * 1080 + "px",
                  position: "absolute",
                }
              : {}
          }
        >
          <div className="pd-top" style={{ ...getPX([1920, 85]) }}>
            <div className="pd-top-bg" style={{ ...getPX([1920, 343]) }}></div>
          </div>
          <div className="pd-center" style={{ ...getPX([1920, 995]) }}>
            <div
              className="pd-center-bg"
              style={{ ...getPX([1874, 930]) }}
            ></div>
            <div
              className="pd-center-content"
              style={{
                ...getPX([1920, 937]),
                padding: `0 ${getPX([18]).width}px`,
              }}
            >
              <div
                className="pd-center-content-left"
                style={{ ...getPX([480]), margin: `0 ${getPX([18]).width}px` }}
              >
                <Card
                  cardid={"archives"}
                  select={SelectCard}
                  height={340}
                  loading={archives === null}
                  data={archives}
                  component={Archives}
                ></Card>
                <Card
                  select={SelectCard}
                  cardid={"accout"}
                  height={217}
                  loading={accout === null}
                  component={Accout}
                  data={accout}
                ></Card>
                <Card
                  select={SelectCard}
                  cardid={"teach"}
                  component={Teach}
                  height={275}
                  loading={teach === null}
                  data={teach}
                ></Card>
              </div>
              <div
                className="pd-center-content-center"
                style={{ ...getPX([816]), margin: `0 ${getPX([18]).width}px` }}
              >
                <div
                  className="pd-center-content-center-top"
                  style={{
                    ...getPX(["", 94]),
                  }}
                >
                  {teachermsg ? (
                    <>
                      <p
                        className="pd-teacher-name"
                        title={teachermsg.UserName}
                      >
                        {teachermsg.UserName ? teachermsg.UserName : "--"}
                      </p>
                      {teachermsg.Sign ? (
                        <p className="pd-teacher-sign" title={teachermsg.Sign}>
                          {teachermsg.Sign ? teachermsg.Sign : "--"}
                        </p>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className="pd-drag-container"
                  style={{
                    ...getPX(["", 483]),
                    // margin: `0 ${getPX([18]).width}px`,
                    backgroundSize: `${getPX([558]).width}px ${
                      getPX(["", 468]).height
                    }px`,
                  }}
                  // onMouseDown={(e) => {
                  //   captureMouse((mouse) => {
                  //     console.log(e, mouse);
                  //   });
                  // }}
                  // onMouseUp={(e) => {
                  //   console.log(e);
                  // }}
                >
                  <div
                    className={`drag-control  `}
                    style={{
                      transform: `rotateX(${-10}deg) rotateY(${100}deg) `,
                      WebkitTransform: `rotateX(${-10}deg) rotateY(${100}deg) `,
                      MozTransform: `rotateX(${-10}deg) rotateY(${100}deg) `,
                      OTransform: `rotateX(${-10}deg) rotateY(${100}deg) `,
                      MsTransform: `rotateX(${-10}deg) rotateY(${100}deg) `,
                    }}
                  >
                    <div
                      className={`card-container 
                    `}
                    >
                      {cardList.map((child, index) => {
                        let len = cardList.length;
                        let width = 550;
                        let reg = 360 / len;
                        let rotateY = reg * index;
                        let translateZ =
                          (Math.cos(reg / 2) * width) / (1 + Math.cos(reg / 2));
                        if (animationType && index === len - 1) {
                          setTimeout(() => {
                            setAnimationType(false);
                          }, 100);
                        }
                        // if (animationType) {
                        //   setTimeout(() => {
                        //     isChange = true;
                        //   },0);
                        // }
                        let transform = !animationType
                          ? `rotateY(${rotateY}deg) translateZ(${translateZ}px)`
                          : `rotateY(${0}deg) translateZ(${0}px)`;
                        return (
                          <i
                            key={index}
                            style={{
                              // background: `url(./images/image-${child}.png) no-repeat center center / 100% 100%`,
                              transform: transform,
                              // transition: 'transform 1s ease 0s',
                              WebkitTransform: transform,
                              MozTransform: transform,
                              OTransform: transform,
                              MsTransform: transform,
                            }}
                            className={"img-" + child}
                            onClick={onCardClick.bind(this, child)}
                            onMouseEnter={(e) => {
                              setSelectCard(child);
                            }}
                            onMouseLeave={(e) => {
                              setSelectCard(false);
                            }}
                          ></i>
                        );
                      })}
                    </div>
                  </div>
                  <div className="drag-bg"></div>
                </div>
                <div
                  className="pd-center-content-center-bottom"
                  style={{
                    ...getPX([816, 346]),
                    margin: `${getPX(["", 10]).height}px 0 0`,
                  }}
                >
                  <Card
                    select={SelectCard}
                    cardid={"history"}
                    height={315}
                    component={HistoryDom}
                    loading={History === null}
                    data={
                      History instanceof Array && History.length > 0 && History
                    }
                  ></Card>
                </div>
              </div>
              <div
                className="pd-center-content-right"
                style={{ ...getPX([480]), margin: `0 ${getPX([18]).width}px` }}
              >
                <Card
                  select={SelectCard}
                  cardid={"information"}
                  height={340}
                  component={Information}
                  loading={information === null}
                  data={information}
                ></Card>
                <Card
                  select={SelectCard}
                  cardid={"work"}
                  height={217}
                  component={Work}
                  loading={WorkTerm === null || work === null}
                  data={WorkTerm && work}
                  componentProps={{
                    onTermSelect: (e) => {
                      setWorkTerm(e);
                    },
                    termSelect: WorkTerm,
                    termList: WorkTermList,
                  }}
                ></Card>
                <Card
                  select={SelectCard}
                  cardid={"data"}
                  height={275}
                  component={Data}
                  componentProps={{
                    onWeekSelect: (e) => {
                      setWeekData(e);
                    },
                    weekSelect: WeekData,
                    weekList: WeekList,
                    SubjectList: SubjectList,
                    Percentage: Percentage,
                    TeachPlan: TeachPlan,
                    ResView: ResView,
                  }}
                  loading={
                    !SysUrl ||
                    WeekData === null ||
                    (((SysUrl["D21"] && SysUrl["D21"].WsSvrAddr) ||
                      (SysUrl["310"] && SysUrl["310"].WebSvrAddr) ||
                      (SysUrl["C10"] && SysUrl["C10"].WebSvrAddr)) &&
                      ResView === null &&
                      TeachPlan === null &&
                      Percentage === null)
                  }
                  // lock={
                  //   !(SubjectList instanceof Array && SubjectList.length > 0)
                  // }
                  data={
                    SysUrl &&
                    WeekData &&
                    SubjectList instanceof Array &&
                    SubjectList.length > 0 &&
                    ((SysUrl["D21"] && SysUrl["D21"].WsSvrAddr && Percentage) ||
                      (SysUrl["310"] &&
                        SysUrl["310"].WebSvrAddr &&
                        TeachPlan) ||
                      (SysUrl["C10"] && SysUrl["C10"].WebSvrAddr && ResView))
                  }
                ></Card>
              </div>
            </div>
            <div
              className="pd-provesion"
              style={{ ...getPX([1920, 58]) }}
            ></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  let { commonData } = state;
  return { ...commonData };
};
export default connect(mapStateToProps)(
  withRouter(memo(forwardRef(PersonalDetail)))
);
