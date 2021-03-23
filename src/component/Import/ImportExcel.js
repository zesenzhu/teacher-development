import React,{Component} from 'react';

import { DropDown,Alert,Loading } from "@/component/common/index";

import utils from './utils';

import InitState from './InitState';

import './scss/index.scss';


class Import extends Component{

    constructor(props) {

        super(props);

        this.state = InitState({props,type:'excel'});

    }


    //第一步的事件

    //点击上传

    InputFileClick(e){

        this.Input.click();

    }

    //上传文件改变后

    UploadFileChange(e){

        const File = e.target.files[0];

        const FileName = this.Input.value;

        const FileType = FileName.substring(FileName.lastIndexOf('.')).toLowerCase();

        if (File){

            if(FileType==='.xls'||FileType==='.xlsx'){

                //是Excel的类型
                //excel大小
                if (File.size<=4194304){

                    if (File.size!==0){

                        //查看是否含有虚假路径
                        if(FileName.includes('C:\\fakepath\\')){

                            this.setState({UpLoadFileName:File.name,UpLoadFile:File});

                        }else{

                            this.setState({UpLoadFileName:FileName,UpLoadFile:File});

                        }

                    }else{

                        utils.AlertWarn({that:this,title:"Excel文件大小不能为0，请重新选择文件！"});

                        this.Input.value = '';

                    }

                }else{

                    utils.AlertWarn({that:this,title:"Excel文件最大为4M，请重新选择文件!"});

                    this.Input.value = '';

                }

            }else{

                //弹出警告窗

                utils.AlertWarn({that:this,title:"请上传后缀名为xlsx或xls的Excel文件!"});

                this.Input.value = '';

            }

        }

    }


    //点击提交上传
    UploadCommit(e) {

        const File = this.state.UpLoadFile;

        if (File){

            let formData = new FormData();

            const ImportTarget = this.state.ImportTarget;

            const token = sessionStorage.getItem('token');

            const {UserID, UserName, SchoolID} = JSON.parse(sessionStorage.getItem('UserInfo'));

            formData.append('userId',UserID);

            formData.append("userName",UserName);

            formData.append("token", token);

            formData.append("tbNames",ImportTarget);

            formData.append("schoolID",SchoolID);

            formData.append("file",File);

            this.setState({Step:2,StepLoading:true});

            //上传文件
            utils.FileUpLoad({formData,that:this}).then(data=>{

                if (data){

                    //上传成功
                    const { msg,needComfirm,fileName,tabName,contentStartNum } = data;

                    this.setState({BackEndFileParam:{needComfirm,fileName,tabName,contentStartNum}});

                    const token = sessionStorage.getItem('token');

                    const { UserID,SchoolID,UserName } = JSON.parse(sessionStorage.getItem('UserInfo'));

                    if (needComfirm){//需要做前端处理

                        const ColAttr = JSON.parse(msg);

                        const { relation,cols } = ColAttr;

                        //放下拉列表
                        const colList = cols.map(item=>{

                            const arr =  item.split('@');

                            return {

                                value:arr[1],

                                title:arr[0]

                            }

                        });

                        const ExcelData = relation.map(item=>{

                            let DropSelectd = {value:"none",title:"请选择"};

                            if (item.matchCol!=='-1'){

                                DropSelectd = colList.find(i=>i.value===item.matchCol);

                            }

                            return {

                                ColID:item.colName,

                                ColName:item.zhName,

                                DropSelectd,

                                DropList:colList,

                               isNecessary:item.isNecessary

                            }

                        });

                        this.setState({

                            BackEndData:Array.from(ExcelData),

                            BackEndDataCopy:Array.from(ExcelData)

                        },()=>{

                            this.setState({StepLoading:false});

                        });

                    }else{//不需要前端做处理

                        this.setState({Step:3});

                        const ColAttr = JSON.parse(msg);

                        const cols = ColAttr.relation.map(item=>{

                            return {

                                name:item.colName,

                                value:item.matchCol

                            }

                        }).serializeObject('cols');

                        const colNames = ColAttr.relation.map(item=>item.zhName).join(',');

                        //提交最终结果
                        utils.LastStepCommit({

                            cols,colNames,fileName,userId:UserID,userName:UserName,

                            token,tbName:tabName,contentStartNum,schoolID:SchoolID,that:this

                        }).then(data=>{

                            if (data){

                                this.setState({

                                    Step:4,

                                    UpLoadResult:{

                                        ...this.state.UpLoadResult,

                                        ImportSuccess:true,

                                        Success:data.succNum,

                                        Error:data.errNum,

                                        Unique:data.uniqueNum,

                                        DownLoadPath:data.url,

                                        ImportDBAllowExistsError:data.importDBAllowExistsError

                                    }

                                });

                                if (data.succNum>0&&window.opener){

                                    window.opener.location.reload();

                                }

                            }

                        });

                    }

                }

            });

        }else{

            utils.AlertWarn({title:"请先选择文件！",that:this});

        }


    }

