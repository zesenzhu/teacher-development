/*
 *                        ::
 *                       :;J7, :,                        ::;7:
 *                       ,ivYi, ,                       ;LLLFS:
 *                       :iv7Yi                       :7ri;j5PL
 *                      ,:ivYLvr                    ,ivrrirrY2X,
 *                      :;r@Wwz.7r:                :ivu@kexianli.
 *                     :iL7::,:::iiirii:ii;::::,,irvF7rvvLujL7ur
 *                    ri::,:,::i:iiiiiii:i:irrv177JX7rYXqZEkvv17
 *                 ;i:, , ::::iirrririi:i:::iiir2XXvii;L8OGJr71i
 *               :,, ,,:   ,::ir@mingyi.irii:i:::j1jri7ZBOS7ivv,
 *                  ,::,    ::rv77iiiriii:iii:i::,rvLq@huhao.Li
 *              ,,      ,, ,:ir7ir::,:::i;ir:::i:i::rSGGYri712:
 *            :::  ,v7r:: ::rrv77:, ,, ,:i7rrii:::::, ir7ri7Lri
 *           ,     2OBBOi,iiir;r::        ,irriiii::,, ,iv7Luur:
 *         ,,     i78MBBi,:,:::,:,  :7FSL: ,iriii:::i::,,:rLqXv::
 *         :      iuMMP: :,:::,:ii;2GY7OBB0viiii:i:iii:i:::iJqL;::
 *        ,     ::::i   ,,,,, ::LuBBu BBBBBErii:i:i:i:i:i:i:r77ii
 *       ,       :       , ,,:::rruBZ1MBBqi, :,,,:::,::::::iiriri:
 *      ,               ,,,,::::i:  @arqiao.       ,:,, ,:::ii;i7:
 *     :,       rjujLYLi   ,,:::::,:::::::::,,   ,:i,:,,,,,::i:iii
 *     ::      BBBBBBBBB0,    ,,::: , ,:::::: ,      ,,,, ,,:::::::
 *     i,  ,  ,8BMMBBBBBBi     ,,:,,     ,,, , ,   , , , :,::ii::i::
 *     :      iZMOMOMBBM2::::::::::,,,,     ,,,,,,:,,,::::i:irr:i:::,
 *     i   ,,:;u0MBMOG1L:::i::::::  ,,,::,   ,,, ::::::i:i:iirii:i:i:
 *     :    ,iuUuuXUkFu7i:iii:i:::, :,:,: ::::::::i:i:::::iirr7iiri::
 *     :     :rk@Yizero.i:::::, ,:ii:::::::i:::::i::,::::iirrriiiri::,
 *      :      5BMBBBBBBSr:,::rv2kuii:::iii::,:i:,, , ,,:,:i@petermu.,
 *           , :r50EZ8MBBBBGOBBBZP7::::i::,:::::,: :,:,::i;rrririiii::
 *               :jujYY7LS0ujJL7r::,::i::,::::::::::::::iirirrrrrrr:ii:
 *            ,:  :@kevensun.:,:,,,::::i:i:::::,,::::::iir;ii;7v77;ii;i,
 *            ,,,     ,,:,::::::i:iiiii:i::::,, ::::iiiir@xingjief.r;7:i,
 *         , , ,,,:,,::::::::iiiiiiiiii:,:,:::::::::iiir;ri7vL77rrirri::
 *          :,, , ::::::::i:::i:::i:i::,,,,,:,::i:i:::iir;@Secbone.ii:::
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-11-19 15:15:20
 * @LastEditTime: 2020-12-21 11:08:16
 * @Description: 平台初始化的逻辑
 * @FilePath: \teacher-development\src\util\init.js
 */
/**
 * @description: 初始化总开关
 * @param {*callback:回调函数}
 * @return {*}
 */
