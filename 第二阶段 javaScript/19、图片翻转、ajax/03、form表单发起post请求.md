# form表单发起post请求

> 最原始的向服务器提交数据的方式：使用HTML form表单

## 一、基本用法

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>form-post</title>
</head>
<body>
    <!-- method 属性用于指定请求方式，默认get请求，可以改成post -->
    <form action="http://192.168.14.222:5000/register" method="POST">
        <label for="name">账号:</label>
        <input type="text" id="name">
        <br>
        <label for="pas">密码:</label>
        <input type="password" id="pas">
        <br>
        <input type="submit">
    </form>
</body>
</html>
```

## 二、form表单关键属性

### 1. action 属性

```
action: 指定表单提交的目标地址（服务器接口）

示例: action="http://192.168.14.222:5000/register"
      → 表单数据将提交到这个地址
```

### 2. method 属性

```
method: 指定请求方式

  GET（默认）: 数据拼接在URL中提交
       http://192.168.14.222:5000/register?userName=xxx&password=xxx

  POST: 数据放在请求体中提交（不在URL中显示）
```

### 3. input 类型

| type | 说明 |
|------|------|
| `text` | 普通文本输入框 |
| `password` | 密码输入框（输入内容显示为圆点） |
| `submit` | 提交按钮（点击触发表单提交） |

## 三、表单提交的流程

```
1. 用户填写账号密码
2. 点击 submit 提交按钮
3. 浏览器收集表单中所有 input 的数据
4. 按照 method 指定的方式，向 action 地址发起请求
5. 服务器接收数据，处理并返回响应
6. 浏览器接收响应 → 整个页面跳转/刷新展示结果
```

## 四、form表单提交的缺点

```
缺点: 表单提交会导致页面整体刷新/跳转

  → 用户体验差（页面白屏、丢失滚动位置等）
  → 无法只更新页面的某一部分
  → 无法在提交前对数据进行复杂处理

这就是 AJAX 诞生的原因:
  AJAX 可以在不刷新页面的前提下与服务器交换数据
```

## 五、总结

| 要点 | 说明 |
|------|------|
| action | 表单提交的目标地址 |
| method | 请求方式，默认GET，可改为POST |
| type="submit" | 点击后触发表单提交 |
| 数据传递 | GET在URL中，POST在请求体中 |
| 最大缺点 | 页面整体刷新，用户体验差 |
| 替代方案 | AJAX（下一节内容） |