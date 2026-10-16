# jQuery 全选与反选

> 使用 jQuery 实现复选框的全选、反选与状态联动，掌握 each 遍历与属性操作

## 一、功能分析

```
全选反选 = 全选联动 + 反选取反 + 单选状态判断

三个交互:
  1. 点击"全选"   → 所有子选项同步全选框状态
  2. 点击"反选"   → 所有子选项状态取反
  3. 点击子选项   → 判断是否全部选中，反向更新全选框
```

## 二、页面结构

```html
<div class="box">
    <div class="check-all">
        <input type="checkbox" id="all"><label for="all">全选</label>
        <a class="inverse" href="javascript:;">反选</a>
    </div>
    <div class="items">
        <p><label><input type="checkbox">选项1</label></p>
        <p><label><input type="checkbox">选项2</label></p>
        <!-- ... 更多选项 ... -->
    </div>
</div>
```

```
┌──────────────────┐
│ ☑ 全选  反选      │  ← 全选框 + 反选链接
├──────────────────┤
│ ☑ 选项1           │
│ ☑ 选项2           │  ← 子选项区域
│ ☐ 选项3           │
│ ...               │
└──────────────────┘
```

## 三、全选功能

```javascript
// 点击全选框，让所有子选项同步状态
$("#all").click(function(){
    $(".items input").each(function(i, item){
        // item 是原生 DOM 对象，checked 是原生属性
        item.checked = $("#all")[0].checked
    })
    // 更新全选框文字
    isCheckAll()
})
```

> **注意**：`$("#all")` 是 jQuery 对象，`$("#all")[0]` 才是原生 DOM 对象，才能访问 `checked` 属性。

## 四、反选功能

```javascript
// 点击反选，让所有子选项状态取反
$(".inverse").click(function(){
    $(".items input").each(function(i, item){
        item.checked = !item.checked
    })
    isCheckAll()
})
```

## 五、子选项联动全选框

```javascript
// 点击任意子选项，判断当前是否全选
$(".items input").each(function(i, item){
    $(item).click(function(){
        isCheckAll()
    })
})
```

## 六、全选状态判断（封装）

```javascript
function isCheckAll(){
    // 默认假设是全选状态
    var checkAll = true;
    // 遍历所有子选项，只要有一个未选中就不是全选
    $(".items input").each(function(i, item){
        if(!item.checked){
            checkAll = false;
            return;  // 找到一个未选中即可退出遍历
        }
    })
    // 更新全选框状态和文字
    $("#all")[0].checked = checkAll
    $(".check-all label").html(checkAll ? "全不选" : "全选")
}
```

```
状态联动逻辑:

  子选项全部选中 → 全选框勾选，文字变"全不选"
  子选项有未选中 → 全选框取消，文字变"全选"

  全选框勾选     → 所有子选项勾选
  全选框取消     → 所有子选项取消
  反选点击       → 每个子选项取反 → 再判断全选状态
```

## 七、jQuery 与原生 DOM 的转换

```javascript
// jQuery 对象 → 原生 DOM 对象
$("#all")[0]          // 通过索引取出
$(".items input")[0]  // 同理

// 原生 DOM 对象 → jQuery 对象
$(item)               // 用 $() 包裹
```

| 场景 | jQuery 写法 | 原生写法 |
|------|-------------|----------|
| 获取元素 | `$("#all")` | `document.getElementById("all")` |
| 遍历 | `$(".items input").each(fn)` | `querySelectorAll` + for 循环 |
| checked 属性 | `$(item).prop("checked")` | `item.checked` |
| 修改内容 | `$(".check-all label").html("全选")` | `label.innerHTML = "全选"` |

## 八、总结

| 要点 | 说明 |
|------|------|
| 全选 | 遍历所有子选项，同步全选框的 checked 状态 |
| 反选 | 遍历所有子选项，`!item.checked` 取反 |
| 状态联动 | 子选项变化时遍历判断是否全选，反向更新全选框 |
| each 遍历 | `$(selector).each(function(i, item){})`，item 是原生 DOM |
| 对象转换 | `$(selector)[0]` 转 DOM，`$(dom)` 转 jQuery 对象 |
| 文字更新 | `html()` 方法修改标签内容，三元表达式切换文字 |