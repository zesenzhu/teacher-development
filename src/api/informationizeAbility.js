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
 * @LastEditTime: 2020-12-21 11:22:13
 * @Description:
 * @FilePath: \teacher-development\src\api\baseMsg.js
 */
import fetch from "../util/fetch";
import ipConfig from "../util/ipConfig";
let { BasicProxy } = ipConfig;
/**
 * @description:上机信息统计  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2096
 * @param {*}
 * @return {*}
 */
export function getTeachER(payload = {}) {
  let { schoolID, collegeID, selectLevel, term } = payload;
  let url =
    BasicProxy +
    `/Statistics/NetInfo/RP?SchoolID=${
      schoolID ? schoolID : ""
    }&CollegeID=${collegeID ? collegeID : ""}&SelectLevel=${
      selectLevel ? selectLevel : ""
    }&Term=${term ? term : ""}`;
  // "?" +
  // (pageIndex ? "pageIndex=" + pageIndex : "") +
  // (keyword ? "&keyword=" + keyword : "") +
  // (pageSize ? "&pageSize=" + pageSize : "");
  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200) {
        // "DayAvgTimeSpan":"3小时",            //每人每日平均上机时长
        // "DayAvgLoginCount":2,                //每人每日平均上机次数
        // "AvgLoginTimeSpan":"1.5小时",                //平均每次时间
        // "TotalTeacher":1920,                //教师总数量
        // "DayAvgOnlineUser":60,                //平均每日上机人数
        // "DayAvgOfflineUser":60,                //平均每日未上线人数
        // ""DayAvgOnlinePercent":"0.96",        //平均每日上机百分比
        // "SubSet":[{
        //     "NodeID":"XXXXXXXXXXX",            
        //     "NodeName":"语文",            //节点名称（学科、学院等）
        //     "TotalTeacher":50,            //该节点下的教师数量
        //     "DayAvgTimeSpan":"3",            //每人每日平均上机时长
        //     "DayAvgLoginCount":2,                //每人每日平均上机次数
        //     "AvgLoginTimeSpan":"1.5",                //平均每次时间
        //     "DayAvgOnlinePercent":0.96,        //平均每日上机百分比
        // }]
        // }]
        return json.Data ? json.Data : {};
      } else {
        return false;
      }
    });
}

/**
 * @description:在线教学\办公统计  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2097
 * @param {*}
 * @return {*}
 */
export function getTeachTP(payload = {}) {
  let { schoolID, collegeID, selectLevel, term } = payload;
  let url =
    BasicProxy +
    `/Statistics/NetInfo/GetAccessInfo?SchoolID=${schoolID ? schoolID : ""}&CollegeID=${
      collegeID ? collegeID : ""
    }&SelectLevel=${selectLevel ? selectLevel : ""}&Term=${term ? term : ""}`;
  // "?" +
  // (pageIndex ? "pageIndex=" + pageIndex : "") +
  // (keyword ? "&keyword=" + keyword : "") +
  // (pageSize ? "&pageSize=" + pageSize : "");
  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200) {
        // "DayAvgWorkTimeSpan":"66",            //办公时长（单位分钟）
        // "DayAvgWorkCount":"2",                //办公次数
        // "DayAvgTeachTimeSpan":"99",            //教学时长（单位分钟）
        // "DayAvgTeachCount":"2",                //教学次数
        // "SubSet":[{
        //     "NodeID":"XXXXXXXXXXX",            
        //     "NodeName":"语文",            //节点名称（学科、学院等）
        //     "DayAvgWorkTimeSpan":"3",            //办公时长（单位分钟）
        //     "DayAvgTeachTimeSpan":"2",                //教学时长（单位分钟）
        // }]
        return json.Data ? json.Data : {};
      } else {
        return false;
      }
    });
}
 