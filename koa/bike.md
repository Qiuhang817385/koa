

## 创建项目

```js
create-react-app  bike
```

## 安装sass

```js
npm i sass-loader node-sass sass --save
```

## 安装antd

```js
yarn add antd
```

### 按需加载

```js
$ yarn add react-app-rewired customize-cra
$ yarn add babel-plugin-import
```

```js
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```

```js
config-overrides.js
+ const { override, fixBabelImports } = require('customize-cra');

- module.exports = function override(config, env) {
-   // do stuff with the webpack config...
-   return config;
- };
+ module.exports = override(
+   fixBabelImports('import', {
+     libraryName: 'antd',
+     libraryDirectory: 'es',
+     style: 'css',
+   }),
+ );
```

```js
+ import { Button } from 'antd';
```

## 安装图标字体

```js
npm install --save @ant-design/icons
```

## 安装Echarts

```js
yarn add echarts echarts-for-react --save
```

## 安装react-router

```js
npm install react-router-dom
```

## 安装redux

```
yarn add redux
```

## 安装react-redux

```
yarn add react-redux
```

## 安装redux-thunk

```
npm install redux-thunk

- const ReduxThunk = require('redux-thunk')
+ const ReduxThunk = require('redux-thunk').default
```

## 安装redux-saga

```
yarn add redux-saga
```

## 安装axios

```
yarn add axios
```

###### -------------2020年4月13号-开始

##  安装moment

```js
yarn add moment

后续使用需要继续学习,包括国际化???
```



###### -------------2020年4月13号-结束

## 什么是框架  是mvc  mv* 是react库和周边生态共同构成的一个框架

### mv* 框架 只关注视图的View层+数据Model层

MV层是框架自己封装,可以完成V-M的映射和M-V的渲染



生态 Vue:Vue+Vue-Router+vuex+axios+babel+webpack

​		react:react+react-router+redux+axios+babel+webpack



## 自定义主题Antd

### 安装less-loader

```js
yarn add less less-loader
```

### 暴露webpack配置(新的环境下不需要再暴露配置了 跳过)

现在的方式是直接修改配置文件,而不是根据官网使用react-app-rewired

这个后面可能会留坑

```js
yarn eject
```



## import

```js
{"libraryName":"antd"}				加载样式js文件
{"libraryName":"antd",style:"css"}	加载样式css文件		  按需加载
{"libraryName":"antd",style:"true"} 加载组件内部的less原文件 可以修改配置文件
```



# 一/主页结构开发

## 结构层次

分成左右两侧

右侧分为上中下   中间内容变化

flex布局和antd的栅格系统实际上用一个就可以了

后期-动态生成权限菜单列表

```js
布局
中空效果
.content {
  position: relative;
  padding: 20px;
  background-color: $colorL;
  height: 100vh;
}
```



时间:第三方插件库

Moment





# 二/React-router

* react-router
  * Router
  * Route
  * Switch
* react-router-dom
  * BrowserRouter
  * HashRouter
  * Route
    * path
    * exact
    * component
    * render
  * Link
  * NavLink
* react-router-dom核心用法

### 配置BrowserRouter

> 为什么使用BrowserRouter

因为一般/开头的都是接口的地址

向服务端发送请求

所以需要再nginx处进行配置以区分开来

> Demo1	基础路由

```js
<Router>
     <Link to="/">Main</Link>
     <Link to="/about">About</Link>
		{/* 	
			两种exact的写法
            两种组件形式的写法
            component是小写的
        */}
          <Route exact={true} path="/" component={Main}></Route>
          <Route exact path="/about" >
            <About></About>
          </Route>
</Router>
```

> Demo2	
>
> 使用配置的方式配置路由+
>
> 路由Home根节点+
>
> 嵌套路由,Main当中进行配置<Link>+<props.children>,		->Link+Props 
>
> ​				Router写根节点<Main>+<子组件>							->path+父+子
>
> 需要去掉exact,如果根节点是/
>
> 或者每一个都加上后缀,不使用/

```js
配置默认的路由  第一次进入页面就看到的路由是怎么配置的
Home组件就是第一次进入页面的配置
也就是根节点,第一次路由加载的组件
//Router.js
<Router>
        <Home>
          <Route path="/main" render={() => {
            // 需要有返回值
            return (
              <Main>
                <Route exact path="/main/a" component={A}></Route>
              </Main>
            )
          }
          }></Route>
          <Route exact path="/about" component={About}></Route>
       </Home>
</Router>

//Home.js
<Link to="/main">Main2</Link>
<Link to="/about">About2</Link>
{this.props.children}
```

> Demo3 根据返回来的商品信息动态生成商品的详情页面

```
//Main.js
{
          [1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
            return (
              <div>
                <Link to={`/main/${item}`}>商品{item}页面</Link>
              </div>
            )
          })
}

 {this.props.children}

```

```js
//公用页面Detail.js		Info.js
import React from 'react'
import { useParams } from 'react-router-dom'
export default function Info () {
  let { NEXZID } = useParams();
  return (
    <div>
      商品ID号:{NEXZID}
    </div>
  )
}

```



### switch

```
switch和exact的区别
exact是精准匹配,会匹配最符合的哪一项
switch是从上到下进行匹配,匹配到则下面不再匹配
<switch>
    < path="/" >
    < path="/new" >
    < path="/new/old" >
</switch>
只匹配第一个或者第二个
解决办法
给第一个和第二个加exact
```



### Link

```js
<Link to="/">
<Link to={{pathname:'/three/7'}}>
<Route path="/three/:number" />
取值:this.props.match.params.number
```

```js
{
    pathname:'/',
	search:'',
	hash:'',
	key:'abc12'
	state:{}
}
```

###### ---------2020年4月15号-开始



### 重定向Redirect

```js
<Redirect to="/admin/home">
```

 ### 架构页面的设计

#### 打开新的页面+退出

```js
打开新的页面
window.open(`/common/order/detail/${item.id}`, '_blank')

退出
直接关闭页面
```

#### 内联页面+返回

```js
同页跳转
history.push(`/common/order/detail/${item.id}`)

新页面返回
import { useParams, useHistory } from 'react-router-dom';
let history = useHistory();
<Button type="primary" onClick={() => { history.goBack() }}>返回</Button>

```

### WithRouter

```js
高阶组件中的withRouter, 
作用是将一个组件包裹进Route里面, 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中.
// withRouter实现原理: 
// 将组件包裹进 Route, 然后返回
// const withRouter = () => {
//     return () => {
//         return <Route component={Nav} />
//     }
// }

// 这里是简化版
const withRouter = ( Component ) => () => <Route component={ Component }/>
    
import React from 'react'
import './nav.css'
import {
    NavLink,
    withRouter
} from "react-router-dom"

class Nav extends React.Component{
    handleClick = () => {
        // Route 的 三个对象将会被放进来, 对象里面的方法可以被调用
        console.log(this.props);
    }
    render() {
        return (
            <div className={'nav'}>
                <span className={'logo'} onClick={this.handleClick}>掘土社区</span>
                <li><NavLink to="/" exact>首页</NavLink></li>
                <li><NavLink to="/activities">动态</NavLink></li>
                <li><NavLink to="/topic">话题</NavLink></li>
                <li><NavLink to="/login">登录</NavLink></li>
            </div>
        );
    }
}

// 导出的是 withRouter(Nav) 函数执行
export default withRouter(Nav)

将span使用withRouter作为一个可点击跳转的Link
```

