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
 * @Description: 师生比
 * @FilePath: \teacher-development\src\pages\teachersStatisticAnalysis\teachingAbility\teacherRatio.js.js
 */

import {
  connect,
  // useSelector,
  useDispatch,
} from "react-redux";
import React, {
  useCallback,
  memo,
  useMemo,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
  useLayoutEffect,
  forwardRef,
} from "react";
import { Tooltip } from "antd";
import * as echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import {
  resizeForEcharts,
  deepCopy,
  transTime,
  correctNumber,
} from "../../../util/public";
function TeacherRatio(props, ref) {
  let {
    className,
    levelHash,
    productMsg,
    data: {
      DayAvgTimeSpan,
      MinRatio,
      MaxRatio,
      TotalTeacher,
      StudentCount,
      TeacherCount,
      Ratio,
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
    if (TeacherCount === undefined || StudentCount === undefined) {
      return;
    }
    let myEchart_ta = taEchart;
    let myEchart_sub = subEchart;
    let color = [
      "#ffb782",
      "#6cb2e5",
      // "#2edba3",
      "#fbb458",
      "#fd8273",
      "#3fb43f",
      "#e84855",
      "#e58d4c",
      "#2d3047",
      "#71add8",
    ];

    let dataset_ta = [
      ["nodeName", "Count"],
      ["区域教师总人数", TeacherCount],
      ["区域学生总人数", StudentCount],
    ];
    let labelColor = {};
    let labelSize = {};
    color.forEach((child, index) => {
      labelColor[`${index}`] = { color: child, fontSize: 12 };
      labelSize[`${index}16`] = { color: child, fontSize: 16 };
    });
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

          return `区域整体师生比 ${Ratio}`;
        },
        textStyle: {
          color: "#fffd64",
        },
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
          name: "师生人数占比图",
          type: "pie",
          radius: ["35%", "80%"],
          top: "10",
          minAngle: 4,

          // center: ["50% ", "50%"],
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

    let taOption = deepCopy(pieOption);

    taOption.dataset.source = dataset_ta;
    // taOption.title.text = "教师教龄段人数分布";

    // 设置option
    // myEchart_avg.setOption(avgOption);
    myEchart_ta.setOption(taOption);

    return () => {
      // 卸载echarts实例的事件
      // myEchart_avg.off();
      myEchart_ta.off();
    };
    // 依赖数据的变化重绘界面
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SubSet, productMsg]);
  const TransTime = useCallback((time) => {
    let tTime = transTime(time, "m");
    if (tTime.time < 1) {
      return "小于1分钟";
    }

    return tTime.Time_zh;
  }, []);

  const Colors = useMemo(() => {
    return ["#ffb487", "#879bff", "#67d4d8", "#ff8787", "#51c2fd", "#88d35a"];
  }, []);
  // SubSet = SubSet.concat(SubSet).slice(0,4)
  return (
    <div className={`teacher-bar TeacherRatio ${className ? className : ""} `}>
      <p className="tb-tip">
        {productMsg && productMsg.title ? productMsg.title : ""}
        整体师生比
        <span className="tb-tip-2">{Ratio}</span>
        ，其中
        <span className="tb-tip-2">{MinRatio}学段 </span>
        师生比最小，其中
        <span className="tb-tip-2">{MaxRatio}学段 </span>师生比最大
      </p>
      <div className="ter-left">
        <div ref={taRef} className="ter-echarts"></div>
        {/* <p className="ter-all">
          教师总人数
          <br />
          <span>{TotalTeacher}</span>人
        </p> */}
        <p className="ter-title">
          师生人数占比图
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

      <div ref={subRef} className="tb-right ter-right">
        {SubSet instanceof Array &&
          SubSet.map((child, index) => {
            let {
              NodeName,
              Ratio,
              TeacherCount,
              Total,
              NodeID,
              StudentCount,
            } = child;
            let width = 0;
            Total = Total||(StudentCount+TeacherCount)
            width = Total?(TeacherCount / Total)*100+'%':0
            
            return (
              <div key={NodeID} className='bar-content' style={{ lineHeight:210/(SubSet.length)+'px'   }}>
                <span className='bar-name' title={NodeName}>{NodeName}</span>
                <Tooltip
                  title={
                    <p>
                      <span style={{color: "#fffd64"}}>{NodeName}</span>< br />
                      师生总人数：{Total}人< br />教师人数：{TeacherCount}
                      人< br />学生人数：{StudentCount}人
                    </p>
                  }
                  color={"rgba(0,0,0,0.7)"}
                  overlayClassName="show-bar"
                  getPopupContainer={(e) => e.parentNode}
                  trigger={["hover"]}
                >
                  <p
                    className="bar-box"
                    style={{ backgroundColor: Colors[index] }}
                  >
                    <span
                      className="bar-tea"
                      style={{
                        backgroundColor: Colors[index],
                        width: width,
                      }}
                    ></span>
                  </p>
                </Tooltip>
                <span
                  style={{ color: Colors[index] }}
                  className="bar-ratio"
                  title={Ratio}
                >
                  {Ratio}
                </span>
              </div>
            );
          })}
        <p className="ter-title">
          各学段师生比统计
          {/* <Tooltip
            title="疑问"
            color={"#0249a5"}
            overlayClassName="show-detail"
            getPopupContainer={(e) => e.parentNode}
            trigger={["hover"]}
          >
            <i className="tb-show-detail" onClick={() => {}}></i>
          </Tooltip> */}
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  let {
    commonData: { levelHash },
  } = state;
  return { levelHash };
};
export default connect(mapStateToProps)(memo(forwardRef(TeacherRatio)));
