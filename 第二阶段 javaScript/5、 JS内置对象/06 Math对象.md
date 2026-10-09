# JS内置对象 - Math 数学对象

Math 是一个内置对象，它拥有一些数学常数属性和数学函数方法。

## 一、常量

```javascript
console.log(Math.PI); // 3.141592653589793
```

## 二、取整方法

### floor() 向下取整

获取一个**小于等于**该数字的整数（地板，往小的取）：

```javascript
console.log(Math.floor(2.3));  // 2
console.log(Math.floor(-2.3)); // -3
```

### ceil() 向上取整

获取一个**大于等于**该数字的整数（天花板，往大的取）：

```javascript
console.log(Math.ceil(2.3));   // 3
console.log(Math.ceil(-2.3));  // -2
```

### round() 四舍五入

```javascript
console.log(Math.round(3.14));   // 3
console.log(Math.round(-3.64));  // -4
console.log(Math.round(-2.501)); // -3
```

## 三、最大值与最小值

```javascript
console.log(Math.max(2, 4, 6)); // 6
console.log(Math.min(4, 2, 6)); // 2
```

## 四、随机数

### 基本用法：[0, 1) 之间的随机数

```javascript
console.log(Math.random()); // 例如 0.523841...
```

### 进阶：获取指定范围的随机整数

**公式**：`Math.floor(Math.random() * 个数) + 最小值`

例如获取 [32, 68] 范围的随机整数：

```javascript
// Math.random() * 37 得到 [0, 37)
// 向下取整得到 [0, 36]
// 加上 32 得到 [32, 68]
console.log(Math.floor(Math.random() * 37) + 32);
```

> **推导**：范围 [min, max] 的个数为 `max - min + 1`，所以公式为：
> `Math.floor(Math.random() * (max - min + 1)) + min`

## 五、幂运算与开方

### pow() 幂运算

```javascript
console.log(Math.pow(2, 3));    // 8（2的3次方）
console.log(Math.pow(16, 0.5)); // 4（16的0.5次方 = 开平方）
```

### sqrt() 开平方

```javascript
console.log(Math.sqrt(9)); // 3
```

### 开立方

```javascript
console.log(Math.pow(8, 1/3)); // 2（8的1/3次方 = 开立方）
```

## 六、绝对值

```javascript
console.log(Math.abs('-5')); // 5（会先转为数字）
```

## 七、三角函数

```javascript
console.log(Math.sin(Math.PI / 3)); // 0.866（sin 60°）
console.log(Math.cos(Math.PI / 3)); // 0.5（cos 60°）
console.log(Math.tan(Math.PI / 4)); // 1（tan 45°）
```

> **注意**：三角函数的参数是**弧度**，不是度数。180° 的弧度是 π（`Math.PI`）。

## 总结

| 方法 | 说明 | 示例 |
|------|------|------|
| `Math.PI` | 圆周率 | 3.14159... |
| `Math.floor(x)` | 向下取整 | `floor(2.3)` → 2 |
| `Math.ceil(x)` | 向上取整 | `ceil(2.3)` → 3 |
| `Math.round(x)` | 四舍五入 | `round(3.14)` → 3 |
| `Math.max(a,b,c)` | 最大值 | `max(2,4,6)` → 6 |
| `Math.min(a,b,c)` | 最小值 | `min(4,2,6)` → 2 |
| `Math.random()` | [0,1)随机数 | - |
| `Math.pow(x,y)` | x的y次方 | `pow(2,3)` → 8 |
| `Math.sqrt(x)` | 开平方 | `sqrt(9)` → 3 |
| `Math.abs(x)` | 绝对值 | `abs('-5')` → 5 |