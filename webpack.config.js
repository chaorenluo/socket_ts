/*
 * @Author: your name
 * @Date: 2020-03-05 13:45:12
 * @LastEditTime: 2020-05-23 18:51:51
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /combat_ts/webpack.config.js
 */ 
const webpack =require('webpack');
const path=require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports={
    mode:'development',//正式环境
    entry:{
        index:'./src/socket.ts'//编译入口
    },
    output:{
        filename:'main.js',//打包文件名
        path:__dirname+"/build"
    },
    resolve:{//选项能设置模块如何被解析
        extensions:['.ts','.tsx','.js']//设置这个import导入的时候就不需要带文件后缀了
    },
    module:{
        rules:[
            {
                test:/\.ts?$/,//编译.ts的文件
                exclude:'/node_module',//不需要编译的文件
                use:[
                    {loader:'ts-loader'} //编译的load
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin() // 删除build目录
    ],
}