var ProfileInfo = React.createClass({
  propTypes: {
    email: React.PropTypes.string,
    name: React.PropTypes.string,
    nickname: React.PropTypes.string,
    favorite_color: React.PropTypes.string,
    image: React.PropTypes.string,
    signedIn: React.PropTypes.bool,
    configName: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      email:          '',
      name:           '',
      nickname:       '',
      favorite_color: '',
      image:          '',
      signedIn:       false,
      configName:     ''
    }
  },

  renderImage: function() {
    var src = "http://placehold.it/120x120";
    if (this.props.signedIn) {
      if (this.props.image) {
        src = this.props.image;
      } else {
        src = "https://placekitten.com/g/120/120";
      }
    }

    return(
      <img className='img-thumbnail' src={src} width="120" height="120" />
    );
  },

  render: function() {

    var sourceLink = <a href='https://github.com/lynndylanhurley/j-toker/blob/master/demo/src/scripts/components/profile-info.jsx' target='blank'>View component source</a>;

    return (
      <div>
        <label>email:</label>
        <p>{this.props.email || 'You are not logged in'}</p>
      </div>
    );
  }
});