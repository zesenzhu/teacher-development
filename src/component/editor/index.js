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
 * @Date: 2020-12-08 13:54:00
 * @LastEditTime: 2020-12-14 20:12:52
 * @Description:招聘和培训共用的编辑区域组件，发布编辑
 * @FilePath: \teacher-development\src\component\editor\index.js
 */

import React, {
  useCallback,
  memo,
  useEffect,
  useState,
  // useImperativeHandle,
  // useMemo,
  // useReducer,
  // createContext,
  // useContext,
  //   useRef,
  forwardRef,
} from "react";
import "./index.scss";
import { Input, Spin } from "antd";
import { Tip } from "../common";
import useDetailRequest from "../../hooks/useDetailRequest";
import $ from "jquery";
import {
  checkInput,
  autoAlert,
  constructFileType,
  calculateFileSize,
  getToken,
  getDataStorage,
} from "../../util/public";
import { getRecruitDetail } from "../../api/recruit";
import moment from "moment";
import SparkMD5 from "spark-md5";
const { TextArea } = Input;
function Editor(props, ref) {
  // type:分招聘和培训，*recruit：招聘，*train:培训
  // schema:模式，分发布publish和编辑edit两种，默认发布，
  let {
    className,
    type,
    schema,
    preview,
    draft,
    cancel,
    fileid,
    publish,
    // 文件上传使用
    schoolId,
    error,
    ...reset
  } = props;
  type = type || "recruitment";
  // 标题
  const [title, setTitle] = useState("");
  // 标题错误显示
  const [titleVisible, setTitleVisible] = useState(false);
  const [titleTip, setTitleTip] = useState("请输入标题");

  // 来源
  const [source, setSource] = useState("");
  // 来源错误显示
  const [sourceVisible, setSourceVisible] = useState(false);
  const [sourceTip, setSourceTip] = useState("请输入来源");

  // 附件
  const [file, setFile] = useState([]);
  // 附件错误显示
  const [fileVisible, setFileVisible] = useState(false);
  const [fileTip, setFileTip] = useState("附件错误");
  // 文件的md5,检测文件的唯一性
  const [fileMD5, setFileMD5] = useState([]);
  // 上传按钮是否可点击
  const [forbinClick, setForbinClick] = useState(false);
  // 正文
  const [main, setMain] = useState("");
  // 来源错误显示
  const [mainVisible, setMainVisible] = useState(false);
  const [mainTip, setMainTip] = useState("请输入正文");

  // 预览不用获取数据，数据由上面传下来
  const [detailData, handleChange, loading] = useDetailRequest(
    {},
    type === "train" ? "" : getRecruitDetail
  );
  //  请求
  useEffect(() => {
    schema !== "preview" && fileid && handleChange(fileid);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileid]);
  // 赋值
  useEffect(() => {
    console.log(detailData);
    if (detailData.IsLoaded && detailData.IsExist) {
      //加载完毕
      setTitle(detailData.Title);
      setFile(detailData.FileList);
      setMain(detailData.Content);
      if (type === "recruitment") {
        //招聘
        setSource(detailData.Issue);
      }
      if (type === "train") {
      }
    } else if (!detailData.IsExist) {
      //不存在
      typeof error === "function" && error();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailData]);
  //  普通输入检查
  const checkGeneralInput = useCallback(
    (value, success = () => {}, error = (isNull) => {}) => {
      checkInput({ value, success, error });
    },
    []
  );
  // useEffect(() => {}, []);
  // 检查标题,返回结果是否对错
  const checkTitle = useCallback(
    (value) => {
      let result = true;
      checkGeneralInput(
        value || title,
        () => {
          setTitleVisible(false);
          result = true;
        },
        (isNull) => {
          if (isNull) {
            setTitleTip("请输入标题");
          } else {
            setTitleTip("标题格式不正确");
          }
          setTitleVisible(true);
          result = false;
        }
      );
      return result;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [title]
  );
  // 检查来源,返回结果是否对错
  const checkSource = useCallback(
    (value) => {
      let result = true;

      checkGeneralInput(
        value || source,
        () => {
          setSourceVisible(false);
          result = true;
        },
        (isNull) => {
          // 不是招聘的不能进来
          if (type !== "recruitment") {
            return;
          }
          if (isNull) {
            setSourceTip("请输入来源");
          } else {
            setSourceTip("来源格式不正确");
          }
          setSourceVisible(true);
          result = false;
        }
      );
      return result;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [source]
  );
  // 检查正文,返回结果是否对错
  const checkContent = useCallback(
    (value) => {
      let result = true;

      value = value || main;
      if (!value) {
        setMainTip("请输入正文");
        setMainVisible(true);
        result = false;
      } else {
        setMainVisible(false);
        result = true;
      }
      return result;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [main]
  );

  // 检查所有
  const checkAll = (fn) => {
    let result = [checkContent(), checkSource(), checkTitle()];

    if (result.every((child) => child)) {
      typeof fn === "function" && fn();
    }
  };
  // 计算文件md5，判断文件是否重复
  const calculate = useCallback((file, callback = () => {}) => {
    let fileReader = new FileReader();
    // let  box=document.getElementById('box');
    let blobSlice =
      File.prototype.mozSlice ||
      File.prototype.webkitSlice ||
      File.prototype.slice;
    // let   file = document.getElementById("file").files[0];
    let chunkSize = 2097152;
    // read in chunks of 2MB
    let chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;
    let spark = new SparkMD5();

    fileReader.onload = function (e) {
      // console.log("read chunk nr", currentChunk + 1, "of", chunks);
      spark.appendBinary(e.target.result); // append binary string
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        let file_md5 = spark.end();
        callback(file_md5);
        // console.log("finished loading");
        // // box.innerText='MD5 hash:'+spark.end();
        // console.log("MD5 hash:" + spark.end());
        // console.info("computed hash", spark.end()); // compute hash
      }
    };

    function loadNext() {
      let start = currentChunk * chunkSize,
        end = start + chunkSize >= file.size ? file.size : start + chunkSize;

      fileReader.readAsBinaryString(blobSlice.call(file, start, end));
    }

    loadNext();
  }, []);

  // 上传文件
  // *file:input返回的数据，*skip：分块使用，*fileSavePath:第一次为空，之后的分块上传后会给之前上传返回的路径
  const upload = useCallback(
    (file, skip, fileSavePath, success = () => {}, error = () => {}) => {
      let formData = new FormData();
      let blockSize = 1024 * 1024 * 3; //2MB，设置块大小
      let totalCount = Math.ceil(file.size / blockSize); //计算总块数
      let nextSize = Math.min((skip + 1) * blockSize, file.size); //计算下一块大小（此处主要用于处理文件末端不足2MB的数据块）
      let fileData = file.slice(skip * blockSize, nextSize); //切块
      let token = getToken();
      // 文件上传路径
      let BasePlatformMsg = getDataStorage("BasePlatformMsg");
      let fileIP =
        BasePlatformMsg instanceof Object && BasePlatformMsg.ResHttpRootUrl;
      // 用户信息
      let UserInfo = getDataStorage("UserInfo");
      let schoolID =
        schoolId || (UserInfo instanceof Object && UserInfo.SchoolID);
      formData.append("FileName", file.name); //文件名称
      formData.append("File", fileData);
      formData.append("PlanType", type); //培训、招聘计划ID
      formData.append("PlanID", "265A7E70-D7C2-4B49-AF8B-065AC475BA05"); //培训、招聘计划ID
      formData.append("Token", token);
      formData.append("SchoolID", schoolID);
      formData.append("FileSavePath", fileSavePath);

      $.ajax({
        url: fileIP + "/Upload.ashx",
        async: false, //设为同步请求
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data, textStatus, jqXHR) {
          if (data.StatusCode !== 200) {
            console.info("分开上传失败，当前第" + (skip + 1) + "块");
            error(data.Msg);
            return;
          }
          fileSavePath = data.Data.FileUrl;
          console.log(skip, totalCount);
          if (skip + 1 === totalCount) {
            //此文件所有切块均已上传完毕
            success(data.Data);
            return;
          }
          //当接收到请求返回结果后，递归调用自己，切下一块继续上传
          // data.Data.FileUrl是分开上传的关键，上传第一块时不需要,从第二块开始需要从上一个请求结果中拿到此参数再传给服务器接口
          upload(file, ++skip, data.Data.FileUrl, success, error);
        },
        error: function (jqXHR, txtStatus, errorThrown) {
          console.info("分开上传失败，当前第" + (skip + 1) + "块");
          error("程序异常");
          return;
        },
      });
      return fileSavePath;
    },
    [schoolId, type]
  );

  // 文件上传封装
  const fileUpload = useCallback(
    (File) => {
      setForbinClick(true);
      upload(
        File,
        0,
        "",
        (data) => {
          console.log(data);
          setFile([...file, data]);
          setForbinClick(false);
        },
        (msg) => {
          autoAlert({ title: msg });
          setForbinClick(false);
        }
      );
    },
    [upload, file]
  );
  return (
    <div className={`lg-editor ${className ? className : ""}`} {...reset}>
      <table className="editor-table">
        <tbody>
          <tr>
            <td className="must">标题:</td>
            <td>
              <Tip visible={titleVisible} title={titleTip}>
                <Input
                  value={title}
                  className="editor-input title-input"
                  maxLength={100}
                  placeholder={"请输入标题..."}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  onBlur={(e) => {
                    checkTitle(e.target.value);
                  }}
                ></Input>
              </Tip>
            </td>
          </tr>
          {type === "recruitment" ? (
            <tr>
              <td className="must">来源:</td>
              <td>
                <Tip visible={sourceVisible} title={sourceTip}>
                  <Input
                    value={source}
                    className="editor-input source-input"
                    maxLength={30}
                    placeholder={"请输入来源..."}
                    onChange={(e) => {
                      setSource(e.target.value);
                    }}
                    onBlur={(e) => {
                      checkSource(e.target.value);
                    }}
                  ></Input>
                </Tip>
              </td>
            </tr>
          ) : (
            <></>
          )}
          <tr>
            <td>附件:</td>
            <td style={{ padding: 0 }}>
              <span>
                {file instanceof Array &&
                  file.map((child, index) => {
                    let Index = child.FileName.lastIndexOf(".");
                    let filename = [];
                    if (Index === -1) {
                      filename = [child.FileName, ""];
                    }
                    filename[0] = child.FileName.slice(0, Index);
                    filename[1] = child.FileName.slice(Index);
                    let fileSize = child.FileSize;
                    return (
                      <span
                        key={index}
                        className={`file-content file-type-${constructFileType(
                          child.FileName
                        )}`}
                      >
                        <span className="file-name" title={child.FileName}>
                          {filename[0]}
                        </span>
                        <span className="file-type" title={child.FileName}>
                          {filename[1]}
                        </span>
                        <span className="file-size" title={fileSize}>
                          [{fileSize}]
                        </span>
                        <b className="file-delete">×</b>
                      </span>
                    );
                  })}
                {file instanceof Array && file.length < 5 ? (
                  <span className="handle-upload">
                    <span className="file-upload">
                      添加附件
                      <input
                        type="file"
                        className="file-input"
                        onChange={(e) => {
                          const input = e.target;
                          const files = e.target.files;
                          if (files) {
                            for (let index = 0; index < files.length; index++) {
                              // console.log(files[index]);
                              const File = files[index];
                              // console.log(File);
                              if (File.size > 1024 * 1024 * 100) {
                                // fileTip.innerHTML = '文件大小不能超过3M!';
                                autoAlert({ title: "文件大小不能超过100M" });
                                input.value = "";
                                return false;
                              } else {
                                //支持chrome IE10
                                if (window.FileReader) {
                                  calculate(File, (file_md5) => {
                                    // console.log(file_md5)
                                    if (
                                      !fileMD5.some(
                                        (child) => child === file_md5
                                      )
                                    ) {
                                      setFileMD5([...fileMD5, file_md5]);
                                      setForbinClick(true);
                                      fileUpload(File);
                                    } else {
                                      autoAlert({ title: "文件已存在" });
                                      input.value = "";
                                      return false;
                                    }
                                  });
                                } else {
                                  if (
                                    !file.some(
                                      (child) =>
                                        child.FileName === File.name &&
                                        child.FileSize === File.size
                                    )
                                  ) {
                                    setForbinClick(true);

                                    fileUpload(File);
                                  } else {
                                    autoAlert({ title: "文件已存在" });
                                    input.value = "";
                                    return false;
                                  }
                                }
                                // fileTip.innerHTML = '';
                                // formData.append("file", file);
                              }
                            }
                          }
                        }}
                      ></input>
                      {forbinClick ? <span className="forbinClick"></span> : ""}
                    </span>
                    <span className="file-tip">
                      提示: 附件会在正文文末以下载链接形式出现
                    </span>
                  </span>
                ) : (
                  ""
                )}
              </span>
            </td>
          </tr>
          <tr>
            <td className="must  ">正文:</td>
            <td>
              <Tip visible={mainVisible} title={mainTip}>
                <TextArea
                  value={main}
                  className="editor-input main-input"
                  // maxLength={100}
                  placeholder={"请输入正文..."}
                  row={5}
                  onChange={(e) => {
                    setMain(e.target.value);
                  }}
                  onBlur={(e) => {
                    checkContent(e.target.value);
                  }}
                ></TextArea>
              </Tip>
            </td>
          </tr>
        </tbody>
      </table>
      <ul className="editor-handle">
        {preview ? (
          <li
            className="handle-preview"
            onClick={() => {
              checkAll(
                preview.onClick.bind(this, {
                  Title: title,
                  Issue: source,
                  Content: main,
                  ReleaseTime: moment().format("YYYY-MM-DD HH:mm"),
                  FileList: file,
                })
              );
            }}
          >
            预览
          </li>
        ) : (
          ""
        )}
        {draft && schema !== "edit" ? (
          <li
            className="handle-btn handle-draft"
            onClick={() => {
              checkAll(
                draft.onClick.bind(this, {
                  Title: title,
                  Issue: source,
                  Content: main,
                  // ReleaseTime: moment().format("YYYY-MM-DD HH:mm"),
                  FileList: file,
                })
              );
            }}
          >
            暂存为草稿
          </li>
        ) : (
          ""
        )}
        {publish ? (
          <li
            className="handle-btn handle-publish"
            onClick={() => {
              checkAll(
                publish.onClick.bind(this, {
                  Title: title,
                  Issue: source,
                  Content: main,
                  // ReleaseTime: moment().format("YYYY-MM-DD HH:mm"),
                  FileList: file,
                })
              );
            }}
          >
            确认发布
          </li>
        ) : (
          ""
        )}
        {cancel ? (
          <li
            className="handle-btn handle-cancel"
            onClick={() => {
              // checkAll(publish.onClick);

              cancel.onClick && cancel.onClick();
            }}
          >
            取消
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}
export default memo(forwardRef(Editor));
