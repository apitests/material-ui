'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var ImageCrop32 = React.createClass({
  displayName: 'ImageCrop32',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V6h14v12z' })
    );
  }

});

module.exports = ImageCrop32;