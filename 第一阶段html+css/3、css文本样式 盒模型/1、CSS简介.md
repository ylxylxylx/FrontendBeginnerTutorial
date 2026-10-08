# 1、CSS 简介

## 什么是 CSS？

**CSS** = **C**ascading **S**tyle **S**heets（层叠样式表）

- **HTML** 是人的骨骼 → 结构
- **CSS** 是人的外观 → 样式（颜色、大小、宽高、倾斜等）
- **JS** 是人的行为 → 控制 HTML 和 CSS

> CSS3 是 CSS 的第三个版本，新增了许多样式特性。

---

## 样式的基本语法

CSS 样式写在 `<style>` 标签中，基本格式：

```css
选择器 {
    样式名: 样式值;
    样式名: 样式值;
}
```

- **选择器**：定位到哪一个元素
- **样式**：颜色、大小、宽高、倾斜等

---

## 三种基本选择器

### 1. 元素选择器

选中**所有同名标签**：

```css
h1 {
    color: yellowgreen;
}

p {
    background-color: pink;
}
```

- 格式：`标签名 { 样式 }`
- 选中页面中所有该标签

### 2. ID 选择器

选中**唯一的一个元素**：

```css
#p1 {
    font-size: 20px;
}
```

- 格式：`#id名 { 样式 }`
- 一个网页中 `id` 必须唯一

```html
<p id="p1">噫吁嚱！危乎高哉！</p>
```

### 3. 类选择器

选中**所有同类名的元素**：

```css
.color_red {
    color: red;
    background-color: #fff;
}
```

- 格式：`.类名 { 样式 }`
- 一个元素可以添加**多个类**，用空格隔开
- 一个类也可以应用到**多个元素**

```html
<h2 class="color_red italic">作者 李白</h2>
<p class="color_red">尔来四万八千岁</p>
```

---

## 三种选择器对比

| 选择器 | 符号 | 选中范围 | 特点 |
|--------|------|----------|------|
| 元素选择器 | `标签名` | 所有同名标签 | 范围最广 |
| ID 选择器 | `#id名` | 唯一元素 | 页面中 id 唯一 |
| 类选择器 | `.类名` | 所有同类名元素 | 最常用，复用性强 |

---

## 完整示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CSS 简介</title>
    <style>
        /* 元素选择器 */
        h1 { color: yellowgreen; }
        p { background-color: pink; }

        /* ID 选择器 */
        #p1 { font-size: 20px; }

        /* 类选择器 */
        .color_red { color: red; background-color: #fff; }
    </style>
</head>
<body>
    <h1>蜀道难</h1>
    <h2 class="color_red">作者 李白</h2>
    <p id="p1">噫吁嚱！危乎高哉！</p>
    <p>蜀道之难 难于上青天</p>
    <p class="color_red">尔来四万八千岁 不与秦塞通人烟</p>
</body>
</html>
```

---

## 小结

```
CSS 选择器速记：
元素选择器最广泛，标签名直接写
ID 选择器 # 号前，页面唯一不重复
类选择器 . 点开头，复用性强最常用
样式写在花括号，名值冒号分号隔