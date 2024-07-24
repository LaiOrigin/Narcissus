const fs = require('fs');
const path = require('path');

// 获取当前目录下的所有JS文件（排除index.js自己）
const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.js') && file !== 'index.js');

// 导出对象，用于存储所有导入的方法
const methods = {};

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    const regex = /\/([^\/.]+)\.[^.\/]+$/;
    const match = filePath.match(regex);

    if (match) {
        console.log(match[1]); // 输出: logger
    } else {
        console.log('未找到匹配的文件名');
    }
    let obj = match[1];
    const fileMethods = require(filePath);
    global[obj] = fileMethods;
    //加载全局方法
    Object.assign(methods, fileMethods);
});

module.exports = methods;
