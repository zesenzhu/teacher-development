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
    productMsg,StandardRadio,
    isEdu, //不是教育局用学校的结构
    data: {
      DayAvgTimeSpan,
      MinRatio,
      MaxRatio,
      TotalTeacher,
      StudentCount,
      TeacherCount,
      Ratio,
      SubSet,

      // 学校端才有
      SchoolType, //中小学：
      //1表示只有小学；
      //2表示只有初中；
      //4表示只有高中；
      //如：3=1+2表示小学和初中；
      //7=1+2+4表示小学初中高中
      //5=2+3表示初中和高中
      //大学：年制
      SchoolLevel,
      //学校阶段等级，1表示高教（大学），2表示普教（中小学）
      TeaSthRatio,
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
    if (!isEdu || TeacherCount === undefined || StudentCount === undefined) {
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
  }, [SubSet, productMsg, isEdu]);
  const TransTime = useCallback((time) => {
    let tTime = transTime(time, "m");
    if (tTime.time < 1) {
      return "小于1分钟";
    }

    return tTime.Time_zh;
  }, []);

  const Colors = useMemo(() => {
    return [
      "#51c2fd",
      "#ff6d6d",
      // , "#67d4d8", "#ff8787", "#51c2fd", "#88d35a"
    ];
  }, []);
  // SubSet = SubSet.concat(SubSet).slice(0,4)
 
  // 处理达标情况
  const getStandardMsg = useCallback(
    (ratio, standardRatio, teacher = 0, school = false) => {
      // 提示语模板：
      // 1）未达标(师生比小于国家标准，即分母较大)：未符合1:xx的标准，建议补编n人；
      // 2）刚好达标(与标准相等)：符合1:xx的标准；
      // 3）超标：优于1:xx的标准。

      // 注1）学校为多学段时，即最高标准值；
      // 注2）补编人数算法为：n=m*(yy-xx)/xx的值向上取整，
      // 其中，m为教师现有人数，yy为现有师生比的学生比值（即1：14中的14），
      // xx为标准师生比中的学生比值(即1：12中的12)。
      let standardBol = false;
      let color = Colors[1];
      let standard = 0;
      let title = "";
      if (!(!ratio || isNaN(ratio))) {
        standardBol = ratio <= standardRatio;
        standard = standardRatio - ratio;
        color = standardBol ? Colors[0] : Colors[1];
        if (standard < 0) {
          title = (
            <>
              {"师生比未符合1:" + standardRatio + "的标准"}
              {school ? "，" : <br />}
              {"建议补编" +
                Math.ceil((teacher * (ratio - standardRatio)) / standardRatio) +
                "人"}
            </>
          );
        } else if (standard > 0) {
          title = "师生比优于1:" + standardRatio + "的标准";
        } else {
          title = "师生比符合1:" + standardRatio + "的标准";
        }
      }
      return { color, standardBol, title };
    },
    [Colors]
  );
  const { StandardTitle, Dom, SchoolStandard } = useMemo(() => {
    let StandardTitle = "";
    let Dom = "";
    let SchoolStandard = { standardRatio: 1, name: "" };
    if (isEdu && SubSet instanceof Array) {
      Dom = SubSet.map((child, index) => {
        let {
          NodeName,
          Ratio,
          TeacherCount,
          Total,
          NodeID,
          StudentCount,
        } = child;
        let width = 0;
        // 提示语模板：
        // 1）未达标(师生比小于国家标准，即分母较大)：未符合1:xx的标准，建议补编n人；
        // 2）刚好达标(与标准相等)：符合1:xx的标准；
        // 3）超标：优于1:xx的标准。

        // 注1）学校为多学段时，即最高标准值；
        // 注2）补编人数算法为：n=m*(yy-xx)/xx的值向上取整，
        // 其中，m为教师现有人数，yy为现有师生比的学生比值（即1：14中的14），
        // xx为标准师生比中的学生比值(即1：12中的12)。

        // 标准
        // 高中教职工与学生比为1：12.5、初中为1：13.5、小学为1：19。
        // 中职为1：20（尽量达到1:16）、高职为1:18、高校为：1:18。
        // 幼儿园1:7（1:5~1:10）。
        // 以NodeID判断是什么学段
        // 0：幼儿园，1：小学，2：初中，3：高中，4：中职，5：高职，
        Total = Total || StudentCount + TeacherCount;
        width = Total ? (TeacherCount / Total) * 100 + "%" : 0;
        // 比例,比后面的就好了
        // Ratio = "1:13.5";
        let ratio = parseFloat(Ratio.split(":")[1]);
        let standard = StandardRadio[NodeID];

        const { standardBol, color, title } = getStandardMsg(
          ratio,
          standard,
          TeacherCount
        );
        if (!standardBol) {
          StandardTitle += StandardTitle ? "、" + NodeName : NodeName;
        }

        return (
          <div
            key={NodeID}
            className="bar-content"
            style={{ lineHeight: 210 / SubSet.length + "px" }}
          >
            <span className="bar-name" title={NodeName}>
              {NodeName}
            </span>
            <Tooltip
              title={
                <p>
                  <span style={{ color: "#fffd64" }}>{title}</span>
                  <br />
                  {/* 师生总人数：{Total}人<br /> */}
                  教师人数：{TeacherCount}
                  人<br />
                  学生人数：{StudentCount}人
                </p>
              }
              color={"rgba(0,0,0,0.7)"}
              overlayClassName="show-bar"
              getPopupContainer={(e) => e.parentNode}
              trigger={["hover"]}
            >
              <p className="bar-box" style={{ backgroundColor: color }}>
                <span
                  className="bar-tea"
                  style={{
                    backgroundColor: color,
                    width: width,
                  }}
                ></span>
              </p>
            </Tooltip>
            <span style={{ color: color }} className="bar-ratio" title={Ratio}>
              {Ratio}
            </span>
            {!standardBol && <i className="standard-warn"></i>}
          </div>
        );
      });
    } else {
      // 大学，学院用一个标准18，中小学要看Subset
      if (productMsg.productLevel === 3) {
        //中小学：
        //1表示只有小学；
        //2表示只有初中；
        //4表示只有高中；
        //如：3=1+2表示小学和初中；
        //7=1+2+4表示小学初中高中
        //5=2+3表示初中和高中
        //大学：年制
        let nodeID = [];
        switch (SchoolType) {
          case 1:
            nodeID.push(1);
            break;
          case 2:
            nodeID.push(2);

            break;
          case 4:
            nodeID.push(3);

            break;
          case 3:
            nodeID.push(1, 2);

            break;
          case 5:
            nodeID.push(2, 3);

            break;
          case 7:
            nodeID.push(1, 2, 3);

            break;
          default:
        }
        nodeID.forEach((c) => {
          SchoolStandard =
            SchoolStandard.standardRatio < StandardRadio[c]
              ? {
                  standardRatio: StandardRadio[c],
                  name: c.NodeName,
                }
              : SchoolStandard;
        });
      } else {
        SchoolStandard = {
          standardRatio: StandardRadio[6],
          name: productMsg.title,
        };
      }
    }
    return {
      StandardTitle,
      Dom,
      SchoolStandard,
    };
  }, [isEdu, SubSet, StandardRadio, getStandardMsg,  SchoolType]);
  return (
    <div className={`teacher-bar TeacherRatio ${className ? className : ""} `}>
      {isEdu ? (
        <>
          <p className="tb-tip">
            {productMsg && productMsg.title ? productMsg.title : ""}
            整体师生比
            <span className="tb-tip-2">{Ratio}</span>
            ，其中
            {StandardTitle ? (
              <>
                <span className="tb-tip-2" style={{ color: Colors[1] }}>
                  {StandardTitle}学段未达标
                </span>
              </>
            ) : (
              <>
                <span className="tb-tip-2">{MinRatio}学段 </span>
                师生比最小，其中
                <span className="tb-tip-2">{MaxRatio}学段 </span>师生比最大
              </>
            )}
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
            {Dom}
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
        </>
      ) : (
        <div className="school-ratio-box">
          {(() => {
            let Total = TeacherCount + StudentCount;
            let teacherWidth = 0.5;
            let studentWidth = 0.5;
            if (Total > 0) {
              let t = TeacherCount / Total;
              let s = StudentCount / Total;
              teacherWidth = t > 0.1 ? t : 0.1;
              studentWidth = s > 0.1 ? s : 0.1;
            }
            // Ratio = "1:100";
            let ratio =
              typeof TeaSthRatio === "string" ? TeaSthRatio.split(":")[1] : 0;
            let { standardBol, color, title } = getStandardMsg(
              ratio,
              SchoolStandard.standardRatio,
              TeacherCount,
              true
            );
            return (
              <>
                {" "}
                <span
                  className="bar teacher-ratio-bar"
                  style={{
                    width: 600 * teacherWidth,
                  }}
                >
                  <span>{TeacherCount}人</span>
                </span>
                <span
                  className="bar student-ratio-bar"
                  style={{
                    width: 600 * studentWidth,
                  }}
                >
                  <span>{StudentCount}人</span>
                </span>
                <span
                  className="ratio-msg"
                  style={{ color: !standardBol ? "#ff0000" : "#009900" }}
                >
                  {TeaSthRatio}
                </span>
                {!standardBol && <i className="icon-error"></i>}
                <span
                  className="ratio-title"
                  style={{ color: !standardBol ? "#ff0000" : "#009900" }}
                >
                  ({title})
                </span>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  let {
    commonData: { levelHash,StandardRadio },
  } = state;
  // console.log(111)
  return { levelHash,StandardRadio };
};
export default connect(mapStateToProps)(memo(forwardRef(TeacherRatio)));