### 重定向到首页

```js
之前
 <Route path='/' render={() => {
            return (
              <Admin>
                <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/home" component={Home}></Route>

现在
<Route  path="/home" component={Home}></Route>
    。
    。
    。
    。
<Route path="/user" component={User} />
<Redirect to='/home'></Redirect>
<Route component={NoMatch} />
    
    
这种解决办法没有第一种好
```





###### ---------2020年4月15号-结束



# 三/UI(新版本)

## Icon

新版本所有的ICON图标都是从第三方图标库当中引出

## spin(Loading)

```js
  // 两种使用spin的方式
  //  方式一:直接使用icon图标+spin
   			<SyncOutlined spin />
  //  方式二:使用spin图标+icon+spin
  			<Spin indicator={antIcon} />
  //  方式二可以自定义描述文案+大小
```

## Message

```js
计算属性的使用
 showMessage = (type) => {
    message[type]({
          content: '这是内容',
    })
 }

() => this.showMessage('success')
```

## Model 模态框

```js
 // 计算属性--->计算是哪一个被打开??
  handleOpen = (Target) => {
    this.setState({
      // 怎么利用传进来的变量
      [Target]: true
    })
  }
  
  this.handleOpen('showModal1')  //让模态框1显示

 // 计算属性--->计算打开的是那种类型
handleConfirm = (type) => {
    Modal[type]({
      title: '确认',
      content: '这里是内容区域',
      onOk () {
        console.log('ok')
      },
      onCancel () {
        alert('cancel')
      }
    })
  }

this.handleConfirm('confirm')
```

## Notification

```js
通知
this.openNotificationIcon(<SmileOutlined style={{ color: '#108ee9' }} />)}
使用自定义图标
notification.open({
      message: 'Notification Title',
      description:
        'notification.',
      // icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      icon: Icon,
    });
```



## Tab 

需要注意Key的变化

```js
 const panes = this.state.panes.filter(pane => pane.key !== targetKey);
```

## 图片画廊

```js
这个样式不错
```

## 描述框

```js
响应式 
<Descriptions
          title="Responsive Descriptions"
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
>
    
column	一行的 DescriptionItems 数量，可以写成像素值或支持响应式的对象写法 { xs: 8, sm: 16, md: 24}
span	包含列的数量	number	1
layout	描述布局	horizontal | vertical	不怎么用垂直
```

## 树形结构

```js
checkable	节点前添加 Checkbox 复选框	boolean	false
defaultExpandedKeys	默认展开指定的树节点			   string[]	[]
defaultSelectedKeys	默认选中的树节点				string[]
defaultCheckedKeys	默认选中复选框的树节点			  string[]
受控
expandedKeys	（受控）展开指定的树节点
autoExpandParent	是否自动展开父节点

checkedKeys	（受控）选中复选框的树节点
（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；
	相应当子节点 key 都传入，父节点也自动选中。
当设置checkable和checkStrictly，它是一个有checked和halfChecked属性的对象，并且父子节点的选中与否不再关联
checkStrictly	checkable 状态下节点选择完全受控（父子节点选中状态不再关联）
selectedKeys	（受控）设置选中的树节点

treeData	treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一）
如果设置了不需要再导入TreeNode了
```

```js
回调函数

选中的时候
onSelect={onSelect}


添加完复选框勾选复选框的时候
onCheck={onCheck}

展开/收起节点时触发
onExpand

loadData	异步加载数据

```



# 四/表单(新版)

> 新版变化,不需要再用Form.Create方法进行创建,直接导出就可以

```js
API
--------------------------------------------
Input
--------------------------------------------
prefix	带有前缀图标的 input	string|ReactNode
suffix	带有后缀图标的 input	string|ReactNode
<Input.Password />
<Input.TextArea />
    
为什么我动态改变 prefix/suffix 时，Input 会失去焦点？#
当 Input 动态添加或者删除 prefix/suffix 时，React 会重新创建 DOM 结构而新的 input 是没有焦点的。你可以预设一个空的 <span /> 来保持 DOM 结构不变：
prefix={<UserOutlined className="site-form-item-icon" />}
const suffix = condition ? <Icon type="smile" /> : <span />;

<Input suffix={suffix} />;
--------------------------------------------
Form
--------------------------------------------
colon	示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效)  true
form	经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建	??
initialValues	表单默认值，只有初始化以及重置时生效		object{{ remember: true }}
labelCol	label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}
wrapperCol	需要为输入控件设置布局样式时，使用该属性，用法同 labelCol	object

layout	表单布局	horizontal | vertical | inline		horizontal
name	表单名称，会作为表单字段 id 前缀使用	string

onFinish	提交表单且数据验证成功后回调事件	Function(values)
onFinishFailed	提交表单且数据验证失败后回调事件
onFieldsChange	字段更新时触发回调事件
onValuesChange	字段值更新时触发回调事件
--------------------------------------------
Form.Item
--------------------------------------------
noStyle	为 true 时不带样式，作为纯字段控件使用	boolean	false
name	字段名，支持数组
Form--onValuesChange	字段值更新时触发回调事件
valuePropName	子节点的值的属性，如 Switch 的是 'checked'	string	'value'

被设置了 name 属性的 Form.Item 包装的控件，表单控件会自动添加 value（或 valuePropName 指定的其他属性） onChange（或 trigger 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

1.不再也不应该用 onChange 来做数据收集同步（可以使用 Form 的 onValuesChange）
但还是可以继续监听 onChange 事件。
2.不能用控件的 value 或 defaultValue 等属性来设置表单域的值，默认值可以用 Form 里的 initialValues 来设置。注意 initialValues 不能被 setState 动态更新，你需要用 setFieldsValue 来更新。(重要)
3.你不应该用 setState，可以使用 form.setFieldsValue 来动态改变表单值(重要)
dependencies
“确认密码”校验依赖于“密码”字段，设置 dependencies 后，“密码”字段更新会重新触发“校验密码”的校验逻辑。
--------------------------------------------
Form.List动态渲染功能
--------------------------------------------

--------------------------------------------
为什么 Form.Item 下的子组件 defaultValue 不生效？#
当你为 Form.Item 设置 name 属性后，子组件会转为受控模式。因而 defaultValue 不会生效。你需要在 Form 上通过 initialValues 设置默认值。
--------------------------------------------

<Button type="primary" htmlType="submit">
          Submit
</Button>
```



