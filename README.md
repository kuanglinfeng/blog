# 全栈博客系统

## 目录设计

server：后端接口

client：前台页面

admin：后台页面

## 数据库设计

文章：id、title、tagList、publishTime、 content

启动：mongod --config /usr/local/etc/mongod.conf

文件上传：
1. 通常情况下，服务器会提供一个统一的aip接口，用于处理上传的文件
2. 客服端会使用post请求，请求服务器
content-type: multipart/form-data
3. express服务端使用中间件multer来处理文件上传
4. 确定上传到服务器的文件名 => 为了防止上传的文件名重复，可用时间戳来表示文件名
5. 限制上传文件的尺寸
6. 限制上传文件的后缀名
7. 当发生错误时，如何响应给客户端；正确时又如何响应
正确：响应文件的路径
错误：响应错误消息

## 前台请求服务器的接口设计

获取文章列表：/getArticleList

获取某文章：/getArticleById

根据标签获取文章列表：/getArticleListByTag

根据文章名模糊搜索文章：/getArticleListByKeywords

## 后台请求服务器的接口设计


## 部署

1. 服务端 端口：5500
2. admin端 http://blogsys.kuanglinfeng.com
3. client端 https://kuanglinfeng.com