import { TokenCheck } from "./connect";
import config from "./ipConfig";
import {
  setDataStorage,
  getDataStorage,
  getQueryVariable,
  addOrgToUrl,
  changeToArray,
} from "./public";
import fetch from "./fetch";
import listenAppDurationTime from "./listen_app_duration_time";
let { BasicProxy } = config;
let { get, post } = fetch;
let initCount = 0;
export const init = (params, success = () => {}, error = () => {}) => {
  //   L10001 师资发展管理       管理员、教师（学校领导）
  // 默认权限身份IC0002、IC0010
  // L10002   师资发展培训  教师
  // 默认权限身份IC0011、IC0012、IC0013
  let moduleID = "";
  // 先对params进行判断，是对象还是字符串，字符串就是moduleID，对象就是有很多数据存在里面
  let onlyBase = false; //只要基础信息，不用验证用户，不用登陆功能
  if (!params) {
    //没定义或为null，undefiened,'',false,表示所有人都能进来
    moduleID = "";
  } else if (typeof params === "string") {
    moduleID = params;
  } else if (typeof params === "object") {
    moduleID = params.moduleID || "";
    onlyBase = params.onlyBase || false;
  }
  console.log(params);
  // tokencheck前需要进行基础信息的请求
  initCount++;
  getBasePlatformMsg().then((data) => {
    //data：基础平台信息，object,{BasePlatformAddr}
    // console.log(data)
    if (onlyBase) {
      success({
        basePlatformMsg: data,
        role: {
          type: "visitor",
        },
        userInfo: {},
        termInfo: {},
        systemServer: {},
        identityDetail: {},
      });
      return;
    }

    if (data) {
      // 检查是否是教育局
      let IsEduCenter = false;
      // data.ProductUseRange = 4//测试用
      if (
        data.IsEduCenter
        // ||
        // data.ProductUseRange === 4 ||
        // data.ProductUseRange === 8
      ) {
        IsEduCenter = true;
      }
      TokenCheck({
        //里面进行token验证，用户信息获取，回调返回true才能正常，不然页面初始化失败
        firstLoad: true,
        callback: (userInfo, token) => {
          //有用户信息才能继续下面的工作
          if (userInfo) {
            // 检查锁控,不等于1的时候跳
            // http://192.168.129.1/baseshare/Temp/V23%E7%9B%B8%E5%85%B3%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/%E5%8A%A0%E5%AF%86%E9%94%81%E6%8E%A7%E5%88%B6%E9%9B%86%E6%88%90%E7%9B%B8%E5%85%B3%E6%96%87%E6%A1%A3/%E3%80%90-2%E3%80%91%E4%BA%91%E5%B9%B3%E5%8F%B0%E5%8A%A0%E5%AF%86%E9%94%81%E6%8E%A7%E5%88%B6%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E.pdf
            if (userInfo.LockerState !== "1") {
              window.location.href =
                data.LockerServerRootUrl +
                "/LockerMgr/ErrorTips.aspx?ErrorCode=" +
                userInfo.LockerState;
              return;
            }
            // let SchoolID = userInfo.SchoolID;

            // 教育局不用身份
            let identityDetail = IsEduCenter
              ? {
                  IconUrl: false,
                  IdentityCode: "IC0101",
                  IdentityName: "教育局管理员",
                  IsPreset: true,
                  IsEdu: true, //是true表明不显示身份，undefined等显示
                }
              : getIdentityDetail(moduleID);
            if (IsEduCenter) {
              //教育局的学校ID固定传EduCenterRoot

              userInfo.SchoolID = "EduCenterRoot";
            }
            let termInfo = getTermInfo({
              SchoolID: userInfo.SchoolID || "",
              CollegeID: userInfo.CollegeID || "",
            });
            // termInfo=null
            let systemServer = getSystemServer([
              310, //教学方案
              // 300, //教学方案
              "D21", //精品课程
              "E34", //档案
              "C10", //电子资源
              // todo
              400,//消息中心，教育局现在还没有，去掉
            ]);
            // 多个接口，不能用await阻塞，要用Promise
            // let identityDetail = getPromise(
            //   getIdentityDetail.bind(this, moduleID)
            // );
            // let termInfo = getPromise(
            //   getTermInfo.bind(this, userInfo.SchoolID ? userInfo.SchoolID : "")
            // );
            Promise.all([identityDetail, termInfo, systemServer]).then(
              (res) => {
                let [identityDetail, termInfo, systemServer] = res;
                success({
                  identityDetail,
                  basePlatformMsg: data,
                  userInfo,
                  termInfo,
                  systemServer,
                  token,
                  role: setUnifyRole(userInfo, identityDetail, data),
                });
                SetDataDeliver(moduleID, userInfo.UserID);
              }
            );
          } else {
            error();
          }
        },
      });
    } else {
      //获取基础平台信息失败，进行三次，三次失败就失败了
      if (initCount <= 2) {
        init();
      }
      error();
    }
  });
};
// 传个promise进去，返回promise
const getPromise = (promise) => {
  return new Promise((resolve, reject) => {
    promise().then((res) => {
      resolve(res);
    });
  });
};
//智慧校园大数据采集需求
const SetDataDeliver = (moduleID, userID) => {
  if (!moduleID) {
    return;
  }
  let { BasicWebRootUrl: baseIP } =
    getDataStorage("BasePlatformMsg") instanceof Object
      ? getDataStorage("BasePlatformMsg")
      : {};
  get({
    url: `${baseIP}/Base/GetSingleSubsystemServer?SysID=850&SubjectID=`,
    securityLevel: 1,
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.StatusCode === 200) {
        try {
          listenAppDurationTime(json.Data.WebSvrAddr, "L10", moduleID, userID);
        } catch (e) {
          console.log(e);
        }
        // return res.Data;
      }
    });
};
// 获取子系统的服务器地址信息
/**
 * @description: 获取子系统的服务器地址信息
 * @param {*sysID：额外要求请求的sysid,可为数组或字符串}
 * @return {*}
 */
