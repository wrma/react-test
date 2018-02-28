

import React from 'react';
import ReactDOM from 'react-dom';

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


ReactDOM.render(
	<div>
		<Parent/>
	</div>,
	document.querySelector('#app')
);