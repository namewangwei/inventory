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
            url: 'shjc/find',       
            editurl: 'shjc/edit',
            datatype: "json",
            mtype: 'post',
            rownumbers: true,
            postData: {pageCode: 'wxqr'}, 
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
                    editoptions: {value: '52:售后维修(待接收);11:售前维修(待接收)'},
                    formatter: function (value) {                   
                        switch(value) {
                            case '52': return '售后维修(待接收)'
                                break;
                            case '11': return '售前维修(待接收)'
                                break;
                                                                 
                        }
                    }
                }, 
                {
                    label: '备注',
                    name: 'remark',
                    width: 75,               
                    align: 'left',                             
                    edittype: 'textarea',                               
                },  
                {
                    label: '倒计时',
                    name: 'djs',
                    width: 75,               
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
        postData: {pageCode: 'wx'}, 
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
                editoptions: {value: '53:售后维修中;12:售前维修中'},
                formatter: function (value) {                   
                    switch(value) {
                        case '53': return '售后维修中'
                            break;
                        case '12': return '售前维修中'
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
                        default: return ''
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
        { edit: true, edittext:'维修',add: false, del: false, search: false, refresh: false, view: false, position: "left", cloneToTop: false },
        // options for the Edit Dialog
        {
            editCaption: "维修",
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
                $('#IMEI').attr('disabled','true') 
                $('#tr_IMEI').hide()
                $('#tr_shoption').hide()
                $('#testStatus').attr('disabled','true') 
               // $('#remark').val('')
                                
            },
            beforeCheckValues:function(posdata,formid,mode){ // 表单验证数据之前 
                // if (posdata.testStatus == '12') {
                //     if (posdata.maintaintype == '1') 
                //     posdata.testStatus = '120'
                //     else 
                //     posdata.testStatus = '70'
                // }  
                // else {
                //     if (posdata.shoption == '1' ) {   // 退货类型 返回仓管
                //         posdata.testStatus = '30'  
                //       } else if (data.shoption == '2') { // 换货类型 
                //         posdata.testStatus = '40'
                //       } else {
                //         posdata.testStatus = '50'   // 维修类型  已维修
                //       } 
                // }            
                                          
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