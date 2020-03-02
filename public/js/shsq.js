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
            if (i == 4) {
                fn5()
                $("#jqGrid5").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
            }
        })
    })
   fn1();
    /******************生成预售后订单***************************** */
   function fn1() {
        var rowIds = [];
        // 基本配置
        $("#jqGrid1").jqGrid({
            url: 'shsq/find',       
            editurl: 'shsq/edit',
            datatype: "json",
            mtype: 'post',
            rownumbers: true,
            postData: {pageCode: 'shsq'}, 
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
                    editoptions: {
                        value: '18:生成客服纪录;19:生成预售后订单',
                        dataEvents:[
                            {
                                type:'change',
                                fn:function(e){
                                    var val = this.value;
                                    $('#tr_shordercode').hide()
                                    $('#shordercode').val('')                                      
                                    $('#remark').val('')
                                    if (val == '19') {
                                        $('#tr_shordercode').show()
                                    }
                                    
                                }
                            }
                        ]
                    },
                    formatter: function (value) {                   
                        switch(value) {
                            case '18': return '已销售'
                                break;                                                                 
                        }
                    }
                },                
                {
                    label: '售后订单号',
                    name: 'shordercode',
                    hidden: true,                                     
                    align: 'center',
                    editable: true,
                    editrules : { edithidden:true}, // 编辑的规则                    
                },
                // {
                //     label: '客户快递单号',
                //     name: 'shtrackingcode',
                //     hidden: true,                                     
                //     align: 'center',
                //     editable: true,
                //     editrules : { required: true,edithidden:true}, // 编辑的规则                    
                // },
                {
                    label: '备注',
                    name: 'remark',
                    hidden: true,                                     
                    align: 'center',
                    editable: true,
                    editrules : { required: true,edithidden:true}, // 编辑的规则
                    edittype: 'textarea'
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
            { edit: true,edittext:'操作', add: false, del: false, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
            // options for the Edit Dialog
            {
                editCaption: "操作",
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
                    $('#tr_shordercode').hide()
                    $('#shordercode').val('')   
                      
                    $('#remark').val('')           
                                       
                },
                beforeCheckValues:function(posdata,formid,mode){ // 表单验证数据之前
                    if (!posdata.testStatus) posdata.testStatus = '18'
                  //  posdata.testStatus = (parseInt(posdata.testStatus) + 1).toString()                    
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
        $('#refresh_jqGrid1').click(function () {
            $("#jqGrid1").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
            return false;
        })
   }
    /******************确认售后订单***************************** */
   function fn2() {
        var rowIds = [];
        // 基本配置
        $("#jqGrid2").jqGrid({
            url: 'shsq/find',       
            editurl: 'shsq/edit',
            datatype: "json",
            mtype: 'post',
            rownumbers: true,
            postData: {pageCode: 'shdd'}, 
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
                    editoptions: {value: '19:售后订单(待收货)'},
                    formatter: function (value) {                   
                        switch(value) {                           
                            case '19': return '售后订单(待收货)'
                                break;   
                                                                  
                        }
                    }
                },
                {
                    label: '售后订单号',
                    name: 'shordercode',
                    width: 75,                                   
                    align: 'center',
                    editable: true,
                    editrules : { required: true}, // 编辑的规则                    
                },
                {
                    label: '客户快递单号',
                    name: 'shtrackingcode',
                    width: 75,                                   
                    align: 'center',
                    editable: true,
                    editrules : { required: true}, // 编辑的规则                    
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
                    label: '退货原因',
                    name: 'remark',
                    width: 100,                                     
                    align: 'center',
                    editable: true,
                  //  editrules : { required: true}, // 编辑的规则
                    edittype: 'textarea'
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
        });          
        
        // 操作方法
        $('#jqGrid2').navGrid('#jqGridPager2',
            // the buttons to appear on the toolbar of the grid
            { edit: true, edittext:'确认售后订单', add: false, del: false, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
            // options for the Edit Dialog
            {
                editCaption: "售后处理",
                recreateForm: true,
               // checkOnUpdate : true,
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
                    $('#shordercode').attr('disabled','true')
                    // $('#shtrackingcode').attr('disabled','true')
                    $('#remark').attr('disabled','true')
                    $('#testStatus').attr('disabled','true')

                   // $('#remark').val('')
                },
                beforeCheckValues:function(posdata,formid,mode){ // 表单验证数据之前
                    posdata.testStatus = (parseInt(posdata.testStatus) + 1).toString()                    
                },
                afterSubmit:  function (response, postdata, formid) {
                    // console.log(response, postdata, formid)
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
        });
    };

     /******************检测 / 维修后收货***************************** */
    function fn3() {
        var rowIds = [];
        // 基本配置
        $("#jqGrid3").jqGrid({
            url: 'sh/find',       
            editurl: 'sh/edit',
            datatype: "json",
            mtype: 'post',
            rownumbers: true,
            postData: {pageCode: 'shczqr'}, 
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
                    label: '状态',
                    name: 'testStatus',
                    width: 75,     
                    editable: true,          
                    align: 'center',
                    edittype: 'select',
                    editoptions: {value: '30:售后退货(待确认);40:售后换货(待确认);50:售后维修(待确认);54:已维修(待确认);55:无法维修-换机(待确认)'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '30': return '售后退货(待确认)'
                                break;
                            case '40': return '售后换货(待确认)'
                                break;
                            case '50': return '售后维修(待确认)'
                                break;  
                            case '54': return '已维修(待确认)'
                                break;  
                            case '55': return '无法维修-换机(待确认)'
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
            pager: "#jqGridPager3",
            // 获取选中行ID集合
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
            { edit: true, edittext:'确认收货', add: false, del: false, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
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
                        var testStatus = $('#jqGrid3').jqGrid('getRowData',rowIds[i]).testStatus;
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
                    if (posdata.testStatus == '54') {
                        posdata.testStatus = '60'
                        
                    }
                    else if (posdata.testStatus == '55') {
                        posdata.testStatus = '56'    // 无法维修，换机                   
                    } else {
                        if (posdata.shtesttype == '1') {
                            posdata.testStatus = posdata.testStatus == '50'?'41':(parseInt(posdata.testStatus) + 1).toString()
                       } else if (posdata.shtesttype == '2') {
                            posdata.testStatus = '51' 
                            
                       } else {
                            posdata.testStatus = '61'  
                       }   
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

    /******************售后处理***************************** */
    function fn4() {
        var rowIds = [];
        // 基本配置
        $("#jqGrid4").jqGrid({
            url: 'sh/find',       
            editurl: 'sh/edit',
            datatype: "json",
            mtype: 'post',
            rownumbers: true,
            postData: {pageCode: 'sh'}, 
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
                    label: '状态',
                    name: 'testStatus',
                    width: 75,     
                    editable: true,          
                    align: 'center',
                    edittype: 'select',
                    editoptions: {value: '31:售后退货;41:售后换货;51:售后维修;56:无法维修-换机'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '31': return '售后退货'
                                break;  
                            case '41': return '售后换货'
                                break;      
                            case '51': return '售后维修'
                                break;       
                            case '56': return '无法维修-换机'
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
                    label: '售后选项',
                    name: 'shoption',
                    width: 75,                                 
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
                    label: '备注',
                    name: 'remark',
                    width: 75,               
                    align: 'left',
                    editable: true,            
                    edittype: 'textarea',                               
                },
                {
                    label: '替换机器IMEI',
                    name: 'newIMEI',
                    hidden: true,           
                    align: 'left',
                    editable: true,
                   // editrules : { required: true,edithidden:true}, // 编辑的规则    换成后台检验      

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
            onSelectRow: function (rowId, status, e) { 
                rowIds = jQuery("#jqGrid4").jqGrid('getGridParam', 'selarrrow');                   
            },
            onSelectAll:function(ids,status){
                if (status) 
                    rowIds = ids;
                else 
                    rowIds = [];
            }
        });
        
        // 操作方法
        $('#jqGrid4').navGrid('#jqGridPager4',
            // the buttons to appear on the toolbar of the grid
            { edit: true, edittext:'售后处理', add: false, del: false, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
            // options for the Edit Dialog
            {
                editCaption: "售后处理",
                recreateForm: true,
                //checkOnUpdate : true,
            // checkOnSubmit : true,
                closeAfterEdit: true,
                reloadAfterSubmit : true,

                afterShowForm : function (formid) { // 表单显示后触发   
                    var statusInit = '';
                    for(var i=0;i<rowIds.length;i++) {
                        var testStatus = $('#jqGrid4').jqGrid('getRowData',rowIds[i]).testStatus;
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
                    $('#tr_ordercode').hide()  
                    $('#tr_trackingcode').hide() 
                    $('#tr_ordername').hide() 

                    $('#tr_newIMEI').hide()
                    $('#tr_shoption').hide()
                    $('#tr_maintaintype').hide()
                    $('#testStatus').attr('disabled','true') 
                    $('#shtesttype').attr('disabled','true') 
                    $('#remark').val('')
                    $('#tr_remark').hide()
                    if ($('#testStatus').val() == '41' || ($('#testStatus').val() == '51' && $('#shoption').val() == '2') || $('#testStatus').val() == '56') {
                        $('#tr_newIMEI').show()
                    }
                                    
                },
                beforeCheckValues:function(posdata,formid,mode){ // 表单验证数据之前
                    if (posdata.testStatus == '51') {
                        posdata.djs = new Date().getTime() + 3*24*3600*1000;
                    }
                    // if (posdata.testStatus == '51') {
                    //     posdata.djs = new Date().getTime() + 3*24*3600*1000;
                    // }
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

    /******************售后发货***************************** */
    function fn5() {
        var rowIds = [];
        // 基本配置
        $("#jqGrid5").jqGrid({
            url: 'shfh/find',       
            editurl: 'shfh/edit',
            datatype: "json",
            mtype: 'post',
            rownumbers: true,
            postData: {pageCode: 'shfh'}, // 查询未检测 and 装机中
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
                // {
                //     label: '入/出库',
                //     name: 'status',
                //     width: 75,               
                //     align: 'center',                   
                //     edittype: 'select',
                //     editoptions: {value: '1:入库;2:出库'},
                //     formatter: function (value) {
                //         switch(value) {
                //             case '1': return '入库'
                //                 break;
                //             case '2': return '出库'
                //                 break;                                             
                //         }
                //     }
                    
                // },
                {
                    label: '售后选项',
                    name: 'shoption',
                    width: 75,                                     
                    align: 'center',
                  //  editable: true,
                  //  editrules : { required: true,edithidden:true}, // 编辑的规则
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
                    editoptions: {value: '60:售后待发货;61:售后待发货(无操作)'},
                    formatter: function (value) {                   
                        switch(value) {                            
                            case '60': return '售后待发货' 
                                break;
                            case '61': return '售后待发货(无操作)' 
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
                // {
                //     label: '备注',
                //     name: 'remark',
                //     editable: true,
                //     width: 75,               
                //     align: 'left',                              
                //     edittype: 'textarea',                               
                // },
            ],
            sortname: 'IMEI',
            sortorder : 'asc',
            loadonce: true, // 是否可翻页
            viewrecords: true,  // 展示总数
            height: '100%',
            rowNum: 10,
            autowidth: true,
            pager: "#jqGridPager5",
            // 获取选中行ID集合
            onSelectRow: function (rowId, status, e) { 
                rowIds = jQuery("#jqGrid5").jqGrid('getGridParam', 'selarrrow');                   
            },
            onSelectAll:function(ids,status){
                if (status) 
                    rowIds = ids;
                else 
                    rowIds = [];
            }
        });
        
        // 操作方法
        $('#jqGrid5').navGrid('#jqGridPager5',
            // the buttons to appear on the toolbar of the grid
            { edit: true,edittext:'售后发货', add: false, del: false, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
            // options for the Edit Dialog
            {
                editCaption: "填写发货信息",
                recreateForm: true,
              //  checkOnUpdate : true,
                //checkOnSubmit : true,
                closeAfterEdit: true,
                reloadAfterSubmit : true,

                afterShowForm : function (formid) { // 表单显示后触发  
                    var statusInit = '';
                    for(var i=0;i<rowIds.length;i++) {
                        var testStatus = $('#jqGrid5').jqGrid('getRowData',rowIds[i]).testStatus;
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
                    $('#testStatus').attr('disabled', 'true')                          
                },
                beforeCheckValues:function(posdata,formid,mode){ // 表单验证数据之前
                    posdata.testStatus = posdata.testStatus == '61'?'63':(parseInt(posdata.testStatus) + 1).toString() 
                    posdata.status = '2'
                },
                afterSubmit:  function (response, postdata, formid) {
                    // console.log(response, postdata, formid)
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
        $('#query5').click(function (e) {
            e.preventDefault()
            var 
                IMEI = $('#IMEI5').val()       
            $("#jqGrid5").jqGrid('setGridParam', {
                page: 1,
                datatype:'json',
                postData: {              
                    'IMEI': IMEI
                }
            }).trigger("reloadGrid")
        })
    }

    
    
    
})