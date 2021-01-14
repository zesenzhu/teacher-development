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
 * @FilePath: \worker-development\src\pages\personalDetail\card.js
 */
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
import echarts from "echarts/lib/echarts";
// import "echarts/lib/chart/radar";
import "echarts/lib/chart/bar";
import "echarts/lib/component/polar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import { resizeForEcharts } from "@/util/public";
import { Dropdown } from "@/component/common";

/**
 * @description: 暂无数据表明是没有这个系统id或返回错误，加锁是没有权限看,前者权重大于后者
 * @param {*} props
 * @param {*} ref
 * @return {*}
 */
function Data(props, ref) {
  let {
    className,
    onWeekSelect,
    weekSelect,
    weekList,
    ResView, //电子资源
    Percentage, //精品课程
    TeachPlan, //教学方案
    SubjectList,
  } = props;
  const [FirstEchart, setFirstEchart] = useState(null);
  const [SecondEchart, setSecondEchart] = useState(null);
  const [ThirdEchart, setThirdEchart] = useState(null);
  // 当前显示的学科，默认同学科
  const [SubjectName, setSubjectName] = useState(null);
  // 存setTimeIn
  const [MyInterval, setMyInterval] = useState(null);
  // 存模块数据
  const [ResViewData, setResViewData] = useState(null);
  const [PercentageData, setPercentageData] = useState(null);
  const [TeachPlanData, setTeachPlanData] = useState(null);

  const FirstRef = useRef(null);
  const SecondRef = useRef(null);
  const ThirdRef = useRef(null);
  // let {
  //   ResView, //电子资源
  //   Percentage, //精品课程
  //   TeachPlan, //教学方案
  //   SubjectList,
  // } = data;

  // 先处理三个数据
  // 电子资源
  useLayoutEffect(() => {
    if (!ResView) {
      return;
    }
    let { AllCount, UseCount, AllScale, AllSubject } = ResView;
    AllScale = typeof AllScale !== "number" || AllScale > 0.3 ? AllScale : 0.3;
    let source = ["nodeName", "同学科", "全校教师", "上传电子资源", "浏览"];
    let subjectList = {}; //学科索引
    let firstSub = "";
    // 初始先把同学科的预设
    if (AllSubject instanceof Array && AllSubject.length > 0) {
      //
      AllSubject.forEach((child, index) => {
        subjectList[child.SubjectName] = [
          child.SubjectName,
          typeof child.Scale !== "number" || child.Scale > 0.3
            ? child.Scale
            : 0.3,
          AllScale,
          AllCount,
          UseCount,
        ];
        if (index === 0) firstSub = child.SubjectName;
      });
      // 对学科列表进行遍历，补上没有的
      SubjectList.forEach((child, index) => {
        if (!subjectList[child.value]) {
          subjectList[child.value] = [
            child.value,
            null,
            AllScale,
            AllCount,
            UseCount,
          ];
        }
      });
    } else {
      //不要学科
      subjectList["同学科"] = ["同学科", null, AllScale, AllCount, UseCount];
      firstSub = "同学科";
    }
    setResViewData({
      source,
      subjectList,
    });
    // 如果没有挂载，就挂载
    if (!FirstEchart && firstSub === "同学科") {
      SetEchart(FirstEchart, FirstRef, setFirstEchart, [
        source,
        subjectList[firstSub],
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ResView, SubjectList]);
  // 教学方案
  useLayoutEffect(() => {
    if (!TeachPlan) {
      return;
    }
    let { AllCount, UseCount, AllScale, AllSubject } =  TeachPlan;
    AllScale = typeof AllScale !== "number" || AllScale > 0.3 ? AllScale : 0.3;
    let source = ["nodeName", "同学科", "全校教师", "制作教学方案", "应用数"];
    let subjectList = {}; //学科索引
    let firstSub = "";
    // 初始先把同学科的预设
    if (AllSubject instanceof Array && AllSubject.length > 0) {
      //
      AllSubject.forEach((child, index) => {
        subjectList[child.SubjectName] = [
          child.SubjectName,
          typeof child.Scale !== "number" || child.Scale > 0.3
            ? child.Scale
            : 0.3,
          AllScale,
          AllCount,
          UseCount,
        ];
        if (index === 0) firstSub = child.SubjectName;
      });
      // 对学科列表进行遍历，补上没有的
      SubjectList.forEach((child, index) => {
        if (!subjectList[child.value]) {
          subjectList[child.value] = [
            child.value,
            null,
            AllScale,
            AllCount,
            UseCount,
          ];
        }
      });
    } else {
      //不要学科
      subjectList["同学科"] = ["同学科", null, AllScale, AllCount, UseCount];
      firstSub = "同学科";
    }
    setTeachPlanData({
      source,
      subjectList,
    });
    // 如果没有挂载，就挂载
    if (!SecondEchart && firstSub === "同学科") {
      SetEchart(SecondEchart, SecondRef, setSecondEchart, [
        source,
        subjectList[firstSub],
      ]);
    }
    //  // 如果没有挂载，就挂载
    //  if (!ThirdEchart && firstSub === "同学科") {
    //   SetEchart(ThirdEchart, ThirdRef, setThirdEchart, [
    //     source,
    //     subjectList[firstSub],
    //   ]);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TeachPlan, SubjectList]);
  // 精品课程
  useLayoutEffect(() => {
    console.log(Percentage)
    if (!Percentage) {
      return;
    }
    let { AllCount, UseCount, AllScale, AllSubject } = Percentage;
    AllScale = typeof AllScale !== "number" || AllScale > 0.3 ? AllScale : 0.3;
    let source = ["nodeName", "同学科", "全校教师", "录制精品课程", "浏览"];
    let subjectList = {}; //学科索引
    let firstSub = "";
    // 初始先把同学科的预设
    if (AllSubject instanceof Array && AllSubject.length > 0) {
      //
      AllSubject.forEach((child, index) => {
        subjectList[child.SubjectName] = [
          child.SubjectName,
          typeof child.Scale !== "number" || child.Scale > 0.3
            ? child.Scale
            : 0.3,
          AllScale,
          AllCount,
          UseCount,
        ];
        if (index === 0) firstSub = child.SubjectName;
      });
      // 对学科列表进行遍历，补上没有的
      SubjectList.forEach((child, index) => {
        if (!subjectList[child.value]) {
          subjectList[child.value] = [
            child.value,
            null,
            AllScale,
            AllCount,
            UseCount,
          ];
        }
      });
    } else {
      //不要学科
      subjectList["同学科"] = ["同学科", null, AllScale, AllCount, UseCount];
      firstSub = "同学科";
    }
     setPercentageData({
      source,
      subjectList,
    });
    // 如果没有挂载，就挂载
    if (!ThirdEchart && firstSub === "同学科") {
      SetEchart(ThirdEchart, ThirdRef, setThirdEchart, [
        source,
        subjectList[firstSub],
      ]);
    }
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Percentage, SubjectList]);
  // 轮播循环
  useLayoutEffect(() => {
    if (!(SubjectList instanceof Array && SubjectList.length > 1)) {
      return;
    }
    let index = 0;
    MyInterval && clearInterval(MyInterval);
    setSubjectName(SubjectList[index].value);
    let Interval = setInterval(() => {
      index = index < SubjectList.length - 1 ? ++index : 0;
      setSubjectName(SubjectList[index].value);
    }, 4000);
    setMyInterval(Interval);
    return () => {
      MyInterval && clearInterval(MyInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SubjectList]);
  // 依赖学科名的改变进行echart更新
  useLayoutEffect(() => {
    if (
      ResViewData &&
      ResViewData.subjectList &&
      ResViewData.subjectList[SubjectName]
    ) {
      //数据上有学科才更新
      let data = [ResViewData.source, ResViewData.subjectList[SubjectName]];
      SetEchart(FirstEchart, FirstRef, setFirstEchart, data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SubjectName, ResViewData]);
  useLayoutEffect(() => {
    if (
      PercentageData &&
      PercentageData.subjectList &&
      PercentageData.subjectList[SubjectName]
    ) {
      //数据上有学科才更新
      let data = [
        PercentageData.source,
        PercentageData.subjectList[SubjectName],
      ];
      SetEchart(ThirdEchart, ThirdRef, setThirdEchart, data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SubjectName, PercentageData]);
  useLayoutEffect(() => {
    if (
      TeachPlanData &&
      TeachPlanData.subjectList &&
      TeachPlanData.subjectList[SubjectName]
    ) {
      //数据上有学科才更新
      let data = [TeachPlanData.source, TeachPlanData.subjectList[SubjectName]];
      SetEchart(SecondEchart, SecondRef, setSecondEchart, data);
      
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SubjectName, TeachPlanData]);

  // 公共渲染echart
  const SetEchart = (myEchart, myRef, setEchart, data) => {
    // console.log(data);
    // let myEchart = FirstEchart;
    // return;
    if (!myRef.current || !(data instanceof Array)) {
      return;
    }
    if (!myEchart) {
      // 数据更新后，防止二次初始化echarts，第一次进来初始化echarts
      myEchart = echarts.init(myRef.current);
      // 保存echart实例
      setEchart(myEchart);
      // 对界面resize进行监听重绘echart
      resizeForEcharts(myEchart);
    }

    let myOption = {
      color: ["#00b7e5", "#fe525a"],
      legend: {
        show: false,
      },
      tooltip: {
        show: false,
        // appendToBody: true,backgroundColor: "rgba(0,0,0,0.7)",
        // borderColor: "transparent",
        // borderWidth: 0,
        // formatter: (param) => {
        //   let { dimensionNames, data } = param;
        //   console.log(param);
        //   return `<div  class="cd-tooltip" style='color:#fffd64'>
        //   <p class="nodename">拥有${dimensionNames[3]}:${data[3]}</p>
        //   <p class='msg  '>领先${dimensionNames[2]}:<span>${
        //     data[2]
        //   }%</span></p>
        //   ${
        //     typeof data[1] === "number"
        //       ? `<p class='msg  '>领先${dimensionNames[1]}:<span>${data[1]}%</span></p>`
        //       : ""
        //   }
        //   </div>`;
        // },
      },
      dataset: {
        source: data,
      },
      radiusAxis: {
        type: "category",
        // 隐藏刻度线
        axisLine: {
          show: false,
        },
        z: 10,
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          interval: 0,
        },
        splitLine: {
          show: false,
        },
      },
      angleAxis: {
        max: 100, // 满分
        clockwise: false, // 逆时针
        // 隐藏刻度线
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      // xAxis: [
      //   { type: "category", gridIndex: 0 },
      //   { type: "category", gridIndex: 1 },
      // ],
      // yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
      // grid: [ left: "0",top:'center' }],
      polar: {
        center: ["50%", "50%"],
        radius: ["50%", "80%"], //图形大小
      },
      series: [
        // These series are in the first grid.
        {
          type: "bar",
          coordinateSystem: "polar",
          roundCap: true,
          barWidth: 8,
          barGap: "50%",

          itemStyle: {
            color: {
              type: "linear",
              x: 1,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                // {
                //   offset: 0,
                //   color: "#073547", // 0% 处的颜色
                // },

                {
                  offset: 0,
                  color: "rgba(255,82,90, 0.1)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#ff525a", // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          type: "bar",
          coordinateSystem: "polar",
          roundCap: true,
          barWidth: 8,
          barGap: "50%",
          itemStyle: {
            color: {
              type: "linear",
              x: 1,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                // {
                //   offset: 0,
                //   color: "#073547", // 0% 处的颜色
                // },
                {
                  offset: 0,
                  color: "rgba(3, 134, 169, 0 ) ", // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: "rgba(3, 134, 169, 0.5) ", // 0% 处的颜色
                },
                // {
                //   offset: 0,
                //   color: "#073547", // 0% 处的颜色
                // },

                // {
                //   offset: 0.01,
                //   color: "rgba(7, 53, 71, 0)", // 0% 处的颜色
                // },
                {
                  offset: 1,
                  color: "#00b7e5", // 100% 处的颜色
                },
              ],
            },
          },
        },
      ],
    };
    // let source = [["nodeName", "Count"]];
    // DayOnlineList.forEach((child)=>{
    //   source.push([child.NodeName,child.Time])
    // })
    // myOption.dataset.source = source
    myEchart.clear(); //清空数据缓存
    myEchart.setOption(myOption);
  };
  return (
    <div className={`card-content card-data ${className ? className : ""}`}>
      {/* <div className="ci-echarts-box"> */}
      <div className="cd-legend">
        <span className="cd-legend-tea">全校教师</span>
        <span className="cd-legend-sub">{SubjectName}</span>
      </div>
      <div className="cd-week-box">
        {weekList instanceof Array && weekList.length > 0 ? (
          <Dropdown
            width={120}
            height={120}
            dropList={weekList}
            // title={""}
            value={weekSelect.value}
            className="week-dropdown"
            onChange={(e) => {}}
            onSelect={(e, option) => {
              onWeekSelect(option);
            }}

            // width={120}
            // height={120}
            // style={{ zIndex: 10 }}
            // onChange={(e) => {
            //   onWeekSelect(e.value);
            // }}
            // dropList={weekList}
            // dropSelectd={weekSelect}
          ></Dropdown>
        ) : (
          ""
        )}
      </div>
      {ResView ? (
        <div className="cd-echarts-content">
          <div className="cd-echarts" ref={FirstRef}></div>
          <p className="all-count" title={ResView.AllCount}>
            {ResView.AllCount ? ResView.AllCount : 0}
          </p>
          <p className="data-title">
            上传电子资源
            <br />
            浏览:
            <span className="count" title={ResView.UseCount}>
              {ResView.UseCount ? ResView.UseCount : 0}
            </span>
          </p>
        </div>
      ) : (
        ""
      )}

      {TeachPlan ? (
        <div className="cd-echarts-content">
          <div className="cd-echarts" ref={SecondRef}></div>
          <p className="all-count" title={TeachPlan.AllCount}>
            {TeachPlan.AllCount ? TeachPlan.AllCount : 0}
          </p>
          <p className="data-title">
            制作教学方案
            <br />
            应用数:
            <span className="count" title={TeachPlan.UseCount}>
              {TeachPlan.UseCount ? TeachPlan.UseCount : 0}
            </span>
          </p>
        </div>
      ) : (
        ""
      )}
      {Percentage ? (
        <div className="cd-echarts-content">
          <div className="cd-echarts" ref={ThirdRef}></div>
          <p className="all-count" title={Percentage.AllCount}>
            {Percentage.AllCount ? Percentage.AllCount : 0}
          </p>
          <p className="data-title">
            录制精品课程
            <br />
            浏览:
            <span className="count" title={Percentage.UseCount}>
              {Percentage.UseCount ? Percentage.UseCount : 0}
            </span>
          </p>
        </div>
      ) : (
        ""
      )}
      {/* </div> */}
    </div>
  );
}

export default memo(forwardRef(Data));
