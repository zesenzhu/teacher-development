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
 * @Description:  大学中小学的接口不一样，所以要做判断,都不一样
 * @FilePath: \teacher-development\src\api\personal.js
 */
import fetch from "../util/fetch";
import ipConfig from "../util/ipConfig";
import moment from "moment";
import { deepMap, SetNaNToNumber, transTime } from "../util/public";
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
            ({ child: { NodeID, NodeName, NodeType }, level, indexArray }) => {
              if (level === 1) {
                data[0].push({
                  value: NodeID,
                  title: NodeName,
                  nodeType: NodeType,
                });
              } else if (level === 2) {
                let parentID = json.Data[indexArray[0]].NodeID;
                if (data[1][parentID] instanceof Array) {
                  data[1][parentID].push({
                    value: NodeID,
                    title: NodeName,
                    nodeType: NodeType,
                  });
                } else {
                  data[1][parentID] = [
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
  let { userID, baseIP, isUniversity } = payload;
  // 大学中小学的接口不一样，所以要做判断
  let url =
    baseIP +
    (isUniversity
      ? `getTeacherDetailIntroduction?userId=${userID}`
      : `admin/getTeacherDetailIntroduction?teacherId=${userID}`);
  return fetch
    .get({ url, securityLevel: 2, advance: false })
    .then((res) => res.json())
    .then((json) => {
      if (json.code === 0) {
        let data = {};
        if (json.data) {
          // json.data.educationBackgroundDetailData = [
          //   {
          //     id: 7,
          //     teacherIntroductionId: 3,
          //     eduStage: 2,
          //     currentSchool: "南昌大学",
          //     extend1: null,
          //     extend2: null,
          //     startTime: "1990-01-02 00:00:00",
          //     endTime: "1992-02-20 00:00:00",
          //   },
          //   {
          //     id: 7,
          //     teacherIntroductionId: 3,
          //     eduStage: 2,
          //     currentSchool: "南昌大学",
          //     extend1: null,
          //     extend2: null,
          //     startTime: "1990-01-02 00:00:00",
          //     endTime: "1992-02-20 00:00:00",
          //   },
          //   {
          //     id: 7,
          //     teacherIntroductionId: 3,
          //     eduStage: 2,
          //     currentSchool: "南昌大学",
          //     extend1: null,
          //     extend2: null,
          //     startTime: "1990-01-02 00:00:00",
          //     endTime: "1992-02-20 00:00:00",
          //   },
          //   {
          //     id: 7,
          //     teacherIntroductionId: 3,
          //     eduStage: 2,
          //     currentSchool: "南昌大学",
          //     extend1: null,
          //     extend2: null,
          //     startTime: "1990-01-02 00:00:00",
          //     endTime: "1992-02-20 00:00:00",
          //   },
          //   {
          //     id: 7,
          //     teacherIntroductionId: 3,
          //     eduStage: 2,
          //     currentSchool: "南昌大学",
          //     extend1: null,
          //     extend2: null,
          //     startTime: "1990-01-02 00:00:00",
          //     endTime: "1992-02-20 00:00:00",
          //   },
          // ]
          let EducationBackgroundDetailData = [];
          if (json.data.educationBackgroundDetailData instanceof Array) {
            let eduCard = []; //两个一个轮播
            json.data.educationBackgroundDetailData.forEach((child, index) => {
              eduCard.push(child);
              // eduCard.push(child);
              if (
                eduCard.length === 2 ||
                index === json.data.educationBackgroundDetailData.length - 1
              ) {
                EducationBackgroundDetailData.push(eduCard);
                eduCard = [];
              }
            });
          }
          // EducationBackgroundDetailData = EducationBackgroundDetailData.concat(EducationBackgroundDetailData,EducationBackgroundDetailData,EducationBackgroundDetailData,EducationBackgroundDetailData)
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
export function GetTeacherExtra(payload = {}) {
  let { userID, baseIP, isUniversity } = payload;
  // 大学中小学的接口不一样，所以要做判断
  let url = BasicProxy + `/Teacher/GetTeacherExtra?UserID=${userID}`;

  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200 && json.Data) {
        let data = {};
        let {
          Nation, //民族
          NativePlace, //籍贯
          Education, //最高学历
          Degree, //最高学位
          Politics, //政治面貌
          Birth,
        } = json.Data;
        let EducationBackgroundDetailData = [];
        if (json.Data.EduBg instanceof Array) {
          let eduCard = []; //两个一个轮播
          json.Data.EduBg.forEach((child, index) => {
            eduCard.push({
              startTime: child.BeginTime,
              endTime: child.EndTime,
              currentSchool: child.SchoolName,
              ...child,
            });
            // eduCard.push(child);
            if (eduCard.length === 2 || index === json.Data.EduBg.length - 1) {
              EducationBackgroundDetailData.push(eduCard);
              eduCard = [];
            }
          });
        }
        // EducationBackgroundDetailData = EducationBackgroundDetailData.concat(EducationBackgroundDetailData,EducationBackgroundDetailData,EducationBackgroundDetailData,EducationBackgroundDetailData)
        data = {
          ...json.Data,
          EducationBackgroundDetailData,
          birthday: Birth,
          nation: Nation,
          nativeSpace: NativePlace,
          politicStatus: Politics,
          degree: Education,
          educationBackground: Degree,
          isBase: true,
        };

        return {
          StatusCode: 200,
          Data: data,
        };
      } else {
        return {
          StatusCode: 400,
          Data:{}
        };
      }
    });
}

// 获取周次
export function GetTermAndPeriodAndWeekNOInfo(payload = {}) {
  let { userID, baseIP, schoolID } = payload;
  let url =
    baseIP +
    `/Schedule/api//GetTermAndPeriodAndWeekNOInfo?UserID=${userID}&UserType=1&schoolId=${schoolID}`;
  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200) {
        let data = {};
        let StatusCode = json.StatusCode;
        if (json.Data && json.Data.ItemWeek instanceof Array) {
          let WeekList = [];
          let NowWeekSelect;
          let NowWeek = json.Data.WeekNO;
          if (NowWeek > json.Data.ItemWeek.length || NowWeek <= 0) {
            NowWeek = 1;
          }
          json.Data.ItemWeek.forEach((child) => {
            let data = {
              startTime: moment(child.StartDate).format("YYYY-MM-DD HH:mm:ss"),
              endTime: moment(child.EndDate).format("YYYY-MM-DD HH:mm:ss"),
              value: child.WeekNO,
              title: "第" + child.WeekNO + "周",
            };
            WeekList.push(data);
            if (NowWeek === child.WeekNO) {
              NowWeekSelect = data;
            }
          });
          data = { ...json.Data };
          data.WeekList = WeekList;
          data.NowWeekSelect = NowWeekSelect;
        } else {
          StatusCode = 401;
        }
        return {
          StatusCode: StatusCode,
          Data: { ...data },
        };
      } else {
        return {
          StatusCode: json.StatusCode,
        };
      }
    });
}
/**
 * @description: 创建个promise，做假数据
 * @param {*}
 * @return {*}
 */
function PromiseData(data) {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}
// 电子资源
/**
 * @description: 教学资料的都是在没有该系统的时候作假数据
 * @param {*} payload
 * @return {*}
 */
export async function GetTeacherResView(payload = {}) {
  let {
    userID,
    baseIP,
    proxy,
    schoolID,
    token,
    subjectNames,
    startTime,
    subjectIDs,
    endTime,schoolLevel
  } = payload;
  let url =
    proxy +
    `/api/Public/GetTeacherResView?SchoolID=${schoolID}&TeacherID=${userID}&Token=${token}&SubjectIDs=${subjectIDs}&SubjectNames=${subjectNames}&startTime=${startTime}&endTime=${endTime}&SchoolLevel=${schoolLevel}`;
  let promise = "";
  let isError = false;

  if (proxy) {
    let res = await fetch.tranfer({ reqUrl: url, basicProxy: baseIP, token });
    isError = res === false;

    promise = PromiseData(res);
  }
  if (!proxy || isError) {
    promise = PromiseData({
      error: 0,
      data: {
        TeacherID: userID,
        Url: "",
        UploadCount: 0,
        BrowseCount: 0,
        UploadAllScale: 0,
        // UploadSubjectScale: subjectIDs.split(",").map((d, i) => {
        //   return {
        //     SubjectScale: 0,
        //     SubjectID: d,
        //     SubjectName: subjectNames.split(",")[i],
        //   };
        // }),
      },
    });
  }
  subjectIDs = subjectIDs || "";
  subjectNames = subjectNames || "";
  return (
    // fetch
    //   .tranfer({ reqUrl: url, basicProxy: baseIP, token })
    // .then((res) => res.json())
    promise.then((json) => {
      if (json.error === 0 && json.data) {
        let data = {};
        let StatusCode = 200;
        //         "TeacherID":"t0001",
        // "Url":"/xxxxxxxxx",
        // "UploadCount":"500",
        // "BrowseCount":"1290",
        // "UploadAllScale":"0.236",
        // "UploadSubjectScale":[{
        // 	"SubjectScale":"0.562",
        // 	"SubjectID":"",
        // 	"SubjectName":""
        // }]

        let {
          UploadCount,
          UploadAllScale,
          BrowseCount,
          Url,
          UploadSubjectScale,
        } = json.data;
        data.AllCount = SetNaNToNumber(UploadCount);
        data.AllScale = SetNaNToNumber(UploadAllScale) * 100;
        data.UseCount = SetNaNToNumber(BrowseCount);
        data.Url = Url ? proxy + Url + "?lg_tk=" + token : "";
        data.AllSubject = [];
        if (
          !(UploadSubjectScale instanceof Array) ||
          UploadSubjectScale.length === 0
        ) {
          UploadSubjectScale = subjectIDs.split(",").map((d, i) => {
            return {
              SubjectScale: 0,
              SubjectID: d,
              SubjectName: subjectNames.split(",")[i],
            };
          });
        }
        UploadSubjectScale instanceof Array &&
          UploadSubjectScale.forEach((child) => {
            data.AllSubject.push({
              SubjectName: child.SubjectName,
              SubjectID: child.SubjectID,
              Scale: SetNaNToNumber(child.SubjectScale) * 100,
            });
          });
        return {
          StatusCode: StatusCode,
          Data: { ...data },
        };
      } else {
        return {
          StatusCode: 400,
        };
      }
    })
  );
}

// 教学方案
/**
 * @description: 教学资料的都是在没有该系统的时候作假数据
 * @param {*} payload
 * @return {*}
 */
export async function GetTeachPlanStatistics(payload = {}) {
  let {
    userID,
    baseIP,
    proxy,
    urlProxy,
    // schoolID,
    token,
    subjectNames,
    startTime,
    subjectIDs,
    endTime,
  } = payload;
  let url =
    proxy +
    `TeachingPlan/ApiForOutside/GetTeachPlanStatistics?UserID=${userID}&StartTime=${startTime}&EndTime=${endTime}`;
  let promise = "";
  let isError = false;

  if (proxy) {
    let res = await fetch.get({ url, securityLevel: 2 });
    let json = await res.json();
    isError = json.StatusCode !== 200;
    // console.log(json)
    promise = PromiseData(json);
  }
  if (!proxy || isError) {
    promise = PromiseData({
      StatusCode: 0,
      Data: {
        TeacherID: userID,
        Url: "",
        BrowseCount: 0,
        UploadAllScale: 0,
        UploadCount: 0,
        UseCount: 0,
        PCLink: "",
      },
    });
  }
  subjectIDs = subjectIDs || "";
  subjectNames = subjectNames || "";
  return promise.then((json) => {
    if (json.StatusCode === 200 && json.Data) {
      let data = {};
      let StatusCode = 200;
      //         "TeacherID":"t0001",
      // "Url":"/xxxxxxxxx",
      // "UploadCount":"500",
      // "BrowseCount":"1290",
      // "UploadAllScale":"0.236",
      // "UploadSubjectScale":[{
      // 	"SubjectScale":"0.562",
      // 	"SubjectID":"",
      // 	"SubjectName":""
      // }]

      let {
        UploadCount,
        UploadAllScale,
        UseCount,
        PCLink,
        UploadSubjectScale,
      } = json.Data;
      data.AllCount = SetNaNToNumber(UploadCount);
      data.AllScale = SetNaNToNumber(UploadAllScale) * 100;
      data.UseCount = SetNaNToNumber(UseCount);
      data.Url = PCLink ? urlProxy + PCLink + "?lg_tk=" + token : "";
      data.AllSubject = [];
      if (
        !(UploadSubjectScale instanceof Array) ||
        UploadSubjectScale.length === 0
      ) {
        UploadSubjectScale = subjectIDs.split(",").map((d, i) => {
          return {
            SubjectScale: 0,
            SubjectID: d,
            SubjectName: subjectNames.split(",")[i],
          };
        });
      }
      UploadSubjectScale instanceof Array &&
        UploadSubjectScale.forEach((child) => {
          data.AllSubject.push({
            SubjectName: child.SubjectName,
            SubjectID: child.SubjectID,
            Scale: SetNaNToNumber(child.SubjectScale) * 100,
          });
        });
      // window.open(
      //   Urls["300"].WebUrl +
      //     "html/TeachingPlan/?subjectid=" +
      //     SubjectID +
      //     "&lg_tk=" +
      //     token +
      //     "&lg_ic=" +
      //     IdentityCode
      // );
      return {
        StatusCode: StatusCode,
        Data: { ...data },
      };
    } else {
      return {
        StatusCode: 400,
      };
    }
  });
}

// 精品课程
/**
 * @description: 教学资料的都是在没有该系统的时候作假数据
 * @param {*} payload
 * @return {*}
 */
export async function GetTeacherpercentage(payload = {}) {
  let {
    userID,
    baseIP,
    proxy,
    schoolID,
    token,
    subjectNames,
    startTime,
    subjectIDs,
    endTime,
  } = payload;
  let url =
    proxy +
    `api/common/teacherpercentage?schoolId=${schoolID}&TeacherID=${userID}&StartTime=${startTime}&EndTime=${endTime}`;
  let promise = "";
  let isError = false;
  if (proxy) {
    try {
      let res = await fetch.tranfer({ reqUrl: url, basicProxy: baseIP, token });

      // console.log(res);
      isError = res === false;

      promise = PromiseData(res);
    } catch (e) {
      isError = true;
    }
  }
  // console.log(promise);

  if (!proxy || isError) {
    promise = PromiseData({
      code: 0,
      data: {
        TeacherID: userID,
        Url: "",
        BrowseCount: 0,
        UploadAllScale: 0,
        UploadCount: 0,
        UseCount: 0,
        PCLink: "",
        uploadCount: 0,
        uploadAllScale: 0,
        browseCount: 0,
        url: "",
      },
    });
  }
  subjectIDs = subjectIDs || "";
  subjectNames = subjectNames || "";
  return (
    promise
      // .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        if (json.code === 0 && json.data) {
          let data = {};
          let StatusCode = 200;
          //         "TeacherID":"t0001",
          // "Url":"/xxxxxxxxx",
          // "UploadCount":"500",
          // "BrowseCount":"1290",
          // "UploadAllScale":"0.236",
          // "UploadSubjectScale":[{
          // 	"SubjectScale":"0.562",
          // 	"SubjectID":"",
          // 	"SubjectName":""
          // }]

          let {
            uploadCount,
            uploadAllScale,
            browseCount,
            url,
            uploadSubjectScale,
          } = json.data;
          data.AllCount = SetNaNToNumber(uploadCount);
          data.AllScale = data.AllCount
            ? SetNaNToNumber(uploadAllScale) * 100
            : 0;
          data.UseCount = SetNaNToNumber(browseCount);
          data.Url = url ? decodeURIComponent(url) + "?lg_tk=" + token : ""; //教师才能看
          data.AllSubject = [];
          if (
            !(uploadSubjectScale instanceof Array) ||
            uploadSubjectScale.length === 0
          ) {
            uploadSubjectScale = subjectIDs.split(",").map((d, i) => {
              return {
                subjectScale: 0,
                subjectID: d,
                subjectName: subjectNames.split(",")[i],
              };
            });
          }

          uploadSubjectScale instanceof Array &&
            uploadSubjectScale.forEach((child) => {
              data.AllSubject.push({
                SubjectName: child.subjectName,
                SubjectID: child.subjectID,
                Scale: data.AllCount
                  ? SetNaNToNumber(child.subjectScale) * 100
                  : 0,
              });
            });

          return {
            StatusCode: StatusCode,
            Data: { ...data },
          };
        } else {
          return {
            StatusCode: 400,
          };
        }
      })
  );
}

