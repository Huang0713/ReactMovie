var React = require('react'),
	Link = require('react-router').Link;

var NavLink = React.createClass({
	render:function(){
		return (
			<Link {...this.props} activeClassName="active" />
		)
	}
})

module.exports = NavLink;