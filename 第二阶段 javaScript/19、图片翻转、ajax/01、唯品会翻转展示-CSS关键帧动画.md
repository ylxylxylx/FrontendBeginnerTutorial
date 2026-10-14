# 唯品会翻转展示 — CSS关键帧动画实现

> 使用纯CSS的@keyframes关键帧动画实现两张图片的来回翻转切换效果

## 一、效果说明

两张图片（正面/反面）在同一位置重叠，来回切换显示，切换时带有绕Y轴旋转的过渡动画。

```
图A显示(2s) → 图A旋转隐藏(0.5s) → 图B旋转显示(0.5s) → 图B显示(2s) → 图B旋转隐藏(0.5s) → 图A旋转显示(0.5s) → 循环...
```

## 二、动画流程拆解

一次完整循环共 **6秒**，拆分为6个步骤：

| 步骤 | 图A（正面） | 图B（反面） | 时长 |
|------|------------|------------|------|
| 1 | 显示状态 | 隐藏状态 | 2s |
| 2 | 旋转隐藏 | 隐藏状态 | 0.5s |
| 3 | 隐藏状态 | 旋转显示 | 0.5s |
| 4 | 隐藏状态 | 显示状态 | 2s |
| 5 | 隐藏状态 | 旋转隐藏 | 0.5s |
| 6 | 旋转显示 | 隐藏状态 | 0.5s |

## 三、核心原理

```
隐藏图片的方法: transform: rotateY(90deg)
  → 图片绕Y轴旋转90度，相当于"侧立"对着屏幕
  → 从正面看宽度为0，视觉上消失

配合 opacity: 0 确保彻底不可见
```

## 四、实现思路

```
两张图执行同一个动画，但第二张图延迟3秒（半个周期）开始

图A动画: 0s ──── 显示 ──── 隐藏 ──── 显示 ──── 6s循环
图B动画:      3s ──── 隐藏 ──── 显示 ──── 隐藏 ──── 6s循环

change1的0%~50% 和 change2的50%~100% 完全一样
change1的50%~100% 和 change2的0%~50% 完全一样
→ 两个动画刚好相反
→ div1执行到50%时，div2开始执行，则两个动画完美同步互补
```

## 五、完整代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>唯品会翻转</title>
    <style>
        section {
            width: 300px;
            height: 300px;
            position: relative;
        }
        div {
            width: 100%;
            height: 100%;
            border: 1px solid;
            position: absolute;   /* 两个div重叠在同一位置 */
        }
        img {
            width: 300px;
            height: 260px;
        }
        p {
            text-align: center;
            margin: 0;
            line-height: 30px;
            background-color: white;
        }

        /* 图A：立即开始，6s一个循环 */
        #div1 {
            animation: change1 6s linear infinite;
        }

        /* 图B：延迟3s开始，与图A刚好错开半个周期 */
        #div2 {
            animation: change1 6s linear 3s infinite;
        }

        /* 图A的显示隐藏流程动画 */
        @keyframes change1 {
            0%   { transform: rotateY(0deg);  opacity: 1; }  /* 图A显示状态 */
            30%  { transform: rotateY(0deg);  opacity: 1; }  /* 图A显示状态，即将开始隐藏 */
            40%  { transform: rotateY(90deg); opacity: 0; }  /* 图A已经完全隐藏 */
            50%  { transform: rotateY(90deg); opacity: 0; }  /* 图A保持隐藏状态 */
            80%  { transform: rotateY(90deg); opacity: 0; }  /* 图A保持隐藏状态 */
            90%  { transform: rotateY(90deg); opacity: 0; }  /* 图A隐藏状态，即将开始显示 */
            100% { transform: rotateY(0deg);  opacity: 1; }  /* 图A已经完全显示 */
        }
    </style>
</head>
<body>
    <section>
        <div id="div1">
            <img src="img/1.gif" alt="">
            <p>正面</p>
        </div>
        <div id="div2">
            <img src="img/2.gif" alt="">
            <p>反面</p>
        </div>
    </section>
</body>
</html>
```

## 六、关键点解析

### 1. animation属性参数

```
animation: change1 6s linear 3s infinite;
              │      │    │    │     │
              │      │    │    │     └── infinite: 无限循环
              │      │    │    └──────── 3s: 延迟3秒开始（关键！）
              │      │    └───────────── linear: 匀速
              │      └────────────────── 6s: 一个循环的时长
              └────────────────────────── change1: 动画名称
```

### 2. 为什么div2延迟3s就能和div1互补？

```
一个循环6s，50%的位置就是3s

div1在3s时: 动画执行到50%，正处于"隐藏"状态
div2在3s时: 动画刚开始，处于"显示"状态（0%位置）

之后两者始终一个显示一个隐藏，完美互补
```

### 3. 关键帧百分比对应的时间

```
6s循环中:
  0%~30%  (0s~1.8s)  → 保持显示
  30%~40% (1.8s~2.4s) → 旋转隐藏
  40%~90% (2.4s~5.4s) → 保持隐藏
  90%~100%(5.4s~6s)   → 旋转显示
```

## 七、总结

| 要点 | 说明 |
|------|------|
| 隐藏方式 | `rotateY(90deg)` + `opacity: 0` |
| 重叠布局 | `position: absolute` 让两个div重叠 |
| 同一动画 | 两张图用同一个 `@keyframes` |
| 错开时机 | 第二张图延迟半个周期（3s）开始 |
| 循环方式 | `infinite` 无限循环 |