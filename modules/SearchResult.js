var React = require('react'),
	NavLink = require('./navlink');
	
var SearchResult = React.createClass({

	render: function(){
		var movies = this.props.location.state;
		if(movies.length === 0){
			var list = <h2>亲，您搜索的电影不存在，请重新搜索！</h2>
		}else{
			
			var list = [];
			for(var key in movies){
				var detailUtl = `/detail/${movies[key].id}`,
					info = movies[key];
				list.push(
					<div key={movies[key].id} className="col-lg-3">
			          <p><img className="img-circle" src={movies[key].images}/></p>
			          <h3>{movies[key].title}</h3>
			          <p>年代:&nbsp;{movies[key].year}</p>
			          <p>类型:&nbsp;{movies[key].genres}</p>
			          <p className="casts">主演:&nbsp;{movies[key].casts}</p>
			          <p><NavLink to={{pathname:detailUtl,query:info}} className="btn btn-default" role="button">电影详情&raquo;</NavLink></p>
			        </div>
				)
			}

		}
		return (
			<div className="container">
				<p>查询结果</p>
				{list}
			</div>
		)
	}
});

module.exports = SearchResult;