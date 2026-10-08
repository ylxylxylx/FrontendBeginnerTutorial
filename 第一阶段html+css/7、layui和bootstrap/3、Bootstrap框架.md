# Bootstrap 框架

> 本节介绍 Bootstrap 前端框架的基本使用，包括导航栏和栅格系统。

## 什么是 Bootstrap？

Bootstrap 是 Twitter 推出的前端 UI 框架，是目前最流行的 HTML、CSS 和 JS 框架之一。

**特点**：
- 移动优先，响应式设计
- 丰富的预定义组件
- 12 列栅格系统
- 需要依赖 jQuery

## 引入 Bootstrap

```html
<!-- 必须的 meta 标签 -->
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Bootstrap CSS -->
<link rel="stylesheet" href="./bootstrap-3.3.7-dist/css/bootstrap.css">

<!-- jQuery（Bootstrap 的 JS 插件依赖 jQuery） -->
<script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>

<!-- Bootstrap JS -->
<script src="./bootstrap-3.3.7-dist/js/bootstrap.js"></script>
```

> ⚠️ 三个 meta 标签必须放在 head 最前面，jQuery 必须在 Bootstrap JS 之前引入！

## 固定导航栏

```html
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <!-- 移动端折叠按钮 -->
            <button type="button" class="navbar-toggle collapsed"
                    data-toggle="collapse" data-target="#navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <!-- 品牌/Logo -->
            <a class="navbar-brand" href="#">Project name</a>
        </div>

        <!-- 导航链接 -->
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </div>
</nav>
```

### 导航栏 class 说明

| class | 说明 |
|-------|------|
| `navbar` | 导航栏基类 |
| `navbar-inverse` | 反色主题（黑底白字） |
| `navbar-fixed-top` | 固定在顶部 |
| `container` | 居中容器 |
| `navbar-header` | 导航栏头部区域 |
| `navbar-brand` | 品牌/Logo |
| `navbar-toggle` | 移动端折叠按钮 |
| `collapse navbar-collapse` | 可折叠的导航内容 |
| `nav navbar-nav` | 导航列表 |

## 容器与栅格

```html
<div class="container">
    <div class="starter-template">
        <h1>Bootstrap starter template</h1>
        <p class="lead">内容区域</p>
    </div>
</div>
```

| class | 说明 |
|-------|------|
| `container` | 固定宽度居中容器 |
| `container-fluid` | 全宽容器 |
| `row` | 行 |
| `col-md-*` | 中屏列（*为1-12） |

## 图标

```html
<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
```

Bootstrap 3 提供了 250+ 个 Glyphicons 图标，通过 class 名使用。

## body 偏移

当使用固定导航栏时，需要给 body 添加 padding-top，防止内容被导航栏遮挡：

```css
body {
    padding-top: 50px;  /* 导航栏高度 */
}
```

## Layui vs Bootstrap 对比

| 对比项 | Layui | Bootstrap |
|--------|-------|-----------|
| 定位 | 面向后端开发者 | 面向前端开发者 |
| 依赖 | 无依赖 | 依赖 jQuery |
| 栅格 | 12格 | 12列 |
| 响应式 | 支持 | 移动优先 |
| 主题 | 经典 | 多主题 |
| 学习曲线 | 低 | 中 |

## 速记口诀

> Bootstrap Twitter 出，移动优先响应式；
> 三 meta 标签放最前，jQuery 先于 BS 的 JS；
> navbar 固定导航栏，container 居中容器；
> glyphicon 图标多，body 偏移防遮挡。