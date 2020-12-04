/*
 *           佛曰:
 *                   写字楼里写字间，写字间里程序员；
 *                   程序人员写程序，又拿程序换酒钱。
 *                   酒醒只在网上坐，酒醉还来网下眠；
 *                   酒醉酒醒日复日，网上网下年复年。
 *                   但愿老死电脑间，不愿鞠躬老板前；
 *                   奔驰宝马贵者趣，公交自行程序员。
 *                   别人笑我忒疯癫，我笑自己命太贱；
 *                   不见满街漂亮妹，哪个归得程序员？
 *
 * @Author: zhuzesen
 * @LastEditors: zhuzesen
 * @Date: 2020-11-17 18:50:57
 * @LastEditTime: 2020-12-04 14:28:43
 * @Description: 公共组件
 * @FilePath: \teacher-development\src\component\common\index.js
 */

import React, { memo } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import ReactDOM from "react-dom";
import "es6-shim";
import moment from "moment";
import $ from "jquery";
import "antd/dist/antd.min.css";
import "./index.scss";
import zhCN from "antd/es/locale/zh_CN";
import "moment/locale/zh-cn";
import {
  Spin,
  Input as AntdInput,
  ConfigProvider,
  Radio as AntRadio,
  Checkbox as AntCheckBox,
  Table as AntTable,
  Pagination as AntPagination,
  Button as AntdButton,
} from "antd";

moment.locale("zh-cn");

/*
 * 弹出框 start
 * */

class AppAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      left: 0,

      top: 0,

      xTemp: 0,

      yTemp: 0,

      can_move: false,

      readyShow: false,
    };
  }

  //关闭按钮
  closeAlert(e) {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }
  //点击ok
  ok(e) {
    const { onOk } = this.props;
    if (onOk) {
      onOk();
    }
  }
  //点击cancel按钮
  cancel(e) {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }

  componentDidUpdate() {
    const { show, type, onHide } = this.props;

    if (show) {
      if (
        type === "success" ||
        type === "error" ||
        type === "tips" ||
        type === "warn"
      ) {
        if (onHide) {
          setTimeout(onHide, 1000);
        }
      }
    }

    /*if(this.AlertBody&&show&&!this.state.readyShow){
  
              this.setState({readyShow:true,left:($(window).width() - this.AlertBody.clientWidth) /2,top:($(window).height() - this.AlertBody.clientHeight)/ 2});
  
          }
  
          if(!show&&this.state.readyShow){
  
              this.setState({can_move:false,readyShow:false});
  
          }*/

    //新的尝试 new try

    if (this.AlertBody && show && !this.state.readyShow) {
      this.AlertBody.style.left =
        ($(window).width() - this.AlertBody.clientWidth) / 2 + "px";

      this.AlertBody.style.top =
        ($(window).height() - this.AlertBody.clientHeight) / 2 + "px";

      this.setState({ readyShow: true });

      $(".alert_dialog_footer input.cancel").focus();
    }

    if (!show && this.state.readyShow) {
      this.setState({ readyShow: false });
    }
  }

  componentDidMount() {
    const { show } = this.props;

    /* if(this.AlertBody&&show&&!this.state.readyShow){
  
               this.setState({readyShow:true,left:($(window).width() - this.AlertBody.clientWidth) /2,top:($(window).height() - this.AlertBody.clientHeight)/ 2});
  
           }
  
           if(!show&&this.state.readyShow){
  
               this.setState({can_move:false,readyShow:false});
  
           }
  
           const that = this;
  
           $(document).on('dragstart', '.alert_dialog_wrapper', function(e) { return false; });
  
           $(document).on('mousedown', '.alert_dialog_wrapper', function(event) {
  
               let $win = $(event.target).closest('.alert_dialog_wrapper');
  
               $win.css('cursor', 'move');
  
               let mx = event.clientX;
  
               let my = event.clientY;
  
               let can_move = true;
  
               let xTemp = mx - parseInt($win.offset().left-$(window).scrollLeft());
  
               let yTemp = my - parseInt($win.offset().top-$(window).scrollTop());
  
               that.setState({
  
                   can_move,xTemp,yTemp
  
               })
  
           });
           //var win;
           ///MSIE 8.0/.test(window.navigator.userAgent) ? win = document : win = window;
  
           $(window).mousemove(function(event) {
  
               if (that.AlertBody) {
  
                   if (that.state.can_move){
  
                       let $win = $(event.target).closest('.alert_dialog_wrapper');
  
                       let $window = $(window);
  
                       let mx = event.clientX;
  
                       let my = event.clientY;
  
  
  
                       if (mx - that.state.xTemp > 0 && mx - that.state.xTemp < $window.width() - $win.width()) {
  
                           /!*$win.css('left', mx - xTemp+'px');*!/
  
                           that.setState({left:mx - that.state.xTemp});
  
  
  
                       }
  
                       if (my - that.state.yTemp > 0 && my - that.state.yTemp < $window.height() - $win.height()) {
  
                           /!*$win.css('top', my - yTemp+'px');*!/
  
                           that.setState({top:my - that.state.yTemp});
  
  
  
                       }
  
                   }
  
               }
  
           }).mouseup(function(event) {
  
               if (that.AlertBody){
  
                   that.setState({can_move:false});
  
                   $('.alert_dialog_wrapper').css('cursor', 'default');
  
               }
  
           });
   */

    //新的尝试 new try

    if (this.AlertBody && show && !this.state.readyShow) {
      this.AlertBody.style.left =
        ($(window).width() - this.AlertBody.clientWidth) / 2 + "px";

      this.AlertBody.style.top =
        ($(window).height() - this.AlertBody.clientHeight) / 2 + "px";

      this.setState({ readyShow: true });
    }

    if (!show && this.state.readyShow) {
      this.setState({ readyShow: false });
    }

    $(function () {
      var xTemp, yTemp;

      var can_move = false;

      $(document).on("dragstart", ".alert_dialog_dragheader", function () {
        return false;
      });

      $(document).on("mousedown", ".alert_dialog_dragheader", function (event) {
        let $win = $(event.target).closest(".alert_dialog_wrapper");

        can_move = true;

        $(".alert_dialog_wrapper").css("cursor", "move");

        var mx = event.pageX;

        var my = event.pageY;

        xTemp = mx - parseInt($win.css("left"));

        yTemp = my - parseInt($win.css("top"));
      });

      $(window)
        .mousemove(function (event) {
          if (can_move) {
            let $win = $(event.target).closest(".alert_dialog_wrapper");

            var $window = $(window);

            var mx = event.pageX;

            var my = event.pageY;

            if (mx - xTemp > 0 && mx - xTemp < $window.width() - $win.width()) {
              $win.css("left", mx - xTemp);
            }

            if (
              my - yTemp > 0 &&
              my - yTemp < $window.height() - $win.height()
            ) {
              $win.css("top", my - yTemp);
            }
          }
        })
        .mouseup(function () {
          can_move = false;

          $(".alert_dialog_wrapper").css("cursor", "default");
        });
    });
  }

  render() {
    const {
      type,
      title,
      abstract,
      okTitle,
      cancelTitle,
      show,
      contentMaxWidth,
      className,
    } = this.props;

    let { cancelShow, okShow } = this.props;

    let maskShow = false;

    let okContent,
      cancelContent = "";

    switch (type) {
      case "btn-success":
      case "btn-error":
      case "btn-warn":
        maskShow = true;
        okShow = okShow === "n" ? false : true;
        cancelShow = cancelShow === "n" ? false : true;
        okContent = okTitle ? okTitle : "确定";
        cancelContent = cancelTitle ? cancelTitle : "取消";
        break;
      case "btn-query":
        maskShow = true;
        okShow = okShow === "n" ? false : true;
        cancelShow = cancelShow === "n" ? false : true;
        okContent = okTitle ? okTitle : "确定";
        cancelContent = cancelTitle ? cancelTitle : "取消";
        break;
      case "btn-tips":
        maskShow = true;
        okShow = false;
        cancelShow = cancelShow === "n" ? false : true;
        cancelContent = cancelTitle ? cancelTitle : "我知道了";
        break;
      default:
        maskShow = false;
        cancelShow = false;
        okShow = false;
        okContent = "确定";
        cancelContent = "取消";
    }

    return (
      <React.Fragment>
        {show ? (
          maskShow ? (
            <React.Fragment>
              <div
                className={`alert_dialog_mask ${className ? className : ""}`}
                style={{ display: `${show ? "block" : "none"}` }}
              ></div>
              <div
                className={`alert_dialog_tab ${className ? className : ""}`}
                style={{ display: `${show ? "block" : "none"}` }}
              >
                <div
                  ref={(ref) => (this.AlertBody = ref)}
                  className="border alert_dialog_wrapper"
                  id="alert_dialog_wrapper"
                >
                  {/*style={{left:this.state.left,top:this.state.top}} 这个地方应该是AlertBody的行内样式*/}

                  <div className="alert_dialog_dragheader"></div>

                  <div
                    className="alert_close_btn"
                    onClick={this.closeAlert.bind(this)}
                  ></div>
                  <div
                    className={`alert_dialog_content ${
                      abstract ? "has-abstract" : ""
                    }`}
                  >
                    {abstract ? (
                      <div className={`big_icon ${type}`}></div>
                    ) : (
                      <div className={`left-icon ${type}`}></div>
                    )}
                    <div
                      className={`alert_dialog_msg ${abstract ? "big" : type}`}
                    >
                      {title}
                    </div>
                    {abstract ? (
                      <div className="alert_dialog_abstract">{abstract}</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="alert_dialog_footer">
                    {okShow ? (
                      <input
                        type="button"
                        className="ok"
                        onClick={this.ok.bind(this)}
                        value={okContent}
                      />
                    ) : (
                      ""
                    )}
                    {cancelShow ? (
                      <input
                        type="button"
                        className="cancel"
                        onClick={this.cancel.bind(this)}
                        value={cancelContent}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div
              className={`alert_tips_tab ${show ? "animation" : ""} ${
                className ? className : ""
              }`}
              ref="alert_tips_tab"
            >
              <div className="border">
                <div
                  className={`alert_tab_content ${type}`}
                  style={contentMaxWidth ? { maxWidth: contentMaxWidth } : {}}
                >
                  {title}
                </div>
              </div>
            </div>
          )
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
/*
 * 弹出框 end
 * */
/*
 * 加载中 start
 * */

class Loading extends React.Component {
  render() {
    const {
      type,
      size,
      tip,
      opacity,
      spinning,
      wrapperClassName,
      children,
      ...reset
    } = this.props;

    let Fragments = "";

    let opacityClass = "";

    if (opacity) {
      //透明度为true意味透明
      if (opacity === true) {
        opacityClass = "ant-spin-transparent";
      }
    } else {
      if (opacity === undefined) {
        //透明度为false意味不透明
        opacityClass = "";
      } else {
        opacityClass = "ant-spin-opaque";
      }
    }

    if (type) {
      if (type === "point") {
        //自己写的loading

        Fragments = (
          <div className={`loading_mask ${opacityClass}`}>
            <div className="loading_point_container">
              <div className="point_container">
                <span className="point1 point"></span>
                <span className="point2 point"></span>
                <span className="point3 point"></span>
                <span className="point4 point"></span>
              </div>
              <div className="point_loading_text">{tip}</div>
            </div>
          </div>
        );
      } else {
        //icon图标的loading
        // let antIcon = <Icon type={type} spin {...reset} />;
        Fragments = (
          <Spin
            // indicator={antIcon}
            spinning={spinning}
            size={size}
            tip={tip}
            wrapperClassName={`${
              wrapperClassName ? wrapperClassName : ""
            } ${opacityClass}`}
          >
            {children}
          </Spin>
        );
      }
    } else {
      //默认loading
      Fragments = (
        <Spin
          {...reset}
          size={size}
          spinning={spinning}
          tip={tip}
          wrapperClassName={`${
            wrapperClassName ? wrapperClassName : ""
          } ${opacityClass}`}
        >
          {children}
        </Spin>
      );
    }
    return (
      <React.Fragment>
        {" "}
        {/*空标签*/}
        {Fragments}
      </React.Fragment>
    );
  }
}
/*
 * 加载中 end
 * */
/*
 * 下拉 start
 * */
class DropComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropSelectd: props.dropSelectd ? props.dropSelectd : "",
      dropListShow: false,
      range2ListShow: "",
      range2ListActive: "",
      simpleSearchList: [],
      simpleSearchShow: false,
      simpleSearchValue: "",
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dropSelectd, dropList, type } = nextProps;

    let simpleSearchList = [];

    if (type !== "multiple") {
      simpleSearchList = dropList;
    }

    this.setState({ dropSelectd: dropSelectd, simpleSearchList });
  }

  onToggleDropList() {
    this.setState({ dropListShow: !this.state.dropListShow }, () => {
      $(this.refs.dropdown_select_ul).slideToggle("fast");
    });
  } //展示或者隐藏下拉列表

  onSimpleDropChange(e) {
    const { activeValue } = this.props;

    const { onChange, value, title } = e;

    this.setState(
      { dropListShow: false, dropSelectd: { value, title } },
      () => {
        $(this.refs.dropdown_select_ul).hide();
        if (onChange) {
          onChange({ value, title });
        }
      }
    );
  }

  //改变下拉选项的时候调用
  onMultipleRang2DropChange(e) {
    const { id, name, onChange } = e;
    this.setState(
      {
        //点击选项之后
        dropListShow: false,
        dropSelectd: {
          value: id,
          title: name,
        },
        range2ListActive: id,
      },
      () => {
        $(this.refs.dropdown_select_ul).hide(); //隐藏下拉框
        if (onChange) {
          onChange({ value: name, id: id }); //调用外部传入的行数
        }
      }
    );
  } //二级下拉改变下拉的时候调用

  onRange2ListShow(k1) {
    if (this.state.range2ListShow === k1) {
      this.setState({ range2ListShow: "" });
    } else {
      this.setState({ range2ListShow: k1 });
    }
  } //在二级的时候展开下拉

  componentDidMount() {
    document.addEventListener("click", (e) =>
      this.outDropClick({
        that: this,
        target: e.target,
        ulDom: this.refs.dropdown_select_ul,
        spanDom: this.refs.dropdown_default_span,
      })
    ); //当点击事件发生在下拉之外的时候
  }

  outDropClick(e) {
    const { that, target, ulDom, spanDom } = e;

    const { dropList = [] } = this.props;

    if (ulDom && spanDom) {
      //在该界面上已有该组件才这样展示
      if (!spanDom.contains(target) && !ulDom.contains(target)) {
        that.setState(
          {
            dropListShow: false,
            simpleSearchList: dropList,
            simpleSearchShow: false,
            simpleSearchValue: "",
          },
          () => {
            $(ulDom).hide();
          }
        );
      }
    }
  } //当点击事件发生在下拉组件之外的时候
  onClickSearch(e) {
    const { mutipleOptions } = this.props;
    if (e.value) {
      if (mutipleOptions && mutipleOptions.dropClickSearch) {
        mutipleOptions.dropClickSearch(e);
      }
    } else {
      if (mutipleOptions && mutipleOptions.dropClickSearch) {
        mutipleOptions.dropClickSearch(e);
      }
    }
  } //点击搜索之后
  onCancelSearch(e) {
    const { mutipleOptions } = this.props;

    if (mutipleOptions && mutipleOptions.dropCancelSearch) {
      mutipleOptions.dropCancelSearch();
    }
  }

  simpleSearch() {
    const { dropList } = this.props;

    if (this.state.simpleSearchValue) {
      const list = dropList.filter((i) => {
        if (typeof i.title === "string" || typeof i.title === "number") {
          return i.title.toString().includes(this.state.simpleSearchValue);
        } else {
          let hasValue = this.recursive(i.title);

          return hasValue;
        }
      });

      const simpleSearchList =
        list.length > 0
          ? list
          : [{ value: "symbol_none_value", title: "无数据" }];

      this.setState({ simpleSearchShow: true, simpleSearchList });
    }
  }

  //递归函数
  recursive(reactDom) {
    let hasValue = false;

    if (
      typeof reactDom.props.children === "string" ||
      typeof reactDom.props.children === "number"
    ) {
      if (
        reactDom.props.children
          .toString()
          .includes(this.state.simpleSearchValue)
      ) {
        hasValue = true;
      }
    } else {
      for (let i = 0; i <= reactDom.props.children.length - 1; i++) {
        if (!hasValue) {
          if (
            typeof reactDom.props.children[i] === "string" ||
            typeof reactDom.props.children[i] === "number"
          ) {
            if (
              reactDom.props.children[i]
                .toString()
                .includes(this.state.simpleSearchValue)
            ) {
              hasValue = true;
            }
          } else {
            hasValue = this.recursive(reactDom.props.children[i]);
          }
        }

        return hasValue;
      }
    }
  }
  //简单搜索的值发生变化
  simpleSearchValueChange(e) {
    const { dropList } = this.props;

    const searchValue = e.target.value;

    this.setState(
      {
        simpleSearchValue: searchValue,
      },
      () => {
        const list = dropList.filter((i) => {
          if (typeof i.title === "string" || typeof i.title === "number") {
            return i.title.toString().includes(searchValue);
          } else {
            let hasValue = this.recursive(i.title);

            return hasValue;
          }
        });

        const simpleSearchList =
          list.length > 0
            ? list
            : [{ value: "symbol_none_value", title: "无数据" }];

        this.setState({ simpleSearchShow: true, simpleSearchList });
      }
    );
    // }

    // return hasValue;
  }

  // //简单搜索的值发生变化
  // simpleSearchValueChange(e) {
  //   this.setState({
  //     simpleSearchValue: e.target.value,
  //   });
  // }

  //简单搜索关闭

  simpleSearchClose() {
    const { dropList } = this.props;

    this.setState({
      simpleSearchValue: "",
      simpleSearchShow: false,
      simpleSearchList: dropList,
    });
  }

  render() {
    const {
      Title,
      TitleShow,
      title,
      width,
      height,
      activeValue,
      disabled,
      dropSelectd,
      dropList,
      onChange,
      type,
      className,
      mutipleOptions,
      dropLoadingShow,
      dropSimpleSearch,
      ...reset
    } = this.props;

    let simpleSearchList = [];

    if (type !== "multiple" && this.state.simpleSearchShow) {
      simpleSearchList = this.state.simpleSearchList;
    } else {
      simpleSearchList = dropList;
    }

    let dropContainer = "";

    let selectUlWidth =
      mutipleOptions && mutipleOptions.width ? mutipleOptions.width : 540;

    let selectUlHeight =
      mutipleOptions && mutipleOptions.height ? mutipleOptions.height : 280;

    let searchWidth =
      mutipleOptions && mutipleOptions.searchWidth
        ? mutipleOptions.searchWidth
        : 320;

    let scrollWrapperWidth =
      mutipleOptions && mutipleOptions.width ? mutipleOptions.width - 20 : 520;

    let scrollWrapperHeight =
      mutipleOptions && mutipleOptions.height
        ? mutipleOptions.height - 72
        : 228;

    let searchOpen =
      mutipleOptions && mutipleOptions.searchOpen
        ? mutipleOptions.searchOpen
        : false;

    //所需的参数
    let dropMultipleList = "";

    //判断等级渲染相对应的元素
    if (searchOpen) {
      //如果开启搜索的话

      dropMultipleList = (
        <ul className="dropdown_list_ul3 clearfix" style={{ display: "block" }}>
          <Loading
            tip="加载中..."
            opacity={false}
            spinning={
              mutipleOptions && mutipleOptions.searchLoadingShow
                ? mutipleOptions.searchLoadingShow
                : false
            }
          >
            {mutipleOptions.searchList.length > 0 ? (
              mutipleOptions.searchList.map((item, ks) => {
                let CanActive = "";

                if (mutipleOptions.dropSelectd) {
                  CanActive =
                    mutipleOptions.dropSelectd.value === item.id
                      ? "active"
                      : "";
                } else {
                  CanActive =
                    this.state.range2ListActive === item.id ? "active" : "";
                }

                return (
                  <li
                    key={ks}
                    className={`dropdown_item3_li ${CanActive}`}
                    onClick={this.onMultipleRang2DropChange.bind(this, {
                      name: item.name,
                      id: item.id,
                      onChange: mutipleOptions.dropMultipleChange,
                    })} //绑定点击事件
                    title={TitleShow ? (Title ? Title : item.name) : ""}
                  >
                    <span className="dropdown_item3_name">{item.name}</span>
                  </li>
                );
              })
            ) : (
              <Empty
                type="5"
                title={
                  mutipleOptions.empSearchTitle
                    ? mutipleOptions.empSearchTitle
                    : "暂未有相关数据"
                }
              ></Empty>
            )}
          </Loading>
        </ul>
      );
    } else if (mutipleOptions && mutipleOptions.range === 2) {
      //如果range的等级为2

      //内容是否为空
      if (
        mutipleOptions.dropMultipleList &&
        mutipleOptions.dropMultipleList.length > 0
      ) {
        dropMultipleList = mutipleOptions.dropMultipleList.map((item1, k1) => {
          //遍历第一个数组

          return (
            <li key={k1} className="dropdown_list_item1">
              <div
                className={`dropdown_item1_name ${
                  this.state.range2ListShow === k1 ? "slide" : ""
                }`} //判断是否是活动状态
                title={TitleShow ? (Title ? Title : item1.name) : ""}
                onClick={this.onRange2ListShow.bind(this, k1)}
              >
                {item1.name}
              </div>
              <ul
                ref={`dropdown_list_ul3_${k1}`}
                className={`dropdown_list_ul3 clearfix`}
                style={{
                  display: `${
                    this.state.range2ListShow === k1 ? "block" : "none"
                  }`,
                }}
              >
                {
                  //遍历第二个数组
                  item1.list.map((item2, k2) => {
                    let CanActive = "";

                    if (mutipleOptions.dropSelectd) {
                      CanActive =
                        mutipleOptions.dropSelectd.value === item2.id
                          ? "active"
                          : "";
                    } else {
                      CanActive =
                        this.state.range2ListActive === item2.id
                          ? "active"
                          : "";
                    }

                    return (
                      <li
                        key={k2}
                        className={`dropdown_item3_li ${CanActive}`} //判断是否是active
                        title={TitleShow ? (Title ? Title : item2.name) : ""}
                        onClick={this.onMultipleRang2DropChange.bind(this, {
                          name: item2.name,
                          id: item2.id,
                          onChange: mutipleOptions.dropMultipleChange,
                        })} //绑定点击事件
                      >
                        <span className="dropdown_item3_name">
                          {item2.name}
                        </span>
                      </li>
                    );
                  })
                }
              </ul>
            </li>
          );
        });
      } else {
        dropMultipleList = (
          <Empty
            type="3"
            title={
              mutipleOptions.empTitle
                ? mutipleOptions.empTitle
                : "暂未有相关数据"
            }
          ></Empty>
        );
      }
    } else if (mutipleOptions && mutipleOptions.range === 3) {
      //等待后期扩展使用
    }

    if (type && type === "multiple") {
      dropContainer = (
        <div
          ref="dropdown_select_ul"
          className="dropdown_select_ul"
          style={{ width: selectUlWidth }}
        >
          <div className="dropdown_multiple_container">
            <div className="dropdown_search_wrapper">
              <Search
                placeHolder={
                  mutipleOptions && mutipleOptions.searchPlaceholder
                    ? mutipleOptions.searchPlaceholder
                    : null
                }
                width={searchWidth}
                onClickSearch={this.onClickSearch.bind(this)}
                onCancelSearch={this.onCancelSearch.bind(this)}
                CancelBtnShow={mutipleOptions.CancelBtnShow}
                Value={mutipleOptions.inputValue}
              ></Search>
            </div>

            <Scrollbars
              renderTrackHorizontal={(props) => {
                return <span style={{ display: "none" }}></span>;
              }}
              renderThumbHorizontal={(props) => {
                return <span style={{ display: "none" }}></span>;
              }}
              autoHeight
              autoHeightMin={160}
              autoHeightMax={scrollWrapperHeight}
              style={{ width: scrollWrapperWidth }}
            >
              <Loading
                opacity={false}
                spinning={
                  mutipleOptions && mutipleOptions.dropLoadingShow
                    ? mutipleOptions.dropLoadingShow
                    : false
                }
              >
                <ul className="dropdown_list_ul">{dropMultipleList}</ul>
              </Loading>
            </Scrollbars>
          </div>
        </div>
      );
    } else {
      dropContainer = (
        <ul
          className="dropdown_select_ul"
          ref="dropdown_select_ul"
          style={{ width: width, overflow: "initial" }}
        >
          <Loading opacity={false} spinning={dropLoadingShow}>
            {dropList && dropList.length > 12 && dropSimpleSearch ? (
              <li className={"dropdown_select_search"}>
                <AntdInput
                  value={this.state.simpleSearchValue}
                  onChange={this.simpleSearchValueChange.bind(this)}
                  onPressEnter={this.simpleSearch.bind(this)}
                  className={"search-input"}
                />

                <i
                  onClick={this.simpleSearchClose.bind(this)}
                  className={"dropdown_search_close"}
                  style={{
                    display: `${
                      this.state.simpleSearchShow ? "block" : "none"
                    }`,
                  }}
                ></i>

                <i
                  onClick={this.simpleSearch.bind(this)}
                  className={"drop_search_btn"}
                  style={{
                    display: `${
                      this.state.simpleSearchShow ? "none" : "block"
                    }`,
                  }}
                ></i>
              </li>
            ) : null}

            <Scrollbars
              autoHeight
              autoHeightMin={0}
              autoHeightMax={height ? height : 288}
              // style={{height:height?(this.state.simpleSearchList.length*24<height?this.state.simpleSearchList.length*24:height):'auto'}}
              renderTrackHorizontal={(props) => {
                return <span style={{ display: "none" }}></span>;
              }}
              renderThumbHorizontal={(props) => {
                return <span style={{ display: "none" }}></span>;
              }}
            >
              {simpleSearchList.map((item, key) => {
                return (
                  <li
                    key={key}
                    className={`dropdown_select_li ${
                      activeValue && activeValue === item.value
                        ? "active"
                        : dropSelectd.value === item.value
                        ? "active"
                        : ""
                    }`}
                    title={TitleShow ? (Title ? Title : item.title) : ""}
                    data-vaule={item.value}
                    onClick={
                      item.value === "symbol_none_value"
                        ? () => {}
                        : this.onSimpleDropChange.bind(this, {
                            onChange: onChange,
                            value: item.value,
                            title: item.title,
                          })
                    }
                  >
                    {item.title}
                  </li>
                );
              })}
            </Scrollbars>
          </Loading>
        </ul>
      );
    }

    return (
      <div
        className={`dropdown_container ${className ? className : ""}`}
        {...reset}
      >
        <span className="dropdown_title_span">{title}</span>
        <span className="dropdown_wrapper" style={{ width: width }}>
          <span
            ref="dropdown_default_span"
            className={`dropdown_default_span ${disabled ? "disabled" : ""}`}
            onClick={
              //点击展示和隐藏下拉列表
              disabled ? () => {} : this.onToggleDropList.bind(this)
            }
            style={{ width: width }}
          >
            <span
              className={`dropdown_icon_span ${
                this.state.dropListShow ? "slide" : ""
              }`}
            ></span>
            {
              //判断this.state.dropSelectd?this.state.dropSelectd:(判断外界传入的dropSelectd？外界传入的dropSelectd:'')
              this.state.dropSelectd ? (
                <span
                  data-value={this.state.dropSelectd.value}
                  className="dropdown_text_span"
                  title={
                    TitleShow
                      ? Title
                        ? Title
                        : this.state.dropSelectd.title
                      : ""
                  }
                >
                  {this.state.dropSelectd.title}
                </span>
              ) : dropSelectd ? (
                <span
                  data-value={dropSelectd.value}
                  className="dropdown_text_span"
                  title={TitleShow ? (Title ? Title : dropSelectd.title) : ""}
                >
                  {dropSelectd.title}
                </span>
              ) : (
                ""
              )
            }
          </span>

          {dropContainer}
        </span>
      </div>
    );
  }
}
/*
 * 下拉 end
 * */
/*
 * 搜索 start
 * */
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectShow: false,
      selectdValue: "",
      cancleShow: false,
      inputFocus: false,
      Value: "",
      SearchBlank: false,
    };
  }

  InputChange(e) {
    this.setState({ Value: e.target.value });
  }

  componentDidMount() {
    const { select } = this.props;
    if (select) {
      document.addEventListener("click", (e) =>
        this.outSpanClickHandler({
          that: this,
          target: e.target,
          spanDom: this.refs.search_select_span,
          ulDom: this.refs.search_select_ul,
        })
      ); //点击其他地方将需要进行判断的元素传输给事件outSpanClickHandler
    }
  }

  toggleSelectd(e) {
    //切换下拉和上拉
    this.setState({ selectShow: !this.state.selectShow }, () => {
      $(this.refs.search_select_ul).slideToggle("fast");
    });
  } //切换下拉状态为slideDown和slideUp
  changeSelect(e) {
    const { selectChange } = this.props;

    this.setState({ selectdValue: { value: e.value, title: e.title } });
    this.setState({ selectShow: !this.state.selectShow }, () => {
      $(this.refs.search_select_ul).hide();

      selectChange(e);
    });
  } //改变选项
  outSpanClickHandler(e) {
    const { target, ulDom, that, spanDom } = e;
    if (spanDom && !spanDom.contains(target)) {
      that.setState({ selectShow: false }, () => {
        $(ulDom).hide();
      });
    }
  } //点击其他地方将下拉收起
  onInputFocus() {
    this.setState({ inputFocus: true });
  } //input focus事件

  //点击搜索按钮事件

  SearchClick() {
    const { onClickSearch, select, selectOptions } = this.props;

    if (this.SearchInput.value.trim()) {
      this.setState({ cancleShow: true, SearchBlank: false }, () => {
        if (onClickSearch) {
          onClickSearch({
            selectdValue: select
              ? this.state.selectdValue
                ? this.state.selectdValue.value
                : selectOptions.selectdValue.value
              : null,
            value: this.SearchInput.value,
          });
        }
      });
    } else {
      this.setState({ SearchBlank: true });

      this.SearchInput.focus();
    }
  }

  onInputBlur() {
    this.setState({ inputFocus: false, SearchBlank: false });
  } //input blur事件
  handleEnterKey(e) {
    const { select, selectOptions, onClickSearch, onSearchKeyUp } = this.props;

    if (e.nativeEvent.keyCode === 13) {
      if (this.SearchInput.value.trim()) {
        this.setState({ cancleShow: true, SearchBlank: false }, () => {
          if (onClickSearch) {
            return onClickSearch({
              selectdValue: select
                ? this.state.selectdValue
                  ? this.state.selectdValue.value
                  : selectOptions.selectdValue.value
                : null,
              value: this.SearchInput.value,
            });
          }
        });
      } else {
        this.setState({ SearchBlank: true });

        this.SearchInput.focus();
      }
    } else {
      if (onSearchKeyUp) {
        onSearchKeyUp();
      }
    }
  } //键盘enter事件
  render() {
    const {
      width,
      select,
      selectChange,
      placeHolder,
      selectOptions,
      onClickSearch,
      onCancelSearch,
      className,
      CancelBtnShow,
      Value,
      onChange,
    } = this.props;

    let CancelBtnDisplay = CancelBtnShow
      ? CancelBtnShow === "y"
        ? "block"
        : "none"
      : this.state.cancleShow === true
      ? "block"
      : "none";

    return (
      <div
        className={`search_container ${className ? className : ""}  ${
          this.state.SearchBlank ? "border" : ""
        }`}
        style={{
          width: width ? width : "",
          borderColor: this.state.SearchBlank
            ? "#ff0000"
            : this.state.inputFocus
            ? "#5897ed"
            : "#bac7d9",
        }}
      >
        <table className="search_wrapper_table">
          <tbody>
            <tr>
              {
                //控制下拉部分的宽度
                select ? (
                  <td
                    style={{
                      width:
                        selectOptions && selectOptions.width
                          ? selectOptions.width
                          : "86px",
                    }}
                  >
                    <div className="search_select_wrapper">
                      <span
                        className="search_select_span"
                        ref="search_select_span"
                        onClick={this.toggleSelectd.bind(this)}
                        style={{
                          width:
                            selectOptions && selectOptions.width
                              ? selectOptions.width - 14
                              : "",
                        }}
                      >
                        <span
                          className={`search_select_icon ${
                            this.state.selectShow === true
                              ? "search_slide_icon"
                              : ""
                          }`}
                        ></span>
                        {
                          // 判断是否有state的选中值（this.state.selectdValue）?使用state.selectdValue值：(判断是否有外界传值)?使用外界传值:''

                          selectOptions && selectOptions.selectdValue ? (
                            <span
                              className="search_select_text"
                              data-value={selectOptions.selectdValue.value}
                              title={selectOptions.selectdValue.title}
                            >
                              {selectOptions.selectdValue.title}
                            </span>
                          ) : this.state.selectdValue ? (
                            <span
                              className="search_select_text"
                              data-value={this.state.selectdValue.value}
                              title={this.state.selectdValue.title}
                            >
                              {this.state.selectdValue.title}
                            </span>
                          ) : (
                            ""
                          )
                        }
                      </span>
                      <ul className="search_select_ul" ref="search_select_ul">
                        {
                          //选项列表 (是否外界传值)？：使用外界值：''
                          selectOptions && selectOptions.selectList
                            ? selectOptions.selectList.map((item, k) => {
                                return (
                                  <li
                                    key={k}
                                    onClick={this.changeSelect.bind(this, {
                                      value: item.value,
                                      title: item.title,
                                    })}
                                    className="search_select_li"
                                    data-value={item.value}
                                    title={item.title}
                                  >
                                    {item.title}
                                  </li>
                                );
                              })
                            : ""
                        }
                      </ul>
                      <span className="search_select_gap"></span>
                    </div>
                  </td>
                ) : null
              }
              <td className="search_left_td">
                <input
                  ref={(ref) => (this.SearchInput = ref)}
                  className={`search_text_input`}
                  type="text"
                  placeholder={placeHolder ? placeHolder : "输入关键词快速搜索"}
                  onFocus={this.onInputFocus.bind(this)}
                  onBlur={this.onInputBlur.bind(this)}
                  onKeyUp={this.handleEnterKey.bind(this)}
                  value={Value ? Value : this.state.Value}
                  onChange={onChange ? onChange : this.InputChange.bind(this)}
                />
                <input
                  className="search_cancel_input"
                  type="button"
                  onClick={() => {
                    this.setState({ cancleShow: false, Value: "" }, () => {
                      this.SearchInput.value = "";
                      if (onCancelSearch) {
                        onCancelSearch({
                          selectdValue: select
                            ? this.state.selectdValue
                              ? this.state.selectdValue.value
                              : selectOptions.selectdValue.value
                            : null,

                          value: "",
                        });
                      }
                    });
                  }}
                  style={{ display: CancelBtnDisplay }}
                />
              </td>
              <td className="search_right_td">
                <div
                  className="search_btn_input"
                  onClick={(e) => this.SearchClick(e)}
                ></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
/*
 * 空数据提示
 * */
class Empty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      title: props.title,
      style: props.style,
      className: props.className ? props.className : "",
      noTitle: props.noTitle,
      className_1: "tips-error-1",
      imageStyle: props.imageStyle,
      titleStyle: !props.noTitle
        ? props.titleStyle
          ? props.titleStyle
          : ""
        : "noTitle",
    };
  }
 // eslint-disable-next-line react-hooks/exhaustive-deps
   componentWillReceiveProps(nextProps) {
    const { style } = nextProps;

    this.setState({
      title: nextProps.title,
      style: style,
    });
    this.selectType(this.state.type);
  }

  selectType = (type) => {
    let className_1 = "tips-error-1";
    switch (type) {
      case "1":
        if (!this.state.title) this.setState({ title: "请选择要查看的学校" });
        className_1 = "tips-error-1";
        break;
      case "2":
        if (!this.state.title) this.setState({ title: "早起的鸟儿有虫吃~" });
        className_1 = "tips-error-2";
        break;
      case "3":
        if (!this.state.title)
          this.setState({ title: "空空如也，暂时还没有资源～" });
        className_1 = "tips-error-3";
        break;
      case "4":
        if (!this.state.title)
          this.setState({ title: "空空如也，暂时还没有资料～" });
        className_1 = "tips-error-4";
        break;
      case "5":
        if (!this.state.title)
          this.setState({ title: "无搜索结果，换个词试试吧~" });
        className_1 = "tips-error-5";
        break;
      default:
        if (!this.state.title) this.setState({ title: "请选择要查看的学校" });
        className_1 = "tips-error-1";
        break;
    }

    this.setState({
      className_1: className_1,
    });
  };

  componentWillMount() {
    this.selectType(this.state.type);
  }

  render() {
    return (
      <div
        className={`emptyBox ${this.state.className}`}
        style={this.state.style}
      >
        <i
          style={this.state.imageStyle}
          className={`empty ${this.state.className_1}`}
        ></i>
        <span className={`initTitle ${this.state.titleStyle}`}>
          {this.state.title}
        </span>
      </div>
    );
  }
}
/*
 * 搜索 end
 * */
/*
 * 选择组件（单选、多选、全选） start
 * */
class Radio extends React.Component {
  render() {
    const { children, type, ...reset } = this.props;

    let ClassName = "";

    switch (type) {
      case "gray":
        ClassName = "ant-radio-gray";

        break;

      case "green":
        ClassName = "ant-radio-green";

        break;

      default:
        ClassName = "";
    }

    return (
      <ConfigProvider locale={zhCN}>
        <AntRadio className={ClassName} {...reset}>
          {children}
        </AntRadio>
      </ConfigProvider>
    );
  }
}
class RadioGroup extends React.Component {
  render() {
    const { children, ...reset } = this.props;
    return (
      <ConfigProvider locale={zhCN}>
        <AntRadio.Group {...reset}>{children}</AntRadio.Group>
      </ConfigProvider>
    );
  }
}
class CheckBox extends React.Component {
  render() {
    const { children, className, type, ...reset } = this.props;

    let CheckClassName = "";

    switch (type) {
      case "gray":
        CheckClassName = "ant-checkbox-gray";

        break;

      case "circle":
        CheckClassName = "ant-checkbox-circle";

        break;

      default:
        CheckClassName = "";
    }

    return (
      <ConfigProvider locale={zhCN}>
        <AntCheckBox
          className={`${className ? className : ""} ${CheckClassName}`}
          {...reset}
        >
          {children}
        </AntCheckBox>
      </ConfigProvider>
    );
  }
}
class CheckBoxGroup extends React.Component {
  render() {
    const { children, ...reset } = this.props;
    return (
      <ConfigProvider locale={zhCN}>
        <AntCheckBox.Group {...reset}>{children}</AntCheckBox.Group>
      </ConfigProvider>
    );
  }
}
/*
 * 选择组件（单选、多选、全选） end
 * */

/*
 * table组件 start
 * */
class Table extends React.Component {
  render() {
    const { children, ...reset } = this.props;
    return (
      <ConfigProvider locale={zhCN}>
        <AntTable {...reset}>{children}</AntTable>
      </ConfigProvider>
    );
  }
}
/*
 * table组件 end
 * */
/*
 * 分页组件 start
 * */
class PageComponent extends React.Component {
  render() {
    const { children, size, className, showSizeChanger, ...reset } = this.props;

    return (
      <ConfigProvider locale={zhCN}>
        <AntPagination
          className={`${className ? className : ""} ${
            size && size === "micro" ? "micro" : ""
          } `}
          size={size}
          showSizeChanger={showSizeChanger}
          showTotal={
            showSizeChanger
              ? (total) => (
                  <span>
                    共<span style={{ color: "#ff6600" }}>{total}</span>条
                  </span>
                )
              : () => {}
          }
          {...reset}
        >
          {children}
        </AntPagination>
      </ConfigProvider>
    );
  }
}
/*
 * 分页组件 end
 * */

/**
 * @description: 封装的错误提醒
 * @param {*}
 * @return {*component}
 */
export class ErrorAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
    };
  }

  onOk = () => {
    let { onOk } = this.props;
    typeof onOk === "function" && onOk();
    this.setState({
      show: false,
    });
  };

  onCancel = () => {
    let { onCancel } = this.props;
    typeof onCancel === "function" && onCancel();
    this.setState({
      show: false,
    });
  };
  onClose = () => {
    let { onClose } = this.props;
    typeof onClose === "function" && onClose();
    this.setState({
      show: false,
    });
  };

  render() {
    // console.log(this.state.show)
    return (
      <Alert
        show={this.state.show}
        type="btn-error"
        title={this.props.title}
        onOk={this.onOk}
        onCancel={this.onCancel}
        onClose={this.onClose}
        cancelShow={"n"}
      ></Alert>
    );
  }
}

/**
 * @description: 高阶组件，封装组件挂载在alert上
 * @param {*component}
 * @return {*component}
 */
// 暂时不能用
export const withAlert = (Component) => {
  if (!(Component instanceof Object)) {
    console.log("Component 不是组件:"+Component);
    return;
  }
  let AlertDom = document.getElementById("alert");
  if (!AlertDom) {
    //alert节点不存在，创建一个
    let body = document.getElementsByTagName("body")[0];
    let alert = document.createElement("div");
    alert.setAttribute("id", "alert");
    body.appendChild(alert);
    AlertDom = document.getElementById("alert");
  }
  ReactDOM.render(Component, AlertDom);
};
const PagiNation = memo(PageComponent);
const Alert = memo(AppAlert);
const DropDown = memo(DropComponent);
export {
  Alert,
  Loading,
  DropDown,
  Search,
  Empty,
  PagiNation,
  Table,
  CheckBoxGroup,
  CheckBox,
  RadioGroup,
  Radio,
};