```js
1.const [form] = Form.useForm();
  const [, forceUpdate] = useState();
???
    通过 Form.useForm 对表单数据域进行交互。
--------------------------------------------   
2.<Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}			???	-->name=remember默认勾选
      onFinish={onFinish}							???--->提交成功的回调
      onFinishFailed={onFinishFailed}				???--->失败的回调
    >
```

## 操作表单域的值

```js
const [form] = Form.useForm();
设置
form.setFieldsValue({
     note: 'Hello world!',
      gender: 'male',
});
--------------------
获取
form.getFieldValue('gender')

提交的回调函数onFinsh获取
 <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
     
 <Button type="primary" htmlType="submit">
              Submit
 </Button>
const onFinish = values => {
    console.log('Finish:', values);
      //{note: "Hi, man!", gender: "male"}
};
--------------------
置空
const onReset = () => {
    form.resetFields();
};
--------------------
获取
const handleonValuesChange = (e) => {
    console.log(e)//{note: "1"}{gender: "male"}
    //相当于KeyUp事件 或者 onChange 事件
     let a = form.getFieldValue('note')
    console.log(a)
}
const handleonFieldsChange = (e) => {
    // 触摸事件,使用的机会比较少
    // console.log(e[0])
}

```

## 修改默认提示信息加Demo

```js
1.name={['user', 'name']}
 label="用户名"
输出的是user底下的name,那么获取值的时候,只能获取这个对象.name底下的字段
2.validateMessages会修改默认信息,用以配置国际化
```

## 复杂控件嵌套

```
<Form.Item name="field" /> 只会对它的直接子元素绑定表单功能，
例如直接包裹了 Input/Select。
如果控件前后还有一些文案或样式装点，或者一个表单项内有多个控件，你可以使用内嵌的 Form.Item 完成。
你可以给 Form.Item 自定义 style 进行内联布局，或者添加 noStyle 作为纯粹的无样式绑定组件
在多个子控件上面设置

方式1. style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
方式2. noStyle
这样才能拿到数据
```

###### -------------2020年4月13号-开始

## 表单封装控件

```js

```



###### -------------2020年4月13号-结束

## 表单数据存储于上层组件

不经常用,并且动态渲染不了,当然可以改造

## 动态增加、减少表单项。

> 官网例子

## 设置默认值 initValue

```js
<Form
        layout="horizontal"
        initialValues={{ city: "", business: "1", use: "" }}
      >
        <FormItem 
          name="city"
        >
          <Select style={{ width: 100 }}>
            <Option value="">全部</Option>
            <Option value="1">北京市</Option>
            <Option value="2">天津市</Option>
            <Option value="3">深圳市</Option>
          </Select>
```



## 多表单联动+模态框

```js
在模态框当中使用form
为何在 Modal 中调用 form 控制台会报错？
这是因为你在调用 form 方法时，Modal 还未初始化导致 form 没有关联任何 Form 组件。你可以通过给 Modal 设置 forceRender 将其预渲染
forceRender
 <Modal forceRender visible={visible} onOk={onClose} onCancel={onClose}>
    <Form form={form}>
      <Form.Item name="user">
        <Input />
      </Form.Item>
    </Form>
 </Modal>
```





## login

## register



# 五/分页

```js
<Pagination onChange={onChange} total={50} />
    
-------------------------
onChange	页码改变的回调，参数是改变后的页码及每页条数	Function(page, pageSize)	noop
onShowSizeChange	pageSize 变化的回调	Function(current, size)	noop
-------------------------
current			当前页数	number
defaultCurrent	默认的当前页数	number	1
------------
pageSize		每页条数	number
defaultPageSize	默认的每页条数	number	10
pageSizeOptions	指定每页可以显示多少条	string[]	['10', '20', '50', '100']
showQuickJumper	是否可以快速跳转至某页	boolean | { goButton: ReactNode }	false
showSizeChanger	是否展示 pageSize 切换器，当 total 大于 100 时默认为 true	boolean
------------
showTotal		用于显示数据总量和当前数据顺序	Function(total, range)
total			数据总数	number	0
------------
size	当为「small」时，是小尺寸分页	'default' | 'small'	""	
responsive	当 size 未指定时，根据屏幕宽度自动调整尺寸	boolean
hideOnSinglePage	只有一页时是否隐藏分页器	boolean	false
------------
disabled		禁用分页	boolean



表格分页
 const [pagination, setpagination] = useState(null)
 
 //设置分页属性
 setpagination({
        showTotal: () => {
          return `共${res.result.item_list.length}条`
          // return `共${total}条`
       }
 })

//Table表格
<Table columns={columns}
            dataSource={list}
            pagination={pagination}
  ></Table>

```

```js
初始设置
const params = {
  page: 1
}
---------------------------------
分页功能Html
 <Table columns={columns}  dataSource={list} >
     <Pagination {...pagination} />
 </Table>
---------------------------------
请求
requestList().then((res) => {
      /**
       * 获取基本数据,存储到List当中
       */
      setRes(res);
      let Arr = res.result.item_list.map((item, index) => {
        item.key = index;
        return item;
      })
      setList([...Arr])
      /**
       *  分页操作,利用antd的话,直接把数据放到里面,设置分页就直接分好了
       */
      let pageObj = utils.pagination(
        res,                  //参数1,设置基础数据
        (current) => {        //参数2,回调函数,也是分页组件里面的onchange事件,当切换页面的时候调用的函数
          params.page = current;   //设置参数页,用于下面再进行请求指定页面的数据
          requestList();
        })
      console.log('pageObj', pageObj)
      setpagination(pageObj)
 });
---------------------------------



```

# 六/表格

```js
1/title
dataIndex
dataSource
pagination = {false}
key:React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性

2/Mock Axios的封装,Loading处理,错误拦截
http://www.qiuhang.club:7300/mock/5e8c119b00fbdf09dcf21f9f/bike/table/list
axios有baseUrl参数

3.axios的封装

4.数据字典的使用
 render: state => {
      let config = {
        '1': '完成',
        '2': '未付款',
        '3': '进行中',
        '4': '付款中',
        '5': '准备开始'
      }
      return config[state]
 }
 
 动态渲染Key
 获取到res res.map((item,index)=>{
     item.key = index
 })
5.单选rowSelection
	type	多选/单选，checkbox or radio
    selectRowKeys
   
  多选框
   const checkMore = {
    type: 'checkbox',
    // 细节,第一个参数必须是selectedRowKeys
    selectedRowKeys: selectedRowKeys22,
  }
   调用useState方法,一定会渲染DOM
```

###### -------------2020年4月13号-开始

# 七/复选框

```js
Checkbox

checked	指定当前是否选中	boolean
defaultChecked	初始是否选中	boolean
indeterminate	设置 indeterminate 状态，只负责样式控制	boolean
onChange	变化时回调函数

Checkbox Group#

defaultValue	默认选中的选项
disabled	整组失效
name	CheckboxGroup 下所有 input[type="checkbox"] 的 name 属性
options	指定可选项
value	指定选中的选项
onChange	变化时回调函数

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}
  
  //选中所有---->未看
```



