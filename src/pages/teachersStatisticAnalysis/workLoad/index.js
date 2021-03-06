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
 * @Description:??????????????????????????????????????????????????????????????????
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
// import TeacherRatio from "./teacherRatio";
import TeacherRatio from "./teacherRatio.js";
import {
  getClassHour,
  getTeacherGanger,
  getHistoryClassHour,getTeaStuRatio,getHistoryTeaStuRatio
} from "@/api/workMsg";
import {TeaStuCount,getHistoryTeaStuCount} from '@/api/baseMsg';
import HistoryModal from "../historyModal";

// import TeacherCount from "./teacherCount";
// import TeacherPeriod from "./teacherPeriod";
// import TeacherAge from "./teacherAge";
// import TeacherTitle from "./teacherTitle";
const ApiList = {
  TeaStuRatio: { api: getHistoryTeaStuRatio, title: "?????????????????????" },
  TeaStuCount: { api: getHistoryTeaStuCount, title: "?????????????????????" },

  ClassHour: { api: getHistoryClassHour, title: "???????????????????????????" },
};
function WorkLoad(props, ref) {
  // *selectLevel:?????????selectLevel?????????????????????????????????????????????????????????????????????????????????selectLevel===2
  // *productLevel:?????????????????????????????????????????????????????????????????????????????????1????????????2???????????????3??????????????????4???????????????
  // *product:?????????productLevel???????????????,????????????????????????productLevel???commonData???levelHash?????????????????????????????????????????????
  let {
    term,
    HasHistory,
    onAnchorComplete,
    schoolID,
    collegeID,
    productMsg,reload
  } = props;
  const { selectLevel, productLevel } = productMsg;
  // ????????????
  const [teacherStuRatio, setTeaStuRatio] = useState(false);
  const [teacherPeriod, setTeacherPeriod] = useState(false);
  const [teacherGanger, setTeacherGanger] = useState(false);
  const [teacherEduAndTitle, setTeacherEduAndTitle] = useState(false);
  //?????????bar?????????
  // const [anchorList, setAnchorList] = useState([]);
  // ??????api
  const [ApiSelect, setApiSelect] = useState("");
  // ??????????????????ref?????????????????????
  const ratioRef = useRef(null);
  const periodRef = useRef(null);
  const gangerRef = useRef(null);

  const historyRef = useRef({});
  useLayoutEffect(() => {
    // setAnchorList();
    typeof onAnchorComplete === "function" &&
      onAnchorComplete([
        { ref: ratioRef.current, name: "????????????" },
        { ref: periodRef.current, name: "????????????" },
        { ref: gangerRef.current, name: "????????????" },
      ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ????????????
  useEffect(() => {
    // ?????????????????????????????????undefined
    if (term instanceof Object) {
      // ????????????
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
      // ???????????????????????????
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
      if(productLevel){
        productLevel === 1? getTeaStuRatio({
          term: term.value,
          schoolID,
          collegeID,
          selectLevel,
        }).then((data) => {
          if (data) {
            setTeaStuRatio(data);
          }
        }):TeaStuCount({ term: term.value,
          schoolID,
          collegeID,
          selectLevel,}).then(data=>{
            if (data) {
            setTeaStuRatio(data);}
        });
      }
      
    }
  }, [term, schoolID, collegeID, selectLevel,reload,productLevel]);


  return (
    <div className="WorkLoad">
      {/* {tabid === "teacherBaseMsg" ? <div></div> : ""} */}
      {/* {productLevel === 1 ? ( */}
        <Bar
          barName={"???????????????"}
          ref={ratioRef}
          loading={!teacherStuRatio}
          topContext={
            HasHistory 
              ? {
                  title: "???????????????????????????",
                  onClick: () => {
                    setApiSelect(productLevel === 1?"TeaStuRatio":'TeaStuCount');
                    historyRef.current.controlVisible();
                  },
                }
              : false
          }
        >
          <TeacherRatio isEdu={productLevel === 1}  data={teacherStuRatio}
          productMsg={productMsg}></TeacherRatio>
        </Bar>
      {/* ) : (
        ""
      )} */}
      <Bar
        topContext={
          HasHistory
            ? {
                title: "?????????????????????????????????",
                onClick: () => {
                  setApiSelect("ClassHour");
                  historyRef.current.controlVisible();
                },
              }
            : false
        }
        loading={!teacherPeriod}
        barName={"??????????????? "}
        ref={periodRef}
      >
        <TeacherPeriod
          data={teacherPeriod}
          productMsg={productMsg}
        ></TeacherPeriod>
      </Bar>
      <Bar
        loading={!teacherGanger}
        barName={"???????????????????????????"}
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
