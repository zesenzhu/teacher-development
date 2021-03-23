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
  // useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import ImportExcel from "@/component/Import/ImportExcel";
import { withRouter } from "react-router-dom";

function ImportFile(props, ref) {
    let {title,target} = props
  return (
    <ImportExcel ImportTitle={title||'导入师资信息'} ImportTarget={target||'001'}></ImportExcel>
  );
}

const mapStateToProps = (state) => {
  let {
    handleData: { teacherRecruitMsg },
    commonData: { roleMsg },
  } = state;
  return { teacherRecruitMsg, roleMsg };
};
export default connect(
  mapStateToProps,
  null,
  null,
  true
)(withRouter(memo(forwardRef(ImportFile))));