# 八/时间控件

## 国际化配置

```js
默认配置为 en-US，如果你需要设置其他语言，推荐在入口处使用我们提供的国际化组件，详见：ConfigProvider 国际化。

如有特殊需求（仅修改单一组件的语言），请使用 locale 参数，参考：默认配置。
/////////////////////////全局配置国际化
import zhCN from 'antd/es/locale/zh_CN';

<DatePicker locale={locale} />;
// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
 <ConfigProvider locale={zhCN}>
        <div className="App">
          {this.props.children}
        </div>
</ConfigProvider>
//////////////////////////////////////日期
import moment from 'moment';
import 'moment/locale/zh-cn';
<DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} />;
```



```js
不可选日期和时间
{/* 可用 disabledDate 和 disabledTime 分别禁止选择部分日期和时间，
        其中 disabledTime 需要和 showTime 一起使用。 */}

明天接着看API
```

```js
共同API
disabledDate	不可选择的日期
picker	设置选择器类型	date | week | month | quarter (4.1.0)(季度) | year
bordered={false} 	边框
locale={locale}  	国际化
onChange={onChange}	选择之后的回调
dateRender	自定义日期单元格的内容	function(currentDate: moment, today: moment) => React.ReactNode

// 配合showTime使用,当选中日期的时候,会自动给你选择好时间
showTime={{
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
}}

自定义格式
const dateFormat = 'YYYY/MM/DD';
<DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
------------------------------------------------
DatePicker不可选日期和时间
////////////////////////
disabledTime	不可选择的时间	function(date)
 <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          disabledDate={disabledDate}
          disabledTime={disabledDateTime}
          showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
        />
公共API-->disabledDate
function disabledDate (current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}
自身API-->disabledTime
function disabledDateTime () {
  return {
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  };
}
// 不是,是4点到20点之间都不可选
 disabledHours: () => range(0, 60).splice(4, 20),
//////////////////

     
----------------------------------
RangePicker	

showTime	增加时间选择功能	Object|boolean  时分秒

自定义格式,defaultValue参数是一个数组
 <RangePicker
  defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
          format={dateFormat}/>
  

```

## 回调函数

```js
回调函数
datapicker单个时间
function onChange (date, dateString) {
    /**
     * date:moment对象
     * dateString:正常字符串
     */
    console.log(date, dateString);
}

rangePicker范围时间
function onRangeChange (date, dateString) {
    console.log('dateString :', dateString);
//dateString : (2) ["2020-04-14 11:59:55", "2020-04-22 14:59:50"]
}

时间类组件的 value 类型为 moment 对象，所以在提交服务器前需要预处理。

  onFinish = (fieldsValue) => {
      //range-time-picker是picker的name字段
    const rangeTimeValue = fieldsValue['range-time-picker'];
    const values = {
      ...fieldsValue,
      'range-time-picker': [
        rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
        rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
      ],
    };
    console.log('Received values of form: ', values);
    
  }
```



```js
需求:获取起止时间进行筛选???
    未做
    2.获取起止时间
```





## Moment

```js
引入
import moment from 'moment';

使用
result.start_time : 1521865027000

let a = new Date();
a.setTime(result.start_time);
let b = moment(a).format('YYYY-MM-DD HH:mm:ss')
console.log('b :', b);
b : 2018-03-24 12:17:07

起止时间
 let startTime = () => {
    let a = new Date().setTime(result.start_time);
    return <>{moment(a).format('YY年MM月DD日 /  HH点mm分ss')}</>
 }
 let endTime = () => {
    let a = new Date().setTime(result.end_time);
    return <>{moment(a).format('YY年MM月DD日 /  HH点mm分ss')}</>
 }
```



# 九/穿梭框

```js
dataSource	数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外。
titles		标题集合，顺序从左至右	['', '']
targetKeys	显示在右侧框数据的 key 集合	string[]
showSearch	是否显示搜索框	boolean			可以直接搜索到，内置了

operations	操作文案集合，顺序从上至下	string[]	['>', '<']
 operations={['to right', 'to left']}
----------------------
selectedKeys	设置哪些项应该被选中	string[]
无论左侧还是右侧,都被填充到这里面当中来了

sourceSelectedKeys-左侧:  (2) ["1", "4"]
targetSelectedKeys-右侧:  (3) ["2", "5", "8"]
selectedKeys
this.state.selectedKeys (5) ["1", "4", "2", "5", "8"]
----------------------
render		每行的渲染函数
	direction	渲染列表的方向
    disabled	是否禁用列表
    filteredItems	过滤后的数据
    onItemSelect	勾选条目
    onItemSelectAll	勾选一组条目
    selectedKeys	选中的条目
footer	底部渲染函数	(props) => ReactNode
	 footer={this.renderFooter}
 --------------------
dataSource左侧数据						右侧数据targetKeys

```

```js
回调函数
onChange	选项在两栏之间转移时的回调函数	(targetKeys, direction, moveKeys): void
onSelectChange	选中项发生改变时的回调函数	
	(sourceSelectedKeys, targetSelectedKeys): void
左侧和右侧
onScroll	选项列表滚动时的回调函数	(direction, event): void

自定义搜索函数
onSearch={this.handleSearch}
```

# 十/公共页面开发,每个商品/物品/用户的详情页面

```js
路由
<Route path="/common" render={() => {
            return <Common>
              <Route path="/common/order/detail/:orderId" component={Login} />
              <Route path="/common/user/detail/:userId" component={Login} />
            </Common>
}} />

common.js
<Row className="simple-page" >
  <Col span={24}>
    <Header menuType="second" />
  </Col>
</Row>
<Row className="content">
  <Col span={24}>
    {this.props.children}
    {/* longnocom */}
  </Col>
</Row>
```

# 十一/CRUD

一个模态框+一个封装表单

动态生成内容

```js
//封装的数据
import {  formList, create, read, update, del } from './data'
const [type, setType] = useState('create')
let obj = {
    create, read, update, del
}
let handleC = () => {
    setVisible(true);
    setType('create')
    setTitle('创建');
}
let handleR = () => {
    setVisible(true);
    setType('update')
    setTitle('编辑');
}
let handleU = () => {
    setVisible(true);
    setType('read')
    setTitle('查询');
}
let handleD = () => {
    setVisible(true);
    setType('del')
    setTitle('删除');
}


<Modal
        visible={visible}
        title={title}
        okText='确定'
        cancelText='返回'
        onCancel={() => setVisible(false)}
        onOk={() => {
          //怎么获取到最新的数据???????
          //函数组件怎么使用到类组件最新的数据--->直接使用ref,太强了
          let res = baseForm.current.formRef.current.getFieldsValue();
          onCreate(res)
        }}
      >
 <BaseForm
      formList={obj[type].formList}
      initValue={obj[type].initValue}
      formLayout={obj[type].formLayout}
      layout={obj[type].layout}
      ref={baseForm}
      filterSubmit={onCreate}
></BaseForm>
   </Modal>
```



