# this 的指向

> 本节学习 JavaScript 中 this 关键字在不同场景下的指向规则。

## 核心规则

**this 指向：谁调用的函数，this 就指向谁**

this 有两个主要方向：
1. 一般指向 `window`
2. 其次指向对象本身

## this 的七种场景

### 1. 全局环境中 — 指向 window

```javascript
// 全局变量和全局函数都是 window 对象的属性和方法
var a = 2;
console.log(a);        // 2
console.log(window.a); // 2

console.log(this);     // window
```

### 2. 普通函数调用 — 指向 window

```javascript
function add() {
    console.dir(this);  // window
}
add();
window.add();  // 等同于 add()
```

### 3. 对象的方法中 — 指向对象本身

```javascript
var zhangsan = {
    name: '张三',
    run: function() {
        console.log(this);  // zhangsan 对象
    }
};
zhangsan.run();
```

### 4. 事件处理函数中 — 指向触发事件的元素

```javascript
var div = document.querySelector('div');
div.onclick = function() {
    console.log(this);  // div 元素
    setTimeout(function() {
        console.log(this);  // window（定时器中的 this 指向 window）
    }, 1000);
};
```

### 5. 构造函数中 — 指向正在创建的对象

```javascript
function People(name) {
    this.name = name;
    console.log(this);  // 正在创建的 People 对象
}
var wangwu = new People('王五');
console.log(wangwu);    // People {name: '王五'}
```

### 6. 定时器中 — 指向 window

```javascript
setTimeout(function() {
    console.log(this);  // window
}, 1000);

setInterval(function() {
    console.log(this);  // window
}, 1000);
```

### 7. 匿名函数和回调函数中 — 指向 window

```javascript
// 匿名函数
(function() {
    console.log(this);  // window
})();

// 回调函数
function f7(f) {
    f();
}
f7(function() {
    console.log(this);  // window
});
```

## 常见陷阱与解决方案

### 陷阱1：嵌套函数中的 this

```javascript
function fn() {
    console.dir(this);  // window
    function f1() {
        console.dir(this);  // window
    }
    f1();
}
fn();
```

### 陷阱2：对象方法返回函数

```javascript
var p = {
    name: 'Tom',
    run: function() {
        console.dir(this);  // p 对象
        var that = this;    // 保存 this 的引用
        return function() {
            console.log(this);  // window
            // 如果想在这个函数内部使用 p 对象
            console.log(that);  // p 对象
        };
    }
};
var f3 = p.run();
f3();  // 最终 f3 是由 window 调用的
```

**解决方案：** 使用 `var that = this` 保存外部 this 的引用

### 陷阱3：构造函数中的 this

```javascript
var n = 2;
function f5() {
    console.log(this.n);  // undefined
}
var f6 = new f5();  // 构造函数中 this 指向新对象，新对象没有 n 属性
```

## this 指向总结表

| 场景 | this 指向 |
|------|----------|
| 全局环境 | `window` |
| 普通函数调用 | `window` |
| 对象的方法 | 调用方法的对象 |
| 事件处理函数 | 触发事件的元素 |
| 构造函数 | 新创建的对象 |
| 定时器回调 | `window` |
| 匿名函数/回调函数 | `window` |