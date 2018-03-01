// Mounting: 挂载阶段
// Updating : 运行阶段
// Unmounting: 卸载阶段
// Error Handing : 错误处理 react16新增,只处理在render部分的错误

import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component{
	//构造函数
	constructor(){
		super();
		this.state = {
			name : 'old state',
		}
		console.log('初始化数据 constructor');
	}
	//组件将要加载
	componentWillMount(){
		//可以将一些异步事件放在此处处理
		console.log('componentWillMount');
	}
	//组件加载完成
	componentDidMount(){
		console.log('componentDidMount');
	}
	//处理点击事件
	handleCilck(){
		console.log('更新数据');
		this.setState({
			name : 'new state'
		})
	}
	//将要接收父组件传回来的props
	componentWillReceiveProps(){
		console.log('componentWillReceiveProps');
	}
	//判断子组件是否应该更新,默认为true
	shouldComponentUpdate(){
		console.log('shouldComponentUpdate');
		return true;
	}
	//组件将要更新
	componentWillUpdate(){
		console.log('componentWillUpdate');
	}
	//组件更新完成
	componentDidUpdate(){
		console.log('componentDidUpdate');
	}
	//组件即将销毁
	componentWillUnmount(){
		//这里通常用来取消一些操作，比如说定时器啥的
		console.log('componentWillUnmount');
	}
	//加载
	render(){
		console.log('render');
		return (
			// render也只能渲染一个顶级组件
			<div>			
				<div>state: {this.state.name}</div>
				<div>props: {this.props.name}</div>
				{/*改变state,来触发组件的更新*/}
				<button onClick={() => {this.handleCilck()}}>更新组件</button>
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
	}
	handleCilck(){
		console.log('更新props');
		this.setState({
			name : 'new props'
		})
	}
	deleteChild(){
		console.log('干掉子组件');
		this.setState({
			hasChild : false
		})
	}
	render(){
		return(
			<div>
				{
					this.state.hasChild ? <Component name={this.state.name}/> : null
				}
				<button onClick={() => {this.handleCilck()}}>改变props</button>
				<button onClick={() => {this.deleteChild()}}>干掉子组件</button>
			</div>
		)
	}
}

ReactDOM.render(
	<div>
		<App/>
	</div>,
	document.querySelector('#app')
);