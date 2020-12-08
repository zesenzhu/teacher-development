/*
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐│
 *  ││Esc│!1 │@2 │#3 │$4 │%5 │^6 │&7 │*8 │(9 │)0 │_- │+= │|\ │`~ ││
 *  │├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┤│
 *  ││ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{[ │}] │ BS  ││
 *  │├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤│
 *  ││ Ctrl │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  ││
 *  │├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────┬───┤│
 *  ││ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│Shift │Fn ││
 *  │└─────┬──┴┬──┴──┬┴───┴───┴───┴───┴───┴──┬┴───┴┬──┴┬─────┴───┘│
 *  │      │Fn │ Alt │         Space         │ Alt │Win│   HHKB   │
 *  │      └───┴─────┴───────────────────────┴─────┴───┘          │
 *  └─────────────────────────────────────────────────────────────┘
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-12-03 08:39:59
 * @LastEditTime: 2020-12-08 08:41:48
 * @Description:
 * @FilePath: \teacher-development\src\component\frame\Tab\index.js
 */

import React, {
  //   useCallback,
  memo,
  useEffect,
  useState,
  //   useImperativeHandle,
  useMemo,
  //   useReducer,
  //   createContext,
  // useContext,
  //   useRef,
  forwardRef,
} from "react";
import { withRouter } from "react-router-dom";
// import {frameContext} from '../index'
import "./index.scss";
import { handleRoute } from "../../../util/public";
import { Tabs } from "antd";
let { TabPane } = Tabs;

function Tab(props, ref) {
  const {
    // type,

    // className,
    componentList: ComponentList,
    // children,
    history,
    location,
    search,
  } = props;
  // 设置标签选择
  const [TabActive, setTabActive] = useState("");
  // reduce
  // const [state, dispatch] = useReducer(frameReducer, initState);
  // ComponentList
  //   const [ComponentList, setComponentList] = useState(componentList);
  const [TabList, setTabList] = useState([]);
  const [, setTabListLength] = useState(TabList.length);

  // const { state, dispatch } = useContext(frameContext);
  // console.log(state)
  // 路径
  const Path = useMemo(() => {
    // console.log(location);

    return location && typeof location.pathname === "string"
      ? handleRoute(location.pathname)
      : "";
  }, [location]);

  // 标签页
  useEffect(() => {
    // console.log(Path, ComponentList, TabList);
    // 查是否存在compoent
    Path instanceof Array &&
      Path.length > 0 &&
      ComponentList instanceof Array &&
      ComponentList.forEach((child, index) => {
        let { props } = child;
        // 路由匹配包含，同事看tablist是否存在,尽量不要tabid有字符一样
        // console.log(props.paramList);
        if (
          Path[0].includes(props.tabid) &&
          !TabList.some((tab) => {
            // id一样，如果没有param就返回true，如果有param就看param是否一样，一样就true
            // 返回true说明tab是已经存在了这个tab，不会加，只会跳到对应的tab页
            // 当component的param是存在，但路由没有传，则照常打开窗口，逻辑使用者处理

            return (
              props.tabid === tab.props.tabid &&
              (!props.param || Path[1] === tab.props.param)
            );
          })
          //  &&
          // // paramList为限制二级路由的列表，如果路由出现不在列表的，不允许打开
          // (!props.paramList ||
          //   props.paramList.find((param) => {
          //     return !Path[1] || param.key === Path[1];
          //   }))
        ) {
          // tab数量最多10个，多了就删前面的
          if (TabList.length >= 10) {
            let len = TabList.length;
            for (let i = 0; i < len - 9; i++) {
              TabList.shift();
            }
          }
          // 如果有param，替换param
          let obj = {};
          if (child.props.param) {
            obj.param = Path[1];
            obj.tabid = Path[0];
          }
          // if(props.paramList){
          //   props.paramList.some((param) => {
          //     obj.tabname = param.title;
          //     return param.key === (Path[1]?Path[1]:'');
          //   })
          // }
          TabList.push({ ...child, props: { ...props, ...obj } });
          setTabList(TabList);
          setTabListLength(TabList.length);
        }
        setTabActive(Path[0] + (Path[1] ? "|" + Path[1] : ""));
      });
    // console.log(Path, ComponentList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Path, ComponentList]);
  // bar跳转
  const routeTo = (active, param) => {
    history.push("/" + active.split("|")[0] + (param ? "/" + param : ""));
  };

  return (
    <Tabs
      activeKey={TabActive}
      renderTabBar={(props, DefaultTabBar) => {
        // console.log(TabList, TabList.length);

        return (
          <>
            <DefaultTabBar
              {...props}
              // onTabClick={(key, e) => {
              //   // setTabActive(key);
              //   TabList.forEach((child) => {
              //     let route = key.split("|");
              //     if (
              //       route[0] === child.props.tabid &&
              //       route[1] === child.props.param
              //     ) {
              //       // 通过路由修改
              //       routeTo(key, child.props.param);
              //       return true;
              //     }
              //     return false;
              //   });
              // }}
              className={`tab-nav-bar ${search ? "haveSearch" : ""}`}
            ></DefaultTabBar>
            {search ? <div className="search-context">{search}</div> : ""}
          </>
        );
      }}
    >
      {TabList.map((child, index) => {
        let { children, props } = child;
        return (
          <TabPane
            tab={
              // <NavLink to={"/" + props.tabid} className="tab-name">
              <div
                className="tabname"
                title={props.tabname}
                onClick={(key, e) => {
                  // setTabActive(key);
                  // let route = key.split("|");

                  routeTo(child.props.tabid, child.props.param);
                  // TabList.forEach((child) => {
                  //   let route = key.split("|");
                  //   if (
                  //     route[0] === child.props.tabid &&
                  //     route[1] === child.props.param
                  //   ) {
                  //     // 通过路由修改
                  //     routeTo(key, child.props.param);
                  //     return true;
                  //   }
                  //   return false;
                  // });
                }}
              >
                {props.tabname }
                <i
                  className="tab-close-btn"
                  onClick={(e) => {
                    // 阻止合成事件的冒泡
                    e.stopPropagation();
                    // 阻止与原生事件的冒泡
                    e.nativeEvent.stopImmediatePropagation();
                    // console.log(e);
                    // 一个不许删
                    if (TabList.length <= 1) {
                      return;
                    }
                    let active = TabActive.split("|")[0];
                    // let activeParam = TabActive.split("|")[1];
                    let param = TabActive.split("|")[1];
                    // 如果是删当前，选中往前移
                    if (props.tabid === active && props.param === param) {
                      let activeBar = {};
                      if (index === TabList.length - 1) {
                        //最后往前移
                        activeBar = TabList[TabList.length - 2];
                      } else {
                        activeBar = TabList[index + 1];
                      }
                      active = activeBar.props.tabid;
                      param = activeBar.props.param;
                    }
                    let List = [];
                    TabList.forEach((tab) => {
                      if (
                        tab.props.tabid !== props.tabid ||
                        tab.props.param !== props.param
                      ) {
                        List.push(tab);
                      }
                    });
                    // 更新活动
                    // setTabActive(active);
                    // 更新列表
                    setTabList(List);
                    // 通过路由修改
                    routeTo(active, param);
                  }}
                ></i>
              </div>
            }
            key={props.tabid + (props.param ? "|" + props.param : "")}
          >
            {children}
          </TabPane>
        );
      })}
    </Tabs>
  );
}
export default withRouter(memo(forwardRef(Tab)));