增加创建

```js

```

编辑修改

```js
这个模块没有做	给表单传递一个初始值,表单通过this.props拿到,if空->创建\\if有就是编辑功能

let userInfo = this.props.userInfo||{}

initialValue:userInfo.userName
initialValue:userInfo.sex

直接渲染到页面上面
```

查询详情

```js

```

删除

```js
获取id 调用接口 重新渲染就可以了
```



```html
其实应该在每一个的后面加一个删除按钮和更新按钮
```

###### ----2020年4月16号

# 十二/核心权限设置

> RBAC，即基于角色的访问控制（Role-Based Access Control），是优秀的权限控制模型，主要通过角色和权限建立管理，再赋予用户不同的角色，来实现权限控制的目标。
>
> 利用该模型来配置权限，直接优点是角色的数量比用户的数量更少，先把权限赋予角色，即可完成权限的分配；再为用户分配相应的角色，即可直接获得角色拥有的权限。



1.角色列表,这个公司一共有多少个角色

2.设置权限,给角色来设置响应的权限值

3.用户授权,把用户分配个那个角色



## 设置权限-树

```js
1.动态加载出来权限

 treeData={this.tree()}
遇见的问题是
// 为什么这里拿不到数据???通过this。setState获取外部表单的数据再更改本地结构，结构没有生效
// 直接调用函数反而生效了
2.根据角色的权限，动态的勾选上

checkedKeys={this.props.menuInfo}

这里做的功能，是
通过父页面的menuInfo={menuInfo}，来动态加载这个角色拥有那些权限

子组件	checkedKeys={this.props.menuInfo} 来获取

当在子菜单当中进行勾选的时候，调用onChenck事件
onCheck={this.onTreeCheck}
onTreeCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    // setCheckedKeys(checkedKeys);
    // 调用父组件的方法,把改变后的值传递回去
    // 父组件的方法
    this.props.patchMenuInfo(checkedKeys)
  };
调用父组件的方法，来进行menuInfo的修改

这里进行了优化

patchMenuInfo={(checkedKeys) => {
          // 优化点,先修改掉roleItem副本的数组内容,
          // 因为此时还没有关闭掉页面,所以依然需要修改menuInfo
          // -->然后render-->获得最新的menuInfo--->再次传递到子组件渲染页面
          let roleItem = this.state.roleItem;
          roleItem.menus = checkedKeys
          this.setState({
              //优化完成
              //优化完成
              //优化完成
            menuInfo: checkedKeys,
            roleItem
          })
}}
    详细优化点，见下方部分
    
    
3.最后提交

  /**
   * 权限设置-modal框确定
   */
  handleOKPerEditSubmit = () => {
    // 修改状态
    let formData = this.permEditForm.current.PermformRef.current.getFieldsValue();
    let item = this.state.roleItem;
    item.status = formData.status;
    // 如果设置成停用,应该禁用整个树形框,或者整个数组清0
    this.setState({
      isPermissionVisible: false,
      roleItem: item
    })
    let willSendRoleData = formData;

    //获取当前角色id
    willSendRoleData["Id"] = item.id;
    willSendRoleData["menus"] = item.menus;
    editRole(willSendRoleData).then((res) => {
      if (res.code == '0') {
        Modal.info({
          'title': '设置权限',
          'content': '设置成功!'
        })
      }
      // axios.get(/role/list)刷新一下页面,未做
    })
  }
```

## 用户授权

```js
// concat的用法和filter的用法		concat和filter都不会改变原数组 
 /**
   * 筛选目标用户
   */
  getAuthUserList = (data) => {
    if (data && data.length > 0) {
      console.log('data :', data);
      let MockData = [];
      for (const iterator of data) {
        MockData.push({
          key: iterator.user_id,
          title: iterator.user_name,
          status: iterator.status
        })
      }
      let target = [];
      // concat的用法和filter的用法
      // dataSource = dataSource.concat(MockData.filter((item) => item.status === 1))
       //右侧是key的集合
      target = target.concat(MockData.filter((item) => item.status === 1)).map(item => item.key)
      console.log('target :', target);
        
      //左侧是所有数据
      this.setState({ dataSource: MockData, target })
    }
  }
  
 
  
  transfer
  //右侧是key的集合
   //左侧是所有数据

```







# 十三/登录





###### -------------2020年4月13号-结束

# 十四/用户更新

```js
1.父组件-》函数组件
子组件-》函数组件

怎么拿到子组件当中的antd表单值

ref={updateForm}
//获取表单当中的数据，其实没有下面那个好使
props.filterSubmit(updateForm.current.getFieldsValue())

props.reset(updateForm);

父组件
let updateForm = null;

这样就可以在任何地方，使用子组件当中的这个form对象

<UpdateForm
          filterSubmit={(res) => {
            console.log('res', res)
          }}
          data={update}
          reset={(formObj) => {
            console.log('formObjc', formObj)
            updateForm = formObj
          }}
        ></UpdateForm>

--------------------------------------
2.编辑功能，打开子组件表单的时候，根据不同的用户设置不同的初始值

update.initValue = {
      'username': Item.username,
      'sex': Item.sex,
      // 'date-picker': Item.birthday,
      'address': Item.address,
    }
    // updateForm && updateForm.current.resetFields()
    if (updateForm) {
      updateForm.current.setFieldsValue({
        ...update.initValue
      })
    }


提交功能，修改完毕之后
let updataOnOk = () => {
    setItem((prev) => {
      let target = {};
        //联合上方一起看
        //修改完毕之后，获取当前表单的值和item，修改当中Item-->render后会修改表单的初始值，
      Object.assign(target, prev, updateForm.current.getFieldsValue())
      return target
    })
    // console.log('list :', list);
    let ids, obj, target = {};
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == Item.id) {
        let old = list[i];
          //对当前的表格数据进行修改
          //找出需要修改的哪一项
        Object.assign(target, old, updateForm.current.getFieldsValue())
        ids = i;
        console.log(ids)
        break;
      }
    }
    if (ids > -1) {
      console.log('执行了')
      console.log('ids :', ids);
      console.log('obj :', target);
      let newList = list;
      newList[ids] = target;
      setList([...list])
    }
    set
```

# 十五/用户模块

```js
// 表格每一个都可以调用render方法获取当前的text和Item，这样的话删除或者编辑就方便太多了

详情见高级表格的最后一个操作按钮的例子
 {
      title: '操作',
      render: (text, item) => {
        return <Button size="small"
          onClick={() => { handleDelete(item) }}
        >删除</Button>
      }
    }
```



# 项目工程化

组件化 

* 轮播
* 表单
* 列表
* 表格

模块化

* 起止时间
* 分页
* loading处理

