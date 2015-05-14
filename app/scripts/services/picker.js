'use strict';

var PubSub = require('pubsub-js');

var THREE = require('three');
var RenderCtrl = require('../controllers/render');
var CameraCtrl = require('../controllers/camera');
var MeshCtrl = require('../controllers/mesh');

var Picker = function() {
  this._raycaster = new THREE.Raycaster();
  this._mouse = new THREE.Vector2();
  this._renderer = RenderCtrl.getRenderer();
  this._camera = CameraCtrl.getCamera();
  this._meshes = MeshCtrl.getMeshes();

  this._selected = null;

  this._initEvents();
};

Picker.prototype._initEvents = function() {
  this._renderer.domElement.addEventListener(
    'mousemove',
    this._onMouseMove.bind(this),
    false
  );

  this._renderer.domElement.addEventListener(
    'mousedown',
    this._onMouseDown.bind(this),
    false
  );

  this._renderer.domElement.addEventListener(
    'mouseup',
    this._onMouseUp.bind(this),
    false
  );
};

Picker.prototype._onMouseMove = function(e) {
  e.preventDefault();
  this._mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
  this._mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
};

Picker.prototype._onMouseDown = function(e) {
  e.preventDefault();

  var vector = new THREE.Vector3(this._mouse.x, this._mouse.y, 0.5 ).unproject( this._camera );
  var raycaster = new THREE.Raycaster( this._camera.position, vector.sub( this._camera.position ).normalize() );
  var intersects = raycaster.intersectObjects( this._meshes );

  if ( intersects.length > 0 ) {

    this._selected = intersects[ 0 ].object;
    PubSub.publish('Picker.intersect', {mesh: this._selected});
  }
};

Picker.prototype._onMouseUp = function(e) {

};

module.exports = Picker;