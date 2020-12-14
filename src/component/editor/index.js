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
 * @LastEditTime: 2020-12-14 10:43:22
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
import { Input } from "antd";
import { Tip } from "../common";
import { checkInput } from "../../util/public";
import moment from "moment";
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
    publish,
    ...reset
  } = props;
  type = type || "recruit";
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
  const [file, setFile] = useState({});
  // 附件错误显示
  const [fileVisible, setFileVisible] = useState(false);
  const [fileTip, setFileTip] = useState("附件错误");

  // 正文
  const [main, setMain] = useState("");
  // 来源错误显示
  const [mainVisible, setMainVisible] = useState(false);
  const [mainTip, setMainTip] = useState("请输入正文");
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
          if (type !== "recruit") {
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
          {type === "recruit" ? (
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
            ""
          )}
          <tr>
            <td>附件:</td>
            <td>
              <span className="file-upload">
                添加附件
                <input
                  type="file"
                  className="file-input"
                  onChange={(e) => {
                    console.log(e);
                  }}
                ></input>
              </span>
              <span className="file-tip">
                提示: 附件会在正文文末以下载链接形式出现
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span className="must td-main">正文:</span>
            </td>
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
                  FileList: [
                    {
                      FileID: 0,
                      FileName: "招聘岗位.xls", //文件名称
                      FileUrl: "xxxxxxxxxxxxx", //文件路径
                      FileSize: "23.4M", //文件大小
                      DeleteFlag: 0, //文件删除标识
                    },
                  ],
                })
              );
            }}
          >
            预览
          </li>
        ) : (
          ""
        )}
        {draft ? (
          <li
            className="handle-btn handle-draft"
            onClick={() => {
              checkAll(draft.onClick.bind(this, {
                Title: title,
                Issue: source,
                Content: main,
                ReleaseTime: moment().format("YYYY-MM-DD HH:mm"),
                FileList: [
                  {
                    FileID: 0,
                    FileName: "招聘岗位.xls", //文件名称
                    FileUrl: "xxxxxxxxxxxxx", //文件路径
                    FileSize: "23.4M", //文件大小
                    DeleteFlag: 0, //文件删除标识
                  },
                ],
              }));
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
              checkAll(publish.onClick.bind(this, {
                Title: title,
                Issue: source,
                Content: main,
                ReleaseTime: moment().format("YYYY-MM-DD HH:mm"),
                FileList: [
                  {
                    FileID: 0,
                    FileName: "招聘岗位.xls", //文件名称
                    FileUrl: "xxxxxxxxxxxxx", //文件路径
                    FileSize: "23.4M", //文件大小
                    DeleteFlag: 0, //文件删除标识
                  },
                ],
              }));
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
