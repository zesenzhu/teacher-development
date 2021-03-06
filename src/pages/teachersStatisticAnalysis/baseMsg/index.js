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
  getHistoryTeacherCount,
  getHistoryEduAndTitle,
} from "../../../api/baseMsg";
import TeacherCount from "./teacherCount";
import TeacherFamous from "./teacherFamous";
import TeacherAge from "./teacherAge";
import TeacherTitle from "./teacherTitle";
import HistoryModal from "../historyModal";

const ApiList = {
  count: { api: getHistoryTeacherCount, title: "??????????????????" },
  eduAndTitle: { api: getHistoryEduAndTitle, title: "????????????????????????" },
};
function BaseMsg(props, ref) {
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
  const { selectLevel,middleTitleName } = productMsg;
  // ????????????
  const [teacherCount, setTeacherCount] = useState(false);
  const [teacherFamous, setTeacherFamous] = useState(false);
  const [teacherAge, setTeacherAge] = useState(false);
  const [teacherEduAndTitle, setTeacherEduAndTitle] = useState(false);

  // ????????????
  const [visible, setVisible] = useState(false);
  // ??????api
  const [ApiSelect, setApiSelect] = useState("");
  //?????????bar?????????
  // const [anchorList, setAnchorList] = useState([]);
  // ??????????????????ref?????????????????????
  const countRef = useRef(null);
  const famousRef = useRef(null);
  const ageRef = useRef(null);
  const educationRef = useRef(null);

  const historyRef = useRef({});
  useLayoutEffect(() => {
    // setAnchorList();
    typeof onAnchorComplete === "function" &&
      onAnchorComplete([
        { ref: countRef.current, name: "????????????" },
        { ref: famousRef.current, name: "????????????" },
        { ref: ageRef.current, name: "????????????" },
        { ref: educationRef.current, name: "????????????" },
      ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // ????????????
  useEffect(() => {
    // ?????????????????????????????????undefined
    if (term instanceof Object) {
      // ????????????
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
      // ????????????
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
      // ?????????????????????
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
      // ?????????????????????
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
  }, [term, schoolID, collegeID, selectLevel,reload]);
  return (
    <div className="BaseMsg">
      {/* {tabid === "teacherBaseMsg" ? <div></div> : ""} */}
      <Bar
        barName={"????????????????????????"}
        ref={countRef}
        topContext={
          HasHistory
            ? {
                title: "????????????????????????",
                onClick: () => {
                  setApiSelect("count");
                  historyRef.current.controlVisible();
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
      <Bar loading={!teacherFamous} barName={"???????????? "} ref={famousRef}>
        <TeacherFamous
          data={teacherFamous}
          productMsg={productMsg}
        ></TeacherFamous>
      </Bar>
      <Bar loading={!teacherAge} barName={"?????????????????????"} ref={ageRef}>
        <TeacherAge data={teacherAge} productMsg={productMsg}></TeacherAge>
      </Bar>
      <Bar
        loading={!teacherEduAndTitle}
        barName={"?????????????????? "}
        ref={educationRef}
        topContext={
          HasHistory
            ? {
                title: "?????????????????????????????? ",
                onClick: () => {
                  setApiSelect("eduAndTitle");
                  historyRef.current.controlVisible();
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
        // data={[
        //   {
        //     nodeName: "??????",
        //     nodeID: "all",
        //     titleList: [
        //       ["", "???", "?????????????????????", "??????"],
        //       ["???????????????", "???"],
        //       ["??????????????????", "???"],
        //       ["??????????????????", "???"],
        //     ],
        //     xName: "????????????",
        //     yName: "??????",
        //     source: [], //?????????
        //     type: ["??????1", "??????2"], //???????????????????????????lengen
        //     children: [
        //       {
        //         nodeName: "2018",
        //         nodeID: 2018,
        //         dataList: [["2018", "????????????", "21"], ["150"], ["2"], ["60"]],
        //         source: [70, 65],
        //       },
        //       {
        //         nodeName: "2019",
        //         nodeID: 2019,
        //         dataList: [["2019", "????????????", "21"], ["150"], ["2"], ["60"]],
        //         source: [60, 30],
        //       },
        //       {
        //         nodeName: "2020",
        //         nodeID: 2020,
        //         dataList: [["2020", "????????????", "21"], ["150"], ["2"], ["60"]],
        //         source: [85, 40],
        //       },
        //     ],
        //   },
        // ]}
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
export default connect(mapStateToProps)(memo(forwardRef(BaseMsg)));
