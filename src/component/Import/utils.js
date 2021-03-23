import { fetch } from "whatwg-fetch";

import Fetch from "@/util/fetch";

import CONFIG from "@/util/ipConfig";

let { post: postData } = Fetch;
const Api = CONFIG.Import;

//const Api = 'http://192.168.2.202:7300/mock/5d7726e0ed0ccd1564c8df05/webCloudDev';

const AlertShow = (that) => {
  that.setState({
    AlertObj: {
      ...that.state.AlertObj,

      Show: true,
    },
  });
};

const AlertHide = (that) => {
  that.setState({
    AlertObj: {
      ...that.state.AlertObj,

      Show: false,
    },
  });
};

//成功弹窗
const AlertSuccess = ({ that, title = "", hide }) => {
  that.setState({
    AlertObj: {
      ...that.state.AlertObj,

      Show: true,

      Type: "success",

      Title: title,

      Hide: hide
        ? () => {
            return hide;
          }
        : () => {
            AlertHide(that);
          },
    },
  });
};

//错误弹窗
const AlertError = ({ that, title = "", ok, cancel, close }) => {
  that.setState({
    AlertObj: {
      ...that.state.AlertObj,

      Show: true,

      Type: "btn-error",

      Title: title,

      Ok: ok
        ? () => {
            return ok;
          }
        : () => {
            AlertHide(that);
          },

      Cancel: cancel
        ? () => {
            return cancel;
          }
        : () => {
            AlertHide(that);
          },

      Close: close
        ? () => {
            return close;
          }
        : () => {
            AlertHide(that);
          },
    },
  });
};

//警告弹窗
const AlertWarn = ({ that, title = "", ok, cancel, close }) => {
  that.setState({
    AlertObj: {
      ...that.state.AlertObj,

      Show: true,

      Type: "btn-warn",

      Title: title,

      Ok: ok
        ? () => {
            return ok;
          }
        : () => {
            AlertHide(that);
          },

      Cancel: cancel
        ? () => {
            return cancel;
          }
        : () => {
            AlertHide(that);
          },

      Close: close
        ? () => {
            return close;
          }
        : () => {
            AlertHide(that);
          },
    },
  });
};

//询问弹窗
const AlertQuery = ({ that, title = "", ok, cancel, close }) => {
  that.setState({
    AlertObj: {
      ...that.state.AlertObj,

      Show: true,

      Type: "btn-query",

      Title: title,

      Ok: ok
        ? () => {
            return ok;
          }
        : () => {
            AlertHide(that);
          },

      Cancel: cancel
        ? () => {
            return cancel;
          }
        : () => {
            AlertHide(that);
          },

      Close: close
        ? () => {
            return close;
          }
        : () => {
            AlertHide(that);
          },
    },
  });
};

//获取ftp的资源路径

const GetFtpPath = async (that) => {
  const Result = await fetch(Api + "/Global/GetResHttpServerAddr", {
    method: "get",
  });

  const Res = await Result.json();

  if (Res.StatusCode === 200) {
    return Res.Data;
  } else {
    AlertError({ title: "资源站点获取失败！", that });

    that.setState({ Step: 1, UpLoadFileName: "请选择文件...", UpLoadFile: "" });

    that.Input.value = "";
  }
};

//使用上传头像

const UpLoadPhoto = async ({ FtpPath, FileName, Skip = 0, that }) => {
  const UserType = that.state.ImportTarget;

  const File = that.state.UpLoadFile;

  const BlockSize = that.state.BlockSize;

  let formData = new FormData(); //2MB

  //总片数
  let totalCount = Math.ceil(File.size / BlockSize);

  //查找到要上传的分块的最大的值。
  let nextSize = Math.min((Skip + 1) * BlockSize, File.size);

  //这一块的内容
  let fileData = File.slice(Skip * BlockSize, nextSize);

  formData.append("file", fileData);

  formData.append("userType", UserType);

  formData.append("fileName", FileName);

  formData.append("method", "upload");

  try {
    let fetchAsync = "";

    try {
      fetchAsync = await fetch(FtpPath + "ImportPhoto.ashx", {
        method: "POST",
        body: formData,
      });
    } catch (e) {
      AlertError({ title: "上传出错！", that });

      that.setState({
        Step: 1,
        UpLoadFileName: "请选择文件...",
        UpLoadFile: "",
      });

      that.Input.value = "";

      return { ErrCode: -1 };
    }

    let json = await fetchAsync.json();

    if (json.Status !== 200) {
      AlertError({ title: json.Message, that });

      that.setState({
        Step: 1,
        UpLoadFileName: "请选择文件...",
        UpLoadFile: "",
      });

      that.Input.value = "";

      return;
    } else {
      let percent = Math.floor(((Skip + 1) / totalCount) * 100);

      that.setState({ UpLoadPercent: percent }, () => {
        if (Skip + 1 === totalCount) {
          BackEndUnCompress({ FileName, FtpPath, that });

          return;
        }

        UpLoadPhoto({ Skip: ++Skip, that, FileName, FtpPath });
      });
    }
  } catch (e) {
    AlertError({ title: "上传出错！", that });

    that.setState({ Step: 1, UpLoadFileName: "请选择文件...", UpLoadFile: "" });

    that.Input.value = "";

    return;
  }
};

