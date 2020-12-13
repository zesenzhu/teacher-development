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
 * @LastEditTime: 2020-12-11 09:33:42
 * @Description:
 * @FilePath: \teacher-development\src\redux\reducers\commonData\index.js
 */
import Icon_1 from "./images/icon-select-1.png";
import Icon_2 from "./images/icon-select-2.png";
import Icon_3 from "./images/icon-select-3.png";
import Icon_4 from "./images/icon-select-4.png";
import Icon_5 from "./images/icon-select-5.png";
import { commonActions } from "../../actions";
const commonData = (
  state = {
    alert: false,
    leftMenu: [
      {
        key: "teacherBaseMsg",
        name: "师资统计分析",
        icon: Icon_1,
        children: [
          {
            key: "teacherBaseMsg",
            name: "教师基本信息",
          },
          {
            key: "workMsg",
            name: "教师工作量",
          },
          {
            key: "teachingAbility",
            name: "教师教学能力",
          },
          {
            key: "informationizeAbility",
            name: "教师信息化能力",
          },
          {
            key: "schoolResource",
            name: "各校师资",
          },
        ],
      },
      {
        key: "teacherPersona",
        name: "教师画像查询",
        icon: Icon_2,
        children: [],
      },
      {
        key: "teacherRecruit",
        name: "教师招聘计划管理",
        icon: Icon_3,
        children: [],
        // 除了左侧菜单的其它合法一级路由,打开这个路由，左侧会对应打开所属的节点
        params: [
          { key: "publishRecruit", title: "发布招聘计划" },
          { key: "editRecruit", title: "编辑招聘计划" },
          { key: "recruitDetail", title: "招聘计划详情" },
        ],
      },
      {
        key: "teacherTrain",
        name: "教师培训计划管理",
        icon: Icon_4,
        children: [],
      },
      { key: "notice", name: "通知公告", icon: Icon_5, children: [] },
    ],

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
