$(function () {
    
    $.jgrid.defaults.responsive = true;
    $.jgrid.defaults.styleUI = 'Bootstrap';

    $("#jqGrid").jqGrid({
        url: 'admin/query',
        editurl: 'admin/admin',
        datatype: "json",
        mtype: 'post',
        rownumbers: true,
        colModel: [
            {
                label: '账号',
                name: 'name',
                width: 75,   
                key: true,                
                editable: true,                                                  
            },
            {
                label: '密码',
                name: 'password',
                width: 75,                                  
                editable: true,                                                  
            },
            {
                label: '权限',
                name: 'authorCode',
                width: 75, 
                align: 'center',                            
                editable: true,  
                edittype: 'select',       
                editoptions: {value: '0:超管;1:库管;2:检测员;3:跟单员;4:装机A;5:装机B;6:装机C;7:售后;8:维修'},
                formatter: function (value) {
                    switch(value) {
                        case '0': return '超管'
                            break;
                        case '1': return '库管'
                            break;
                        case '2': return '检测员'
                            break;
                        case '3': return '跟单员'
                            break;
                        case '4': return '装机A'
                            break;
                        case '5': return '装机B'
                            break;
                        case '6': return '装机C'
                            break;
                        case '7': return '售后'
                            break; 
                        case '8': return '维修'
                            break;                      
                    }
                }                                          
            },
        ],
        loadonce: true, // 是否可翻页
        viewrecords: true,  // 展示总数
        height: '100%',
        rowNum: 10,
        autowidth: true,
        pager: "#jqGridPager",
    })

    $('#jqGrid').navGrid('#jqGridPager',
        { edit: false, add: true,addtext:'新增账号', del: true,deltext:'删除账号', search: false, refresh: false, view: false, cloneToTop: true },
        {},
        {   
            closeAfterAdd: true,
            recreateForm: true,
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
    )


})