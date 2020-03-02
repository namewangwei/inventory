$this.HistoryIndex = function (orderType) {
    $("body").attr("class", "bg");//由于页面都是共用一个body，需要针对浏览窗口定义背景
    $this.orderType = orderType;
    $this.selectList = [];//批量审核已选id
    $("select").select2({
        minimumResultsForSearch: -1,
    });
    if (orderType == 51) {
        $("select[name=OrderStatus]").select2({
            minimumResultsForSearch: -1,
            data: [
                { id: ' ', text: '--单据状态--' },
                { id: '1', text: '保存' },
                { id: '2', text: '审核' },
                { id: '3', text: '部分发货' },
                { id: '4', text: '完全发货' },
                { id: '5', text: '已冲销' },
                { id: '9', text: '作废' },
            ],
        });
    } else {
        $("select[name=OrderStatus]").select2({
            minimumResultsForSearch: -1,
            data: [
                { id: ' ', text: '--单据状态--' },
                { id: '1', text: '保存' },
                { id: '2', text: '审核' },
                { id: '3', text: '部分收货' },
                { id: '4', text: '完全收货' },
                { id: '5', text: '已冲销' },
                { id: '9', text: '作废' },
            ],
        });
    }
    //收起与展开
    $("#moreBtn").click(function () {
        $(this).toggleClass("ui-more-drop-l ui-more-expand-l");
        if ($(this).hasClass("ui-more-drop-l")) {
            $(".mater-page-gray-banner").css("height", "45px");
            $(".Report .form-group").css("margin-bottom", "10px");
            $(this).html("更多 <i class='fa fa-angle-down'></i>");
            $('#hidden-condition').stop().hide();
            //$('.changelocation').css('margin-top', '0px');
        } else {
            $(".mater-page-gray-banner").css("height", "90px");
            $(".Report .form-group").css("margin-bottom", "2px");
            $(this).html("收起 <i class='fa fa-angle-up'></i>");
            $('#hidden-condition').stop().fadeIn().css('margin-top', '10px');
            //$('.changelocation').css('margin-top', '10px');
        }
    })
    //日期天数选择
    $this.setDateInit = function () {
        //默认第一个按钮背景色为激活
        $(".btn-group :button").eq(0).addClass("activeBtn");
        //点击按钮事件
        $(".btn-group :button").click(function () {
            //背景颜色
            $(".btn-group :button").removeClass("activeBtn");
            $(this).addClass("activeBtn");
            //获取开始与结束日期的增加天数
            var AddDayCount = $(this).attr("data-date");
            if (AddDayCount == "") {
                $this.beginDate = $("#BeginDate").val();
                $this.endDate = $("#EndDate").val();
                $("#dateDiv").show();
                return;
            } else {
                $("#dateDiv").hide();
            }
            var begintAddDayCount = AddDayCount.split(",")[0];
            var endAddDayCount = AddDayCount.split(",")[1];
            var beginDate = new Date();
            var endDate = new Date();
            //设置日期增加天数
            beginDate.setDate(beginDate.getDate() + Number(begintAddDayCount));
            endDate.setDate(endDate.getDate() + Number(endAddDayCount));
            //转换日期格式并赋值
            $this.beginDate = beginDate.Format("yyyy-MM-dd");
            $this.endDate = endDate.Format("yyyy-MM-dd");
            if (AddDayCount != "") {
                $("#ButtonSearch").click();
            };
            //if ($this.selectList.length > 0) {
            //    $('.changelocation.buttondelete').css('display', 'inline-block');
            //} else {
            $this.selectList = [];
            $('.changelocation.buttondelete').css('display', 'none');
            //};
        });
    }

    //日期控件初始化
    $this.DateControlInit = function () {
        $(".date-picker input").val((new Date).Format("yyyy-MM-dd"));
        $(".date-picker input").css("cursor", "pointer");
        $(".date-picker").find("span").click(function () {
            $(this).prev("input").focus();
        });
        $(".date-picker").datepicker({
            format: "yyyy-mm-dd",
            defaultDate: +7,
            language: "zh-CN",
            autoclose: true,
            todayBtn: 'linked',//今日按钮
            weekStart: 1,
        });
    }

    //导出
    var objHtml = '<div class="btn-group">' +
'<a href="javascript:;" class="btn widget-btn-icon dropdown-toggle" data-toggle="dropdown">' +
'<i class="iconfont icon-export"></i> 导出' +
'</a>' +
'<ul class="dropdown-menu" role="menu">' +
'<li data-type="xlsx"><a href="javascript:void(0)" ondragstart="return false">MS-Excel 2007 xlsx</a></li>' +
'<li data-type="excel"><a href="javascript:void(0)" ondragstart="return false">MS-Excel 2003 xls</a></li>' +
'</ul>' +
'</div>';
    //表格导出事件
    $('#BillExport').html(objHtml);
    $('#BillExport li').find('a').click(function () {
        var type = $(this).parent("li[data-type]").attr("data-type");
        var $info = new ajaxData("SFAOrderHeader/GenSfaOrderBills");
        $info.data = {
            model: {
                "WSID": "",
                "BeginTime": $this.beginDate,
                "EndTime": $this.endDate,
                "purBill": $("#orderBillSearch").val(),
                "purType": $this.orderType,
                "status": $("select[name=OrderStatus]").val(),
                "filter": $("#orderBillSearch").val(),
                "isAllowPage": true
            }, xlstype: type
        };

        $info.$post(function (result) {
            var downUrl = getUrl('/sfa/DailyRoute/DownloadFile?file=' + result.list.Url);
            window.location.target = "_blank";
            window.location.href = downUrl
        });
    });

    //新增单据事件
    $("#BillAdd").click(function () {
        parent.LayoutObj = null;
        var url = getUrl("DMS/SFAOrderHeader?id=" + orderType).toLowerCase();
        //parent.$(".J_menuItem[href='" + url + "']", window.parent.document).click();
        this.href = url;
    })

    //查询事件
    $("#ButtonSearch").click(function () {
        var s = $("#dateDiv").css("display");
        if (s != "none") {
            $this.beginDate = $("#BeginDate").val();
            $this.endDate = $("#EndDate").val();
        }
        $tableObj.refresh({
            "WSID": "",
            "BeginTime": $this.beginDate,
            "EndTime": $this.endDate,
            "purBill": $("#orderBillSearch").val(),
            "purType": $this.orderType,
            "status": $("select[name=OrderStatus]").val(),
            "filter": $("#orderBillSearch").val(),
            "isAllowPage": true
        });
        $('.changelocation.buttondelete').css('display', 'none');
    });

    //获取历史数据-表格
    $this.tableInit = function () {
        if (orderType == 51) {
            //销售订单
            var cols = [{
                field: 'isCkeck',
                title: '勾选',
                checkbox: true,
                width: 30,
                halign: 'center',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    return row.isCkeck == true ? true : false;
                }
            }];
        } else {
            //销售退货单
            var cols = [];
        };
        var columns = [{
            //根据页数和行号算出序号
            field: 'ID',
            title: '序号',
            width: 30,
            halign: 'center',
            align: 'center',
            valign: 'middle',
            formatter: function (value, row, index) {
                var pageSize = $table.bootstrapTable('getOptions', "queryParams").pageSize;
                var pageNumber = $table.bootstrapTable('getOptions', "queryParams").pageNumber;
                return (index + 1) + pageSize * pageNumber - pageSize;
            }
        },
        {
            field: 'OrderNo',
            title: '订单编号',
            width: 60,
            halign: 'center',
            align: 'left',
            valign: 'middle',
            sortable: true
        }, {
            field: 'OutOrderID',
            title: '来源订单编号',
            width: 60,
            halign: 'center',
            align: 'left',
            valign: 'middle',
            sortable: true
        }, {
            field: 'StatusN',
            title: '状态',
            width: 50,
            halign: 'center',
            align: 'center',
            valign: 'middle',
            sortable: true,
        }, {
            field: 'CustomerName',
            title: '客户名称',
            width: 180,
            halign: 'center',
            align: 'left',
            valign: 'middle',
            sortable: true
        }, {
            field: 'ddly',
            title: '订单来源',
            width: 60,
            halign: 'center',
            align: 'center',
            valign: 'middle',
            sortable: true
        }, {
            field: 'RecUserName',
            title: '最后修改用户',
            width: 40,
            halign: 'center',
            align: 'center',
            valign: 'middle',
            sortable: true
        },
        {
            field: 'RecTimeStamp',
            title: '最后修改日期',
            width: 60,
            halign: 'center',
            align: 'center',
            valign: 'middle',
            sortable: true,
            formatter: function (value, row, index) {
                if (value == null) {
                    return null;
                } else {
                    return new Date(eval('new ' + value.substr(1, value.length - 2))).Format("yyyy-MM-dd");
                }
            }
        }, {
            field: 'isreverse',
            title: '是否冲销',
            width: 50,
            halign: 'center',
            align: 'center',
            valign: 'middle',
            sortable: true,
            formatter: function (value, row, index) {
                return value == 1 ? '是' : '否';
            }
        },
        {
            field: 'operate',
            title: '操作',
            width: 60,
            switchable: true,
            align: 'center',
            halign: 'center',
            valign: 'middle',
            formatter: function (value, row, index) {
                //if (row.StatusN == '冲销') {
                //    return '';
                //} else {                   
                return '<div style="width:80px;height:20px;margin:0 auto;text-align:center;"><a data-style="slide-left"  class="btn widget-btn-icon btn-xs ladda-button edit"><i class="iconfont icon-edit"></i></a>' + (row.Status == 1 ? '<a data-style="slide-left" class="btn widget-btn-icon btn-xs ladda-button delete"><i class="iconfont icon-delete"></i></a>' : '' + '</div>');
                // }
            },
            events: {
                'click .edit': function (e, value, row, index) {
                    parent.LayoutObj = { "OrderID": row.OrderID };
                    var url = getUrl("DMS/SFAOrderHeader?id=" + orderType).toLowerCase();
                    //parent.$(".J_menuItem[href='" + url + "']", window.parent.document).click();
                    this.href = url;
                },
                'click .delete': function (e, value, row, index) {
                    delConfirm(function () {
                        $table.bootstrapTable('remove', { field: 'OrderID', values: [row.OrderID] });
                        $info = new ajaxData("SFAOrderHeader/DeleteSFAOrderBILL");
                        $info.data = {
                            orderid: row.OrderID
                        };
                        $info.$post(function (result) {
                            if (result.result == true) {
                                // $tableObj.refresh();

                            }
                        });
                        if ($table.bootstrapTable('getData').length == 0) {
                            $table.bootstrapTable('prevPage')
                        }
                    })
                }
            }
        }];
        var opt = {
            url: getUrl("SFAOrderHeader/FindHistoryOrderBill"),
            QueryParams: {
                "WSID": "",
                "BeginTime": $this.beginDate,
                "EndTime": $this.endDate,
                "purBill": $("#orderBillSearch").val(),
                "purType": $this.orderType,
                "status": $("select[name=OrderStatus]").val(),
                "filter": $("#orderBillSearch").val(),
                "isAllowPage": true
            },
            data: { "rows": [], "pagenumber": 1, "pagesize": 20, "total": null },
            columns: cols.concat(columns),
        };
        $tableObj = $table.bootStrapTableInit(opt);
        $tableObj.init();
        $tableObj.on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table', function () {
            $this.selectList = [];
            selections = $table.bootstrapTable('getSelections');// getIdSelections();
            if (selections.length > 0) {
                $('.changelocation.buttondelete').css('display', 'inline-block');
                $.each(selections, function (i, item) {
                    $this.selectList.push(item.OrderID);
                });
            } else {
                $('.changelocation.buttondelete').css('display', 'none');
            };
        });
        function getIdSelections() {
            var arr;
            return $.map($table.bootstrapTable('getSelections'), function (row) {
                return row;
            });
        };
    }
    //批量审核事件
    $(".buttondelete").click(function () {
        var $info = new ajaxData("SFAOrderHeader/ComfirmSFAOrderList");
        $info.data = {
            idList: $this.selectList
        };
        $info.$post(function (result) {
            if (result.result == true) {
                $tableObj.refresh();
                $('.changelocation.buttondelete').css('display', 'none');
            }
        });
    });

    $this.DateControlInit();
    $this.setDateInit();
    $this.tableInit();
}