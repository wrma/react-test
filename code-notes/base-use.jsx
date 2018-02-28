

import React from 'react';
import ReactDOM from 'react-dom';

//1.基本用法
let jsx = <div>wrma</div>;

ReactDOM.render(jsx,document.querySelector('#app'));



//2.react样式
import './index.css'

let style = {
	// 行内样式样式的驼峰命名
	fontSize : '30px'
}
//注意这里为了不与es6中的类class关键字冲突，改为className
let jsx = <div className='jsx' style={style}>wrma</div>;

ReactDOM.render(jsx,document.querySelector('#app'));



//3.jsx数据处理
let name = 'wrma';
let fruits = ['apple','banana','pear'];
let flag = false;
//这里的括号是为了防止某些工具自动在换行时行尾加上分号
let jsx =(
	<div className='jsx'>
		{/*变量使用*/}
		<p>I am {name}</p>
		{/*在jsx中用大括号将js逻辑包裹起来*/}
		{
			flag ? <p>I am {name}</p> : <p>I am not {name}</p>
		}
		{/*数组循环*/}
		{
			// 箭头函数不用大括号包裹起来表示直接返回箭头后的东西
			//react要求数组中的每个值都有一个唯一的key值
			fruits.map((fruit,index) => <p key={index}>I like eat {fruit}</p>)
		}
	</div>
);

ReactDOM.render(jsx,document.querySelector('#app'));