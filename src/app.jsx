

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