公共机制

* 时间格式化
* 公共样式
* 背景颜色,sass变量
* axios封装
* 路由封装
* 错误拦截

# Axios使用JsonP跨域

安装

```js
yarn add jsonp --save
```

> 模式:通常我们会使用promise再对函数做进一步的封装用以控制错误

```js
static jsonp (options) {
    // 再封装一层promise用来做错误处理
    return new Promise((resolve, reject) => {
      JsonP(
        options.url,
        { param: 'callback' },
        function (err, response) {
          //to-do
          if (response.status === 'success') {
            resolve(response);
          } else {
            reject(response.message);
          }
        })
    })
  }
	// 调用方式
    // axios.jsonp({
    //   url: ''
    // }).then((res)=>{})
```

## 抽取多层Promise

```js
定义在函数组件外部
const requestList = () => {
    //返回的是一个promise对象,只要有promise,就可以一直then下去
  return axios.ajax({
    url: 'http://www.qiuhang.club:7300/mock/5e8c119b00fbdf09dcf21f9f/bike/open_city',
    data: {
      params: {
        page: params.page
      }
    }
  }).then((res) => {
    return res
  })
}
函数组件调用
requestList().then((res) => {
      console.log('resa :', res);
});


```

## get带参数请求

```js
axios.get('/open_city_copy', {
    params: {
      page: 1
    }
  }).then((res) => {
    console.log('res :', res);
  })
```

###### ----------------2020年4月14号

## 业务逻辑请求列表封装/外部调用this指向

```js
新技巧,外部函数当中调用this.setState
方式1
  /**
   * 业务逻辑请求封装
   * 可以把this传递给这个函数,这样这个函数就可以是this里面的setState方法了
   * 我的组件使用的是useHook,所以可以新增一个参数判断是函数组件还是类组件,然后进行数据存储
   */
  static requestList (_this, url, params, isMock) {
    let data = {
      params, isMock
    }
    this.ajax({
      url, data
    }).then((data) => {
      if (data && data.result) {
        let list = data.result.item_list.map((item, index) => {
          item.key = index;
          return item;
        });
        _this.setState({
          list
          // 分页
        })
      }
    })
  }
调用
在类组件当中调用
requestList (this, url, params, isMock)
-----------------------------------------------
方式2
封装的工具类
 updateSelectedItem (selectedRowKeys, selectedRows, selectedIds) {
    if (selectedIds) {
      this.setState({
        selectedRowKeys,
        selectedIds: selectedIds,
        selectedItem: selectedRows
      })
    } else {
      this.setState({
        selectedRowKeys,
        selectedItem: selectedRows
      })
    }
  },
 
 调用
 
 Utils.updateSelectedItem.bind(this)
      

```



###### ----------------2020年4月14号



# Bug

### 一,antdUI如果在暗模式下,使用弹出menu出现Bug,

走马灯需要给图片加onload，设置高度为auto才行

### 二,react的严格模式会报警告

### 三/react-Hook存储对象的话,最多可以访问两层

### 四/ReactHooks

```js
Bug  使用Hooks
当存储对象的时候,使用null,或者直接不填
const [resF, setRes] = useState({});
解决方式一		const [resF, setRes] = useState();
解决方式二		const [resF, setRes] = useState(null);
  useEffect(() => {
    let obj = {
      a: {
        b: {
          c: 'cccccc',
          f: [1, 2, 3, 4]
        }
      }
    }
    setRes(obj)
  }, [])
  if (resF) {
    console.log('resF :', resF.a.b.c);
    resF.a.b.f.map((item) => {
      console.log(item)
    })
  }
  
  
如果使用class组件
那么两种方式都可以
objs: {}
objs: null
--------------------------------------------------------------------

Hooks获取到最新的值
console.log(count);
setCount(12);
console.log(count);
这样获取的仍然是旧值

解决办法
1.放到promise当中
2.setParams({ mockData: 2333333 });
// 如何让getData里params是最新的？？？
getData();

setParams({ mockData: 2333333 });
setParams(currParams => {
    getData(currParams)
    return currParams
})

3.setParams(()=>{
    const nextParams = { mockData: 2333333 }
    getData(nextParams)
    return nextParams
});
--------------------------------------------------------------------
react-Hook只运行在react顶层使用
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      setselectItem(selectedRows)
    }
  }
这样使用会报错
------解决办法,定义一个顶层的函数并且调用它
const rowSelection = {
    // type: 'checkbox',
    type: 'radio',
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
        //顶层函数
      rowSelectChange(selectedRowKeys, selectedRows)
    }
  }
```



###### ----------------2020年4月14号

### 五/表单封装和无限刷新

```js
封装的表单
 <ETable
    // rowSelection='checkbox'
    selectedRowKeys={this.state.selectedRowKeys22}
    dataSource={this.state.listData}
    columns={columns2}
  />
 
 ETable组件

 初始化	InitTable = () => {}
 调用
<div>
    {/* {this.node} */}
    {this.InitTable()}
</div>

问题
如果在InitTable当中调用this.setState
那么表单会无限刷新调用render

原因,调用this.setState的时候会调用render
render之后又会调用this.InitTable()
陷入死循环

解决方法
不使用this.setState

封装成方法放到外面

```

### 六/表格组件的封装

```js
在类组件下,单击事件某一行来	修改当前的选中状态,UI不会显示

解决办法

改成函数组件,使用hooks
```

### 七/

```js
Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method

还有一个是描述框description的span应该怎么使用
```

### 八/返回接口数据的统一

```js
调用角色接口的时候,可以返回数据,但是页面一直显示弹窗

原因:axios封装完成之后-->判断返回的code是字符串类型,但是角色接口那边是数值类型

导致进入reject

解决办法
-->修改接口数据,改成统一的格式
```

### 九/样式

```js
Permision里面的Card卡片自动变成了最大高度
在没有内容填充的情况下也有了一定的高度,并且给card单独设置高度,下面空出来的部分也不会被补上

原因

common.style里面的
.content {
  position: relative;
  padding: 20px;
  // background-color: $colorL;
  height: 100vh;
}

高度设置成了100vh

解决办法,在permission里面重写自己的高度是auto

```

### 十、Key值，注意key的index需要+1操作

```js
Each child in a list should have a unique "key" prop.

解决办法，在使用封装的基础表格之前，对数据进行处理
let items = res.result.item_list;
  items.map((item, index) => {
    item.key = index + 1;
    return item
  })
  this.setState({
    item_list: items
  })
```

### 十一/表单的initialValue

