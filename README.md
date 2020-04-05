# MY-VUE 项目相关

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

- src
  - /views 里面是项目的所有页面，（大驼峰，Page结尾）
    - HomePage.vue
    - TodoListPage.vue
    - 
  - components 里面是views里面的所有pages对应的组件
    - /BaseComponents
      - BaseTopBar.vue
      - 
    - /HomeComponents
      - index.vue
      - 头尾之类的
      - /Func
    - /TodoListComponents
      - index.vue
      - 页面的小组件之类的





## commit规范

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


## 规范

- 完整版请参考 [vue风格指南](https://cn.vuejs.org/v2/style-guide/)

### 组件命名
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


### 组件选项顺序
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

