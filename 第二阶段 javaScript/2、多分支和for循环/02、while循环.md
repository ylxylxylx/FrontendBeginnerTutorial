# while 循环

> 本节学习 while 循环语句，掌握"先判断后执行"的循环结构。

## 为什么需要循环

当需要**重复执行**某段代码时，用循环代替复制粘贴：

```javascript
// ❌ 不用循环：输出1到5
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);

// ✅ 用循环：输出1到5
var i = 1;
while (i <= 5) {
    console.log(i);
    i++;
}
```

## while 语法

```javascript
while (条件) {
    // 循环体：条件为 true 时重复执行
}
```

### 执行流程

1. 判断条件是否为 true
2. 如果为 true，执行循环体
3. 执行完循环体后，**回到第1步**再次判断条件
4. 如果为 false，**退出循环**

> while 是**先判断后执行**，如果条件一开始就为 false，循环体一次都不执行。

## 基础示例

### 示例1：输出1到10

```javascript
var i = 1;          // 1. 初始化：设置起始值
while (i <= 10) {   // 2. 条件：控制结束
    console.log(i); // 3. 循环体：要重复做的事
    i++;            // 4. 更新：让条件趋向 false
}
```

### 示例2：输出10到1（倒序）

```javascript
var i = 10;
while (i >= 1) {
    console.log(i);
    i--;
}
```

### 示例3：输出1到100的偶数

```javascript
var i = 1;
while (i <= 100) {
    if (i % 2 === 0) {
        console.log(i);
    }
    i++;
}

// 更高效的方式：直接从2开始，每次加2
var i = 2;
while (i <= 100) {
    console.log(i);
    i += 2;
}
```

### 示例4：求1到100的和

```javascript
var sum = 0;  // 累加器，初始为0
var i = 1;
while (i <= 100) {
    sum = sum + i;  // 累加
    i++;
}
console.log("1到100的和：" + sum);  // 5050
```

> 💡 累加求和是循环的经典应用，关键是用一个变量 `sum` 不断累加。

## 循环三要素

每个循环都需要三个关键部分：

| 要素 | 说明 | 示例 |
|------|------|------|
| 初始化 | 设置循环变量的起始值 | `var i = 1` |
| 条件 | 控制循环何时结束 | `i <= 10` |
| 更新 | 让循环变量变化，趋向条件为 false | `i++` |

> ⚠️ **缺少更新会导致死循环**：条件永远为 true，循环永远不会结束。

## 死循环

```javascript
// ❌ 死循环：i 永远为1，条件永远为 true
var i = 1;
while (i <= 10) {
    console.log(i);
    // 忘了 i++
}

// ❌ 死循环：条件写错
while (true) {
    console.log("永远执行");
}
```

### 死循环的应用

有时故意写死循环，在循环体内用 `break` 退出：

```javascript
while (true) {
    var num = prompt("请输入数字，输入0退出");
    if (num == 0) {
        break;  // 输入0时退出循环
    }
    console.log("你输入了：" + num);
}
```

## 常见错误

### 1. 忘记更新循环变量

```javascript
// ❌ 死循环
var i = 1;
while (i <= 10) {
    console.log(i);
    // 忘了 i++
}

// ✅ 正确
var i = 1;
while (i <= 10) {
    console.log(i);
    i++;  // 别忘了更新
}
```

### 2. 条件写反

```javascript
// ❌ 一次都不执行
var i = 1;
while (i >= 10) {  // 1 >= 10 为 false
    console.log(i);
    i++;
}

// ✅ 正确
var i = 1;
while (i <= 10) {
    console.log(i);
    i++;
}
```

### 3. 循环变量用 var 在循环外仍可访问

```javascript
var i = 1;
while (i <= 3) {
    console.log(i);
    i++;
}
console.log(i);  // 4，循环结束后 i 仍然存在
```

## 速记口诀

> while 先判后执行，条件为真循环体；
> 初始化条件加更新，三要素缺一不可；
> 更新忘写死循环，条件写反一次不行；