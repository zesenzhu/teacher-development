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
 * @Description: ??????????????????
 * @FilePath: \teacher-development\src\pages\teacherPersonal\personalList.js
 */

import {
  connect,
  // useSelector,
  //   useDispatch,
} from "react-redux";
import React, {
  useCallback,
  memo,
  useEffect,
  useState,
  useReducer,
  useMemo,
  // useImperativeHandle,
  useRef,
  forwardRef,
  useLayoutEffect,
} from "react";
import { Dropdown, Search } from "../../component/common";
import Table from "../../component/table";
import { getTeacherList, getNode } from "../../api/personal";
// import { handleRoute } from "../../util/public";
import { withRouter } from "react-router-dom";
import { getToken } from "@/util/public";

import { Scrollbars } from "react-custom-scrollbars";
//   import { Reducer, Context, initState } from "./reducer";
function PersonalList(props, ref) {
  let {
    location,
    history,
    roleMsg: { productLevel, schoolID, collegeID, IsEdu, userType },
    levelHash,
    contentHW: { height },
  } = props;
  const [SearchValue, setSearchValue] = useState("");
  // ???????????????????????????
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
  // ??????node
  const [SchoolList, setSchoolList] = useState([
    { value: schoolID, title: "????????????", nodeType: "-1" },
  ]);
  // ??????node
  // ?????????????????????-1????????????1????????????2????????????3????????????
  const [FirstNodeList, setFirstNodeList] = useState([
    {
      value: "",
      nodeType: "-1",
      title: "??????" + levelMsg.sub,
    },
  ]);
  // ??????node,????????????????????????????????????
  const [SecondNodeList, setSecondNodeList] = useState([
    { value: "", nodeType: "2", title: "???????????????" },
  ]);
  // ???????????????????????????
  const [SecondNodeObj, setSecondNodeObj] = useState({});
  // ????????????
  const [firstSelect, setFirstSelect] = useState("");
  const [secondSelect, setSecondSelect] = useState("");
  const [query, setQuery] = useState({
    keyword: "",
    schoolID: schoolID,
    nodeID: "",
    nodeType: "-1",
  });
  const onClickName = useCallback(
    (data) => {
      let ip = IsEdu ? data.TGServerAddr : "";
      // TGServerAddr????????????????????????

      window.open(
        ip +
          "?lg_tk=" +
          getToken() +
          (IsEdu ? "_Edu" : "") +
          (IsEdu ? "&lg_ic=" + (userType === 6 ? "IC0101" : "IC0102") : "") +
          "#/page/personalDetail/" +
          data.UserID
      );
    },
    [IsEdu, userType]
  );
  // ???????????????
  useEffect(() => {
    // ?????????????????????node
    getNode({ collegeID, schoolID }).then((res) => {
      if (res.StatusCode === 200) {
        if (productLevel !== 1) {
          setFirstNodeList((pre) => {
            return pre.slice(0, 1).concat([
              // { value: "", title: "??????" + levelMsg.sub },
              ...res.data[0],
            ]);
          });
          setSecondNodeObj(res.data[1]);
        } else {
          setSchoolList((pre) => {
            return pre.slice(0, 1).concat([
              // { value: "", title: "??????" + levelMsg.sub },
              ...res.data[0],
            ]);
          });
        }
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productLevel]);
  // ??????table?????????ref
  const tableRef = useRef({});

  const columns = useMemo(() => {
    let widthRate = 1040 / 1200;
    return [
      {
        title: "????????????",
        // dataIndex: "index",
        key: "UserName",
        align: "left",
        width: 190 * widthRate,
        sorter: true,
        render: (data) => {
          let { UserName, PhotoPath } = data;

          return (
            <span
              className="table-name"
              onClick={onClickName.bind(this, data)}
              title={UserName}
            >
              <i
                style={{
                  background: `url(${PhotoPath})no-repeat center 0/24px`,
                }}
              ></i>
              {UserName ? UserName : "--"}
            </span>
          );
        },
      },
      {
        title: "??????",
        width: 150 * widthRate,
        sorter: true,
        key: "UserID",
        align: "center",
        dataIndex: "UserID",
        render: (data) => {
          return (
            <span className="table-userid" title={data}>
              {data ? data : "--"}
            </span>
          );
        },
      },
      {
        title: levelMsg.belongBefore + levelMsg.belong,
        sorter: true,
        align: "center",
        key: levelMsg.belondName,

        width: 150 * widthRate,
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
        title: "??????",
        sorter: true,
        align: "center",
        key: "Gender",

        width: 95 * widthRate,
        dataIndex: "Gender",
        render: (data) => {
          return (
            <span className="table-Gender" title={data}>
              {data ? data : "--"}
            </span>
          );
        },
      },
      {
        title: "??????",
        sorter: true,
        key: "TeachAge",
        align: "center",
        width: 95 * widthRate,
        dataIndex: "TeachAge",
        render: (data) => {
          return (
            <span className="table-TeachAge" title={data}>
              {data ? data : "--"}
            </span>
          );
        },
      },

      {
        title: "????????????",
        sorter: true,
        key: "PoliticsCode",
        align: "center",
        width: 120 * widthRate,
        dataIndex: "Politics",
        render: (data) => {
          return (
            <span className="table-Politics" title={data}>
              {data ? data : "--"}
            </span>
          );
        },
      },
      {
        title: "????????????",
        sorter: true,
        key: "TitleCode",
        align: "center",
        width: 120 * widthRate,
        dataIndex: "TitleName",
        render: (data) => {
          return (
            <span className="table-TitleName" title={data}>
              {data ? data : "--"}
            </span>
          );
        },
      },
      {
        title: "????????????",
        align: "center",
        width: 140 * widthRate,
        dataIndex: "HonorNames",
        render: (data) => {
          return (
            <span className="table-HonorNames" title={data}>
              {data ? data : "--"}
            </span>
          );
        },
      },
      {
        title: "????????????",
        align: "center",
        width: 140 * widthRate,

        // dataIndex: "time",
        render: (data) => {
          return (
            <span className="table-handle" title={"????????????"}>
              <span
                className=" btn-check"
                onClick={onClickName.bind(this, data)}
              ></span>
            </span>
          );
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelMsg]);
  const initGet = useRef(false);
  useLayoutEffect(() => {
    if (!initGet.current) {
      initGet.current = true;
      return;
    }
    if (location.pathname === "/teacherPersonal") {
      tableRef.current.reloadList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <div className="PersonalList" style={{ height: height }}>
      <div className="pl-top">
        <div className="plt-select">
          {productLevel === 1 ? (
            <Dropdown
              width={150}
              height={240}
              dropList={SchoolList}
              title={"??????"}
              value={query.schoolID}
              className="school-dropdown"
              onChange={(e) => {}}
              onSelect={(e, option) => {
                setQuery({ ...query, schoolID: e, nodeType: option.nodeType });
              }}
            ></Dropdown>
          ) : (
            ""
          )}
          {productLevel !== 1 ? (
            <>
              <Dropdown
                width={150}
                height={240}
                dropList={FirstNodeList}
                title={productLevel === 3 ? "??????" : "?????????"}
                value={firstSelect}
                className="first-dropdown"
                onChange={(e) => {}}
                onSelect={(e, option) => {
                  setQuery({ ...query, nodeID: e, nodeType: option.nodeType });
                  setFirstSelect(e);
                  let defaultList = [{ value: "", title: "???????????????" }];
                  // console.log(SecondNodeObj[e], e, SecondNodeObj);
                  let secondList =
                    SecondNodeObj[e] instanceof Array
                      ? defaultList.concat(SecondNodeObj[e])
                      : defaultList;
                  setSecondNodeList(secondList);
                  setSecondSelect(secondList[0].value);
                }}
              ></Dropdown>
              {productLevel === 2 ? (
                <Dropdown
                  width={150}
                  height={240}
                  disabled={firstSelect === ""}
                  dropList={SecondNodeList}
                  value={secondSelect}
                  className="second-dropdown"
                  onChange={(e) => {}}
                  onSelect={(e, option) => {
                    setQuery({
                      ...query,
                      nodeID: e === "" ? firstSelect : e,
                      nodeType: e === "" ? 2 : option.nodeType,
                    });
                    setSecondSelect(e);
                  }}
                ></Dropdown>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="plt-search">
          <Search
            className="home-search"
            Value={SearchValue}
            placeHolder={"??????????????????/????????????"}
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
            className="Reacruit-table"
            columns={columns}
            // dataSource={data}
            // prepare={!!query.selectLevel}
            query={query}
            onDataChange={(data) => {}}
            ref={tableRef}
            api={getTeacherList}
            emptyParams={{title:'?????????????????????????????????'}}
          ></Table>
        </Scrollbars>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  let {
    commonData: { roleMsg, levelHash, contentHW },
  } = state;
  return { roleMsg, levelHash, contentHW };
};
export default connect(mapStateToProps)(
  withRouter(memo(forwardRef(PersonalList)))
);
