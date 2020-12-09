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
 * @LastEditTime: 2020-12-09 13:53:02
 * @Description:
 * @FilePath: \teacher-development\src\api\recruit.js
 */
import fetch from "../util/fetch";
import ipConfig from "../util/ipConfig";
let { BasicProxy } = ipConfig;
export function getCruitList(payload = {}) {
  let { pageIndex, pageSize, keyword } = payload;
  let url =
  BasicProxy +`/UserMgr/PowerMgr/GetIdentityTypeByCode?SchoolID=S27-511-AF57&IdentityCodes=IC0010`
    // "?" +
    // (pageIndex ? "pageIndex=" + pageIndex : "") +
    // (keyword ? "&keyword=" + keyword : "") +
    // (pageSize ? "&pageSize=" + pageSize : "");
  return fetch.get({ url, securityLevel: 2 }).then(res=>res.json()).then(json=>{
      return {StatusCode:json.StatusCode,data:{
        list:  [
            {
              key: 0,
              index: "011111111111111",
              title:
                "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
              source: "辖区教育局辖区教育局辖区教育局",
              publisher: "祝泽森祝泽森祝泽森",
              time: "2020-08-29 13:59 020-08-29 13:59",
            },
            {
              key: 1,
              index: "02",
              title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
              source: "辖区教育局",
              publisher: "祝泽森",
              time: "2020-08-29 13:59",
            },
            {
              key: 2,
              index: "03",
              title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
              source: "辖区教育局",
              publisher: "祝泽森",
              time: "2020-08-29 13:59",
            },
            {
              key: 3,
              index: "02",
              title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
              source: "辖区教育局",
              publisher: "祝泽森",
              time: "2020-08-29 13:59",
            },
            {
              key: 4,
              index: "03",
              title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
              source: "辖区教育局",
              publisher: "祝泽森",
              time: "2020-08-29 13:59",
            },
            {
              key: 5,
              index: "02",
              title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
              source: "辖区教育局",
              publisher: "祝泽森",
              time: "2020-08-29 13:59",
            },
            {
              key: 6,
              index: "03",
              title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
              source: "辖区教育局",
              publisher: "祝泽森",
              time: "2020-08-29 13:59",
            },
            {
              key: 7,
              index: "02",
              title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
              source: "辖区教育局",
              publisher: "祝泽森",
              time: "2020-08-29 13:59",
            },
            {
              key: 8,
              index: "03",
              title: "2020年广州市白云区中小学及幼儿园聘任制教师招聘320名计划",
              source: "辖区教育局",
              publisher: "祝泽森",
              time: "2020-08-29 13:59",
            },
          ],
        total: 30,
        pageSize: pageSize,
        pageIndex: pageIndex,
      }}
  });
}
