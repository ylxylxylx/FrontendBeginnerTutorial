# arguments

> 本节学习函数中的隐式参数 arguments 对象，以及函数递归调用的概念。

## 什么是 arguments

在调用函数时，浏览器会传递两个**隐式参数**：

1. **arguments** — 参数（实参）的集合
2. **this** — 函数上下文对象

### arguments 的特点

- `arguments` 是函数中的**内置对象**，无需声明即可使用
- 表示调用函数时传入的**实参集合**
- `arguments` **不是数组**，但和数组类似（有索引、有长度）
- 可以通过索引访问参数：`arguments[0]`、`arguments[1]`...
- `arguments.length`：参数的个数
- `arguments.callee`：指向函数自身

```javascript
function add() {
    console.dir(arguments[0]);   // 第一个参数
    console.dir(arguments[1]);   // 第二个参数
    console.dir(arguments[2]);   // 第三个参数
    console.dir(arguments[3]);   // 第四个参数
    console.dir(arguments.length); // 参数个数
    console.dir(arguments);      // 整个 arguments 对象
}

add(2, 3, 4, 5);
// arguments[0] = 2
// arguments[1] = 3
// arguments[2] = 4
// arguments[3] = 5
// arguments.length = 4
```

## arguments 可以修改参数值

`arguments` 和形参是**联动**的，修改 `arguments` 中的值会影响形参：

```javascript
function add() {
    arguments[0] = 100;   // 修改第一个参数
    console.dir(arguments[0]);  // 100
}

add(2, 3, 4, 5);  // 传入2，但arguments[0]被改为100
```

## 实现任意数量参数的函数

利用 `arguments` 可以实现接收**任意数量参数**的函数：

```javascript
// 求任意个数数字的和
function sum() {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
```

## arguments.callee — 函数自身

`arguments.callee` 指向当前正在执行的函数本身，常用于**匿名函数的递归调用**。

### 函数递归

递归是指函数**自己调用自己**，必须有一个**结束条件**，否则会无限循环：

```javascript
var n = 0;
function fn() {
    console.log('fn 函数', n);
    n++;

    if (n > 10) return;  // 结束条件

    fn();  // 递归调用
}
fn();
```

### 用 arguments.callee 实现匿名函数递归

当函数是匿名函数时，无法通过函数名调用自己，此时可以使用 `arguments.callee`：

```javascript
var n = 0;
var fn = function() {
    console.log('fn 函数', n);
    n++;

    if (n > 10) return;

    arguments.callee();  // 匿名函数的递归调用
};
fn();
```

> ⚠️ 在**严格模式**下，`arguments.callee` 被禁用，会报错。实际开发中建议使用命名函数代替。

## arguments 不是数组

`arguments` 虽然有索引和 `length`，但它**不是真正的数组**：

```javascript
function test() {
    console.log(Array.isArray(arguments));  // false
    // arguments 没有 push、pop、forEach 等数组方法
}

test(1, 2, 3);
```

### 将 arguments 转为数组

如果需要使用数组方法，可以用 `Array.from()` 转换：

```javascript
function test() {
    var args = Array.from(arguments);  // 转为真正的数组
    console.log(Array.isArray(args));  // true
    args.forEach(function(item) {
        console.log(item);
    });
}

test(1, 2, 3);
```

## 总结

| 属性/方法 | 说明 |
|-----------|------|
| `arguments[i]` | 通过索引访问参数 |
| `arguments.length` | 参数的个数 |
| `arguments.callee` | 指向函数自身（严格模式下禁用） |
| `Array.from(arguments)` | 将 arguments 转为真正的数组 |

> 💡 `arguments` 适用于参数个数不确定的场景。在 ES6 中，更推荐使用**剩余参数** `...args` 代替 `arguments`。