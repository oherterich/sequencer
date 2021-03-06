'use strict';

var $ = require('jquery');
var THREE = require('three');
var SceneCtrl = require('./scene');

var CameraCtrl = function() {
  this._scene = SceneCtrl.getScene();

  this._options = CameraCtrl.options;
  this._camera = new THREE.PerspectiveCamera(
    this._options.fieldOfView,
    this._options.aspectRatio,
    this._options.near,
    this._options.far
  );

  this.setPosition(this._options.initPos);
  this._camera.lookAt(this._scene.position);
};

CameraCtrl.prototype.setPosition = function(pos) {
  this._camera.position.set(pos.x, pos.y, pos.z);
};

CameraCtrl.prototype.getCamera = function() {
  return this._camera;
};

CameraCtrl.options = {
  fieldOfView: 35,
  aspectRatio: $(window).width()/$(window).height(),
  near: 0.1,
  far: 10000,
  initPos: {
    x: 0,
    y: 0,
    z: 300
  }
};

module.exports = CameraCtrl;
