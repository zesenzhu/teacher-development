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
 * @LastEditTime: 2020-12-21 10:08:16
 * @Description:
 * @FilePath: \teacher-development\src\pages\teachersStatisticAnalysis\index.js
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
  // useImperativeHandle,
  useMemo,
  useRef,
  forwardRef,
  useLayoutEffect,
} from "react";
import {
  withRouter,
  // , Route, Switch, NavLink
} from "react-router-dom";
import "./index.scss";
import BaseMsg from "./baseMsg";
import WorkLoad from "./workLoad";
import TeachingAbility from "./teachingAbility";
import InformationizeAbility from "./informationizeAbility";
import AnalysisTop from "./analysisTop";
import { handleRoute } from "../../util/public";
import { Scrollbars } from "react-custom-scrollbars";
import Anchor from "../../component/anchor";
import {Empty} from '@/component/common';
require("echarts");
function Analysis(props, ref) {
  let {
    tabid,
    tabname,
    children,
    param,
    termInfo,
    roleMsg, //????????????????????????????????????????????????
    location,
    type,
    roleData, //???????????????????????????????????????
    schoolMsg, //???????????????????????????????????????
    levelHash,
    basePlatFormMsg: { ProVersion },
    contentHW: { height },
  } = props;
  let { TermInfo, HasHistory } = termInfo;
  // ?????????????????????
  const [topType, setTopType] = useState("default");
  // ????????????????????????????????????
  const [Path, setPath] = useState([]);
  // ??????version??????
  const [bottomHeight, setBottomHeight] = useState(66);
  // ????????????
  const [TermSelect, setTermSelect] = useState("");
  // ????????????
  const [TypeSelect, setTypeSelect] = useState("");

  // ??????????????????,??????54
  const [topHeight, setTopHeight] = useState(54);
  // ??????????????????
  const [anchorList, setAnchorList] = useState([]);
  // ??????schoolDetail??????????????????module
  const [ModuleID, setModuleID] = useState();

  const { schoolID, collegeID, selectLevel, productLevel } = useMemo(() => {
    let role = roleMsg;
    // module?????????roleData??????????????????roleMsg
    if (type === "school") {
      role = roleData;
      setTopType("school");
    }
    return role;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  // console.log({ schoolID, collegeID, selectLevel, productLevel });
  //??????,???????????????????????????????????????
  const initGet = useRef(false);
  const [ReloadTeacherBaseMsg, setReloadTeacherBaseMsg] = useState(false);
  const [ReloadWorkMsg, setReloadWorkMsg] = useState(false);
  const [ReloadTeachingAbility, setReloadTeachingAbility] = useState(false);
  const [
    ReloadInformationizeAbility,
    setReloadInformationizeAbility,
  ] = useState(false);
  useLayoutEffect(() => {
    let { pathname } = location;
    //????????????????????????
    if (!initGet.current) {
      initGet.current = true;
    } else {
      if (pathname === "/teacherBaseMsg") {
        // tableRef.current.reloadList();
        setReloadTeacherBaseMsg((pre) => !pre);
      } else if (pathname === "/workMsg") {
        // tableRef.current.reloadList();
        setReloadWorkMsg((pre) => !pre);
      } else if (pathname === "/teachingAbility") {
        // tableRef.current.reloadList();
        setReloadTeachingAbility((pre) => !pre);
      } else if (pathname === "/informationizeAbility") {
        // tableRef.current.reloadList();
        setReloadInformationizeAbility((pre) => !pre);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  // ??????ref
  const topRef = useRef({});
  // contentref
  const anchorRef = useRef(null);
  const scrollRef = useRef(null);
  useEffect(() => {
    tabid && setModuleID(tabid);
  }, [tabid]);
  useEffect(() => {
    // ???????????????????????????
    let Path = handleRoute(location.pathname);
    setPath(Path);
    if (Path[0] === "schoolResource" && Path[1]) {
      //????????????
      // ??????????????????????????????
      setTopType("school");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    TermInfo instanceof Array&&TermInfo.length>0? <div className="Analysis">
      <AnalysisTop
        // type={Path[0] === "schoolDetail" ? "module" : "tab"}
        getHeight={(height) => {
          console.log(height);
          setTopHeight(height);
        }}
        className={"AnalysisTop"}
        onTermChange={(e) => {
          setTermSelect(e);
        }}
        onTypeChange={(e) => {
          setTypeSelect(e);
          setModuleID(e.value);
        }}
        termlist={TermInfo.map((child) => ({
          value: child.Term,
          title: child.TermName,
        }))}
        ref={topRef}
        type={topType}
        schoolMsg={schoolMsg}
      ></AnalysisTop>

      <div
        className="analysis-content"
        style={{ height: height - topHeight + "px" }}
      >
        <Scrollbars
          className="analysis-scroll"
          ref={scrollRef}
          onUpdate={(value) => {
            anchorRef.current && anchorRef.current.onScroll();
          }}
        >
          <div
            className="content-box"
            style={{ minHeight: height - topHeight - bottomHeight + "px" }}
          >
            {ModuleID === "teacherBaseMsg" ? (
              <BaseMsg
                onAnchorComplete={(anchor) => {
                  // console.log(anchor);
                  setAnchorList(anchor);
                }}
                reload={ReloadTeacherBaseMsg}
                schoolID={schoolID}
                collegeID={collegeID}
                productLevel={productLevel}
                selectLevel={selectLevel}
                productMsg={levelHash[productLevel]}
                term={topRef.current.TermSelect}
                HasHistory={HasHistory}
              ></BaseMsg>
            ) : (
              ""
            )}
            {ModuleID === "workMsg" ? (
              <WorkLoad
                onAnchorComplete={(anchor) => {
                  // console.log(anchor);
                  setAnchorList(anchor);
                }}
                reload={ReloadWorkMsg}
                schoolID={schoolID}
                collegeID={collegeID}
                productLevel={productLevel}
                selectLevel={selectLevel}
                productMsg={levelHash[productLevel]}
                term={topRef.current.TermSelect}
                HasHistory={HasHistory}
              ></WorkLoad>
            ) : (
              ""
            )}
            {ModuleID === "teachingAbility" ? (
              <TeachingAbility
                onAnchorComplete={(anchor) => {
                  // console.log(anchor);
                  setAnchorList(anchor);
                }}
                schoolID={schoolID}
                reload={ReloadTeachingAbility}
                collegeID={collegeID}
                productLevel={productLevel}
                selectLevel={selectLevel}
                productMsg={levelHash[productLevel]}
                term={topRef.current.TermSelect}
                HasHistory={HasHistory}
              ></TeachingAbility>
            ) : (
              ""
            )}
            {ModuleID === "informationizeAbility" ? (
              <InformationizeAbility
                onAnchorComplete={(anchor) => {
                  // console.log(anchor);
                  setAnchorList(anchor);
                }}
                schoolID={schoolID}
                reload={ReloadInformationizeAbility}
                collegeID={collegeID}
                productLevel={productLevel}
                selectLevel={selectLevel}
                productMsg={levelHash[productLevel]}
                term={topRef.current.TermSelect}
                HasHistory={HasHistory}
              ></InformationizeAbility>
            ) : (
              ""
            )}
          </div>
          <p className="ProVersion">{ProVersion}</p>
        </Scrollbars>
      </div>
      <Anchor
        ref={anchorRef}
        bottomheight={bottomHeight}
        list={anchorList}
        scrollref={scrollRef}
      ></Anchor>
    </div>:<Empty style={{marginTop:'200px'}} type={'4'} title={'??????????????????'+(productLevel===2?'???':'???')+'????????????'}></Empty>
  );
}

function UseScrollbars(props) {
  let { use, children, ...reset } = props;
  const [Use, setUse] = useState(true);
  useEffect(() => {
    setUse(use === undefined || !!use);
  }, [use]);
  return Use ? <Scrollbars {...reset}>{children}</Scrollbars> : <>{children}</>;
}
const mapStateToProps = (state, props) => {
  let {
    commonData: { roleMsg, basePlatFormMsg, contentHW, termInfo, levelHash },
  } = state;
  return {
    roleMsg,
    basePlatFormMsg,
    contentHW,
    termInfo: props.termInfo || termInfo,
    levelHash,
  };
};
export default connect(mapStateToProps)(withRouter(memo(forwardRef(Analysis))));
