'use strict';

var THREE = require('three');
var SceneCtrl = require('./scene');

var MeshCtrl = function() {
  // TEMP
  var geometry = new THREE.BoxGeometry( 50, 50, 50 );
  var material = new THREE.MeshLambertMaterial( { color: 0xFF0000 } );
  var mesh = new THREE.Mesh( geometry, material );
  SceneCtrl.add( mesh );
};

module.exports = MeshCtrl;