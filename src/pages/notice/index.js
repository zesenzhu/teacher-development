/*
 *                                |~~~~~~~|
 *                                |       |
 *                                |       |
 *                                |       |
 *                                |       |
 *                                |       |
 *     |~.\\\_\~~~~~~~~~~~~~~xx~~~         ~~~~~~~~~~~~~~~~~~~~~/_//;~|
 *     |  \  o \_         ,XXXXX),                         _..-~ o /  |
 *     |    ~~\  ~-.     XXXXX`)))),                 _.--~~   .-~~~   |
 *      ~~~~~~~`\   ~\~~~XXX' _/ ';))     |~~~~~~..-~     _.-~ ~~~~~~~
 *               `\   ~~--`_\~\, ;;;\)__.---.~~~      _.-~
 *                 ~-.       `:;;/;; \          _..-~~
 *                    ~-._      `''        /-~-~
 *                        `\              /  /
 *                          |         ,   | |
 *                           |  '        /  |
 *                            \/;          |
 *                             ;;          |
 *                             `;   .       |
 *                             |~~~-----.....|
 *                            | \             \
 *                           | /\~~--...__    |
 *                           (|  `\       __-\|
 *                           ||    \_   /~    |
 *                           |)     \~-'      |
 *                            |      | \      '
 *                            |      |  \    :
 *                             \     |  |    |
 *                              |    )  (    )
 *                               \  /;  /\  |
 *                               |    |/   |
 *                               |    |   |
 *                                \  .'  ||
 *                                |  |  | |
 *                                (  | |  |
 *                                |   \ \ |
 *                                || o `.)|
 *                                |`\\) |
 *                                |       |
 *                                |       |
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2021-01-05 09:10:48
 * @LastEditTime: 2021-01-05 09:10:48
 * @Description:
 * @FilePath: \teacher-development\src\pages\notice\index.js
 */

import React, {
  useCallback,
  memo,
  useEffect,
  useState,
  // useMemo,
  // useImperativeHandle,
  useRef,
  forwardRef,
  useLayoutEffect,
} from "react";
import {
  connect,
  // useSelector,
  useDispatch,
} from "react-redux";
import {
  withRouter,
  // , Route, Switch, NavLink
} from "react-router-dom";
import "./index.scss";
import { getDataStorage } from "../../util/public";
import { handleRoute } from "@/util/public";

function Notice(props, ref) {
  let {
    commonData: {
      roleMsg: { identityCode, productLevel },
      systemServer,
    },
    history,
    location,
  } = props;
  let token = getDataStorage("token");
  const [Url, setUrl] = useState("");
  // useEffect(() => {
  //   window.addEventListener("message", (e) => {
  //     try {
  //       let { btnName, sysid, url } = JSON.parse(e.data);
  //       // console.log(data)
  //       if (btnName && url) {
  //         window.open(url);
  //         history.push('/notice/'+encodeURIComponent(url))
  //       }
  //     } catch (e) {}
  //   });
  // }, []);
  // ????????????????????????????????????????????????
  useLayoutEffect(() => {
    let Path = handleRoute(location.pathname);

    if (!Path[1]&&systemServer[400]) {
      setUrl(
        systemServer[400].WebSvrAddr +
          "/WebPage/html/notice/?lg_tk=" +
          token +
          "&lg_ic=" +
          identityCode +
          (productLevel === 1 ? "&isEdu=true" : "") +
          "&sysID=L10&iFrame=true#/"
      );
    }else{
      
      setUrl(decodeURIComponent(Path[1]))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="Notice">
      <iframe
        className="notice-iframe"
        title="????????????"
        // src={'http://192.168.129.64:20105/publicinfo//WebPage/html/notice/?lg_tk=4FF1FDEC-D573-4EAD-9DEB-78B278973073&lg_ic=IC0002&sysID=E34&iFrame=true#/'}
        src={
          Url
        }
      ></iframe>
    </div>
  );
}
const mapStateToProps = (state) => {
  // let { UIState, DataState, PublicState } = state;
  // console.log(state)
  return state;
};
export default connect(mapStateToProps)(withRouter(memo(forwardRef(Notice))));
