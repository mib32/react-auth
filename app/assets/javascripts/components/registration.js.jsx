var Registration = React.createClass({

  propTypes: function() {
    return {
      config: React.PropTypes.string
    }
  },

  getDefaultProps: function() {
    return {
      config: 'default'
    }
  },

  getInitialState: function() {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      favorite_color: '',
      sent_email: '',
      isModalOpen: false,
      errors: null
    };
  },
	handleInputChange: function(ev) {
  	nextState = {}
    nextState[ev.target.name] = ev.target.value;
    this.setState(nextState);
  },


  handleRegistrationClick: function(ev) {
  	ev.preventDefault();
    Auth.signup({
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }, function()  {
        this.setState({
          sent_email: this.state.email,
          email: '',
          password: '',
          password_confirmation: '',
          favorite_color: '',
          isModalOpen: true,
          errors: null
        });
      }.bind(this));
  },

  successModalTitle: 'Email Registration Success',
  errorModalTitle: 'Email Registration Error',

  renderSuccessMessage: function() {
    return (
      <p>
        An email was just sent to you at {this.state.sent_email}. Follow the
        instructions contained in the email to complete registration.
      </p>
    );
  },

  renderErrorMessage: function() {
    return (
      <p>There was an error: {this.state.errors.full_messages.join(', ')}</p>
    );
  },

  render: function() {
    var configParam = <span></span>;

    if (this.props.config !== 'default') {
      configParam = <span>&nbsp;&nbsp;config: '{this.props.config}',<br /></span>;
    }

    var sourceLink = <a href='https://github.com/lynndylanhurley/j-toker/blob/master/demo/src/scripts/components/registration-form.jsx' target='blank'>View component source</a>;

    return (
        <form>
          <input type='email'
                name='email'
                label='Email'
                placeholder='Enter email...'
                value={this.state.email}
                onChange={this.handleInputChange} />

          <input type='password'
                name='password'
                label='Password'
                placeholder='Enter password...'
                value={this.state.password}
                onChange={this.handleInputChange} />

          <input type='password'
                name='password_confirmation'
                label='Password Confirmation'
                placeholder='Enter password again...'
                value={this.state.password_confirmation}
                onChange={this.handleInputChange} />

          <button className='btn btn-primary'
                  onClick={this.handleRegistrationClick}>
            Register
          </button>
        </form>
    );
  }
});