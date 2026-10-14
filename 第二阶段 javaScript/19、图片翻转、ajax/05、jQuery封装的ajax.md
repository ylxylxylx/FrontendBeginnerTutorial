# jQuery封装的ajax

> 使用jQuery提供的三个API（$.get、$.post、$.ajax）简化AJAX请求的编写

## 一、jQuery AJAX概述

```
原生AJAX的繁琐之处:
  需要手动创建xhr对象、调用open()、send()、监听readyState、JSON.parse等

jQuery内部已经封装了:
  xhr创建、open()、send()、状态监听、JSON自动解码等操作

jQuery提供三个API:
  $.get()    → 发起GET请求
  $.post()   → 发起POST请求
  $.ajax()   → 自定义AJAX请求（功能最全）
```

## 二、$.get() — 发起GET请求

```javascript
function jqueryGet() {
    // $.get(); 使用jquery发起一个get请求，$表示jquery对象
    // 三个参数:
    //   1. 请求的url地址（不拼接参数）
    //   2. 请求携带的数据（对象结构，可以省略）
    //   3. 请求的回调函数（当请求完成readyState==4时调用）

    $.get("http://192.168.14.222:5000/register", {
        username: document.getElementById("name").value,
        password: document.getElementById("pas").value
    }, function (data) {
        // 回调函数的参数就是响应数据
        // jQuery内部已经自动解码json对象，无需手动JSON.parse
        console.log(data);
    });
}
```

### $.get() 参数说明

```
$.get(url, data, callback)
       │     │       │
       │     │       └── 回调函数: 请求完成时调用，参数data是响应数据
       │     └────────── 请求数据: 对象结构 {key: value}，自动拼接为 ?key=value
       └──────────────── url地址: 不需要手动拼接参数
```

## 三、$.post() — 发起POST请求

```javascript
function jqueryPost() {
    // $.post() 使用jQuery发起post请求
    $.post("http://192.168.14.222:5000/register", {
        userName: document.getElementById("name").value,
        password: document.getElementById("pas").value
    }, function (data) {
        console.log(data);
    });

    // jquery的post请求和get请求只有函数名不一样，参数和结构都一样
}
```

## 四、$.ajax() — 自定义AJAX请求

适用于有特殊要求的请求：自定义请求头、获取请求失败时的结果等。

```javascript
function jqueryAJAX() {
    // $.ajax() 可自定义ajax请求，参数是一个对象
    $.ajax({
        url: "http://192.168.14.222:5000/register",  // 请求路径，必选
        type: "post",                                // 请求类型，可选，默认get
        data: {                                      // 请求参数，可选
            userName: document.getElementById("name").value,
            password: document.getElementById("pas").value
        },
        headers: {                                   // 自定义请求头，可选
            "author": "刘亚彬"
        },
        dataType: "json",                            // 响应数据类型，可选
        success: function (data) {                   // 请求成功回调，一般必选
            console.log(data);
        },
        error: function () {                         // 请求失败回调，可选
            console.log("失败");
        },
        complete: function () {                      // 请求完成回调，可选
            console.log("请求完成，不管成功还是失败都会调用");
        }
    });
}
```

### $.ajax() 参数详解

| 参数 | 类型 | 必选 | 说明 |
|------|------|------|------|
| `url` | string | 必选 | 请求路径 |
| `type` | string | 可选 | 请求类型，默认get |
| `data` | object | 可选 | 请求参数 |
| `headers` | object | 可选 | 自定义请求头 |
| `dataType` | string | 可选 | 响应数据类型：`text`接收字符串，`json`接收JSON对象 |
| `success` | function | 一般必选 | 请求成功的回调函数 |
| `error` | function | 可选 | 请求失败的回调函数 |
| `complete` | function | 可选 | 请求完成的回调函数（无论成败都调用） |

### 三个回调函数的触发时机

```
请求成功:
  success() → complete()

请求失败:
  error()   → complete()

→ complete() 不管成功还是失败都会调用
→ 适合做"隐藏loading动画"等收尾工作
```

## 五、完整示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>jquery封装的ajax</title>
</head>
<body>
    <form>
        <label for="name">账号:</label>
        <input type="text" id="name">
        <br>
        <label for="pas">密码:</label>
        <input type="password" id="pas"> <br>
        <button onclick="jqueryGet()">jquery-get</button><br>
        <button onclick="jqueryPost()">jquery-post</button><br>
        <button onclick="jqueryAJAX()">jquery-ajax</button>
    </form>
</body>
<script src="./jquery.min.js"></script>
<script>
    // button点击会触发form的提交事件，需要阻止
    document.querySelector("form").onsubmit = function (e) {
        e.preventDefault();
    }

    function jqueryGet() { /* ... $.get() ... */ }
    function jqueryPost() { /* ... $.post() ... */ }
    function jqueryAJAX() { /* ... $.ajax() ... */ }
</script>
</html>
```

## 六、三个API对比

| API | 特点 | 适用场景 |
|-----|------|---------|
| `$.get()` | 简单快捷 | 简单的GET数据获取 |
| `$.post()` | 简单快捷 | 简单的POST数据提交 |
| `$.ajax()` | 功能最全 | 需自定义请求头、错误处理、完成回调等 |

## 七、jQuery AJAX vs 原生AJAX

| 对比项 | 原生AJAX | jQuery AJAX |
|--------|---------|-------------|
| 代码量 | 多（5步法） | 少（1个函数调用） |
| JSON处理 | 手动JSON.parse | 自动解码 |
| 错误处理 | 需手动判断状态 | error回调函数 |
| 请求头设置 | 手动setRequestHeader | headers参数 |
| 依赖 | 无 | 需引入jquery.min.js |

## 八、总结

```
jQuery提供三个API执行ajax:

  $.get(url, data, callback)      → 简单GET请求
  $.post(url, data, callback)     → 简单POST请求
  $.ajax({url, type, data, ...})  → 自定义请求（功能最全）

核心优势:
  → 封装了xhr创建、open、send、状态监听
  → 自动解码JSON响应数据
  → 统一的错误处理和完成回调
```