    //第二步

    //选择变化
    DropChange(e,ColID) {

        const BackEndData = this.state.BackEndData;

        const NewData = BackEndData.map(item=>{

            if (item.ColID===ColID){

                return {

                    ...item,

                    DropSelectd:e

                }

            }else{

                return item;

            }

        });

        this.setState({

            BackEndData:Array.from(NewData)

        });

    }

    //删除某一行

    DelTr(ColID){

        let BackEndData = this.state.BackEndData;

        const Index = BackEndData.findIndex(item=>item.ColID===ColID);

        BackEndData.splice(Index, 1);

        this.setState({BackEndData});

    }

    //返回上一步

    BackStep(){

        const {BackEndFileParam} = this.state;

        const token = sessionStorage.getItem('token');

        const { UserID,SchoolID,UserName } = JSON.parse(sessionStorage.getItem('UserInfo'));

        const {fileName} = BackEndFileParam;

        utils.DeleteFile({fileName,userId:UserID,userName:UserName,schoolID:SchoolID,token,that:this}).then(data=>{

            if (data===0){

                this.setState({Step:1,UpLoadFile:'',UpLoadFileName:'请选择文件...'});

                this.Input.value='';

            }

        })

    }

    //重置

    ResetFileData(e){

       const { BackEndDataCopy } = this.state;

       this.setState({BackEndData:Array.from(BackEndDataCopy)});

    }


    //点击提交按钮
    Step2UpLoadCommit(){

        const { BackEndData,BackEndFileParam } = this.state;

        const NoneIndex = BackEndData.findIndex(item=>item.DropSelectd.value==='none');


        //判断是否可以提交
        if(NoneIndex===-1){

            this.setState({Step:3});

            const cols = BackEndData.map(item=>{

                return {name:item.ColID,value:item.DropSelectd.value};

            }).serializeObject('cols');

            const colNames = BackEndData.map(item=>item.ColName).join(',');

            const {fileName,contentStartNum,tabName} = BackEndFileParam;

            const token = sessionStorage.getItem('token');

            const { UserID,SchoolID,UserName } = JSON.parse(sessionStorage.getItem('UserInfo'));

            //提交最终结果
            utils.LastStepCommit({

                cols,colNames,fileName,userId:UserID,userName:UserName,

                token,tbName:tabName,contentStartNum,schoolID:SchoolID,that:this

            }).then(data=>{

                if (data){

                    this.setState({

                        Step:4,

                        UpLoadResult:{

                            ...this.state.UpLoadResult,

                            ImportSuccess:true,

                            Success:data.succNum,

                            Error:data.errNum,

                            Unique:data.uniqueNum,

                            DownLoadPath:data.url,

                            ImportDBAllowExistsError:data.importDBAllowExistsError

                        }

                    });

                    if (data.succNum>0&&window.opener){

                        window.opener.location.reload();

                    }

                }

            });


        }else{

            utils.AlertWarn({title:"请匹配属性与Excel表列名",that:this});

        }

    }





    //第四步

    NextUpload(e){

        this.setState({

           Step:1,

            UpLoadFile:'',

            UpLoadFileName:'请选择文件...'

        });

        this.Input.value='';

    }



    //监听销毁事件
    componentDidMount(){

        window.addEventListener('beforeunload', this.beforeunload.bind(this));

    }

    componentWillUnmount(){

        window.removeEventListener('beforeunload', this.beforeunload);

    }

    beforeunload(){

        const { BackEndFileParam } = this.state;

        if (BackEndFileParam){

            const token = sessionStorage.getItem('token');

            const { UserID,SchoolID,UserName } = JSON.parse(sessionStorage.getItem('UserInfo'));

            const {fileName} = BackEndFileParam;

            if (fileName){

                utils.DeleteFile({fileName,userId:UserID,userName:UserName,schoolID:SchoolID,token,that:this});

            }

        }

    }


