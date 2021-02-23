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
 * @description:电子资源上传  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2096
 * @param {*}
 * @return {*}
 */
export function getTeachER(payload = {}) {
  let { schoolID, collegeID, selectLevel, term } = payload;
  let url =
    BasicProxy +
    `/Statistics/TeachingAbility/ER?SchoolID=${
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
        // "ResourceCount":150,            //电子资源上传数量
        // "AvgUploadResourceCount":14,    //人均上传数量
        // "AvgUploadUserCount":2,            //平均每日上传人数
        // "TotalTeacher":60,                //教师总数量
        // "HasUploadedCount":60,            //参与上传人数
        // "NoUploadedCount":60,
        // "UploadedPercent":0.963,            //参与率
        // "SubSet":[{
        //     "NodeID":"XXXXXXXXXXX",
        //     "NodeName":"语文",            //节点名称（学科、学院等）
        //     "TotalTeacher":50,            //该节点下的教师数量
        //     "HasUploadedCount":11,            //该节点参与上传人数
        //     "UploadedPercent":0.963,         //参与率
        // }]
        return json.Data ? json.Data : {};
      } else {
        return false;
      }
    });
}

/**
 * @description:电子教案制作  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2097
 * @param {*}
 * @return {*}
 */
export function getTeachTP(payload = {}) {
  let { schoolID, collegeID, selectLevel, term } = payload;
  let url =
    BasicProxy +
    `/Statistics/TeachingAbility/TP?SchoolID=${
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
        // "TPCount":150,            //教案总制作数量
        // "AvgUploadTPCount":14,    //人均制作数量
        // "AvgUploadUserCount":2,            //平均每日上传人数
        // "TotalTeacher":60,                //教师总数量
        // "HasUploadedCount":60,            //参与制作人数
        // "NoUploadedCount":60,            //未参与制作人数
        // "UploadedPercent":0.963,            //参与率
        // "SubSet":[{
        //     "NodeID":"XXXXXXXXXXX",
        //     "NodeName":"语文",            //节点名称（学科、学院等）
        //     "TotalTeacher":50,            //该节点下的教师数量
        //     "HasUploadedCount":39,            //该节点参与上传人数
        //     "NoUploadedCount":11,            //该节点参与上传人数
        //     "UploadedPercent":0.963,                    //参与率
        // }]
        return json.Data ? json.Data : {};
      } else {
        return false;
      }
    });
}

/**
 * @description:精品课程统计  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2098
 * @param {*}
 * @return {*}
 */
export function getTeachEC(payload = {}) {
  let { schoolID, collegeID, selectLevel, term } = payload;
  let url =
    BasicProxy +
    `/Statistics/TeachingAbility/EC?SchoolID=${
      schoolID ? schoolID : ""
    }&CollegeID=${collegeID ? collegeID : ""}&SelectLevel=${
      selectLevel ? selectLevel : ""
    }&Term=${term ? term : ""}`;

  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200) {
        // "ECCount":150,            //精品课程数量
        // "AvgCount":14,            //人均精品课程数量
        // "HasECTeaCount":2,            //拥有精品课程的教师人数
        // "TotalTeacher":60,                //总教师人数
        // "HasECPercent":0.963,            //拥有精品课程人数比例
        // "AvgECPercent":0.963,            //人均课程精品率
        // "SubSet":[{
        //     "NodeID":"XXXXXXXXXXX",
        //     "NodeName":"语文",            //节点名称（学科、学院等）
        //     "TotalTeacher":50,            //该节点下的教师数量
        //     "HasECTeaCount":11,            //拥有精品课程的教师人数
        //     "HasECPercent":0.963,         //参与率
        // }]
        return json.Data ? json.Data : {};
      } else {
        return false;
      }
    });
}

/**
 * @description:电子督课  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2099
 * @param {*}
 * @return {*}
 */
