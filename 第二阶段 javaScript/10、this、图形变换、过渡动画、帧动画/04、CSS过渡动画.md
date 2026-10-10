# CSS 过渡动画

> 本节学习 CSS 过渡动画（transition），将样式的改变展现出来，产生过渡效果。

## 过渡动画概述

过渡动画：将样式的改变展现出来，产生过渡效果。一般配合 `:hover` 或 `:active` 使用。

## 过渡属性

### transition-property — 设置过渡的属性

指定哪些属性需要过渡效果：

```css
/* 过渡单个属性 */
transition-property: transform;
transition-property: left;

/* 同时过渡多个属性 */
transition-property: transform, left;

/* 过渡所有可以过渡的属性 */
transition-property: all;
```

### transition-duration — 设置过渡的持续时间

```css
/* 单位是秒 */
transition-duration: 1s;
transition-duration: 0.5s;
```

### transition-timing-function — 设置过渡的速度类型

```css
/* 匀速 */
transition-timing-function: linear;

/* 默认值：先快后慢 */
transition-timing-function: ease;

/* 其他值：ease-in, ease-out, ease-in-out */
```

### transition-delay — 设置过渡的延迟时间

```css
/* 延迟1秒后开始过渡 */
transition-delay: 1s;
```

## 综合写法

```css
/* 综合写法：属性 时间 速度类型 延迟时间 */
transition: all 1s linear;
transition: transform 0.5s ease 0.2s;
```

## 使用示例

```css
.item {
    width: 100px;
    height: 100px;
    background-color: lightcoral;
    position: absolute;
    top: 200%;
    left: 0;
    border-radius: 5px;

    /* 在元素上添加过渡动画 */
    transition: all 1s linear;
}

/* 过渡一般是配合 :hover 或者 :active 使用 */
/* 把过渡具体效果写在这里 */
.box:hover .item {
    /* transform: translate(200px); */
    /* transform: scale(0.5); */
    /* background-color: lightseagreen; */
    top: 0;
}
```

## 过渡动画要点

1. **过渡效果写在触发条件中**：将具体的过渡效果写在 `:hover` 或 `:active` 中
2. **过渡声明写在元素本身**：`transition` 属性写在元素的默认样式中
3. **all 关键字**：`transition-property: all` 表示过渡所有可以过渡的属性
4. **可过渡的属性**：大部分有数值的属性都可以过渡，如 width、height、opacity、transform、left、top 等

## 常见过渡效果

```css
/* 平移过渡 */
transition: transform 1s linear;

/* 位置过渡 */
transition: left 0.5s ease;

/* 颜色过渡 */
transition: background-color 0.3s ease;

/* 多属性过渡 */
transition: all 0.5s ease;

/* 多属性分别设置 */
transition: transform 0.5s ease, opacity 0.3s ease;