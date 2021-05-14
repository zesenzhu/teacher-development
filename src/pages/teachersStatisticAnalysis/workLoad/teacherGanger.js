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
 * @Description:班主任管理班级统计
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
function TeacherGanger(props, ref) {
  let {
    className,
    levelHash,
    productMsg,
    data: { ClassCount, GangerCount, MaxClass, AvgClass, SubSet },
  } = props;
  productMsg = productMsg ? productMsg : {};
  // echart实例
  // 柱状
  const [subEchart, setSubEchart] = useState(null);
  // 类型列表
  const [dataList, setDataList] = useState([]);
  // 选择类型
  const [typeSelect, setTypeSelect] = useState("");
  // 选中的柱状数据
  const [dataInType, setDataInType] = useState({});
  // dom ref
  const subRef = useRef(null);
  // 处理数据
  useEffect(() => {
    let dataList = [["nodeName", "count"]];
    deepMap(
      SubSet,
      ({ child, level, parent }) => {
        let {
          NodeName,
          Total,
          NodeID,
          ClassCount,
          GangerCount,
          MaxClassCount,
          AvgClass,
        } = child;
        dataList.push([
          NodeName,
          Total,
          NodeID,
          ClassCount,
          GangerCount,
          MaxClassCount,
          AvgClass,
        ]);
      },
      "SubSet"
    );

    setDataList(dataList);
  }, [SubSet]);
  useLayoutEffect(() => {
    let myEchart_sub = subEchart;
    let subOption = {
      // title: {
      //   text: "各年龄教师年龄/教龄分布情况",
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
        show: dataList.length > 11,
        // xAxisIndex: [0],
        // start: 0,
        // end: 10/(dataset.length-1)*100,
        minSpan: (10 / (dataList.length - 1)) * 100,
        maxSpan: (10 / (dataList.length - 1)) * 100,
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
            // console.log(child);
            dom += `<p class='msg '>行政班数量:<span>${data[3]}个</span></p><p class='msg '>班主任数量:<span>${data[4]}个</span></p><p class='msg '>平均管理班级数量:<span>${data[1]}个</span></p>`;
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
      //   // data: ["男性教师", "女性教师"],
      //   right: 50,
      //   top: 40,
      //   itemWidth: 11,
      //   itemHeight: 11,
      //   itemGap: 30,
      //   // formatter: (id) => {
      //   //   return `{name|${sexData[id].title}:}{count|${sexData[id].value}}{name|人}`;
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
        // height: 190,
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
          name: productMsg.ganger,
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
            margin: 12,
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
          name: "平均管理班级数量",
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

            padding: [0, 0, 0, 90],
          },
          nameGap: 20,
        },
      ],
      series: [
        {
          // name: "男性教师",
          type: "bar",
          // barWidth: 5,
          barMaxWidth: 36,
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
      ],
    };

    if (!myEchart_sub) {
      // 数据更新后，防止二次初始化echarts，第一次进来初始化echarts
      myEchart_sub = echarts.init(subRef.current);
      // 保存echart实例
      setSubEchart(myEchart_sub);
      // 对界面resize进行监听重绘echart
      resizeForEcharts(myEchart_sub);
    }
    subOption.dataset.source = dataList;

    // 设置option

    myEchart_sub.setOption(subOption);
    return () => {
      // 卸载echarts实例的事件

      myEchart_sub.off();
    };
    // 依赖数据的变化重绘界面
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataList, productMsg]);

  return (
    <div className={`teacher-bar TeacherGanger ${className ? className : ""} `}>
      <div className="tb-top">
        <p className="tb-tip">
          {productMsg && productMsg.title ? productMsg.title : ""}
          行政班共有<span className="tb-tip-1">{ClassCount}</span>
          个，班主任共有
          <span className="tb-tip-2">{GangerCount}</span>名，每名班主任平均管理
          <span className="tb-tip-2">{AvgClass}</span>个行政班，
          最大管理班级数量者共负责
          <span className="tb-tip-2">{MaxClass}</span>个行政班
        </p>
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
export default connect(mapStateToProps)(memo(forwardRef(TeacherGanger)));
