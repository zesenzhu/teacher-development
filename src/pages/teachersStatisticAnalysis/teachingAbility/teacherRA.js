/*
 *                        .::::.
 *                      .::::::::.
 *                     :::::::::::
 *                  ..:::::::::::'
 *               '::::::::::::'
 *                 .::::::::::
 *            '::::::::::::::..
 *                 ..::::::::::::.
 *               ``::::::::::::::::
 *                ::::``:::::::::'        .:::.
 *               ::::'   ':::::'       .::::::::.
 *             .::::'      ::::     .:::::::'::::.
 *            .:::'       :::::  .:::::::::' ':::::.
 *           .::'        :::::.:::::::::'      ':::::.
 *          .::'         ::::::::::::::'         ``::::.
 *      ...:::           ::::::::::::'              ``::.
 *     ````':.          ':::::::::'                  ::::..
 *                        '.:::::'                    ':'````..
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-12-25 10:29:46
 * @LastEditTime: 2020-12-25 10:29:46
 * @Description: 教研活动
 * @FilePath: \teacher-development\src\pages\teachersStatisticAnalysis\teachingAbility\teacherRA.js
 */

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
  useImperativeHandle,
  useRef,
  useLayoutEffect,
  forwardRef,
} from "react";
import { Tooltip } from "antd";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import {
  resizeForEcharts,
  deepCopy,
  correctNumber,
} from "../../../util/public";
function TeacherRA(props, ref) {
  let {
    className,
    levelHash,
    productMsg,
    data: {
      ActivityCount,
      AvgJoinCount,
      // AvgUploadUserCount,
      TotalTeacher,
      HasJoinTeaCount,
      NoJoinTeaCount,
      HasJoinPercent,
      SubSet,
    },
  } = props;
  productMsg = productMsg ? productMsg : {};
  // echart实例
  // 柱状
  const [subEchart, setSubEchart] = useState(null);

  //
  const [taEchart, setTaEchart] = useState(null);
  // dom ref
  const taRef = useRef(null);
  const subRef = useRef(null);
  useLayoutEffect(() => {
    if (NoJoinTeaCount === undefined || HasJoinTeaCount === undefined) {
      return;
    }
    let myEchart_ta = taEchart;
    let myEchart_sub = subEchart;
    let color = [
      "#0a407d",
      "#fd8273",
      // "#2edba3",
      // "#fbb458",
      "#fd8273",
      "#3fb43f",
      "#e84855",
      "#e58d4c",
      "#2d3047",
      "#71add8",
    ];

    let dataset_ta = [
      ["nodeName", "Count"],
      ["未参加人数", NoJoinTeaCount],
      ["已参加人数", HasJoinTeaCount],
    ];
    let labelColor = {};
    let labelSize = {};
    color.forEach((child, index) => {
      labelColor[`${index}`] = { color: child, fontSize: 12 };
      labelSize[`${index}16`] = { color: child, fontSize: 16 };
    });
    let dataset_sub = [["nodeName", "平均年龄", "平均教龄"]];
    let pieOption = {
      dataset: { source: [] },
      // title: {
      //   text: "教师年龄段人数分布",
      //   bottom: "7%",
      //   left: "center",
      //   // top: 180,
      //   textStyle: {
      //     color: "#333333",
      //     fontSize: 14,
      //   },
      // },
      tooltip: {
        // appendToBody: true,
        trigger: "item",
        backgroundColor: "rgba(0,0,0,0.7)",
        formatter: (params) => {
          // let { percent, value, dataIndex } = params;

          return `教研活动参与率${
            !isNaN(HasJoinPercent) ? correctNumber(HasJoinPercent * 100) : 0
          }%`;
        },
        textStyle: {
          color: "#fffd64",
        },
      },
      grid: {
        height: 220,

        containLabel: true,
      },
      legend: {
        show: false,
        // orient: "vertical",
        // left: 155,
        // top: 40,
        // itemWidth: 11,
        // itemHeight: 11,
        // textStyle: {
        //   color: "#999",
        // },
      },
      color: color,
      series: [
        {
          name: "电子教案制作参与率",
          type: "pie",
          radius: ["50%", "80%"],
          top: "10",
          minAngle:4,

          height: "90%",
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 1,
            // shadowColor: "rgba(0, 0, 0, 0.15)",
            // shadowBlur: 7,
          },

          label: {
            show: true,
            color: null,
            formatter: (params) => {
              let colorIndex = 0;
              let sizeIndex = 0;
              color.forEach((child, index) => {
                if (child === params.color) {
                  colorIndex = index;
                  sizeIndex = index + "16";
                }
              });

              return `{${colorIndex}|${params.name}}\n{${sizeIndex}|${params.value[1]}}{${colorIndex}|人}`;
            },
            rich: {
              ...labelColor,
              ...labelSize,
            },
          },
        },
      ],
    };
    SubSet instanceof Array &&
      SubSet.forEach((child, index) => {
        let {
          NodeName,
          TotalTeacher,
          HasJoinTeaCount,
          HasJoinPercent,
          NoJoinTeaCount,
        } = child;
        dataset_sub.push([
          NodeName,
          HasJoinPercent,
          TotalTeacher,
          HasJoinTeaCount,
          NoJoinTeaCount,
        ]);
      });
    let subOption = {
      dataZoom: {
        type: "slider",
        show: dataset_sub.length > 6,
        // xAxisIndex: [0],
        // start: 0,
        // end: 10/(dataset.length-1)*100,
        minSpan: (4 / (dataset_sub.length - 1)) * 100,
        maxSpan: (4 / (dataset_sub.length - 1)) * 100,
        zoomLock: true,
        showDetail: false,
        showDataShadow: false,
        height: 8,
        bottom: 0,
      },
      title: {
        text: "各" + productMsg.sub + "统计信息",
        // bottom: "4%",
        left: "center",
        top: 20,
        textStyle: {
          color: "#333333",
          fontSize: 14,
          fontWeight:100
        },
      },
      // backgroundColor: "#f5f5f5",
      tooltip: {
        trigger: "axis",
        // appendToBody:true,

        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
        backgroundColor: "rgba(0,0,0,0.7)",
        borderColor: "transparent",
        borderWidth: 0,
        formatter: (params) => {
          let row = params[0];
          let { data } = row;

          return `<div  class="t-tooltip">
                <p class="nodename">教研活动参与率${parseInt(
                  correctNumber(data[1] * 100)
                )}%</p><p class='msg msg-2'>教师总人数<span>${
            data[2]
          }人</span></p><p class='msg msg-2'>已参加人数<span>${
            data[3]
          }人</span></p><p class='msg msg-2'>未参加人数<span>${
            data[4]
          }人</span></p></div>
            `;
        },
        // textStyle: {
        //   color: "#fff",
        // },
      },
      legend: {
        // data: ["男性教师", "女性教师"],
        show: false,
        // right: 50,
        // top: 40,
        // itemWidth: 11,
        // itemHeight: 11,
        // itemGap: 30,
        // // formatter: (id) => {
        // //   return `{name|${sexData[id].title}:}{count|${sexData[id].value}}{name|人}`;
        // // },
        // textStyle: {
        //   rich: {
        //     name: {
        //       fontSize: 12,
        //       color: "#999999",
        //     },
        //     count: {
        //       fontSize: 14,
        //       fontWeight: "bold",
        //       color: "#333",
        //     },
        //   },
        // },
      },
      grid: {
        left: 28,
        height: 180,
        right: 58,
        bottom: 20,
        containLabel: true,
      },
      dataset: {
        source: [],
      },
      xAxis: [
        {
          type: "category",
          name: productMsg.sub,
          nameGap: 12,
          // data: [
          //   "幼儿园教师",
          //   "小学教师",
          //   "初中教师",
          //   "高中教师",
          //   "中专教师 ",
          //   "中职教师",
          // ],

          nameTextStyle: {
            color: "#7c7c7c",
            fontSize: 12,
          },
          axisTick: {
            //刻度线
            show: false,
          },
          axisLine: {
            //x轴
            show: false,
            lineStyle: {
              // color:'#e6e6e6',
              // opacity:0.5
            },
          },
          axisLabel: {
            color: "#7c7c7c",
            fontSize: 12,
            formatter: (value) => {
              let data = value;
              if (typeof value === "string" && value.length > 6) {
                data = value.slice(0, 4) + "...";
              }
              return data;
            },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "参与率",
          max: 1,
          axisLabel: {
            color: "#7c7c7c",
            fontSize: 12,
            margin: 20,
            formatter: (value) => {
              return `${value * 100}%`;
            },
          },

          nameTextStyle: {
            color: "#7c7c7c",
            fontSize: 12,

            padding: [0, 0, 0, 20],
          },
          nameGap: 20,
        },
      ],
      series: [
        {
          // name: "女性教师",
          type: "bar",
          barGap: "4%",
          // barWidth: 5,
          barMaxWidth: 24,
          itemStyle: {
            color: {
              type: "linear",
              x: 1,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#fd8273", // 0% 处的颜色
                },

                {
                  offset: 1,
                  color: "#ffa196", // 100% 处的颜色
                },
              ],
            },
            borderRadius: [3, 3, 0, 0],
          },
          // data: [120, 132, 101, 134, 90, 230, 210],
        },
      ],
    };

    // TeachAgeList instanceof Array &&
    //   TeachAgeList.forEach((child, index) => {
    //     let { NodeName, Total } = child;
    //     dataset_ta.push([NodeName, Total]);
    //   });

    // if (!myEchart_avg) {
    //   // 数据更新后，防止二次初始化echarts，第一次进来初始化echarts
    //   myEchart_avg = echarts.init(avgRef.current);
    //   // 保存echart实例
    //   setAvgEchart(myEchart_avg);
    //   // 对界面resize进行监听重绘echart
    //   resizeForEcharts(myEchart_avg);
    // }
    if (!myEchart_ta) {
      // 数据更新后，防止二次初始化echarts，第一次进来初始化echarts
      myEchart_ta = echarts.init(taRef.current);
      // 保存echart实例
      setTaEchart(myEchart_ta);
      // 对界面resize进行监听重绘echart
      resizeForEcharts(myEchart_ta);
    }
    if (!myEchart_sub) {
      // 数据更新后，防止二次初始化echarts，第一次进来初始化echarts
      myEchart_sub = echarts.init(subRef.current);
      // 保存echart实例
      setSubEchart(myEchart_sub);
      // 对界面resize进行监听重绘echart
      resizeForEcharts(myEchart_sub);
    }
    let taOption = deepCopy(pieOption);

    taOption.dataset.source = dataset_ta;
    // taOption.title.text = "教师教龄段人数分布";

    subOption.dataset.source = dataset_sub;

    // 设置option
    // myEchart_avg.setOption(avgOption);
    myEchart_ta.setOption(taOption);
    myEchart_sub.setOption(subOption);
    return () => {
      // 卸载echarts实例的事件
      // myEchart_avg.off();
      myEchart_ta.off();
      myEchart_sub.off();
    };
    // 依赖数据的变化重绘界面
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SubSet, productMsg]);

  return (
    <div className={`teacher-bar TeacherRA ${className ? className : ""} `}>
      <div className="ter-left">
        <p className="tb-tip">
          {productMsg && productMsg.title ? productMsg.title : ""}
          总体教研活动<span className="tb-tip-2">{ActivityCount}</span>
          次，教师人均参与
          <span className="tb-tip-2">{AvgJoinCount}</span>次
        </p>
        <div ref={taRef} className="ter-echarts"></div>
        <p className="ter-all">
          教师总人数
          <br />
          <span>{TotalTeacher}</span>人
        </p>
        <p className="ter-title">
          教研活动参与率
          <Tooltip
            title="疑问"
            color={"#0249a5"}
            overlayClassName="show-detail"
            getPopupContainer={(e) => e.parentNode}
            trigger={["hover"]}
          >
            <i className="tb-show-detail" onClick={() => {}}></i>
          </Tooltip>
        </p>
      </div>

      <div ref={subRef} className="tb-right ter-right"></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  let {
    commonData: { levelHash },
  } = state;
  return { levelHash };
};
export default connect(mapStateToProps)(memo(forwardRef(TeacherRA)));
