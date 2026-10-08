# 案例：tooltip 提示框

> 本案例综合运用 visibility 和 :hover 伪类，实现鼠标悬浮时显示提示框的效果。

## 效果说明

鼠标悬浮到目标元素上时，出现一个黑色背景的提示框，框下方有一个三角形箭头指向目标元素。

## 知识点回顾

| 知识点 | 本案例应用 |
|--------|-----------|
| `visibility: hidden/visible` | 默认隐藏提示框，悬浮时显示 |
| `:hover` 伪类 | 鼠标悬浮触发显示 |
| CSS 三角形 | 用 border 实现提示框箭头 |
| `border-radius` | 提示框圆角效果 |

## 核心实现

### 提示框样式

```css
.hint {
    background-color: #000;      /* 黑色背景 */
    color: #fff;                 /* 白色文字 */
    border-radius: 5px;          /* 圆角 */
    padding: 5px 10px;
    visibility: hidden;          /* 默认隐藏 */
}
```

### CSS 三角形箭头

```css
.tri {
    width: 0;
    height: 0;
    border: 5px solid transparent;  /* 四边透明 */
    border-top-color: #000;         /* 上边框为黑色，形成向下的三角形 */
}
```

### 悬浮显示

```css
.hidden:hover {
    visibility: visible;  /* 鼠标悬浮时显示 */
}
```

## 完整结构

```html
<div class="hidden">
    鼠标悬浮看我
    <div class="hint">
        这是提示内容
        <div class="tri"></div>
    </div>
</div>
```

## 关键要点

1. **visibility 而非 display:none**：提示框隐藏时仍占位，避免页面抖动
2. **CSS 三角形原理**：宽高为0，border 透明，只给一边设颜色
3. **:hover 伪类**：父元素悬浮时控制子元素显示

> ⚠️ 用 `visibility` 隐藏的元素仍然占据文档流位置，适合这种需要平滑显示/隐藏的场景。

## 练习建议

- 尝试修改三角形的方向（向上、向左、向右）
- 给提示框添加渐入动画效果（transition）
- 改用 `display:none/block` 实现同样的效果，对比两种方式的差异