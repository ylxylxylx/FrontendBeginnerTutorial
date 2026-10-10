# JSON数据格式

> JSON (JavaScript Object Notation) 是网络数据传输的主流格式，替代了早期的XML

## 一、什么是JSON

```
JSON: JavaScript Object Notation（JS对象表示法）
作用: 在浏览器和服务器之间传输数据
特点: 轻量级、易读写、易解析
```

## 二、JSON vs XML

### 同一数据的两种表示

**表单数据格式**：
```
username=张三&password=123
```

**JSON格式**：
```json
{
    "username": "张三",
    "password": "123"
}
```

**XML格式**：
```xml
<username>张三</username>
<password>123</password>
```

### 对比

| 对比项 | JSON | XML |
|--------|------|-----|
| 数据量 | 小 | 大（标签冗余） |
| 可读性 | 好 | 一般 |
| 解析速度 | 快 | 慢 |
| JS支持 | 原生支持 | 需要DOM解析 |
| 流行度 | 主流 | 逐渐淘汰 |

> JSON已完全替代XML成为网络数据传输的主流格式

## 三、JSON语法规则

### 5条严格规则

```
1. JSON中不能有变量
   ✗  var name = "张三"
   ✓  "name": "张三"

2. JSON中不能有注释
   ✗  // 这是注释
   ✗  /* 这是注释 */

3. JSON中所有的属性名都要加双引号
   ✗  {name: "张三"}
   ✓  {"name": "张三"}

4. JSON中不能出现函数，只能有数据
   ✗  {"say": function(){}}
   ✓  {"age": 18}

5. JSON中格式要求严格，不能有多余的逗号
   ✗  {"name": "张三",}
   ✓  {"name": "张三"}
```

## 四、JSON数据类型

### 支持的类型

```json
{
    "string": "字符串",
    "number": 123,
    "boolean": true,
    "null": null,
    "object": {
        "key": "value"
    },
    "array": [1, 2, 3]
}
```

### 不支持的类型

```
✗  undefined
✗  函数
✗  日期对象
✗  正则表达式
✗  注释
```

## 五、JSON编码与解码

### JSON解码：字符串 → JS对象

```javascript
// 服务器返回的是JSON字符串
var jsonString = '{"username":"张三","password":"123"}';

// JSON解码（解析）
var jsonObj = JSON.parse(jsonString);

// 现在可以像JS对象一样使用
console.log(jsonObj.username);  // "张三"
console.log(jsonObj.password);  // "123"
```

### JSON编码：JS对象 → 字符串

```javascript
var user = {
    username: "张三",
    password: "123"
};

// JSON编码（序列化）
var jsonString = JSON.stringify(user);

console.log(jsonString);
// '{"username":"张三","password":"123"}'
```

## 六、JSON解析：提取数据

```javascript
// 服务器返回的新闻数据
var responseText = '{
    "stories": [
        {
            "title": "今日头条",
            "images": ["http://img1.jpg", "http://img2.jpg"]
        },
        {
            "title": "热点新闻",
            "images": ["http://img3.jpg"]
        }
    ]
}';

// 1. JSON解码
var data = JSON.parse(responseText);

// 2. JSON解析：逐层提取需要的数据
var firstStory = data.stories[0];        // 第一条新闻
var title = firstStory.title;            // "今日头条"
var image = firstStory.images[0];        // "http://img1.jpg"

// 3. 渲染到页面
var img = document.createElement("img");
img.src = image;
document.body.appendChild(img);
```

## 七、test.json示例

```json
[
    {
        "username": "张三",
        "password": "123"
    },
    {
        "username": "李四",
        "password": "456"
    }
]
```

> JSON文件可以存储数组或对象，常见于配置文件和数据交换

## 八、JSON操作总结

| 操作 | 方法 | 说明 |
|------|------|------|
| 解码 | `JSON.parse(str)` | JSON字符串 → JS对象 |
| 编码 | `JSON.stringify(obj)` | JS对象 → JSON字符串 |
| 取值 | `obj.key` 或 `obj["key"]` | 访问对象属性 |
| 数组 | `arr[0]` | 访问数组元素 |