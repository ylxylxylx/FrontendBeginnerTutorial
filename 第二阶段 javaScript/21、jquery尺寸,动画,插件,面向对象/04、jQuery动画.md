# jQuery 动画

> jQuery 内置的显示隐藏、淡入淡出、滑动和自定义动画方法

## 一、动画方法总览

```
jQuery 动画方法:
  ├─ show() / hide() / toggle()        → 显示隐藏（带缩放+透明度变化）
  ├─ fadeIn() / fadeOut() / fadeToggle() → 淡入淡出
  ├─ slideUp() / slideDown() / slideToggle() → 滑动展开收起
  ├─ animate()                          → 自定义动画
  └─ stop()                             → 停止动画
```

## 二、基础页面

```html
<style>
    div{
        width: 100px;
        height: 100px;
        background-color: aqua;
        border: 2px solid;
    }
</style>

<body>
    <button>显示</button>
    <button>隐藏</button>
    <div></div>
</body>
```

## 三、显示与隐藏：show() / hide() / toggle()

```javascript
// hide() 隐藏元素，带动画效果（宽度、高度、透明度同时缩小到0）
$("button").eq(1).click(function(){
    $("div").hide(1000)  // 1000ms 内完成隐藏
})

// show() 显示元素
$("button").eq(0).click(function(){
    $("div").show(1000)  // 1000ms 内完成显示
})

// toggle() 切换显示/隐藏状态
$("div").toggle(1000)
```

### 速度参数

| 写法 | 说明 |
|------|------|
| `"slow"` | 600ms |
| `"fast"` | 200ms |
| 数字 `1000` | 自定义毫秒数 |
| 不传参 | 默认 400ms |

## 四、淡入淡出：fadeIn() / fadeOut() / fadeToggle()

```javascript
// fadeOut() 淡出（透明度从1变0，然后隐藏）
$("div").fadeOut(1000)

// fadeIn() 淡入（先显示，透明度从0变1）
$("div").fadeIn(1000)

// fadeToggle() 切换淡入/淡出
$("div").fadeToggle(1000)

// fadeTo() 淡化到指定透明度（不会隐藏元素）
$("div").fadeTo(1000, 0.5)  // 1秒内透明度变为0.5
```

```
fadeOut:  opacity 1 ──→ 0   (然后 display:none)
fadeIn:   display:block, opacity 0 ──→ 1
fadeTo:   opacity ──→ 指定值 (元素仍然显示)
```

## 五、滑动：slideUp() / slideDown() / slideToggle()

```javascript
// slideUp() 向上收起（高度变为0，然后隐藏）
$("div").slideUp(1000)

// slideDown() 向下展开
$("div").slideDown(1000)

// slideToggle() 切换展开/收起
$("div").slideToggle(1000)
```

```
slideUp:    ┌────┐         (高度收缩)
            │    │  ──→  ━━━━━━  display:none

slideDown:  ━━━━━━  ──→  ┌────┐  (高度展开)
                           │    │
```

## 六、自定义动画：animate()

```javascript
// animate(样式对象, 动画时长, 缓动方式, 回调函数)
$("div").animate({
    width: "300px",
    height: "300px",
    left: "100px",
    opacity: 0.5
}, 1000)
```

### 语法说明

```javascript
$(selector).animate(params, speed, easing, callback)
```

| 参数 | 说明 |
|------|------|
| params | 要变化的 CSS 样式对象（键值对） |
| speed | 动画时长：`"slow"` / `"fast"` / 毫秒数 |
| easing | 缓动方式：`"swing"`（默认，摇摆） / `"linear"`（匀速） |
| callback | 动画完成后执行的回调函数 |

### 链式调用（动画队列）

```javascript
// 多个 animate 依次排队执行
$("div")
    .animate({"width": "300px"}, 1000)
    .animate({"height": "300px"}, 1000)
    .animate({"left": "200px"}, 1000)
    .animate({"opacity": 0.5}, 1000)
```

```
动画队列:
  animate1 ──→ animate2 ──→ animate3 ──→ animate4
  (宽300)      (高300)      (left200)    (透明度0.5)
  |← 1000ms →|← 1000ms →|← 1000ms →|← 1000ms →|
```

### 增量动画

```javascript
// 在当前值基础上增减（字符串写法）
$("div").animate({"left": "+=100px"})  // left 增加100
$("div").animate({"width": "-=50px"})  // width 减少50
```

### animate 的限制

> `animate()` 只支持**数值型**样式属性（如 width、height、left、opacity），不支持颜色、transform 等非数值属性。颜色动画需要引入插件。

```javascript
// ✗ 无效：animate 不支持颜色
$("div").animate({"background-color": "red"})

// ✓ 有效：颜色需用 css 瞬间切换，或引入颜色动画插件
$("div").css("background-color", "red")
```

## 七、停止动画：stop()

```javascript
// stop() 停止当前动画，后续队列中的动画继续执行
$("div").stop()

// stop(true) 清空动画队列，所有动画都停止
$("div").stop(true)

// stop(true, true) 清空队列 + 立即跳到当前动画终点
$("div").stop(true, true)
```

| 参数 | 说明 |
|------|------|
| `stop()` | 停止当前动画，后续动画继续 |
| `stop(true)` | 停止当前动画 + 清空队列 |
| `stop(true, true)` | 停止 + 清空 + 跳到终点 |

### 防止动画累积

```javascript
// 问题：快速多次触发动画，动画会在队列中累积
// 方案：触发前先 stop() 停止之前的动画
$("div").stop().slideToggle(500)
```

```
无 stop:  触发1 → 触发2 → 触发3 → 动画1 → 动画2 → 动画3 (累积执行，卡顿)
有 stop:  触发1 → 触发2 → 触发3 → 动画3 (只执行最后一次)
```

## 八、回调函数

```javascript
// 在动画完成后执行回调
$("div").hide(1000, function(){
    console.log("隐藏完成")
})

$("div").animate({"width": "300px"}, 1000, function(){
    alert("动画结束")
})
```

## 九、总结

| 方法 | 效果 | 说明 |
|------|------|------|
| `show()` / `hide()` | 缩放+透明度变化 | 显示/隐藏 |
| `fadeIn()` / `fadeOut()` | 透明度变化 | 淡入/淡出 |
| `slideUp()` / `slideDown()` | 高度变化 | 收起/展开 |
| `animate()` | 自定义样式变化 | 只支持数值型属性 |
| `stop()` | 停止动画 | 防止动画累积 |
| `toggle()` / `fadeToggle()` / `slideToggle()` | 切换状态 | 自动判断当前状态 |

> **注意**：jQuery 动画本质是通过定时器不断修改 CSS 样式实现的，性能不如 CSS3 的 transition/animation。简单动画优先用 CSS3，复杂交互逻辑才用 jQuery 动画。