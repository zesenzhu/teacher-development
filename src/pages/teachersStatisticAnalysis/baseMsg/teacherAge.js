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
import * as echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import { resizeForEcharts, deepCopy } from "../../../util/public";
// const echarts = require('echarts')
function TeacherAge(props, ref) {
  let {
    className,
    levelHash,
    productMsg,
    data: { AgeAvg, TeachAgeAvg, AgeList, SubSetList, TeachAgeList },
  } = props;
  productMsg = productMsg ? productMsg : {};
  // echart??????
  // ??????
  const [subEchart, setSubEchart] = useState(null);
  // ??????
  const [avgEchart, setAvgEchart] = useState(null);
  // ??????
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
      // ["20~30???", 20],
      // ["30~40???", 40],
      // ["40~50???", 23],
      // ["50~60???", 10],
      // ["60?????????", 20],
    ];
    let dataset_ta = [
      ["nodeName", "Count"],
      // ["1~5???", 20],
      // ["5~10???", 40],
      // ["10~20???", 35],
      // ["20~30???", 50],
      // ["30?????????", 20],
    ];
    let labelColor = {};
    color.forEach((child, index) => {
      labelColor[`${index}`] = { color: child };
    });
    let dataset_sub = [["nodeName", "????????????", "????????????"]];
    let pieOption = {
      dataset: { source: [] },
      title: {
        text: "???????????????????????????",
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

          return `${value[0]}<br/>${value[1]}????????? ${percent}%`;
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
          name: "???????????????????????????",
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
        text: "???" + productMsg.sub +"????????????/??????????????????",
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
          // ??????????????????????????????????????????
          type: "shadow", // ??????????????????????????????'line' | 'shadow'
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
            }${index===0?'???':'???'}</span></p>`;
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
        // data: ["????????????", "????????????"],
        right: 50,
        top: 40,
        itemWidth: 11,
        itemHeight: 11,
        itemGap: 30,
        // formatter: (id) => {
        //   return `{name|${sexData[id].title}:}{count|${sexData[id].value}}{name|???}`;
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
          //   "???????????????",
          //   "????????????",
          //   "????????????",
          //   "????????????",
          //   "???????????? ",
          //   "????????????",
          // ],

          nameTextStyle: {
            color: "#7c7c7c",
            fontSize: 12,
          },
          axisTick: {
            //?????????
            show: false,
          },
          axisLine: {
            //x???
            show: false,
            lineStyle: {
              // color:'#e6e6e6',
              // opacity:0.5
            },
          },
          axisLabel: {
            color: "#7c7c7c",
            fontSize: 12,margin:12,
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
          name: "????????????/????????????",

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
          // name: "????????????",
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
                  color: "#ffb782", // 0% ????????????
                },
                {
                  offset: 0.5,
                  color: "#fba768", // 0% ????????????
                },
                {
                  offset: 1,
                  color: "#f7964e", // 100% ????????????
                },
              ],
            },
            borderRadius: [3, 3, 0, 0],
          },
          // data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          // name: "????????????",
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
                  color: "#a0dea0", // 0% ????????????
                },
                {
                  offset: 1,
                  color: "#51ca51", // 100% ????????????
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
      // ???????????????????????????????????????echarts???????????????????????????echarts
      myEchart_avg = echarts.init(avgRef.current);
      // ??????echart??????
      setAvgEchart(myEchart_avg);
      // ?????????resize??????????????????echart
      resizeForEcharts(myEchart_avg);
    }
    if (!myEchart_ta) {
      // ???????????????????????????????????????echarts???????????????????????????echarts
      myEchart_ta = echarts.init(taRef.current);
      // ??????echart??????
      setTaEchart(myEchart_ta);
      // ?????????resize??????????????????echart
      resizeForEcharts(myEchart_ta);
    }
    if (!myEchart_sub) {
      // ???????????????????????????????????????echarts???????????????????????????echarts
      myEchart_sub = echarts.init(subRef.current);
      // ??????echart??????
      setSubEchart(myEchart_sub);
      // ?????????resize??????????????????echart
      resizeForEcharts(myEchart_sub);
    }
    let avgOption = deepCopy(pieOption);
    let taOption = deepCopy(pieOption);
    // ????????????
    avgOption.dataset.source = dataset_avg;
    avgOption.title.text = "???????????????????????????";

    taOption.dataset.source = dataset_ta;
    taOption.title.text = "???????????????????????????";

    subOption.dataset.source = dataset_sub;
    // ??????option
    // !AgeError&& 
    myEchart_avg.setOption(avgOption);
    // !TeachAgeError&&  
    myEchart_ta.setOption(taOption);
    myEchart_sub.setOption(subOption);
    return () => {
      // ??????echarts???????????????
      myEchart_avg.off();
      myEchart_ta.off();
      myEchart_sub.off();
    };
    // ?????????????????????????????????
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AgeList, productMsg]);
// ?????????
// useLayoutEffect(() => {
   
// }, [])
  return (
    <div className={`TeacherAge ${className ? className : ""} `}>
      <div className="tt-top">
        <p className="tt-tip">
          {productMsg && productMsg.title ? productMsg.title : ""}
          ??????????????????<span className="tt-tip-1">{AgeAvg}</span>??????????????????
          <span className="tt-tip-2">{TeachAgeAvg}</span>???
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
