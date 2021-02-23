/*
 *                        ::
 *                       :;J7, :,                        ::;7:
 *                       ,ivYi, ,                       ;LLLFS:
 *                       :iv7Yi                       :7ri;j5PL
 *                      ,:ivYLvr                    ,ivrrirrY2X,
 *                      :;r@Wwz.7r:                :ivu@kexianli.
 *                     :iL7::,:::iiirii:ii;::::,,irvF7rvvLujL7ur
 *                    ri::,:,::i:iiiiiii:i:irrv177JX7rYXqZEkvv17
 *                 ;i:, , ::::iirrririi:i:::iiir2XXvii;L8OGJr71i
 *               :,, ,,:   ,::ir@mingyi.irii:i:::j1jri7ZBOS7ivv,
 *                  ,::,    ::rv77iiiriii:iii:i::,rvLq@huhao.Li
 *              ,,      ,, ,:ir7ir::,:::i;ir:::i:i::rSGGYri712:
 *            :::  ,v7r:: ::rrv77:, ,, ,:i7rrii:::::, ir7ri7Lri
 *           ,     2OBBOi,iiir;r::        ,irriiii::,, ,iv7Luur:
 *         ,,     i78MBBi,:,:::,:,  :7FSL: ,iriii:::i::,,:rLqXv::
 *         :      iuMMP: :,:::,:ii;2GY7OBB0viiii:i:iii:i:::iJqL;::
 *        ,     ::::i   ,,,,, ::LuBBu BBBBBErii:i:i:i:i:i:i:r77ii
 *       ,       :       , ,,:::rruBZ1MBBqi, :,,,:::,::::::iiriri:
 *      ,               ,,,,::::i:  @arqiao.       ,:,, ,:::ii;i7:
 *     :,       rjujLYLi   ,,:::::,:::::::::,,   ,:i,:,,,,,::i:iii
 *     ::      BBBBBBBBB0,    ,,::: , ,:::::: ,      ,,,, ,,:::::::
 *     i,  ,  ,8BMMBBBBBBi     ,,:,,     ,,, , ,   , , , :,::ii::i::
 *     :      iZMOMOMBBM2::::::::::,,,,     ,,,,,,:,,,::::i:irr:i:::,
 *     i   ,,:;u0MBMOG1L:::i::::::  ,,,::,   ,,, ::::::i:i:iirii:i:i:
 *     :    ,iuUuuXUkFu7i:iii:i:::, :,:,: ::::::::i:i:::::iirr7iiri::
 *     :     :rk@Yizero.i:::::, ,:ii:::::::i:::::i::,::::iirrriiiri::,
 *      :      5BMBBBBBBSr:,::rv2kuii:::iii::,:i:,, , ,,:,:i@petermu.,
 *           , :r50EZ8MBBBBGOBBBZP7::::i::,:::::,: :,:,::i;rrririiii::
 *               :jujYY7LS0ujJL7r::,::i::,::::::::::::::iirirrrrrrr:ii:
 *            ,:  :@kevensun.:,:,,,::::i:i:::::,,::::::iir;ii;7v77;ii;i,
 *            ,,,     ,,:,::::::i:iiiii:i::::,, ::::iiiir@xingjief.r;7:i,
 *         , , ,,,:,,::::::::iiiiiiiiii:,:,:::::::::iiir;ri7vL77rrirri::
 *          :,, , ::::::::i:::i:::i:i::,,,,,:,::i:i:::iir;@Secbone.ii:::
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-11-27 09:20:46
 * @LastEditTime: 2020-12-21 17:06:25
 * @Description:
 * @FilePath: \teacher-development\src\pages\teachersStatisticAnalysis\baseMsg\teacherAge.js
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
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import { resizeForEcharts, deepCopy } from "../../../util/public";
function TeacherAge(props, ref) {
  let {
    className,
    levelHash,
    productMsg,
    data: { AgeAvg, TeachAgeAvg, AgeList, SubSetList, TeachAgeList },
  } = props;
  productMsg = productMsg ? productMsg : {};
  // echart实例
  // 柱状
  const [subEchart, setSubEchart] = useState(null);
  // 年龄
  const [avgEchart, setAvgEchart] = useState(null);
  // 教龄
  const [taEchart, setTaEchart] = useState(null);
  // dom ref
  const taRef = useRef(null);
  const avgRef = useRef(null);
  const subRef = useRef(null);
  useLayoutEffect(() => {
    let myEchart_avg = avgEchart;

    let myEchart_ta = taEchart;
    let myEchart_sub = subEchart;
    let color = [
      "#0a407d",
      "#75b6fa",
      "#2edba3",
      "#fbb458",
      "#fd8273",
      "#3fb43f",
      "#e84855",
      "#e58d4c",
      "#2d3047",
      "#71add8",
    ];
    let dataset_avg = [
      ["nodeName", "Count"],
      // ["20~30岁", 20],
      // ["30~40岁", 40],
      // ["40~50岁", 23],
      // ["50~60岁", 10],
      // ["60岁以上", 20],
    ];
    let dataset_ta = [
      ["nodeName", "Count"],
      // ["1~5年", 20],
      // ["5~10年", 40],
      // ["10~20年", 35],
      // ["20~30年", 50],
      // ["30年以上", 20],
    ];
    let labelColor = {};
    color.forEach((child, index) => {
      labelColor[`${index}`] = { color: child };
    });
    let dataset_sub = [["nodeName", "平均年龄", "平均教龄"]];
    let pieOption = {
      dataset: { source: [] },
      title: {
        text: "教师年龄段人数分布",
        bottom: "7%",
        left: "center",
        // top: 180,
        textStyle: {
          color: "#333333",
          fontSize: 14,
          fontWeight:100
        },
      },
      tooltip: {
        // appendToBody: true,
        trigger: "item",
        backgroundColor: "rgba(0,0,0,0.7)",
        formatter: (params) => {
          let { percent, value } = params;

          return `${value[0]}<br/>${value[1]}人，占 ${percent}%`;
        },
        textStyle: {
          color: "#fff",
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
          name: "教师年龄段人数分布",
          type: "pie",
          radius: ["35%", "70%"],
          top: "-30",
          minAngle:4,
          // center: [70, "50%"],
          height: "100%",
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
              // console.log(params,colorIndex,labelColor);
              let colorIndex = 0;
              color.forEach((child, index) => {
                if (child === params.color) {
                  colorIndex = index;
                }
              });

              return `{${colorIndex}|${params.name}}`;
            },
            rich: {
              ...labelColor,
            },
          },
        },
      ],
    };
    SubSetList instanceof Array &&
    SubSetList.forEach((child, index) => {
      let { NodeName, Total, AgeAvg, TeachAgeAvg } = child;
      dataset_sub.push([NodeName, AgeAvg, TeachAgeAvg, Total]);
    });
    // console.log(dataset_sub)
    let subOption = {
      dataZoom: {
        type: "slider",
        show: dataset_sub.length>11,
        // xAxisIndex: [0],
        // start: 0,
        // end: 10/(dataset.length-1)*100,
        minSpan: (10 / (dataset_sub.length-1  )) * 100,
        maxSpan: (10 / (dataset_sub.length-1  )) * 100,
        zoomLock: true,
        showDetail: false,
        showDataShadow: false,
        height: 8,
        bottom: 0,
      },
      title: {
        text: "各年龄教师年龄/教龄分布情况",
        // bottom: "4%",
        left: "center",
        top: 20,
        textStyle: {
          color: "#333333",
          fontSize: 14,
          fontWeight:100
        },
      },
      backgroundColor: "#f5f5f5",
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
          let { name } = row;
          // let [data_1] = value;
          let dom = "";
          params.forEach((child, index) => {
            let { seriesName, data } = child;
            dom += `<p class='msg msg-2'>${seriesName}:<span>${
              data[index + 1]
            }${index===0?'岁':'年'}</span></p>`;
          });
          return `<div  class="t-tooltip">
              <p class="nodename">${name}</p>${dom}</div>
          `;
        },
        // textStyle: {
        //   color: "#fff",
        // },
      },
      legend: {
        // data: ["男性教师", "女性教师"],
        right: 50,
        top: 40,
        itemWidth: 11,
        itemHeight: 11,
        itemGap: 30,
        // formatter: (id) => {
        //   return `{name|${sexData[id].title}:}{count|${sexData[id].value}}{name|人}`;
        // },
        textStyle: {
          rich: {
            name: {
              fontSize: 12,
              color: "#999999",
            },
            count: {
              fontSize: 14,
              fontWeight: "bold",
              color: "#333",
            },
          },
        },
      },
      grid: {
        left: 70,
        height: 220,
        right: 100,
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
          name: "年龄/教龄",

          axisLabel: {
            color: "#7c7c7c",
            fontSize: 12,
            margin: 20,
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
          // name: "男性教师",
          type: "bar",
          // barWidth: 5,
          barMaxWidth: 20,
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
                  color: "#ffb782", // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: "#fba768", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#f7964e", // 100% 处的颜色
                },
              ],
            },
            borderRadius: [3, 3, 0, 0],
          },
          // data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          // name: "女性教师",
          type: "bar",
          barGap: "4%",
          // barWidth: 5,
          barMaxWidth: 20,
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
                  color: "#a0dea0", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#51ca51", // 100% 处的颜色
                },
              ],
            },
            borderRadius: [3, 3, 0, 0],
          },
          // data: [120, 132, 101, 134, 90, 230, 210],
        },
      ],
    };
    let AgeError = true
    let TeachAgeError = true
    AgeList instanceof Array &&
      AgeList.forEach((child, index) => {
        let { NodeName, Total } = child;
        // if(index>5){
        //   return
        // }
        if(Total){
          AgeError =false
        }
        dataset_avg.push([NodeName, Total]);
      });
    TeachAgeList instanceof Array &&
      TeachAgeList.forEach((child, index) => {
        let { NodeName, Total } = child;
        if(Total){
          TeachAgeError =false
        }
        dataset_ta.push([NodeName, Total]);
      });
 
    if (!myEchart_avg) {
      // 数据更新后，防止二次初始化echarts，第一次进来初始化echarts
      myEchart_avg = echarts.init(avgRef.current);
      // 保存echart实例
      setAvgEchart(myEchart_avg);
      // 对界面resize进行监听重绘echart
      resizeForEcharts(myEchart_avg);
    }
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
    let avgOption = deepCopy(pieOption);
    let taOption = deepCopy(pieOption);
    // 属性配置
    avgOption.dataset.source = dataset_avg;
    avgOption.title.text = "教师年龄段人数分布";

    taOption.dataset.source = dataset_ta;
    taOption.title.text = "教师教龄段人数分布";

    subOption.dataset.source = dataset_sub;
    // 设置option
    // !AgeError&& 
    myEchart_avg.setOption(avgOption);
    // !TeachAgeError&&  
    myEchart_ta.setOption(taOption);
    myEchart_sub.setOption(subOption);
    return () => {
      // 卸载echarts实例的事件
      myEchart_avg.off();
      myEchart_ta.off();
      myEchart_sub.off();
    };
    // 依赖数据的变化重绘界面
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AgeList, productMsg]);
// 柱状图
// useLayoutEffect(() => {
   
// }, [])
  return (
    <div className={`TeacherAge ${className ? className : ""} `}>
      <div className="tt-top">
        <p className="tt-tip">
          {productMsg && productMsg.title ? productMsg.title : ""}
          教师平均年龄<span className="tt-tip-1">{AgeAvg}</span>岁，平均教龄
          <span className="tt-tip-2">{TeachAgeAvg}</span>年
        </p>

        <div ref={avgRef} className="tt-echarts"></div>
        <div ref={taRef} className="tt-echarts"></div>
      </div>
      <div ref={subRef} className="tt-bottom"></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  let {
    commonData: { levelHash },
  } = state;
  return { levelHash };
};
export default connect(mapStateToProps)(memo(forwardRef(TeacherAge)));
