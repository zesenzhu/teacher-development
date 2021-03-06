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
// import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import { Scrollbars } from "react-custom-scrollbars";
import { resizeForEcharts, deepCopy, deepMap } from "../../../util/public";
function TeacherPeriod(props, ref) {
  let {
    className,
    levelHash,
    productMsg,
    data: { TermAvgCH, WeekAvgCH, AvgTeachClass, AvgTeachStu, SubSet },
  } = props;
  productMsg = productMsg ? productMsg : {};
  // echart??????
  // ??????
  const [subEchart, setSubEchart] = useState(null);
  // ????????????
  const [typeList, setTypeList] = useState([]);
  // ????????????
  const [typeSelect, setTypeSelect] = useState("");
  // ?????????????????????
  const [dataInType, setDataInType] = useState({});
  // dom ref
  const subRef = useRef(null);
  // ????????????
  useEffect(() => {
    let typeList = [];
    let dataList = [["nodeName", "count"]];
    let dataInType = {};
    deepMap(
      SubSet,
      ({ child, level, parent }) => {
        let {
          NodeName,
          Total,
          NodeID,
          TermAvgCH,
          WeekAvgCH,
          AvgTeachClass,
          AvgTeachStu,
        } = child;
        if (level === 1) {
          typeList.push(child);
        }
        if (level === 2) {
          // NodeID???????????????level2???parent
          let parentID = parent[0].NodeID;
          dataList.push([NodeName, Total, NodeID]);
          if (!dataInType[parentID]) {
            dataInType[parentID] = [];
          }
          dataInType[parentID].push([
            NodeName,
            Total,
            parentID,
            TermAvgCH,
            WeekAvgCH,
            AvgTeachClass,
            AvgTeachStu,
          ]);
        }
      },
      "SubSet"
    );
    if (typeList.length === 0) {
      return;
    }
    setTypeList(typeList);
    setDataInType(dataInType);
    setTypeSelect(typeList[0].NodeID);
  }, [SubSet]);
  useLayoutEffect(() => {
    if (Object.keys(dataInType).length < 1) {
      return;
    }
    let myEchart_sub = subEchart;

    let dataset_sub = [["nodeName", "count"]];
    dataInType[typeSelect] instanceof Array &&
      dataInType[typeSelect].forEach((child, index) => {
        dataset_sub.push(child);
      });
    let subOption = {
      // title: {
      //   text: "?????????????????????/??????????????????",
      //   // bottom: "4%",
      //   left: "center",
      //   top: 20,
      //   textStyle: {
      //     color: "#333333",
      //     fontSize: 14,
      //   },
      // },
      // backgroundColor: "#f5f5f5",
      dataZoom: {
        type: "slider",
        show: dataset_sub.length > 11,
        // xAxisIndex: [0],
        // start: 0,
        // end: 10/(dataset.length-1)*100,
        minSpan: (10 / (dataset_sub.length - 1)) * 100,
        maxSpan: (10 / (dataset_sub.length - 1)) * 100,
        zoomLock: true,
        showDetail: false,
        showDataShadow: false,
        height: 8,
        bottom: 0,
      },
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
            dom += `<p class='msg '>???????????????:<span>${data[3]}???</span></p><p class='msg '>???????????????:<span>${data[1]}???</span></p><p class='msg '>?????????????????????:<span>${data[5]}???</span></p></p><p class='msg '>??????????????????:<span>${data[6]}???</span></p>`;
          });
          return `<div  class="t-tooltip">
              <p class="nodename">${name}</p>${dom}</div>
          `;
        },
        // textStyle: {
        //   color: "#fff",
        // },
      },
      // legend: {
      //   // data: ["????????????", "????????????"],
      //   right: 50,
      //   top: 40,
      //   itemWidth: 11,
      //   itemHeight: 11,
      //   itemGap: 30,
      //   // formatter: (id) => {
      //   //   return `{name|${sexData[id].title}:}{count|${sexData[id].value}}{name|???}`;
      //   // },
      //   textStyle: {
      //     rich: {
      //       name: {
      //         fontSize: 12,
      //         color: "#999999",
      //       },
      //       count: {
      //         fontSize: 14,
      //         fontWeight: "bold",
      //         color: "#333",
      //       },
      //     },
      //   },
      // },
      grid: {
        left: 28,
        top: 40,
        height: "auto",
        // 190
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
            margin: 12,
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
          name: "????????????",
          // max: function (value) {
          //   return value.max + 1;
          // },
          axisLabel: {
            color: "#7c7c7c",
            fontSize: 12,
            margin: 20,
          },
          nameTextStyle: {
            color: "#7c7c7c",
            fontSize: 12,

            padding: [0, 0, 0, 50],
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
                  color: "#7ecbff", // 0% ????????????
                },

                {
                  offset: 1,
                  color: "#1da4fe", // 100% ????????????
                },
              ],
            },
            borderRadius: [3, 3, 0, 0],
          },
          // data: [320, 332, 301, 334, 390, 330, 320],
        },
      ],
    };

    if (!myEchart_sub) {
      // ???????????????????????????????????????echarts???????????????????????????echarts
      myEchart_sub = echarts.init(subRef.current);
      // ??????echart??????
      setSubEchart(myEchart_sub);
      // ?????????resize??????????????????echart
      resizeForEcharts(myEchart_sub);
    }

    subOption.dataset.source = dataset_sub;

    // ??????option

    myEchart_sub.setOption(subOption);
    return () => {
      // ??????echarts???????????????

      myEchart_sub.off();
    };
    // ?????????????????????????????????
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeSelect, dataInType, productMsg]);

  return (
    <div className={`teacher-bar TeacherPeriod ${className ? className : ""} `}>
      <div className="tb-top">
        <p className="tb-tip">
          {productMsg && productMsg.title ? productMsg.title : ""}
          ???????????????????????????<span className="tb-tip-1">{TermAvgCH}</span>
          ?????????????????????
          <span className="tb-tip-2">{WeekAvgCH}</span>???????????????????????????
          <span className="tb-tip-2">{AvgTeachClass}</span>?????? ????????????????????????
          <span className="tb-tip-2">{AvgTeachStu}</span>???
        </p>
        <p className="tp-tilte">???{productMsg.sub}??????????????????????????????</p>
        {typeList.length > 1 ? (
          <div className="tp-handle">
            <span className="tph-title">{productMsg.sub}:</span>
            {/* <span className="tph-Scrollbars">

            <Scrollbars autoWidthMax={800}>
              <p className="tph-p"> */}
            {typeList.map((child, index) => {
              return (
                <span
                  key={index}
                  className={`tph-type ${
                    typeSelect === child.NodeID ? "tph-type-select" : ""
                  }`}
                  onClick={() => {
                    setTypeSelect(child.NodeID);
                  }}
                >
                  {child.NodeName}
                </span>
              );
            })}
            {/* </p>
            </Scrollbars>
            </span> */}
          </div>
        ) : (
          ""
        )}
      </div>
      <div ref={subRef} className="tp-echarts"></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  let {
    commonData: { levelHash },
  } = state;
  return { levelHash };
};
export default connect(mapStateToProps)(memo(forwardRef(TeacherPeriod)));