//让后台解压

const BackEndUnCompress = async ({ FileName, FtpPath, that }) => {
  const token = sessionStorage.getItem("token");

  const UserType = that.state.ImportTarget;

  var formData = new FormData();

  formData.append("token", token);

  formData.append("userType", UserType);

  formData.append("fileName", FileName);

  formData.append("method", "uncompress");

  that.setState({ Step: 3 });

  try {
    let fetchAsync = "";

    try {
      fetchAsync = await fetch(FtpPath + "/ImportPhoto.ashx", {
        method: "post",
        body: formData,
      });
    } catch (e) {
      console.log(e);

      AlertError({ title: "解压校对失败！", that });

      that.setState({
        Step: 1,
        UpLoadFileName: "请选择文件...",
        UpLoadFile: "",
      });

      that.Input.value = "";
    }

    let json = await fetchAsync.json();

    if (json.Status !== 200) {
      AlertError({ title: json.Message, that });

      that.setState({
        Step: 1,
        UpLoadFileName: "请选择文件...",
        UpLoadFile: "",
      });

      that.Input.value = "";
    } else {
      that.setState({ UpLoadResult: json.Data }, () => {
        that.setState({ Step: 4 });

        if (window.opener && json.Data.Total > json.Data.Error) {
          window.opener.location.reload();
        }
      });
    }
  } catch (e) {
    AlertError({ title: "解压校对失败！", that });

    that.setState({ Step: 1, UpLoadFileName: "请选择文件...", UpLoadFile: "" });

    that.Input.value = "";
  }
};

//使用fetch上传文件

const FileUpLoad = async ({ Url = Api + "/import/upload", formData, that }) => {
  const result = await fetch(Url, { method: "POST", body: formData });

  const res = await result.json();

  if (res.StatusCode === 200) {
    return res.Data;
  } else {
    that.setState({ Step: 1, UpLoadFile: "", UpLoadFileName: "请选择文件..." });

    that.Input.value = "";

    AlertError({ title: res.Msg, that });
  }
};

//提交

const LastStepCommit = async ({
  cols,
  colNames,
  fileName,
  userId,
  userName,
  token,
  tbName,
  contentStartNum,
  schoolID,
  that,
}) => {
  //const result = await fetch(Api+'/import/import',{method :"POST",body:JSON.stringify({...cols,colNames,fileName,userId,userName,token,tbName,contentStartNum,schoolID})});

  const result = await postData({
    url: Api + "/import/import",
    body: {
      ...cols,
      colNames,
      fileName,
      userId,
      userName,
      token,
      tbName,
      contentStartNum,
      schoolID,
    },
    securityLevel: 1,
  });

  const res = await result.json();

  if (res.StatusCode === 200) {
    return res.Data;
  } else {
    AlertError({ title: res.Msg, that });
  }
};

//删除线上文件

const DeleteFile = async ({
  fileName,
  userId,
  userName,
  token,
  schoolID,
  that,
}) => {
  const result = await postData({
    url: Api + "/import/delete",
    body: { fileName, userId, userName, token, schoolID },
    securityLevel: 1,
    // header: { "Content-Type": "urlencoded" },
  });

  const res = await result.json();

  if (res.StatusCode === 200) {
    return res.ErrCode;
  } else {
    AlertError({ title: res.Msg, that });
  }
};

//分解对象合并

const ObjJoin = (obj) => {
  let str = "";

  for (let item in obj) {
    str = str + `${item}=${obj[item]}&`;
  }

  return str;
};

//序列化array
Array.prototype.serializeObject = function (lName) {
  var o = {};
  var $t = this;
  for (var i = 0; i < $t.length; i++) {
    for (var item in $t[i]) {
      o[lName + "[" + i + "]." + item.toString()] = $t[i][item].toString();
    }
  }
  return o;
};

//生成一个uuID
const uuID = () => {
  let s = [];

  let hexDigits = "0123456789abcdef";

  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }

  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010

  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01

  s[8] = s[13] = s[18] = s[23] = "-";

  let uuID = s.join("");

  return uuID;
};

export default {
  AlertShow,

  AlertHide,

  AlertError,

  AlertQuery,

  AlertSuccess,

  AlertWarn,

  FileUpLoad,

  LastStepCommit,

  DeleteFile,

  UpLoadPhoto,

  uuID,

  GetFtpPath,
};
