$(function () {
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';
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
            if (i == 2) {
                fn3()
                $("#jqGrid3").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
            }
            if (i == 3) {
                fn4()
                $("#jqGrid4").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
            }
        })
    })
   fn1();


   function fn1() {
        var rowIds = [];
        // 基本配置
        $("#jqGrid1").jqGrid({
            url: 'sh/find',       
            editurl: 'sh/edit',
            datatype: "json",
            mtype: 'post',
            rownumbers: true,
            postData: {pageCode: 'shczqr'}, 
            multiselect : true, // 允许多选
            colModel: [
                {
                    label: 'IMEI',
                    name: 'IMEI',
                    key: true,
                    width: 75,                    
                    editable: true,                                                                     
                },
                {
                    label: '机型',
                    name: 'type',
                    width: 75,                               
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
                    label: '状态',
                    name: 'testStatus',
                    width: 75,     
                    editable: true,          
                    align: 'center',
                    edittype: 'select',
                    editoptions: {value: '30:售后退货(待确认);40:售后换货(待确认);50:售后维修(待确认)'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '30': return '售后退货(待确认)'
                                break;
                            case '40': return '售后换货(待确认)'
                                break;
                            case '50': return '售后维修(待确认)'
                                break;                                   
                        }
                    }
                }, 
                {
                    label: '售后选项',
                    name: 'shoption',
                    width: 75,                                 
                    align: 'center',
                    // editable: true,
                    // editrules : { required: true,edithidden:true}, // 编辑的规则
                    edittype: 'select',
                    editoptions: {value: '1:退货处理;2:换货处理;3:维修处理'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '1': return '退货处理'
                                break;  
                            case '2': return '换货处理'
                                break;
                            case '3': return '维修处理'
                                break;                                                               
                        }
                    }

                },

                {
                    label: '检测类型',
                    name: 'shtesttype',
                    width: 75,                                   
                    align: 'center',
                    editable: true,
                    //editrules : { required: true}, // 编辑的规则
                    edittype: 'select',
                    editoptions: {value: '1:完好;2:客观原因故障;3:主观原因故障'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '1': return '完好'
                                break;
                            case '2': return '客观原因故障'
                                break;                           
                            case '3': return '主观原因故障'
                                break;                                        
                        }
                    }
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
            pager: "#jqGridPager1",
            // 获取选中行ID集合
            onSelectRow: function (rowId, status, e) { 
                rowIds = jQuery("#jqGrid1").jqGrid('getGridParam', 'selarrrow');                   
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
            { edit: true, add: false, del: false, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
            // options for the Edit Dialog
            {
                editCaption: "确认收货",
                recreateForm: true,
                //checkOnUpdate : true,
            // checkOnSubmit : true,
                closeAfterEdit: true,
                reloadAfterSubmit : true,

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
                            }
                        }
                    }                              
                    $('#IMEI').val(rowIds.toString())
                    $('#tr_IMEI').hide()
                    $('#testStatus').attr('disabled','true') 
                    $('#shtesttype').attr('disabled','true') 
                    
                   $('#remark').attr('disabled','true') 
                                    
                },
                beforeCheckValues:function(posdata,formid,mode){ // 表单验证数据之前
                   if (posdata.shtesttype == '1') {
                        posdata.testStatus = posdata.testStatus == '50'?'41':(parseInt(posdata.testStatus) + 1).toString()
                   } else if (posdata.shtesttype == '2') {
                        posdata.testStatus = '51' 
                      //  posdata.djs = new Date().getTime() + 3*24*3600*1000;
                   } else {
                        posdata.testStatus = '61'  
                   }                
                },
                afterSubmit:  function (response, postdata, formid) {                    
                    var res = JSON.parse(response.responseText)
                    if (res.result){ $(this).jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid') }
                    return [res.result, res.message]                
                },
                errorTextFormat: function (data) {
                    console.log(data)
                    return 'Error: ' + data.responseText
                },
            }                
        );

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
            url: 'sh/find',       
            editurl: 'sh/edit',
            datatype: "json",
            mtype: 'post',
            rownumbers: true,
            postData: {pageCode: 'shth'}, 
            multiselect : true, // 允许多选
            colModel: [
                {
                    label: 'IMEI',
                    name: 'IMEI',
                    key: true,
                    width: 75,                    
                    editable: true,                                                                     
                },
                {
                    label: '机型',
                    name: 'type',
                    width: 75,                               
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
                    label: '状态',
                    name: 'testStatus',
                    width: 75,     
                    editable: true,          
                    align: 'center',
                    edittype: 'select',
                    editoptions: {value: '31:售后退货'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '31': return '售后退货'
                                break;                                                             
                        }
                    }
                }, 
                {
                    label: '检测类型',
                    name: 'shtesttype',
                    width: 75,                                   
                    align: 'center',
                //    editable: true,
                    //editrules : { required: true}, // 编辑的规则
                    edittype: 'select',
                    editoptions: {value: '1:完好;2:客观原因故障;3:主观原因故障'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '1': return '完好'
                                break;
                            case '2': return '客观原因故障'
                                break;                           
                            case '3': return '主观原因故障'
                                break;                                        
                        }
                    }
                },  
                {
                    label: '维修类型',
                    name: 'maintaintype',  // 1 修好 2 无法修好
                    width: 75,          
                    align: 'left',
                    editable: true,
                    // editrules : { required: true,edithidden:true}, // 编辑的规则    
                    edittype: 'select',
                    editoptions: {value: '1:修好;2:无法修好'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '1': return '修好'
                                break;
                            case '2': return '无法修好'
                                break;  
                            default: return ''
                                break;                                                                                        
                        }
                    }                        
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
                rowIds = jQuery("#jqGrid2").jqGrid('getGridParam', 'selarrrow');                   
            },
            onSelectAll:function(ids,status){
                if (status) 
                    rowIds = ids;
                else 
                    rowIds = [];
            }
        });
        
        // 操作方法
        $('#jqGrid2').navGrid('#jqGridPager2',
            // the buttons to appear on the toolbar of the grid
            { edit: true, add: false, del: false, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
            // options for the Edit Dialog
            {
                editCaption: "售后退货处理",
                recreateForm: true,
                //checkOnUpdate : true,
            // checkOnSubmit : true,
                closeAfterEdit: true,
                reloadAfterSubmit : true,

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
                    $('#tr_maintaintype').hide()
                    $('#testStatus').attr('disabled','true') 
                    $('#shtesttype').attr('disabled','true') 
                    $('#remark').val('')
                    $('#tr_remark').hide()
                                    
                },
                beforeCheckValues:function(posdata,formid,mode){ // 表单验证数据之前

                    posdata.testStatus = posdata.maintaintype == '2'?'70':(parseInt(posdata.testStatus) + 1).toString() 
                    delete posdata.maintaintype                                                                     
                },
                afterSubmit:  function (response, postdata, formid) {                    
                    var res = JSON.parse(response.responseText)
                    if (res.result){ $(this).jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid') }
                    return [res.result, res.message]                
                },
                errorTextFormat: function (data) {
                    console.log(data)
                    return 'Error: ' + data.responseText
                },
            }                
        );

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
   function fn3() {
        var rowIds = [];
        // 基本配置
        $("#jqGrid3").jqGrid({
            url: 'sh/find',       
            editurl: 'sh/edit',
            datatype: "json",
            mtype: 'post',
            rownumbers: true,
            postData: {pageCode: 'shhh'}, 
            multiselect : true, // 允许多选
            colModel: [
                {
                    label: 'IMEI',
                    name: 'IMEI',
                    key: true,
                    width: 75,                    
                    editable: true,                                                                     
                },
                {
                    label: '机型',
                    name: 'type',
                    width: 75,                               
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
                    align: 'center',                   
                    edittype: 'select',
                    editoptions: {value: '1:黑色;2:白色;3:亮黑;4:磨砂黑;5:中国红;6:粉色'},
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
                        }
                    }
                },
                {
                    label: '内存',
                    name: 'memory',
                    width: 75,                               
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
                    label: '订单号',
                    name: 'ordercode',
                    hidden: true,                                     
                    align: 'center',
                    editable: true,
                    editrules : { required: true,edithidden:true}, // 编辑的规则                   
                },
                {
                    label: '快递单号',
                    name: 'trackingcode',
                    hidden: true,                                     
                    align: 'center',
                    editable: true,
                    editrules : { required: true,edithidden:true}, // 编辑的规则                    
                },
                {
                    label: '姓名',
                    name: 'ordername',
                    hidden: true,                                     
                    align: 'center',
                    editable: true,
                    editrules : { required: true,edithidden:true}, // 编辑的规则                    
                },
                {
                    label: '售后选项',
                    name: 'shoption',
                    hidden: true,                                     
                    align: 'center',
                    editable: true,
                    editrules : { required: true,edithidden:true}, // 编辑的规则
                    edittype: 'select',
                    editoptions: {value: '1:退货处理;2:换货处理;3:维修处理'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '1': return '退货处理'
                                break;  
                            case '2': return '换货处理'
                                break;
                            case '3': return '维修处理'
                                break;                                                               
                        }
                    }

                },
                {
                    label: '状态',
                    name: 'testStatus',
                    width: 75,     
                    editable: true,          
                    align: 'center',
                    edittype: 'select',
                    editoptions: {value: '41:售后换货'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '41': return '售后换货'
                                break;
                                                                
                        }
                    }
                }, 
                {
                    label: '检测类型',
                    name: 'shtesttype',
                    width: 75,                                   
                    align: 'center',
                //    editable: true,
                    //editrules : { required: true}, // 编辑的规则
                    edittype: 'select',
                    editoptions: {value: '1:完好;2:客观原因故障;3:主观原因故障'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '1': return '完好'
                                break;
                            case '2': return '客观原因故障'
                                break;                           
                            case '3': return '主观原因故障'
                                break;                                        
                        }
                    }
                }, 
                {
                    label: '维修类型',
                    name: 'maintaintype',  // 1 修好 2 无法修好
                    width: 75,          
                    align: 'left',
                    editable: true,
                    // editrules : { required: true,edithidden:true}, // 编辑的规则    
                    edittype: 'select',
                    editoptions: {value: '1:修好;2:无法修好'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '1': return '修好'
                                break;
                            case '2': return '无法修好'
                                break; 
                            default: return ''
                                break;                                                                                         
                        }
                    }                        
                },    
                {
                    label: '替换机器IMEI',
                    name: 'newIMEI',
                    hidden: true,           
                    align: 'left',
                    editable: true,
                    editrules : { required: true,edithidden:true}, // 编辑的规则                            
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
            pager: "#jqGridPager3",
            //获取选中行ID集合
            onSelectRow: function (rowId, status, e) { 
                rowIds = jQuery("#jqGrid3").jqGrid('getGridParam', 'selarrrow');                   
            },
            onSelectAll:function(ids,status){
                if (status) 
                    rowIds = ids;
                else 
                    rowIds = [];
            }
        });
        
        // 操作方法
        $('#jqGrid3').navGrid('#jqGridPager3',
            // the buttons to appear on the toolbar of the grid
            { edit: true, add: false, del: false, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
            // options for the Edit Dialog
            {
                editCaption: "售后换货",
                recreateForm: true,
                //checkOnUpdate : true,
            // checkOnSubmit : true,
                closeAfterEdit: true,
                reloadAfterSubmit : true,

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
                            }
                        }
                    }                              
                    $('#IMEI').val(rowIds.toString())
                    $('#tr_IMEI').hide()     
                    $('#tr_maintaintype').hide()

                    $('#tr_ordercode').hide()  
                    $('#tr_trackingcode').hide() 
                    $('#tr_ordername').hide() 
                    $('#tr_shoption').hide() 

                    $('#tr_remark').hide()
                    $('#testStatus').attr('disabled','true') 
                    $('#remark').val('')
                                    
                },
                beforeCheckValues:function(posdata,formid,mode){ // 表单验证数据之前
                    posdata.testStatus = posdata.maintaintype == '2'?'70':(parseInt(posdata.testStatus) + 1).toString() 
                    delete posdata.maintaintype                  
                },
                afterSubmit:  function (response, postdata, formid) {                    
                    var res = JSON.parse(response.responseText)
                    if (res.result){ $(this).jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid') }
                    return [res.result, res.message]                
                },
                errorTextFormat: function (data) {
                    console.log(data)
                    return 'Error: ' + data.responseText
                },
            }                
        );

        $('#query3').click(function (e) {
            e.preventDefault()
            var 
                IMEI = $('#IMEI3').val()       
            $("#jqGrid3").jqGrid('setGridParam', {
                page: 1,
                datatype:'json',
                postData: {              
                    'IMEI': IMEI
                }
            }).trigger("reloadGrid")
        })
   }
   function fn4() {
    // var rowIds = [];
     // 基本配置
     $("#jqGrid4").jqGrid({
         url: 'sh/find',       
         editurl: 'sh/edit',
         datatype: "json",
         mtype: 'post',
         rownumbers: true,
         postData: {pageCode: 'shwx'}, 
         multiselect : true, // 允许多选
         colModel: [
             {
                 label: 'IMEI',
                 name: 'IMEI',
                 key: true,
                 width: 75,                    
                 editable: true,                                                                     
             },
             {
                 label: '机型',
                 name: 'type',
                 width: 75,                               
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
                 align: 'center',                   
                 edittype: 'select',
                 editoptions: {value: '1:黑色;2:白色;3:亮黑;4:磨砂黑;5:中国红;6:粉色'},
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
                     }
                 }
             },
             {
                 label: '内存',
                 name: 'memory',
                 width: 75,                               
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
            //  {
            //      label: '入/出库',
            //      name: 'status',
            //      width: 75,                               
            //      align: 'center',                   
            //      edittype: 'select',
            //      editoptions: {value: '1:入库'},
            //      formatter: function (value) {
            //          switch(value) {
            //              case '1': return '入库'
            //                  break;
            //              case '2': return '出库'
            //                  break;                                             
            //          }
            //      }
                 
            //  },
             {
                 label: '状态',
                 name: 'testStatus',
                 width: 75,     
                 editable: true,          
                 align: 'center',
                 edittype: 'select',
                 editoptions: {value: '51:售后维修'},
                 formatter: function (value) {                   
                     switch(value) {
                         case '51': return '售后维修'
                             break;
                                                             
                     }
                 }
             },   
             {
                label: '检测类型',
                name: 'shtesttype',
                width: 75,                                   
                align: 'center',
            //    editable: true,
                //editrules : { required: true}, // 编辑的规则
                edittype: 'select',
                editoptions: {value: '1:完好;2:客观原因故障;3:主观原因故障'},
                formatter: function (value) {                   
                    switch(value) {
                        case '1': return '完好'
                            break;
                        case '2': return '客观原因故障'
                            break;                           
                        case '3': return '主观原因故障'
                            break;                                        
                    }
                }
            }, 
            {
                label: '售后选项',
                name: 'shoption',
                hidden: true,                                
                align: 'center',
                editable: true,
                editrules : { edithidden:true}, // 编辑的规则
                edittype: 'select',
                editoptions: {value: '1:退货处理;2:换货处理;3:维修处理'},
                formatter: function (value) {                   
                    switch(value) {
                        case '1': return '退货处理'
                            break;  
                        case '2': return '换货处理'
                            break;
                        case '3': return '维修处理'
                            break;                                                               
                    }
                }

            },                           
             {
                 label: '维修类型',
                 name: 'maintaintype',  // 1 修好 2 无法修好
                 hidden: true,           
                 align: 'left',
                 editable: true,
                 editrules : { required: true,edithidden:true}, // 编辑的规则    
                 edittype: 'select',
                 editoptions: {value: '1:修好;2:无法修好'},
                 formatter: function (value) {                   
                     switch(value) {
                         case '1': return '修好'
                             break;
                         case '2': return '无法修好'
                             break;                                                                                          
                     }
                 }                        
             },
             {
                label: '备注',
                name: 'remark',
                width: 75,               
                align: 'left',
                editable: true,            
                edittype: 'textarea',                               
            },
             {
                label: '倒计时',
                name: 'djs',
                width: 100,               
                align: 'center',
                //editable: true,  
                formatter: function (value) {  
                    var mss = value - (new Date().getTime())
                    var days = parseInt(mss / (1000 * 60 * 60 * 24));
                    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = (mss % (1000 * 60)) / 1000;
                    if (days == hours == minutes == seconds == 0) return '已超时'
                    return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 "                       
                } 


            },
         ],
         sortname: 'IMEI',
         sortorder : 'asc',
         loadonce: true, // 是否可翻页
         viewrecords: true,  // 展示总数
         height: '100%',
         rowNum: 10,
         autowidth: true,
         pager: "#jqGridPager4",
         // 获取选中行ID集合
         // onSelectRow: function (rowId, status, e) { 
         //     rowIds = jQuery("#jqGrid3").jqGrid('getGridParam', 'selarrrow');                   
         // },
         // onSelectAll:function(ids,status){
         //     if (status) 
         //         rowIds = ids;
         //     else 
         //         rowIds = [];
         // }
     });
     
     // 操作方法
     $('#jqGrid4').navGrid('#jqGridPager4',
         // the buttons to appear on the toolbar of the grid
         { edit: true, add: false, del: false, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
         // options for the Edit Dialog
         {
             editCaption: "售后维修",
             recreateForm: true,
             //checkOnUpdate : true,
         // checkOnSubmit : true,
             closeAfterEdit: true,
             reloadAfterSubmit : true,

             afterShowForm : function (formid) { // 表单显示后触发   
                 // var statusInit = '';
                 // for(var i=0;i<rowIds.length;i++) {
                 //     var testStatus = $('#jqGrid1').jqGrid('getRowData',rowIds[i]).testStatus;
                 //     if (statusInit == '') {
                 //         statusInit = testStatus
                 //     }                            
                 //     else {
                 //         if (statusInit != testStatus) {
                 //             alert('状态不一致，无法批量操作！')
                 //             $('#sData').hide()
                 //         }
                 //     }
                 // }                              
                 $('#IMEI').attr('disabled','true') 
                 $('#tr_IMEI').hide()
                 $('#tr_shoption').hide()
                 $('#testStatus').attr('disabled','true') 
                 $('#remark').val('')
                                 
             },
             beforeCheckValues:function(posdata,formid,mode){ // 表单验证数据之前
                // if (posdata.maintaintype == '1')  // 已修好
                // {
                //     posdata.shtesttype = '1'  // 检测类型改为完好
                //     if (posdata.shoption == '1') {   
                //         posdata.testStatus == '31' // 退货类型 返回退货
                //     } else if (posdata.shoption == '2') {
                //         posdata.testStatus == '41'  // 换货类型 返回换货
                //     } else {
                //         posdata.testStatus == '60'   // 维修类型  返回售后发货
                //     }
                    
                // }
                // else    // 无法修好
                // {
                //     if (posdata.shoption == '1') {   
                //         posdata.testStatus == '31' // 退货类型 返回退货
                //     } else if (posdata.shoption == '2') {
                //         posdata.testStatus == '41'  // 换货类型 返回换货
                //     } else {
                //         posdata.testStatus == '41'   // 维修类型   返回换机
                //     }
                // }
                console.log(posdata)
                         
             },
             afterSubmit:  function (response, postdata, formid) {                    
                 var res = JSON.parse(response.responseText)
                 if (res.result){ $(this).jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid') }
                 return [res.result, res.message]                
             },
             errorTextFormat: function (data) {
                 console.log(data)
                 return 'Error: ' + data.responseText
             },
         }                
     );
     //var timer = setInterval(function (){},1000)
     $('#query4').click(function (e) {
         e.preventDefault()
         var 
             IMEI = $('#IMEI4').val()       
         $("#jqGrid4").jqGrid('setGridParam', {
             page: 1,
             datatype:'json',
             postData: {              
                 'IMEI': IMEI
             }
         }).trigger("reloadGrid")
     })
}
})