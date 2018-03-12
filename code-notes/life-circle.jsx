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
	//处理点击事件
	handleCilck(){
		console.log('更新数据');
		this.setState({
			name : 'new state'
		})
	}
	//将要接收父组件传回来的props
	componentWillReceiveProps(nextProps){
		//注意这里无论父组件传回来的props有没有更新，只要父组件state改变就会触发这个事件
		console.log('子 componentWillReceiveProps');
		console.log('this.props:'+this.props.name);
		console.log('nextProps:'+nextProps.name);
		this.setState({
			name : 'propsSet'
		})
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
	//组件即将销毁
	componentWillUnmount(){
		//这里通常用来取消一些操作，比如说定时器啥的
		console.log('子 componentWillUnmount');
	}
	//加载
	render(){
		console.log('子 render');
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
		console.log('初始化数据 父 constructor');
	}
	//判断子组件是否应该更新,默认为true
	shouldComponentUpdate(){
		console.log('父 shouldComponentUpdate');
		return true;
	}
	//组件将要更新
	componentWillUpdate(){
		console.log('父 componentWillUpdate');
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
	handleCilck(){
		console.log('更新props');
		this.setState({
			name : 'new props',
			wrma : 'wrma'
		});
	}
	deleteChild(){
		console.log('干掉子组件');
		this.setState({
			hasChild : false
		})
	}
	render(){
		console.log('父 render');
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