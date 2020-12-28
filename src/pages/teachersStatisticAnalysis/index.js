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
  useRef,
  forwardRef,
} from "react";
import {
  withRouter,
  // , Route, Switch, NavLink
} from "react-router-dom";
import "./index.scss";
import BaseMsg from "./baseMsg";
import WorkLoad from "./workLoad";
import TeachingAbility from "./teachingAbility";
import InformationizeAbility from './informationizeAbility';
import AnalysisTop from "./analysisTop";
import { handleRoute } from "../../util/public";
import { Scrollbars } from "react-custom-scrollbars";
import Anchor from "../../component/anchor";
function Analysis(props, ref) {
  let {
    tabid,
    tabname,
    children,
    param,
    termInfo: {  TermInfo, HasHistory },
    roleMsg: { schoolID, collegeID, selectLevel, productLevel },
    location,
    levelHash,
    basePlatFormMsg: { ProVersion },
    contentHW: { height },
  } = props;
  // 设置头部的类型
  const [topType, setTopType] = useState("default");
  // 设置路由路径，初始就设置
  const [Path, setPath] = useState([]);
  // 底部version高度
  const [bottomHeight, setBottomHeight] = useState(66);
  // 学期选择
  const [TermSelect, setTermSelect] = useState("");
  // 获取头部高度,默认54
  const [topHeight, setTopHeight] = useState(54);
  // 获取锚点结构
  const [anchorList, setAnchorList] = useState([]);
  // 头部ref
  const topRef = useRef({});
  // contentref
  const anchorRef = useRef(null);
  const scrollRef = useRef(null);
  useEffect(() => {
    // 挂载的时候观察路由
    let Path = handleRoute(location.pathname);
    setPath(Path);
    if (Path[0] === "schoolResource" && Path[1]) {
      //学校详情
      // 需要获取学校详情请求
      setTopType("school");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="Analysis">
      {Path[0] !== "schoolResource" || Path[1] ? (
        <AnalysisTop
          getHeight={(height) => {
            console.log(height);
            setTopHeight(height);
          }}
          className={"AnalysisTop"}
          onTermChange={(e) => {
            setTermSelect(e);
          }}
          termlist={TermInfo.map((child) => ({
            value: child.Term,
            title: child.TermName,
          }))}
          ref={topRef}
          type={topType}
        ></AnalysisTop>
      ) : (
        ""
      )}

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
            {tabid === "teacherBaseMsg" ? (
              <BaseMsg
                onAnchorComplete={(anchor) => {
                  // console.log(anchor);
                  setAnchorList(anchor);
                }}
                schoolID={schoolID}
                collegeID={collegeID}
                productLevel={productLevel}
                selectLevel={selectLevel}
                productMsg={levelHash[productLevel]}
                term={topRef.current.TermSelect}
              ></BaseMsg>
            ) : (
              ""
            )}
            {tabid === "workMsg" ? (
              <WorkLoad
                onAnchorComplete={(anchor) => {
                  // console.log(anchor);
                  setAnchorList(anchor);
                }}
                schoolID={schoolID}
                collegeID={collegeID}
                productLevel={productLevel}
                selectLevel={selectLevel}
                productMsg={levelHash[productLevel]}
                term={topRef.current.TermSelect}
              ></WorkLoad>
            ) : (
              ""
            )}
            {tabid === "teachingAbility" ? (
              <TeachingAbility
                onAnchorComplete={(anchor) => {
                  // console.log(anchor);
                  setAnchorList(anchor);
                }}
                schoolID={schoolID}
                collegeID={collegeID}
                productLevel={productLevel}
                selectLevel={selectLevel}
                productMsg={levelHash[productLevel]}
                term={topRef.current.TermSelect}
              ></TeachingAbility>
            ) : (
              ""
            )}
            {tabid === "informationizeAbility" ? (
              <InformationizeAbility
                onAnchorComplete={(anchor) => {
                  // console.log(anchor);
                  setAnchorList(anchor);
                }}
                schoolID={schoolID}
                collegeID={collegeID}
                productLevel={productLevel}
                selectLevel={selectLevel}
                productMsg={levelHash[productLevel]}
                term={topRef.current.TermSelect}
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
    </div>
  );
}

const mapStateToProps = (state) => {
  let {
    commonData: { roleMsg, basePlatFormMsg, contentHW, termInfo, levelHash },
  } = state;
  return { roleMsg, basePlatFormMsg, contentHW, termInfo, levelHash };
};
export default connect(mapStateToProps)(withRouter(memo(forwardRef(Analysis))));
