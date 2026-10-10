# 发起AJAX请求

> 使用原生JS的XMLHttpRequest对象发起AJAX请求，实现页面无刷新的数据交互

## 一、AJAX请求4步法

```javascript
// 1. 创建XHR对象
var xhr = new XMLHttpRequest();

// 2. 设置请求方式和地址
xhr.open("get", "http://192.168.14.222:5000/news?username=" + username + "&password=" + password);

// 3. 发送请求
xhr.send();

// 4. 监听状态变化，获取响应
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        console.log(xhr.responseText);
    }
}
```

## 二、完整示例

```javascript
var form = document.querySelector("form");

form.onsubmit = function(e) {
    // 阻止表单的默认提交行为（否则页面会刷新）
    e.preventDefault();
    
    // 获取输入框数据
    var username = document.getElementById("name").value;
    var password = document.getElementById("pas").value;
    
    // 1. 创建XHR对象
    var xhr = new XMLHttpRequest();
    
    // 2. 设置请求方式和地址（GET方式数据拼在URL中）
    xhr.open("get", "http://192.168.14.222:5000/news?username=" + username + "&password=" + password);
    
    // 3. 发送请求
    xhr.send();
    
    // 4. 监听状态变化
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // 获取响应数据（字符串格式）
            console.log(xhr.responseText);
            
            // JSON解码：字符串 → JSON对象
            var jsonResult = JSON.parse(xhr.responseText);
            console.log(jsonResult);
            
            // JSON解析：从JSON中提取需要的数据
            var img = document.createElement("img");
            img.src = jsonResult.stories[0].images[0];
            document.body.appendChild(img);
        }
    }
}
```

## 三、readyState状态值

```
readyState表示AJAX请求的状态，从1变化到4:

值    状态              说明
──────────────────────────────────────────
0     UNSENT           XHR对象已创建，未调用open()
1     OPENED           已调用open()，未调用send()
2     HEADERS_RECEIVED 已调用send()，请求已发出
3     LOADING          正在接收响应数据
4     DONE             响应数据接收完成

只有readyState == 4时，才能安全地使用响应数据
```

### 状态变化流程

```
new XMLHttpRequest()     → readyState = 0
       ↓
xhr.open("get", url)     → readyState = 1
       ↓
xhr.send()               → readyState = 2
       ↓
开始接收数据              → readyState = 3
       ↓
数据接收完成              → readyState = 4  ← 可以处理数据了
```

## 四、e.preventDefault() — 阻止默认行为

```javascript
form.onsubmit = function(e) {
    e.preventDefault();  // 阻止表单默认提交
    
    // 如果不阻止默认行为:
    // 表单会自动提交 → 页面刷新 → JS代码中断
    // AJAX请求就无法完成
}
```

## 五、JSON数据处理

### JSON vs JS对象

| 区别 | JSON | JS对象 |
|------|------|--------|
| 变量 | 不能有变量 | 可以有变量 |
| 注释 | 不能有注释 | 可以有注释 |
| 属性名 | 必须加双引号 | 可以不加 |
| 函数 | 不能有函数 | 可以有函数 |
| 格式 | 严格，不能有多余逗号 | 宽松 |

### JSON示例

```json
{
    "username": "张三",
    "password": "123"
}
```

### JSON编码与解码

```javascript
// JSON解码：JSON字符串 → JS对象
var jsonResult = JSON.parse(xhr.responseText);

// JSON编码：JS对象 → JSON字符串
var jsonString = JSON.stringify(jsonResult);
```

### JSON解析：提取数据

```javascript
// 服务器返回的JSON数据结构:
{
    "stories": [
        {
            "title": "新闻标题",
            "images": ["http://xxx.jpg"]
        }
    ]
}

// JSON解析：从JSON中找到需要的数据并展示
var img = document.createElement("img");
img.src = jsonResult.stories[0].images[0];
document.body.appendChild(img);
```

## 六、GET请求 vs POST请求

### GET请求（数据在URL中）

```javascript
xhr.open("get", "url?username=" + username + "&password=" + password);
xhr.send();
```

### POST请求（数据在send中）

```javascript
xhr.open("post", "url");
// POST请求需要设置请求头
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send("username=" + username + "&password=" + password);
```

## 七、AJAX请求完整流程图

```
┌──────────────┐                          ┌──────────────┐
│   浏览器      │                          │   服务器      │
│              │                          │              │
│ 1.创建XHR    │                          │              │
│ 2.open()     │                          │              │
│ 3.send()     │ ──── 请求 ────────────→  │ 处理请求     │
│              │                          │ 查询数据     │
│ 4.readyState │ ←──── 响应 ────────────  │ 返回JSON     │
│   =4 时处理  │                          │              │
│ 5.JSON.parse │                          │              │
│ 6.渲染页面   │                          │              │
└──────────────┘                          └──────────────┘
```

## 八、关键API总结

| API | 说明 |
|-----|------|
| `new XMLHttpRequest()` | 创建XHR对象 |
| `xhr.open(method, url)` | 设置请求方式和地址 |
| `xhr.send()` | 发送请求 |
| `xhr.onreadystatechange` | 监听状态变化 |
| `xhr.readyState` | 请求状态值（0~4） |
| `xhr.responseText` | 服务器响应数据（字符串） |
| `JSON.parse()` | JSON字符串 → JS对象 |
| `JSON.stringify()` | JS对象 → JSON字符串 |
| `e.preventDefault()` | 阻止表单默认提交 |