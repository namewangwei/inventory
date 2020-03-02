$(function () {
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';

    
   fn2();
    
//    var now = new Date();   
//    var day = ("0" + now.getDate()).slice(-2);
//    var month = ("0" + (now.getMonth() + 1)).slice(-2);   
//    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
//    $('#time').val(today);

    function fn2() {
        var lastsel2;
         // 基本配置
        $("#jqGrid2").jqGrid({
            url: 'rk/query',            
            editurl: 'rk/edit',
            datatype: "json",
            mtype: 'post',
            rownumbers: true,   // 序号    
           // multiselect : true, // 允许多选
            colModel: [
                {
                    label: 'IMEI',
                    name: 'IMEI',
                    width: 100,                
                     // editable: true, ,   
                    key: true,   

                },
                {
                    label: '机型',
                    name: 'type',
                    width: 75,               
                    // editable: true, , 
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
                    // // // // editable: true, , ,                   
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
                    // // // // editable: true, , ,                   
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
                    label: '状态',
                    name: 'testStatus',
                    width: 75,    
                    // // // // editable: true, , ,           
                    align: 'center',
                    edittype: 'select',
                    // editoptions: {
                    //     value: '1:(入库)库管---检测1;2:检测员(1);3:(已检测1)检测---库管;4:库管(检测1);' + 
                    //     '5:库管---跟单;6:跟单员(进);7:跟单---装机;8:ABC装机中;'  + 
                    //     '9:(已装机)ABC---跟单;10:跟单员(出);11:跟单---库管;12:库管(装机);' +
                    //     '13:(待检测2)库管---检测2;14:检测员(2);15:(已检测2)检测---库管;16:库管(检测2);' +
                    //     '17:库管确认可销售;18:已销售;19:售后订单(待收货);20:(已收货)售后---检测;'+
                    //     '21:检测员(售后);30:检测---售后(退货);40:检测--售后(换货);50:检测--售后(维修);'+
                    //     '31:退货已收货;41:换货已收货;51:维修已收货;32:退货入库(待接收);42:换机入库(待接收);60:售后待发货;62.售后已发货(无操作);'+
                    //     '63:售后已发货;70:报废(待接收);71:报废'
                    // },
                    formatter: function (value) {                   
                        switch(value) {
                            case '0': return '入库'
                                break;
                            case '1': return '检测(待接收)'
                                break;
                            case '2': return '检测中'
                                break;                                   
                            case '3': return '已检测(库管待接收)'
                                break;
                            case '4': return '库管(检测1)' 
                                break; 
                            case '5': return '跟单员(待接收)' 
                                break; 
                            case '6': return '配料中' 
                                break; 
                            case '7': return '装机员(待接收)' 
                                break;
                            case '8': return '装机中'
                                break;
                            case '9': return '已装机(跟单待接收)'
                                break;   
                            case '10': return '已装机(跟单员)'
                                break;
                            // case '11': return '跟单---库管' 
                            //     break; 
                            // case '12': return '库管(装机)' 
                            //     break; 
                            case '13': return '装机检测(待接收)' 
                                break; 
                            case '14': return '装机检测中' 
                                break;
                            case '15': return '已装机检测(库管待接收)'
                                break;   
                            case '16': return '库管(可销售)'
                                break;
                            case '17': return '出库(可销售)' 
                                break; 
                            case '18': return '已销售' 
                                break;  
                            case '19': return '售后订单(待收货)' 
                                break;
                            case '20': return '(已收货)售后---检测'
                                break;   
                            case '21': return '检测员(售后)'
                                break;
                            case '30': return '检测---售后(退货)' 
                                break; 
                            case '40': return '检测--售后(换货)' 
                                break;  
                            case '50': return '检测--售后(维修)'
                                break;   
                            case '31': return '退货已收货'
                                break;
                            case '41': return '换货已收货' 
                                break; 
                            case '51': return '维修已收货' 
                                break;
                            case '32': return '退货入库(待接收)'
                                break;
                            case '42': return '换机入库(待接收)'
                                break;
                            case '52': return '售后维修(待接收)'
                                break;
                            case '53': return '售后维修中'
                                break;
                               
                            case '54': return '售后维修完成(待接收)'
                                break;
                            case '60': return '售后待发货' 
                                break;
                            case '61': return '售后待发货(无操作)' 
                                break;
                            case '62': return '售后已发货(无操作)' 
                                break;   
                            case '63': return '售后已发货' 
                                break;   
                            case '70': return '报废(待接收)'
                                break; 
                            case '71': return '报废' 
                                break;
                            case '100': return '检测未通过' 
                                break;  
                            case '101': return '库管已退货'
                                break; 
                            case '11': return '售前维修(待接收)'
                                break;   
                            case '12': return '售前维修中'
                                break;
                            case '120': return '已维修(库管待接收)'
                                break;
                            case '121': return '已售前维修'
                                break; 
                                case '102': return '需返工(跟单待接收)'
                                break;
                            case '103': return '需返工(跟单已接收)'
                                break; 
                                case '106': return '需返工(装机待接收)'
                                break;
                            case '107': return '返工中'
                                break; 
                                case '108': return '已返工(跟单待接收)'
                                break;
                            case '109': return '已返工(跟单已接收)'
                                break; 
                                                                                                                                
                        }
                    }
                },  
                {
                    label: '时间',
                    name: 'update_at',
                    width: 100,               
                    align: 'center',
                    // // // // editable: true, , , 
                },
                {
                    label: '金额',
                    name: 'amount',
                    width: 75,               
                    align: 'center',
                    editable: true,                                                            
                },                
                {
                    label: '备注',
                    name: 'remark',
                    width: 100,               
                    align: 'left',
                    // // // // editable: true, , ,            
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
             // 获取选中行
             onSelectRow: function (id, status, e) { 
                if (id && id !== lastsel2) {
                    $('#jqGrid2').jqGrid('restoreRow', lastsel2);
                    $('#jqGrid2').jqGrid('editRow', id, true);
                    lastsel2 = id;
                  }                
            },            
            loadComplete: function() {       // 数据加载完成后     
            }           
        });
        $("#jqGrid2").jqGrid('setGroupHeaders', {
            useColSpanStyle: true,
            groupHeaders: [{ titleText: "基础信息", startColumnName: "IMEI", numberOfColumns: 4 }]
        });

        
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
            var status = $('#status2').val(),               
               // testStatus = $('#testStatus2').val(),
                IMEI = $('#IMEI2').val(),
                type = $('#type').val(),
                color = $('#color').val(),
                memory = $('#memory').val(),
                time = $('#time').val()
               
                           
            $("#jqGrid2").jqGrid('setGridParam', {       
                page: 1,
                datatype:'json',
                postData: {
                    'status': status,                   
                 //   'testStatus': testStatus,
                    'IMEI': IMEI,
                    'type': type,
                    'color': color,
                    'memory': memory,
                    'time': time
                }
            }).trigger("reloadGrid")
        })
    }
   

   
    
})