# animate 动画库

## animate.css 简介

animate.css 是一个跨浏览器的 CSS 动画库，提供了大量预定义的动画效果，可以直接通过添加类名来使用。

## 使用步骤

### 第一步：引入 animate.css 文件

```html
<!-- 老版本 -->
<link rel="stylesheet" href="animate.css">

<!-- 新版本（4.x） -->
<link rel="stylesheet" href="animate4.1.0.css">
```

### 第二步：添加类名

**老版本（3.x）：**

```html
<!-- 1. 添加基础类名 animated -->
<!-- 2. 添加动画样式类名 -->
<div class="animated bounce">animate.css</div>
```

**新版本（4.x）：**

```html
<!-- 1. 添加基础类名 animate__animated -->
<!-- 2. 添加动画样式类名，不要忘记添加 animate__ 前缀 -->
<div class="animate__animated animate__bounce">animate.css</div>
<div class="animate__animated animate__flip">animate.css</div>
```

## 常用动画类名

| 动画效果 | 老版本类名 | 新版本类名 |
|----------|-----------|-----------|
| 弹跳 | `bounce` | `animate__bounce` |
| 闪烁 | `flash` | `animate__flash` |
| 脉冲 | `pulse` | `animate__pulse` |
| 抖动 | `shake` | `animate__shake` |
| 翻转 | `flip` | `animate__flip` |
| 淡入 | `fadeIn` | `animate__fadeIn` |
| 淡出 | `fadeOut` | `animate__fadeOut` |
| 滑入左 | `slideInLeft` | `animate__slideInLeft` |
| 滑入右 | `slideInRight` | `animate__slideInRight` |
| 缩放进入 | `zoomIn` | `animate__zoomIn` |

## 注意事项

- 新版本所有动画类名都需要添加 `animate__` 前缀
- 基础类名从 `animated` 变为 `animate__animated`
- 可以通过 CSS 自定义动画持续时间、延迟等属性