```js
Bug现象
现在要通过给表单组件传递一个初始值，来每次动态改变Select的默认value，和点击的相匹配
Bug是每次都不会更新字段，一直使用最初始的Value值

Bug出现的原因
先看两个API
resetFields	重置一组字段到 initialValues	(fields?: NamePath[]) => void
initialValues	表单默认值，只有初始化以及重置时生效	object
这个重置是什么意思--》就是resetFields()方法

步骤--》关闭modal，重置字段到initial.value  -->这个initialValue就是当前的值
也就是说，只有第一次进入这个表单的时候，才会使用Initialvalue的值
之后的每次进入表单，initialValue的值都会被更改，但是不会被使用

解决办法

在modal上面使用forceRender，在表单渲染之前使用
在modal打开之前，调用resetFields()将表单中的值先清除一遍
```

### 十二/Tree的初始数据？

```js
render函数里面已经有了数据

但是为什么每次打开页面都获取不到？


<Modal
          forceRender
          title='设置权限'
          visible={isUserVisible}
          onOk={this.handleOKUserSubmit}
          onCancel={() => { this.setState({ isUserVisible: false }) }}>
          <RoleAuth
            AuthName={roleItem && roleItem.role_name}
            mockData={this.state.dataSource}
            targetKeys={target}
          />
                
                
                这里的target也是,读取不到最新的数据??/
```

### 十三/不可读取

```js
<ETable
    // Bug,不可读取属性,返回来的rec是一个hook属性，只能读取最外层属性
	//	修改只能通过state的方式
    getItem={rec => {
      	this.getEtableItem(rec)
    }}
    columns={columns}
    dataSource={item_list}
    pagination={false}
/>
```

### 十四/路由修改

```js

    <Route path='/' render={() => {}} 
    <Route path="/common" render={() => {}}

  如果公共详情页面在/的后面，无论访问首页还是公共组件，都会访问到首页（Switch

解决办法
<Switch>
    <Route path="/common"  render={() => {}}
    <Route path='/' render={() => {}} 
</Switch>


优化，第一次进入管理系统进入的页面
  <Route path='/' render={() => {
            return (
              <Admin>
                <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/home" component={Home}></Route>


```

### 十五	

```js
 Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

我们不能在组件销毁后设置state，防止出现内存泄漏的情况

Bug出现场景

    //组件B
    class TestContainer extends Component{
        constructor(){
            super()
            this.state = {
                isShow:true
            }
        }
        render(){
            return (
            <div>
    <button onClick={()=>this.setState({isShow:!this.state.isShow})}>toggle</button>
                    {!!this.state.isShow&&<Test />}
            </div>
            )
        }
    }
    //组件A
    class Test extends Component{
        constructor(){
            super()
            this.state = {
                num:0
            }
        }
        getNum=()=>{
            //模拟异步请求
            this.timer = setTimeout(()=>{
                this.setState({ num: Math.random() })
            },3000)
        }
        render(){
            return (
    <div onClick={this.getNum} style = {{ width: 100, height: 100, background: 'red' }}>
        {this.state.num}
                </div>
            )
        }
    }
    在本例子中：
        当我们点击组件A时，会发送一个异步请求，请求成功后会更新num的值。
        当我们点击组件B时，会控制组件的A的卸载与装载
        
当我们点击组件A后，组件A需要3秒的时间才能获取到数据并重新更新num的值，假如我们在这3秒内点击一次组件B，
表示卸载组件A，但是组件A的数据请求依然还在，当请求成功后，组件A已经不存在，此时就会报这个警告


解决办法:应该在组件销毁的时候将异步请求撤销

componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
}



本例的解决办法
getEtableItem是封装的表格组件获取里面值的方法

刚刚初始化的时候就会调用一次,这个时候还没有对单项进行点击,所以访问item.id就会直接报错

所以在使用前先加一个判断
 /**
   *  ETable返回来的数据
   */
  getEtableItem = (rec) => {
    this.setState({
      roleItem: rec,
    }, () => {
      console.log('object :', this.state.roleItem);
      let item = this.state.roleItem;
      if (item) {
        console.log('item.id :', item.id);
          //获取角色下面的用户列表
      // accessUser(item.id).then((res) => {
      //   let List = res.result;
      //   this.getAuthUserList(List);
      // })
      }
      
    })
  }
```

### 十六/子组件拿不到数据/异步渲染组件和父调子方法传值/纯渲染组件

```js
我的想法是,当父组件异步获取数据之后,给子组件传递值,子组件把值保存到本身的组件状态当中
然后每次操作的都是本身的组件状态数据,返回去的也是本身的数据

理想的状态是只获取父组件,异步数据的最新副本,然后对副本进行操作

但是由于下面的渲染过程,异步数据根本拿不到

渲染的过程

父组件挂载相应的dom和default state和props-->
    子组件先使用父组件默认的state--->
    父组件的state发生变化--->子组件监听不到变化

实验1,不给父组件设置默认的tareget,直接在点击的时候设置
 <RoleAuth
            AuthName={roleItem && roleItem.role_name}
            mockData={this.state.dataSource}
            targetKeys={target ? target : []}
          />

结果:失败

实验2,直接在子组件当中使用父组件传递过来的方法
 <Transfer
          dataSource={props.mockData}
		//直接使用
          targetKeys={props.targetKeys}
          titles={['Source', 'Target']}
          // selectedKeys={selectedKeys}
          onChange={handleChange}
          render={item => item.title}
        />

onChange事件也是通过调用父组件的方法来修改这个数据
//props.patchUserInfo(nextTargetKeys)

<RoleAuth
    AuthName={roleItem && roleItem.role_name}
    mockData={this.state.dataSource}
    targetKeys={target ? target : []}
    //父组件的方法来修改这个数据
    patchUserInfo={(res) => this.setState({ target: res })}
  />

```

### 十七/父调子值

```js
父组件想拿到子组件当中的表单的值
方式一、子组件是类组件，通过ref
方式二、子组件是函数组件，通过子组件调用父组件的方法

但是，如果要把每一个用户渲染到表单当中，由于每次需要初始化表单，还需要调用子组件的方法？？

不一定，每次的initial-value都是通过props渲染的

```

### 十八/当异步获取最新的元素，但是页面没有得到怎么办

```js
useEffect(() => {
    axios.axiosGet({
      url: '/table/list',
      data: {
        params: {
          userId: userId
        }
      }
    }).then((res) => {
      if (res.code == '0') {
        // setResult(res.result)
        // 是在模态框
        // 获取了不能？？？
        let obj = res.result.list.find(item => item.id == userId)
        console.log('obj', obj)
        setResult(obj)
      }
    })
  }, [])

对result进行判断就可以了

{result ? <>
        <Card title="" className='card'>
          <Button type="primary" onClick={() => { history.goBack() }}>返回</Button>
        </Card>
        <Card title="用户详情">
         
        </Card></> : (<></>)}
```





# 持续优化

> 1.完成了city城市业务模块 数据的代码拆分,使用hooks来完成模块

> 2.对city/order/user进行分页控制操作

> 3.封装ajax

关于封装的ID

