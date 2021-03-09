import React, {
  useCallback,
  memo,
  useEffect,
  useState,
  useMemo,
  // useImperativeHandle,
  useRef,
  forwardRef,
  useLayoutEffect,
} from "react";
import "./index.scss";
import { getLastTime, executeDataCollect } from "@/api/app";

function LastTime(props, ref) {
  const { onReload } = props;
  // 禁止重复点击
  const [Reload, setReload] = useState(false);
  const [Time, setTime] = useState(false);
  useEffect(() => {
    getLastTime().then((res) => {
      setTime(res);
      // 第二个参数为是否是初始
      typeof onReload === "function" && onReload(res,true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    Time && (
      <div className="reload-data" title={Time}>
        最后刷新：{Time}
        <i
          className="btn-reload"
          title={"刷新时间"}
          onClick={() => {
            if (Reload) {
              return;
            }
            setReload(true);
            executeDataCollect().then((res) => {
              setTime(res);
              typeof onReload === "function" && onReload(res);
              setReload(false);
            });
            // setReload(pre=>!pre)
          }}
        ></i>
      </div>
    )
  );
}

export default memo(forwardRef(LastTime));
