/*
 * ......................................&&.........................
 * ....................................&&&..........................
 * .................................&&&&............................
 * ...............................&&&&..............................
 * .............................&&&&&&..............................
 * ...........................&&&&&&....&&&..&&&&&&&&&&&&&&&........
 * ..................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&..............
 * ................&...&&&&&&&&&&&&&&&&&&&&&&&&&&&&.................
 * .......................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&.........
 * ...................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...............
 * ..................&&&   &&&&&&&&&&&&&&&&&&&&&&&&&&&&&............
 * ...............&&&&&@  &&&&&&&&&&..&&&&&&&&&&&&&&&&&&&...........
 * ..............&&&&&&&&&&&&&&&.&&....&&&&&&&&&&&&&..&&&&&.........
 * ..........&&&&&&&&&&&&&&&&&&...&.....&&&&&&&&&&&&&...&&&&........
 * ........&&&&&&&&&&&&&&&&&&&.........&&&&&&&&&&&&&&&....&&&.......
 * .......&&&&&&&&.....................&&&&&&&&&&&&&&&&.....&&......
 * ........&&&&&.....................&&&&&&&&&&&&&&&&&&.............
 * ..........&...................&&&&&&&&&&&&&&&&&&&&&&&............
 * ................&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&............
 * ..................&&&&&&&&&&&&&&&&&&&&&&&&&&&&..&&&&&............
 * ..............&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&....&&&&&............
 * ...........&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&......&&&&............
 * .........&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&.........&&&&............
 * .......&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...........&&&&............
 * ......&&&&&&&&&&&&&&&&&&&...&&&&&&...............&&&.............
 * .....&&&&&&&&&&&&&&&&............................&&..............
 * ....&&&&&&&&&&&&&&&.................&&...........................
 * ...&&&&&&&&&&&&&&&.....................&&&&......................
 * ...&&&&&&&&&&.&&&........................&&&&&...................
 * ..&&&&&&&&&&&..&&..........................&&&&&&&...............
 * ..&&&&&&&&&&&&...&............&&&.....&&&&...&&&&&&&.............
 * ..&&&&&&&&&&&&&.................&&&.....&&&&&&&&&&&&&&...........
 * ..&&&&&&&&&&&&&&&&..............&&&&&&&&&&&&&&&&&&&&&&&&.........
 * ..&&.&&&&&&&&&&&&&&&&&.........&&&&&&&&&&&&&&&&&&&&&&&&&&&.......
 * ...&&..&&&&&&&&&&&&.........&&&&&&&&&&&&&&&&...&&&&&&&&&&&&......
 * ....&..&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&...........&&&&&&&&.....
 * .......&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&..............&&&&&&&....
 * .......&&&&&.&&&&&&&&&&&&&&&&&&..&&&&&&&&...&..........&&&&&&....
 * ........&&&.....&&&&&&&&&&&&&.....&&&&&&&&&&...........&..&&&&...
 * .......&&&........&&&.&&&&&&&&&.....&&&&&.................&&&&...
 * .......&&&...............&&&&&&&.......&&&&&&&&............&&&...
 * ........&&...................&&&&&&.........................&&&..
 * .........&.....................&&&&........................&&....
 * ...............................&&&.......................&&......
 * ................................&&......................&&.......
 * .................................&&..............................
 * ..................................&..............................
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-12-22 15:22:09
 * @LastEditTime: 2020-12-22 21:57:20
 * @Description: 教师画像列表
 * @FilePath: \teacher-development\src\pages\teacherPersonal\personalList.js
 */

