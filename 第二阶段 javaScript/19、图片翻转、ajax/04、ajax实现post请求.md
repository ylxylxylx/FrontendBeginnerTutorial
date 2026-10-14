# ajax实现post请求

> 使用原生JS的XMLHttpRequest对象发起AJAX POST请求，实现页面无刷新的数据提交

## 一、AJAX POST请求五步法

```javascript
// 1. 创建xhr对象
var xhr = new XMLHttpRequest();

// 2. 设置请求方式和地址（post请求携带的数据不会拼接到url中）
xhr.open("post", "http://192.168.14.222:5000/register");

// 3. 设置请求的数据类型（设置为form表单类型，服务器才能正确接收数据）
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

// 4. 发送请求（post请求携带的数据在send函数的参数中）
xhr.send("userName=" + username + "&password=" + password);

// 5. 监听状态，获得响应
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        console.log(xhr.responseText);
    }
}
```

## 二、完整示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>form-post</title>
</head>
<body>
    <form>
        <label for="name">账号:</label>
        <input type="text" id="name">
        <br>
        <label for="pas">密码:</label>
        <input type="password" id="pas">
        <br>
        <input type="submit">
    </form>
</body>
<script>
    var form = document.querySelector("form");
    form.onsubmit = function (e) {
        // 阻止表单默认提交行为（否则页面会刷新跳转）
        e.preventDefault();

        var username = document.getElementById("name").value;
        var password = document.getElementById("pas").value;

        // 1. 创建xhr对象
        var xhr = new XMLHttpRequest();

        // 2. 设置请求方式和地址
        xhr.open("post", "http://192.168.14.222:5000/register");

        // 3. 设置请求的数据类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        // 4. 发送请求
        xhr.send("userName=" + username + "&password=" + password);

        // 5. 监听状态，获得响应
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                console.log(xhr.responseText);
                // JSON解码：字符串 → JS对象
                var jsonObj = JSON.parse(xhr.responseText);
                // 创建元素展示服务器返回的消息
                var h1 = document.createElement("h1");
                h1.innerText = jsonObj.message;
                document.body.appendChild(h1);
            }
        }
    }
</script>
</html>
```

## 三、POST请求与GET请求的代码差异

```
GET请求:
  xhr.open("get", "url?userName=xxx&password=xxx");  // 数据拼在URL
  xhr.send();                                          // send无参数

POST请求:
  xhr.open("post", "url");                            // URL不带数据
  xhr.setRequestHeader("Content-Type",
      "application/x-www-form-urlencoded");           // 必须设置请求头
  xhr.send("userName=xxx&password=xxx");              // 数据放在send参数中
```

## 四、HTTP请求与响应的结构

### 请求结构（浏览器 → 服务器）

```
┌─────────────────────────────────────────┐
│ 请求头: 请求地址、数据类型、浏览器信息等   │
│ 请求行: 请求数据协议、端口信息             │
│ 空行:   用于分隔请求行和请求体的空白行      │
│ 请求体: GET请求为空                       │
│         POST请求放携带的账号和密码         │
└─────────────────────────────────────────┘
```

### 响应结构（服务器 → 浏览器）

```
┌─────────────────────────────────────────┐
│ 响应头: 响应时间戳、响应数据类型、数据长度等│
│ 响应行: 响应状态码、服务器状态信息         │
│ 空行:   用于分隔响应行和响应体             │
│ 响应体: 服务器返回给客户端的响应数据       │
└─────────────────────────────────────────┘
```

## 五、GET与POST的区别

| 对比项 | GET | POST |
|--------|-----|------|
| 使用难度 | 简单方便 | 相对复杂，需手动设置请求头数据类型 |
| 数据位置 | 拼接在URL中 | 放在请求体中 |
| 安全性 | 数据暴露在URL中，不安全 | 相对安全，不易暴露敏感信息 |
| 数据大小 | 有限制，不能大于2KB | 没有限制 |

### GET与POST的使用场景

```
GET请求适用场景:
  → 仅仅是从服务器拿数据并展示
  → 不需要向服务器传递信息，或传递的信息少量且不敏感
  → 示例: 搜索、加载新闻列表、获取商品数据

POST请求适用场景:
  → 需要向服务器上传大量数据
  → 传递敏感信息
  → 示例: 文件上传、登录注册
```

## 六、关键点解析

### 1. e.preventDefault()

```javascript
form.onsubmit = function (e) {
    e.preventDefault();  // 阻止表单默认提交
    // 如果不阻止: 表单自动提交 → 页面刷新 → AJAX请求中断
}
```

### 2. setRequestHeader()

```javascript
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

// POST请求必须设置请求头的数据类型
// 告诉服务器: 请求体的数据格式是 "key=value&key=value"
// 如果不设置，服务器无法正确解析请求体中的数据
```

### 3. readyState == 4

```
readyState表示AJAX请求状态:
  0: XHR对象已创建，未调用open()
  1: 已调用open()，未调用send()
  2: 已调用send()，请求已发出
  3: 正在接收响应数据
  4: 响应数据接收完成  ← 只有==4时才能安全使用响应数据
```

### 4. JSON.parse()

```javascript
// 服务器返回的响应数据是JSON字符串
// 需要用JSON.parse()转换为JS对象才能访问属性
var jsonObj = JSON.parse(xhr.responseText);
console.log(jsonObj.message);  // 访问服务器返回的消息
```

## 七、总结

| 步骤 | API | 说明 |
|------|-----|------|
| 1 | `new XMLHttpRequest()` | 创建xhr对象 |
| 2 | `xhr.open("post", url)` | 设置请求方式和地址 |
| 3 | `xhr.setRequestHeader(...)` | 设置请求数据类型（POST必须） |
| 4 | `xhr.send("key=value&...")` | 发送请求，数据在参数中 |
| 5 | `xhr.onreadystatechange` | 监听状态，readyState==4时处理响应 |