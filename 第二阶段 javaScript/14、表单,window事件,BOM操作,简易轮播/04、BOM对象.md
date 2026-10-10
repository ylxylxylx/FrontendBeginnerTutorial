# BOM 对象

Browser Object Model（浏览器对象模型）：window、history、location、navigator。

---

## 一、DOM 与 BOM

| 概念 | 全称 | 对象 | 说明 |
|------|------|------|------|
| DOM | Document Object Model | `document` | 文档对象模型，JS 把 HTML 看作 document 对象 |
| BOM | Browser Object Model | `window` | 浏览器对象模型，JS 把浏览器窗口看作 window 对象 |
| API | Application Programming Interface | — | 编程接口，即变量、函数、对象、参数等 |

---

## 二、window 对象

### 2.1 全局变量和函数属于 window

```javascript
var count = 10;
window.count++;         // 11
console.log(window.count);

function add(a, b) {
    console.log(a + b);
}
window.add(3, 4);       // 7
```

- 全局作用域下定义的变量/函数都是 `window` 的属性/方法

### 2.2 原生 API 也是 window 的属性

```javascript
window.alert("警告");
window.console.log("打印");
window.prompt("请输入");
window.confirm("确认");
```

### 2.3 this 在全局指向 window

```javascript
this.count++;
this.add(5, 6);
this.alert("提示");
```

### 2.4 window 可省略

```javascript
count++;
console.log(innerHeight);
onresize = function () {
    console.log("窗口重置");
};
```

---

## 三、history 历史记录

```javascript
// 前进
history.forward();   // 跳转到下一页
history.go(1);       // 等价于 forward()

// 后退
history.back();      // 跳转到上一页
history.go(-1);      // 等价于 back()

// 跳转多页
history.go(-2);      // 前进两页
history.go(2);       // 后退两页

// 刷新
history.go(0);       // 刷新当前页
```

| 方法 | 说明 |
|------|------|
| `forward()` | 前进到下一页 |
| `back()` | 后退到上一页 |
| `go(n)` | n>0 前进 n 页，n<0 后退 n 页，n=0 刷新 |

> 注：前进/后退需要历史记录中有对应页面，否则无法跳转。

---

## 四、location 地址

```javascript
console.log(location);  // 地址信息对象

// 在当前窗口打开网页（有历史记录）
location.href = "http://www.baidu.com";

// 在当前窗口打开网页（无历史记录，不能后退）
location.replace("http://www.baidu.com");

// 刷新当前页
location.reload();
```

| 属性/方法 | 说明 |
|-----------|------|
| `location.href` | 当前网址（可赋值跳转，有历史记录） |
| `location.replace(url)` | 替换当前页（无历史记录） |
| `location.reload()` | 刷新当前页 |

### href vs replace

- `location.href = url`：跳转后可通过 `history.back()` 返回
- `location.replace(url)`：跳转后无法返回，历史记录被替换

### 在新窗口打开

```javascript
open("http://www.baidu.com");  // 新窗口打开
```

---

## 五、navigator 浏览器信息

```javascript
console.log(navigator.userAgent);

// 判断 PC 端或移动端
if (navigator.userAgent.includes("Android") ||
    navigator.userAgent.includes("iPhone")) {
    document.write("当前是移动端浏览器");
} else {
    document.write("当前是PC端浏览器");
}
```

### userAgent 示例

```
// PC 端 Firefox
Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:80.0) Gecko/20100101 Firefox/80.0

// Android
Mozilla/5.0 (Linux; Android 7.0; SM-G892A) ... Chrome/67.0 ... Mobile Safari/537.36

// iPhone
Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) ... Mobile/15A372 Safari/604.1
```

- 通过 `userAgent` 中是否包含 `Android` 或 `iPhone` 判断移动端

---

## 六、刷新页面的方式

```javascript
history.go(0);        // 方式一
location.reload();    // 方式二
```