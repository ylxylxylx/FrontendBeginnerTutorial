# jQuery 展示插件

> 使用 smoove 插件和波浪文字插件实现元素滚动进入视口时的展示动画

## 一、展示插件的作用

```
展示动画 = 元素进入可视区域时，以动画效果展示出来

应用场景:
  滚动网页时，元素从侧面滑入、从下方浮出、旋转出现等
  常见于产品展示页、落地页、企业官网
```

## 二、smoove 展示插件

### 导入插件

```html
<!-- 先导入 jQuery，再导入 smoove 插件 -->
<script src="./jquery.min.js"></script>
<script src="./jquery插件/jquery.smoove.js"></script>
```

### 基本使用

```javascript
// jquery插件是对jquery语法库的扩充和完善
// 它可以给jquery对象 $() 增添本来没有的方法
// 调用 smoove() 给对应标签添加展示动画，默认效果：渐显
$("div").smoove({
    perspective: 2000  // 透视距离，值越大3D效果越弱
})
```

### data 属性配置动画效果

```html
<div>默认渐显</div>
<div data-move-x="-300px">从左侧偏移300px的位置开始滑动显示</div>
<div data-move-x="300px">从右侧偏移300px的位置开始滑动显示</div>
<div data-move-y="200px">从下方偏移200px的位置开始滑动显示</div>
<div data-scale-x="0">宽度从0变化到100%</div>
<div data-scale-x="0" data-scale-y="0">宽高从0变化到100%</div>
<div data-rotate-y="180deg">绕着Y轴旋转半周</div>
<div data-rotate-z="180deg">绕着Z轴旋转半周</div>
```

### data 属性一览

| 属性 | 说明 | 示例值 |
|------|------|--------|
| `data-move-x` | 水平偏移起始位置 | `-300px` / `300px` |
| `data-move-y` | 垂直偏移起始位置 | `200px` |
| `data-scale-x` | X轴缩放起始比例 | `0`（从0变到1） |
| `data-scale-y` | Y轴缩放起始比例 | `0` |
| `data-rotate-y` | 绕Y轴旋转角度 | `180deg` |
| `data-rotate-z` | 绕Z轴旋转角度 | `180deg` |

```
data-move-x="-300px":        data-move-y="200px":

  元素从左侧滑入               元素从下方浮出
     ┌────┐                      ┌────┐
     │    │  ──→  ┌────┐         │    │
     └────┘       │    │         └────┘  ↑
                  └────┘                  │
                                  ┌────┐  │
                                  │    │ ←┘
                                  └────┘
```

### smoove 参数

```javascript
$("div").smoove({
    perspective: 2000,   // 3D透视距离
    duration: 1000,      // 动画时长(ms)
    easing: "ease"       // 缓动方式
})
```

## 三、波浪文字插件（danceWord）

### 导入插件

```html
<!-- 波浪文字插件需要导入对应的 css 和 js -->
<link rel="stylesheet" href="./jquery插件/波浪文字插件/css/d.css">
<script src="./jquery插件/波浪文字插件/js/jquery.min.js"></script>
<script src="./jquery插件/波浪文字插件/js/d.js"></script>
```

### 使用方式

```html
<!-- 给文字添加 danceWord 类名，插件自动识别 -->
<p class="danceWord">这段文字会以波浪形式逐字展示</p>
```

### 工作原理

```
插件内部流程:
  1. 找到所有 class 以 danceWord 开头的标签
  2. 将文字拆分成单个字符，每个字符包裹一个 <span>
     "你好" → "<span>你</span><span>好</span>"
  3. 监听滚动事件，判断文字是否进入可视区域
  4. 进入视口后，每个 span 按顺序依次执行波浪动画
```

```
展示效果（逐字波浪出现）:

  时间 →
  你      ← 第1个字符先动画
  你 好   ← 第2个字符延迟后动画
  你 好！  ← 依次波浪式展示
```

### 核心配置

```javascript
// 插件内部配置（d.js 源码）
var danceword = {
    interval: 60,   // 每个字符动画的间隔时间(ms)
    loop: false     // 是否循环播放
}
```

## 四、展示插件的共同特点

```
滚动触发机制:

  ┌────────────────────┐
  │     可视窗口        │ ← 元素进入这里时触发动画
  │                    │
  ├────────────────────┤
  │                    │
  │   尚未展示的元素    │ ← 等待滚动进入
  │                    │
  └────────────────────┘

  原理: 监听 scroll 事件
       比较 scrollTop + windowHeight 与元素的 offset().top
       元素进入视口 → 触发展示动画
```

## 五、完整示例（smoove）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>jquery展示插件</title>
    <script src="./jquery.min.js"></script>
    <script src="./jquery插件/jquery.smoove.js"></script>
    <style>
        div{
            width: 300px;
            height: 300px;
            margin: 300px;
            background-color: red;
        }
    </style>
</head>
<body>
    <div></div>
    <div data-move-x="-300px">从左侧偏移300px的位置开始滑动显示</div>
    <div data-move-x="300px">从右侧偏移300px的位置开始滑动显示</div>
    <div data-move-y="200px">从下方偏移200px的位置开始滑动显示</div>
    <div data-scale-x="0">宽度从0变化到100%</div>
    <div data-scale-x="0" data-scale-y="0">宽高从0变化到100%</div>
    <div data-rotate-y="180deg">绕着Y轴旋转半周</div>
    <div data-rotate-z="180deg">绕着Z轴旋转半周</div>
</body>
<script>
    $("div").smoove({
        perspective: 2000
    })
</script>
</html>
```

> **注意**：元素需要设置 `margin` 拉开间距，否则都在视口内会立即全部展示，看不到滚动触发的效果。

## 六、总结

| 要点 | 说明 |
|------|------|
| 插件本质 | 给 jQuery 对象扩展新方法（如 `smoove()`） |
| smoove | 滚动展示动画插件，通过 data 属性配置效果 |
| data-move-x/y | 设置偏移起始位置 |
| data-scale-x/y | 设置缩放起始比例 |
| data-rotate-y/z | 设置旋转角度 |
| 波浪文字 | 将文字拆分为 span，逐字波浪展示 |
| 触发机制 | 元素滚动进入可视区域时触发动画 |