const getSystemServer = async (sysID) => {
  let { BasicWebRootUrl: baseIP } =
    getDataStorage("BasePlatformMsg") instanceof Object
      ? getDataStorage("BasePlatformMsg")
      : {};
  // 200:个人信息管理系统ID,400为消息中心
  sysID = [200].concat(changeToArray(sysID)).join(","); //处理为数组
  // 先处理，看storage里是否有全部的sysid,
  const result = await get({
    url: `${baseIP}/BaseApi/Global/GetSubSystemsMainServerBySubjectID?appid=L10&access_token=7f0fc0ce1335b77b0f3f944003713e09&subjectID=&sysIDs=${sysID}`,
    securityLevel: 2,
  });
  const res = await result.json();
  if (res.StatusCode === 200) {
    let data = {};
    if (res.Data instanceof Array) {
      res.Data.forEach((child) => {
        data[child.SysID] = child;
      });
    }
    setDataStorage("SubSystemsMainServer", data);
    return data;
  } else {
    return {};
  }
};
/**
 * @description: 处理用户信息，统一角色身份，返回统一后的教育局端、高校端的各种身份
 * @param {*userInfo:后台返回的用户个人信息，*identity：后台返回的身份信息,*baseMsg:平台基础信息}
 * @return {*}
 */
