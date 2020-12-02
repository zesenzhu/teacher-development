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
 * @LastEditTime: 2020-11-27 17:52:04
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
} from "./public";
import fetch from "./fetch";
let { BasicProxy } = config;
let { get, post } = fetch;
let initCount = 0;
export const init = (moduleID = "", success = () => {}, error = () => {}) => {
  // tokencheck前需要进行基础信息的请求
  initCount++;
  getBasePlatformMsg().then((data) => {
    //data：基础平台信息，object,{BasePlatformAddr}
    if (data) {
      TokenCheck({
        //里面进行token验证，用户信息获取，回调返回true才能正常，不然页面初始化失败
        firstLoad: true,
        callback: async (userInfo) => {
          //有用户信息才能继续下面的工作
          if (userInfo) {
            let identityDetail = await getIdentityDetail(moduleID);
            success({ identityDetail, basePlatformMsg: data, userInfo });
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
/**
 * @description: 获取用户身份信息详情
 * @param {*}
 * @return {*}
 */
const getIdentityDetail = async (moduleID = "") => {
  let lg_ic = getQueryVariable("lg_ic"); //获取url上的身份id，
  let identityDetail = getDataStorage("IdentityMsg")
    ? getDataStorage("IdentityMsg")
    : false;
  let identityList = [];
  if (lg_ic) {
    //存在，进行身份信息获取
    identityList = await GetIdentityTypeByCode(lg_ic);
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
  identityDetail = IdentityRecognition(identityList, moduleID);
  identityDetail &&
    window.history.pushState(
      null,
      null,
      replaceIcOfUrl(identityDetail.IdentityCode)
    );
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
  let { WebRootUrl: baseIP } =
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
const IdentityRecognition = (
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
    const promiseList = IdentityList.map(async (i) => {
      const res = await ValidateIdentity(i.IdentityCode, ModuleID);

      return res;
    });
    // 需要等所有请求返回
    Promise.all(promiseList).then((res) => {
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
    });
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
  let { WebRootUrl: baseIP } =
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
  let { WebRootUrl: baseIP } =
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
  let { WebRootUrl: baseIP } =
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
  let url = BasicProxy + "/Global/GetBaseInfoForPages";
  let BasePlatformMsg = getDataStorage("BasePlatformMsg"); //具体有什么字段这里不做判断，外部判断
  let json = "";
  let isExist = true;
  keys = keys instanceof Array ? keys : [];
  if (BasePlatformMsg instanceof Object) {
    for (let key in keys) {
      if (BasePlatformMsg[key] === undefined) {
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
    BasePlatformMsg = false; //有错误
  }
  setDataStorage("BasePlatformMsg", json.Data);

  return BasePlatformMsg;
};
