

// 浏览器 Router
window.location.href = 'http://www.baidu.com';
history.back();

// hash Router
window.location.href = '#test'
window.onhashchange = function(){
    document.querySelector('#app').innerHTML = '当前Hash:' + window.location.hash;
}


// H5 Router
//推进一个状态,可以推进一个hash值，也可以推进一个地址而不做页面的刷新
history.pushState('test', 'Title', '/dist/test.html');
history.pushState('test', 'Title', '#test');
//替换一个状态
history.replaceState('test', 'Title', '/dist/test.html');
window.onpopstate = function(e){
    console.log(e)
    console.log(window.location.href);
    console.log(window.location.pathname);
    console.log(window.location.hash);
    console.log(window.location.search);
    document.querySelector('#app').innerHTML = '当前state:' + e.state;
}


//react-router
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route ,Link, Switch} from 'react-router-dom'

class ComponentA extends React.Component{
	constructor(){
		super();
	}
	render(){
		return (
			<div>	
				ComponentA						
				<Switch>
					{/*exact为完全匹配*/}
					<Route exact path={`${this.props.match.path}`} 
							render={(route) => {
								return <div>这是A组件</div>
							}}>
					</Route>
					{/*如何分清到底是子路径还是参数？ 一般把通配的放到后面*/}
					<Route path={`${this.props.match.path}/sub`} 
							render={(route) => {
								return <div>这是A组件sub</div>
							}}>
					</Route>
					<Route path={`${this.props.match.path}/:id`} 
							render={(route) => {
								return <div>这是A组件,参数是:{route.match.params.id}</div>
							}}>
					</Route>
				</Switch>
			</div>		
		);
	}
}

class ComponentB extends React.Component{
	constructor(){
		super();
	}
	render(){
		return (
			<div>			
				这是B组件
			</div>
		);
	}
}

class App extends React.Component{
	constructor(){
		super();
	}
	render(){
		return(
			<div>
				<Link to='/a'>A组件</Link>
				<br/>
			{/*如何分清到底是子路径还是参数？*/}
				<Link to='/a/123'>带参数的A组件</Link>
				<br/>
				<Link to='/a/sub'>/a/sub</Link>
				<br/>
				<Link to='/b'>B组件</Link>
				{this.props.children}
			</div>
		)
	}
}

ReactDOM.render(
	<Router>
		<App>
			<Route path='/a' component={ComponentA}></Route>
		{/*如此一来，A组件中的this.props.match.path='/a/123',而他所带参数为空
			<Route path='/a/:id' component={ComponentA}></Route>
		*/}
			<Route path='/b' component={ComponentB}></Route>			
		</App>
	</Router>,
	document.querySelector('#app')
);


//Link处理参数跳转时，组件不会重新渲染而是更新，而其他跳转则是重新render
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route ,Link} from 'react-router-dom'

class Component extends React.Component{
	//构造函数
	constructor(){
		super();
		console.log('初始化数据 子 constructor');
	}
	//组件将要加载
	componentWillMount(){
		//可以将一些异步事件放在此处处理
		console.log('子 componentWillMount');
	}
	//组件加载完成
	componentDidMount(){
		console.log('子 componentDidMount');
	}
	//将要接收父组件传回来的props
	componentWillReceiveProps(nextProps){
		console.log('子 componentWillReceiveProps');
	}
	//判断子组件是否应该更新,默认为true
	shouldComponentUpdate(){
		console.log('子 shouldComponentUpdate');
		return true;
	}
	//组件将要更新
	componentWillUpdate(){
		console.log('子 componentWillUpdate');
	}
	//组件更新完成
	componentDidUpdate(){
		console.log('子 componentDidUpdate');
	}
	//加载
	render(){
		console.log('子 render');
		return (
			// render也只能渲染一个顶级组件
			<div>
				children
			</div>
		);
	}
}

class App extends React.Component{
	//构造函数
	constructor(){
		super();
		this.state = {
			name : 'old props',
			hasChild: 'true'
		}
		console.log('初始化数据 父 constructor');
	}
	//组件将要更新
	componentWillUpdate(){
		console.log('更新数据 父 componentWillUpdate');
	}
	//组件更新完成
	componentDidUpdate(){
		console.log('父 componentDidUpdate');
	}
	//组件将要加载
	componentWillMount(){
		//可以将一些异步事件放在此处处理
		console.log('父 componentWillMount');
	}
	//组件加载完成
	componentDidMount(){
		console.log('父 componentDidMount');
	}
	render(){
		console.log('父 render');
		return(
			<div>
				<Component></Component>
				<Link to='/index'>跳转页面</Link>
				<Link to='/index/123'>跳转页面(带参数)</Link>
			</div>
		)
	}
}

ReactDOM.render(
	<Router>
		<div>
			<Route path='/index/:id?' component={App}></Route>
			{/*<Route exact path='/index' component={App}></Route>
			<Route path='/index/:id' component={App}></Route>*/}
		</div>
	</Router>,
	document.querySelector('#app')
);