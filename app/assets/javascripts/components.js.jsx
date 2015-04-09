//= require_tree ./components
var Auth = $.auth;
  Router       = ReactRouter,
  Route        = Router.Route,
	DefaultRoute = Router.DefaultRoute,
	RouteHandler = Router.RouteHandler,
	HomePage     = 12,
	BS           = ReactBootstrap,
	Navbar       = BS.Navbar,
	Nav          = BS.Nav,
	Input        = BS.Input,
	Button             = BS.Button,
  Modal              = BS.Modal,
	NavItem      = BS.NavItem,
	Panel          = BS.Panel,
	Grid           = BS.Grid,
	Row            = BS.Row,
	Col            = BS.Col,
	Well           = BS.Well,
	PubSub 			 = PubSub;

var HomePage = React.createClass({

  componentWillMount: function() {
    $('body').toggleClass('evil', false);
  },

  propTypes: {
    user: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      user: {}
    };
  },

  render: function() {
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6}>
            <ProfileInfo {...this.props.user} />
          </Col>

          <Col xs={12} sm={6}>
            <SignIn {...this.props.user} />
          </Col>

          <Col xs={12} sm={6}>
            <SignOut {...this.props.user} />
          </Col>

          <Col xs={12} sm={6}>
            <Registration />
          </Col>
        </Row>
      </Grid>
    );
  }
});

Auth.configure([
  {
    default: {
      apiUrl:  '',
      proxyIf: function() { return window.isOldIE(); }
    }
  }
]);

var App = React.createClass({
  getInitialState: function() {
    return {
      user: Auth.user
    };
  },

  // update the user state on all auth-related events
  componentWillMount: function() {
    // PubSub.subscribe('auth', function() {
      // this.setState({user: Auth.user});
    // }.bind(this));
  },

  render: function() {
    return (
      <div>

        {/* placeholder for page content*/}
        <RouteHandler {...this.state} />

      </div>
    );
  }
});

var routes = (
  <Route handler={App} path='/'>
    <DefaultRoute name='home' handler={HomePage} />
  </Route>
);

$(document).ready(function(){
	Router.run(routes, function(Handler) {
	  var params = {
	    user: Auth.user
	  };

	  React.render(
	    <Handler />,
	    document.getElementById('content')
	  );
	})
});