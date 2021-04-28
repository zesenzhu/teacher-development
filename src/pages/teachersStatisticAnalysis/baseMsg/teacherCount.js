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
 * @LastEditTime: 2020-12-21 17:05:36
 * @Description:
 * @FilePath: \teacher-development\src\pages\teachersStatisticAnalysis\baseMsg\teacherCount.js
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
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/dataZoom";

import { resizeForEcharts } from "../../../util/public";
function TeacherCount(props, ref) {
  let {
    className,
    levelHash,
    productMsg,
    data: { Total, TeaSthRatio, MaleCount, FemaleCount, SubSet },
  } = props;
  productMsg = productMsg ? productMsg : {};
  // echart实例
  const [tcEchart, setTcEchart] = useState(null);
  // dom ref
  const tcRef = useRef(null);
  useLayoutEffect(() => {
    // if (SubSet instanceof Array||SubSet.length===0) {
    if (!SubSet) {
      // 没有数据禁止进入
      return;
    }
    let myEchart = tcEchart;
    let sexData = {
      MaleCount: {
        title: "男性教师",
        value: MaleCount,
      },
      FemaleCount: {
        title: "女性教师",
        value: FemaleCount,
      },
    };
    let dataset = [["nodeName", "MaleCount", "FemaleCount"]];
    // SubSet = SubSet.concat(SubSet)
    // console.log(SubSet)
    SubSet instanceof Array &&
      SubSet.forEach((child, index) => {
        let { NodeName, MaleCount, FemaleCount } = child;
        dataset.push([NodeName, MaleCount, FemaleCount, child]);
      });
    if (!tcEchart) {
      // 数据更新后，防止二次初始化echarts，第一次进来初始化echarts
      myEchart = echarts.init(tcRef.current);
      // 保存echart实例
      setTcEchart(myEchart);
      // 对界面resize进行监听重绘echart
      resizeForEcharts(myEchart);
    }
    // dataset =  dataset.concat(dataset.slice(1))
    // 属性配置
    myEchart.setOption({
      dataZoom: {
        type: "slider",
        show: dataset.length > 11,
        // xAxisIndex: [0],
        // start: 0,
        // end: 10/(dataset.length-1)*100,
        minSpan: (10 / (dataset.length - 1)) * 100,
        maxSpan: (10 / (dataset.length - 1)) * 100,
        zoomLock: true,
        showDetail: false,
        showDataShadow: false,
        height: 8,
        bottom: 0,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
        backgroundColor: "rgba(0,0,0,0.7)",
        borderColor: "transparent",
        // appendToBody:true,
        borderWidth: 0,
        formatter: (value) => {
          let [data_1] = value;
          let {
            NodeID,
            NodeName,
            Total,
            MaleCount,
            FemaleCount,
            MalePercent,
            FemalePercent,
          } = data_1.data[3];
          return `<div  class="tc-tooltip">
              <p class="nodename">${NodeName}</p>
                <p class='msg'>总人数<span>${Total}人</span></p>
                <p class='msg'>男性<span>${MaleCount}人</span>，占比<span>${MalePercent}</span></p>
                <p class='msg'>女性<span>${FemaleCount}人</span>，占比<span>${FemalePercent}</span></p>
            </div>
          `;
        },
        textStyle: {
          rich: {
            NodeName: {},
          },
        },
      },
      legend: {
        // data: ["男性教师", "女性教师"],
        right: 20,
        itemWidth: 11,
        itemHeight: 11,
        itemGap: 30,
        formatter: (id) => {
          return `{name|${sexData[id].title}:}{count|${sexData[id].value}}{name|人}`;
        },
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
        right: 100,
        height: 140,
        bottom: 20,
        containLabel: true,
      },
      dataset: {
        source: dataset,
      },
      xAxis: [
        {
          type: "category",
          name: productMsg.sub,
          nameGap: 12,

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
          name: "人数",
          // max: function (value) {
          //   if(value.max/4)
          //   return value.max + 1;
          // },
          axisLabel: {
            color: "#7c7c7c",
            fontSize: 12,
            margin: 30,
          },

          nameTextStyle: {
            color: "#7c7c7c",
            fontSize: 12,
            // padding:[0, 0 ,0 ,0 ]
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
                  color: "#7ecbff", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#1da4fe", // 100% 处的颜色
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
          barGap: "1%",
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
                  color: "#ffcbb9", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fd6e75", // 100% 处的颜色
                },
              ],
            },
            borderRadius: [3, 3, 0, 0],
          },
          // data: [120, 132, 101, 134, 90, 230, 210],
        },
      ],
    });
    return () => {
      // 卸载echarts实例的事件
      myEchart.off();
    };
    // 依赖数据的变化重绘界面
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SubSet, productMsg]);

  return (
    <div className={`TeacherCount ${className ? className : ""} `}>
      {/* <Loading spinning={!tcEchart} tip={"加载中..."} opacity={false}> */}
      <p className="tc-tip">
        {productMsg && productMsg.title ? productMsg.title : ""}
        教师总人数<span className="tc-tip-1">{Total}</span>人，
        {productMsg && productMsg.productLevel === 1 ? (
          <>
            其中
            {SubSet instanceof Array && SubSet.length > 0
              ? SubSet.map((child, index) => {
                  return (
                    <React.Fragment key={index}>
                      {child.NodeName}教师
                      <span className="tc-tip-2">{child.Total}</span>人
                      {index !== SubSet.length - 1 || index === 0 ? "，" : ""}
                    </React.Fragment>
                  );
                })
              : ""}
          </>
        ) : (
          <>
            师生比例
            <span className="tc-tip-2">{TeaSthRatio}</span>，其中男性教师
            <span className="tc-tip-2">{MaleCount}</span>人，女性教师
            <span className="tc-tip-2">{FemaleCount}</span>人
          </>
        )}
      </p>

      <div ref={tcRef} className="tc-echarts"></div>
      {/* </Loading> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  let {
    commonData: { levelHash },
  } = state;
  return { levelHash };
};
export default connect(mapStateToProps)(memo(forwardRef(TeacherCount)));
