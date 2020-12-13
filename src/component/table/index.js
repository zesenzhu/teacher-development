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
 * @Date: 2020-12-08 13:54:00
 * @LastEditTime: 2020-12-10 20:01:07
 * @Description: 封装下table
 * @FilePath: \teacher-development\src\component\table\index.js
 */

import React, {
  //   useCallback,
  memo,
  useEffect,
  useState,
  useImperativeHandle,
  // useMemo,
  // useReducer,
  // createContext,
  // useContext,
  //   useRef,
  forwardRef,
} from "react";
import "./index.scss";
import { Table, Empty, Loading, PagiNation } from "../common";
import useTableRequest from "../../hooks/useTableRequest";
function $Table(props, ref) {
  let {
    className,
    loading: outLoading,
    tip,
    opacity,
    query,
    // : Query
    api,
    prepare,
    ...reset
  } = props;
  // let { dataSource } = reset;
  /* 控制表格查询条件 */
  // const [query, setQuery] = useState(typeof Query === "object" ? Query : {});
  // tableData：列表数据，handerChange:更改查询的条件，getList：获取数据
  const [tableData, handerChange, getList, loading,reloadList] = useTableRequest(
    query,
    api,
    prepare
  );
  const { PageIndex, PageSize, Total, List, IsError } = tableData;
  // useEffect(() => {
  //   console.log(query)
  // }, [query]);
  useImperativeHandle(ref, () => ({
    getList,reloadList,
    data: tableData,
  }),[getList,tableData,reloadList]);
  return (
    <Loading
      spinning={
        outLoading !== undefined
          ? outLoading instanceof Boolean
            ? outLoading
            : false
          : loading
      }
      tip={tip ? tip : "加载中..."}
      opacity={opacity ? opacity : false}
    >
      <div className={`lg-table-box ${className ? className : ""}`}>
        {!IsError && List instanceof Array && List.length > 0 ? (
          <>
            <Table
              dataSource={List}
              pagination={false}
              className={`lg-table`}
              {...reset}
            ></Table>
            <PagiNation
              showQuickJumper
              showSizeChanger
              // onShowSizeChange={(Current, PageSize) => {
              //   console.log(PageSize);
              //   handerChange({ PageSize });
              // }}
              PageSize={PageSize}
              current={PageIndex}
              hideOnSinglePage={Total === 0 ? true : false}
              total={Total}
              onChange={(pageIndex, pageSize) => {

                handerChange({ pageIndex, pageSize });
              }}
            ></PagiNation>
          </>
        ) : (
          <Empty
            className={"lg-table-empty"}
            type={"4"}
            title={"暂无数据"}
          ></Empty>
        )}
      </div>
    </Loading>
  );
}
export default memo(forwardRef($Table));
