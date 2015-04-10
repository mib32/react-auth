//= require_tree ./components
var Auth = {
  login: function(email , pass, cb) {
    if (cb) cb(true);
    if (localStorage.current_user) {
      this.onChange(this.user());
      return;
    }
    $.post('/users/sign_in', { user: { email: email, password: pass } }, function(user, status, xhr){
    	localStorage.current_user = JSON.stringify(user);
    	Auth.onChange(user);
    }, 'JSON')
  },

  signup: function(params, cb) {
  	if (cb) cb(true);
  	$.post('/users', { user: params }, function(user,status,xhr){
  		localStorage.current_user = JSON.stringify(user);
  		Auth.onChange(user);
    }, 'JSON')
  },

  getToken: function () {
    return localStorage.current_user;
  },

  signOut: function (cb) {
  	$.ajax({
  		url: '/users/sign_out ',
  		type: 'DELETE',
  		success: function(){
  			delete localStorage.current_user;
  			if (cb) cb();
  			Auth.onChange(false);
  		}});
  },
  user: function(){
  	if (localStorage.current_user){
	  	return JSON.parse(localStorage.current_user);
  	}else{
  		return false;
  	}
  },

  loggedIn: function () {
    return !!localStorage.current_user;
  },

  onChange: function () {}
};

var HomePage = React.createClass({
  getInitialState: function() {
    return {
      user: Auth.user()
    };
  },

  propTypes: {
    user: React.PropTypes.object
  },

  componentWillMount: function() {
    Auth.onChange = this.setStateOnAuth;
    Auth.login();
  },
  setStateOnAuth: function(user) {
  	console.log(123);
    this.setState({
      user: user
    });
  },

  getDefaultProps: function() {
    return {
      user: {}
    };
  },

  render: function() {
    return (
          <div>
	          <ProfileInfo {...this.state.user} />
	          <SignOut {...this.props.user} />
	          <SignIn {...this.props.user} />
	          <Registration {...this.props.user} />
          </div>
    );
  }
});

$(document).ready(function(){
	  React.render(
	    <HomePage />,
	    document.getElementById('content')
	  );
});