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
 * @Date: 2020-11-18 15:41:25
 * @LastEditTime: 2020-12-10 08:59:14
 * @Description:
 * @FilePath: \teacher-development\src\util\ipConfig.js
 */

let config = {};

const host = window.location.host;

const pathName = window.location.pathname;

const protocol = window.location.protocol;

let pathFolder = "";

if (pathName.includes("/html/")) {
  pathFolder = pathName.split("/html/")[0];
} else if (pathName.includes(".html")) {
  let strArr = window.location.pathname.split(".html")[0].split("/");

  strArr.pop();

  pathFolder = strArr.join("/");
} else {
  pathFolder = pathName;
}

const RootUrl = protocol + "//" + host + pathFolder;
if (process.env.NODE_ENV === "development") {
  // 129.64:20103/Web_TeacherGrow/
  //  129.1:8023
  let baseIP = 'http://192.168.129.1:10103/web_teachergrow';//基础平台服务器
  // let baseIP = 'http://129.64:20103/Web_TeacherGrow';//中小学服务器
  // let baseIP = 'http://192.168.129.182:10103/Web_Teachergrow';//大学服务器
  config = {
    TokenProxy: baseIP+"",
    // TokenProxy:'http://47.115.20.102:10102',
    proxy:
      "http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev",
    BasicProxy: baseIP+"",
    EditorProxy: "/UEditor/",
    LoginProxy: "http://192.168.129.1:30103",

    ErrorProxy: "http://192.168.129.1:30103",
    HashPrevProxy: RootUrl,
    RootProxy: RootUrl,
  };
}

if (process.env.NODE_ENV === "production") {
  config = {
    // TokenProxy: "",

    // BasicProxy: "",
    // LoginProxy: "",

    // ErrorProxy: "",
    TokenProxy: "",
    // TokenProxy:'http://47.115.20.102:10102',
    proxy:
      "http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev",
    BasicProxy: RootUrl,
    LoginProxy: RootUrl,
    EditorProxy: "/UEditor/",

    ErrorProxy: "http://192.168.129.1:30103",
    HashPrevProxy: RootUrl,
    RootProxy: RootUrl,
  };
  console.log = ()=>{}
}

export default config;
