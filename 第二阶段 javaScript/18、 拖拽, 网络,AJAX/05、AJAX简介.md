# AJAX简介

> AJAX = Asynchronous JavaScript And XML（异步的JavaScript和XML），是一种在不重新加载整个网页的情况下，与服务器交换数据并更新部分网页的技术

## 一、什么是AJAX

```
AJAX 不是一门新的编程语言，而是一种技术/方法

核心特点:
  通过在后台与服务器进行少量数据交换
  可以使网页实现异步更新
  在不重新加载整个网页的情况下，对网页的某部分进行更新
```

### 传统网页 vs AJAX

```
传统网页（不使用AJAX）:
  需要更新内容 → 必须重载整个网页页面
  用户体验差，等待时间长

AJAX网页:
  需要更新内容 → 只更新变化的部分
  用户体验好，页面无刷新
```

## 二、AJAX的核心：XMLHttpRequest

```
AJAX实现的核心是JS对象 XMLHttpRequest（简称XHR）

XHR: 浏览器提供的API
  通过调用这个对象的属性和方法，实现各种功能
  虽然名字中有xml，但数据格式不仅限于xml
  现在最常用的数据格式是JSON
```

## 三、同步与异步

### 同步（Synchronous）

```
同步: 只有一条执行线路（独木桥）
  代码从上向下依次执行
  上一句代码执行结束才会执行下一句
  如: 普通代码、alert()

  console.log(1);    → 先执行
  console.log(2);    → 后执行
  console.log(3);    → 最后执行
```

### 异步（Asynchronous）

```
异步: 有多条执行线路（多车道大桥）
  多句代码可能同时执行
  上一句代码执行结束不影响下一句执行
  如: 定时器、AJAX数据请求

  console.log(1);
  setTimeout(function(){ console.log(2); }, 1000);
  console.log(3);
  
  输出顺序: 1 → 3 → 2（2延迟1秒后执行）
```

## 四、AJAX请求 vs Form表单请求

| 对比项 | AJAX请求 | Form表单请求 |
|--------|----------|-------------|
| 默认方式 | 异步请求 | 同步请求 |
| 请求后 | 不影响网页正常操作 | 进入等待状态 |
| 响应结果 | 局部刷新网页 | 刷新整个网页 |
| 用户体验 | 无刷新，流畅 | 页面跳转，等待 |
| 实现方式 | XMLHttpRequest对象 | form标签submit |

## 五、为什么还叫AJAX

```
早期: 网页简单，数据量少，使用XML格式在浏览器和服务器之间传输
后来: 网页越来越复杂，数据量越来越大，改用JSON格式
现在: JSON已完全替代XML成为网络数据传输的主流格式

但是: AJAX这个名字被保留下来，并没有改成"AJAJ"
     (Asynchronous JavaScript And JSON)
```

## 六、AJAX请求的基本流程

```
1. 创建 XMLHttpRequest 对象
2. 设置请求方式和请求地址（open）
3. 发送请求（send）
4. 监听状态变化（onreadystatechange）
5. 状态为4时，处理响应数据

  浏览器                    服务器
    │                         │
    │── 1.创建XHR对象 ────────│
    │── 2.open(方式,地址) ────│
    │── 3.send() ───────────→│  发送请求
    │                         │  处理请求
    │←── 4.readyState变化 ───│  返回响应
    │── 5.readyState==4 ─────│  处理数据
    │                         │