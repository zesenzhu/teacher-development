/*
 * _______________#########_______________________
 * ______________############_____________________
 * ______________#############____________________
 * _____________##__###########___________________
 * ____________###__######_#####__________________
 * ____________###_#######___####_________________
 * ___________###__##########_####________________
 * __________####__###########_####_______________
 * ________#####___###########__#####_____________
 * _______######___###_########___#####___________
 * _______#####___###___########___######_________
 * ______######___###__###########___######_______
 * _____######___####_##############__######______
 * ____#######__#####################_#######_____
 * ____#######__##############################____
 * ___#######__######_#################_#######___
 * ___#######__######_######_#########___######___
 * ___#######____##__######___######_____######___
 * ___#######________######____#####_____#####____
 * ____######________#####_____#####_____####_____
 * _____#####________####______#####_____###______
 * ______#####______;###________###______#________
 * ________##_______####________####______________
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2021-01-12 19:19:01
 * @LastEditTime: 2021-01-12 19:19:01
 * @Description:
 * @FilePath: \teacher-development\src\pages\personalDetail\card.js
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
  useRef,
  forwardRef,
  useLayoutEffect,
} from "react";
import { Modal, Empty } from "@/component/common";
import "./index.scss";
import Scrollbars from "react-custom-scrollbars";
// import Empty from "antd/es/empty";

/**
 * @description: 暂无数据表明是没有这个系统id或返回错误，加锁是没有权限看,前者权重大于后者
 * @param {*} props
 * @param {*} ref
 * @return {*}
 */
function Teach(props, ref) {
  let {
    className,

    data,
  } = props;

  const [Title, setTitle] = useState("参与教研课题");
  const [List, setList] = useState([]);
  const ModalRef = useRef(null);
  const teachList = [
    {
      title: "参与教研课题",
      color: "#2edba6",
      // boxShadow: "0px 4px 10px 0px rgba(46, 219, 166, 1)",
    },
    { title: "课题成果", color: "#8099ff" },
    { title: "参与教研活动", color: "#fd8276" },
  ];
  const onClickBall = useCallback((data, teach) => {
    if (data.count) {
      setList(data.list);
      // setList([
      //   {
      //     Name: "《如何使用人工智能操作挖掘机铲土》",
      //     StartTime: "2020-12",
      //     EndTime: "2021-06",
      //   }, {
      //     Name: "《如何使用人工智能操作挖掘机铲土》",
      //     StartTime: "2020-12",
      //     EndTime: "2021-06",
      //   }, {
      //     Name: "《如何使用人工智能操作挖掘机铲土》",
      //     StartTime: "2020-12",
      //     EndTime: "2021-06",
      //   }, {
      //     Name: "《如何使用人工智能操作挖掘机铲土》",
      //     StartTime: "2020-12",
      //     EndTime: "2021-06",
      //   }, {
      //     Name: "《如何使用人工智能操作挖掘机铲土》",
      //     StartTime: "2020-12",
      //     EndTime: "2021-06",
      //   }, {
      //     Name: "《如何使用人工智能操作挖掘机铲土》",
      //     StartTime: "2020-12",
      //     EndTime: "2021-06",
      //   }, {
      //     Name: "《如何使用人工智能操作挖掘机铲土》",
      //     StartTime: "2020-12",
      //     EndTime: "2021-06",
      //   }, {
      //     Name: "《如何使用人工智能操作挖掘机铲土》",
      //     StartTime: "2020-12",
      //     EndTime: "2021-06",
      //   }, {
      //     Name: "《如何使用人工智能操作挖掘机铲土》",
      //     StartTime: "2020-12",
      //     EndTime: "2021-06",
      //   }, {
      //     Name: "《如何使用人工智能操作挖掘机铲土》",
      //     StartTime: "2020-12",
      //     EndTime: "2021-06",
      //   },
      // ]);

      setTitle(teach.title);
      ModalRef.current.openModal();
    }
  }, []);
  return (
    <div className={`card-content card-teach ${className ? className : ""}`}>
      {data instanceof Array &&
        data.map((child, index) => {
          let teach = teachList[index];
          let { count, list } = child;
          let len = count || list.length;
          return (
            <div
              key={index}
              className="ct-card"
              style={{ width: 100 / data.length + "%" }}
            >
              <span
                className={`ct-ball ${len ? "ct-ball-active" : ""}`}
                // style={{  cursor:count?'pointer':'auto',textDecoration:count?'underline':'auto' }}
                title={count}
                onClick={onClickBall.bind(this, child, teach)}
              >
                <span
                  style={{ background: teach.color }}
                  className="ball-bg"
                ></span>
                {count}
              </span>
              <p className="ct-title">{teach.title}</p>
            </div>
          );
        })}
      <Modal
        footer={null}
        height={432}
        width={720}
        ref={ModalRef}
        type={1}
        className="teach-modal"
        title={Title}
      >
        {List instanceof Array && List.length > 0 ? (
          <div className='ct-modal-table'>
            <table className="ct-modal-table-thead">
              <thead>
                <tr>
                  <th >时间</th>
                  <th  >课题名称</th>
                </tr>
              </thead>
            </table>
            <Scrollbars autoHeight autoHeightMin={350}>
              <table className="ct-modal-table-tbody">
                <tbody>
                  {List.map((child, index) => {
                    let { StartTime, EndTime, Name } = child;
                    return (
                      <tr key={index}>
                        <td className={`table-time ${EndTime ? "no-in" : ""}`}>
                          {StartTime}~{EndTime ? EndTime : "进行中"}
                        </td>
                        <td className="table-name" title={Name}>
                          {Name}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Scrollbars>
          </div>
        ) : (
          <Empty
            style={{ marginTop: 100 }}
            type={"4"}
            title={"暂无数据"}
          ></Empty>
        )}
      </Modal>
    </div>
  );
}

export default memo(forwardRef(Teach));
