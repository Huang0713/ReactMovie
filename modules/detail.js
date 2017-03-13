var React = require('react'),
	ReactDOM = require('react-dom'),
	Remarkable = require('remarkable');

var data = [
            {userName: "Pete Hunt", text: "This is one comment", time: "2017-03-11"},
            {userName: "Jordan Walke", text: "This is *another* comment", time: "2017-03-12"},
            {userName: "Tom",text: "this is dog", time: "2017-03-13"}
		];
	
var Detail = React.createClass({
	getInitialState: function(){
		var id = this.props.location.query.id,
			path = 'http://api.douban.com/v2/movie/subject/' + id;
		return {
			url: path,
			summary: "",
			txt: "",
			comment: []
		}
	},
	componentWillMount: function(){
		var id = 265843,
			path = 'http://localhost:3000/' + id;
		
		var _this = this;
		$.ajax({
	         type : "get",
	         url : this.state.url, //'http://api.douban.com/v2/movie/subject/1764796'
	         dataType : "jsonp",
	         success : function(data){ 
				_this.setState({
					summary: data.summary
				})
			}
 		});
 		$.ajax({url:path,async:false}).then(function(data){
			_this.setState({
				comment: data
			});
		});
	},
	componentDidMount: function(){
		if(data.length > 0){
			ReactDOM.render(<CommentBox data={data}/>,document.getElementById('commentItem'));
		}else{
			ReactDOM.render(<CommentFormTranscript/>,document.getElementById('commentItem'));
		}
	},
	handlerSubmit: function(){
		var value = this.refs.txt.value;
		this.setState({
			txt: value
		})
	},
	render: function(){
		var info = this.props.location.query;
		return (
			<div className="container">
				<div className='row'>
					<div className="col-lg-5">
						<div><img src={info.images}/></div>
						<h1>{info.title}</h1>
						<p>年代:{info.year}</p>
						<p>类型:{info.genres}</p>
						<p>主演:{info.casts}</p>
					</div>
					<div className="col-lg-7">
						{this.state.summary}
					</div>
				</div>
				<div id="commentItem">
					
				</div>
			</div>
		)
	}
});

var CommentBox = React.createClass({
	getInitialState: function(){
		return {
			data: []
		};
	},
	onCommentSubmit: function(comment){
		data.push(comment);
		var _this = this;
		setTimeout(function(){
			_this.setState({
				data: data
			});
		},500);
	},
	componentDidMount: function(){
		var _this = this;
		setTimeout(function(){
			_this.setState({
				data: data
			})
		},2000);
	},
	render: function(){
		return (
			<div className="CommentBox">
				<CommentForm onCommentSubmit={this.onCommentSubmit}/>
				<CommentList data={this.props.data}/>
			</div>
		)
	}
});

var CommentList = React.createClass({
	render: function(){
		if(this.props.data.length === 0){
			return;
		}else{
			var commentNodes = this.props.data.map(function(comment){
				return (
					<Comment userName={comment.userName} time={comment.time} key={comment.time}>
						{comment.text}
					</Comment>
				)
			});
		}
		
		return (
			<div className="CommentList">
				{commentNodes}
			</div>
		)
	}
});

var Comment = React.createClass({
	rawMarkup: function(){
		var md = new Remarkable(),
		rawMarkup = md.render(this.props.children.toString());
			return {
				__html: rawMarkup
			};
	},
	render: function(){
		return (
			<div className="Comment">
				<p>
					<strong>{this.props.userName}&nbsp;&nbsp;&nbsp;&nbsp;</strong>
					<span>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.time}</span>
				</p>
				<span dangerouslySetInnerHTML={this.rawMarkup()}/>
			</div>
		)
	}
});

var CommentForm = React.createClass({
	getTime: function(){
		var date = new Date(),
		time = {   
			year: date.getFullYear(),
		    month : date.getMonth()+1,                 //月份   
		    day : date.getDate(),                    //日   
		    hour : date.getHours(),                   //小时   
		    mimute : date.getMinutes(),                 //分   
		    seconde : date.getSeconds()          //毫秒   
		};
		return `${time.year}-${time.month}-${time.day}  ${time.hour}:${time.mimute}:${time.seconde}`;
	},
	getInitialState: function(){
		return {
			text: ''
		}
	},
	handleTextChange: function(e){
		this.setState({
			text: e.target.value
		})
	},
	handleSubmit: function(e){
		var text = this.state.text,
			time = this.getTime(),
			userName = 'xiaoming';
		if(!userName){
			alert('用户名不能为空')
		};
		if(!text){
			return;
		};
		
		var comment = {userName: userName, text: text, time: time};
		
		
		$.ajax({
		    type: 'POST',
		    url: 'http://localhost:3000/123456',
		    data: {
			    "username": userName,
			    "time": time,
			    "comment": text
		    }
		});
		 
		 
		this.props.onCommentSubmit(comment);
		this.setState({
			text: ''
		})
	},
	render: function(){
		return (
			<div className="CommentForm">
				<textarea id='textarea' ref='txt' onChange={this.handleTextChange} value={this.state.text}></textarea>
				<button id='submit' onClick={this.handleSubmit}>提交</button>
			</div>
		)
	}
});


//当电影没有评论是时直接渲染CommentFormTranscript
var CommentFormTranscript = React.createClass({
	getTime: function(){
		var date = new Date(),
		time = {   
			year: date.getFullYear(),
		    month : date.getMonth()+1,                 //月份   
		    day : date.getDate(),                    //日   
		    hour : date.getHours(),                   //小时   
		    mimute : date.getMinutes(),                 //分   
		    seconde : date.getSeconds()          //毫秒   
		};
		return `${time.year}-${time.month}-${time.day}  ${time.hour}:${time.mimute}:${time.seconde}`;
	},
	getInitialState: function(){
		return {
			text: '',
			data: []
		}
	},
	handleTextChange: function(e){
		this.setState({
			text: e.target.value
		})
	},
	handleSubmit: function(e){
		var text = this.state.text,
			time = this.getTime(),
			userName = 'xiaoming';
		if(!userName){
			alert('用户名不能为空')
		};
		if(!text){
			return;
		};
		var comment = {userName: userName, text: text, time: time};
		data.push(comment);
		this.setState({
			data: data
		});
		if(comment){
			ReactDOM.render(<CommentBox data={data}/>,document.getElementById('commentItem'));
		}else{
			ReactDOM.render(<CommentFormTranscript/>,document.getElementById('commentItem'));
		}
		this.setState({
			text: ''
		})
	},
	render: function(){
		return (
			<div className="CommentForm">
				<textarea id='textarea' ref='txt' onChange={this.handleTextChange} value={this.state.text}></textarea>
				<button id='submit' onClick={this.handleSubmit}>提交</button>
				<p>这部电影暂无评论.亲!赶紧评论吧!</p>
			</div>
		)
	}
});

module.exports = Detail;