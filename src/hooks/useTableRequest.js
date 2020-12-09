/*
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *                               神兽保佑            永无BUG
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-12-08 18:30:14
 * @LastEditTime: 2020-12-08 21:40:06
 * @Description: table请求的hooks
 * @FilePath: \teacher-development\src\hooks\useTableRequest.js
 */

import { useEffect, useState, useRef, useMemo } from "react";
export default function useTableRequest(query = {}, api) {
  /* 是否是第一次请求 */
  const fisrtRequest = useRef(false);
  /* 保存分页信息 */
  const [pageOptions, setPageOptions] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  /* 保存表格数据 */
  const [tableData, setTableData] = useState({
    list: [],
    total: 10,
    pageSize: 10,
    pageIndex: 1,
  });
  /* 请求数据 ,数据处理逻辑根后端协调着来 */
  const getList = useMemo(() => {
    return async (payload) => {
      if (!api) return;
      //  请求
      const data = await api(payload || { ...query, ...pageOptions });
      const res = await data.json();

      if (res.StatusCode === 200) {
        setTableData(data.data);
        fisrtRequest.current = true;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* 改变分页，重新请求数据 */
  useEffect(() => {
    fisrtRequest.current &&
      getList({
        ...query,
        ...pageOptions,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageOptions]);
  /* 改变查询条件。重新请求数据 */
  useEffect(() => {
    getList({
      ...query,
      ...pageOptions,
      pageIndex: 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  /* 处理分页逻辑 */
  const handerChange = useMemo(
    () => (options) => {
        console.log(options,pageOptions)
      return setPageOptions({ ...query, ...pageOptions, ...options });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  console.log(pageOptions);
  return [tableData, handerChange, getList];
}
