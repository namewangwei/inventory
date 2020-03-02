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
        })
    })
   fn1();

   function fn1() {
        var rowIds = [];
        // 基本配置
        $("#jqGrid1").jqGrid({
            url: 'zj/find',       
            editurl: 'zj/edit',
            datatype: "json",
            mtype: 'post',
            rownumbers: true,
            postData: {pageCode: 'zjqr', zjr: '2'}, 
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
                    label: '改码',
                    name: 'gm',
                    width: 75,                                       
                    align: 'center',
                    editable: true,
                    // editrules : { required: true,edithidden:true}, // 编辑的规则
                    edittype: 'select',
                    editoptions: {value: '1:需更改;2:无需更改'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '1': return '需更改'
                                break;
                            case '2': return '无需更改'
                                break;                           
                            default: return ''
                                break;                                        
                        }
                    }
                },
                {
                    label: '屏幕',
                    name: 'ping',
                    width: 75,                                        
                    align: 'center',
                    editable: true,
                   // editrules : { required: true,edithidden:true}, // 编辑的规则
                    edittype: 'select',
                    editoptions: {value: '1:更换盖板;2:更换总成'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '1': return '更换盖板'
                                break;
                            case '2': return '更换总成'
                                break;                           
                            default: return ''
                                break;                                        
                        }
                    }
                },
                {
                    label: '外壳',
                    name: 'ke',
                    width: 75,                                        
                    align: 'center',
                    editable: true,
                   // editrules : { required: true,edithidden:true}, // 编辑的规则
                    edittype: 'select',
                    editoptions: {value: '1:需更换;2:无需更换'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '1': return '需更换'
                                break;
                            case '2': return '无需更换'
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
                    editoptions: {value: '7:确认接收;106:返工待接收'},
                    formatter: function (value) {                   
                        switch(value) {                            
                            case '7': return '装机员待接收' 
                                break;
                            case '106': return '返工待接收'
                                break;                                                             
                        }
                    }
                },
                {
                    label: '备注',
                    name: 'remark',
                    width: 100,              
                    align: 'left',
                   // editable: true,            
                    edittype: 'textarea',  
                   // editrules : { edithidden:true}, // 编辑的规则                             
                },               
                {
                    label: '倒计时',
                    name: 'djs',
                    width: 100,               
                    align: 'center'
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
            },
            loadComplete: function () {                               
                var ids = jQuery("#jqGrid1").jqGrid('getDataIDs');
                var djs = [];
                ids.forEach(function(item,index) {
                    djs[index] = jQuery("#jqGrid1").jqGrid('getRowData',item).djs;
                    setInterval(function () {
                        var times;   
                        var mss = djs[index] - (new Date().getTime())                                              
                        var hours = parseInt(mss / 1000 / 60 / 60 % 24*3 , 10); //计算剩余的小时 
                        var minutes = parseInt(mss / 1000 / 60 % 60, 10);//计算剩余的分钟 
                        var seconds = parseInt(mss / 1000 % 60, 10);//计算剩余的秒数 
                        if (mss <= 0) times = '<span style="color:red;">已超时</span>'
                        else
                        times = '<span style="color:red;">'+hours+':'+minutes+':'+seconds+'<span>'                    
                        jQuery("#jqGrid1").jqGrid('setRowData',item,{djs:times })
                    }) 
                })
            }
        });
        
        // 操作方法
        $('#jqGrid1').navGrid('#jqGridPager1',
            // the buttons to appear on the toolbar of the grid
            { edit: true,edittext:'确认收货', add: false, del: false, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
            // options for the Edit Dialog
            {
                editCaption: "确认收货",
                recreateForm: true,
               // checkOnUpdate : true,
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
                    $('#ping').attr('disabled','true')
                    $('#ke').attr('disabled','true')
                    $('#gm').attr('disabled','true')                    
                },
                beforeCheckValues:function(posdata,formid,mode){ // 表单验证数据之前
                   posdata.testStatus = (parseInt(posdata.testStatus) + 1).toString();                                                                   
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
            url: 'zj/find',       
            editurl: 'zj/edit',
            datatype: "json",
            mtype: 'post',
            rownumbers: true,
            postData: {pageCode: 'zj'}, // 查询未检测 and 装机中
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
                    editoptions: {value: '8:装机;107:返工'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '8': return '装机'
                                break;                            
                            case '107': return '返工'
                                break;                                        
                        }
                    }
                },
                // {
                //     label: '改码',
                //     name: 'gm',
                //     hidden: true,                                     
                //     align: 'center',
                //     editable: true,
                //     editrules : { required: true,edithidden:true}, // 编辑的规则
                //     edittype: 'select',
                //     editoptions: {value: '1:已更改;2:无需更改'},
                //     formatter: function (value) {                   
                //         switch(value) {
                //             case '1': return '已更改'
                //                 break;
                //             case '2': return '无需更改'
                //                 break;                           
                //             default: return ''
                //                 break;                                        
                //         }
                //     }
                // },
                // {
                //     label: '屏幕',
                //     name: 'ping',
                //     hidden: true,                                     
                //     align: 'center',
                //     editable: true,
                //     editrules : { required: true,edithidden:true}, // 编辑的规则
                //     edittype: 'select',
                //     editoptions: {value: '1:更换盖板;2:更换总成'},
                //     formatter: function (value) {                   
                //         switch(value) {
                //             case '1': return '更换盖板'
                //                 break;
                //             case '2': return '更换总成'
                //                 break;                           
                //             default: return ''
                //                 break;                                        
                //         }
                //     }
                // },
                // {
                //     label: '外壳',
                //     name: 'ke',
                //     hidden: true,                                     
                //     align: 'center',
                //     editable: true,
                //     editrules : { required: true,edithidden:true}, // 编辑的规则
                //     edittype: 'select',
                //     editoptions: {value: '1:已更换;2:无需更换'},
                //     formatter: function (value) {                   
                //         switch(value) {
                //             case '1': return '已更换'
                //                 break;
                //             case '2': return '无需更换'
                //                 break;                           
                                                                  
                //         }
                //     }
                // },
                {
                    label: '备注',
                    name: 'remark',
                 //   editable: true,
                    width: 75,               
                    align: 'left',                              
                    edittype: 'textarea',                               
                },
                {
                    label: '倒计时',
                    name: 'djs',
                    width: 100,               
                    align: 'center'
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
            },
            loadComplete: function () {                               
                var ids = jQuery("#jqGrid2").jqGrid('getDataIDs');
                var djs = [];
                ids.forEach(function(item,index) {
                    djs[index] = jQuery("#jqGrid2").jqGrid('getRowData',item).djs;
                    setInterval(function () {
                        var times;   
                        var mss = djs[index] - (new Date().getTime())                                              
                        var hours = parseInt(mss / 1000 / 60 / 60 % 24*3 , 10); //计算剩余的小时 
                        var minutes = parseInt(mss / 1000 / 60 % 60, 10);//计算剩余的分钟 
                        var seconds = parseInt(mss / 1000 % 60, 10);//计算剩余的秒数 
                        if (mss <= 0) times = '<span style="color:red;">已超时</span>'
                        else
                        times = '<span style="color:red;">'+hours+':'+minutes+':'+seconds+'<span>'                    
                        jQuery("#jqGrid2").jqGrid('setRowData',item,{djs:times })
                    }) 
                })
            }
        });
        
        // 操作方法
        $('#jqGrid2').navGrid('#jqGridPager2',
            // the buttons to appear on the toolbar of the grid
            { edit: true,edittext:'操作', add: false, del: false, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
            // options for the Edit Dialog
            {
                editCaption: "操作",
                recreateForm: true,
                //checkOnUpdate : true,
               // checkOnSubmit : true,
                closeAfterEdit: true,
                reloadAfterSubmit : true,

                afterShowForm : function (formid) { // 表单显示后触发       \
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
                    $('#testStatus').attr('disabled','true')
                   // $('#remark').val('')
                },
                beforeCheckValues:function(posdata,formid,mode){ // 表单验证数据之前
                    posdata.testStatus = (parseInt(posdata.testStatus) + 1).toString() 
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
        $('#refresh_jqGrid2').click(function () {
            $("#jqGrid2").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
            return false;
        })
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