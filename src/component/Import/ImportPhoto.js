import React,{Component} from 'react';

import { Alert } from "@/component/common/index";

import ScrollBars from 'react-custom-scrollbars';

import utils from './utils';

import InitState from './InitState';

import './scss/index.scss';


class Import extends Component{

    constructor(props) {

        super(props);

        this.state = InitState({props,type:'photo'});

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

            if(FileType==='.rar'||FileType==='.7z'||FileType==='.zip'){

                //是rar,zip,7z的类型

                if (File.size!==0){

                    //查看是否含有虚假路径
                    if(FileName.includes('C:\\fakepath\\')){

                        this.setState({UpLoadFileName:File.name,UpLoadFile:File});

                    }else{

                        this.setState({UpLoadFileName:FileName,UpLoadFile:File});

                    }

                }else{

                    utils.AlertWarn({that:this,title:"文件大小不能为0，请重新选择文件！"});

                    this.setState({UpLoadFileName:'请选择文件...',UpLoadFile:''});

                    this.Input.value = '';

                }

            }else{

                //弹出警告窗

                utils.AlertWarn({that:this,title:"请上传后缀名为zip、7z或rar文件!"});

                this.setState({UpLoadFileName:'请选择文件...',UpLoadFile:''});

                this.Input.value = '';

            }

        }

    }

    //点击提交上传
    UploadCommit(e) {

        const File = this.state.UpLoadFile;

        if (File){

            this.setState({UpLoadPercent:0,Step:2});

            var format = File.name.substr(File.name.lastIndexOf('.'));

            const FileName = utils.uuID() + format;

            /*utils.UpLoadPhoto({that:this,FileName});*/

            utils.GetFtpPath(this).then(data=>{

                //如果获取到ftp地址
                if (data){

                    this.setState({FtpPath:data},()=>{

                        //调用上传函数
                        utils.UpLoadPhoto({FtpPath:data,that:this,FileName});

                    });

                }

            })

        }else{

            utils.AlertWarn({title:"请先选择文件！",that:this});

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

    componentWillReceiveProps(NextProps) {

        const {ImportTarget, ImportTitle} = NextProps;

        if (ImportTarget !== this.state.ImportTarget || this.state.ImportTitle !== ImportTitle) {

            this.setState({ImportTarget, ImportTitle});

        }

    }



    render(){

        const { Step,ImportTitle,UpLoadFileName,AlertObj,UpLoadResult,UpLoadPercent } = this.state;


        return <div id="ImportComponent" className="component-import">

            {

                ImportTitle?

                    <div className="import-title">{ImportTitle}</div>

                    :''

            }

            <div id="step_counter" className={`usermgr_step_bar step${Step}`}>

                <div className="usermgr_step_item">1.选择文件</div>

                <div className="usermgr_step_item">2.上传文件</div>

                <div className="usermgr_step_item">3.核对处理</div>

                <div className="usermgr_step_item">4.处理结果</div>

            </div>



                <div id="step1" className={`usermgr_step1_wrapper ${Step===1?'':'hide'}`}>

                    <div className="usermgr_upload">

                        <p className="usermgr_step_tips_title">操作提示:</p>

                        <ul className="usermgr_step_tips_list">

                            <li>1、请以学号(工号)命名一寸免冠照片；</li>

                            <li>2、将照片压缩成rar或zip格式文件上传；</li>

                            <li>3、照片要求:一寸照片，分辨率≥宽358px*高441px，大小≤2M，限bmp/gif/jpg/jpeg/png格式。</li>

                        </ul>

                        <div className="usermgr_upload_pic_container" onClick={this.InputFileClick.bind(this)}>

                            <span id="url" className="usermgr_upload_pic_url url" title={UpLoadFileName}>{UpLoadFileName}</span>

                            <div id="btn_select" className="usermgr_view_pic_btn">浏览</div>

                            <input type="file" accept=".rar,.7z,.zip" onChange={this.UploadFileChange.bind(this)} ref={(ref)=>{this.Input = ref}} name="file" id="file" className=""/>

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

                    <div className="usermgr_progress_container">

                        <div className="usermgr_uploading_pic_progress">

                            <div id="progresser" className="usermgr_uploading_pic_progress_inner" style={{width:`${UpLoadPercent}%`}}></div>

                        </div>

                        <span className="color_green">正在上传<span id="process_txt">{UpLoadPercent}</span>%</span>

                    </div>

                </div>

                <div id="step3" className={`usermgr_step3_wrapper ${Step===3?'':'hide'}`}>

                    <div className="usermgr_progress_container">

                        <div className="usermgr_progress_animate_container photo active"></div>

                        <p className="usermgr_progress_check_text">上传完毕，正在校对处理中...</p>

                    </div>

                </div>

                <div id="step4" className={`usermgr_step4_wrapper ${Step===4?'':'hide'}`}>

                    <div className="usermgr_step4_container">

                        <div className={`usermgr_step4_tick ${UpLoadResult.Total===UpLoadResult.Error?'false':''}`}></div>

                        <p className="usermgr_step4_tips_p" style={{marginBottom:40}}>

                            {

                                UpLoadResult.Error===0?

                                    <React.Fragment>

                                        成功导入<span id="counter_success" className="color_green">{UpLoadResult.Total}</span>张

                                    </React.Fragment>

                                    :

                                    UpLoadResult.Error===UpLoadResult.Total?

                                        <React.Fragment>

                                            导入失败，失败<span id="counter_failed" className="color_red">{UpLoadResult.Error}</span>张

                                        </React.Fragment>

                                        :

                                        <React.Fragment>

                                            成功导入<span id="counter_success" className="color_green">{UpLoadResult.Total-UpLoadResult.Error}</span>张,

                                            失败<span id="counter_failed" className="color_red">{UpLoadResult.Error}</span>张

                                        </React.Fragment>

                            }

                        </p>

                        <div className="usermgr-upload-error-container">

                            {

                                UpLoadResult.NotExist.length>0?

                                    <div className="usermgr_upload_error_item">

                                        <p className="usermgr_upload_error_title">对应工号/学号不存在</p>

                                        <div className="usermgr_upload_error_item_list">

                                            <ScrollBars style={{width:236,height:164}}>

                                                <ul className="usermgr_upload_error_item_ul" id="list_notExist">

                                                    {

                                                        UpLoadResult.NotExist.map((item,key)=>{

                                                            return  <li key={key}>{item}</li>

                                                        })

                                                    }

                                                </ul>

                                            </ScrollBars>


                                        </div>

                                    </div>

                                    :''

                            }

                            {

                                UpLoadResult.NotPic.length>0?

                                    <div className="usermgr_upload_error_item">

                                        <p className="usermgr_upload_error_title">非照片文件</p>

                                        <div className="usermgr_upload_error_item_list">

                                            <ScrollBars style={{width:236,height:164}}>

                                                <ul className="usermgr_upload_error_item_ul" id="list_notPic">

                                                    {

                                                        UpLoadResult.NotPic.map((item,key)=>{

                                                            return  <li key={key}>{item}</li>

                                                        })

                                                    }

                                                </ul>

                                            </ScrollBars>


                                        </div>

                                    </div>

                                    :''

                            }

                            {

                                UpLoadResult.CompressFaile.length>0?

                                    <div className="usermgr_upload_error_item">

                                        <p className="usermgr_upload_error_title">照片分辨率过小(358*441)<br/>照片格式转换失败</p>


                                        <div className="usermgr_upload_error_item_list">

                                            <ScrollBars style={{width:236,height:164}}>

                                                <ul className="usermgr_upload_error_item_ul" id="list_compressFaile">

                                                    {

                                                        UpLoadResult.CompressFaile.map((item,key)=>{

                                                            return  <li key={key}>{item}</li>

                                                        })

                                                    }

                                                </ul>

                                            </ScrollBars>

                                        </div>

                                    </div>

                                    :''

                            }

                        </div>

                        <p className="usermgr_step4_tips_p">

                            <input id="btn_reset" type="button" onClick={this.NextUpload.bind(this)} value="继续导入" className="frame_big_green_btn" style={{marginTop:20}}/>

                        </p>

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