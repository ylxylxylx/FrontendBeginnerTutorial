# CSS 帧动画

> 本节学习 CSS 关键帧动画（animation），按照一定时间来控制动画样式的改变。

## 帧动画概述

帧动画：关键帧动画，按照一定时间来控制动画样式的改变。与过渡动画不同，帧动画不需要触发条件就能自动播放。

## animation 属性

### 各个子属性

```css
/* 设置动画的名字 */
animation-name: move;

/* 设置动画的时间 */
animation-duration: 3s;

/* 设置动画的速度类型 */
animation-timing-function: linear;

/* 设置动画次数：默认1次，infinite 无限次 */
animation-iteration-count: 1;
animation-iteration-count: infinite;

/* 设置动画方向：normal 正常；alternate 正常方向和反向交替 */
animation-direction: alternate;

/* 设置动画结束时的状态 */
animation-fill-mode: forwards;

/* 设置动画播放状态：paused 暂停；running 播放 */
animation-play-state: paused;
animation-play-state: running;

/* 设置动画的延迟时间 */
/* 负值：没有让动画提前开始运行，只是改变了动画开始的位置 */
animation-delay: -1s;
```

### 综合写法

```css
/* animation: name duration timing-function delay iteration-count direction fill-mode; */
animation: move 1s linear forwards;
animation: move 3s linear infinite alternate;
```

## @keyframes — 关键帧

关键帧可以控制动画每一帧的效果，通过设置不同的百分比，对应不同的样式：

```css
@keyframes move {
    0% {
        /* 开始状态一般要和元素初始样式保持一致 */
        left: 100px;
    }
    30% {
        left: 300px;
    }
    60% {
        left: 380px;
    }
    100% {
        /* 结束状态 */
        left: 400px;
    }
}
```

### from/to 写法

```css
@keyframes move {
    /* 动画开始的状态，相当于 0% */
    from {
        left: 100px;
    }
    /* 动画结束的状态，相当于 100% */
    to {
        left: 400px;
    }
}
```

## 完整示例

```css
div {
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    top: 100px;
    left: 100px;

    /* 综合写法 */
    animation: move 1s linear forwards;
}

@keyframes move {
    0% {
        left: 100px;
    }
    100% {
        left: 400px;
    }
}
```

## JS 控制动画播放/暂停

```javascript
var div = document.querySelector('div');

function play(ev) {
    div.style.animationPlayState = 'paused';
    ev.innerHTML = '开始';
}
```

## 过渡动画 vs 帧动画

| 特性 | 过渡动画 (transition) | 帧动画 (animation) |
|------|----------------------|-------------------|
| 触发条件 | 需要 `:hover`、`:active` 等触发 | 不需要触发条件，自动播放 |
| 动画状态 | 只有一组：开始→结束 | 可以设置每一帧的动画状态 |
| 复杂度 | 适合简单动画 | 适合复杂动画效果 |
| 循环播放 | 不支持 | 支持 `infinite` |
| 控制方式 | CSS 控制 | CSS + JS 控制 |

## animation-fill-mode 说明

| 值 | 说明 |
|------|------|
| `none` | 默认值，动画结束后回到初始状态 |
| `forwards` | 动画结束后保持在最后一帧的状态 |
| `backwards` | 动画开始前应用第一帧的样式 |
| `both` | 同时应用 forwards 和 backwards |