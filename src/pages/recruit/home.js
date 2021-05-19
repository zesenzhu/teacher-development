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
 * @LastEditTime: 2020-12-15 15:52:17
 * @Description:
 * @FilePath: \teacher-development\src\pages\recruit\home.js
 */

import { connect } from "react-redux";
import React, {
  useCallback,
  memo,
  useEffect,
  useMemo,
  useState,
  useImperativeHandle,
  useRef,
  useContext,
  forwardRef,
  useLayoutEffect,
} from "react";
import "./index.scss";
import { withRouter, useHistory, useLocation } from "react-router-dom";
// import { handleActions } from "../../redux/actions";
import HomeTop from "../../component/homeTop";
import Table from "../../component/table";
import { Context } from "./reducer";
import { getCruitList, deleteRecruit } from "../../api/recruit";
import { autoAlert } from "../../util/public";
import { getTeaStuRatio } from "@/api/workMsg";
import { TeaStuCount } from "@/api/baseMsg";
//   import { NavLink } from "react-router-dom";
function Home(props, ref) {
  let {
    teacherRecruitMsg: { tabId },
    roleMsg: { schoolID, collegeID, selectLevel, productLevel },
    termInfo,
    StandardRadio,
    // history,
    activeTab,
    dispatch,
  } = props;
  let history = useHistory();
  let location = useLocation();
  let {
    state: { keyword },
    setDispatch,
  } = useContext(Context);
  const [query, setQuery] = useState({
    keyword,
    schoolID,
    collegeID,
    selectLevel,
  });
  // 获取table组件的ref
  const tableRef = useRef({});
  // 草稿数量
  const [draft, setDraft] = useState(0);
  // 初始请求
  const initGet = useRef(false);
  // table 的宽度最小为1040，各个列的width按这个来算1040/1200*设计图的width
  let widthRate = 1040 / 1200;
  let columns = [
    {
      title: "序号",
      dataIndex: "index",
      align: "center",
      width: 102 * widthRate,
      textWrap: "word-break",
      render: (data) => {
        return (
          <span className="table-index" title={data}>
            {data}
          </span>
        );
      },
    },
    {
      title: "标题",
      width: 494 * widthRate,
      // dataIndex: "title",
      render: (data) => {
        let { title, RID } = data;
        return (
          <span
            onClick={() => {
              history.push("/recruitDetail/" + RID);
            }}
            className="table-title"
            title={title}
          >
            {title ? title : "--"}
          </span>
        );
      },
    },
    {
      title: "发布单位",
      align: "center",
      width: 128 * widthRate,
      dataIndex: "source",
      render: (data) => {
        return (
          <span className="table-source" title={data}>
            {data ? data : "--"}
          </span>
        );
      },
    },
    {
      title: "发布人",
      align: "center",
      width: 90 * widthRate,
      dataIndex: "publisher",
      render: (data) => {
        return (
          <span className="table-publisher" title={data}>
            {data ? data : "--"}
          </span>
        );
      },
    },
    {
      title: "时间",
      align: "center",
      width: 172 * widthRate,
      dataIndex: "time",
      render: (data) => {
        return (
          <span className="table-time" title={data}>
            {data ? data : "--"}
          </span>
        );
      },
    },
    {
      title: "操作",
      align: "center",
      width: 200 * widthRate,

      // dataIndex: "time",
      render: (data) => {
        let { FromEdu } = data;

        return !FromEdu ? (
          <span className="table-handle">
            <span
              className="table-btn btn-edit"
              onClick={() => {
                history.push("/editRecruit/" + data.RID);
              }}
            >
              编辑
            </span>
            <span
              className="table-btn btn-delete"
              onClick={() => {
                autoAlert({
                  title: "确定删除该招聘计划?",
                  type: "btn-warn",
                  cancelShow: true,
                  abstract: "删除后不可恢复......",
                  onOk: () => {
                    DeleteRecruit(
                      { RIDs: data.RID },
                      tableRef.current.reloadList.bind(this, {}, false)
                    );
                  },
                });
              }}
            >
              删除
            </span>
          </span>
        ) : (
          <span className="table-handle"></span>
        );
      },
    },
  ];
  let draftColumns = [
    {
      title: "序号",
      dataIndex: "index",
      align: "center",
      width: 102 * widthRate,
      textWrap: "word-break",
      render: (data) => {
        return (
          <span className="table-index" title={data}>
            {data}
          </span>
        );
      },
    },
    {
      title: "标题",
      width: 300 * widthRate,
      // dataIndex: "title",
      render: (data) => {
        let { title, RID } = data;
        return (
          <span
            onClick={() => {
              // history.push("/recruitDetail/" + RID);
            }}
            className="table-title"
            title={title}
          >
            {title ? title : "--"}
          </span>
        );
      },
    },

    {
      title: "最后一次编辑时间",
      align: "center",
      width: 172 * widthRate,
      dataIndex: "UpdateTime",
      render: (data) => {
        return (
          <span className="table-time" title={data}>
            {data ? data : "--"}
          </span>
        );
      },
    },
    {
      title: "操作",
      align: "center",
      width: 200 * widthRate,

      // dataIndex: "time",
      render: (data) => {
        return (
          <span className="table-handle">
            <span
              className="table-btn btn-edit"
              onClick={() => {
                history.push("/editRecruit/" + data.RID);
              }}
            >
              编辑
            </span>
            <span
              className="table-btn btn-delete"
              onClick={() => {
                // autoAlert({
                //   title: "确定删除该草稿?",
                //   type: "btn-warn",
                //   cancelShow: true,
                //   onOk: () => {
                //     DeleteRecruit({ RIDs: data.RID }, () => {
                //       tableRef.current.reloadList();

                //       homeTopRef.current.reloadDraft();
                //     });
                //   },
                // });
                DeleteRecruit({ RIDs: data.RID }, () => {
                  tableRef.current.reloadList({}, false);

                  homeTopRef.current.reloadDraft();
                });
              }}
            >
              删除
            </span>
          </span>
        );
      },
    },
  ];
  // 删除
  const DeleteRecruit = useCallback(
    (param, success = () => {}, error = () => {}) => {
      deleteRecruit(param).then((res) => {
        if (res.result) {
          success();
        } else {
          error();
        }
      });
    },
    []
  );
  // useEffect(() => {
  //   console.log(keyword, selectLevel);
  //   selectLevel && setQuery({ keyword, schoolID, collegeID, selectLevel });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // 设置草稿数量
  // useLayoutEffect(() => {
  //   console.log(tableRef.current, tableRef);
  //   setDraft(
  //     tableRef.current.data && tableRef.current.data.Draft
  //       ? tableRef.current.data.Draft
  //       : 0
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [tableRef.current]);
  // 刷新

  useLayoutEffect(() => {
    let { pathname } = location;
    //第一次进来不请求
    if (!initGet.current) {
      initGet.current = true;
    } else {
      if (pathname === "/teacherRecruit") {
        // console.log('adss')
        tableRef.current.reloadList();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  const topDraft = useMemo(() => {
    return {
      title: "草稿箱",
      count: draft,
      query: { selectLevel, schoolID, collegeID, rStatus: 0 },
      api: getCruitList,
      columns: draftColumns,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectLevel, schoolID, collegeID, draft]);
  // console.log(keyword)
  useImperativeHandle(ref, () => ({
    reloadList: tableRef.current.reloadList,
  }));
  //
  const homeTopRef = useRef(null);
  const [AddCount, setAddCount] = useState(0);
  const [Count, setCount] = useState(0);
  useEffect(() => {
    let count = 0;
    function getCount(teacher, ratio, standardRatio) {
      // ratio = 20;
      // console.log(teacher, ratio, standardRatio)
      return Math.ceil((teacher * (ratio - standardRatio)) / standardRatio);
    }
    if (
      productLevel &&
      termInfo &&
      termInfo.TermInfo instanceof Array &&
      termInfo.TermInfo[0] &&
      termInfo.TermInfo[0].Term
    ) {
      productLevel === 1
        ? getTeaStuRatio({
            term: termInfo.TermInfo[0].Term,
            schoolID,
            collegeID,
            selectLevel,
          }).then((data) => {
            if (data) {
              // setTeaStuRatio(data);
              // StandardRadio
              let ratio = 0;
              try {
                data.SubSet.forEach((c) => {
                  ratio = Math.max(ratio, StandardRadio[c.NodeID]);
                });
                let Ratio = data.Ratio.split(":")[1];
                let count = getCount(data.TeacherCount, Ratio, ratio);
                setCount(data.Ratio);
                setAddCount(count);
              } catch (e) {}
            }
          })
        : TeaStuCount({
            term: termInfo.TermInfo[0].Term,
            schoolID,
            collegeID,
            selectLevel,
          }).then((data) => {
            if (data) {
              // setTeaStuRatio(data);
              // 大学，学院用一个标准18，中小学要看Subset
              let ratio = 0;
              try {
                if (data.SchoolLevel === 2) {
                  //中小学：
                  //1表示只有小学；
                  //2表示只有初中；
                  //4表示只有高中；
                  //如：3=1+2表示小学和初中；
                  //7=1+2+4表示小学初中高中
                  //5=2+3表示初中和高中
                  //大学：年制
                  let nodeID = [];
                  switch (data.SchoolType) {
                    case 1:
                      nodeID.push(1);
                      break;
                    case 2:
                      nodeID.push(2);

                      break;
                    case 4:
                      nodeID.push(3);

                      break;
                    case 3:
                      nodeID.push(1, 2);

                      break;
                    case 5:
                      nodeID.push(2, 3);

                      break;
                    case 7:
                      nodeID.push(1, 2, 3);

                      break;
                    default:
                  }
                  nodeID.forEach((c) => {
                    ratio = Math.max(ratio, StandardRadio[c]);
                  });
                } else {
                  ratio = StandardRadio[6];
                }
                let Ratio = data.TeaSthRatio.split(":")[1];

                let count = getCount(data.TeacherCount, Ratio, ratio);
                setCount(data.TeaSthRatio);
                setAddCount(count);
              } catch (e) {}
            }
          });
    }
    // return count;
  }, [productLevel, termInfo, schoolID, collegeID, selectLevel, StandardRadio]);

  return (
    <div className="Reacruit-context Recruit-home">
      {AddCount > 0 && (
        <span className="go-teaStuRatio">
          当前
          {/* <span
            className="go"
            onClick={() => {
              history.push("/workMsg");
            }}
          > */}
            师生比
          {/* </span> */}
          <span className="num">{Count}</span>，低于国家标准 ，建议补编
          <span className="num">{AddCount}人</span>
          <i
            onClick={() => {
              history.push("/workMsg");
            }}
          ></i>
        </span>
      )}
      <HomeTop
        ref={homeTopRef}
        publish={{
          title: "发布招聘计划",
          onClick: () => {
            history.push("/publishRecruit");
          },
        }}
        searchTips={"输入招聘计划标题搜索..."}
        draft={topDraft}
        search={{
          onSearch: (value) => {
            // console.log(value)
            setDispatch({ type: "SET_KEY_WORD", data: value });
            setQuery({ schoolID, collegeID, keyword: value, selectLevel });
          },
        }}
      ></HomeTop>
      <Table
        className="Reacruit-table"
        columns={columns}
        // dataSource={data}
        prepare={!!query.selectLevel}
        query={query}
        onDataChange={(data) => {
          setDraft(data && data.Draft ? data.Draft : 0);
        }}
        ref={tableRef}
        api={getCruitList}
        emptyParams={{title:'暂未找到相关的招聘计划'}}
      ></Table>
      {/* <div style={{height:'20px',width:'100px',background:'#a6a6a6'}} onClick={()=>{
      history.push(`/${tabId}/publish`  );
      dispatch(handleActions.setTeacherRecruitMsg({tabName:'发布招聘计划'}))
  }}></div> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  let {
    handleData: { teacherRecruitMsg, activeTab },
    commonData: { roleMsg, termInfo, StandardRadio },
  } = state;
  return { teacherRecruitMsg, roleMsg, activeTab, termInfo, StandardRadio };
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  memo(forwardRef(Home))
);
