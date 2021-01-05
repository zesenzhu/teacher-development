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
 * @LastEditTime: 2020-12-21 17:12:15
 * @Description:
 * @FilePath: \teacher-development\src\pages\teachersStatisticAnalysis\baseMsg\index.js
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
import "./index.scss";
import Bar from "../../../component/bar";
import {
  getTeacherCount,
  getHonorTeacher,
  getTeacherAge,
  getTeacherEduAndTitle,
} from "../../../api/baseMsg";
import TeacherCount from "./teacherCount";
import TeacherFamous from "./teacherFamous";
import TeacherAge from "./teacherAge";
import TeacherTitle from "./teacherTitle";
import HistoryModal from "../historyModal";
function BaseMsg(props, ref) {
  // *selectLevel:这里的selectLevel与用户的没关系，与看的级别有关，例如教育局的看学校的，selectLevel===2
  // *productLevel:产品类型，给用户看的界面类型，用来控制界面的一些属性：1教育局，2大学学校，3教育局学校，4大学学院，
  // *product:包含该productLevel的所有信息,有使用组件者使用productLevel和commonData的levelHash匹配使用，必须传，不传将出问题
  let {
    term,
    HasHistory,
    onAnchorComplete,
    schoolID,
    collegeID,
    productMsg,
  } = props;
  const { selectLevel } = productMsg;
  // 教师人数
  const [teacherCount, setTeacherCount] = useState(false);
  const [teacherFamous, setTeacherFamous] = useState(false);
  const [teacherAge, setTeacherAge] = useState(false);
  const [teacherEduAndTitle, setTeacherEduAndTitle] = useState(false);
  // 历年弹框
  const [visible, setVisible] = useState(false);
  //向上传bar的信息
  // const [anchorList, setAnchorList] = useState([]);
  // 获取每一块的ref，实现锚点功能
  const countRef = useRef(null);
  const famousRef = useRef(null);
  const ageRef = useRef(null);
  const educationRef = useRef(null);

  const hisRef = useRef(null);
  useLayoutEffect(() => {
    // setAnchorList();
    typeof onAnchorComplete === "function" &&
      onAnchorComplete([
        { ref: countRef.current, name: "人数概况" },
        { ref: famousRef.current, name: "名师统计" },
        { ref: ageRef.current, name: "年龄教龄" },
        { ref: educationRef.current, name: "学历职称" },
      ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 初始请求
  useEffect(() => {
    // 第一次进来的时候可能为undefined
    if (term instanceof Object) {
      // 教师数量
      getTeacherCount({
        term: term.value,
        schoolID,
        collegeID,
        selectLevel,
      }).then((data) => {
        if (data) {
          setTeacherCount(data);
        }
      });
      // 著名教师
      getHonorTeacher({
        term: term.value,
        schoolID,
        collegeID,
        selectLevel,
      }).then((data) => {
        if (data) {
          setTeacherFamous(data);
        }
      });
      // 年龄及教龄统计
      getTeacherAge({
        term: term.value,
        schoolID,
        collegeID,
        selectLevel,
      }).then((data) => {
        if (data) {
          setTeacherAge(data);
        }
      });
      // 年龄及教龄统计
      getTeacherEduAndTitle({
        term: term.value,
        schoolID,
        collegeID,
        selectLevel,
      }).then((data) => {
        if (data) {
          setTeacherEduAndTitle(data);
        }
      });
    }
  }, [term, schoolID, collegeID, selectLevel]);
  return (
    <div className="BaseMsg">
      {/* {tabid === "teacherBaseMsg" ? <div></div> : ""} */}
      <Bar
        barName={"教师人数概况统计"}
        ref={countRef}
        topContext={
          HasHistory
            ? {
                title: "查看历年人数变化",
                onClick: () => {
                  setVisible(true);
                },
              }
            : false
        }
        loading={!teacherCount}
      >
        <TeacherCount
          data={teacherCount}
          productMsg={productMsg}
        ></TeacherCount>
      </Bar>
      <Bar loading={!teacherFamous} barName={"名师统计 "} ref={famousRef}>
        <TeacherFamous
          data={teacherFamous}
          productMsg={productMsg}
        ></TeacherFamous>
      </Bar>
      <Bar loading={!teacherAge} barName={"年龄及教龄统计"} ref={ageRef}>
        <TeacherAge data={teacherAge} productMsg={productMsg}></TeacherAge>
      </Bar>
      <Bar
        loading={!teacherEduAndTitle}
        barName={"学历职称统计 "}
        ref={educationRef}
        topContext={
          HasHistory
            ? {
                title: "查看历年学历职称统计 ",
                onClick: () => {
                  setVisible(true);
                },
              }
            : false
        }
      >
        <TeacherTitle
          data={teacherEduAndTitle}
          productMsg={productMsg}
        ></TeacherTitle>
      </Bar>
      <HistoryModal
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
        title={'历史人数变化'}
        data={[
          {
            nodeName: "全部",
            nodeID: "all",
            titleList: [
              ["", "年", "教师人均周课时", "节次"],
              ["人均总课时", "节"],
              ["人均任教班级", "个"],
              ["人均任教学生", "人"],
            ],
            xName: "周课时数",
            yName: "年份",
            source: [], //数据源
            type: ["测试1", "测试2"], //多个数据时候的名称lengen
            children: [
              {
                nodeName: "2018",
                nodeID: 2018,
                dataList: [["2018", "初中学段", "21"], ["150"], ["2"], ["60"]],
                source: [70, 65],
              },
              {
                nodeName: "2019",
                nodeID: 2019,
                dataList: [["2019", "初中学段", "21"], ["150"], ["2"], ["60"]],
                source: [60, 30],
              },
              {
                nodeName: "2020",
                nodeID: 2020,
                dataList: [["2020", "初中学段", "21"], ["150"], ["2"], ["60"]],
                source: [85, 40],
              },
            ],
          },
        ]}
      ></HistoryModal>
    </div>
  );
}

const mapStateToProps = (state) => {
  let {
    commonData: {
      termInfo: { HasHistory },
    },
  } = state;
  // console.log(state)
  return { HasHistory };
};
export default connect(mapStateToProps)(memo(forwardRef(BaseMsg)));
