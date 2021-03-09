/*
 * ......................................&&.........................
 * ....................................&&&..........................
 * .................................&&&&............................
 * ...............................&&&&..............................
 * .............................&&&&&&..............................
 * ...........................&&&&&&....&&&..&&&&&&&&&&&&&&&........
 * ..................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&..............
 * ................&...&&&&&&&&&&&&&&&&&&&&&&&&&&&&.................
 * .......................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&.........
 * ...................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...............
 * ..................&&&   &&&&&&&&&&&&&&&&&&&&&&&&&&&&&............
 * ...............&&&&&@  &&&&&&&&&&..&&&&&&&&&&&&&&&&&&&...........
 * ..............&&&&&&&&&&&&&&&.&&....&&&&&&&&&&&&&..&&&&&.........
 * ..........&&&&&&&&&&&&&&&&&&...&.....&&&&&&&&&&&&&...&&&&........
 * ........&&&&&&&&&&&&&&&&&&&.........&&&&&&&&&&&&&&&....&&&.......
 * .......&&&&&&&&.....................&&&&&&&&&&&&&&&&.....&&......
 * ........&&&&&.....................&&&&&&&&&&&&&&&&&&.............
 * ..........&...................&&&&&&&&&&&&&&&&&&&&&&&............
 * ................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&............
 * ..................&&&&&&&&&&&&&&&&&&&&&&&&&&&&..&&&&&............
 * ..............&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&....&&&&&............
 * ...........&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&......&&&&............
 * .........&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&.........&&&&............
 * .......&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...........&&&&............
 * ......&&&&&&&&&&&&&&&&&&&...&&&&&&...............&&&.............
 * .....&&&&&&&&&&&&&&&&............................&&..............
 * ....&&&&&&&&&&&&&&&.................&&...........................
 * ...&&&&&&&&&&&&&&&.....................&&&&......................
 * ...&&&&&&&&&&.&&&........................&&&&&...................
 * ..&&&&&&&&&&&..&&..........................&&&&&&&...............
 * ..&&&&&&&&&&&&...&............&&&.....&&&&...&&&&&&&.............
 * ..&&&&&&&&&&&&&.................&&&.....&&&&&&&&&&&&&&...........
 * ..&&&&&&&&&&&&&&&&..............&&&&&&&&&&&&&&&&&&&&&&&&.........
 * ..&&.&&&&&&&&&&&&&&&&&.........&&&&&&&&&&&&&&&&&&&&&&&&&&&.......
 * ...&&..&&&&&&&&&&&&.........&&&&&&&&&&&&&&&&...&&&&&&&&&&&&......
 * ....&..&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...........&&&&&&&&.....
 * .......&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&..............&&&&&&&....
 * .......&&&&&.&&&&&&&&&&&&&&&&&&..&&&&&&&&...&..........&&&&&&....
 * ........&&&.....&&&&&&&&&&&&&.....&&&&&&&&&&...........&..&&&&...
 * .......&&&........&&&.&&&&&&&&&.....&&&&&.................&&&&...
 * .......&&&...............&&&&&&&.......&&&&&&&&............&&&...
 * ........&&...................&&&&&&.........................&&&..
 * .........&.....................&&&&........................&&....
 * ...............................&&&.......................&&......
 * ................................&&......................&&.......
 * .................................&&..............................
 * ..................................&..............................
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-12-22 15:22:09
 * @LastEditTime: 2020-12-22 17:59:58
 * @Description: 教师画像列表
 * @FilePath: \teacher-development\src\pages\teacherPersonal\index.js
 */

import {
  connect,
  // useSelector,
  //   useDispatch,
} from "react-redux";
import React, {
  // useCallback,
  useMemo,
  memo,
  useEffect,
  useState,
  useReducer,
  // useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import "./index.scss";
import { handleRoute } from "../../util/public";
import { withRouter } from "react-router-dom";
import SchoolList from "./schoolList";
import SchoolDetail from "./schoolDetail";
import { Loading } from "@/component/common";
import { getSchoolMsg } from "@/api/school";
import { getTermInfo } from "@/util/init";
//   import { Reducer, Context, initState } from "./reducer";
function School(props, ref) {
  let {
    location,
    activeTab,
    levelHash,
    removeTab,
    roleMsg: { productLevel, schoolID, collegeID },
    tabid,
    contentHW: { height },
    schoolMsg,
    param, //param控制显示的模块
  } = props;
  const [Component, setComponent] = useState("");
  const [ID, setID] = useState("");
  const [SchoolMsg, setSchoolMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [state, setDispatch] = useReducer(Reducer, initState);
  // let { component } = state;
  const [TermInfo,setTermInfo] = useState(null)
  // 获取当前级别的信息
  const levelMsg = useMemo(() => {
    return levelHash[productLevel]
      ? levelHash[productLevel]
      : {
          productLevel: 1,
          selectLevel: 1,
          title: "",
          sub: "",
          belong: "",
          belondName: "",
        };
  }, [levelHash, productLevel]);
  useEffect(() => {
    setComponent(param);
  }, [param]);
  // console.log(param,Component)
  useEffect(() => {
    if (location.pathname) {
      let Path = handleRoute(location.pathname);
      if (Path[0] === "schoolDetail" && Path[1]) {
        getSchoolMsg({ nodeID: Path[1] }).then((res) => {
          if (res.StatusCode === 200) {
            setID(Path[1]);
            setSchoolMsg(res.Data);
          } else {
            //不存在
            setSchoolMsg(false);

            if (levelMsg.nextProductLevel) {
              //是上级
              removeTab("", "", "schoolResource", "", () => {});
            } else {
              removeTab("", "", "teacherBaseMsg", "", () => {});
            }
            setLoading(false);
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (SchoolMsg && productLevel) {
      // 教育局的学校为nodeid
      getTermInfo({
        SchoolID:
           productLevel !== 1 ?  schoolID : SchoolMsg.NodeID,
        CollegeID:  productLevel === 2 ? SchoolMsg.NodeID : '',
      }).then((res) => {
        // console.log(res)
        setTermInfo(res)
        setLoading(false);
      });
    }
  }, [SchoolMsg, productLevel,schoolID]);
  return (
    <Loading
      spinning={Component === "detail" && loading}
      tip={"加载中..."}
      opacity={false}
    >
      <div className="School" style={{ height: height }}>
        {Component === "list" ? (
          <SchoolList levelMsg={levelMsg}></SchoolList>
        ) : (
          <></>
        )}
        {Component === "detail"&&TermInfo ? (
          <SchoolDetail
            levelMsg={levelMsg}
            schoolMsg={SchoolMsg}
            termInfo={{...TermInfo,child:true}}
            id={ID}
          ></SchoolDetail>
        ) : (
          <></>
        )}
      </div>
    </Loading>
  );
}

const mapStateToProps = (state) => {
  let {
    handleData: { teacherRecruitMsg },
    commonData: { roleMsg, contentHW, levelHash },
  } = state;
  return { teacherRecruitMsg, roleMsg, contentHW, levelHash };
};
export default connect(mapStateToProps)(withRouter(memo(forwardRef(School))));
