/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑       永不宕机     永无BUG
 *
 *        佛曰:
 *                写字楼里写字间，写字间里程序员；
 *                程序人员写程序，又拿程序换酒钱。
 *                酒醒只在网上坐，酒醉还来网下眠；
 *                酒醉酒醒日复日，网上网下年复年。
 *                但愿老死电脑间，不愿鞠躬老板前；
 *                奔驰宝马贵者趣，公交自行程序员。
 *                别人笑我忒疯癫，我笑自己命太贱；
 *                不见满街漂亮妹，哪个归得程序员？
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-12-07 16:08:21
 * @LastEditTime: 2020-12-15 09:17:09
 * @Description:
 * @FilePath: \teacher-development\src\pages\train\detail.js
 */

import { connect } from "react-redux";
import React, {
  useCallback,
  memo,
  useEffect,
  useState,
  // useImperativeHandle,
  useRef,
  useContext,
  forwardRef,
} from "react";
import "./index.scss";
import { Carousel } from "antd";
import { withRouter } from "react-router-dom";
import { handleActions } from "../../redux/actions";
import Editor from "../../component/editor";
import { Context } from "./reducer";
import { Loading } from "../../component/common";
import FileDetail from "../../component/fileDetail";
import { handleRoute } from "../../util/public";
import useDetailRequest from "../../hooks/useDetailRequest";
import { autoAlert } from "@/util/public";
import { applyTrain } from "@/api/train";
// import { getCruitList } from "../../api/train";
//   import { NavLink } from "react-router-dom";
function Datail(props, ref) {
  let {
    removeTab,
    activeTab,
    contentHW,
    location,
    id,
    frametype,
    history,
    controlSize,
    dispatch,
    useScrollbars,
  } = props;
  // let { state, setDispatch } = useContext(Context);
  // 转到预览
  const [loading, setLoading] = useState(false);
  // 培训id
  const [ID, setID] = useState("");
  const detailRef = useRef(null);

  //获取培训id
  useEffect(() => {
    if (location.pathname) {
      let Path = handleRoute(location.pathname);
      // 第一次进来赋值id
      Path[0] === "trainDetail" && Path[1] && ID === "" && setID(Path[1]);
      // 第二次之后进来判断是否是本页在reload
      if (Path[0] === "trainDetail" && ID === Path[1] && detailRef.current) {
        //刷新
        detailRef.current.reload();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  // 给tab设置动态title
  const getData = useCallback((data) => {
    if (data) {
      if (data.ID) {
        dispatch(
          handleActions.setTabMsg({
            ["trainDetail|" + data.ID]: {
              name: "查看: " + data.Title,
              title: "教师培训计划详情：" + data.Title,
            },
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (frametype === "teacher") {
      document.title = "教师发展培训";
    }
  }, [frametype]);
  const onApplyClick = useCallback((data, title, callback) => {
    applyTrain(data).then((res) => {
      if (res.result) {
        autoAlert({
          title: title + "成功",
          type: "success",
          autoHide: true,
          // cancelShow: true,
        });
        callback();
      } else {
        autoAlert({
          title: title + "失败",
          type: "error",
          autoHide: true,
          // cancelShow: true,
        });
      }
    });
  }, []);
  return (
    <Loading opacity={1} spinning={loading}>
      <div
        className=" Reacruit-context   Train-Datail"
        style={
          controlSize === undefined || controlSize
            ? { height: contentHW.height + "px" }
            : {}
        }
      >
        <FileDetail
          canControlApply={frametype === "teacher" ? onApplyClick : false}
          getData={getData}
          ref={detailRef}
          useScrollbars={useScrollbars}
          fileid={ID}
          type={"train"}
        ></FileDetail>
      </div>
    </Loading>
  );
}

const mapStateToProps = (state) => {
  let {
    handleData: { teacherTrainMsg },
    commonData: { roleMsg, contentHW },
  } = state;
  return { teacherTrainMsg, roleMsg, contentHW };
};
export default connect(mapStateToProps)(withRouter(memo(forwardRef(Datail))));
