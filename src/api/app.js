import fetch from "../util/fetch";
import ipConfig from "../util/ipConfig";
import moment from 'moment'
let { BasicProxy } = ipConfig;

export function getLastTime(payload = {}) {
    // *RStatus:状态：0草稿；1正式发布
    let { schoolID, collegeID, selectLevel, term } = payload;
    let url =
      BasicProxy +
      `/Global/GetLastTime`;
   
    return fetch
      .get({ url, securityLevel: 2 })
      .then((res) => res.json())
      .then((json) => {
        // if (json.StatusCode === 200) {
          return moment(json.Data ? json.Data : new Date()).format('YYYY-MM-DD mm:ss');
        // } else {
        //   return false;
        // }
      });
  }


  export function executeDataCollect(payload = {}) {
    // *RStatus:状态：0草稿；1正式发布
    let { schoolID, collegeID, selectLevel, term } = payload;
    let url =
      BasicProxy +
      `/Global/ExecuteDataCollect`;
   
    return fetch
      .get({ url, securityLevel: 2 })
      .then((res) => res.json())
      .then((json) => {
        // if (json.StatusCode === 200) {
          return moment(json.Data ? json.Data : new Date()).format('YYYY-MM-DD mm:ss');
        // } else {
        //   return false;
        // }
      });
  }