// 获取学期
export function GetAllTerm(payload = {}) {
  let { proxy } = payload;
  let url = proxy + `/getAllTerm`;
  return fetch
    .get({ url, securityLevel: 2, advance: false })
    .then((res) => res.json())
    .then((json) => {
      if (json.code === 0) {
        let data = [];
        let StatusCode = 200;
        if (json.data instanceof Array && json.data.length > 0) {
          json.data.forEach((child) => {
            data.push({
              value: child.term,
              title: constructTerm(child.term),
            });
          });
        } else {
          StatusCode = 401;
        }
        return {
          StatusCode: StatusCode,
          Data: data,
        };
      } else {
        return {
          StatusCode: json.StatusCode,
        };
      }
    });
}

let constructTerm = (Term) => {
  if (Term.includes("-")) {
    let Term1 = Term.slice(0, Term.length - 2);
    let Term2 = Term.slice(Term.length - 2, Term.length);
    let TermC = "";
    if (Term2 === "01") {
      TermC = "第一学期";
    } else if (Term2 === "02") {
      TermC = "第二学期";
    }
    return Term1 + "学年" + TermC;
  }
  return "";
};

export function GetTeacherWork(payload = {}) {
  let {
    userName,
    proxy,
    semester,
    pageSize,
    pageNum,
    token,
    academyId,
    isUniversity,
  } = payload;
  let url =
    proxy +
    (isUniversity
      ? `getTeacherWorkCase?userName=${userName}&pageNum=${1}&pageSize=${10000}&academyId=${academyId}&semester=${semester}`
      : `/admin/getTeacherWork?userName=${userName}&pageNum=${1}&pageSize=${10000}&token=${token}&semester=${semester}`);
  return fetch
    .get({ url, securityLevel: 2, advance: false })
    .then((res) => res.json())
    .then((json) => {
      if (json.code === 0) {
        let data = {};
        let StatusCode = 200;
        if (
          json.data &&
          json.data.data instanceof Array &&
          json.data.data.length > 0
        ) {
          //           pageCount: 1
          // pageNum: 1
          // pageSize: 10000
          // totalCount: 1
          //data:[{}]
          // json.data.data为数组，拿第一个

//           academyId: "S-8888-10"
// academyName: "建筑学院"
// administrativeClassData: []
// administrativeClassNum: 0
// courseClassData: (3) [{…}, {…}, {…}]
// courseClassNum: 3
// courseData: (3) [{…}, {…}, {…}]
// courseNum: 3
// photoPath: "http://192.168.122.110:10103/http_basic/UserInfo/Avatar/Default/Nopic111.jpg"
// userId: "1001003"
// userName: "老师1001003"
          let {
            administrativeClassNum, //行政班数
            classNum, //教学班数
            invigilationNum, //监考数
            scheduleCount, //课程
          } = json.data.data[0];
          data = [
            SetNaNToNumber(scheduleCount),
            SetNaNToNumber(administrativeClassNum),
            SetNaNToNumber(classNum),
            SetNaNToNumber(invigilationNum),
          ];
        } else {
          StatusCode = 40001;
        }

        return {
          StatusCode: StatusCode,
          Data: data,
        };
      } else {
        return {
          StatusCode: 400,
        };
      }
    });
}
/**
 * @description: 当没有E34时用师资的数据
 * @param {*} payload
 * @return {*}
 */
