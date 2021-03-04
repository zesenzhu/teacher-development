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
 * @description:获取教师人数概况  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2087
 * @param {*}
 * @return {*}
 */
export function getTeacherCount(payload = {}) {
  // *RStatus:状态：0草稿；1正式发布
  let { schoolID, collegeID, selectLevel, term } = payload;
  let url =
    BasicProxy +
    `/Statistics/Basic/TeacherCount?SchoolID=${
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
        // "Total":50,
        // "MaleCount":50,
        // "FemaleCount":50,
        // "TeaSthRatio":"1:17",
        // "SubSet":[{
        //     "NodeID":"XXXXXXXXXXX",
        //     "NodeName":"语文",
        //     "Total":50,
        //     "MaleCount":10,
        //     "FemaleCount":10,
        //     "MalePercent":"50%",
        //     "FemalePercent":"50%",
        // }]
        return json.Data ? json.Data : {};
      } else {
        return false;
      }
    });
}

/**
 * @description:获取教师人数概况  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2087
 * @param {*}
 * @return {*}
 */
export function getHonorTeacher(payload = {}) {
  // *RStatus:状态：0草稿；1正式发布
  let { schoolID, collegeID, selectLevel, term } = payload;
  let url =
    BasicProxy +
    `/Statistics/Basic/HonorTeacher?SchoolID=${
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
        // "Total":50,
        // "MaleCount":50,
        // "FemaleCount":50,
        // "TeaSthRatio":"1:17",
        // "SubSet":[{
        //     "NodeID":"XXXXXXXXXXX",
        //     "NodeName":"语文",
        //     "Total":50,
        //     "MaleCount":10,
        //     "FemaleCount":10,
        //     "MalePercent":"50%",
        //     "FemalePercent":"50%",
        // }]
        return json.Data ? json.Data : {};
      } else {
        return false;
      }
    });
}

/**
 * @description:获取教师人数概况  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2087
 * @param {*}
 * @return {*}
 */
export function getTeacherAge(payload = {}) {
  // *RStatus:状态：0草稿；1正式发布
  let { schoolID, collegeID, selectLevel, term } = payload;
  let url =
    BasicProxy +
    `/Statistics/Basic/Age?SchoolID=${schoolID ? schoolID : ""}&CollegeID=${
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
        // "Term":"2020-202102",
        // "SchoolID":"S-002",
        // "CollegeID":"S-002-02",
        // "AgeAvg":36,            //平均年龄,
        // "TeachAgeAvg":36,        //平均教龄
        // "AgeList":[{
        //     "NodeID":"XXXXXXXXXXX",
        //     "NodeName":"20-30岁",
        //     "Total":50,
        // }]
        return json.Data ? json.Data : {};
      } else {
        return false;
      }
    });
}

/**
 * @description:学历职称统计  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2091
 * @param {*}
 * @return {*}
 */
export function getTeacherEduAndTitle(payload = {}) {
  // *RStatus:状态：0草稿；1正式发布
  let { schoolID, collegeID, selectLevel, term } = payload;
  let url =
    BasicProxy +
    `/Statistics/Basic/EduAndTitle?SchoolID=${
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
        // "Term":"2020-202102",
        // "SchoolID":"S-002",
        // "CollegeID":"S-002-02",
        // "AgeAvg":36,            //平均年龄,
        // "TeachAgeAvg":36,        //平均教龄
        // "AgeList":[{
        //     "NodeID":"XXXXXXXXXXX",
        //     "NodeName":"20-30岁",
        //     "Total":50,
        // }]
        return json.Data ? json.Data : {};
      } else {
        return false;
      }
    });
}

/**
 * @description:获取历年人数变化  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2088
 * @param {*}
 * @return {*}
 */