const setUnifyRole = (userInfo, identity, baseMsg) => {
  ////*version:教育局：education，教育局学校：education-school，高校：university,高校学院：university-academy
  // *identityCode:身份code,*identityName:身份名称，*userType:用户类型（旧的身份识别，保留），*userClass：用户类型2
  // baseMsg.ProductUseRange:学校场景
  // 1：单个专业英语院校，
  // 2：单个普通大学，
  // 3：单个中小学校，
  // 4：多个中小学，
  // 5：单个中职学校，
  // 6：单个高职学校，
  // 7：多个大学，
  // 8：多个中职学校，
  // 9：多个高职学校。
  let Role = {
    version: "noPower",
    identityCode: "",
    identityName: "",
    userType: "",
    userClass: "",
  };
  try {
    let { ProductUseRange } = baseMsg;
    let { IdentityCode, IdentityName, IsEdu } = identity;
    Role.userType = parseInt(userInfo.UserType);
    Role.userClass = parseInt(userInfo.UserClass);
    Role.identityCode = IdentityCode;
    Role.identityName = IdentityName;
    ProductUseRange = parseInt(ProductUseRange);
    let version = "noPower";
    // 中小学教育局端没有学校id，用户信息拿到什么就传什么
    let schoolID = userInfo.SchoolID ? userInfo.SchoolID : "";
    // 学院id，大学有用
    let collegeID = userInfo.CollegeID ? userInfo.CollegeID : "";
    // 控制级别：1教育局，2学校，3学院
    let selectLevel = 2;
    // 数字记录组织类型：*1：教育局，*2：大学学校，*3：教育局学校*4大学学院
    let productLevel = 3; //默认为3
    // 根据身份和产品类型判断显示的版本
    switch (ProductUseRange) {
      // 1，2，6：单个大学，为高校版本学校端
      case 1:
      case 2:
      case 6:
      case 9:
        //非学院管理员
        if (IdentityCode !== "IC0008") {
          //学校
          version = "university";
          productLevel = 2;
          selectLevel = 2;
        } else if (IdentityCode === "IC0008") {
          //学院
          version = "university-academy";
          productLevel = 4;

          selectLevel = 3;
        }
        break;
      // 3,5:单个中小学，为教育局版本学校端
      case 3:
      case 5:
        // if (IdentityCode.includes("IC000")) {
        //学校
        version = "education-school";
        selectLevel = 2;
        productLevel = 3;
        // } else {
        //   version = 'noPower'; //无权限进入
        // }
        break;
      // 4,8:多个中小学，为教育局版本教育局端
      case 4:
      case 8:
        version = "education-school";
        selectLevel = 2;
        productLevel = 3;
        //非g管理员
        // IC0101:教育局管理员
        //IC0102:教育局领导
        if (IdentityCode.includes("IC010")) {
          //code之后会有
          //教育局
          version = "education";
          selectLevel = 1;
          productLevel = 1;
        }
        // else if (IdentityCode === "IC0008") {
        //   //教育局
        //   version = "education";
        // }
        // else {
        //   version = 'noPower'; //无权限进入
        // }
        break;
      default:
        version = "noPower";
    }
    // 教育局的
    if (IsEdu) {
      // IC0101:教育局管理员
      //IC0102:教育局领导
      if (IdentityCode.includes("IC010")) {
        //code之后会有
        //教育局
        version = "education";
        selectLevel = 1;
        productLevel = 1;
      }
    }
    // Role.version = version;
    //2,3为学生家长，没有权限进来
    // if (Role.userType === 2 || Role.userType === 3) {
    //   goErrorPage("E011");
    //   return;
    // }
    Role = {
      ...Role,
      IsEdu,
      version,
      isUniversity: version.indexOf("university") !== -1,
      selectLevel,
      collegeID,
      schoolID,
      productLevel,
      frameType:
        Role.userType === 1
          ? "teacher"
          : Role.userType === 2 || Role.userType === 3
          ? ""
          : "default", //教师是没有左侧的，其它的都一样,2,3为学生家长，没有权限进来
      //教师 UserType=1
      level: !version.includes("-") ? 1 : 0,
    };
    // if ( ProductUseRange === 1||) {
    // }
  } catch (e) {
    console.error(e);
  }
  return Role;
};
/**
 * @description: 获取用户身份信息详情
 * @param {*模块id,不传则是所有的都可以}
 * @return {*{IconUrl: "http://192.168.129.1:30101/lgftp/Power/IC0001.png"
              IdentityCode: "IC0001"
              IdentityName: "学校管理员"
              IsPreset: true}}
 */
