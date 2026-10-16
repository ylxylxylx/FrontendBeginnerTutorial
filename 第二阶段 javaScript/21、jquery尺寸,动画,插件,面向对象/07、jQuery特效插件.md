# jQuery 特效插件

> 使用鲜花插件和烟花插件为页面添加视觉特效，认识 canvas 画布

## 一、特效插件概述

```
特效插件不用于常规的 UI 交互，而是为页面添加视觉冲击力:

  jquery-flower.js    → 鲜花绽放特效（canvas 绘图）
  jquery.fireworks.js → 烟花特效（canvas 绘图 + 音效）
```

## 二、canvas 画布标签

```html
<!-- canvas 是 HTML5 新增的画布标签，用于在网页上绘图 -->
<!-- 和 img 一样是行内块元素 -->
<canvas></canvas>
```

| 特性 | 说明 |
|------|------|
| 标签类型 | 行内块元素（同 img） |
| 作用 | 提供一块可绘图的区域 |
| 绘图方式 | 通过 JavaScript 的 canvas API 绘制 |
| 适用场景 | 特效、图表、游戏、图像处理 |

## 三、鲜花插件

### 导入插件

```html
<!-- 导入 jQuery 和鲜花插件 -->
<script src="./jquery.min.js"></script>
<script src="./jquery插件/jquery-flower.js"></script>
```

### 完整示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>鲜花插件</title>
    <style>
        canvas{
            width: 500px;
        }
    </style>
</head>
<body>
    <!-- canvas 画布标签，插件会在画布上绘制鲜花特效 -->
    <canvas></canvas>
</body>
<script src="./jquery.min.js"></script>
<script src="./jquery插件/jquery-flower.js"></script>
</html>
```

> 鲜花插件自动在 canvas 画布上绘制鲜花绽放动画，无需额外调用代码。

## 四、烟花插件

### 导入插件

```html
<!-- 导入 jQuery 和烟花插件 -->
<script src="./jquery.min.js"></script>
<script src="./jquery插件/jquery.fireworks.js"></script>
```

### 使用方式

```javascript
// 把烟花特效添加到 body 上
$("body").fireworks({
    sound: true,    // 开启音效
    opacity: 0.5    // 设置透明度
})
```

### 完整示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>烟花插件</title>
    <style>
        body{
            margin: 0;
            height: 100vh;  /* body 占满整个视口高度 */
        }
    </style>
</head>
<body>

</body>
<script src="./jquery.min.js"></script>
<script src="./jquery插件/jquery.fireworks.js"></script>
<script>
    // 把烟花添加到 body 上
    $("body").fireworks({
        sound: true,   // 开启音效
        opacity: 0.5   // 设置透明度
    })
</script>
</html>
```

### fireworks 参数

| 参数 | 说明 | 示例值 |
|------|------|--------|
| `sound` | 是否开启音效 | `true` / `false` |
| `opacity` | 烟花透明度 | `0` ~ `1` |

```
烟花效果:
  点击页面 → 烟花从点击位置升空 → 爆炸绽放 → 消散

  🎆
   ↑
   │  升空
   │
  ─┴── 点击位置
```

## 五、特效插件的使用模式

```
jQuery 特效插件的通用使用步骤:

  1. 导入 jQuery 核心库
  2. 导入特效插件 js 文件
  3. 选择目标元素，调用插件方法

  $("选择器").插件方法({
      参数1: 值1,
      参数2: 值2
  })
```

| 插件 | 方法 | 目标元素 |
|------|------|----------|
| 鲜花插件 | 自动生效 | canvas 画布 |
| 烟花插件 | `fireworks()` | 任意元素（通常 body） |
| smoove | `smoove()` | 需要展示动画的元素 |

## 六、总结

| 要点 | 说明 |
|------|------|
| canvas | HTML5 画布标签，行内块元素，用于绘图 |
| 鲜花插件 | 导入即用，在 canvas 上绘制鲜花特效 |
| 烟花插件 | `$("body").fireworks({sound, opacity})` |
| 音效控制 | `sound: true` 开启烟花音效 |
| 透明度 | `opacity` 控制烟花透明度（0~1） |
| 使用模式 | 导入 jQuery → 导入插件 → 调用插件方法 |