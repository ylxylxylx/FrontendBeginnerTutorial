# jQuery 动画插件

> jQuery 原生 animate 不支持颜色和 transform，通过插件扩展动画能力

## 一、为什么需要动画插件

```
jQuery animate() 的局限:
  ✗ 不支持颜色过渡（background-color、color 等）
  ✗ 不支持旋转和缩放（rotate、scale）

解决方案:
  ✓ jquery.animate-colors.js        → 颜色动画插件
  ✓ jquery-animate-css-rotate-scale.js → 旋转缩放插件
```

## 二、插件导入顺序

```html
<!-- 注意：jQuery 插件中使用了 jQuery 语法，必须先导入 jQuery 库，再导入插件 -->
<script src="./jquery.min.js"></script>

<!-- jQuery 没有封装颜色过渡动画，需要单独导入颜色动画插件 -->
<script src="./jquery插件/jquery.animate-colors.js"></script>

<!-- jQuery 动画同样不支持旋转和缩放，导入旋转缩放插件 -->
<script src="./jquery插件/jquery-animate-css-rotate-scale.js"></script>
```

```
导入顺序（必须）:
  jquery.min.js → jquery.animate-colors.js → jquery-animate-css-rotate-scale.js
       ↑                    ↑                          ↑
     核心库              颜色插件                  旋转缩放插件
  (插件依赖核心库，核心库必须在最前面)
```

> **关键**：所有 jQuery 插件都依赖 jQuery 核心库，导入顺序错了插件无法工作。

## 三、颜色动画插件

```javascript
$("button").click(function(){
    $("div")
    // 导入颜色动画插件后，可以动画形式改变颜色
    // 注意：这个插件不识别颜色名（如 "blue"），可用 #16进制 和 rgb 写法
    .animate({"background-color": "#ff0000"})
    .animate({"background-color": "rgb(0,255,0)"})
})
```

### 颜色写法对比

| 写法 | 是否支持 | 示例 |
|------|----------|------|
| 16进制 | 支持 | `#ff0000` |
| rgb | 支持 | `rgb(0,255,0)` |
| 颜色名 | 不支持 | ~~`"blue"`~~ |

```javascript
// ✗ 无效：颜色名不被识别
.animate({"background-color": "#blue"})

// ✓ 有效：16进制
.animate({"background-color": "#ff0000"})

// ✓ 有效：rgb
.animate({"background-color": "rgb(0,255,0)"})
```

## 四、旋转缩放插件

```javascript
$("button").click(function(){
    $("div")
    .animate({"background-color": "#ff0000"})
    .animate({"background-color": "rgb(0,255,0)"})
    // 使用旋转缩放插件后，语法要改成 rotate 和 scale
    .animate({"rotate": "60deg"})
    .animate({"scale": "2"})
})
```

### 语法变化

```javascript
// ✗ 原生 CSS 的 transform 写法不被插件识别
.animate({"transform": "rotate(60deg)"})

// ✓ 插件语法：rotate 和 scale 作为独立属性
.animate({"rotate": "60deg"})   // 旋转60度
.animate({"scale": "2"})        // 放大2倍
```

| 功能 | 原生 CSS 写法 | 插件写法 |
|------|---------------|----------|
| 旋转 | `transform: rotate(60deg)` | `{"rotate": "60deg"}` |
| 缩放 | `transform: scale(2)` | `{"scale": "2"}` |

## 五、完整示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>jquery动画插件</title>
    <style>
        div{
            width: 100px;
            height: 100px;
            border: 2px solid;
        }
    </style>
</head>
<body>
    <button>开始动画</button>
    <div></div>
</body>
<script src="./jquery.min.js"></script>
<script src="./jquery插件/jquery.animate-colors.js"></script>
<script src="./jquery插件/jquery-animate-css-rotate-scale.js"></script>
<script>
    $("button").click(function(){
        $("div")
        .animate({"background-color": "#ff0000"})   // 红
        .animate({"background-color": "rgb(0,255,0)"}) // 绿
        .animate({"rotate": "60deg"})   // 旋转60度
        .animate({"scale": "2"})        // 放大2倍
    })
</script>
</html>
```

```
动画执行流程（链式队列）:
  变红 ──→ 变绿 ──→ 旋转60° ──→ 放大2倍
```

## 六、jQuery 插件的原理

```
jQuery 插件本质 = 给 jQuery 对象($()) 增添本来没有的方法

  jQuery 核心库:  $().css()  $().animate()  $().show() ...
                         ↑ 插件扩展的新方法 ↑
  颜色插件:      $().animate({"background-color": "..."})
  旋转插件:      $().animate({"rotate": "..."})
  展示插件:      $().smoove()
  烟花插件:      $().fireworks()

插件扩展了 jQuery 的能力，让 animate 支持更多 CSS 属性
```

## 七、总结

| 要点 | 说明 |
|------|------|
| 插件依赖 | 插件必须放在 jQuery 核心库之后导入 |
| 颜色动画 | `jquery.animate-colors.js`，只支持 16进制和 rgb 写法 |
| 旋转缩放 | `jquery-animate-css-rotate-scale.js`，用 rotate/scale 属性 |
| 插件本质 | 给 jQuery 对象扩展新方法 |
| 链式调用 | 多个 animate 依次排队执行 |