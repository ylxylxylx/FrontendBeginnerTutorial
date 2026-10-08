# 案例：第二种 tooltip 实现

> 本案例使用 **定位 + visibility** 组合实现 tooltip 提示框，相比第一种方式，可以更精确地控制提示框的位置。

## 与第一种方式的区别

| 对比项 | 第一种方式 | 第二种方式（本案例） |
|--------|-----------|-------------------|
| 隐藏方式 | visibility: hidden | visibility: hidden |
| 定位方式 | 无（默认文档流） | position: relative + 偏移 |
| 位置控制 | 受文档流影响 | 可精确控制偏移位置 |
| 父元素触发 | 自身 :hover | 父元素 :hover 控制子元素 |

## 核心实现

### 隐藏的提示框

```css
#hidden {
    position: relative;
    top: -40px;           /* 向上偏移40px，浮在目标上方 */
    visibility: hidden;   /* 默认隐藏 */
}
```

### 父元素悬浮显示子元素

```css
.mrzhang:hover #hidden {
    visibility: visible;  /* 父元素悬浮时，子元素显示 */
}
```

## 完整结构

```html
<div class="mrzhang">
    鼠标悬浮看我
    <div id="hidden">
        这是提示内容
    </div>
</div>
```

## 关键要点

1. **position: relative**：让提示框脱离正常位置，可精确偏移
2. **top: -40px**：向上移动40px，使提示框出现在目标上方
3. **父元素 :hover 控制子元素**：`.mrzhang:hover #hidden` 选择器

> 💡 这种"父元素 hover 控制子元素"的模式非常常用，适合各种下拉菜单、提示框等场景。

## 扩展：用 absolute 定位

如果提示框需要脱离文档流（不占位），可以改用 absolute 定位：

```css
.parent {
    position: relative;  /* 父元素相对定位，作为定位参照 */
}

#hidden {
    position: absolute;  /* 绝对定位，脱离文档流 */
    top: -40px;
    left: 0;
    visibility: hidden;
}

.parent:hover #hidden {
    visibility: visible;
}
```

## 练习建议

- 修改 top/left 值，让提示框出现在不同方向（左侧、右侧、下方）
- 同时添加 CSS 三角形箭头
- 对比 visibility 方案和 display:none 方案的效果差异