# CSS 属性操作

> 通过 JavaScript 操作元素的样式，可以使用 `element.style` 设置内联样式，也可以使用 `cssText` 批量设置。

## 一、获取样式

```html
<div style="width:200px; color: red;">八佰</div>
```

```js
var div = document.getElementsByTagName('div')[0];

// 通过 element.style 获取内联样式
console.log(div.style.width);      // "200px"
console.log(div.style['width']);   // "200px"（方括号语法）

// ⚠️ 只能获取内联样式，无法获取 <style> 标签或外联 CSS 中的样式
// console.log(div.style.height);  // 空字符串（height 在 <style> 中定义）
```

> `element.style` 只能读取**内联样式**，`<style>` 标签或外部 CSS 文件中的样式无法通过此方式获取。

## 二、设置样式

```js
// 设置单个样式属性，表现为内联样式
div.style.height = '300px';
div.style['width'] = '300px';
div.style.backgroundColor = 'blue';    // 驼峰命名法
div.style.fontSize = '60px';
div.style.fontWeight = 'bold';
div.style.border = '10px solid orange';
```

### CSS 属性名转换规则

CSS 中的连字符写法需要转为 JavaScript 的**驼峰命名法**：

| CSS 写法 | JS 写法 |
|---------|---------|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `font-weight` | `fontWeight` |
| `border-radius` | `borderRadius` |
| `margin-top` | `marginTop` |

> 规则：去掉连字符，连字符后的首字母大写。

## 三、cssText 批量设置

```js
// 获取内联样式的完整文本
console.log(div.style.cssText);
// 输出: "width: 300px; color: red; height: 300px; ..."

// 批量设置样式（替换所有内联样式）
div.style.cssText = 'color:red;font-size:30px';

// 清空内联样式（不影响 <style> 标签或外联 CSS）
div.style.cssText = '';
```

> `cssText` 会**整体替换**内联样式，而不是追加。

## 四、动态创建元素并美化

标签创建的一般步骤：**1. 创建 → 2. 添加 → 3. 美化**

```js
// 1. 创建 ul
var ul = document.createElement('ul');
// 2. 添加到页面
document.body.appendChild(ul);

// 3. 创建 li 并美化
for (var i = 0; i < 10; i++) {
    var li = document.createElement('li');
    ul.appendChild(li);               // 添加到 ul
    li.innerHTML = i;                 // 设置内容
    li.style.border = '1px solid red'; // 美化样式
}
```

## 五、获取输入框的值

```js
// input.value 获取输入框的值
var input = document.querySelector('input');
console.log(input.value);
```

## 六、方法总结

| 方式 | 语法 | 说明 |
|------|------|------|
| 单个设置 | `el.style.prop = value` | 设置单个样式，驼峰命名 |
| 方括号语法 | `el.style['prop'] = value` | 适用于动态属性名 |
| 批量设置 | `el.style.cssText = '...'` | 整体替换内联样式 |
| 获取样式 | `el.style.prop` | 只能获取内联样式 |

---

**小结**

- `element.style.属性名 = 值`：设置内联样式，CSS 属性用驼峰命名
- `element.style.cssText`：批量设置/清空内联样式
- 只能获取和设置**内联样式**，无法操作 `<style>` 或外联 CSS
- 创建元素的标准流程：**创建 → 添加 → 美化**