import {
  connect,
  // useSelector,
  //   useDispatch,
} from "react-redux";
import React, {
  // useCallback,
  memo,
  useEffect,
  useState,
  useReducer,
  useMemo,
  // useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import {
  Dropdown,
  Search,
  CheckBox,
  CheckBoxGroup,
} from "../../component/common";
import Table from "../../component/table";
import { getTeacherList, getNode } from "../../api/personal";
// import { handleRoute } from "../../util/public";
import { withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { Tooltip } from "antd";

//   import { Reducer, Context, initState } from "./reducer";
function SchoolList(props, ref) {
  let {
    location,
    history,
    roleMsg: { productLevel, schoolID, collegeID },
    levelHash,
    termInfo: { TermInfo, HasHistory },
    contentHW: { height },
  } = props;
  const [SearchValue, setSearchValue] = useState("");
  // 列筛选裂变
  const [Culomns] = useState([
    { value: 0, title: "学校基础信息", canControl: false },
    { value: 1, title: "教师人数/师生比", canControl: true },
    { value: 2, title: "年龄/教龄统计", canControl: true },
    { value: 3, title: "学历统计", canControl: true },
    { value: 4, title: "职称统计", canControl: true },
    { value: 5, title: "平均周课时", canControl: true },
    { value: 6, title: "行政班班主任数量", canControl: true },
    { value: 7, title: "电子资源上传统计", canControl: true },
    { value: 8, title: "电子教案制作统计", canControl: true },
    { value: 9, title: "精品课程制作统计", canControl: true },
  ]);
  // 列选择
  const [CulomnsSelect, setCulomnsSelect] = useState([0, 1, 2, 3]);
  // 获取当前级别的信息
  const levelMsg = useMemo(() => {
    return levelHash[productLevel]
      ? levelHash[productLevel]
      : {
          productLevel: 1,
          selectLevel: 1,
          title: "",
          sub: "",
          belong: "",
          belondName: "",
        };
  }, [levelHash, productLevel]);

  const [query, setQuery] = useState({
    // keyword: "",
    // term: "",
    // type: "",
    keyword: "",
    schoolID: productLevel === 1 ? "" : schoolID,
    nodeID: "",
    nodeType: "",
  });
  // 学期
  const TermList = useMemo(() => {
    let data = [];
    if (TermInfo instanceof Array) {
      data = TermInfo.map((child) => ({
        value: child.Term,
        title: child.TermName,
      }));
      setQuery({ ...query, term: data[0].value });
      // setFirstSelect(data[0].value);
    }
    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TermInfo]);
  // // 初始化列表
  // useEffect(() => {
  //   // 非教育局，使用node
  //   if (productLevel !== 1) {
  //     getNode({ collegeID, schoolID }).then((res) => {
  //       setFirstNodeList([
  //         { value: "", title: "全部" + levelMsg.sub },
  //         ...res.data[0],
  //       ]);
  //       setSecondNodeObj(res.data[1]);
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [productLevel]);
  // 获取table组件的ref
  const tableRef = useRef({});

  const columns = useMemo(() => {
    let widthRate = 1;//1040 / 1200
    let EndCulomns = [];
    let culomnsData = [
      {
        title: "序号",
        width: 68 * widthRate,
        key: "index",
        // colSpan: 2,
        align: "center",
        dataIndex: "index",
        render: (data) => {
          return (
            <span className="table-index" title={data}>
              {data ? data : "--"}
            </span>
          );
        },
      },
      {
        title: "学校名称",
        width: 124 * widthRate,
        sorter: true,
        key: "SchoolName",
        align: "center",
        // dataIndex: "SchoolName",
        render: (data) => {
          let {SchoolName,SchoolID} = data
          return (
            <span onClick={()=>{
              history.push("/schoolDetail/" + SchoolID);
            }} className="table-SchoolName" title={SchoolName}>
              {SchoolName ? SchoolName : "--"}
            </span>
          );
        },
      },
      {
        title: "学校学段",
        width: 124 * widthRate,
        sorter: true,
        key: "UserID",
        align: "center",
        dataIndex: "UserID",
        render: (data) => {
          return (
            <span className="table-limit" title={data}>
              {data ? data : "--"}
            </span>
          );
        },
      },
      {
        title: "教师人数及师生比统计",
        className:'two-col',
        children: [
          {
            title: '教师人数',
            sorter: true,
            align: "center",
            key: 'TeacherCount',
            className:'two-col-bottom',

            width: 98 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          {
            title: "男性人数"  ,
            sorter: true,
            align: "center",
            key: 'FemaleCount',
            className:'two-col-bottom',

            width: 82 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          {
            title: "女性人数" ,
            sorter: true,
            align: "center",
            key: 'MaleCount',
            className:'two-col-bottom',

            width: 82 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          {
            title: "师生比例"  ,
            sorter: true,
            align: "center",
            key: 'TSRate',
            className:'two-col-bottom',

            width: 98 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
        ],
      },
      {
        title: "年龄教龄统计",
        className:'two-col',
        children: [
          {
            title: '平均年龄',
            sorter: true,
            align: "center",
            key: 'TeacherCount',
            className:'two-col-bottom',

            width: 98 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          {
            title: "平均教龄"  ,
            sorter: true,
            align: "center",
            key: 'FemaleCount',
            className:'two-col-bottom',

            width: 98 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          
        ],
      },
      {
        title: "学历统计",
        className:'two-col',
        children: [
          {
            title: '本科率',
            sorter: true,
            align: "center",
            key: 'TeacherCount',
            className:'two-col-bottom',

            width: 98 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          {
            title: "博士研究生及以上"  ,
            sorter: true,
            align: "center",
            key: 'FemaleCount',
            className:'two-col-bottom',

            width: 146 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          
        ],
      },
      {
        title: "职称统计",
        className:'two-col',
        children: [
          {
            title: '本科率',
            sorter: true,
            align: "center",
            key: 'TeacherCount',
            className:'two-col-bottom',

            width: 98 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          {
            title: "博士研究生及以上"  ,
            sorter: true,
            align: "center",
            key: 'FemaleCount',
            className:'two-col-bottom',

            width: 146 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          
        ],
      },
      {
        title: "平均周课时",
        className:'two-col',
        children: [
          {
            title: '本科率',
            sorter: true,
            align: "center",
            key: 'TeacherCount',
            className:'two-col-bottom',

            width: 98 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          {
            title: "博士研究生及以上"  ,
            sorter: true,
            align: "center",
            key: 'FemaleCount',
            className:'two-col-bottom',

            width: 146 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          
        ],
      },
      {
        title: "行政班\班主任数量",
        className:'two-col',
        children: [
          {
            title: '本科率',
            sorter: true,
            align: "center",
            key: 'TeacherCount',
            className:'two-col-bottom',

            width: 98 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          {
            title: "博士研究生及以上"  ,
            sorter: true,
            align: "center",
            key: 'FemaleCount',
            className:'two-col-bottom',

            width: 146 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          
        ],
      },

      {
        title: "电子资源上传统计",
        className:'two-col',
        children: [
          {
            title: '本科率',
            sorter: true,
            align: "center",
            key: 'TeacherCount',
            className:'two-col-bottom',

            width: 98 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          {
            title: "博士研究生及以上"  ,
            sorter: true,
            align: "center",
            key: 'FemaleCount',
            className:'two-col-bottom',

            width: 146 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          
        ],
      },
      {
        title: "电子教案制作统计",
        className:'two-col',
        children: [
          {
            title: '本科率',
            sorter: true,
            align: "center",
            key: 'TeacherCount',
            className:'two-col-bottom',

            width: 98 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          {
            title: "博士研究生及以上"  ,
            sorter: true,
            align: "center",
            key: 'FemaleCount',
            className:'two-col-bottom',

            width: 146 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          
        ],
      },
      {
        title: "精品课程制作统计",
        className:'two-col',
        children: [
          {
            title: '本科率',
            sorter: true,
            align: "center",
            key: 'TeacherCount',
            className:'two-col-bottom',

            width: 98 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          {
            title: "博士研究生及以上"  ,
            sorter: true,
            align: "center",
            key: 'FemaleCount',
            className:'two-col-bottom',

            width: 146 * widthRate,
            // dataIndex: "source",
            render: (data) => {
              let name = data[levelMsg.belondName];
              return (
                <span className="table-belondName" title={name}>
                  {name ? name : "--"}
                </span>
              );
            },
          },
          
        ],
      },
      {
        title: (
          <div className="open-columns">
            <Tooltip
              overlayClassName={`lg-table-more-tooltip`}
              // getPopupContainer={(e) => e}
              // placement={"bottomRight"}
              color={"#fff"}
              align={{
                points: ["tr", "br"], // align top left point of sourceNode with top right point of targetNode
                offset: [20, 10], // the offset sourceNode by 10px in x and 20px in y,
                // targetOffset: ["30%", "40%"], // the offset targetNode by 30% of targetNode width in x and 40% of targetNode height in y,
                overflow: { adjustX: true, adjustY: true }, // auto adjust position when sourceNode is overflowed
              }}
              trigger={["click"]}
              // visible={visible}
              title={
                <div className="more-content">
                  <p className="more-title">列筛选</p>
                  <CheckBoxGroup
                    value={CulomnsSelect}
                    onChange={(e) => {
                      console.log(e);
                      setCulomnsSelect(
                        e.sort((a, b) => {
                          return a > b;
                        })
                      );
                    }}
                  >
                    <div className="more-map">
                      <Scrollbars>
                        {Culomns.map((child, index) => {
                          return (
                            <div key={index} className="c-select-bar">
                              <CheckBox
                                value={child.value}
                                disabled={
                                  child.canControl === undefined ||
                                  !child.canControl
                                }
                              >
                                {child.title}
                              </CheckBox>
                            </div>
                          );
                        })}
                      </Scrollbars>
                    </div>{" "}
                  </CheckBoxGroup>
                </div>
              }
            >
              <i></i>
            </Tooltip>
          </div>
        ),
        align: "center",
        width: 60 * widthRate,
        fixed: "right",
        // dataIndex: "time",
        render: (data) => {
          return <span className="table-columns"></span>;
        },
      },
    ];
    EndCulomns = EndCulomns.concat(culomnsData.slice(0, 3));
    CulomnsSelect.forEach((child, index) => {
      // 因为前面三个必选，同时不能用children，所以每个加2
      if (child !== 0 && culomnsData[child + 2]) {
        EndCulomns.push(culomnsData[child + 2]);
      }
    });
    EndCulomns.push(culomnsData[culomnsData.length - 1]); //控制列
    return EndCulomns;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelMsg, CulomnsSelect]);
  return (
    <div className="SchoolList" style={{ height: height }}>
      <div className="pl-top">
        <div className="plt-select">
          {TermList.length > 0 && (
            <Dropdown
              width={150}
              height={240}
              dropList={TermList}
              title={"所统计学期"}
              value={query.term}
              className="school-dropdown"
              onChange={(e) => {}}
              onSelect={(e, option) => {
                setQuery({ ...query, term: e });
              }}
            ></Dropdown>
          )}
          {productLevel === 1 && (
            <Dropdown
              width={150}
              height={240}
              dropList={TermList}
              title={"学段类型"}
              value={query.term}
              className="school-dropdown"
              onChange={(e) => {}}
              onSelect={(e, option) => {
                setQuery({ ...query, term: e });
              }}
            ></Dropdown>
          )}
        </div>
        <div className="plt-search">
          <Search
            className="home-search"
            Value={SearchValue}
            placeHolder={"输入学校名称搜索"}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onClickSearch={(e) => {
              setQuery({ ...query, keyword: SearchValue });
            }}
            onCancelSearch={(e) => {
              setSearchValue("");
              setQuery({ ...query, keyword: "" });
            }}
          ></Search>
        </div>
      </div>

      <div className="pl-table">
        <Scrollbars>
          <Table
            // onHeaderRow={(c, i) => {
            //   console.log(c, i);
            // }}
            scroll={{ x: "max-content" }}
            className="Reacruit-table"
            columns={columns}
            // dataSource={data}
            // prepare={!!query.selectLevel}
            query={query}
            onDataChange={(data) => {}}
            ref={tableRef}
            api={getTeacherList}
          ></Table>
        </Scrollbars>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  let {
    commonData: { roleMsg, levelHash, contentHW, termInfo },
  } = state;
  return { roleMsg, levelHash, contentHW, termInfo };
};
export default connect(mapStateToProps)(
  withRouter(memo(forwardRef(SchoolList)))
);
