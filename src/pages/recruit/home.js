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
 * @LastEditTime: 2020-12-09 16:59:56
 * @Description:
 * @FilePath: \teacher-development\src\pages\recruit\home.js
 */

import { connect } from "react-redux";
import React, {
  useCallback,
  memo,
  //   useEffect,
  // useState,
  // useImperativeHandle,
  useRef,
  useContext,
  forwardRef,
} from "react";
import "./index.scss";
import { withRouter } from "react-router-dom";
// import { handleActions } from "../../redux/actions";
import HomeTop from "../../component/homeTop";
import Table from "../../component/table";
import { Context } from "./reducer";
import { getCruitList } from "../../api/recruit";
//   import { NavLink } from "react-router-dom";
function Home(props, ref) {
  let {
    teacherRecruitMsg: { tabId },
    history,
    dispatch,
  } = props;
  let {
    state: { keyword },
    setDispatch,
  } = useContext(Context);

  // 获取table组件的ref
  const tableRef = useRef(null);
  // table 的宽度最小为1040，各个列的width按这个来算1040/1200*设计图的width
  let widthRate = 1040 / 1200;
  let columns = [
    {
      title: "序号",
      dataIndex: "index",
      align: "center",
      width: 102 * widthRate,
      textWrap: "word-break",
      render: (data) => {
        return (
          <span className="table-index" title={data}>
            {data}
          </span>
        );
      },
    },
    {
      title: "标题",
      width: 494 * widthRate,
      dataIndex: "title",
      render: (data) => {
        return (
          <span className="table-title" title={data}>
            {data}
          </span>
        );
      },
    },
    {
      title: "来源",
      align: "center",
      width: 128 * widthRate,
      dataIndex: "source",
      render: (data) => {
        return (
          <span className="table-source" title={data}>
            {data}
          </span>
        );
      },
    },
    {
      title: "发布人",
      align: "center",
      width: 90 * widthRate,
      dataIndex: "publisher",
      render: (data) => {
        return (
          <span className="table-publisher" title={data}>
            {data}
          </span>
        );
      },
    },
    {
      title: "时间",
      align: "center",
      width: 172 * widthRate,
      dataIndex: "time",
      render: (data) => {
        return (
          <span className="table-time" title={data}>
            {data}
          </span>
        );
      },
    },
    {
      title: "操作",
      align: "center",
      width: 200 * widthRate,

      // dataIndex: "time",
      render: (data) => {
        return (
          <span className="table-handle">
            <span className="table-btn btn-edit">编辑</span>
            <span className="table-btn btn-delete">删除</span>
          </span>
        );
      },
    },
  ];
  // let data = [
  //   {
  //     key: 0,
  //     index: "011111111111111",
  //     title:
  //       "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
  //     source: "辖区教育局辖区教育局辖区教育局",
  //     publisher: "祝泽森祝泽森祝泽森",
  //     time: "2020-08-29 13:59 020-08-29 13:59",
  //   },
  //   {
  //     key: 1,
  //     index: "02",
  //     title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
  //     source: "辖区教育局",
  //     publisher: "祝泽森",
  //     time: "2020-08-29 13:59",
  //   },
  //   {
  //     key: 2,
  //     index: "03",
  //     title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
  //     source: "辖区教育局",
  //     publisher: "祝泽森",
  //     time: "2020-08-29 13:59",
  //   },
  //   {
  //     key: 3,
  //     index: "02",
  //     title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
  //     source: "辖区教育局",
  //     publisher: "祝泽森",
  //     time: "2020-08-29 13:59",
  //   },
  //   {
  //     key: 4,
  //     index: "03",
  //     title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
  //     source: "辖区教育局",
  //     publisher: "祝泽森",
  //     time: "2020-08-29 13:59",
  //   },
  //   {
  //     key: 5,
  //     index: "02",
  //     title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
  //     source: "辖区教育局",
  //     publisher: "祝泽森",
  //     time: "2020-08-29 13:59",
  //   },
  //   {
  //     key: 6,
  //     index: "03",
  //     title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
  //     source: "辖区教育局",
  //     publisher: "祝泽森",
  //     time: "2020-08-29 13:59",
  //   },
  //   {
  //     key: 7,
  //     index: "02",
  //     title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
  //     source: "辖区教育局",
  //     publisher: "祝泽森",
  //     time: "2020-08-29 13:59",
  //   },
  //   {
  //     key: 8,
  //     index: "03",
  //     title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
  //     source: "辖区教育局",
  //     publisher: "祝泽森",
  //     time: "2020-08-29 13:59",
  //   },
  // ];

  const getList = useCallback(
    (args) => {
      tableRef.current.getList(args);
    },
    [tableRef]
  );
  return (
    <div className="Reacruit-context Recruit-home">
      <HomeTop
        publish={{
          title: "发布招聘计划",
          onClick: () => {
            history.push("/publishRecruit");
          },
        }}
        draft={{ title: "草稿箱", count: 5 }}
        search={{
          onSearch: (value) => {
            // console.log(value)
            setDispatch({ type: "SET_KEY_WORD", data: value });
          },
        }}
      ></HomeTop>
      <Table
        className="Reacruit-table"
        columns={columns}
        // dataSource={data}
        query={{ keyword }}
        ref={tableRef}
        api={getCruitList}
      ></Table>
      {/* <div style={{height:'20px',width:'100px',background:'#a6a6a6'}} onClick={()=>{
      history.push(`/${tabId}/publish`  );
      dispatch(handleActions.setTeacherRecruitMsg({tabName:'发布招聘计划'}))
  }}></div> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  let {
    handleData: { teacherRecruitMsg },
    commonData: { roleMsg },
  } = state;
  return { teacherRecruitMsg, roleMsg };
};
export default connect(mapStateToProps)(withRouter(memo(forwardRef(Home))));
