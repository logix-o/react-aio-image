# All In One Image

## Features

+ 支持懒加载
+ 支持自动计算最佳显示模式，以及提供多种自定义显示模式
+ 支持加载占位 & 自定义占位图
+ 支持定宽图的高度自适应
+ 支持服务端渲染

### todo

+ [x] 使用英文注释
+ [ ] 不再使用react-iconfont-cli维护图标文件
  + [ ] 支持打包svg文件
+ [ ] 换一种形式的图片占位组件
+ [ ] 支持图片预览
  + [ ] pc端鼠标显示放大镜
  + [ ] 深色模式
  + [ ] 显示默认图，支持查看原图
  + [ ] 从图片原始位置平移并放大显示

## 注意事项

### 安装

+ 使用`react-hooks`进行开发，务必安装`react@16.8.0+`
+ 若要兼容IE浏览器，请自行安装[polyfill]('https://github.com/w3c/IntersectionObserver/tree/master/polyfill')

### 使用

+ 若要使用响应式代码，务必对外联样式的`width & height`属性添加`!important`标识
+ 通过设置属性`mode='auto-height'`，使图片高度不受限于`height`属性，实现自适应

## 开发事项

在`src`中进行开发，在`demo`提供示例

### 开发并调试

``` bash
yarn dev
yarn demo
```

### 打包

``` bash
yarn build
```

## 参考文档

+ [iconfont](https://www.iconfont.cn/home/index)
+ [获取元素相对屏幕位置](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)
+ [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
+ [background-image vs img](https://lyhper.com/post/52f838c6b5796fdb5bc9b3a09ffce7785410b75b)

### 打包配置

+ [npm](https://juejin.im/post/5ab3f77df265da2392364341)
+ [typescript-babel](https://iamturns.com/typescript-babel/)
+ [rollup.js](https://rollupjs.org/guide/en/#quick-start)
+ [creat-react-library-rollup-config](https://github.com/transitive-bullshit/create-react-library/tree/master/template/typescript)
+ [avoid-mulitple-react-instance](https://github.com/facebook/react/issues/13991#issuecomment-462090853)

### 组件库

+ [react-spring](https://www.react-spring.io/)
+ [react-use-gesture](https://use-gesture.netlify.com/docs/introduction)
+ [file-saver](https://github.com/eligrey/FileSaver.js)
+ [react image design](https://github.com/stereobooster/react-ideal-image/blob/master/introduction.md)

### 动画优化

+ [浏览器渲染流水线解析与网页动画性能优化](https://zhuanlan.zhihu.com/p/30534023)
+ [Chrome 图片解码与 Image.decode API](https://zhuanlan.zhihu.com/p/43991630)
