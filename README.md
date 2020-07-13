# 全栈博客系统

## 目录设计

server：后端接口

client：前台页面

admin：后台页面


## 数据库设计

文章：id、title、tagList、publishTime、 content

启动：mongod --config /usr/local/etc/mongod.conf

## 前台请求服务器的接口设计

获取文章列表：/getArticleList

获取某文章：/getArticleById

根据标签获取文章列表：/getArticleListByTag

根据文章名模糊搜索文章：/getArticleListByKeywords

## 后台请求服务器的接口设计







