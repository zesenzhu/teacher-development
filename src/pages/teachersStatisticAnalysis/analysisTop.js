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
 * @LastEditTime: 2020-12-17 15:00:46
 * @Description:
 * @FilePath: \teacher-development\src\pages\teachersStatisticAnalysis\analysisTop.js
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
  useMemo,
  useState,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  forwardRef,
} from "react";
import $ from "jquery";
// import { Select } from "antd";
import { Dropdown } from "../../component/common";
function AnalysisTop(props, ref) {
  let {
    type,
    termselect,
    termlist,
    onTermChange,
    className,
    schoolMsg,
    getHeight,
    onTypeChange,
  } = props;

  // ????????????
  const [TermList, setTermList] = useState(
    termlist
    // [
    // { value: "00", title: "2019~2020?????????1??????" },
    // { value: "0", title: "2019~2020?????????2??????" },
    // { value: "1", title: "2020~2021?????????1??????" },
    // { value: "2", title: "2020~2021?????????2??????" },
    // { value: "3", title: "2020~2021?????????2??????" },
    // { value: "4", title: "2020~2021?????????2??????2021?????????2??????" },
    // { value: "5", title: "2020~2021?????????2021?????????2??????2??????" },
    // { value: "6", title: "2020~2021???2021?????????2????????????2??????" },
    // { value: "7", title: "2020~2021?????????2??????2021?????????2??????" },
    // ]
  );
  // ????????????
  const [TypeList, setTypeList] = useState([
    { value: "teacherBaseMsg", title: "??????????????????" },
    { value: "workMsg", title: "???????????????" },
    { value: "teachingAbility", title: "??????????????????" },
    { value: "informationizeAbility", title: "?????????????????????" },
  ]);
  // ????????????
  const [TermSelect, setTermSelect] = useState(TermList[0] ? TermList[0] : {});
  const [TypeSelect, setTypeSelect] = useState(TypeList[0] ? TypeList[0] : {});

  // ?????????????????????????????????
  const boxRef = useRef({});
  // ???????????????
  useEffect(() => {
    // termselect???????????????????????????????????????
    termselect !== undefined && setTermSelect(termselect);
  }, [termselect]);
  // ????????????????????????
  useEffect(() => {
    if (termlist === undefined) return;
    setTermList(termlist);
    termselect === undefined &&
      TermSelect === undefined &&
      setTermSelect(termlist[0] ? termlist[0] : {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termlist]);
  const topType = useMemo(() => {
    // ???????????????*default:?????????*school:??????????????????
    return type ? type : "default";
  }, [type]);
  // ????????????
  const { isSchool, NodeName, LogoUrl } = useMemo(() => {
    let data = { isSchool: false };
    if (schoolMsg && topType === "school") {
      data = { isSchool: true, ...schoolMsg };
    }
    return data;
  }, [schoolMsg, topType]);
  // ???????????????????????????
  useEffect(() => {
    typeof onTermChange === "function" && onTermChange(TermSelect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TermSelect]);
  // ???????????????????????????
  useEffect(() => {
    typeof onTypeChange === "function" && onTypeChange(TypeSelect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TypeSelect]);
  useImperativeHandle(
    ref,
    () => ({
      TermSelect,
      boxRef,
      TypeSelect,
    }),
    [TermSelect, TypeSelect]
  );
  // console.log($(boxRef.current).height())
  useLayoutEffect(() => {
    typeof getHeight === "function" && getHeight($(boxRef.current).height());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSchool]);
  return (
    <div ref={boxRef} className={`Analysis-Top ${className ? className : ""}`}>
      {isSchool ? (
        <div className="top-msg">
          <p className="s-msg">
            <i style={{ backgroundImage: LogoUrl ?LogoUrl: "#fff" }}></i>
            {NodeName ? NodeName : "??????"}
          </p>
        </div>
      ) : (
        ""
      )}
      <div className="top-default">
        <Dropdown
          width={200}
          height={240}
          dropList={TermList}
          title={"???????????????"}
          value={TermSelect.value}
          className={`term-dropdown ${isSchool ? "dropdown-school" : ""}`}
          onChange={(e) => {}}
          onSelect={(e, option) => {
            // console.log(option);
            setTermSelect(option);
          }}
        ></Dropdown>
        {isSchool && (
          <Dropdown
            width={200}
            height={240}
            dropList={TypeList}
            title={"???????????????"}
            value={TypeSelect.value}
            className={`term-dropdown dropdown-school`}
            onChange={(e) => {}}
            onSelect={(e, option) => {
              // console.log(option);
              setTypeSelect(option);
            }}
          ></Dropdown>
        )}
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   let {
//     commonData: { roleMsg },
//   } = state;
//   return { roleMsg };
// };
// connect(mapStateToProps)
export default memo(forwardRef(AnalysisTop));
