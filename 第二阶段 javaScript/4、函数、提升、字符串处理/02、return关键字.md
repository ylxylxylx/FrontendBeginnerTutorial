# return 关键字

> 本节深入学习 return 在函数中的用法：返回值、结束函数，以及 return 与 break/continue 的区别。

---

## 一、return 的两种用法

### 1. 返回值 + 结束函数

```javascript
function sum() {
    console.log('sum 函数1');
    return 100;              // 返回 100 并结束函数
    console.log('sum 函数2'); // ❌ 不会执行
}

var res = sum();  // res = 100
```

### 2. 仅结束函数（无返回值）

```javascript
function check(age) {
    if (age < 0) {
        return;  // 仅结束函数，不返回值
    }
    console.log('年龄：' + age);
}

check(-1);   // 无输出，函数直接结束
check(20);   // 年龄：20
```

---

## 二、返回值为 undefined 的情况

```javascript
// 情况1：函数中没有 return 语句
function fn1() {
    console.log('hello');
}
var res1 = fn1();   // res1 = undefined

// 情况2：return 后面没有内容
function fn2() {
    return;          // 相当于 return undefined;
}
var res2 = fn2();   // res2 = undefined
```

> 💡 函数没有 return 或 return 后无内容，接收变量都是 `undefined`。

---

## 三、return 在循环中的应用

### 例：计算 1-100 的和，遇到 66 停止

**❌ 错误：在循环中直接用 return（不在函数内）**

```javascript
var qiuHe = 0;
for (var i = 1; i <= 100; i++) {
    qiuHe += i;
    if (i == 66) {
        return;  // SyntaxError: Illegal return statement
    }
}
```

> return 只能在函数中使用，在全局作用域使用会报语法错误。

**✅ 正确：把循环放在函数中**

```javascript
function add() {
    var qiuHe = 0;
    for (var i = 1; i <= 100; i++) {
        qiuHe += i;
        if (i == 66) {
            return qiuHe;  // 结束函数并返回结果
        }
    }
}

var result = add();  // 2211（1+2+...+66）
```

---

## 四、return vs break vs continue

| 关键字 | 使用位置 | 作用 |
|--------|----------|------|
| `return` | 函数中 | 结束函数（可带返回值） |
| `break` | 循环 / switch | 结束整个循环或 switch |
| `continue` | 循环中 | 跳过本次循环，继续下一次 |

### 对比示例

```javascript
// break：结束整个循环
for (var i = 1; i <= 5; i++) {
    if (i == 3) break;
    console.log(i);  // 输出 1, 2
}

// continue：跳过本次
for (var i = 1; i <= 5; i++) {
    if (i == 3) continue;
    console.log(i);  // 输出 1, 2, 4, 5
}

// return：结束整个函数
function test() {
    for (var i = 1; i <= 5; i++) {
        if (i == 3) return;
        console.log(i);  // 输出 1, 2
    }
    console.log('循环结束');  // ❌ 不会执行
}
test();
```

---

## 五、return 的常见应用场景

### 1. 提前退出函数

```javascript
function divide(a, b) {
    if (b == 0) {
        console.log('除数不能为0');
        return;  // 提前退出
    }
    return a / b;
}
```

### 2. 条件返回不同值

```javascript
function getMax(a, b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
    // 简写：return a > b ? a : b;
}
```

### 3. 循环中找到目标立即返回

```javascript
function findIndex(arr, target) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;  // 找到就返回索引
        }
    }
    return -1;  // 没找到返回 -1
}
```

---

## 知识点速记

| 知识点 | 要点 |
|--------|------|
| return 作用 | 返回值 + 结束函数 |
| return 无返回值 | 接收变量为 undefined |
| return 只能在函数中 | 全局作用域使用报错 |
| return vs break | return 结束函数，break 结束循环 |
| return vs continue | return 结束函数，continue 跳过本次 |
| return 后不执行 | return 之后的代码是无效代码 |