/*
 *                                |~~~~~~~|
 *                                |       |
 *                                |       |
 *                                |       |
 *                                |       |
 *                                |       |
 *     |~.\\\_\~~~~~~~~~~~~~~xx~~~         ~~~~~~~~~~~~~~~~~~~~~/_//;~|
 *     |  \  o \_         ,XXXXX),                         _..-~ o /  |
 *     |    ~~\  ~-.     XXXXX`)))),                 _.--~~   .-~~~   |
 *      ~~~~~~~`\   ~\~~~XXX' _/ ';))     |~~~~~~..-~     _.-~ ~~~~~~~
 *               `\   ~~--`_\~\, ;;;\)__.---.~~~      _.-~
 *                 ~-.       `:;;/;; \          _..-~~
 *                    ~-._      `''        /-~-~
 *                        `\              /  /
 *                          |         ,   | |
 *                           |  '        /  |
 *                            \/;          |
 *                             ;;          |
 *                             `;   .       |
 *                             |~~~-----.....|
 *                            | \             \
 *                           | /\~~--...__    |
 *                           (|  `\       __-\|
 *                           ||    \_   /~    |
 *                           |)     \~-'      |
 *                            |      | \      '
 *                            |      |  \    :
 *                             \     |  |    |
 *                              |    )  (    )
 *                               \  /;  /\  |
 *                               |    |/   |
 *                               |    |   |
 *                                \  .'  ||
 *                                |  |  | |
 *                                (  | |  |
 *                                |   \ \ |
 *                                || o `.)|
 *                                |`\\) |
 *                                |       |
 *                                |       |
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-11-17 14:14:26
 * @LastEditTime: 2020-12-22 16:33:43
 * @Description:
 * @FilePath: \teacher-development\src\redux\actions\commonActions.js
 */
import Icon_1 from "./images/icon-select-1.png";
import Icon_2 from "./images/icon-select-2.png";
import Icon_3 from "./images/icon-select-3.png";
import Icon_4 from "./images/icon-select-4.png";
import Icon_5 from "./images/icon-select-5.png";
const leftMenu_1 = [
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
        params: [{ key: "schoolDetail", title: "学校详情" }],
      },
    ],
  },
  {
    key: "teacherPersonal",
    name: "教师画像查询",
    icon: Icon_2,
    children: [],
    params: [{ key: "personalDetail", title: "教师画像详情" }],
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
    params: [
      { key: "publishTrain", title: "发布培训计划" },
      { key: "editTrain", title: "编辑培训计划" },
      { key: "trainDetail", title: "培训计划详情" },
    ],
  },
  { key: "notice", name: "通知公告", icon: Icon_5, children: [] },
  { key: "import", name: "导入师资信息", icon: Icon_5, children: [] },
];
const leftMenu_0 = [
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
      // {
      //   key: "schoolResource",
      //   name: "各校师资",
      // },
    ],
  },
  {
    key: "teacherPersonal",
    name: "教师画像查询",
    icon: Icon_2,
    children: [],
    params: [{ key: "personalDetail", title: "教师画像详情" }],
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
    params: [
      { key: "publishTrain", title: "发布培训计划" },
      { key: "editTrain", title: "编辑培训计划" },
      { key: "trainDetail", title: "培训计划详情" },
    ],
  },
  { key: "notice", name: "通知公告", icon: Icon_5, children: [] },
  { key: "import", name: "导入师资信息", icon: Icon_5, children: [] },
];
const COMMON_SET_TEST = "COMMON_SET_TEST";
const COMMON_SET_IDENTITY = "COMMON_SET_IDENTITY";
const COMMON_SET_USER_INFO = "COMMON_SET_USER_INFO";
const COMMON_SET_BASE_PLAT_FORM_MSG = "COMMON_SET_BASE_PLAT_FORM_MSG";
const COMMON_SET_ROLE_MSG = "COMMON_SET_ROLE_MSG";
const COMMON_SET_TERM_INFO = "COMMON_SET_TERM_INFO";
const COMMON_SET_CONTENT_HW = "COMMON_SET_CONTENT_HW";
const COMMON_SET_SYSTEM_SERVER = "COMMON_SET_SYSTEM_SERVER";
// 设置左侧菜单
const COMMON_SET_LEFT_MENU = "COMMON_SET_LEFT_MENU";
// *type:0教育局的学校，大学的学院，1教育局，大学的学校，默认0
// haveTeach:是否有教务，有就不显示导入
const SetLeftMenu = (type = 0, haveNotice = true, haveTeach = true) => {
  return (dispatch, getState) => {
    let leftMenu = type === 1 ? leftMenu_1 : leftMenu_0;
    switch (type) {
      case 0:
        leftMenu = leftMenu_0; //学院或中小学学校

        break;
      case 1:
        leftMenu = leftMenu_1; //加各校师资，教育局

        break;
      case 2:
        leftMenu_1[0].children[4].name = "各院师资";
        leftMenu_1[0].children[4].params[0].title = "学院详情";
        leftMenu = leftMenu_1; //各校师资改为各院，大学

        break;
      default:
        leftMenu = leftMenu_0;
    }
    if (!haveNotice) {
      leftMenu = leftMenu.filter((c) => c.key !== "notice");
    }
    if (haveTeach) {
      leftMenu = leftMenu.filter((c) => c.key !== "import");
    }
    dispatch({
      type: COMMON_SET_LEFT_MENU,
      data: leftMenu,
    });
  };
};
// 统一修改common,有风险，快捷
const COMMON_SET_COMMON_DATA = "COMMON_SET_COMMON_DATA";
const SetCommonData = (data) => {
  return (dispatch, getState) => {
    let { commonData } = getState();
    dispatch({
      type: COMMON_SET_COMMON_DATA,
      data: { ...commonData, ...data },
    });
  };
};
const actions = {
  COMMON_SET_COMMON_DATA,
  SetCommonData,
  COMMON_SET_TERM_INFO,
  COMMON_SET_TEST,
  COMMON_SET_USER_INFO,
  COMMON_SET_BASE_PLAT_FORM_MSG,
  COMMON_SET_IDENTITY,
  COMMON_SET_ROLE_MSG,
  COMMON_SET_CONTENT_HW,
  COMMON_SET_SYSTEM_SERVER,
  COMMON_SET_LEFT_MENU,
  SetLeftMenu,
};
export default actions;
