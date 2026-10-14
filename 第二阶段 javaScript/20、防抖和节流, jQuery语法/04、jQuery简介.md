# jQuery简介

> jQuery是曾经最流行的JS库，口号"Write Less, Do More"，核心是用 `$` 函数获取标签并链式操作

## 一、jQuery是什么

```
jQuery = 一个封装了 DOM 操作的 JavaScript 函数库

作用:
  ① 简化 DOM 查找     →  $("div") 一行搞定
  ② 简化 DOM 操作     →  .text() .css() .attr() ...
  ③ 简化 事件绑定     →  .click() .on() ...
  ④ 简化 AJAX 请求    →  $.get() $.post() $.ajax()
  ⑤ 解决 兼容性问题   →  统一不同浏览器的 API 差异

引入方式: 在页面中通过 <script src="./jquery.min.js"></script> 引入
```

## 二、全局变量 $ 和 jQuery

```javascript
// jQuery 暴露出的全局变量有两个: $ 和 jQuery，都指向同一个函数
console.log($, jQuery);   // ƒ (a,b){...}  ƒ (a,b){...}
console.log($ === jQuery); // true

// 因为 $ 更短，所以日常使用 $ 即可
```

## 三、$() 函数与 jQuery 对象

`$` 本质是一个函数，调用 `$()` 返回一个 **jQuery 对象**。

```javascript
// 1. $() 无参数，返回一个空的 jQuery 对象
console.log($());   // jQuery.fn.init {}

// 2. $() 参数可以是【样式选择器】，返回包含这些标签的 jQuery 对象
console.log($("body"));       // 包含 body 标签的 jQuery 对象
console.log($("body div"));   // 包含 body 下所有 div 的 jQuery 对象

// 3. $() 参数也可以是【DOM 元素】
console.log($(document.body)); // 把原生 DOM 对象包装成 jQuery 对象
```

### jQuery 对象的结构特点

```
jQuery 对象:
  ① 本身是对象（拥有大量方法和属性）
  ② 结构类似数组（有顺序、有索引、有 length）

  $("body div")  →  jQuery对象 { 0: div, 1: div, 2: div, length: 3, ... }
                      索引: 0     索引: 1     索引: 2

注意: jQuery 对象 ≠ 原生 DOM 元素
      $("div")   → jQuery 对象，只能用 jQuery 的方法
      document.querySelector("div") → 原生 DOM 元素，只能用原生语法
```

## 四、jQuery 常用方法初体验

```javascript
// text() 设置标签内容（类似 innerText）
$("body div").text("你好");

// css() 设置样式（类似 style.xxx）
$("body div").css("color", "red");
```

## 五、链式调用

jQuery 的方法可以连续调用，一行代码完成多个操作：

```javascript
$("body div").css("color", "blue").css("fontSize", "20px").eq(1).css("color", "orange");
//  设置颜色为蓝色      设置字号20px        取第2个div    单独设为橙色
```

### 链式调用的原理（面试题）

```
面试题: jQuery 链式调用的原理是什么?

回答: jQuery 对象调用的每一个方法都有返回值，
      而且返回值都是一个 jQuery 对象，
      所以可以继续用返回值调用 jQuery 的方法，形成链式调用。
```

```javascript
// 拆解链式调用:
var result = $("body div").css("color", "blue");  // 返回 jQuery 对象
console.log(result);  // result ≈ $("body div")

result = result.css("fontSize", "20px");  // 相当于 $("body div").css("fontSize", "20px")

result = result.eq(1);  // 返回第2个div所在的 jQuery 对象

result.css("color", "orange");  // 设置返回值中第2个div的样式
```

```
链式调用原理图:

  $("div") ──→ .css() ──→ .css() ──→ .eq(1) ──→ .css()
     │           │           │           │           │
   jQuery对象  返回jQuery  返回jQuery  返回jQuery  返回jQuery
                                                          
  每一步的返回值都是 jQuery 对象 → 可以一直"点"下去
```

> **注意**：并非所有方法都返回相同的 jQuery 对象。`eq(1)` 返回的是只包含第2个元素的新 jQuery 对象，后续操作只影响这个元素。

## 六、总结

| 要点 | 说明 |
|------|------|
| 全局变量 | `$` 和 `jQuery` 是同一个函数 |
| `$()` 参数 | 样式选择器（`"div"`）或 DOM 元素（`document.body`） |
| 返回值 | jQuery 对象（类数组结构，有索引有 length） |
| jQuery对象 vs DOM | jQuery 对象只能用 jQuery 方法，DOM 元素只能用原生语法 |
| 链式调用 | 方法返回值都是 jQuery 对象，可连续调用 |
| 链式原理 | 每个方法都返回 jQuery 对象，所以能一直"点"下去 |