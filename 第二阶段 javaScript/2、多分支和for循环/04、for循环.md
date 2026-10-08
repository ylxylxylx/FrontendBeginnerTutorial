# for 循环

> 本节学习 for 循环，掌握最常用的循环结构，适合循环次数确定的场景。

## for 语法

```javascript
for (初始化; 条件; 更新) {
    // 循环体
}
```

### 执行流程

1. 执行**初始化**（只执行一次）
2. 判断**条件**是否为 true
3. 如果为 true，执行循环体
4. 执行完循环体后，执行**更新**
5. 回到第2步，再次判断条件
6. 如果条件为 false，退出循环

> for 把 while 的三要素（初始化、条件、更新）**集中写在一行**，结构更紧凑。

### for 与 while 对比

```javascript
// while 版
var i = 1;          // 初始化
while (i <= 10) {   // 条件
    console.log(i);
    i++;            // 更新
}

// for 版 — 三要素集中在一行
for (var i = 1; i <= 10; i++) {
    console.log(i);
}
```

> 💡 for 循环是 while 的简写形式，两者可以互相转换。

## 基础示例

### 示例1：输出1到10

```javascript
for (var i = 1; i <= 10; i++) {
    console.log(i);
}
// 输出：1 2 3 4 5 6 7 8 9 10
```

### 示例2：输出10到1（倒序）

```javascript
for (var i = 10; i >= 1; i--) {
    console.log(i);
}
```

### 示例3：输出1到100的偶数

```javascript
// 方式1：判断偶数
for (var i = 1; i <= 100; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}

// 方式2：步长为2（更高效）
for (var i = 2; i <= 100; i += 2) {
    console.log(i);
}
```

### 示例4：求1到100的和

```javascript
var sum = 0;
for (var i = 1; i <= 100; i++) {
    sum += i;
}
console.log("1到100的和：" + sum);  // 5050
```

### 示例5：求1到100偶数的和

```javascript
var sum = 0;
for (var i = 2; i <= 100; i += 2) {
    sum += i;
}
console.log("偶数和：" + sum);  // 2550
```

### 示例6：求n的阶乘

```javascript
var n = 5;
var result = 1;
for (var i = 1; i <= n; i++) {
    result *= i;
}
console.log(n + "的阶乘：" + result);  // 120 (1×2×3×4×5)
```

## for 循环的灵活写法

### 不同的步长

```javascript
// 每次加3
for (var i = 0; i < 20; i += 3) {
    console.log(i);  // 0, 3, 6, 9, 12, 15, 18
}

// 每次乘2
for (var i = 1; i <= 100; i *= 2) {
    console.log(i);  // 1, 2, 4, 8, 16, 32, 64
}
```

### 省略部分表达式

```javascript
// 省略初始化（在外面定义）
var i = 1;
for (; i <= 10; i++) {
    console.log(i);
}

// 省略更新（在循环体内更新）
for (var i = 1; i <= 10;) {
    console.log(i);
    i++;
}

// 全部省略 — 死循环（需用 break 退出）
for (;;) {
    // 等价于 while(true)
}
```

> ⚠️ 省略写法容易出错，**初学者建议写完整的三要素**。

## 常见循环模式

| 模式 | 代码 | 用途 |
|------|------|------|
| 正序遍历 | `for (var i = 0; i < n; i++)` | 从0到n-1 |
| 正序遍历（从1） | `for (var i = 1; i <= n; i++)` | 从1到n |
| 倒序遍历 | `for (var i = n; i >= 1; i--)` | 从n到1 |
| 偶数遍历 | `for (var i = 2; i <= n; i += 2)` | 只取偶数 |
| 步长遍历 | `for (var i = 0; i < n; i += step)` | 按步长跳跃 |

> 💡 `i < n` 和 `i <= n` 的区别：前者到 n-1，后者到 n。注意边界！

## for 循环中的变量作用域

```javascript
for (var i = 1; i <= 3; i++) {
    var temp = i * 2;
    console.log(temp);  // 2, 4, 6
}
console.log(i);     // 4（循环结束后 i 仍然存在）
console.log(temp);  // 6（temp 也仍然存在）
```

> ⚠️ `var` 声明的变量没有块级作用域，循环结束后仍然可以访问。ES6 的 `let` 可以解决这个问题。

## 常见错误

### 1. 条件写成 <= 还是 <

```javascript
// 输出1到10：用 <=
for (var i = 1; i <= 10; i++) { ... }  // i: 1~10，共10次

// 输出数组0到9：用 <
for (var i = 0; i < 10; i++) { ... }   // i: 0~9，共10次
```

### 2. 更新方向写反

```javascript
// ❌ i++ 但条件是 i >= 1，死循环
for (var i = 10; i >= 1; i++) { ... }

// ✅ 倒序用 i--
for (var i = 10; i >= 1; i--) { ... }
```

### 3. 在循环体内修改循环变量

```javascript
// ❌ 在循环体内修改 i，导致逻辑混乱
for (var i = 1; i <= 10; i++) {
    console.log(i);
    i++;  // 每次实际加了2，只输出 1, 3, 5, 7, 9
}

// ✅ 如果需要跳着走，修改步长
for (var i = 1; i <= 10; i += 2) {
    console.log(i);  // 1, 3, 5, 7, 9
}
```

## 速记口诀

> for 循环三要素，初始化条件加更新；
> 先初始化再判断，执行体后做更新；
> 正序从0用小于n，从1用小于等于n；
> 倒序起始大递减，步长灵活看需求；