/*
 *
 *    ┏┓　　　┏┓
 *  ┏┛┻━━━┛┻┓
 *  ┃　　　　　　　┃
 *  ┃　　　━　　　┃
 *  ┃　＞　　　＜　┃
 *  ┃　　　　　　　┃
 *  ┃...　⌒　...　┃
 *  ┃　　　　　　　┃
 *  ┗━┓　　　┏━┛
 *      ┃　　　┃
 *      ┃　　　┃
 *      ┃　　　┃
 *      ┃　　　┃  神兽保佑
 *      ┃　　　┃  代码无bug
 *      ┃　　　┃
 *      ┃　　　┗━━━┓
 *      ┃　　　　　　　┣┓
 *      ┃　　　　　　　┏┛
 *      ┗┓┓┏━┳┓┏┛
 *        ┃┫┫　┃┫┫
 *        ┗┻┛　┗┻┛
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-12-09 11:46:56
 * @LastEditTime: 2020-12-22 21:37:44
 * @Description:
 * @FilePath: \teacher-development\src\api\personal.js
 */
import fetch from "../util/fetch";
import ipConfig from "../util/ipConfig";
import { deepMap } from "../util/public";
let { BasicProxy } = ipConfig;
/**
 * @description:获取画像列表 http://192.168.129.1:8033/showdoc/web/#/21?page_id=2081
 * @param {*}
 * @return {*}
 */
export function getTeacherList(payload = {}) {
  let {
    pageIndex,
    pageSize,
    keyword,
    schoolID,
    collegeID,
    nodeType,
    nodeID,sortFiled,sortType
  } = payload;
  let url =
    BasicProxy +
    `/Teacher/List?SchoolID=${schoolID ? schoolID : ""}&NodeID=${
      nodeID ? nodeID : ""
    }&PageIndex=${pageIndex ? pageIndex : 1}&PageSize=${
      pageSize ? pageSize : 10
    }&Keyword=${keyword ? keyword : ""}&CollegeID=${
      collegeID ? collegeID : ""
    }&NodeType=${nodeType ? nodeType : ""}${
      sortFiled ? '&SortFiled='+sortFiled : ""
    }${sortType ? '&SortType='+sortType : ""}`;

  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200) {
        return {
          StatusCode: json.StatusCode,
          data: {
            //     "Total":50,
            // "PageIndex":1,
            // "List":[{
            //     "UserID":"T001",        //ID，唯一标识
            //     "UserName":"白老师",    //标题
            //     "SchoolID":"S-11",
            //     "SchoolName":"白云中学",
            //     "Gender":"女",
            //     "TitleName":"一级教师",            //职称
            //     "Politics":"中共党员",    //政治面貌
            //     "TeachAge":2年,                  //教龄
            //     "HonorNames":"学科带头人,特级教师"
            // }]
            ...json.Data,
            List:
              json.Data.List instanceof Array
                ? json.Data.List.map((child, index) => {
                    let Index = (json.Data.PageIndex - 1) * 10 + index + 1;
                    Index = Index >= 10 ? Index : "0" + Index;
                    return {
                      ...child,
                      key: index,
                      index: Index,
                    };
                  })
                : [],
            PageSize: pageSize,
          },
        };
      } else {
        return {
          StatusCode: json.StatusCode,
        };
      }
    });
}
/**
 * @description: http://192.168.129.1:8033/showdoc/web/#/21?page_id=2081
 * @param {*}
 * @return {*}
 */
export function getNode(payload = {}) {
  let { schoolID, collegeID } = payload;
  let url =
    BasicProxy +
    `/Teacher/GetNode?SchoolID=${schoolID ? schoolID : ""}&CollegeID=${
      collegeID ? collegeID : ""
    }`;
  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200) {
        let data = [[], {}];
        json.Data instanceof Array &&
          deepMap(
            json.Data,
            ({ child: { NodeID, NodeName, NodeType }, level }) => {
              if (level === 1) {
                data[0].push({
                  value: NodeID,
                  title: NodeName,
                  nodeType: NodeType,
                });
              } else if (level === 2) {
                if (data[0][NodeID] instanceof Array) {
                  data[0][NodeID].push({
                    value: NodeID,
                    title: NodeName,
                    nodeType: NodeType,
                  });
                } else {
                  data[0][NodeID] = [
                    { value: NodeID, title: NodeName, nodeType: NodeType },
                  ];
                }
              }
            },
            "SubSet"
          );
        return {
          StatusCode: json.StatusCode,
          data: data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
        };
      }
    });
}