const getIdentityDetail = async (moduleID = "") => {
  let lg_ic = getQueryVariable("lg_ic"); //获取url上的身份id，
  let identityDetail = getDataStorage("IdentityMsg")
    ? getDataStorage("IdentityMsg")
    : false;
  let identityList = [];
  if (lg_ic) {
    // 使用这个歌，直接校验是否合法
    if (moduleID) {
      let res = await ValidateIdentity(lg_ic, moduleID);
      if (res) {
        identityList = await GetIdentityTypeByCode(lg_ic);
        setDataStorage("IdentityMsg", identityList[0]);
      } else {
        return false;
      }
    } else {
      // 假的
      // identityList = await GetIdentityTypeByCode(lg_ic);
      let data = {
        IconUrl: false,
        IdentityCode: lg_ic || "",
        IdentityName: "普通用户",
        IsPreset: true,
      };
      setDataStorage("IdentityMsg", data);
      return data;
    }

    // 下面的方法废弃
    //存在，进行身份信息获取
    // lg_ic可能有误，要进行用户所拥有的的身份列表验证
    // identityList = await getIdentityList();
    // // identityList.forEach((child) => {});
    // if (
    //   identityList.some((child) => {
    //     return child.IdentityCode === lg_ic;
    //   })
    // ) {
    //   identityList = await GetIdentityTypeByCode(lg_ic);
    // }
    // identityDetail = data[0];
  } else if (identityDetail && identityDetail.IdentityCode) {
    //不存在，获取session上存的身份信息,存在本次用这个
    identityList = [identityDetail];
  } else {
    //不存在，获取该用户的身份列表，拿第一个
    if (
      getDataStorage("IdentityList") instanceof Array &&
      getDataStorage("IdentityList").length > 0
    ) {
      identityList = getDataStorage("IdentityList");
    } else {
      //请求
      identityList = await getIdentityList();
    }
    // if (identityList instanceof Array && identityList.length > 0) {
    //   identityDetail = identityList[0];
    //   setDataStorage("IdentityMsg", identityDetail);
    //   // console.log(identityDetail);
    // }
  }
  identityDetail = await IdentityRecognition(identityList, moduleID);
  identityDetail &&
    window.history.pushState(
      null,
      null,
      replaceIcOfUrl(identityDetail.IdentityCode)
    );
  // console.log(identityDetail);
  return identityDetail;
};
/**
 * @description: 替换urllg_ic
 * @param {*}
 * @return {*url}
 */
const replaceIcOfUrl = (lg_ic) => {
  return addOrgToUrl(window.location.href, "lg_ic", lg_ic);
};
//根据用户身份code获取用户身份详情
const GetIdentityTypeByCode = async (IdentityCodes) => {
  const { SchoolID } = getDataStorage("UserInfo")
    ? getDataStorage("UserInfo")
    : {};
  let { BasicWebRootUrl: baseIP } =
    getDataStorage("BasePlatformMsg") instanceof Object
      ? getDataStorage("BasePlatformMsg")
      : {};
  const result = await get({
    url: `${baseIP}/UserMgr/PowerMgr/GetIdentityTypeByCode?SchoolID=${SchoolID}&IdentityCodes=${IdentityCodes}`,
    securityLevel: 2,
  });
  const res = await result.json();
  if (res.StatusCode === 200) {
    return res.Data;
  }
};
/**
 * @description: 确认身份是否有权限访问该模块，ModuleID不存在就默认能null,IdentityList必须是数组且有值为对象
 * @param {*}
 * @return {*}
 */
const IdentityRecognition = async (
  IdentityList,
  ModuleID = "",
  callBack = () => {}
) => {
  if (!(IdentityList instanceof Array) || IdentityList.length === 0) {
    goErrorPage("E011");
    return false;
  }
  let IdentityMsg = {};
  if (ModuleID) {
    const promiseList = IdentityList.map((i) => {
      const res = ValidateIdentity(i.IdentityCode, ModuleID);
      return res;
    });
    // 需要等所有请求返回
    let res = await Promise.all(promiseList);
    const index = res.findIndex((i) => i === true);
    if (index >= 0) {
      const IdentityItem = IdentityList[index];
      setDataStorage("IdentityMsg", IdentityItem);
      typeof callBack === "function" && callBack(IdentityItem);
      IdentityMsg = IdentityItem;
    } else {
      goErrorPage("E011");
      IdentityMsg = false;
    }
  } else {
    setDataStorage("IdentityMsg", IdentityList[0]);
    typeof callBack === "function" && callBack(IdentityList[0]);
    IdentityMsg = IdentityList[0];
  }
  return IdentityMsg;
};
/**
 * @description: 跳转至错误界面
 * @param {*}
 * @return {*}
 */

