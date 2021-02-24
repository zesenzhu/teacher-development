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
 * @Date: 2020-12-25 09:18:10
 * @LastEditTime: 2020-12-25 09:18:10
 * @Description: 教师教学能力
 * @FilePath: \teacher-development\src\pages\teachersStatisticAnalysis\teachingAbility\index.js
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
import TeacherEC from "./teacherEC";
import TeacherER from "./teacherER";
import TeacherTP from "./teacherTP";
import TeacherECourse from "./teacherECourse";
import TeacherRA from "./teacherRA";
import TeacherRP from "./teacherRP";
import {
  getTeachER,
  getTeachTP,
  getTeachEC,
  getEvaluateCourse,
  getTeacherRA,
  getTeachRP,
  getHistoryER,
  getHistoryTP,
  getHistoryEC,
  getHistoryEvaluateCourse,
  getHistoryRA,getHistoryRP
} from "../../../api/teachingAbility";
import HistoryModal from "../historyModal";

const ApiList = {
  ER: { api: getHistoryER, title: "历年参与率变化" },
  TP: { api: getHistoryTP, title: "历年参与率变化" },
  EC: { api: getHistoryEC, title: "历年精品课程率变化" },
  EvaluateCourse: { api: getHistoryEvaluateCourse, title: "历年评估值变化" },
  RP: { api: getHistoryRP, title: "历年参与率变化" },
  RA: { api: getHistoryRA, title: "历年参与率变化" },
};
function TeachingAbility(props, ref) {
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
  const { selectLevel, productLevel } = productMsg;
  // 教师人数
  const [teacherER, setTeacherER] = useState(false);
  const [teacherTP, setTeacherTP] = useState(false);
  const [teacherEC, setTeacherEC] = useState(false);
  const [teacherEvaluateCourse, setTeacherEvaluateCourse] = useState(false);
  const [teacherRA, setTeacherRA] = useState(false);
  const [teacherRP, setTeacherRP] = useState(false);
  // 设置api
  const [ApiSelect, setApiSelect] = useState("");
  //向上传bar的信息
  // const [anchorList, setAnchorList] = useState([]);
  // 获取每一块的ref，实现锚点功能
  const erRef = useRef(null);
  const tpRef = useRef(null);
  const ecRef = useRef(null);
  const courseRef = useRef(null);
  const raRef = useRef(null);
  const rpRef = useRef(null);
  const historyRef = useRef({});

  useLayoutEffect(() => {
    // setAnchorList();
    typeof onAnchorComplete === "function" &&
      onAnchorComplete([
        { ref: erRef.current, name: "电子资源" },
        { ref: tpRef.current, name: "电子教案" },
        { ref: ecRef.current, name: "精品课程" },
        { ref: courseRef.current, name: "电子督课" },
        { ref: rpRef.current, name: "教研课题" },
        { ref: raRef.current, name: "教研活动" },
      ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 初始请求
  useEffect(() => {
    // 第一次进来的时候可能为undefined
    if (term instanceof Object) {
      // 电子资源
      getTeachER({
        term: term.value,
        schoolID,
        collegeID,
        selectLevel,
      }).then((data) => {
        if (data) {
          setTeacherER(data);
        }
      });
      // 电子教案
      getTeachTP({
        term: term.value,
        schoolID,
        collegeID,
        selectLevel,
      }).then((data) => {
        if (data) {
          setTeacherTP(data);
        }
      });
      //  精品课程
      getTeachEC({
        term: term.value,
        schoolID,
        collegeID,
        selectLevel,
      }).then((data) => {
        if (data) {
          setTeacherEC(data);
        }
      });
      //  电子督课
      getEvaluateCourse({
        term: term.value,
        schoolID,
        collegeID,
        selectLevel,
      }).then((data) => {
        if (data) {
          setTeacherEvaluateCourse(data);
        }
      });
      //  教研活动
      getTeacherRA({
        term: term.value,
        schoolID,
        collegeID,
        selectLevel,
      }).then((data) => {
        if (data) {
          setTeacherRA(data);
        }
      });
      //  教研课题
      getTeachRP({
        term: term.value,
        schoolID,
        collegeID,
        selectLevel,
      }).then((data) => {
        if (data) {
          setTeacherRP(data);
        }
      });
    }
  }, [term, schoolID, collegeID, selectLevel]);

  return (
    <div className="TeachingAbility">
      <Bar
        loading={!teacherER}
        barName={"电子资源上传统计"}
        ref={erRef}
        topContext={
          HasHistory
            ? {
                title: "查看历年参与率变化",
                onClick: () => {
                  setApiSelect("ER");
                  historyRef.current.controlVisible();
                },
              }
            : false
        }
      >
        <TeacherER data={teacherER} productMsg={productMsg}></TeacherER>
      </Bar>
      <Bar
        loading={!teacherTP}
        barName={"电子教案制作统计"}
        ref={tpRef}
        topContext={
          HasHistory
            ? {
                title: "查看历年参与率变化",
                onClick: () => {
                  setApiSelect("TP");
                  historyRef.current.controlVisible();
                },
              }
            : false
        }
      >
        <TeacherTP data={teacherTP} productMsg={productMsg}></TeacherTP>
      </Bar>
      <Bar
        loading={!teacherEC}
        barName={"精品课程制作统计"}
        ref={ecRef}
        topContext={
          HasHistory
            ? {
                title: "查看历年精品课程率变化",
                onClick: () => {
                  setApiSelect("EC");
                  historyRef.current.controlVisible();
                },
              }
            : false
        }
      >
        <TeacherEC data={teacherEC} productMsg={productMsg}></TeacherEC>
      </Bar>
      <Bar
        barName={"电子督课评估值统计"}
        ref={raRef}
        loading={!teacherEvaluateCourse}
        topContext={
          HasHistory
            ? {
                title: "查看历年评估值变化",
                onClick: () => {
                  setApiSelect("EvaluateCourse");
                  historyRef.current.controlVisible();
                },
              }
            : false
        }
      >
        <TeacherECourse
          data={teacherEvaluateCourse}
          productMsg={productMsg}
        ></TeacherECourse>
      </Bar>
      <Bar
        barName={"教研课题统计"}
        ref={rpRef}
        loading={!teacherRP}
        topContext={
          HasHistory
            ? {
                title: "查看历年参与率变化",
                onClick: () => {
                  setApiSelect("RP");
                  historyRef.current.controlVisible();
                },
              }
            : false
        }
      >
        <TeacherRP data={teacherRP} productMsg={productMsg}></TeacherRP>
      </Bar>

      <Bar
        barName={"教研活动统计"}
        ref={courseRef}
        loading={!teacherRA}
        topContext={
          HasHistory
            ? {
                title: "查看历年参与率变化",
                onClick: () => {
                  setApiSelect("RA");
                  historyRef.current.controlVisible();
                },
              }
            : false
        }
      >
        <TeacherRA data={teacherRA} productMsg={productMsg}></TeacherRA>
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
  return { HasHistory };
};
export default connect(mapStateToProps)(memo(forwardRef(TeachingAbility)));
