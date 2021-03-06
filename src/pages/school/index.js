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
 * @Description: ??????????????????
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
import { Loading,Empty } from "@/component/common";
import { getSchoolMsg } from "@/api/school";
import { getTermInfo } from "@/util/init";
import { commonActions, handleActions } from "../../redux/actions";

//   import { Reducer, Context, initState } from "./reducer";
function School(props, ref) {
  let {
    location,
    activeTab,
    levelHash,
    removeTab,
    roleMsg: { productLevel, schoolID, collegeID },
    tabid,termInfo,
    contentHW: { height },
    schoolMsg, 
    dispatch,
    param, //param?????????????????????
  } = props;
  let { TermInfo:myTermInfo, HasHistory } = termInfo?termInfo:{};

  const [Component, setComponent] = useState("");
  const [ID, setID] = useState("");
  const [SchoolMsg, setSchoolMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [state, setDispatch] = useReducer(Reducer, initState);
  // let { component } = state;
  const [TermInfo, setTermInfo] = useState(null);
  // ???????????????????????????
  const levelMsg = useMemo(() => {
    return levelHash[productLevel]
      ? levelHash[productLevel]
      : {
          productLevel: 1,
          selectLevel: 1,
          title: "",
          sub: "",
          belong: "",
          belondName: "",nextTitle:''
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
            dispatch(
              handleActions.setTabMsg({
                ["schoolDetail|" + Path[1]]: {
                  name: "??????: " + res.Data.NodeName,
                  title: levelMsg.belong + "?????????" + res.Data.NodeName,
                },
              })
            );
          } else {
            //?????????
            setSchoolMsg(false);

            if (levelMsg.nextProductLevel) {
              //?????????
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
  // ????????????????????????
  useEffect(() => {
    if (SchoolMsg && productLevel) {
      // ?????????????????????nodeid
      getTermInfo({
        SchoolID: productLevel !== 1 ? schoolID : SchoolMsg.NodeID,
        CollegeID: productLevel === 2 ? SchoolMsg.NodeID : "",
      }).then((res) => {
        // console.log(res)
        setTermInfo(res);
        setLoading(false);
      });
    }
  }, [SchoolMsg, productLevel, schoolID]);
  
  return (
    <Loading
      spinning={Component === "detail" && loading}
      tip={"?????????..."}
      opacity={false}
    >
      {myTermInfo instanceof Array&&myTermInfo.length>0?<div className="School" style={{ height: height }}>
        {Component === "list" ? (
          <SchoolList levelMsg={levelMsg}></SchoolList>
        ) : (
          <></>
        )}
        {Component === "detail" && TermInfo ? (
          <SchoolDetail
            levelMsg={levelMsg}
            schoolMsg={SchoolMsg}
            termInfo={{ ...TermInfo, child: true }}
            id={ID}
          ></SchoolDetail>
        ) : (
          <></>
        )}
      </div>:<Empty style={{marginTop:'200px'}} type={'4'} title={'??????????????????'+(productLevel===2?'???':'???')+'????????????'}></Empty>}
    </Loading>
  );
}

const mapStateToProps = (state) => {
  let {
    handleData: { teacherRecruitMsg },
    commonData: { roleMsg, contentHW, levelHash,termInfo },
  } = state;
  return { teacherRecruitMsg, roleMsg, contentHW, levelHash,termInfo };
};
export default connect(mapStateToProps)(withRouter(memo(forwardRef(School))));