export function getEvaluateCourse(payload = {}) {
  let { schoolID, collegeID, selectLevel, term } = payload;
  let url =
    BasicProxy +
    `/Statistics/TeachingAbility/EvaluateCourse?SchoolID=${
      schoolID ? schoolID : ""
    }&CollegeID=${collegeID ? collegeID : ""}&SelectLevel=${
      selectLevel ? selectLevel : ""
    }&Term=${term ? term : ""}`;

  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200) {
        // "AvgScore":4.5,            //平均估分
        // "SubSet":[{
        //     "NodeID":"XXXXXXXXXXX",
        //     "NodeName":"语文",            //节点名称（学科、学院等）
        //     "AvgScore":50,            //该节点下的教师平均估分
        // }]
        return json.Data ? json.Data : {};
      } else {
        return false;
      }
    });
}
/**
 * @description:教研活动  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2100
 * @param {*}
 * @return {*}
 */
export function getTeacherRA(payload = {}) {
  let { schoolID, collegeID, selectLevel, term } = payload;
  let url =
    BasicProxy +
    `/Statistics/TeachingAbility/RA?SchoolID=${
      schoolID ? schoolID : ""
    }&CollegeID=${collegeID ? collegeID : ""}&SelectLevel=${
      selectLevel ? selectLevel : ""
    }&Term=${term ? term : ""}`;

  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200) {
        // "ActivityCount":150,            //教研活动数量
        // "AvgJoinCount":14,                //人均参与数量
        // "TotalTeacher":2,                //教师总数量
        // "HasJoinTeaCount":60,                //参与活动教师数量
        // "NoJoinTeaCount":60,                //未参与活动教师数量
        // "HasJoinPercent":0.96,                //参与活动教师数量
        // "SubSet":[{
        //     "NodeID":"XXXXXXXXXXX",
        //     "NodeName":"语文",            //节点名称（学科、学院等）
        //     "TotalTeacher":50,            //该节点下的教师数量
        //     "HasJoinTeaCount":39,            //该节点参与活动人数
        //     "NoJoinTeaCount":11,            //该节点未参与活动人数
        //     "HasJoinPercent":0.963,                    //参与率
        // }]
        return json.Data ? json.Data : {};
      } else {
        return false;
      }
    });
}
/**
 * @description:教研课题  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2099
 * @param {*}
 * @return {*}
 */
export function getTeachRP(payload = {}) {
  let { schoolID, collegeID, selectLevel, term } = payload;
  let url =
    BasicProxy +
    `/Statistics/TeachingAbility/RP?SchoolID=${
      schoolID ? schoolID : ""
    }&CollegeID=${collegeID ? collegeID : ""}&SelectLevel=${
      selectLevel ? selectLevel : ""
    }&Term=${term ? term : ""}`;

  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200) {
        // "ProjectCount":150,            //教研课题数量
        // "AvgJoinCount":14,                //教师平均参与次数
        // "CompletedCount":14,                //已结题数量
        // "AvgResultCount":14,                //平均成果数量
        // "TotalTeacher":2,                //教师总数量
        // "HasJoinTeaCount":60,                //参与课题教师数量
        // "NoJoinTeaCount":60,                //未参与课题教师数量
        // "HasJoinPercent":0.96,                //参与活动教师百分比
        // "SubSet":[{
        //     "NodeID":"XXXXXXXXXXX",
        //     "NodeName":"语文",            //节点名称（学科、学院等）
        //     "TotalTeacher":50,            //该节点下的教师数量
        //     "HasJoinTeaCount":39,            //该节点参与课题人数
        //     "NoJoinTeaCount":11,            //该节点未参与课题人数
        //     "HasJoinPercent":0.963,                    //参与率
        // }]
        return json.Data ? json.Data : {};
      } else {
        return false;
      }
    });
}

/**
 * @description:历史电子资源上传参与率  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2260
 * @return {*}
 */
