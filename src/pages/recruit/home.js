/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑       永不宕机     永无BUG
 *
 *        佛曰:
 *                写字楼里写字间，写字间里程序员；
 *                程序人员写程序，又拿程序换酒钱。
 *                酒醒只在网上坐，酒醉还来网下眠；
 *                酒醉酒醒日复日，网上网下年复年。
 *                但愿老死电脑间，不愿鞠躬老板前；
 *                奔驰宝马贵者趣，公交自行程序员。
 *                别人笑我忒疯癫，我笑自己命太贱；
 *                不见满街漂亮妹，哪个归得程序员？
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-12-07 16:08:21
 * @LastEditTime: 2020-12-07 16:31:58
 * @Description:
 * @FilePath: \teacher-development\src\pages\recruit\home.js
 */

import {
  connect,
 
} from "react-redux";
import React, {
  // useCallback,
  memo,
//   useEffect,
  // useState,
  // useImperativeHandle,
  // useRef,
  forwardRef,
} from "react";
import "./index.scss";
import { withRouter } from "react-router-dom";
import  {handleActions} from '../../redux/actions'
//   import { NavLink } from "react-router-dom";
function Home(props, ref) {
  console.log(props);
  let {teacherRecruitMsg:{
      tabId
  },history,dispatch} = props

  return <div className="Recruit-home">home
  <div style={{height:'20px',width:'100px',background:'#a6a6a6'}} onClick={()=>{
      history.push(`/${tabId}/publish`  );
      dispatch(handleActions.setTeacherRecruitMsg({tabName:'发布招聘计划'}))
  }}></div>
  </div>;
}

const mapStateToProps = (state) => {
  let {
    handleData: { teacherRecruitMsg },commonData:{roleMsg}
  } = state;
  return {teacherRecruitMsg,roleMsg};
};
export default connect(mapStateToProps)(withRouter(memo(forwardRef(Home))));
