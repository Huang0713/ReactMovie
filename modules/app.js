var React = require('react'),
	ReactDOM = require('react-dom');

//引入footer模块
var	Footer = require('./footer');

var App = React.createClass({
	getInitialState: function(){
		return {
			movies: []
		}
	},
	componentDidMount: function(){
		var userName = this.props.location.state;
		if(userName){
			ReactDOM.render(<HaveLogin userName={userName}/>,document.getElementById('login'));
		}else{
			ReactDOM.render(<NotLogin/>,document.getElementById('login'));
		}
		ReactDOM.render(<Footer/>,document.getElementById('footer'));
	},
	getDefaultProps: function(){
		return {
			url: "http://api.douban.com/v2/movie/top250"
		}
	},
	contextTypes: {          
		router: React.PropTypes.object
	},
	//进行ajax请求把自己需要的数据整理好放到movies以便使用
	componentWillMount: function(){
		var movies = [];
		var _this = this;
		$.ajax({
	         type : "get",
	         url : this.props.url, //跨域请求的URL
	         dataType : "jsonp",
	         success : function(data){ 

	         	var result = data.subjects;
		        for(var i = 0; i < result.length; i++){

					var obj = {}, //用对象形式存放的 movies 数组中
						empty = []; //零时数组，放置演员数组，然后添加到对象中

					obj.title = result[i].title;
					obj.year = result[i].year;
					obj.images = result[i].images.large;
					obj.genres = (result[i].genres).join('、');
					obj.id = result[i].id;

					for(var j = 0; j < result[i].casts.length; j++){
						var casts = result[i].casts[j].name;
						empty.push(casts);
					}
					obj.casts = empty.join('、');
					movies.push(obj);
				}
 				_this.setState({
 					movies: movies
 				});
			}
 		});
	},
	//把得到的值传送到指定的页面并且进行跳转
	NextLink: function(url,getMovies) {
		this.context.router.push({
			pathname: url,
			state: getMovies
		});
	},
	//获得inpu的值，来循环匹配电影名字，匹配成功放入getMovies数组
	getVlue: function(){
		var value = this.refs.search.value,
			movies = this.state.movies,
			len = movies.length,
			getMovies = [];
		//循环所有进行匹配
		if(len>0){
			if(!value){
				getMovies = [];
			}else{
				for(var i = 0; i < len; i++){
					//如果电影名称里有输入的值相同就放到getMovies里面
					if(movies[i].title.indexOf(value) !== -1){
						getMovies.push(movies[i]);
					}
				}
			}
		}
		var url = '/SearchResult';
		this.NextLink(url,getMovies);
	},
	render: function(){
		
		return (
				<div>
					<div className="navbar-wrapper">
			      <div className="container">
			
			        <nav className="navbar navbar-inverse navbar-static-top">
			          <div className="container">
			          
			            <div className="navbar-header">
			              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
			                <span className="sr-only">Toggle navigation</span>
			                <span className="icon-bar"></span>
			                <span className="icon-bar"></span>
			                <span className="icon-bar"></span>
			              </button>
			              <a className="navbar-brand" href="#">Project name</a>
			            </div>
			            
			            <div id="navbar" className="navbar-collapse collapse">
			              <ul className="nav navbar-nav">
			                <li className="active"><a href="#">Home</a></li>
			                <li><a href="#about">About</a></li>
			                <li><a href="#contact">Contact</a></li>
			                <li className="dropdown">
			                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">more <span className="caret"></span></a>
			                  <ul className="dropdown-menu">
			                    <li><a href="#">个人中心</a></li>
			                    <li><a href="#">开通会员</a></li>
			                    <li><a href="#">观看历史</a></li>
			                    <li role="separator" className="divider"></li>
			                    <li className="dropdown-header">Nav header</li>
			                    <li><a href="#">Separated link</a></li>
			                    <li><a href="#">One more separated link</a></li>
			                  </ul>
			                </li>
			              </ul>
			              <form className="navbar-form navbar-left" role="search">
							  <div className="form-group">
							    <input type="text" className="form-control" placeholder="霸王别姬" defaultValue="霸王别姬" ref='search'/>
							  </div>
							  <a onClick={this.getVlue} className="btn btn-default">搜索</a>
						  </form>
						  <div id="login"></div>
			            </div>
			            
			          </div>
			        </nav>
			        
			      </div>
			    </div>		
				{this.props.children}
				<div id='footer'></div>
			</div>
		)
	}
});


var HaveLogin = React.createClass({
	render: function(){
		return (
			<ul className="nav navbar-nav navbar-right" id="LogFrame">
		  		<li><a href="#">{this.props.userName}</a></li>
		  		<li><a href="#">back</a></li>
		 	</ul>
		)
	}
});

var NotLogin = React.createClass({
	render: function(){
		return (
			<ul className="nav navbar-nav navbar-right" id="LogFrame">
		  		<li><a href="#login">Login</a></li>
            	<li><a href="#register">Register</a></li>
		 	</ul>
		)
	}
});



module.exports = App;
