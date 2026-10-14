# jQuery实现DOM操作

> 用 jQuery 对 DOM 元素进行增、删、改、查，代码量比原生 JS 大幅减少

## 一、增（创建与追加）

### 1. 创建标签

```javascript
// $("h1") 表示【查找】h1标签
// $("<h1>") 表示【创建】h1标签（尖括号 = 创建）
console.log($("h1"));    // 查找页面中的 h1
console.log($("<h1>"));  // 创建一个新的 h1（还未放入页面）

// 创建后可以链式设置内容，再追加到页面
$("<h1>").text("标题").appendTo("body");
```

### 2. 四个追加方法

```javascript
// append()  向标签中【最后】追加内容（内容可以是文本或标签字符串）
$("body").append("<header>头部</header>");

// prepend() 向标签中【开头】追加内容
$("body").prepend("<nav>导航条</nav>");

// appendTo() 把一段内容追加到某个标签【结尾】（主语是内容）
$("<p>p1</p>").appendTo("body");

// prependTo() 把一段内容追加到某个标签【开头】（主语是内容）
$("<p>p2</p>").prependTo("body");
```

```
append / prepend 与 appendTo / prependTo 的区别:

  $("body").append("<p>")     →  主语是父标签，把内容追加进去
  $("<p>").appendTo("body")   →  主语是内容，把自己追加到父标签

  方向相反，效果相同，看谁当主语更顺口
```

| 方法 | 追加位置 | 主语 | 示例 |
|------|----------|------|------|
| append() | 内部最后 | 父标签 | `$("body").append("<p>")` |
| prepend() | 内部开头 | 父标签 | `$("body").prepend("<p>")` |
| appendTo() | 内部最后 | 内容 | `$("<p>").appendTo("body")` |
| prependTo() | 内部开头 | 内容 | `$("<p>").prependTo("body")` |

## 二、删（删除与清空）

```javascript
// remove() 删除 jQuery 对象中的所有标签（标签本身被移除）
$("p").remove();

// detach() 同样删除标签，但保留绑定的事件和数据（可重新插入恢复）
$("hr").detach();

// empty() 清空标签的内容（标签本身保留）
$("body").empty();
```

| 方法 | 作用 | 标签本身 | 内容 |
|------|------|----------|------|
| remove() | 删除标签 | 移除 | 移除 |
| detach() | 删除标签（保留事件） | 移除 | 移除 |
| empty() | 清空内容 | 保留 | 移除 |

## 三、改（修改内容）

```javascript
// text() 等同于 innerText，设置纯文本（标签会被转义显示）
$("body").text("<main>主页</main>");
// 页面显示: <main>主页</main>  （标签当文字显示）

// html() 等同于 innerHTML，设置带标签的内容（标签会被解析）
$("body").html("<main id='myMain'>主页</main><main>主页</main>");
// 页面显示: 两个 main 标签，内容为"主页"
```

## 四、查（查找与遍历）

### 1. 用选择器查找

```javascript
// 把 CSS 的样式选择器作为 $() 参数
var main = $("body #myMain");
console.log(main);  // jQuery 对象，找到的标签在其中
```

### 2. 从 jQuery 对象中取出标签

```javascript
// (一) 直接用索引取值 → 得到原生 DOM 元素
console.log($("main")[0]);          // 第1个 main 标签（原生 DOM）
$("main")[1].style.color = "red";   // 取出后用原生语法操作

// (二) eq() 通过索引取 → 得到新的 jQuery 对象
console.log($("main").eq(0));       // 包含第1个 main 的 jQuery 对象
$("main").eq(0).text("最新");       // 取出后继续用 jQuery 语法

// (三) toArray() 把 jQuery 对象转化成真正的数组
console.log($("main").toArray());   // [main, main]
```

```
索引取值 vs eq() 对比:

  $("main")[0]   → 原生 DOM 元素  → 只能用原生语法: .style.color
  $("main").eq(0) → jQuery 对象   → 只能用 jQuery 语法: .css("color")
```

### 3. 遍历 jQuery 对象

```javascript
// each() 循环 jQuery 对象，取出每个标签元素
$("main").each(function(index, item){
    console.log(index, item);  // index: 索引, item: 原生DOM元素
});

// 也可以转成数组后用 forEach
$("main").toArray().forEach(function(item, index){
    console.log(index, item);
});
```

> **特别注意参数顺序**：
> - 数组 `forEach`：第一个参数是**数据 item**，第二个参数是**索引 index**
> - jQuery `each`：第一个参数是**索引 index**，第二个参数是**数据 item**

| 方法 | 返回值 | 后续可用语法 |
|------|--------|--------------|
| `[索引]` | 原生 DOM 元素 | 原生 JS 语法 |
| `eq(索引)` | jQuery 对象 | jQuery 语法 |
| `toArray()` | 原生数组 | 数组方法 |
| `each(fn)` | jQuery 对象 | — |

## 五、总结

| 操作 | 方法 | 说明 |
|------|------|------|
| 创建 | `$("<h1>")` | 尖括号 = 创建标签 |
| 增 | append / prepend | 父标签为主语，追加到内部末尾/开头 |
| 增 | appendTo / prependTo | 内容为主语，追加到目标末尾/开头 |
| 删 | remove / detach | 删除标签本身（detach 保留事件） |
| 删 | empty | 清空内容，保留标签 |
| 改 | text() | 等同 innerText，纯文本 |
| 改 | html() | 等同 innerHTML，解析标签 |
| 查 | `$("选择器")` | 返回 jQuery 对象 |
| 取 | `[0]` / `eq(0)` | 原生元素 / jQuery 对象 |
| 遍历 | each(fn) | 参数顺序：index 在前，item 在后 |