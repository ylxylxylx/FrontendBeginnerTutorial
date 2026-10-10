# DOM 基本概念

> DOM（Document Object Model）是文档对象模型，本质上是操作 HTML 文档的 API。它把整个页面映射为一棵有层次结构的节点树，使 JavaScript 能对页面元素进行增删改查。

## 一、什么是 DOM

- **DOM**：Document Object Model，文档对象模型
- DOM 是用于 HTML 的应用程序编程接口（API）
- DOM 把整个页面映射为一个有层次结构的 **DOM 节点树**
- 借助 DOM 提供的 API，可以对 DOM 节点进行**增删改查**

### 节点树结构

```
document
  └── html（根节点）
        ├── head
        │     ├── meta
        │     ├── title
        │     └── style
        └── body
              ├── div
              ├── p
              └── ...
```

> HTML 整个文档的根就是 `<html>` 标签，它是整个节点树的**根节点**。

## 二、节点类型

HTML 文档中所有的事物都是 DOM 节点，主要分为以下类型：

| 节点类型 | 说明 | 示例 |
|---------|------|------|
| 元素节点 | HTML 中的标签 | `<div>`、`<p>`、`<span>` |
| 属性节点 | 标签的属性 | `href`、`class`、`id` |
| 文本节点 | 标签内的文本内容 | 标签之间的文字 |
| 注释节点 | HTML 注释 | `<!-- 注释 -->` |
| 文档节点 | 文档本身 | `document` |

> 空格和换行也是一个节点，一般被划分为**文本节点**。

## 三、节点属性：nodeName、nodeType、nodeValue

### nodeName — 节点名称

| 节点类型 | nodeName 值 |
|---------|------------|
| 元素节点 | 元素名称（**大写**），如 `DIV`、`P` |
| 属性节点 | 属性名，如 `class`、`id` |
| 文本节点 | `#text` |
| 注释节点 | `#comment` |
| 文档节点 | `#document` |

### nodeType — 节点类型编号

| 节点类型 | nodeType 值 | 对应常量 |
|---------|:-----------:|---------|
| 元素节点 | 1 | `Node.ELEMENT_NODE` |
| 属性节点 | 2 | `Node.ATTRIBUTE_NODE` |
| 文本节点 | 3 | `Node.TEXT_NODE` |
| 注释节点 | 8 | `Node.COMMENT_NODE` |
| 文档节点 | 9 | `Node.DOCUMENT_NODE` |

### nodeValue — 节点值

| 节点类型 | nodeValue 值 |
|---------|-------------|
| 文本节点 | 包含文本内容 |
| 属性节点 | 包含属性值 |
| 元素节点 | **不可用**（返回 `null`） |
| 文档节点 | **不可用**（返回 `null`） |

> 元素节点和文档节点的 `nodeValue` 不可用，需要使用 `textContent` 来获取元素节点的内容。

## 四、document 文档对象

DOM 中最根本的对象是 `document`，表示文档对象。每个载入浏览器的 HTML 文档都会成为 `document` 对象。

```js
// 查看 document 对象的所有属性和方法
console.dir(document);

// 获取 html 标签（文档根元素）
console.dir(document.documentElement);

// 获取 body 标签
console.dir(document.body);

// 获取 head 标签
console.dir(document.head);

// 获取/设置页面标题
console.log(document.title);          // 获取标题
document.title = '通过js设置标题';     // 设置标题
```

---

**小结**

| 概念 | 说明 |
|------|------|
| DOM | 文档对象模型，操作 HTML 的 API |
| 节点树 | HTML 文档映射为层次结构的树 |
| 元素节点 | HTML 标签，nodeType = 1 |
| 属性节点 | 标签属性，nodeType = 2 |
| 文本节点 | 文本内容，nodeType = 3 |
| `document.documentElement` | 获取 `<html>` 根标签 |
| `document.body` | 获取 `<body>` 标签 |
| `document.head` | 获取 `<head>` 标签 |