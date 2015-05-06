'use strict';

var $ = require('jquery');

//Controllers
var RenderCtrl = require('./controllers/render');
var LightCtrl = require('./controllers/light');
var MeshCtrl = require('./controllers/mesh');

$(document.body).ready(function() {
  this._renderCtrl = new RenderCtrl();
  this._renderer = this._renderCtrl.getRenderer();
  this._light = new LightCtrl();
  this._mesh = new MeshCtrl();

  this._renderCtrl.update();
});