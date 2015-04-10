var SignOut = React.createClass({

  propTypes: function() {
    return {
      signedIn: React.PropTypes.bool
    }
  },

  getDefaultProps: function() {
    return {
      signedIn: false
    }
  },

  getInitialState: function() {
    return {
      isModalOpen: false,
      errors: null
    }
  },

  handleSignOutClick: function(ev) {
    Auth.signOut();
  },

  renderSuccessMessage: function() {
    return (
      <p>Goodbye!</p>
    );
  },

  renderErrorMessage: function() {
    return (
      <p>There was an error: {this.state.errors.join(', ')}</p>
    );
  },

  render: function() {
    var sourceLink = <a href='https://github.com/lynndylanhurley/j-toker/blob/master/demo/src/scripts/components/signout-form.jsx' target='blank'>View component source</a>;

    return (
      <div>
        <button className='btn btn-primary'
                onClick={this.handleSignOutClick}
                disabled={!Auth.loggedIn}>
          Sign Out
        </button>
      </div>
    )
  }
});