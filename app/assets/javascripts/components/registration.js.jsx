var Registration = React.createClass({
  mixins: [
    ResponseModalMixin,
    FormStateMixin
  ],

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

  handleRegistrationClick: function() {
    Auth.emailSignUp({
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      favorite_color: this.state.favorite_color,
      config: this.props.config
    })
      .then(function()  {
        this.setState({
          sent_email: this.state.email,
          email: '',
          password: '',
          password_confirmation: '',
          favorite_color: '',
          isModalOpen: true,
          errors: null
        });
      }.bind(this))
      .fail(function(resp) {
        this.setState({
          isModalOpen: true,
          errors: resp.data.errors
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
      <Panel header='Register by Email' bsStyle='info' >
        <form>
          <Input type='email'
                name='email'
                label='Email'
                placeholder='Enter email...'
                value={this.state.email}
                onChange={this.handleInputChange} />

          <Input type='password'
                name='password'
                label='Password'
                placeholder='Enter password...'
                value={this.state.password}
                onChange={this.handleInputChange} />

          <Input type='password'
                name='password_confirmation'
                label='Password Confirmation'
                placeholder='Enter password again...'
                value={this.state.password_confirmation}
                onChange={this.handleInputChange} />

          <Input type='text'
                name='favorite_color'
                label='Favorite Color'
                placeholder='Enter your favorite color...'
                value={this.state.favorite_color}
                onChange={this.handleInputChange} />

          <Button className='btn btn-primary'
                  onClick={this.handleRegistrationClick}>
            Register
          </Button>
        </form>

      </Panel>
    );
  }
});