export function getHistoryER(payload = {}) {
  let { schoolID, collegeID, selectLevel } = payload;
  let url =
    BasicProxy +
    `/Statistics/TeachingAbility/History/ER?SchoolID=${
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
        let data = [];

        json.Data.forEach((c) => {
          let { NodeName, NodeID, History } = c;
          let children = [];
          History instanceof Array &&
            History.forEach((h, i) => {
              let {
                Year,

                TotalTeacher, //教师总数量
                HasUploadedCount, //参与上传人数
                NoUploadedCount, //未参与上传人数
                UploadedPercent, //参与率
                Value,
              } = h;
              children.push({
                nodeName: Year,
                nodeID: Year,
                source: [UploadedPercent],
                dataList: [
                  [Year, NodeName, UploadedPercent],
                  [TotalTeacher],
                  [HasUploadedCount],
                  [NoUploadedCount],
                ],
              });
            });
          data.push({
            nodeName: NodeName,
            nodeID: NodeID,
            yType: "percent",

            titleList: [
              ["", "学期", "电子资源上传参与率 ", "%"],
              ["教师总人数：", "人"],
              ["已参与上传人数：", "人"],
              ["未参与上传人数：", "人"],
            ],
            xName: "学期",
            yName: "参与率",
            type: ["参与率"],
            children,
          });
        });
        return data;
      } else {
        return false;
      }
    });
}

/**
 * @description:历史电子教案制作参与率  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2261
 * @return {*}
 */
export function getHistoryTP(payload = {}) {
  let { schoolID, collegeID, selectLevel } = payload;
  let url =
    BasicProxy +
    `/Statistics/TeachingAbility/History/TP?SchoolID=${
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
        let data = [];

        json.Data.forEach((c) => {
          let { NodeName, NodeID, History } = c;
          let children = [];
          History instanceof Array &&
            History.forEach((h, i) => {
              let {
                Year,

                TotalTeacher, //教师总数量
                HasUploadedCount, //参与上传人数
                NoUploadedCount, //未参与上传人数
                UploadedPercent, //参与率
                Value,
              } = h;
              children.push({
                nodeName: Year,
                nodeID: Year,
                source: [UploadedPercent],
                dataList: [
                  [Year, NodeName, UploadedPercent],
                  [TotalTeacher],
                  [HasUploadedCount],
                  [NoUploadedCount],
                ],
              });
            });
          data.push({
            nodeName: NodeName,
            nodeID: NodeID,
            yType: "percent",
            titleList: [
              ["", "学期", "电子教案制作参与率 ", "%"],
              ["教师总人数：", "人"],
              ["已参与上传人数：", "人"],
              ["未参与上传人数：", "人"],
            ],
            xName: "学期",
            yName: "参与率",
            type: ["参与率"],
            children,
          });
        });
        return data;
      } else {
        return false;
      }
    });
}
/**
 * @description:历史精品课程拥有率  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2262
 * @return {*}
 */
export function getHistoryEC(payload = {}) {
  let { schoolID, collegeID, selectLevel } = payload;
  let url =
    BasicProxy +
    `/Statistics/TeachingAbility/History/EC?SchoolID=${
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
        let data = [];

        json.Data.forEach((c) => {
          let { NodeName, NodeID, History } = c;
          let children = [];
          History instanceof Array &&
            History.forEach((h, i) => {
              let {
                Year,

                TotalTeacher, //教师总数量
                HasECTeaCount, //拥有精品课程人数
                NoECTeaCount, //未拥有精品课程人数
                HasECPercent, //拥有精品课程人数比例
              } = h;
              children.push({
                nodeName: Year,
                nodeID: Year,
                source: [HasECPercent],
                dataList: [
                  [Year, NodeName, HasECPercent],
                  [TotalTeacher],
                  [HasECTeaCount],
                  [NoECTeaCount],
                ],
              });
            });
          data.push({
            nodeName: NodeName,
            nodeID: NodeID,
            yType: "percent",
            titleList: [
              ["", "学期", "拥有精品课程人数比例 ", "%"],
              ["教师总人数：", "人"],
              ["拥有精品课程人数", "人"],
              ["未拥有精品课程人数", "人"],
            ],
            xName: "学期",
            yName: "拥有精品课程人数比例",
            type: ["拥有精品课程人数比例"],
            children,
          });
        });
        return data;
      } else {
        return false;
      }
    });
}
/**
 * @description:历史电子督课平均估分  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2263
 * @return {*}
 */
export function getHistoryEvaluateCourse(payload = {}) {
  let { schoolID, collegeID, selectLevel } = payload;
  let url =
    BasicProxy +
    `/Statistics/TeachingAbility/History/EvaluateCourse?SchoolID=${
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
        let data = [];

        json.Data.forEach((c) => {
          let { NodeName, NodeID, History } = c;
          let children = [];
          History instanceof Array &&
            History.forEach((h, i) => {
              let {
                Year,

                AvgScore, //拥有精品课程人数比例
              } = h;
              children.push({
                nodeName: Year,
                nodeID: Year,
                source: [AvgScore],
                dataList: [[Year,  ],[NodeName,AvgScore]],
              });
            });
          data.push({
            nodeName: NodeName,
            nodeID: NodeID,
            yType: 5,
            titleList: [["", "学期"  ],[
             '', "教师总体评估得分：", "分"
            ]],
            xName: "学期",
            yName: "评估得分",
            type: ["评估得分"],
            children,
          });
        });
        return data;
      } else {
        return false;
      }
    });
}
/**
 * @description:历史教研活动参与率  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2264
 * @return {*}
 */