export function GetTeacherWorkByBase(payload = {}) {
  let { userID, baseIP } = payload;
  let url = BasicProxy + `/Teacher/GetTeacherLoadCase?UserID=${userID}`;
  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200 && json.Data) {
        // "Term": "2020-202101",
        // "ClassHourCount": 0, //课程总数量（课时）
        // "ClassCount": 0,     //行政班数量
        // "CourseClassCount": 0,//教学班数量
        // "ExamCount": 0        //监考数量（当该值等于-1时，表示考务系统不存在，不显示监考数量）
        let {
          ClassHourCount,
          ClassCount,
          CourseClassCount,
          ExamCount,
        } = json.Data;
        let Data = [ClassHourCount, ClassCount, CourseClassCount, ExamCount];

        return {
          StatusCode: json.StatusCode,
          Data: Data,
        };
      } else {
        return {
          StatusCode: 400,
        };
      }
    });
}
/**
 * @description: 教研统计
 * @param {*} payload
 * @return {*}
 */
export function GetResearchByUserID(payload = {}) {
  let { userID, baseIP } = payload;
  let url =
    BasicProxy + `/Statistics/Basic/GetResearchByUserID?UserID=${userID}`;
  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200 && json.Data) {
        let {
          ProjectCount,
          CompletedCount,
          ActivityCount,
          ProjectList,
          CompletedList,
          ActivityList,
        } = json.Data;
        let Data = [
          {
            // count: !isNaN(ProjectCount) ? Number(ProjectCount) : 0,
            list:
              ProjectList instanceof Array
                ? ProjectList.map((child) => {
                    return { ...child, Name: child.ProjectName };
                  })
                : [],
          },
          {
            // count: !isNaN(CompletedCount) ? Number(CompletedCount) : 0,
            list:
              CompletedList instanceof Array
                ? CompletedList.map((child) => {
                    return { ...child, Name: child.ProjectName };
                  })
                : [],
          },
          {
            // count: !isNaN(ActivityCount) ? Number(ActivityCount) : 0,
            list:
              ActivityList instanceof Array
                ? ActivityList.map((child) => {
                    return { ...child, Name: child.ActivityName };
                  })
                : [],
          },
        ];
        Data = Data.map((d) => {
          d.count = d.list.length;
          return d;
        });
        return {
          StatusCode: json.StatusCode,
          Data: Data,
        };
      } else {
        return {
          StatusCode: 400,
        };
      }
    });
}
/**
 * @description: 个人发展
 * @param {*} payload
 * @return {*}
 */
