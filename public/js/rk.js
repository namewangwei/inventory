$(function () {
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';

    // 生成并下载一维码
    function setywm(imei) {
        $("#img").JsBarcode(imei)
        var src = $('#img').attr('src');
        var $a = $("<a></a>").attr("href", src).attr("download", "条形码.png");
        $a[0].click();
    }

    $('.nav li').each(function(i) {
        $(this).click(function () {
            $(this).addClass('active').siblings('.active').removeClass('active')
            $('.des>div').eq(i).show().siblings().hide()
            if (i == 0) {
                fn1();
                $("#jqGrid1").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
            }
            if (i == 1) {
                fn2()
                $("#jqGrid2").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
            }            
        })
    })
   fn1();
   
    function fn1() {
        var rowIds = [];  // 提交的IMEI集合
        // 基本配置
        $("#jqGrid1").jqGrid({
            url: 'rk/find',           
            editurl: 'rk/edit',
            datatype: "json",
            mtype: 'post',
            postData: {pageCode: 'rkqr'},
            rownumbers: true,   // 序号    
            multiselect : true, // 允许多选
            colModel: [
                {
                    label: '时间',
                    name: 'update_at',
                    width: 100,               
                    align: 'center',
                },
                {
                    label: 'IMEI',
                    name: 'IMEI',
                    width: 100,   
                    key: true,                
                    editable: true,                                                  
                },
                {
                    label: '机型',
                    name: 'type',
                    width: 75,               
                  //  editable: true,
                    align: 'center',                   
                    edittype: 'select',                
                    editoptions: {value: '1:Iphone 6;2:Iphone 6P;3:Iphone 6S;4:Iphone 6SP;5:Iphone 7;6:Iphone 7P;7:Iphone 8;8:Iphone 8P;9:Iphone X'},
                    formatter: function (value) {
                        switch(value) {
                            case '1': return 'Iphone 6'
                                break;
                            case '2': return 'Iphone 6P'
                                break;
                            case '3': return 'Iphone 6S'
                                break;
                            case '4': return 'Iphone 6 SP'
                                break;
                            case '5': return 'Iphone 7'
                                break;
                            case '6': return 'Iphone 7P'
                                break;
                            case '7': return 'Iphone 8'
                                break;
                            case '8': return 'Iphone 8P'
                                break;
                            case '9': return 'Iphone X'    
                                break;

                        }
                    }
                },            
                {
                    label: '颜色',
                    name: 'color',
                    width: 75,               
                 //   editable: true,                    
                    align: 'center',                   
                    edittype: 'select',
                    editoptions: {value: '1:黑色;2:白色;3:亮黑;4:磨砂黑;5:中国红;6:粉色;7:金色'},
                    formatter: function (value) {
                        switch(value) {
                            case '1': return '黑色'
                                break;
                            case '2': return '白色'
                                break;
                            case '3': return '亮黑'
                                break;
                            case '4': return '磨砂黑'
                                break;
                            case '5': return '中国红'
                                break;
                            case '6': return '粉色'
                                break;
                            case '7': return '金色'
                                break;
                        }
                    }
                },
                {
                    label: '内存',
                    name: 'memory',
                    width: 75,               
                 //   editable: true,                    
                    align: 'center',                   
                    edittype: 'select',
                    editoptions: {value: '1:16G;2:32G;3:64G;4:128G;5:256G'},
                    formatter: function (value) {
                        switch(value) {
                            case '1': return '16G'
                                break;
                            case '2': return '32G'
                                break;
                            case '3': return '64G'
                                break;
                            case '4': return '128G'
                                break;
                            case '5': return '256G'
                                break;
                        
                        }
                    }
                },
                {
                    label: '入/出库',
                    name: 'status',
                    width: 75,                               
                    align: 'center',                   
                    edittype: 'select',
                    editoptions: {value: '1:入库;2:出库'},
                    formatter: function (value) {
                        switch(value) {
                            case '1': return '入库'
                                break;
                            case '2': return '出库'
                                break;                                             
                        }
                    }
                    
                },
                {
                    label: '检测状态',
                    name: 'testStatus',
                    width: 75,    
                    editable: true,           
                    align: 'center',
                    edittype: 'select',
                    editoptions: {value: '3:已检测1确认收货;11:已装机(待接收);15:已检测2(待接收);32:退货入库(待接收);42:换机入库(待接收);70:报废(待接收);99:检测未通过(待接收);120:已维修(待接收)'},
                    formatter: function (value) {                   
                        switch(value) {                            
                            case '3': return '已检测(待接收)' 
                                break; 
                            case '11': return '已装机(待接收)' 
                                break; 
                            case '15': return '已检测2(待接收)' 
                                break;
                            case '32': return '退货入库(待接收)' 
                                break;
                            case '42': return '换机入库(待接收)' 
                                break;
                            case '70': return '报废(待接收)' 
                                break;  
                            case '99': return '检测未通过(待接收)' 
                                break; 
                            case '120': return '已维修(待接收)' 
                                break;                                                                   
                        }
                    }
                },  
                {
                    label: '备注',
                    name: 'remark',
                    width: 100,        
                    align: 'left',                         
                    edittype: 'textarea',                               
                },         
               
            ],
            sortname: 'IMEI',
            sortorder : 'asc',
            loadonce: true, // 是否可翻页
            viewrecords: true,  // 展示总数
            height: '100%',
            rowNum: 10,
            autowidth: true,
            pager: "#jqGridPager1",
             // 获取选中行ID集合
             onSelectRow: function (rowId, status, e) { 
                rowIds = jQuery("#jqGrid1").jqGrid('getGridParam', 'selarrrow')               
            },
            onSelectAll:function(ids,status){
                if (status) 
                    rowIds = ids;
                else 
                    rowIds = [];
            }          
        });
        
       // 操作方法
        $('#jqGrid1').navGrid('#jqGridPager1',
            // the buttons to appear on the toolbar of the grid
            { edit: true,edittext:'确认收货', add: false, del: false, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
            // 修改
            {
                editCaption: "确认收货",
                recreateForm: true,
                //checkOnUpdate : true,
                //checkOnSubmit : true,
                closeAfterEdit: true,
                //reloadAfterSubmit : false,

                afterShowForm : function (formid) { // 表单显示后触发  
                    var statusInit = '';
                    for(var i=0;i<rowIds.length;i++) {
                        var testStatus = $('#jqGrid1').jqGrid('getRowData',rowIds[i]).testStatus;
                        if (statusInit == '') {
                            statusInit = testStatus
                        }                            
                        else {
                            if (statusInit != testStatus) {
                                alert('状态不一致，无法批量操作！')
                                $('#sData').hide()
                                return;
                            }
                        }
                    }              
                    $('#IMEI').val(rowIds.toString())
                    $('#tr_IMEI').hide()
                    $('#testStatus').attr('disabled', 'true')                                                                
                                          
                },
                beforeCheckValues:function(posdata,formid,mode){ // 表单验证数据之前  
                    if ((posdata.testStatus == '42') || (posdata.testStatus == '32') )
                        {posdata.testStatus = '16'}    
                    else {
                        posdata.testStatus = (parseInt(posdata.testStatus) + 1).toString()  
                    }      
                    posdata.status = '1'   // 入库
                                                     
                    
                },
                errorTextFormat: function (data) {
                    console.log(data)
                    return 'Error: ' + data.responseText
                },
                afterSubmit:  function (response, postdata, formid) {
                    var res = JSON.parse(response.responseText)
                    if (res.result){ $(this).jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid') }
                    return [res.result, res.message]                
                }     
            }            
        );    
        

        $('#refresh_jqGrid1').click(function () {
            $("#jqGrid1").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
            return false;
        })

        $('#query1').click(function (e) {
            e.preventDefault()
            var 
                IMEI = $('#IMEI1').val()
        
            $("#jqGrid1").jqGrid('setGridParam', {       
                page: 1,
                datatype:'json',
                postData: {                    
                    'IMEI': IMEI
                }
            }).trigger("reloadGrid")
        })
    
    }

    function fn2() {
        var rowIds = [];
         // 基本配置
        $("#jqGrid2").jqGrid({
            url: 'rk/find',            
            editurl: 'rk/edit',
            datatype: "json",
            mtype: 'post',
            postData: {pageCode: 'rk'},
            rownumbers: true,   // 序号    
            multiselect : true, // 允许多选
            colModel: [
                {
                    label: '时间',
                    name: 'update_at',
                    width: 100,               
                    align: 'center',
                },
                {
                    label: 'IMEI',
                    name: 'IMEI',
                    width: 100,   
                    key: true,                
                    editable: true,                                                  
                },
                {
                    label: '机型',
                    name: 'type',
                    width: 75,               
                    editable: true,
                    align: 'center',                   
                    edittype: 'select',                
                    editoptions: {value: '1:Iphone 6;2:Iphone 6P;3:Iphone 6S;4:Iphone 6SP;5:Iphone 7;6:Iphone 7P;7:Iphone 8;8:Iphone 8P;9:Iphone X'},
                    formatter: function (value) {
                        switch(value) {
                            case '1': return 'Iphone 6'
                                break;
                            case '2': return 'Iphone 6P'
                                break;
                            case '3': return 'Iphone 6S'
                                break;
                            case '4': return 'Iphone 6 SP'
                                break;
                            case '5': return 'Iphone 7'
                                break;
                            case '6': return 'Iphone 7P'
                                break;
                            case '7': return 'Iphone 8'
                                break;
                            case '8': return 'Iphone 8P'
                                break;
                            case '9': return 'Iphone X'    
                                break;
                        }
                    }
                },            
                {
                    label: '颜色',
                    name: 'color',
                    width: 75,               
                    editable: true,                   
                    align: 'center',                   
                    edittype: 'select',
                    editoptions: {value: '1:黑色;2:白色;3:亮黑;4:磨砂黑;5:中国红;6:粉色;7:金色'},
                    formatter: function (value) {
                        switch(value) {
                            case '1': return '黑色'
                                break;
                            case '2': return '白色'
                                break;
                            case '3': return '亮黑'
                                break;
                            case '4': return '磨砂黑'
                                break;
                            case '5': return '中国红'
                                break;
                            case '6': return '粉色'
                                break;
                            case '7': return '金色'
                                break;
                        }
                    }
                },
                {
                    label: '内存',
                    name: 'memory',
                    width: 75,               
                    editable: true,                   
                    align: 'center',                   
                    edittype: 'select',
                    editoptions: {value: '1:16G;2:32G;3:64G;4:128G;5:256G'},
                    formatter: function (value) {
                        switch(value) {
                            case '1': return '16G'
                                break;
                            case '2': return '32G'
                                break;
                            case '3': return '64G'
                                break;
                            case '4': return '128G'
                                break;
                            case '5': return '256G'
                                break;
                        
                        }
                    }
                },
                {
                    label: '入/出库',
                    name: 'status',
                    width: 75,                               
                    align: 'center',                   
                    edittype: 'select',
                    editoptions: {value: '1:入库;2:出库'},
                    formatter: function (value) {
                        switch(value) {
                            case '1': return '入库'
                                break;
                            case '2': return '出库'
                                break;                                             
                        }
                    }
                    
                },
                {
                    label: '检测状态',
                    name: 'testStatus',
                    width: 75,    
                    editable: true,           
                    align: 'center',
                    edittype: 'select',
                    editoptions: {
                        value: '0:修改入库信息;1:发送至检测;5:发送至跟单;17:发送至出库;11:发送至维修;101:退货;71:报废',
                        dataEvents:[
                            {
                                type:'change',
                                fn:function(e){
                                    var val = this.value;
                                    $('#remark').val('') 
                                    $('#testtype').val('') 
                                    $('#trackingcode').val('') 
                                    $('#ordername').val('') 
                                    $('#tr_type').hide()                         
                                    $('#tr_color').hide() 
                                    $('#tr_memory').hide()
                                    $('#tr_amount').hide()
                                    $('#tr_testtype').hide()
                                    $('#tr_trackingcode').hide()
                                    $('#tr_ordername').hide()
                                    $('#tr_remark').hide()   
                                    switch(val) {  
                                        case '0':
                                            $('#tr_type').show()                         
                                            $('#tr_color').show() 
                                            $('#tr_memory').show()
                                            $('#tr_remark').show()
                                            break;                                      
                                        case '101':

                                            $('#tr_remark').show()   
                                            $('#tr_testtype').show()
                                            $('#tr_trackingcode').show()
                                            $('#tr_ordername').show()
                                            break;
                                        case '11':
                                        case '71':
                                            $('#tr_remark').show()   
                                            break;
                                    }
                                }
                            }
                        ]
                    },
                    formatter: function (value) {                   
                        switch(value) {
                            case '0': return '入库'
                                break;
                            case '1': return '发送至检测'
                                break;
                            case '2': return '检测中'
                                break;                                   
                            case '3': return '(已检测1)检测---库管'
                                break;
                            case '4': return '库管(检测1)' 
                                break; 
                            case '5': return '库管---跟单' 
                                break; 
                            case '6': return '跟单员(进)' 
                                break; 
                            case '7': return '跟单---装机' 
                                break;
                            case '8': return 'ABC装机中'
                                break;
                            case '9': return '(已装机)ABC---跟单'
                                break;   
                            case '10': return '跟单员(出)'
                                break;
                            case '11': return '跟单---库管' 
                                break; 
                            case '12': return '库管(装机)' 
                                break; 
                            case '13': return '(待检测2)库管---检测' 
                                break; 
                            case '14': return '检测员(2)' 
                                break;
                            case '15': return '(已检测2)检测---库管'
                                break;   
                            case '16': return '库管(可销售)'
                                break;
                            case '17': return '库管(可销售)' 
                                break; 
                            case '18': return '已销售' 
                                break;  
                            case '100': return '检测未通过'    
                                break;
                            case '101': return '退货'
                                break; 
                            case '121': return '已维修'
                                break;                                                                                                           
                        }
                    }
                },
                // 退货
                {
                    label: '快递单号',
                    name: 'trackingcode',
                    hidden: true,                                     
                    align: 'center',
                    editable: true,
                //    editrules : { required: true,edithidden:true}, // 编辑的规则                    
                },
                {
                    label: '姓名',
                    name: 'ordername',
                    hidden: true,                                     
                    align: 'center',
                    editable: true,
                  //  editrules : { required: true,edithidden:true}, // 编辑的规则                    
                },                                      
                {
                    label: '备注',
                    name: 'remark',
                    width: 75,               
                    align: 'left',
                    editable: true,            
                    edittype: 'textarea',                               
                },                
            ],
            sortname: 'IMEI',
            sortorder : 'asc',
            loadonce: true, // 是否可翻页
            viewrecords: true,  // 展示总数
            height: '100%',
            rowNum: 10,
            autowidth: true,
            pager: "#jqGridPager2",
             // 获取选中行ID集合
             onSelectRow: function (rowId, status, e) { 
                // console.log(rowId,status)

                rowIds = jQuery("#jqGrid2").jqGrid('getGridParam', 'selarrrow'); 
               // console.log(rowIds)                  
            },
            onSelectAll:function(ids,status){
                if (status) 
                    rowIds = ids;
                else 
                    rowIds = [];
            },   
            ondblClickRow: function (imei) {
                // 双击得到一维码
                $("#img").JsBarcode(imei)
                var src = $('#img').attr('src');
                var $a = $("<a></a>").attr("href", src).attr("download", "条形码.png");
                $a[0].click();
            },                     
        });
        
        // 操作方法
        $('#jqGrid2').navGrid('#jqGridPager2',
            { edit: true, add: true, del: false,search:false,refresh:false, edittext:'编辑',addtext: '新增',},
            {
                editCaption: "编辑",
                recreateForm: true,               
                closeAfterEdit: true,
                afterShowForm : function (formid) { // 表单显示后触发                                    
                    var statusInit = '';
                    for(var i=0;i<rowIds.length;i++) {
                        var testStatus = $('#jqGrid2').jqGrid('getRowData',rowIds[i]).testStatus;
                        if (statusInit == '') {
                            statusInit = testStatus
                        }                            
                        else {
                            if (statusInit != testStatus) {
                                alert('状态不一致，无法批量操作！')
                                $('#sData').hide()
                            }
                        }
                    }   
                       
                    $('#IMEI').val(rowIds.toString())
                    $('#tr_IMEI').hide()                                    
                    
                    $('#remark').val('')  
                    $('#tr_testtype').hide()
                    $('#tr_trackingcode').hide()
                    $('#tr_ordername').hide()

                    
                    
                    // $('#tr_type').hide()                         
                    // $('#tr_color').hide() 
                    // $('#tr_memory').hide()
                    // $('#tr_amount').hide()
                    // $('#tr_remark').hide()                                                             
                },
                beforeCheckValues:function(posdata,formid,mode){ // 表单验证数据之前   
                    if (!posdata.testStatus) posdata.testStatus = '0'
                    if (posdata.testStatus == '11') {
                        posdata.djs = new Date().getTime() + 3*24*3600*1000;
                    }
                },  
                errorTextFormat: function (data) {
                    //console.log(data)
                    return 'Error: ' + data.responseText
                },
                afterSubmit:  function (response, postdata, formid) {
                //  console.log(response, postdata, formid)
                    var res = JSON.parse(response.responseText)
                    if (res.result){ $(this).jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid') }
                    return [res.result, res.message]                
                }     
            },
            // 添加
            {                
                closeAfterAdd: true,
                recreateForm: true,
               // reloadAfterSubmit : false,
                afterShowForm : function (formid) { // 表单显示后触发                                
                    $('#tr_testStatus').hide()   
                    $('#tr_remark').hide()  
                    $('#tr_trackingcode').hide()
                    $('#tr_ordername').hide()                                            
                },
                errorTextFormat: function (data) {
                    return 'Error: ' + data.responseText
                },   
                beforeCheckValues:function(posdata,formid,mode){ // 表单验证数据之前
                    posdata.status = '1'
                    posdata.testStatus = '0'            
                },  
                afterSubmit:  function (response, postdata, formid) {                                      
                    var res = JSON.parse(response.responseText)                    
                    if (res.result){
                         $(this).jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');                         
                         }
                    return [res.result, res.message]                
                }     
            }
        );
       

        
        // 导出excel
        $("#export").on("click", function(){
            $("#jqGrid2").jqGrid("exportToExcel",{
                includeLabels : true,
                includeGroupHeader : true,
                includeFooter: true,
                fileName : "jqGridExport.xlsx",
                maxlength : 40 // maxlength for visible string data 
            })
        });

        // 打印
        $("#print").on("click", function(){
            $("#jqGrid2").jqGrid("exportToHtml",{
                includeLabels : true,
                includeGroupHeader : true,
                includeFooter: true,
                autoPrint : true
            });
        });
        $('#query2').click(function (e) {
            e.preventDefault()
            var 
                IMEI = $('#IMEI2').val()
        
            $("#jqGrid2").jqGrid('setGridParam', {       
                page: 1,
                datatype:'json',
                postData: {
                    
                    'IMEI': IMEI
                }
            }).trigger("reloadGrid")
        })
        
    }
   

   
    
})