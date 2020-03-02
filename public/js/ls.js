$(function() {
    function type(value) {
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
    };
    function color(value) {
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
    };
    function memory(value) {
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
    function zjr(value) {
        switch(value) {
            case '1': return 'A'
                break;
            case '2': return 'B'
                break;
            case '3': return 'C'
                break;
        }
    }
    function shoption(value) {
        switch(value) {
            case '1': return '售后退货'
                break;
            case '2': return '售后换货'
                break;
            case '3': return '售后维修'
                break;
        }
    }

    $('#query').click(function (e) {
        e.preventDefault()
        var IMEI = $('#IMEI').val()
        if (IMEI == '') return;
        $.ajax({
            url: 'ls/query',
            type: 'post',
            data: {IMEI: IMEI},
            success: function (result) {
                if(result.result) {
                    if (!result.data || !result.data.historyarr.length) {
                        $('#history').html('<h3>没有找到这台机器。</h3>')
                        return
                    }
                    var historyarr = result.data.historyarr
                    var content = ''
                    historyarr.forEach(function (item, index) {
                        item = JSON.parse(item)
                        item.type = type(item.type)
                        item.color = color(item.color)
                        item.memory = memory(item.memory)
                        item.zjr = zjr(item.zjr)
                        item.shoption = shoption(item.shoption)
                        switch (item.testStatus) {
                            case '0':
                                if (item.remark == '') {
                                    content += '<h3><b>---'+item.update_at+'</b>录入信息</h3>' +
                                               '<p><b></b><span>IMEI: '+item.IMEI+';</span><span>机型: '+item.type+';</span><span>颜色: '+item.color+';</span><span>内存: '+item.memory+';</span></p>'
                                }else {
                                    content += '<h3><b>---'+item.update_at+'</b>录入信息更改</h3>' +
                                    '<p><b></b><span>机型: '+item.type+';</span><span>颜色: '+item.color+';</span><span>内存: '+item.memory+';</span><br/><span style="color: red;padding-left:140px">备注: '+item.remark+';</span></p>'
                                }
                                break;
                            case '1':   content += '<h3><b>---'+item.update_at+'</b>库管发送至检测员，检测员待收货</h3>';break;
                            case '2':   content += '<h3><b>---'+item.update_at+'</b>检测员已确认收货</h3>';break;
                            case '3':   
                                content += '<h3><b>---'+item.update_at+'</b>检测员已检测，检测员---库管</h3>';
                                if (item.remark == '') {  content += '<p><b></b><span>机器完好;</span></p>'}
                                else { content += '<p><b></b><span>机器故障;</span><br/><span style="color: red;padding-left:140px">备注:'+item.remark+'</span></p>'}
                                break;
                            case '4': content += '<h3><b>---'+item.update_at+'</b>库管已确认收货，检测完成1</h3>';break;
                            case '5': content += '<h3><b>---'+item.update_at+'</b>跟单员待收货</h3>';
                            if (item.remark != '') 
                                { content += '<p><b></b><span>返回原因;</span><br/><span style="color: red;padding-left:140px">备注:'+item.remark+'</span></p>'}

                            break;
                            case '6': content += '<h3><b>---'+item.update_at+'</b>跟单员已确认收货</h3>';break;
                            case '7': content += '<h3><b>---'+item.update_at+'</b>跟单员配料---装机员('+item.zjr+')</h3>';
                                content += '<p><b></b><span>改码: '+(item.gm == '1'?'需更改':'无需更改')+';</span><span>屏幕: '+(item.ping == '1'?'更改盖板':'更换总成')+';</span><span>外壳: '+(item.ping == '1'?'需更换':'无需更换')+';</span></p>'
                                break;
                            case '8': content += '<h3><b>---'+item.update_at+'</b>装机员已确认收货</h3>';break;
                            case '9': content += '<h3><b>---'+item.update_at+'</b>装机员已装机,装机员---跟单员</h3>';break;
                                
                            case '10': content += '<h3><b>---'+item.update_at+'</b>跟单员已确认收货(从'+item.zjr+'返回)</h3>';break; 
                            // case '11': content += '<h3><b>---'+item.update_at+'</b>跟单员---库管，库管待收货</h3>';break; 
                            // case '12': content += '<h3><b>---'+item.update_at+'</b>库管已确认收货，装机完成</h3>';break;
                            case '13':   content += '<h3><b>---'+item.update_at+'</b>跟单---检测员，检测员待收货</h3>';break;
                            case '14':   content += '<h3><b>---'+item.update_at+'</b>检测员已确认收货</h3>';break;
                            case '15':   
                                content += '<h3><b>---'+item.update_at+'</b>检测员已检测，检测员</h3>';
                                if (item.remark == '') {  content += '<p><b></b><span>机器完好;</span></p>'}
                                else { content += '<p><b></b><span>机器故障;</span><br/><span style="color: red;padding-left:140px">备注:'+item.remark+'</span></p>'}
                                break;
                            case '16': content += '<h3><b>---'+item.update_at+'</b>库管已确认收货，库管确认可销售</h3>';break;
                            case '17': content += '<h3><b>---'+item.update_at+'</b>出库可销售</h3>';break;
                            case '18': content += '<h3><b>---'+item.update_at+'</b>已销售</h3>';
                                if (!item.trackingcode) {
                                    content += '<p><span style="color: red;padding-left:140px">客户维护纪录:'+item.remark+'</span></p>'                                   
                                } 
                                else
                                content += '<p><b></b><span>快递单号: '+item.trackingcode+';</span><span>订单号: '+item.ordercode+';</span><span>姓名: '+item.ordername+';</span></p>'
                                break;
                            case '19': content += '<h3><b>---'+item.update_at+'</b>售后订单待确认</h3>';
                                content += '<p><b></b><span>售后订单号: '+item.shordercode+';</span></p>';
                                content += '<p><span style="color: red;padding-left:140px">退货原因:'+item.remark+'</span></p>'                                   
                                break;
                            case '20': content += '<h3><b>---'+item.update_at+'</b>售后订单已生成，售后---检测员</h3>';
                                content += '<p><b></b><span>客户快递单号: '+item.shtrackingcode+';</span><span>售后选项为: '+item.shoption+';</span></p>'
                                break;
                            case '21': content += '<h3><b>---'+item.update_at+'</b>检测员已确认收货</h3>';                          
                                break;
                            case '30': 
                            case '40':
                            case '50':
                                content += '<h3><b>---'+item.update_at+'</b>检测员已检测，检测员---售后</h3>';  
                                if (item.shtesttype == '1') {  content += '<p><b></b><span>机器完好;</span></p>'}
                                else if (item.shtesttype == '2'){                              
                                     content += '<p><b></b><span>客观原因故障;</span><br/><span style="color: red;padding-left:140px">备注:'+item.remark+'</span></p>'
                                    } 
                                else if (item.shtesttype == '3'){                              
                                    content += '<p><b></b><span>主观原因故障;</span><br/><span style="color: red;padding-left:140px">备注:'+item.remark+'</span></p>'
                                    }                         
                                break;
                            case '31': 
                                content += '<h3><b>---'+item.update_at+'</b>售后退货确认收货</h3>'; 
                                break;
                            case '41':
                                content += '<h3><b>---'+item.update_at+'</b>售后换货确认收货</h3>'; 
                                break;
                            case '51':
                                content += '<h3><b>---'+item.update_at+'</b>售后维修确认收货</h3>'; 
                                break;
                            case '32':
                                content += '<h3><b>---'+item.update_at+'</b>售后退货入库，待接收</h3>';
                                break;
                            case '42':
                                content += '<h3><b>---'+item.update_at+'</b>售后换机入库，待接收</h3>';  
                                break; 
                            case '52':
                            content += '<h3><b>---'+item.update_at+'</b>售后维修，待接收</h3>'; 
                                break;
                            case '53':
                            content += '<h3><b>---'+item.update_at+'</b>售后维修中</h3>'; 
                                break;  
                            case '54':
                            content += '<h3><b>---'+item.update_at+'</b>售后维修完成，待接收</h3>'; 
                                break;     
                            case '60':  
                                content += '<h3><b>---'+item.update_at+'</b>售后待发货</h3>';
                                break;
                            case '61':
                                content += '<h3><b>---'+item.update_at+'</b>售后待发货(无操作)</h3>';
                                break;
                            case '62': 
                            content += '<h3><b>---'+item.update_at+'</b>售后已发货(无操作)</h3>';
                                break;   
                            case '63':
                            content += '<h3><b>---'+item.update_at+'</b>售后已发货</h3>';
                                break;   
                            case '70': 
                                content += '<h3><b>---'+item.update_at+'</b>机器报废入库,待接收</h3>';
                                if (item.remark != '') 
                                { content += '<p><span style="color: red;padding-left:140px">报废原因:'+item.remark+'</span></p>'}

                                break; 
                            case '71': 
                            content += '<h3><b>---'+item.update_at+'</b>该机器已报废</h3>';
                                break; 
                            case '99': 
                            content += '<h3><b>---'+item.update_at+'</b>检测未通过(库管待接收)</h3>';
                            content += '<p><span style="color: red;padding-left:140px">检测未通过原因:'+item.remark+'</span></p>'
                                break;   
                            case '100': 
                            content += '<h3><b>---'+item.update_at+'</b>检测未通过</h3>';
                                break;
                            case '101': 
                            content += '<h3><b>---'+item.update_at+'</b>库管已退货，出库</h3>';
                            content += '<p><b></b><span>快递单号: '+item.trackingcode+';</span><span>姓名: '+item.ordername+';</span></p>';
                            content += '<p><span style="color: red;padding-left:140px">退货原因:'+item.remark+'</span></p>'
                            break;  
                            case '11':
                            content += '<h3><b>---'+item.update_at+'</b>售前维修，待接收</h3>';  
                            content += '<p><span style="color: red;padding-left:140px">维修原因:'+item.remark+'</span></p>'
                            break; 
                            case '12':
                            content += '<h3><b>---'+item.update_at+'</b>售前维修中</h3>';
                            break;    
                            case '120':
                            content += '<h3><b>---'+item.update_at+'</b>已维修，库管待接收</h3>';
                            break; 
                            case '121':
                            content += '<h3><b>---'+item.update_at+'</b>已维修，入库</h3>';
                            break; 
                            case '102':
                            content += '<h3><b>---'+item.update_at+'</b>需返工，待确认</h3>';
                            content += '<p><span style="color: red;padding-left:140px">返工原因:'+item.remark+'</span></p>'
                            break;
                            case '103':
                            content += '<h3><b>---'+item.update_at+'</b>需返工，跟单员已收货</h3>';
                            break; 
                            case '106':
                            content += '<h3><b>---'+item.update_at+'</b>装机员返工待接收</h3>';
                            break; 
                            case '107':
                            content += '<h3><b>---'+item.update_at+'</b>返工中</h3>';
                            break; 
                            case '108':
                            content += '<h3><b>---'+item.update_at+'</b>已返工，装机员待接收</h3>';
                            break; 
                            case '109':
                            content += '<h3><b>---'+item.update_at+'</b>已返工，装机员已接收</h3>';
                            break; 

                        }
                    })
                    $('#history').html(content)
                }
            }
        }) 
    })
})