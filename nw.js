let Service = require('node-windows').Service;
 
let svc = new Service({
  name: 'inventory',    //服务名称
  description: ' ', //描述
  script: './index.js', //nodejs项目要启动的文件路径
  wait: '1',
  grow: '0.25'
});
 
svc.on('install', () => {
  svc.start();
});
 
svc.install();