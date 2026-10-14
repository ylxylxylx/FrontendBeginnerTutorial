# jQuery属性样式操作

> jQuery 提供 css() 操作行内样式、attr() 操作标签属性、addClass 系列操作 class，三大类 API 各司其职

## 一、style 样式操作：css()

### 1. 设置单个样式

```javascript
// css(属性名, 属性值)  两个参数：设置样式
$("h1").css("color", "red");

// 属性名由多个单词组成时，可以用 css 原生的 - 连接，也可以用小驼峰
$("h1").css("backgroundColor", "gray");  // 小驼峰
$("h1").css("border-radius", "20px");    // 中划线
```

### 2. 设置多个样式（对象形式）

```javascript
// css() 参数可以是一个对象，一次设置多个样式
$("h1").css({
    color: "blue",
    border: "3px solid red",
    fontSize: "15px",
    "font-weight": "normal"   // 带中划线的属性名要加引号
});
```

### 3. 获取样式

```javascript
// css() 只传一个参数（属性名）时，是获取样式值
var color = $("h1").css("color");
console.log(color);  // "rgb(0, 0, 255)"
```

| 用法 | 参数 | 作用 |
|------|------|------|
| 设置单个 | `css("color", "red")` | 设置一个样式 |
| 设置多个 | `css({color:"red", ...})` | 一次设置多个样式 |
| 获取 | `css("color")` | 获取样式值 |

## 二、属性操作：attr()

```javascript
// attr(属性名, 属性值)  两个参数：设置/修改属性
$("h1").attr("id", "h0");

// attr(属性名)  一个参数：获取属性值
console.log($("h1").eq(1).attr("name"));  // "老二"
```

```
attr() 与原生 setAttribute / getAttribute 对应:

  $("h1").attr("id", "h0")              ≈  h1.setAttribute("id", "h0")
  $("h1").eq(1).attr("name")            ≈  h1.getAttribute("name")
```

> **延伸**：jQuery 中还有 `prop()` 方法用于操作布尔属性（如 checked、disabled），`attr()` 适合操作自定义属性和普通属性。

## 三、class 属性操作

```javascript
// addClass() 添加 class
$("h1").eq(2).addClass("active");

// removeClass() 移除 class
$("h1").eq(2).removeClass("active");

// hasClass() 判断 class 是否存在，返回布尔值
var bool = $("h1").eq(2).hasClass("active");
console.log(bool);  // false

// toggleClass() 开关 class：有则删除，无则添加
$("h1").eq(2).toggleClass("active");
```

### toggleClass 开关逻辑

```
toggleClass("active") 的判断:

  标签当前有 active  ──→  移除 active
  标签当前无 active  ──→  添加 active

常用于: 菜单高亮切换、按钮选中/取消选中
```

| 方法 | 作用 | 返回值 |
|------|------|--------|
| addClass("c") | 添加 class | jQuery 对象 |
| removeClass("c") | 移除 class | jQuery 对象 |
| hasClass("c") | 判断是否存在 | true / false |
| toggleClass("c") | 有则删无则加 | jQuery 对象 |

> **注意**：jQuery 的 class 方法不需要在类名前加点（`.active`），直接写类名（`active`）即可，和原生 `classList` 用法一致。

## 四、三类操作对比

| 类别 | 方法 | 对应原生写法 |
|------|------|--------------|
| 行内样式 | css() | element.style.xxx |
| 标签属性 | attr() | setAttribute / getAttribute |
| class属性 | addClass / removeClass / hasClass / toggleClass | classList.add / remove / contains / toggle |

## 五、总结

| 要点 | 说明 |
|------|------|
| css() 设置 | 两个参数设单个，对象参数设多个 |
| css() 命名 | 小驼峰 `backgroundColor` 或中划线 `border-radius` 均可 |
| css() 获取 | 只传属性名一个参数 |
| attr() | 一个参数获取属性，两个参数设置属性 |
| addClass() | 添加 class，不需要加点 |
| removeClass() | 移除 class |
| hasClass() | 判断 class 是否存在，返回布尔值 |
| toggleClass() | 开关 class，有则删无则加 |