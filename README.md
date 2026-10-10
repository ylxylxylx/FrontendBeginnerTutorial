<!--
 * @Author: ylx ylx@qq.com
 * @Date: 2026-10-08 16:01:03
 * @LastEditors: ylx ylx@qq.com
 * @LastEditTime: 2026-10-10 14:23:52
 * @FilePath: \FrontendBeginnerTutorial\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# FrontendBeginnerTutorial

前端新手入门教程，从零开始系统学习前端开发。

## 教程阶段

| 阶段 | 主题 | 状态 |
|------|------|------|
| 第一阶段 | HTML + CSS | ✅ 已完成 |
| 第二阶段 | JavaScript | � 进行中 |
| 第三阶段 | HTML5 + CSS3 | 📝 待更新 |
| 第四阶段 | Node.js | 📝 待更新 |
| 第五阶段 | Vue + React | 📝 待更新 |

---

## 第一阶段：HTML + CSS

网页基础与样式入门，掌握页面结构与布局能力。

### 目录结构

```
第一阶段html+css/
├── 1、前端简介/          # 前端概述、网页结构、常用标签、实体字符、锚点
├── 2、表格表单/          # 表格、长表格、表单及属性、案例（个人简介/课程表）
├── 3、css文本样式 盒模型/ # CSS引入、选择器权重、字体/文本样式、盒模型、外边距、圆角
├── 4、雪碧图  背景浮动布局/ # 溢出处理、背景属性、雪碧图、元素分类、文档流、浮动布局
├── 5、定位伪类伪元素/     # 页面布局、position定位、伪类伪元素、tooltip案例
├── 6、土巴兔案例/        # 综合实战：复习、土巴兔页面、浮动影响、导航条交互
├── 7、layui和bootstrap/  # 浮动清除方法、Layui框架、Bootstrap框架
└── 8、Git/               # Git常用命令、版本回退、远程仓库、分支操作
```

### 知识点概览

- **HTML 基础**：网页结构、常用标签、表格、表单、实体字符、锚点链接
- **CSS 基础**：选择器与权重、样式引入方式、字体与文本样式、颜色与背景
- **盒模型**：content/padding/border/margin、外边距重合与穿透、边框圆角与三角形
- **布局**：文档流、浮动布局、清除浮动、定位（static/relative/fixed/absolute）
- **进阶**：伪类与伪元素、visibility 与 display:none、雪碧图、元素溢出处理
- **框架**：Layui 栅格与表单、Bootstrap 导航栏与栅格
- **工具**：Git 版本控制、远程仓库、分支管理

---

## 第二阶段：JavaScript

编程语言基础，让页面动起来。

### 目录结构

```
第二阶段 javaScript/
├── 1、变量、运算符、分支/       # 编程语言介绍、JS执行过程、变量与数据类型、输入输出、运算符、分支语句
├── 2、多分支和for循环/         # switch多分支、while/do-while/for循环、break/continue、循环嵌套、练习
├── 3、分支和循环练习讲解/      # 分支与循环综合练习、代码调试技巧
├── 4、函数、提升、字符串处理/   # 函数定义与调用、参数与返回值、变量提升、字符串常用方法
├── 5、JS内置对象/              # Math、Number、String、Array、Date等内置对象及常用方法
├── 6、数组和arguments/         # 数组常用操作、数组遍历、冒泡排序、arguments对象
├── 7、匿名函数、递归、转义字符/ # 匿名函数与自执行函数、递归、转义字符、综合练习
├── 8、DOM节点、属性节点、Date、定时器/ # DOM基本概念、元素查找/遍历/增删改、Date对象、定时器
├── 9、DOM鼠标事件、捕获和冒泡/  # 事件三种绑定方式、事件对象、捕获与冒泡、鼠标事件与坐标、拖拽
├── 10、this、图形变换、过渡动画、帧动画/ # this指向、CSS 2D变换、过渡动画、帧动画、鼠标事件位置
└── 11、键盘事件、window事件、尺寸和位置/ # 自定义属性、键盘事件、animate库、window事件、尺寸与位置
```

### 知识点概览

- **JS 基础**：编程语言介绍、JavaScript 执行过程、变量与数据类型、输入输出
- **运算符**：算术运算符、关系运算符、逻辑运算符、赋值运算符
- **流程控制**：分支语句（if/else、switch）、循环（while、do-while、for）、break/continue
- **函数**：函数定义与调用、参数与返回值、变量提升、作用域
- **字符串**：字符串常用方法、字符串遍历、模板字符串
- **内置对象**：Math、Number、String、Array、Date 等常用方法
- **数组**：增删改查（push/pop/shift/unshift/splice）、遍历（for/for-in/forEach）、排序、去重
- **DOM 操作**：节点类型、元素查找（querySelector）、遍历、内容修改、增删改
- **事件系统**：三种事件绑定方式、事件对象 event、捕获与冒泡、事件传播控制
- **鼠标事件**：click/mousedown/mouseup/mousemove、坐标系统（pageX/clientX/offsetX）、拖拽实现
- **this 指向**：七种场景（全局、普通函数、对象方法、事件、构造函数、定时器、回调）
- **CSS 变换与动画**：translate/scale/rotate、transition 过渡动画、animation 帧动画、@keyframes
- **键盘事件**：onkeydown/onkeypress/onkeyup、keyCode、组合键判断
- **window 事件**：onload/onhashchange/onresize/onscroll
- **尺寸与位置**：clientWidth/offsetWidth/scrollWidth、offsetLeft/getBoundingClientRect、scrollTop
- **自定义属性**：data-* 属性、dataset、三种从页面向 JS 传值的方式
- **动画库**：animate.css 的引入和使用

---

## 后续阶段（待更新）

### 第三阶段：HTML5 + CSS3

> 现代网页特性，新标签与新样式

### 第四阶段：Node.js

> 服务端 JavaScript，全栈开发基础

### 第五阶段：Vue + React

> 主流前端框架，组件化开发

---

## 使用说明

1. 按阶段顺序学习，每个阶段内按编号顺序阅读
2. 每个教程包含：知识点讲解、代码示例、注意事项、速记口诀
3. 案例文件夹中的代码可直接在浏览器中打开运行
4. 建议边学边练，修改代码观察效果

## 环境

- 浏览器：Chrome（推荐）
- 编辑器：VS Code（推荐）
- Git：版本控制工具