    render(){

        const {

            UpLoadLoading,Step,ImportTarget,ImportTitle,

            UpLoadFileName,AlertObj,StepLoading,UpLoadResult,BackEndData,

            ImportMouldes,ImportTargetName

        } = this.state;

        const arr = ImportTarget.split(',');

        const ModulesLink = arr.map(item=>{

            const Index = ImportMouldes.findIndex(i=>i.ID===item);

            let Path = '';

            if (Index>=0){

                Path = ImportMouldes.find(i=>i.ID===item).Url;

            }

            return Path;

        });

        const MouldNames = ImportTargetName.split(',');


        

        return <div id="ImportComponent" className="component-import">


                    {

                        ImportTitle?

                            <div className="import-title">{ImportTitle}</div>

                            :''

                    }

                    <div id="step_counter" className={`usermgr_step_bar step${Step}`}>

                        <div className="usermgr_step_item">1.提交数据文件</div>

                        <div className="usermgr_step_item">2.导入预处理</div>

                        <div className="usermgr_step_item">3.执行导入</div>

                        <div className="usermgr_step_item">4.导入结果</div>

                    </div>

                        <div id="step1" className={`usermgr_step1_wrapper ${Step===1?'':'hide'}`}>

                            <div className="usermgr_upload">

                                <p className="usermgr_step_tips_title">操作提示:</p>

                                <ul className="usermgr_step_tips_list">

                                    <li>1.导入文件只能为EXCEL文件，支持标准模板文件导入，也支持非标准模板的文件;</li>

                                    <li>2.建议用系统提供的模板，请点击下载

                                        {

                                            ModulesLink&&ModulesLink.map((item,key)=>{
                                                return <a key={item} href={item} target="_blank" className="dodown">

                                                    {

                                                        MouldNames[key]?

                                                            `"${MouldNames[key]}"`

                                                            :

                                                            `"模板${ModulesLink.length>1?key+1:''}"`

                                                    }

                                                </a>

                                            })

                                        }

                                        。

                                    </li>

                                    {

                                        ImportTarget==='student'?

                                            <li>3.导入学生档案时，系统会自动生成班级。</li>

                                            :''

                                    }

                                </ul>

                                <div className="usermgr_upload_pic_container" onClick={this.InputFileClick.bind(this)}>

                                    <span id="url" className="usermgr_upload_pic_url url" title={UpLoadFileName}>{UpLoadFileName}</span>

                                    <div id="btn_select" className="usermgr_view_pic_btn">浏览</div>

                                    <input type="file" accept=".xls,.xlsx" onChange={this.UploadFileChange.bind(this)} ref={(ref)=>{this.Input = ref}} name="file" id="file" className=""/>

                                </div>

                                <div className="step1-commit-wrapper">

                                    <input id="btnUpload"  type="button" value="提交上传" onClick={this.UploadCommit.bind(this)} className="frame_big_green_btn"/>

                                </div>

                            </div>

                            {/* <div className="usermgr_emptyrow">

                            <p className="usermgr_step_tips_title">空行处理操作提示:</p>

                            <div >

                                <div className="btn_p reload">

                                    <input id="showUpload" className="frame_big_green_btn btn_c" type="button" value="重新上传"/>

                                    <div className="btn_s"></div>

                                </div>

                            </div>

                        </div>*/}

                        </div>

                        <div id="step2" className={`usermgr_step2_wrapper ${Step===2?'':'hide'}`} >

                            <Loading spinning={StepLoading} opacity={false} tip="加载中请稍后...">

                                <div id="relation">

                                <table className="usermgr_upload_table">

                                    <tbody>

                                    <tr>

                                        <th className="col">属性</th>

                                        <th className="co2">Excel表列名</th>

                                        <th className="co3">操作</th>

                                    </tr>

                                    {

                                        BackEndData.map((item,key)=>{

                                            return <tr key={key}>

                                                <td className="col1 head_td" title={item.ColName}>{item.ColName}</td>

                                                <td className="col2">

                                                    <DropDown dropSelectd={item.DropSelectd}

                                                               dropList={item.DropList}

                                                               width={200}

                                                              style={{zIndex:(BackEndData.length-key)}}

                                                              height={200}

                                                              onChange={data=>this.DropChange(data,item.ColID)}
                                                    >

                                                    </DropDown>

                                                </td>

                                                <td className="col3">

                                                    {

                                                        item.isNecessary==='True'?

                                                            ''

                                                            : <span className="new_alink btnDelCol" onClick={this.DelTr.bind(this,item.ColID)} title="删除">删除</span>

                                                    }

                                                </td>

                                            </tr>

                                        })

                                    }

                                    </tbody>

                                </table>

                                <div className="step2-btn-wrapper">

                                    <span id="btnPreImport" className="new_alink" onClick={this.BackStep.bind(this)}>返回上一级</span>

                                    <input id="btnResetRelation" className="frame_big_red_btn" type="button" value="重置" onClick={this.ResetFileData.bind(this)}/>

                                    <input id="btnImport" onClick={this.Step2UpLoadCommit.bind(this)} className="frame_big_green_btn" type="button" value="确认导入"/>

                                </div>

                            </div>

                            </Loading>

                        </div>

                        <div id="step3" className={`usermgr_step3_wrapper ${Step===3?'':'hide'}`}>

                            <div className="usermgr_progress_container">

                                <div className="usermgr_progress_animate_container active">

                                    <span className="load1 load"></span>

                                    <span className="load2 load"></span>

                                    <span className="load3 load"></span>

                                    <span className="load4 load"></span>

                                </div>

                                <p className="usermgr_progress_check_text">数据处理中，请稍后...</p>

                            </div>

                        </div>

                        <div id="step4" className={`usermgr_step4_wrapper ${Step===4?'':'hide'}`}>

                            <div className="usermgr_step4_container">

                                <div className={`usermgr_step4_tick ${UpLoadResult.Success===0?'false':''}`}></div>

                                <p className="usermgr_step4_tips_p">


                                    {

                                        UpLoadResult.ImportDBAllowExistsError?   //容错导入

                                            <>

                                            {

                                                        UpLoadResult.Success>0?

                                                        <span id="count_text_success">

                                                        <span className="common-text">

                                                            成功导入 <span className="color_green">{UpLoadResult.Success}</span>条

                                                        </span>

                                                            {

                                                                (UpLoadResult.Unique+UpLoadResult.Error>0)?


                                                                    <span className="component-text">

                                                                    ,失败 <span id="failed_count" className="color_red">{UpLoadResult.Error}</span>条

                                                                        {

                                                                            UpLoadResult.Unique>0?

                                                                                <React.Fragment>

                                                                                    (其中有 <span id="unique_count" className="color_red">{UpLoadResult.Unique}</span> 条重复)

                                                                                </React.Fragment>

                                                                                :''

                                                                        }

                                                                </span>

                                                                    :''

                                                            }

                                                    </span>

                                                        :<span className="count_text_fail">

                                                        <span className="component-text">

                                                            导入失败,失败 <span id="failed_count" className="color_red">{UpLoadResult.Error}</span>条

                                                            {

                                                                UpLoadResult.Unique>0?

                                                                    <React.Fragment>

                                                                        (其中有 <span id="unique_count" className="color_red">{UpLoadResult.Unique}</span> 条重复)

                                                                    </React.Fragment>

                                                                    :''

                                                            }

                                                        </span>

                                                    </span>

                                            }

                                            {

                                                (UpLoadResult.Error+UpLoadResult.Unique)>0?

                                                <a id="btnDownload" target="_self" className="new_alink" href={UpLoadResult.DownLoadPath}>点击下载失败列表</a>

                                                :''

                                            }

                                            </>


                                            :       //非容错导入

                                            UpLoadResult.Error===0?


                                                <span id="count_text_success">

                                                    <span className="common-text">

                                                        成功导入 <span className="color_green">{UpLoadResult.Success}</span>条

                                                    </span>

                                                </span>

                                                :

                                                <span className="count_text_fail">

                                                    <div className={`fail-tips`}>数据监测不通,无法执行导入,请修正后重试。</div>

                                                    <span className="component-text">

                                                        共<span id="failed_count" className="color_red">{UpLoadResult.Error}</span>条错误

                                                        {

                                                            UpLoadResult.Unique>0?

                                                                <React.Fragment>

                                                                    (其中有 <span id="unique_count" className="color_red">{UpLoadResult.Unique}</span> 条重复)

                                                                </React.Fragment>

                                                                :null

                                                        }

                                                    </span>

                                                     <a id="btnDownload" target="_self" className="new_alink" href={UpLoadResult.DownLoadPath}>点击下载错误列表</a>

                                                </span>


                                    }


                                </p>

                                <div className="step4-btn-wrapper">

                                    <input id="btn_reset" type="button" onClick={this.NextUpload.bind(this)} className="frame_big_green_btn" value="继续导入"/>

                                </div>

                            </div>

                        </div>


                    <Alert  type={AlertObj.Type}

                            title={AlertObj.Title}

                            show={AlertObj.Show}

                            onOk={AlertObj.Ok}

                            onCancel={AlertObj.Cancel}

                            onClose={AlertObj.Close}

                            onHide={AlertObj.Hide}

                            cancelShow={'n'}

                    >

                    </Alert>

                </div>

    }

}



export default Import;