# jQuery事件绑定

> jQuery 把常用事件封装成同名函数，用 on() 绑定所有事件，one() 只触发一次，off() 解除绑定

## 一、页面加载事件

```javascript
// js 原生页面加载完成事件
window.onload = function(){
    console.log("页面加载1");
}

// jQuery 中使用 load() 函数绑定 load 事件
$(window).load(function(){
    console.log("页面加载2");
});

// jQuery 中 ready() 函数也可以绑定加载事件
$(window).ready(function(){
    console.log("页面加载3");
});

// ready 绑定的简化写法（最常用！）
$(function(){
    console.log("页面加载4");
});
```

### 四种写法对比

| 写法 | 说明 |
|------|------|
| `window.onload = fn` | 原生写法，等所有资源（图片等）加载完 |
| `$(window).load(fn)` | jQuery 包装的 load 事件 |
| `$(window).ready(fn)` | DOM 加载完成即触发（不等图片） |
| `$(function(){})` | ready 的简化写法，**最常用** |

```
执行顺序:  $(function(){}) / ready  →  window.onload / load

ready:  DOM 结构解析完成就执行，不用等图片，速度更快
onload: 所有资源（含图片）都加载完才执行，速度较慢
```

> **注意**：新版 jQuery（1.8+）已废弃 `.load()` 和 `.ready()` 作为事件绑定的用法，推荐统一使用 `$(function(){})`。

## 二、普通事件绑定

jQuery 把常用事件封装成了同名函数，直接调用即可绑定：

```javascript
// click() 绑定点击事件
$("button").click(function(){
    // alert("点击了按钮")
});

// mouseover() 绑定鼠标移入事件
$("button").mouseover(function(){
    // alert("移入")
});
```

```
常用封装事件函数:

  click()      点击
  dblclick()   双击
  mouseover()  鼠标移入
  mouseout()   鼠标移出
  mousedown()  鼠标按下
  mouseup()    鼠标松开
  keydown()    键盘按下
  keyup()      键盘松开
  focus()      获得焦点
  blur()       失去焦点
  submit()     表单提交
  change()     内容改变
```

> **局限**：一些不常用的事件 jQuery 没有封装，比如 drag 拖拽事件，`$("button").drag(fn)` 会报错。这时需要用 `on()`。

## 三、on() 绑定所有事件

```javascript
// on() 可以绑定所有原生事件，类似于 addEventListener()
$("button").on("drag", function(){
    console.log("拖动");
});

// on() 可以多次绑定同一个事件，不会覆盖
$("button").on("click", function(){
    alert("点击按钮2");
});
$("button").on("click", function(){
    alert("点击按钮3");
});
// 点击按钮时，两个 alert 都会弹出
```

```
on() vs 普通事件函数 vs 原生赋值:

  $("btn").on("click", fn)     → 可多次绑定，不覆盖
  $("btn").click(fn)           → 本质也是 on，可多次绑定
  btn.onclick = fn             → 原生赋值，后写覆盖先写
```

## 四、one() 只触发一次

```javascript
// one() 绑定的事件只能触发一次，触发之后自动解除绑定
$("button").one("click", function(){
    alert("点击按钮1");  // 只有第一次点击弹窗，之后不再触发
});
```

```
click() vs one("click"):

  click(fn):  点击→执行  点击→执行  点击→执行 ...（一直有效）
  one("click"): 点击→执行→自动解绑  点击→无反应  点击→无反应
```

## 五、off() 解除绑定

```javascript
$("button").on("click", function(){
    alert("点击按钮2");
});

$("button").on("click", function(){
    alert("点击按钮3");

    console.log(this);  // this 是事件目标 button 标签

    // 解除 on 绑定的所有事件
    // $(this).off();

    // 只解除 click 事件的绑定，其他绑定的事件不影响
    $(this).off("click");
});
```

### off() 的三种用法

| 用法 | 作用 |
|------|------|
| `off()` | 解除所有事件绑定 |
| `off("click")` | 只解除 click 事件绑定 |
| `$(this).off()` | 解除当前触发事件元素的所有绑定 |

> **注意**：`off()` 只能解除通过 `on()` 绑定的事件，无法解除通过 `onclick = fn` 赋值方式绑定的事件。

## 六、事件中的 this

```javascript
$("button").on("click", function(){
    console.log(this);        // this 是事件目标 button 标签（原生 DOM）
    // $(this).off("click");  // 包装成 jQuery 对象后可用 jQuery 方法
});
```

```
事件函数中的 this:

  this          → 原生 DOM 元素（触发事件的那个标签）
  $(this)       → 把 this 包装成 jQuery 对象
  this.style    → 原生语法操作
  $(this).css() → jQuery 语法操作
```

## 七、总结

| 绑定方式 | 说明 | 特点 |
|----------|------|------|
| `$(function(){})` | 页面加载事件 | ready 简写，最常用 |
| `click(fn)` 等 | 常用事件封装函数 | 只支持常用事件 |
| `on("事件", fn)` | 绑定所有原生事件 | 类似 addEventListener，可多次绑定 |
| `one("事件", fn)` | 绑定一次性事件 | 触发一次后自动解绑 |
| `off("事件")` | 解除 on 绑定的事件 | 不传参解除所有 |
| `this` / `$(this)` | 事件目标元素 | 原生 DOM / jQuery 对象 |