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
 * @LastEditTime: 2020-12-07 16:27:28
 * @Description:
 * @FilePath: \teacher-development\src\redux\actions\handleActions.js
 */
// ?????????????????????
const COMMON_SET_TEACHER_RECRUIT_MSG = "COMMON_SET_TEACHER_RECRUIT_MSG";
const setTeacherRecruitMsg = (data) => {
  return (dispatch, getProp) => {
    dispatch({ type: COMMON_SET_TEACHER_RECRUIT_MSG, data });
  };
};
// ???????????????tab
const COMMON_SET_ACTIVE_TAB = "COMMON_SET_ACTIVE_TAB";
const setActiveTab = (data) => {
  return (dispatch, getProp) => {
    dispatch({ type: COMMON_SET_ACTIVE_TAB, data });
  };
};

// ??????tab??????????????????id????????????tab
const HANDLE_SET_TAB_MSG = "HANDLE_SET_TAB_MSG";
const setTabMsg = (data) => {
  return (dispatch, getProp) => {
    dispatch({ type: HANDLE_SET_TAB_MSG, data });
  };
};
const actions = {
  setTabMsg,
  HANDLE_SET_TAB_MSG,

  COMMON_SET_ACTIVE_TAB,
  setActiveTab,

  COMMON_SET_TEACHER_RECRUIT_MSG,
  setTeacherRecruitMsg,
};
export default actions;
