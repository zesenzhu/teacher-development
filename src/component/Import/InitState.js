import CONFIG from "@/util/ipConfig";
let {Import} = CONFIG
const InitState = ({ props, type }) => {
  if (type === "excel") {
    return {
      Step: 1,

      ImportTitle: props.ImportTitle ? props.ImportTitle : "",

      ImportTarget: props.ImportTarget ? props.ImportTarget : "",

      ImportTargetName: props.ImportTargetName ? props.ImportTargetName : "",

      FtpPath: "",

      UpLoadFileName: "请选择文件...",

      ImportMouldes: [
        //导入师资信息
        {
          ID: "001",

          Url: `${Import}/import/DownloadFile.ashx?fileUrl=~%2FImport%2F%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls`,
        },
      ],

      StepLoading: false,

      UpLoadFile: "",

      AlertObj: {
        Type: 1,

        Title: "",

        Show: false,

        Hide: "",

        Close: "",

        Cancel: "",

        Ok: "",
      },

      BackEndData: [],

      BackEndDataCopy: [],

      BackEndFileParam: {},

      UpLoadResult: {
        Success: 0,

        Error: 0,

        Unique: 0,

        DownLoadPath: "",

        ImportDBAllowExistsError: true,
      },
    };
  } else if (type === "photo") {
    return {
      Step: 1,

      ImportTitle: props.ImportTitle ? props.ImportTitle : "",

      ImportTarget: props.ImportTarget ? props.ImportTarget : "Student",

      UpLoadFileName: "请选择文件...",

      UpLoadFile: "",

      AlertObj: {
        Type: 1,

        Title: "",

        Show: false,

        Hide: "",

        Close: "",

        Cancel: "",

        Ok: "",
      },

      UpLoadResult: {
        CompressFaile: [],

        Error: 0,

        NotExist: [],

        NotPic: [],

        Total: 0,
      },

      BlockSize: 1024 * 1024 * 2,

      UpLoadPercent: 0,

      FtpPath: "",
    };
  }
};

export default InitState;
