var React = require('react'),
	NavLink = require('./navlink');


	
var Home = React.createClass({
	getDefaultProps: function(){
		return {
			url: "http://api.douban.com/v2/movie/top250"
		}
	},
	getInitialState: function(){
		return {
			movies: []
		}
	},
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
	render: function(){
		var len = this.state.movies.length,
			data = this.state.movies,
			list = [];
		if(len > 0){
			for(var i = 0;i < len; i++){
				var detailUtl = `/detail/${data[i].id}`,
					info = data[i];
				list.push(
					<div className="col-lg-3" key={i}>
			          <img className="img-circle" src={data[i].images}/>
			          <h3>{data[i].title}</h3>
			          <p>年代:&nbsp;{data[i].year}</p>
			          <p>类型:&nbsp;{data[i].genres}</p>
			          <p className="casts">主演:&nbsp;{data[i].casts}</p>
			          <p><NavLink to={{pathname:detailUtl,query:info}} className="btn btn-default" role="button">电影详情&raquo;</NavLink></p>
			        </div>
		        )
			}
		}
		return (
			<div className="container">
				<div className="row">
			        {list}
			    </div>
			</div>
		)
	}
});

module.exports = Home;