export function GetDevelopmentHistory(payload = {}) {
  let { userID, baseIP } = payload;
  let url =
    BasicProxy + `/Statistics/Basic/GetDevelopmentHistory?UserID=${userID}`;
  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200 && json.Data instanceof Array) {
        let data = json.Data.map((child, index) => {
          return {
            title: child.ChangeDetail,
            time: child.ChangeTime,
            ...child,
          };
        });
        return {
          StatusCode: json.StatusCode,
          Data: data,
        };
      } else {
        return {
          StatusCode: 400,
        };
      }
    });
}

export function GetLogInfoByUserID(payload = {}) {
  let { userID, baseIP } = payload;
  let url =
    BasicProxy + `/Statistics/Basic/GetLogInfoByUserID?UserID=${userID}`;
  return fetch
    .get({ url, securityLevel: 2 })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200 && json.Data) {
        // 雷达
        let DayTimeList = [
          {
            Time: "06:00~09:00",
            Count: 0,
          },
          {
            Time: "09:00~12:00",
            Count: 0,
          },
          {
            Time: "12:00~15:00",
            Count: 0,
          },
          {
            Time: "15:00~18:00",
            Count: 0,
          },
          {
            Time: "18:00~21:00",
            Count: 0,
          },
          {
            Time: "21:00~23:59",
            Count: 0,
          },
        ];
        DayTimeList[0].Count = json.Data["T0609"] || 0;
        DayTimeList[1].Count = json.Data["T0912"] || 0;
        DayTimeList[2].Count = json.Data["T1215"] || 0;
        DayTimeList[3].Count = json.Data["T1518"] || 0;
        DayTimeList[4].Count = json.Data["T1821"] || 0;
        DayTimeList[5].Count = json.Data["T2124"] || 0;
        // 控制大于100控制为100
        DayTimeList = DayTimeList.map((d) => {
          d.Count = d.Count > 100 ? 100 : d.Count;
          return d;
        });
        let {
          TimeSpan, //累计上机时长
          DayAvgTimeSpan, //累计上机时长
          // LoginCount, //上机总次数
          AvgLoginTimeSpan, //平均每次上机时长
        } = json.Data;
        return {
          StatusCode: json.StatusCode,
          Data: {
            ...json.Data,
            TimeSpan: transTime(parseFloat(TimeSpan).toFixed(2), "m")
              .Time_En_Low, //累计上机时长
            DayAvgTimeSpan: transTime(
              parseFloat(DayAvgTimeSpan).toFixed(2),
              "m"
            ).Time_En_Low, //累计上机时长
            // LoginCount:transTime(LoginCount,'m','h').time, //上机总次数
            AvgLoginTimeSpan: transTime(
              parseFloat(AvgLoginTimeSpan).toFixed(2),
              "m"
            ).Time_En_Low, //平均每次上机时长
            DayTimeList,
            DayOnlineList: [],
          }, //现在DayOnlineList暂时没有
        };
      } else {
        return {
          StatusCode: 400,
        };
      }
    });
}