export function getHistoryRA(payload = {}) {
  let { schoolID, collegeID, selectLevel } = payload;
  let url =
    BasicProxy +
    `/Statistics/TeachingAbility/History/RA?SchoolID=${
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
        let data = [];

        json.Data.forEach((c) => {
          let { NodeName, NodeID, History } = c;
          let children = [];
          History instanceof Array &&
            History.forEach((h, i) => {
              let {
                Year,

                TotalTeacher, //教师总数量
                HasJoinTeaCount, //拥有精品课程人数
                NoJoinTeaCount, //未拥有精品课程人数
                HasJoinPercent, //拥有精品课程人数比例
              } = h;
              children.push({
                nodeName: Year,
                nodeID: Year,
                source: [HasJoinPercent],
                dataList: [
                  [Year, NodeName, HasJoinPercent],
                  [TotalTeacher],
                  [HasJoinTeaCount],
                  [NoJoinTeaCount],
                ],
              });
            });
          data.push({
            nodeName: NodeName,
            nodeID: NodeID,
            yType: "percent",
            titleList: [
              ["", "学期", "教研活动参与率 ", "%"],
              ["教师总人数：", "人"],
              ["已参与人数：", "人"],
              ["未参与人数：", "人"],
            ],
            xName: "学期",
            yName: "参与率",
            type: ["参与率"],
            children,
          });
        });
        return data;
      } else {
        return false;
      }
    });
}
/**
 * @description:历史教研课题参与率  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2265
 * @return {*}
 */
export function getHistoryRP(payload = {}) {
  let { schoolID, collegeID, selectLevel } = payload;
  let url =
    BasicProxy +
    `/Statistics/TeachingAbility/History/RP?SchoolID=${
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
        let data = [];

        json.Data.forEach((c) => {
          let { NodeName, NodeID, History } = c;
          let children = [];
          History instanceof Array &&
            History.forEach((h, i) => {
              let {
                Year,

                TotalTeacher, //教师总数量
                HasJoinTeaCount, //拥有精品课程人数
                NoJoinTeaCount, //未拥有精品课程人数
                HasJoinPercent, //拥有精品课程人数比例
              } = h;
              children.push({
                nodeName: Year,
                nodeID: Year,
                source: [HasJoinPercent],
                dataList: [
                  [Year, NodeName, HasJoinPercent],
                  [TotalTeacher],
                  [HasJoinTeaCount],
                  [NoJoinTeaCount],
                ],
              });
            });
          data.push({
            nodeName: NodeName,
            nodeID: NodeID,
            yType: "percent",
            titleList: [
              ["", "学期", "教研课题参与率 ", "%"],
              ["教师总人数：", "人"],
              ["已参与人数：", "人"],
              ["未参与人数：", "人"],
            ],
            xName: "学期",
            yName: "参与率",
            type: ["参与率"],
            children,
          });
        });
        return data;
      } else {
        return false;
      }
    });
}
