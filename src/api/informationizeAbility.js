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
 * @description:在线教学\办公统计  http://192.168.129.1:8033/showdoc/web/#/21?page_id=2097
 * @param {*}
 * @return {*}
 */
export function getTeachTP(payload = {}) {
  let { schoolID, collegeID, selectLevel, term } = payload;
  let url =
    BasicProxy +
    `/Statistics/TeachingAbility/TP?SchoolID=${schoolID ? schoolID : ""}&CollegeID=${
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
 