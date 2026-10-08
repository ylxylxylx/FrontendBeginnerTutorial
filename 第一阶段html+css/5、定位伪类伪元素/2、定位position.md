# 定位 position

> 本节学习 CSS 的 position 属性，掌握四种定位方式及其特点，理解"子绝父相"的经典用法。

## 四种定位方式

| 定位值 | 相谁来定位 | 是否脱离文档流 | 层级变化 | 说明 |
|--------|-----------|--------------|---------|------|
| static | 无 | 否 | 不变 | 默认值，按文档流正常排列 |
| relative | 相自身原位置 | 否 | 上调 | 不影响其他元素位置 |
| fixed | 相浏览器窗口 | 是 | 上调 | 固定在屏幕某位置 |
| absolute | 相最近非static祖先 | 是 | 上调 | 找不到则相对body |

## 详细说明

### static —  static 定位（默认）

- 所有元素的默认定位方式
- 按**文档流**正常排列
- `top`、`left`、`bottom`、`right` 属性**无效**

```css
div {
    position: static;  /* 默认值，可以不写 */
}
```

### relative — 相对定位

- 相对于**自身原来的位置**进行偏移
- **不脱离文档流**，原位置仍占空间
- 设置 `top`/`left` 后元素位移，但其他元素不受影响
- 层级上调（覆盖未定位元素）

```css
.box {
    position: relative;
    top: 10px;    /* 向下移动10px */
    left: 20px;   /* 向右移动20px */
}
```

### fixed — 固定定位

- 相相对于**浏览器窗口（可见区域）**定位
- **脱离文档流**，不占原位置
- 滚动页面时元素**固定不动**
- 层级上调

```css
.back-to-top {
    position: fixed;
    right: 20px;    /* 距离右边20px */
    bottom: 100px;  /* 距底部100px */
}
```

> 💡 常见应用：回到顶部按钮、固定导航栏、悬浮广告

### absolute — 绝对定位

- 相对于**最近的非 static 祖先元素**定位
- **脱离文档流**，不占原位置
- 如果所有祖先都是 static，则相对 body 定位
- 层级上调

```css
.parent {
    position: relative;  /* 父元素设相对定位 */
}

.child {
    position: absolute;  /* 子元素设绝对定位 */
    top: 10px;
    left: 20px;
}
```

## 子绝父相

> 这是定位中最常用的组合模式！

| 角色 | 定位方式 | 作用 |
|------|---------|------|
| 子元素 | absolute | 相父元素定位，脱离文档流 |
| 父元素 | relative | 为子元素提供定位参照，不脱离文档流 |

**为什么不用父元素也 absolute？**
- 父元素 absolute 也会脱离文档流，影响页面整体布局
- relative 保持父元素在文档流中，不影响其他元素

## z-index — 层级控制

- 只有**开启了定位**的元素（非 static）才能使用 z-index
- 值越大，层级越高，越在上层显示
- 默认值：auto（相当于 0）

```css
.box1 {
    position: relative;
    z-index: 1;  /* 较低 */
}

.box2 {
    position: relative;
    z-index: 10; /* 较高，覆盖 box1 */
}
```

> ⚠️ 没设置 position 的元素，z-index 无效！

## 没有 top/left 时

- 开启定位但不设置偏移值时，元素**按原来文档流位置**显示
- 但层级已上调，可覆盖未定位元素

## 速记口诀

> static 默认不定位，relative 自移留原地；
> fixed 固定看窗口，absolute 寻找非static祖先；
> 子绝父相最常用，z-index 只对定位有效；
> 无偏移值留原位，层级上调能覆盖。