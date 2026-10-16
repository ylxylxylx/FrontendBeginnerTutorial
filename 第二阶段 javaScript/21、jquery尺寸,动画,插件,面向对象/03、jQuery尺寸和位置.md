# jQuery 尺寸和位置

> 使用 jQuery 获取和设置元素的宽高、坐标，理解 offset 与 position 的区别

## 一、测试页面结构

```html
<style>
    *{ margin: 0; }
    div{
        width: 400px; height: 400px;
        margin: 100px;
        background-color: aqua;
        padding: 100px;
        position: relative;
    }
    p{
        width: 100px; height: 100px;
        background-color: red;
    }
</style>

<body>
    <div>
        <p></p>
    </div>
    <div></div>
</body>
```

```
┌─────────────────────────────┐
│  margin:100px               │
│  ┌───────────────────────┐  │
│  │  padding:100px        │  │
│  │  ┌─────────────────┐  │  │
│  │  │   p (100x100)   │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

## 二、获取宽高：width() / height()

```javascript
// width() 获取第一个标签的宽度（不含 padding 和 border）
console.log( $("body div").width() )    // 400

// height() 获取第一个标签的高度
console.log( $("body div").height() )   // 400
```

> **注意**：`$("body div")` 匹配到多个 div，`width()` 只获取**第一个**元素的宽度。

### jQuery 尺寸方法对比

| 方法 | 含义 | 示例值 |
|------|------|--------|
| `width()` | 内容区宽度 | 400 |
| `innerWidth()` | 内容区 + padding | 600 |
| `outerWidth()` | 内容区 + padding + border | 600 |
| `outerWidth(true)` | 内容区 + padding + border + margin | 800 |

```
┌─ margin ──────────────────────────────┐
│ ┌─ border ──────────────────────────┐ │
│ │ ┌─ padding ─────────────────────┐ │ │
│ │ │                               │ │ │
│ │ │     width() / height()        │ │ │
│ │ │     (内容区)                   │ │ │
│ │ │                               │ │ │
│ │ └───────────────────────────────┘ │ │
│ │        innerWidth()               │ │
│ └───────────────────────────────────┘ │
│          outerWidth()                  │
└───────────────────────────────────────┘
          outerWidth(true)
```

### 设置宽高

```javascript
$("div").width(500)     // 设置宽度为 500px
$("div").height("50%")  // 也支持字符串
```

## 三、获取坐标：offset()

```javascript
// offset() 获取标签在网页(html文档)上的坐标
// 返回一个对象，包含 left 和 top 属性
console.log( $("p").offset().left )  // p 相对于文档的 left
console.log( $("p").offset().top )   // p 相对于文档的 top
```

> `offset()` 始终参照**整个 HTML 文档**，无论元素是否定位、父元素是谁。

## 四、获取坐标：position()

```javascript
// position() 获取相对于最近定位父元素的坐标
// 返回对象，包含 left 和 top
console.log( $("p").position().left )
console.log( $("p").position().top )
```

> `position()` 参照的是**最近的定位祖先元素**（如 `position: relative` 的 div）。

## 五、offset() 与 position() 的区别

```
html 文档
┌────────────────────────────────────────┐
│                                        │
│   div (position:relative, margin:100)  │
│   ┌────────────────────────────────┐   │
│   │  A ────────────────────────    │   │
│   │  ┌──────────┐                  │   │
│   │  │    p     │ ← B              │   │
│   │  └──────────┘                  │   │
│   │                                │   │
│   └────────────────────────────────┘   │
│                                        │
└────────────────────────────────────────┘

A = p.offset().left      → 相对于文档左边距（包含 div 的 margin + padding）
B = p.position().left    → 相对于 div（定位父元素）的左边距（只有 padding）
```

| 对比项 | offset() | position() |
|--------|----------|------------|
| 参照物 | HTML 文档 | 最近的定位祖先元素 |
| 受 margin 影响 | 是 | 否 |
| 可设置 | 可以 `offset({left:100, top:50})` | 只能读取 |
| 适用场景 | 元素在页面中的绝对位置 | 元素在容器内的相对位置 |

## 六、滚动位置：scrollTop() / scrollLeft()

```javascript
// 获取垂直滚动距离
$(window).scrollTop()

// 获取水平滚动距离
$(window).scrollLeft()

// 设置滚动位置（常用于回到顶部）
$(window).scrollTop(0)  // 滚动到顶部
```

## 七、总结

| 方法 | 说明 |
|------|------|
| `width()` / `height()` | 获取/设置内容区宽高 |
| `innerWidth()` / `innerHeight()` | 含 padding 的宽高 |
| `outerWidth()` / `outerHeight()` | 含 padding + border 的宽高 |
| `offset()` | 相对于文档的坐标，返回 `{left, top}` |
| `position()` | 相对于定位父元素的坐标，返回 `{left, top}` |
| `scrollTop()` / `scrollLeft()` | 获取/设置滚动距离 |