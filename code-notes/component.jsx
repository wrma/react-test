

import React from 'react';
import ReactDOM from 'react-dom';

//1.基础组件写法

//传统组件写法
function Component(){
	return <h1>wrma</h1>
}

//ES6组件写法
class ES6Component extends React.Component{
	render(){
		return <h1>wrma in es6</h1>
	}
}

ReactDOM.render(
	// return只能返回一个顶级的html节点
	<div>
		<Component/>
		<ES6Component/>
	</div>,
	document.querySelector('#app')
);



//2.state && props
class Component extends React.Component{
	constructor(){
		super();
		this.state = {
			name : 'wrma'
		}
	}
	render(){
		setTimeout(() => {
			this.setState({
				name : 'daemon'
			})
		},2000);
		return (
			<div>
				<h1>I am {this.state.name}</h1>
				<p>I am {this.props.age} yeas old</p>
			</div>
		);
	}
}

ReactDOM.render(
	<div>
		<Component age='20'/>
	</div>,
	document.querySelector('#app')
);


//3.事件处理
//事件处理1
class Component extends React.Component{
	constructor(){
		super();
		this.state = {
			name : 'wrma',
			age : 20
		}
		//修正this
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		//这里this指向的已不再是 Component,所以需要修正this
		this.setState({
			age : this.state.age + 1
		});
	}
	render(){
		return (
			<div>
				<h1>I am {this.state.name}</h1>
				<p>I am {this.state.age} yeas old</p>
				<button onClick={this.handleClick}>加一岁</button>
			</div>
		);
	}
}

//事件处理2
class Component extends React.Component{
	constructor(){
		super();
		this.state = {
			name : 'wrma',
			age : 20
		}
	}
	handleClick(){
		//这里this指向的已不再是 Component,所以需要修正this
		this.setState({
			age : this.state.age + 1
		});
	}
	render(){
		return (
			<div>
				<h1>I am {this.state.name}</h1>
				<p>I am {this.state.age} yeas old</p>
				{/*修正this*/}
				<button onClick={this.handleClick.bind(this)}>加一岁</button>
			</div>
		);
	}
}

//事件处理3
class Component extends React.Component{
	constructor(){
		super();
		this.state = {
			name : 'wrma',
			age : 20
		}
	}
	handleClick(){
		this.setState({
			age : this.state.age + 1
		});
	}
	valueChange(e){
		this.setState({
			age : parseInt(e.target.value)
		})
	}
	render(){
		return (
			<div>
				<h1>I am {this.state.name}</h1>
				<p>I am {this.state.age} yeas old</p>
				{/*由于箭头函数不占作用域，所以也可以利用箭头函数来修正this*/}
				<button onClick={() => this.handleClick()}>加一岁</button>
				<input type="text" onChange={(e) => this.valueChange(e)}/>
			</div>
		);
	}
}



//4.组件间的组合方式
//单纯组件
class Component extends React.Component{
	constructor(){
		super();
	}
	render(){
		return (
			<div>
				<h1>I am {this.props.name}</h1>
				<h3>单纯组件</h3>
				<p>这部分结构已在组件中写死</p>
			</div>
		);
	}
}

class App extends React.Component{
	render(){
		return (
			<div>
				<h1>app parent</h1>
				<hr/>
				{/*直接引用组件,通过props传参*/}
				<Component name='wrma'/>
			</div>
		);
	}
}

//容器式写法
class Component extends React.Component{
	constructor(){
		super();
	}
	render(){
		return (
			<div>
				<h1>I am {this.props.name}</h1>
				{this.props.children}
			</div>
		);
	}
}

class App extends React.Component{
	render(){
		return (
			<div>
				<h1>app parent</h1>
				<hr/>
				<Component name='wrma'>
					<h3>容器式组件</h3>
					<p>可以扩展出更多的结构，而无需在组件中写死</p>
				</Component>
			</div>
		);
	}
}


//5.子组件向父组件传值
class Child extends React.Component{
	constructor(){
		super();
	}
	handleClick(){
		// props属性是只读的，不允许在子元素中对他做出修改
		// this.props.bgColor = 'red';
		//子组件通过调用父组件传过来的方法，修改父组件中的state,即可达到从子组件向父组件传值的作用
		this.props.changeColor('red');
	}
	render(){
		return (
			<div>
				<h1>父组件背景色: {this.props.bgColor}</h1>
				<button onClick={() => {this.handleClick()}}>改变父组件颜色</button>
			</div>
		);
	}
}

class Parent extends React.Component{
	constructor(){
		super();
		this.state = {
			bgColor : '#999'
		}
	}
	onBgColorChange(color){
		this.setState({
			bgColor : color
		})
	}
	render(){
		return (
			<div style={{background: this.state.bgColor}}>
				{/*父组件通过props向子组件传递参数*/}
				<Child bgColor={this.state.bgColor} changeColor={(color) => {this.onBgColorChange(color)}}/>
			</div>
		);
	}
}


//6.兄弟组件间通信
//通过child1向父组件传递信息再由父组件传递给child2
class Child1 extends React.Component{
	constructor(){
		super();
	}
	handleClick(){
		this.props.changeChild2Color('red');
	}
	render(){
		return (
			<div>
				<h1>child1</h1>
				<button onClick={() => {this.handleClick()}}>改变child2颜色</button>
			</div>
		);
	}
}
class Child2 extends React.Component{
	constructor(){
		super();
	}
	render(){
		return (
			<div style={{background:this.props.child2BgColor}}>
				<h1>child2颜色：{this.props.child2BgColor}</h1>
			</div>
		);
	}
}

class Parent extends React.Component{
	constructor(){
		super();
		this.state = {
			child2BgColor : '#999'
		}
	}
	changeChild2Color(color){
		this.setState({
			child2BgColor : color
		})
	}
	render(){
		return (
			<div>
				<Child1 changeChild2Color={(color) => {this.changeChild2Color(color)}}/>
				<Child2 child2BgColor={this.state.child2BgColor}/>
			</div>
		);
	}
}