const goErrorPage = (errcode) => {
  //  保证这个基础平台的信息是存在才能用
  let { BasicWebRootUrl: baseIP } =
    getDataStorage("BasePlatformMsg") instanceof Object
      ? getDataStorage("BasePlatformMsg")
      : {};
  window.location.href = baseIP + "/Error.aspx?errcode=" + errcode;
};
//模块和身份校验
const ValidateIdentity = async (IdentityCode, ModuleID) => {
  const { UserID } = getDataStorage("UserInfo")
    ? getDataStorage("UserInfo")
    : {};
  let { BasicWebRootUrl: baseIP } =
    getDataStorage("BasePlatformMsg") instanceof Object
      ? getDataStorage("BasePlatformMsg")
      : {};
  const result = await post({
    url: `${baseIP}/UserMgr/PowerMgr/ValidateIdentity`,
    body: {
      IdentityCode,
      ModuleID,
      UserID,
    },
    securityLevel: 2,
  });
  const res = await result.json();
  if (res.StatusCode === 200) {
    return res.Data;
  }
};
/**
 * @description: 获取登陆用户身份列表
 * @param {*}
 * @return {*}
 */
const getIdentityList = async () => {
  const { UserID } = getDataStorage("UserInfo")
    ? getDataStorage("UserInfo")
    : {};
  let { BasicWebRootUrl: baseIP } =
    getDataStorage("BasePlatformMsg") instanceof Object
      ? getDataStorage("BasePlatformMsg")
      : {};
  const result = await get({
    url: `${baseIP}/UserMgr/PowerMgr/GetIdentityTypeByUserID?UserID=${UserID}`,
    securityLevel: 2,
  });
  const res = await result.json();
  if (res.StatusCode === 200) {
    setDataStorage("IdentityList", res.Data);
    return res.Data;
  } else {
    return false;
  }
};
/**
 * @description: 异步，获取基础平台信息
 * @param {*keys:需要判断BasePlatformMsg是否存在这些字段，不匹配就请求}
 * @return {*promise}
 */
export const getBasePlatformMsg = async (keys = []) => {
  let url = BasicProxy + "/Global/GetBaseInfo";
  let BasePlatformMsg = getDataStorage("BasePlatformMsg"); //具体有什么字段这里不做判断，外部判断
  let json = "";
  let isExist = true;
  keys = keys instanceof Array ? keys : [];
  if (BasePlatformMsg && BasePlatformMsg instanceof Object) {
    for (let key in keys) {
      if (BasePlatformMsg[keys[key]] === undefined) {
        isExist = false;
      }
    }
  } else {
    isExist = false;
  }
  if (isExist) {
    json = await new Promise((resolve, reject) => {
      resolve({
        StatusCode: 200,
        Data: BasePlatformMsg,
      });
    });
  } else {
    let res = await get({ url });
    json = await res.json();
  }
  // let json = await pro();
  // let res = await getData(url, 2, "cors", false, false);
  // let json = await res.json();
  if (json.StatusCode === 200) {
    BasePlatformMsg = json.Data;
  } else {
    if (keys.length > 0) {
      BasePlatformMsg = {}; //想获取某个值的时候给空对象
    } else {
      BasePlatformMsg = false; //有错误
    }
    // return ;
  }
  setDataStorage("BasePlatformMsg", json.Data);
  return BasePlatformMsg;
};
/**
 * @description: 异步，获取学年学期,http://192.168.129.1:8033/showdoc/web/#/21?page_id=2085
 * @param {*SchoolID:}
 * @return {*promise}
 */
export const getTermInfo = async ({ SchoolID, CollegeID }) => {
  let url =
    BasicProxy +
    "/Global/GetTermInfo?SchoolID=" +
    SchoolID +
    "&CollegeID=" +
    CollegeID;
  let TermInfo = getDataStorage("TermInfo"); //具体有什么字段这里不做判断，外部判断
  let json = "";
  //  界面第一次加载获取后保存，基本不会出错
  if (TermInfo && TermInfo.TermInfo instanceof Array && TermInfo.length > 0) {
    json = await new Promise((resolve, reject) => {
      resolve({
        StatusCode: 200,
        Data: TermInfo,
      });
    });
  } else {
    let res = await get({ url });
    json = await res.json();
  }
  // let json = await pro();
  // let res = await getData(url, 2, "cors", false, false);
  // let json = await res.json();
  if (json.StatusCode === 200) {
    TermInfo = json.Data;
  } else {
    TermInfo = { TermInfo: [], HasHistory: false }; //有错误
  }
  // console.log(TermInfo)
  // if(!(json.Data instanceof Array)&&)
  setDataStorage("TermInfo", TermInfo);
  return TermInfo;
};
