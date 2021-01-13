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
    nodeID,
    sortFiled,
    sortType,
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
      sortFiled ? "&SortFiled=" + sortFiled : ""
    }${sortType ? "&SortType=" + sortType : ""}`;

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
/**
 * @description:  获取各个系统url
 * @param {*sysIDs}
 * @return {*}
 */
export function GetSubSystemsMainServerBySubjectID(payload = {}) {
  let { sysIDs, baseIP } = payload;
  sysIDs = sysIDs instanceof Array ? sysIDs : [];
  let url =
    baseIP +
    `/BaseApi/Global/GetSubSystemsMainServerBySubjectID?appid=000&access_token=4d39af1bff534514e24948568b750f6c&subjectID=&sysIDs=${sysIDs.join(
      ","
    )}`;
  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200) {
        let data = {};
        if (json.Data instanceof Array) {
          json.Data.forEach((child) => {
            data[child.SysID] = child;
          });
        }
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

export function GetUserDetailForHX(payload = {}) {
  let { userID, baseIP } = payload;
  let url =
    baseIP +
    `/UserMgr/UserInfoMgr/GetUserDetailForHX?UserID=${userID}&UserType=1`;
  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200) {
        let data = json.Data ? json.Data : {};

        return {
          StatusCode: json.StatusCode,
          Data: { ...data, UserID: userID },
        };
      } else {
        return {
          StatusCode: json.StatusCode,
        };
      }
    });
}

export function getTeacherDetailIntroduction(payload = {}) {
  let { userID, baseIP } = payload;
  let url = baseIP + `admin/getTeacherDetailIntroduction?teacherId=${userID}`;
  return fetch
    .get({ url, securityLevel: 2, advance: false })
    .then((res) => res.json())
    .then((json) => {
      if (json.code === 0) {
        let data = {};
        if (json.data) {
          json.data.educationBackgroundDetailData = [
            {
              id: 7,
              teacherIntroductionId: 3,
              eduStage: 2,
              currentSchool: "南昌大学",
              extend1: null,
              extend2: null,
              startTime: "1990-01-02 00:00:00",
              endTime: "1992-02-20 00:00:00",
            },
            {
              id: 7,
              teacherIntroductionId: 3,
              eduStage: 2,
              currentSchool: "南昌大学",
              extend1: null,
              extend2: null,
              startTime: "1990-01-02 00:00:00",
              endTime: "1992-02-20 00:00:00",
            },
            {
              id: 7,
              teacherIntroductionId: 3,
              eduStage: 2,
              currentSchool: "南昌大学",
              extend1: null,
              extend2: null,
              startTime: "1990-01-02 00:00:00",
              endTime: "1992-02-20 00:00:00",
            },
            {
              id: 7,
              teacherIntroductionId: 3,
              eduStage: 2,
              currentSchool: "南昌大学",
              extend1: null,
              extend2: null,
              startTime: "1990-01-02 00:00:00",
              endTime: "1992-02-20 00:00:00",
            },
            {
              id: 7,
              teacherIntroductionId: 3,
              eduStage: 2,
              currentSchool: "南昌大学",
              extend1: null,
              extend2: null,
              startTime: "1990-01-02 00:00:00",
              endTime: "1992-02-20 00:00:00",
            },
          ]
          let EducationBackgroundDetailData = [];
          if (json.data.educationBackgroundDetailData instanceof Array) {
            let eduCard = []; //两个一个轮播
            json.data.educationBackgroundDetailData.forEach((child,index) => {
              if (eduCard.length === 2||index===json.data.educationBackgroundDetailData.length-1) {
                EducationBackgroundDetailData.push(eduCard);
                eduCard = [];
              } else  {
                eduCard.push(child);
              }
            });
          }
          console.log(EducationBackgroundDetailData)
          data = {
            ...json.data,
            EducationBackgroundDetailData,
          };
        }
        // accessToken: null
        // appId: null
        // birthday: null
        // degree: null
        // educationBackground: null
        // educationBackgroundDetail: null
        // email: null
        // id: null
        // nation: null
        // nativeSpace: null
        // photoPath: "http://192.168.129.64:20103/http_basic/UserInfo/Photo/Default/Nopic.jpg"
        // politicStatus: null
        // professionalTitle: "一级教师"
        // qq: ""
        // telePhone: ""
        // userId: "gy2"
        // userName: "甘月"
        // weibo: ""
        // weixin: ""
        // workExperience: null
        return {
          StatusCode: 200,
          Data: data,
        };
      } else {
        return {
          StatusCode: 400,
        };
      }
    });
}