export function getHistoryTeacherCount(payload = {}) {
  // *RStatus:状态：0草稿；1正式发布
  let { schoolID, collegeID, selectLevel } = payload;
  let url =
    BasicProxy +
    `/Statistics/Basic/History/TeacherCount?SchoolID=${
      schoolID ? schoolID : ""
    }&CollegeID=${collegeID ? collegeID : ""}&SelectLevel=${
      selectLevel ? selectLevel : ""
    }`;
  // "?" +
  // (pageIndex ? "pageIndex=" + pageIndex : "") +
  // (keyword ? "&keyword=" + keyword : "") +
  // (pageSize ? "&pageSize=" + pageSize : "");
  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200 && json.Data instanceof Array) {
        return construtorCountData(json.Data);
      } else {
        return false;
      }
    });
}

function construtorCountData(Data) {
  if (!(Data instanceof Array) || Data.length === 0) {
    return [];
  }
  let data = [];

  Data.forEach((c) => {
    let { NodeName, NodeID, History } = c;
    let children = [];
    History instanceof Array &&
      History.forEach((h, i) => {
        let {
          Year,
          Value,
          Total,
          MalePercent,
          MaleCount,
          FemalePercent,
          FemaleCount,
        } = h;
        children.push({
          nodeName: Year,
          nodeID: Year,
          source: [Total],
          dataList: [
            [Year, NodeName, Total],
            [MaleCount, MalePercent],
            [FemaleCount, FemalePercent],
          ],
        });
      });
    data.push({
      nodeName: NodeName,
      nodeID: NodeID,
      titleList: [
        ["", "学期", "教师", "人"],
        ["男性教师", "人,占比"],
        ["女性教师", "人,占比"],
      ],
      xName: "学期",
      yName: "人数",
      type: ["year"],
      children,
    });
  });
  return data;
}

/**
 * @description:学历职称统计  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2091
 * @param {*}
 * @return {*}
 */
export function getHistoryEduAndTitle(payload = {}) {
  // *RStatus:状态：0草稿；1正式发布
  let { schoolID, collegeID, selectLevel } = payload;
  let url =
    BasicProxy +
    `/Statistics/Basic/History/EduAndTitle?SchoolID=${
      schoolID ? schoolID : ""
    }&CollegeID=${collegeID ? collegeID : ""}&SelectLevel=${
      selectLevel ? selectLevel : ""
    }`;
  // "?" +
  // (pageIndex ? "pageIndex=" + pageIndex : "") +
  // (keyword ? "&keyword=" + keyword : "") +
  // (pageSize ? "&pageSize=" + pageSize : "");
  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200 && json.Data instanceof Array) {
        return construtorEduAndTitleData(json.Data);
      } else {
        return false;
      }
    });
}

function construtorEduAndTitleData(Data) {
  if (!(Data instanceof Array) || Data.length === 0) {
    return [];
  }
  let data = [];
  Data.forEach((c) => {
    let { NodeName, NodeID, History } = c;
    let children = [];
    let titleList = [["", "学期", "教师学历本科率 "]];

    History instanceof Array &&
      History.forEach((h, i) => {
        let {
          Year,
          MiddleTitleName,
          BenkePercent, //本科率,
          MiddleTitlePercent, //一级职称教师率
          EduList, //学历分布
          TitleList, //职称人数分布
          BenkeValue,MiddleTitleValue
        } = h;
        let dataList = [[Year, NodeName, BenkePercent, MiddleTitlePercent]];
        titleList[0].push(
          "," + (MiddleTitleName || "一级教师及以上占比") + " "
        );
        EduList.forEach((edu) => {
          let { NodeName, NodeID, Total } = edu;
          dataList.push([Total]);
          titleList.push([NodeName + "：", "人"]);
        });
        TitleList.forEach((edu) => {
          let { NodeName, NodeID, Total } = edu;
          dataList.push([Total]);
          titleList.push([NodeName + "：", "人"]);
        });
        children.push({
          nodeName: Year,
          nodeID: Year,
          source: [BenkeValue, MiddleTitleValue],
          dataList: dataList,
        });
      });
    data.push({
      nodeName: NodeName,
      nodeID: NodeID,
      yType:'percent',

      titleList: titleList,
      xName: "学期",
      yName: "人数占比",
      type: ["学历", "职称"],
      children,
    });
  });
  return data;
}
