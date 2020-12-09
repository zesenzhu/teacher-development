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
 * @LastEditTime: 2020-12-09 20:34:04
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
function Editor(props, ref) {
  // type:分招聘和培训，*recruit：招聘，*train:培训
  // schema:模式，分发布publish和编辑edit两种，默认发布，
  let { className, type, schema, ...reset } = props;
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
  useEffect(() => {}, []);
  return (
    <div className={`lg-editor ${className ? className : ""}`} {...reset}>
      <table className="editor-table">
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
                  checkGeneralInput(
                    e.target.value,
                    () => {
                      setTitleVisible(false);
                    },
                    (isNull) => {
                      if (isNull) {
                        setTitleTip("请输入标题");
                      } else {
                        setTitleTip("标题格式不正确");
                      }
                      setTitleVisible(true);
                    }
                  );
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
                    checkGeneralInput(
                      e.target.value,
                      () => {
                        setSourceVisible(false);
                      },
                      (isNull) => {
                        if (isNull) {
                          setSourceTip("请输入来源");
                        } else {
                          setSourceTip("来源格式不正确");
                        }
                        setSourceVisible(true);
                      }
                    );
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
              <Input.TextArea
                value={main}
                className="editor-input main-input"
                // maxLength={100}
                placeholder={"请输入正文..."}
                row={5}
                onChange={(e) => {
                  setMain(e.target.value);
                }}
                onBlur={(e) => {
                  if (!e.target.value) {
                    setMainTip("请输入正文");
                    setMainVisible(true);
                  } else {
                    setMainVisible(false);
                  }
                }}
              ></Input.TextArea>
            </Tip>
          </td>
        </tr>
      </table>
      <div className='editor-handle'></div>
    </div>
  );
}
export default memo(forwardRef(Editor));
