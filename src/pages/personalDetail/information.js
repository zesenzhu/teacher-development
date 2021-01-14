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
  // useMemo,
  // useReducer,
  // createContext,
  // useContext,
  useRef,
  forwardRef,
  useLayoutEffect,
} from "react";
import "./index.scss";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/radar";
import "echarts/lib/chart/pie";
// import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import { resizeForEcharts } from "@/util/public";

/**
 * @description: 暂无数据表明是没有这个系统id或返回错误，加锁是没有权限看,前者权重大于后者
 * @param {*} props
 * @param {*} ref
 * @return {*}
 */
function Information(props, ref) {
  let {
    className,

    data,
  } = props;
  const [TimeEchart, setTimeEchart] = useState(null);
  const [OnlineEchart, setOnlineEchart] = useState(null);

  const TimeRef = useRef(null);
  const OnlineRef = useRef(null);
  let {
    TimeSpan, //累计上机时长
    DayAvgTimeSpan, //累计上机时长
    LoginCount, //上机总次数
    AvgLoginTimeSpan, //平均每次上机时长
    DayTimeList,
    DayOnlineList,
  } = data;

  useLayoutEffect(() => {
    let myEchart = TimeEchart;

    if (!myEchart) {
      // 数据更新后，防止二次初始化echarts，第一次进来初始化echarts
      myEchart = echarts.init(TimeRef.current);
      // 保存echart实例
      setTimeEchart(myEchart);
      // 对界面resize进行监听重绘echart
      resizeForEcharts(myEchart);
    }
    let count = [];
    let time = [];
    DayTimeList.forEach((child) => {
      count.push([child.Count]);
      time.push({ name: child.Time, max: 100 });
    });
    let timeOption = {
      dataset: {},
      tooltip: {
        show: false,
        appendToBody: true,
      },
      title: {
        show: true,
        text: "平均每日上机时间段分布",
        bottom: 15,
        left: "center",
        textStyle: {
          fontSize: 14,

          color: "#ababab",
        },
      },
      legend: {
        show: false,
      },
      grid: {
        left: 10,
        top: 20,
        height: 170,
        right: 10,
        // bottom: 10,
        containLabel: true,
      },
      radar: {
        // shape: 'circle',
        center: ["50%", "40%"],
        axisName: {
          // textStyle: {
          color: "rgba(153,153,153,0.64)",
          fontSize: "10px",
          // backgroundColor: "#999",
          // borderRadius: 3,
          // padding: [3, 5],
          // },
        },
        axisNameGap: 5,
        // center: ['25%', '50%'],
        radius: 54,
        splitNumber: 5,
        shape: "circle",
        splitArea: {
          areaStyle: {
            color: [
              "rgba(26,120,225, 0.60)",
              "rgba(26,120,225, 0.48)",
              "rgba(26,120,225, 0.36)",
              "rgba(26,120,225, 0.24)",
              "rgba(26,120,225, 0.12)",
            ],
            // shadowColor: 'rgba(0, 0, 0, 0.3)',
            // shadowBlur: 10
          },
        },
        axisLine: {
          lineStyle: {
            color: "rgba(245,245,245, 0.12)",
          },
        },
        splitLine: {
          lineStyle: {
            color: "transparent",
          },
        },
        indicator: time,
      },
      series: [
        {
          name: "平均每日上机时间段分布",
          type: "radar",
          // areaStyle: {normal: {}},
          data: [
            {
              value: count,
              name: "次数",
            },
          ],
          symbol: "circle",
          symbolSize: 6,
          lineStyle: {
            color: "rgba(139,184,234,0.64)",
          },
          itemStyle: {
            color: "#5291d8",
          },
          silent: true,
        },
      ],
    };
    // let source = [["nodeName", "次数"]];

    // timeOption.dataset.source = source
    myEchart.setOption(timeOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DayTimeList]);

  useLayoutEffect(() => {
    let myEchart = OnlineEchart;

    if (!myEchart) {
      // 数据更新后，防止二次初始化echarts，第一次进来初始化echarts
      myEchart = echarts.init(OnlineRef.current);
      // 保存echart实例
      setOnlineEchart(myEchart);
      // 对界面resize进行监听重绘echart
      resizeForEcharts(myEchart);
    }
    let count = [];
    let time = [];
    DayTimeList.forEach((child) => {
      count.push([child.Count]);
      time.push({ name: child.Time, max: 100 });
    });
    let timeOption = {
      dataset: {},
      tooltip: {
        show: false,
        appendToBody: true,
      },
      title: {
        show: true,
        text: "平均每日在线办公/\n教学时长占比",
        bottom: 0,
        left: "15%",
        textStyle: {
          fontSize: 14,

          color: "#ababab",
        },
      },
      legend: {
        show: true,
        orient:'vertical',
        bottom:50,right:10,itemHeight:11,itemWidth:11,textStyle:{
          fontSize:12,color:'rgba(153,153,153,0.49)'
        }
      },
      grid: {
        left: 10,
        top: 20,
        height: 170,
        right: 10,
        // bottom: 10,
        containLabel: true,
      },
      color: ["#0a407d", "#2edba3"],
      series: [
        {
          name: "平均每日在线办公/\n教学时长占比",
          type: "pie",
          center:['40%','45%'],
          radius: ["35%", "55%"],
          // areaStyle: {normal: {}},
          // data: [
          //   {
          //     value: count,
          //     name: "次数",
          //   },
          // ],
          label:{show:false},
      
          // lineStyle: {
          //   color: "rgba(139,184,234,0.64)",
          // },
          itemStyle: {
            borderColor: "rgba(255,255,255,0)",
            borderWidth: 1,
            // color: "#5291d8",
          },
          silent: true,
        },
        {
          name: "平均每日在线办公/\n教学时长占比",
          type: "pie",
          center:['40%','45%'],
          radius: ["55%", "60%"],
          // areaStyle: {normal: {}},
          // data: [
          //   {
          //     value: count,
          //     name: "次数",
          //   },
          // ],
          label:{show:false},
 
          // lineStyle: {
          //   color: "rgba(139,184,234,0.64)",
          // },
          itemStyle: {
            color: "rgba(0,0,0,0.04)",
          },
          silent: true,
        },
        {
          name: "平均每日在线办公/\n教学时长占比",
          type: "pie",
          center:['40%','45%'],
          radius: ["35%", "40%"],
          // areaStyle: {normal: {}},
          // data: [
          //   {
          //     value: count,
          //     name: "次数",
          //   },
          // ],
          label:{show:false},
 
          // lineStyle: {
          //   color: "rgba(139,184,234,0.64)",
          // },
          itemStyle: {
            color: "rgba(255,255,255,0.1)",
          },
          silent: true,
        },
      ],
    };
    let source = [["nodeName", "Count"]];
    DayOnlineList.forEach((child)=>{
      source.push([child.NodeName,child.Time])
    })
    timeOption.dataset.source = source
    myEchart.setOption(timeOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DayOnlineList]);
  return (
    <div
      className={`card-content card-information ${className ? className : ""}`}
    >
      <div className="cc-div-box-1">
        <div className="ci-top-info">
          <p className="ci-top-info-count" title={TimeSpan}>
            {TimeSpan ? TimeSpan : "--"}
          </p>
          <p className="ci-top-info-title">累计上机时长</p>
        </div>
        <div className="ci-top-info">
          <p className="ci-top-info-count" title={DayAvgTimeSpan}>
            {DayAvgTimeSpan ? DayAvgTimeSpan : "--"}
          </p>
          <p className="ci-top-info-title">平均每日上机时长</p>
        </div>
        <div className="ci-top-info">
          <p className="ci-top-info-count" title={LoginCount}>
            {LoginCount ? LoginCount : "--"}
          </p>
          <p className="ci-top-info-title">上机总次数</p>
        </div>
        <div className="ci-top-info">
          <p className="ci-top-info-count" title={AvgLoginTimeSpan}>
            {AvgLoginTimeSpan ? AvgLoginTimeSpan : "--"}
          </p>
          <p className="ci-top-info-title">平均每次上机时长</p>
        </div>
      </div>
      <div className="ci-echarts-box">
        <div className="ci-echarts-content" ref={TimeRef}></div>
        <div className="ci-echarts-content" ref={OnlineRef}></div>
      </div>
    </div>
  );
}

export default memo(forwardRef(Information));