```js
if (rowSelection == 'checkbox') {
      // 这个ids好像没有用啊----->这个ids相当于自己的key值,也相当于id值
      // 加上吧,以防止没有这个值,这踏马赋值成一样的了,这不废话了吗,为啥不直接用id?
      // 这个id真 的 没用
      selectedRows.map((item) => {
        selectedIds.push(item.id);
      });
      this.setState({
        selectedRowKeys,
        selectedIds: selectedIds,
        selectedItem: selectedRows
      });
}
```

## 权限优化

```js
/**
   * 权限设置-打开按钮
   */
  handlePermissionOpen = () => {
    let item = this.state.roleItem;
    this.permEditForm.current.PermformRef.current.resetFields();
    this.setState({
      isPermissionVisible: true,
      //  17日,这里是直接掉的真实的接口来进行权限的设置,
      // 可以进行一个小优化,每次都从本地的一个副本当中来拿到数据,这样就算离线也能显示出来数据
      // menuInfo: item.menus
      // 优化---->
      menuInfo: menuInfo的副本---》应该填item.menus，因为再下面直接修改了roleItem对象。
    })
    // isPermissionVisible
  }
  
  <PermEditForm
            ref={this.permEditForm}
            detailInfo={roleItem || {}}
            menuInfo={menuInfo}
            // 子组件调用父组件的方法,进行传值
            patchMenuInfo={(checkedKeys) => {
              // 优化点,先修改掉roleItem副本的数组内容,
              // 因为此时还没有关闭掉页面,所以依然需要修改menuInfo
              // -->然后render-->获得最新的menuInfo--->再次传递到子组件渲染页面
              let roleItem = this.state.roleItem;
              roleItem.menus = checkedKeys
              this.setState({
                  //优化完成
                  //优化完成
                  //优化完成
                menuInfo: checkedKeys,
                roleItem
              })
            }}
          ></PermEditForm> 
  
  
  
  
 优化，修改状态+禁用树形框
  /**
   * 权限设置-modal框确定
   */
  handleOKPerEditSubmit = () => {
    // 修改状态
    let formData = this.permEditForm.current.PermformRef.current.getFieldsValue();
    let item = this.state.roleItem;
    item.status = formData.status;
    // 如果设置成停用,应该禁用整个树形框,或者整个数组清0
      // 如果设置成停用,应该禁用整个树形框,或者整个数组清0
      // 如果设置成停用,应该禁用整个树形框,或者整个数组清0
      // 如果设置成停用,应该禁用整个树形框,或者整个数组清0
    this.setState({
      isPermissionVisible: false,
      roleItem: item
    })
  }
```



# Tip

```js
 1.// 字符串转换成数字的方法
  // console.log('+item.key :', typeof +item.key);
  return +item.key % 3 > 1

在字符串前面写一个+号

2.计算属性/表结构
值
return {
    '1':'qqq'
}[state]
函数
return {
    '1':fun(parm)
}[state](parm)

3.合并对象的方法

Object.assign(target, old, updateForm.current.getFieldsValue())

4.过滤/合并/查找
find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
find() 并没有改变数组的原始值。

concat的用法和filter的用法		concat和filter都不会改变原数组
 
target = target.concat(MockData.filter((item) => item.status === 1)).map(item => item.key)
```

# 新学快捷键

```js
met ==>箭头函数

fre→	arrayName.forEach(element => { }
                          
prom→	return new Promise((resolve, reject) => { }

cp→	const { } = this.props
cs→	const { } = this.state

cmmb
/**
   * 
   */

cdm→	componentDidMount = () => { }

ren→	render() { return( ) }
sst→	this.setState({ })
ssf→	this.setState((state, props) => return { })

hoc 高阶组件


cs
const {  } = this.state;
cp
const {  } = this.props;
```

# 封装

## 表单封装

```js



----------------------------------
4.15.对表单进行了时间控件的优化,-->判断有无时间字段
 onFinish = (fieldsValue) => {
    let values;
    if (fieldsValue['range-time-picker']) {
      const rangeTimeValue = fieldsValue['range-time-picker'];
      values = {
        ...fieldsValue,
        'rangeTimePicker': [
          rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
          rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
        ],
      };
    } else {
      values = {
        ...fieldsValue
      }
    }
    console.log('Received values of form: ', values);
    /**
     * 调用父级的方法
     */
    this.props.filterSubmit(values)
  }
 ----------------------------------
4.15.新增了密码和单个的时间控件

// 单选时间控件和范围时间控件目前只能二选一
 'password': <FormItem name={name} label={label}>
      <Input type="password" placeholder={placeholder} />
    </FormItem>,

 'datepicker': <FormItem name={name} label={label}>
      <DatePicker showTime locale={locale} format="YYYY-MM-DD HH:mm:ss" onChange={onDateChange} />
</FormItem>,

单个时间控件的格式化函数

if (fieldsValue['date-picker']) {
      const datePicker = fieldsValue['date-picker'];
      values = {
        ...fieldsValue,
        'datePicker':
          datePicker.format('YYYY-MM-DD HH:mm:ss'),
      };
}
----------------------------------
4.15.修改了传递进入的数据结构
export const formList = {
  initValue: {
  },
  formList: [
    {
      name: 'username',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      width: 100
    }
  ]
}
-----------------------------------
4.16.新增了Radio-group组件字段

-----------------------------------
4.16 怎么通过父组件来直接获取子组件的数据
函数组件let baseForm = useRef(null)
类组件		this.baseForm = React.creaeRef();
<BaseForm
  ref={baseForm/this.baseForm}
></BaseForm>

let res = baseForm.current.formRef.current.getFieldsValue();



 未优化点--->表单的布局
```



## 表格封装

```js


2.新增加了单选的返回事件getItem
3.完成对分页属性的基础封装
4.修复了一个小Bug   
	单选的返回值--->原生的是数组,现在也修改成了对象-->res[0]
5.取消了复选的单行点击功能,因为有Bug	--->新版本是EtableFun1
6.对全选按钮进行了优化,去除了undefined数据
let getItem = (val) => {
    if (Array.isArray(val)) {
      if (!val[0]) {
        val.splice(0, 1)
      }
    }
    return val;
}
7.增加了spin-loading状态

8.新增判断,---Bug,如果没有数据的话,读取数据的length会直接报错
    1.如果没有数据那么就显示0条数据
    2.分页也显示0条数据
    
    没有数据的话是不显示分页的-->
原来
    let pagi_nation = props.pagination;
    return <Spin spinning={props.dataSource.length===0 ? true : false}>
现在
    let pagi_nation = props.dataSource ? props.pagination : null;
    return <Spin spinning={!props.dataSource ? true : false}>

```

## 二次注意

订单的key需要单独做处理

```js
arrRes.map((item) => {
        // 这里的id需要单独做处理,而不是自己的Bug
        console.log('item.id :', item.id);
        item['key'] = item.id;				//错误的处理
})

-->正确的处理
arrRes.map((item, index) => {
        // 这里的id需要单独做处理,而不是自己的Bug
        item['key'] = index + 1;
})
```





###### ----------------2020年4月14号


