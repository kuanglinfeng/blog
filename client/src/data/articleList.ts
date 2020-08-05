import { IArticle } from '../types/commonTypes'

const articleList: IArticle[] = [
  {_id: '1', title: 'Vue基础', publishTime: new Date(), tagList: ['前端', 'Vue'], content: `
    ## Vue 基础

    ### 插值表达式
    
    \`\`\`vue
    <div id="app">
      <!-- 1 -->
      {{ 1 }}
      <!-- 1 -->
      {{ '1' }}
      <!-- true -->
      {{ true }}
      <!-- false -->
      {{ false }}
      <!-- { "name": "Flinn", "age": 21 } -->
      {{ {name: 'Flinn', age: 21} }}
      <!-- [ 1, 3, 2 ] -->
      {{ [1, 3, 2] }}
      <!-- 不显示 -->
      {{ undefined }}
    </div>
    \`\`\`
    
    **注意点**
    
    1. 我们如果要在插值表达式中使用变量，那么需要先在\`data\`属性中定义
    2. 数据要先存在，才能实现数据绑定（数据劫持）
    
    ### Vue实例
    
    \`\`\`vue
    <div id="app">
      <!-- 显示：hello vue [ 999, 2, 3, 4 ] { "name": "Flinn", "age": 21 } -->
      {{ message }} {{ arr }} {{ obj }}
    </div>
    
    <script>
      // 创建一个Vue实例 vm
      const vm = new Vue({
        // 挂载在id为app的元素上
        el: '#app',
        data: {
          message: 'hello vue',
          arr: [1, 2, 4],
          obj: {
            name: 'finn'
          }
        }
      })
      
      // 如果没有指定 el，也可以使用实例方法$mount()来选择所要挂载的DOM
    \t// vm.$mount('#app')
      
      // 在数组arr下标为 2 的位置开始删除 0 个元素 然后插入 3 这个数字
      vm.arr.splice(2, 0, 3)
      // $set(obj, key, value)
      vm.$set(vm.obj, 'name', 'Flinn')
      // 没有这个key值 则新建
      vm.$set(vm.obj, 'age', 21)
      // 数组也可以
      vm.$set(vm.arr, '0', 999)
      
      // 通过vm.$el 可以拿到Vue实例挂载的原生DOM
      console.log(vm.$el) // <div id="app"></div>
      
      // 其实，页面的渲染过程是异步的
      // 输出：hello vue [ 1, 2, 4 ] { "name": "finn" }
      console.log(vm.$el.innerText)
    
      // 如果要在页面渲染完成后输出 可以使用实例方法 $nextTick
      // 输出：hello vue [ 999, 2, 3, 4 ] { "name": "Flinn", "age": 21 }
      vm.$nextTick(() => console.log(vm.$el.innerText))
    </script>
    \`\`\`
    
    **注意点**
    
    1. 通过索引的方式去改变数组，不能使视图渲染
    2. 通过数组改变长度的方式去改变数组，不能使视图渲染
    3. 如果要改变数组推荐使用数组变异方法：pop、push、unshift、shift、sort、reverse、splice
    4. 可以使用Vue实例方法\`vm.$set(target, key, value)\`，来改变数组或者对象的某项
    5. 页面的渲染过程是异步的，使用Vue实例方法\`$nextTick\`可以在页面异步渲染完成后做一些操作
  `},
  {_id: '2', title: 'React基础', tagList: ['前端', 'React'], publishTime: new Date(), content: `
    ## React 核心概念


    ### JSX
    
    #### JSX是什么？
    
    - Fackbook起草的JS扩展语法
    - 本质是一个JS对象，会被babel编译，最终会被转换为\`React.createElement\`
    - 每个JSX表达式，有且仅有一个根节点
      - React.Fragment（空节点相当于\`<></>\`）
    - 每个JSX元素必须结束（XML规范）
    
    
    
    \`\`\`jsx
    <div className="App">
      <h1>hello</h1>
      <img />
    </div>
    \`\`\`
    
    
    
    #### 在JSX中嵌入表达式
    
    - 将表达式作为内容的一部分
      - false，null和undefined不会显示
      - 普通对象不可作为子元素
      - 可以放置React元素对象
    - 将表达式作为元素属性
    - 属性使用小驼峰命名法
    - 防止注入攻击
      - 自动编码
      - \`dangerouslySetInnerHTML\`
    
    使用：
    
    \`\`\`jsx
    function Me() {
      const person = { name: 'Flinn', friends: ['Leon', 'Monica'] }
      return (
        <div className="App">
          <h1>hello</h1>
          name: {person.name}
          <br />
          friends:
          <ul>{ person.friends.map(friend => <li>{friend}</li>) }</ul>
        </div>
      )
    }
    \`\`\`
    
    通常情况下，为防止注入攻击，React使用innerText进行页面的渲染，如有特殊需求，可使用\`dangerouslySetInnerHTML\`改为innerHTML：
    
    \`\`\`jsx
    function App() {
      const content = '<h1>dangerous!!!</h1>'
      return (
        <div className="App" dangerouslySetInnerHTML={{__html: content}}>
        </div>
      )
    }
    \`\`\`
  `}
]

export default articleList