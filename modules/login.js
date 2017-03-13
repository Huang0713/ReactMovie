var React = require('react');

	
var Login = React.createClass({
	contextTypes: {          
		router: React.PropTypes.object
	},
	submitData: function(e){
		e.preventDefault();
		var userName = this.refs.inputEmail.value;
		console.log(userName)
		this.context.router.push({
			pathname: '/',
			state: userName
		});
	},
	render: function(){
		return (
			<div className="container">

		      <form className="form-signin">
		        <h2 className="form-signin-heading">Please sign in</h2>
		        <input type="email" id="inputEmail" ref="inputEmail" className="form-control" placeholder="Email address" required/>
		       <input type="password" id="inputPassword" ref="inputPassword" className="form-control" placeholder="Password" required/>
		        <div className="checkbox">
		          <label>
		            <input type="checkbox" value="remember-me"/> Remember me
		          </label>
		        </div>
		        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.submitData}>Sign in</button>
		      </form>
		
		    </div>
		)
	}
});

module.exports = Login;





 


    
