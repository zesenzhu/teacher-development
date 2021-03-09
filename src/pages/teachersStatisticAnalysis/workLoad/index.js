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
 * @Description:工作量统计，教育局才有师生比统计，其它的没有
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
import TeacherPeriod from "./teacherPeriod";
import TeacherGanger from "./teacherGanger";
import {
  getClassHour,
  getTeacherGanger,
  getHistoryClassHour,
} from "../../../api/workMsg";
import HistoryModal from "../historyModal";

// import TeacherCount from "./teacherCount";
// import TeacherPeriod from "./teacherPeriod";
// import TeacherAge from "./teacherAge";
// import TeacherTitle from "./teacherTitle";
const ApiList = {
  TeaStuRatio: { api: "", title: "历年师生比变化" },
  ClassHour: { api: getHistoryClassHour, title: "历年人均周课时变化" },
};
function WorkLoad(props, ref) {
  // *selectLevel:这里的selectLevel与用户的没关系，与看的级别有关，例如教育局的看学校的，selectLevel===2
  // *productLevel:产品类型，给用户看的界面类型，用来控制界面的一些属性：1教育局，2大学学校，3教育局学校，4大学学院，
  // *product:包含该productLevel的所有信息,有使用组件者使用productLevel和commonData的levelHash匹配使用，必须传，不传将出问题
  let {
    term,
    HasHistory,
    onAnchorComplete,
    schoolID,
    collegeID,
    productMsg,reload
  } = props;
  const { selectLevel, productLevel } = productMsg;
  // 教师人数
  const [teacherCount, setTeacherCount] = useState(false);
  const [teacherPeriod, setTeacherPeriod] = useState(false);
  const [teacherGanger, setTeacherGanger] = useState(false);
  const [teacherEduAndTitle, setTeacherEduAndTitle] = useState(false);
  //向上传bar的信息
  // const [anchorList, setAnchorList] = useState([]);
  // 设置api
  const [ApiSelect, setApiSelect] = useState("");
  // 获取每一块的ref，实现锚点功能
  const ratioRef = useRef(null);
  const periodRef = useRef(null);
  const gangerRef = useRef(null);

  const historyRef = useRef({});
  useLayoutEffect(() => {
    // setAnchorList();
    typeof onAnchorComplete === "function" &&
      onAnchorComplete([
        { ref: ratioRef.current, name: "师生比例" },
        { ref: periodRef.current, name: "课时统计" },
        { ref: gangerRef.current, name: "班级管理" },
      ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 初始请求
  useEffect(() => {
    // 第一次进来的时候可能为undefined
    if (term instanceof Object) {
      // 课时统计
      getClassHour({
        term: term.value,
        schoolID,
        collegeID,
        selectLevel,
      }).then((data) => {
        if (data) {
          setTeacherPeriod(data);
        }
      });
      // 班主任管理班级统计
      getTeacherGanger({
        term: term.value,
        schoolID,
        collegeID,
        selectLevel,
      }).then((data) => {
        if (data) {
          setTeacherGanger(data);
        }
      });
    }
  }, [term, schoolID, collegeID, selectLevel,reload]);

  return (
    <div className="WorkLoad">
      {/* {tabid === "teacherBaseMsg" ? <div></div> : ""} */}
      {productLevel === 1 ? (
        <Bar
          barName={"师生比统计"}
          ref={ratioRef}
          loading={!teacherCount}
          topContext={
            HasHistory
              ? {
                  title: "查看历年师生比变化",
                  onClick: () => {
                    setApiSelect("TeaStuRatio");
                    historyRef.current.controlVisible();
                  },
                }
              : false
          }
        ></Bar>
      ) : (
        ""
      )}
      <Bar
        topContext={
          HasHistory
            ? {
                title: "查看历年人均周课时变化",
                onClick: () => {
                  setApiSelect("ClassHour");
                  historyRef.current.controlVisible();
                },
              }
            : false
        }
        loading={!teacherPeriod}
        barName={"课时数统计 "}
        ref={periodRef}
      >
        <TeacherPeriod
          data={teacherPeriod}
          productMsg={productMsg}
        ></TeacherPeriod>
      </Bar>
      <Bar
        loading={!teacherGanger}
        barName={"班主任班级管理统计"}
        ref={gangerRef}
      >
        <TeacherGanger
          data={teacherGanger}
          productMsg={productMsg}
        ></TeacherGanger>
      </Bar>
      <HistoryModal
        // onClose={() => {
        //   setVisible(false);
        // }}
        // visible={visible}
        typeName={productMsg.typeName}
        title={ApiSelect && ApiList[ApiSelect].title}
        ref={historyRef}
        api={
          ApiSelect &&
          ApiList[ApiSelect].api.bind(this, {
            schoolID,
            collegeID,
            selectLevel,
          })
        }
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
  return {   };
};
export default connect(mapStateToProps)(memo(forwardRef(WorkLoad)));
