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
} from "@/api/personal";
import Card from "./card";
import Archives from "./archives";
import Accout from "./accout";
import Teach from "./teach";
import Work from "./work";
import HistoryDom from "./history";
function PersonalDetail(props, ref) {
  let {
    className,
    history,
    location,
    basePlatFormMsg,
    teachermsg,
    teacherid,
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
  // 档案
  const [accout, setAccout] = useState(null);
  // 档案
  const [information, setInformation] = useState(null);
  // 档案
  const [teach, setTeach] = useState(null);
  // 档案
  const [data, setData] = useState(null);
  // 档案
  const [work, setWork] = useState(null);
  // 档案
  const [History, setHistory] = useState(null);

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
        getTeacherDetailIntroduction({
          userID,
          baseIP: SysUrl["E34"].WebSvrAddr,
        }).then((res) => {
          if (res.StatusCode === 200) {
            setArchives({ ...archives, ...res.Data });
          }
        });
      }
      // 教研
      if (true) {
        setTeach([96, 18, 13]);
        setWork([96, 2, 18, 13]);
        setHistory([
          { time: "2020-1", title: "荣获“三育人”先进个人称号" },
          { time: "2020-1", title: "荣获“三育人”先进个人称号" },
          { time: "2020-1", title: "荣获“三育人”先进个人称号" },
          { time: "2020-1", title: "荣获“三育人”先进个人称号" },
          { time: "2020-1", title: "荣获“三育人”先进个人称号" },
          { time: "2020-1", title: "荣获“三育人”先进个人称号" },
          { time: "2020-1", title: "荣获“三育人”先进个人称号" },
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SysUrl]);
  // 不需要系统url的接口
  useEffect(() => {
    if (basePlatFormMsg) {
      if (teachermsg) {
        setArchives(teachermsg);
        setAccout(teachermsg);
      }

      // GetUserDetailForHX({userID:}).then((res) => {
      //   if (res.StatusCode === 200) {
      //     setSysUrl(res.data);
      //   }
      // });
    }
  }, [teacherid]);
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
                ></div>
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
                  loading={information === null}
                  data={information}
                ></Card>
                <Card
                  select={SelectCard}
                  cardid={"work"}
                  height={217}
                  component={Work}
                  loading={work === null}
                  data={work}
                ></Card>
                <Card
                  select={SelectCard}
                  cardid={"data"}
                  height={275}
                  loading={
                    !SysUrl ||
                    (((SysUrl["D21"] && SysUrl["D21"].WebSvrAddr) ||
                      (SysUrl["E34"] && SysUrl["E34"].WebSvrAddr) ||
                      (SysUrl["C10"] && SysUrl["C10"].WebSvrAddr)) &&
                      data === null)
                  }
                  data={
                    SysUrl &&
                    ((SysUrl["D21"] && SysUrl["D21"].WebSvrAddr && data) ||
                      (SysUrl["E34"] && SysUrl["E34"].WebSvrAddr && data) ||
                      (SysUrl["C10"] && SysUrl["C10"].WebSvrAddr && data))
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
