// ==========================================================================
// Project:   LabBenchDemo.MyDragView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
LabBenchDemo.MyDragView = SC.View.extend(
/** @scope LabBenchDemo.MyDragView.prototype */ {

  touchStart: function(touch) {
    var f = this.get("frame");
    this._touch = {
      start: { x: touch.pageX, y: touch.pageY },
      ourStart: { x: f.x, y: f.y, width: f.width, height: f.height }
    };
    return YES; // or we won't get touchesDragged
  },

  touchesDragged: function(evt, touches) {
    var t = this._touch;
    var f = this.get("frame");
    var parentf = this.get('parentView').get("frame");
    var locleft, loctop;

    // handle X direction
    locleft = t.ourStart.x + evt.pageX - t.start.x;
    if (locleft < 0) {
      locleft = 0;
    }
    else if (locleft >= (parentf.width - f.width)) {
      locleft = (parentf.width - f.width);
    }
    // handle Y direction
    loctop = t.ourStart.y + evt.pageY - t.start.y;
    if (loctop < 0) {
      loctop = 0;
    }
    else if (loctop >= (parentf.height - f.height)) {
      loctop = (parentf.height - f.height);
    }

    this.set("layout", { 
      left: locleft,
      top: loctop,
      width: t.ourStart.width,
      height: t.ourStart.height
    });
  },

  touchEnd: function () {
    // actually, we don't need to do anything here...
  },
  extend: function(){
	arguments.callee.base.apply(this,arguments);
	
},

  // and now, redirect mouse events :)
  mouseDown: function(evt) {
    this.touchStart(evt);
  },

  mouseDragged: function(evt) {
    this.touchesDragged(evt);
  },

  mouseUp: function(evt) {
    this.touchEnd(evt);
  }

});
