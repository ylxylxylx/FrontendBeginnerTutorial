# Layui 框架

> 本节介绍 Layui 前端 UI 框架的基本使用，包括栅格系统和表单组件。

## 什么是 Layui？

Layui 是一套面向后端开发者的前端 UI 框架，提供丰富的组件和简洁的 API。

**特点**：
- 轻量级，无需依赖 Node.js 等构建工具
- 面向后端开发者，开箱即用
- 提供栅格系统、表单、按钮、图标等组件

## 环境概念

| 环境 | 说明 |
|------|------|
| 开发环境 | 项目写代码的过程 |
| 测试环境 | 测试代码、找 bug |
| 生产环境 | 正式上线 |

## 引入 Layui

```html
<!-- 引入 CSS -->
<link rel="stylesheet" href="./layui/css/layui.css">

<!-- 引入 JS -->
<script src="./layui/layui.js"></script>
```

## 栅格系统

Layui 的栅格系统将一行分为 **12 个格子**，通过 class 控制每个元素占几格。

### 响应式断点

| 前缀 | 屏幕类型 | 阈值 | 容器宽度 |
|------|---------|------|---------|
| `lg` | 大型屏幕 | ≥1200px | 1170px |
| `md` | 中等屏幕 | ≥992px | 970px |
| `sm` | 小屏幕 | ≥768px | 750px |
| `xs` | 超小屏幕 | <768px | auto |

### 使用示例

```html
<div class="layui-row">
    <!-- 大屏占6格(半行)，中屏占4格，小屏占3格，超小屏占2格 -->
    <div class="layui-col-lg6 layui-col-md4 layui-col-sm3 layui-col-xs2">
        内容1
    </div>
    <div class="layui-col-lg6 layui-col-md4 layui-col-sm3 layui-col-xs2">
        内容2
    </div>
    <!-- ... -->
</div>
```

> 💡 12格中每个 `layui-col-*` 后的数字表示占几格，一行总和不超过12。

### 隐藏元素

```html
<!-- 在小屏幕下隐藏 -->
<div class="layui-hide-sm">小屏幕看不到我</div>
```

### 奇偶选择

```css
/* 选中奇数个子元素 */
.bg:nth-child(2n+1) {
    background-color: red;
}
```

## 常用组件

### 按钮

```html
<button type="button" class="layui-btn layui-btn-warm layui-btn-radius">
    一个标准的按钮
</button>
```

| class | 说明 |
|-------|------|
| `layui-btn` | 基础按钮 |
| `layui-btn-warm` | 暖色按钮（橙色） |
| `layui-btn-radius` | 圆角按钮 |

### 图标

```html
<i class="layui-icon layui-icon-face-smile"></i>
```

### 表单

```html
<form class="layui-form" action="">
    <!-- 输入框 -->
    <div class="layui-form-item">
        <label class="layui-form-label">输入框</label>
        <div class="layui-input-block">
            <input type="text" name="title" required lay-verify="required"
                   placeholder="请输入标题" autocomplete="off" class="layui-input">
        </div>
    </div>

    <!-- 密码框 -->
    <div class="layui-form-item">
        <label class="layui-form-label">密码框</label>
        <div class="layui-input-inline">
            <input type="password" name="password" required lay-verify="required"
                   placeholder="请输入密码" autocomplete="off" class="layui-input">
        </div>
    </div>

    <!-- 选择框 -->
    <div class="layui-form-item">
        <label class="layui-form-label">选择框</label>
        <div class="layui-input-block">
            <select name="city" lay-verify="required">
                <option value=""></option>
                <option value="0">北京</option>
                <option value="1">上海</option>
            </select>
        </div>
    </div>

    <!-- 复选框 -->
    <input type="checkbox" name="like[write]" title="写作">
    <input type="checkbox" name="like[read]" title="阅读" checked>

    <!-- 开关 -->
    <input type="checkbox" name="switch" lay-skin="switch">

    <!-- 单选框 -->
    <input type="radio" name="sex" value="男" title="男">
    <input type="radio" name="sex" value="女" title="女" checked>

    <!-- 文本域 -->
    <textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>

    <!-- 提交按钮 -->
    <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
    <button type="reset" class="layui-btn layui-btn-primary">重置</button>
</form>
```

### 表单提交监听

```javascript
layui.use('form', function(){
    var form = layui.form;

    // 监听提交
    form.on('submit(formDemo)', function(data){
        layer.msg(JSON.stringify(data.field));
        return false;  // 阻止默认提交
    });
});
```

## 速记口诀

> Layui 后端好帮手，引入 CSS 和 JS；
> 栅格一行十二格，lg md sm xs 响应式；
> 按钮表单现成用，layui.use 加载模块。