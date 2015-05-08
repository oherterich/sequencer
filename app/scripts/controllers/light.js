'use strict';

var THREE = require('three');
var SceneCtrl = require('./scene');

var LightCtrl = function() {
  this._lights = [];

  // TEMP
  var light = new THREE.PointLight( 0xFFFFFF );
  light.position.set( 0, 0, 500 );
  SceneCtrl.add( light );
};

module.exports = LightCtrl;
