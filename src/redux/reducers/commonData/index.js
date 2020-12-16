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
 * @LastEditTime: 2020-12-15 16:15:27
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
    contentHW: { height: 0, width: 0 },
  },
  actions
) => {
  switch (actions.type) {
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

    default:
      return state;
  }
};
export default commonData;
