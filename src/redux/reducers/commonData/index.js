/*
 *           佛曰:
 *                   写字楼里写字间，写字间里程序员；
 *                   程序人员写程序，又拿程序换酒钱。
 *                   酒醒只在网上坐，酒醉还来网下眠；
 *                   酒醉酒醒日复日，网上网下年复年。
 *                   但愿老死电脑间，不愿鞠躬老板前；
 *                   奔驰宝马贵者趣，公交自行程序员。
 *                   别人笑我忒疯癫，我笑自己命太贱；
 *                   不见满街漂亮妹，哪个归得程序员？
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-11-17 14:10:48
 * @LastEditTime: 2021-04-28 15:17:28
 * @Description:
 * @FilePath: \teacher-development\src\redux\reducers\commonData\index.js
 */

import { commonActions } from "../../actions";
const commonData = (
  state = {
    alert: false,
    leftMenu: [],

    // params: [
    //   { key: "publish", title: "发布招聘计划" },
    //   { key: "edit", title: "发布招聘计划" },
    // ],
    userInfo: {},
    identity: {},
    basePlatFormMsg: {},
    roleMsg: {},
    termInfo: {
      HasHistory: false,
      TermInfo: [],
    },
    levelHash: {
      1: {
        productLevel: 1,
        selectLevel: 1,
        title: "区域",
        sub: "学段", //教师基础信息文字显示
        belong: "学校", //选择教师下级
        belongBefore: "所属", //选择教师前缀
        belondName: "SchoolName", //教师画像获取接口所属的属性
        ganger: "学段", //班主任班级管理统计,
        nextProductLevel: 3, //下级的产品级别
        nextSelectLevel: 3, //下级的选择级别
        nextTitle: "学校", //下级名称
        middleTitleName:'一级教师',//大学和中小学这个学历职称有些不一样
        typeName:'类型',//在历年弹窗有选择的时候的文案
      },
      2: {
        productLevel: 2,
        selectLevel: 2,
        title: "学校",
        sub: "学院",
        belong: "学院",
        belongBefore: "所属", //选择教师前缀
        belondName: "CollegeName",
        ganger: "年级",
        nextProductLevel: 4, //下级的产品级别
        nextSelectLevel: 3, //下级的选择级别
        nextTitle: "学院", //下级名称
        middleTitleName:'副教授',//大学和中小学这个学历职称有些不一样
        typeName:'学院',//在历年弹窗有选择的时候的文案

      },
      3: {
        productLevel: 3,
        selectLevel: 2,
        title: "学校",
        sub: "学科",
        belongBefore: "所教", //选择教师前缀
        belong: "学科",
        belondName: "SubjectNames",
        ganger: "年级",
        middleTitleName:'一级教师',//大学和中小学这个学历职称有些不一样
        typeName:'学科',//在历年弹窗有选择的时候的文案

      },
      4: {
        productLevel: 4,
        selectLevel: 3,
        title: "学院",
        sub: "教研室",
        belongBefore: "所属", //选择教师前缀

        belong: "教研室",
        belondName: "CroupName",
        ganger: "年级",
        middleTitleName:'副教授',//大学和中小学这个学历职称有些不一样
        typeName:'教研室',//在历年弹窗有选择的时候的文案

      },
    },
    contentHW: { height: 0, width: 0 },
    systemServer: {},
    StandardRadio:{
      // 标准
    // 高中教职工与学生比为1：12.5、初中为1：13.5、小学为1：19。
    // 中职为1：20（尽量达到1:16）、高职为1:18、高校为：1:18。
    // 幼儿园1:7（1:5~1:10）。
    // 以NodeID判断是什么学段
    // 0：幼儿园，1：小学，2：初中，3：高中，4：中职，5：高职，6：大学
      0: 7,
      1: 19,
      2: 13.5,
      3: 12.5,
      4: 20,
      5: 18,
      6: 18,
    }
  },
  actions
) => {
  switch (actions.type) {
    case commonActions.COMMON_SET_COMMON_DATA:
      return Object.assign({}, state, actions.data);
    case commonActions.COMMON_SET_TERM_INFO:
      return Object.assign({}, state, {
        termInfo: actions.data,
      });
    case commonActions.COMMON_SET_LEFT_MENU:
      return Object.assign({}, state, {
        leftMenu: actions.data,
      });
    case commonActions.COMMON_SET_CONTENT_HW:
      return Object.assign({}, state, {
        contentHW: { ...state.contentHW, ...actions.data },
      });
    case commonActions.COMMON_SET_TEST:
      return Object.assign({}, state, {
        alert: true,
      });
    case commonActions.COMMON_SET_IDENTITY:
      return Object.assign({}, state, {
        identity: actions.data,
      });
    case commonActions.COMMON_SET_USER_INFO:
      return Object.assign({}, state, {
        userInfo: actions.data,
      });
    case commonActions.COMMON_SET_BASE_PLAT_FORM_MSG:
      return Object.assign({}, state, {
        basePlatFormMsg: actions.data,
      });
    case commonActions.COMMON_SET_ROLE_MSG:
      return Object.assign({}, state, {
        roleMsg: actions.data,
      });
    case commonActions.COMMON_SET_SYSTEM_SERVER:
      return Object.assign({}, state, {
        systemServer: actions.data,
      });
    default:
      return state;
  }
};
export default commonData;
