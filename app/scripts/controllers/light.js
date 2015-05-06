'use strict';

var THREE = require('three');
var SceneCtrl = require('./scene');

var LightCtrl = function() {
  this._lights = [];

  // TEMP
  var light = new THREE.PointLight( 0xFFFF00 );
  light.position.set( 10, 50, 130 );
  SceneCtrl.add( light );
};

module.exports = LightCtrl;
