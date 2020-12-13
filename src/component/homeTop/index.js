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
 * @Date: 2020-12-08 11:27:30
 * @LastEditTime: 2020-12-10 19:57:01
 * @Description: 招聘计划管理和培训计划管理头部
 * @FilePath: \teacher-development\src\component\homeTop\index.js
 */

import React, {
  //   useCallback,
  memo,
  useEffect,
  useState,
  // useImperativeHandle,
  // useMemo,
  // useReducer,
  // createContext,
  // useContext,
  //   useRef,
  forwardRef,
} from "react";
import "./index.scss";
import { Search, Empty } from "../common";

function HomeTop(props, ref) {
  let { className, publish, children, draft, search, ...reset } = props;
  const [SearchValue, setSearchValue] = useState("");
  useEffect(() => {
    search.value !== undefined && setSearchValue(search.value);
  }, [search]);
  return (
    <div className={`home-top ${className ? className : ""}`} {...reset}>
      {publish ? (
        <span
          className="lg-btn  btn-publish"
          onClick={(e) => {
            typeof publish.onClick === "function" && publish.onClick();
          }}
        >
          {publish.title ? publish.title : "发布计划"}
        </span>
      ) : (
        ""
      )}
      {draft ? (
        <span
          className="lg-btn  btn-draft"
          onClick={(e) => {
            typeof draft.onClick === "function" && publish.onClick();
          }}
        >
          {draft.title ? draft.title : "草稿箱"}
          {draft.count || draft.count === 0 ? <>[{draft.count}]</> : ""}
        </span>
      ) : (
        ""
      )}
      {search ? (
        <Search
          className="home-search"
          Value={SearchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onClickSearch={(e) => {
            typeof search.onSearch === "function" &&
              search.onSearch(SearchValue);
          }}
          onCancelSearch={(e) => {
            setSearchValue("");
            typeof search.onSearch === "function" &&
              search.onSearch('');
          }}
        ></Search>
      ) : (
        ""
      )}
    </div>
  );
}
export default memo(forwardRef(HomeTop));
