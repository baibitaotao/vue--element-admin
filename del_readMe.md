该项目使用了 vue-admin 完整的项目

项目有限功能不需要可以去掉
excel
zip
table
JsonEditor
qiniu
pdf

增加了vue-scrollactive
在 srcoll 时通过 “active" 类高亮菜单选项 弃用

用 bootstrap-vue 滚动监听功能 优化中

nprogress 页面加载进度条

发布
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod

其他
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix