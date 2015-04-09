var SignIn = React.createClass({
  propTypes: function() {
    return {
      signedIn: React.PropTypes.bool,
      config: React.PropTypes.string
    }
  },

  getDefaultProps: function() {
    return {
      signedIn: false,
      config: 'default'
    }
  },

  getInitialState: function() {
    return {
      email: '',
      password: '',
      isModalOpen: false,
      errors: null
    };
  },

  handleInputChange: function(ev) {
  	nextState = {}
    nextState[ev.target.name] = ev.target.value;
    this.setState(nextState);
  },

  handleSignInClick: function(ev) {
  	ev.preventDefault();
    Auth.login(this.state.email, this.state.password , function(resp) {
				this.setState({
				  email: '',
				  password: '',
				  errors: null,
				  isModalOpen: true
			});
		}.bind(this));
	},

  successModalTitle: 'Email Sign In Success',
  errorModalTitle: 'Email Sign In Error',

  renderSuccessMessage: function() {
    return (
      <p>Welcome {Auth.user.email}!</p>
    );
  },

  renderErrorMessage: function() {
    return (
      <p>There was an error: {this.state.errors.join(', ')}</p>
    );
  },


  render: function() {
    var configParam = <span></span>;

    if (this.props.config !== 'default') {
      configParam = <span>&nbsp;&nbsp;config: '{this.props.config}',<br /></span>;
    }

    var sourceLink = <a href='https://github.com/lynndylanhurley/j-toker/blob/master/demo/src/scripts/components/login-form.jsx' target='blank'>View component source</a>;

    return (
        <form>
          <input type='email'
                name='email'
                label='Email'
                placeholder='Enter email...'
                disabled={this.props.signedIn}
                value={this.state.email}
                onChange={this.handleInputChange} />

          <input type='password'
                name='password'
                label='Password'
                placeholder='Enter password...'
                disabled={this.props.signedIn}
                value={this.state.password}
                onChange={this.handleInputChange} />

          <button className='btn btn-primary'
                  onClick={this.handleSignInClick}
                  disabled={this.props.signedIn}>
            Sign In
          </button>
        </form>

    );
  }
});