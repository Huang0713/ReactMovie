var React = require('react'),
	ReactDOM = require('react-dom');


//引入路由器内容

var Router = require('react-router').Router,
	Route = require('react-router').Route,
	hashHistory = require('react-router').hashHistory,
	IndexRoute = require('react-router').IndexRoute;
	
//引入主件模块
var App = require('./modules/app'),
	About = require('./modules/about'),
	Home = require('./modules/home'),
	Contact = require('./modules/contact'),
	Detail = require('./modules/detail'),
	SearchResult = require('./modules/SearchResult'),
	Login = require('./modules/login'),
	Register = require('./modules/register');
	

var Content = React.createClass({
	render: function(){
		return (
			<Router history={hashHistory}>
				<Route path='/' component={App}>
					<IndexRoute component={Home}/>
					<Route path='/detail/:id' component={Detail}/>						
					<Route path='/about' component={About}/>						
					<Route path='/contact' component={Contact}/>						
					<Route path='/SearchResult' component={SearchResult}/>						
					<Route path='/login' component={Login}/>						
					<Route path='/register' component={Register}/>						
				</Route>
			</Router>
		)
	}
});

ReactDOM.render(<Content/>,document.getElementById('container'));
