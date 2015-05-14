'use strict';

var $ = require('jquery');

//Controllers
var RenderCtrl = require('./controllers/render');
var LightCtrl = require('./controllers/light');
var MeshCtrl = require('./controllers/mesh');

var Picker = require('./services/picker');

$(document.body).ready(function() {
  this._renderer = RenderCtrl.getRenderer();
  this._light = new LightCtrl();
  this._mesh = MeshCtrl;
  this._picker = new Picker();

  RenderCtrl.update();
});