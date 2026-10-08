# display 属性实现导航条效果

> 本案例使用 **定位 + display:none/block + :hover** 实现导航条悬浮下拉效果。

## 效果说明

鼠标悬浮到"登录"菜单项时，下方出现一个登录表单（姓名、密码），移开鼠标后表单消失。

## 知识点回顾

| 知识点 | 本案例应用 |
|--------|-----------|
| `float: left/right` | 导航项左右浮动排列 |
| `position: relative/absolute` | 下拉内容精确定位 |
| `display: none/block` | 默认隐藏，悬浮显示 |
| `:hover` 伪类 | 父元素悬浮控制子元素 |

## 核心实现

### 导航条布局

```css
li {
    list-style: none;   /* 去掉列表默认样式 */
}

.login {
    position: relative;  /* 相对定位，作为子元素定位参照 */
    float: left;         /* 左浮动 */
}

.regist {
    float: right;        /* 右浮动 */
}
```

### 下拉内容隐藏与显示

```css
/* 默认不显示 */
.message {
    position: absolute;   /* 绝对定位，脱离文档流 */
    left: 300px;          /* 水平偏移 */
    top: 200px;           /* 垂直偏移 */
    display: none;        /* 隐藏，不占文档流位置 */
}

/* 鼠标悬浮在 .login 上时，显示 .message */
.login:hover .message {
    display: block;       /* 显示 */
}
```

## 完整结构

```html
<div class="nav">
    <ul>
        <li class="login">登录
            <div class="message">
                姓名 <br>
                密码
            </div>
        </li>
        <li class="regist">注册</li>
    </ul>
</div>
```

## 关键要点

1. **子绝父相**：`.login` 设 `relative`，`.message` 设 `absolute`
2. **display:none**：隐藏时不占文档流位置（与 visibility:hidden 不同）
3. **父元素 hover 控制子元素**：`.login:hover .message` 选择器

## display:none vs visibility:hidden 对比

| 属性 | 隐藏时占位 | 适用场景 |
|------|-----------|---------|
| `display: none` | 不占位 | 下拉菜单、弹窗 |
| `visibility: hidden` | 占位 | tooltip 提示框 |

> 💡 导航条下拉菜单通常用 `display:none/block`，因为下拉内容不需要保留占位空间。

## 练习建议

- 给下拉内容添加边框和背景色
- 改用 `visibility:hidden/visible` 实现，观察占位差异
- 添加多个导航项，每个都有不同的下拉内容