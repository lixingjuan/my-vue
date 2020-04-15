# 分支介绍

1. master: 没有任何问题
2. feat-名字: 新功能/新页面开发完成之后merge到master，并删除该分支


# MY-VUE 项目相关

## TODO：

1. [x] 下拉刷新
2. [x] 上拉加载
3. [x] tab切换
4. [ ] 文件预览
5. [ ] 文件上传，图片压缩
6. [ ] 上按出现多选删除按钮
7. [ ] 左滑出现单项删除按钮
8. [ ] better-scroll判断若内层高度大于外层才可以滚动，可是这样的话，如果列表项目高度小于屏幕的话就无法下拉刷新，这是不合理的
   1. [ ] 解决思路，使用ref获取到内外层的高度，将内层高度在外层的基础上加一像素
9. [ ] slot使用
10. [ ] 国际化
11. [ ] 是否可实现拖拽生成定制页面
12. [ ] 数据请求进行统一管理
   1. [ ] 根据判断条件给予赋值
   2. [ ] 先判断请求参数条件是否改变，若未改变读取本地缓存数据


## 各页面介绍

### HomePage: 

- 其他页面的入口页面，页面由脚本生成；

### TodoPage

- 主要侧重于 vuex的使用上；

### scrollPage

- 一个完整的页面，包括头部nav, 头部tab, 页面上拉加载更多，下拉刷新，页面loading；
- 已实现的功能
  1. [x] 下拉刷新(整个页面)
  2. [x] 上拉加载更多
  3. [x] tab切换
  4. [x] 全局loading


### 另写一个页面
- 与scrollPage的区别在于，下拉刷新是从列表容器开始的，而不是从整个页面


## 项目结构 示例

```javascript

src/
|- components/   （页面的所有组件们）
  |- BaseComponents/ （所有页面复用组件）
    |- BaseTopBar.vue
    |- BaseBottomBar.vue
    |- BaseButton.vue
    |- BaseTable.vue
    |- BaseIcon.vue
  |- HomeComponents/ （HomePage的组件）
    |- index.vue
    |- 页面其他自用组件
  |- TodoListComponents/ （HomePage的组件）
    |- index.vue
    |- 页面其他自用组件
|- request/ 项目所有请求相关
  |- index.js 本目录所有 api、url、message 的导出
  |- axios.js axios全局处理
  |- ComUrl.js
  |- ComMessage.js
|- router/
  |- index.js 
|- store/
  |- index.js
|- utils 公共的一些方法
  |- index.js
|- views/ 项目的所有页面，（大驼峰，Page结尾）
  |- HomePage.vue
  |- TodoListPage.vue
|- App.vue  项目根组件
|- main.js  入口文件


``` 



## 代码规范

### commit规范

- feat : 新功能
- fix : 修复bug
- docs : 文档改变
- style : 代码格式改变
- refactor : 某个已有功能重构
- perf : 性能优化
- test : 增加测试
- build : 改变了build工具 如 grunt换成了 npm
- revert : 撤销上一次的 commit
- chore : 构建过程或辅助工具的变动


### 规范

- 完整版请参考 [vue风格指南](https://cn.vuejs.org/v2/style-guide/)

#### 组件命名
1. 组件语义化命名
  - 大驼峰式；
  - 文件命名不宜过长；
  - 路由的命名和文件命名保持一致；
  - 两个单词
    - 定义： TodoItem
    - 使用： todo-item
  - 使用完整单词而非缩写

2. 基础组件名
   - 应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V。
   
```javascript
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
``` 

3. 紧密耦合的组件名
  - 和父组件紧密耦合的子组件应该以父组件名作为前缀命名。
  - 如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。
  - 因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起。

```javascript
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vu
```

4. 组件名中的单词顺序
   - 组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾
  
```javascript
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```
5. 单例组件名
  - 只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。
  - 这不意味着组件只可用于一个单页面，而是每个页面只使用一次。这些组件永远不接受任何 prop

```javascript
components/
|- TheHeading.vue
|- TheSidebar.vue
```


#### 组件选项顺序
  - components
  - props
  - data
  - computed
  - watch
  - 生命周期顺序
  - methods


1. props必须注明类型，是否必须等信息
   
  ```javascript
  props: {
     topBarStatus: { 
       type: String, // 类型，位置为1
       required: true, // 是否必须，位置2
       validator: function (value) {
         return [
           'syncing',
           'synced',
           'version-conflict',
           'error'
         ].indexOf(value) !== -1
       }
     }
  }
  ```

6. 文件引入顺序始终保持
   1. 三方库
   2. 自定义工具函数等
   3. 自定义组件
   4. 自定义常量

7. methods 方法命名=> 动词+名词
   1. 动词类
      - （set、get、go、can、has、is）

