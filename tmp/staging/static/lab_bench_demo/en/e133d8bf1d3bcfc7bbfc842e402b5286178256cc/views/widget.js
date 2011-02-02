// ==========================================================================
// Project:   LabBenchDemo.WidgetView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your View Here)

  @extends SC.View
*/

sc_require('views/my_drag');
var openTT = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "1");
var closedTT = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "2");
var pipette = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "4");
var testtube = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "3");
var ttubefill = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "5");
	
	
LabBenchDemo.WidgetView = LabBenchDemo.MyDragView.extend({
	layout: {centerX:0,centerY:0,width:252, height:400},			 
	//layout: { left:  0, top: 0, width: 200, height: 250 },
	//widgetPicture: openTT.get('picture'),
	//fillLevel: 0,
	classNames:['widget'],
	
	//topImage: openTT.get('picture'),    
	childViews: 'toolView frontView backView'.w(),
    toolView:SC.View.extend({
		layout:{right:0, top:0, width:50, height:50},
		backgroundColor: 'lightblue',        
		classNames: ['face'],
		isVisible: NO,
		childViews:'mixButton tooltwoButton'.w(),
      mixButton: SC.ButtonView.design({
			layout:{top:0,centerX:0,width:40,height:15},
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
			title:  "MIX",
			action: "mix",
			
			targetBinding: '.parentView.parentView',
			classNames: ['face']
		}),
		tooltwoButton: SC.ButtonView.design({
			layout:{top:20,centerX:0,width:40,height:15},
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
			action: 'destroy',    
			target: 'LabBenchDemo.creatController',
			title:  "tool2",
			classNames: ['face']
		})	
	}),
	frontView: SC.View.extend({
		layout: { width: openTT.get('x')+20, height: openTT.get('y')+20 },
		backgroundColor: 'blue',        

		widgetPicture: openTT.get('picture'),
		classNames: ['face', 'front'],
		childViews: 'conButton flipButton topImage'.w(),
		
		topImage: SC.ImageView.design({
		layout:{centerX:0, bottom:0, width:openTT.get('x'), length:openTT.get('y')},
		useImageCache: YES,
		contentBinding:'.parentView',
		contentValueKey:'widgetPicture',
		classNames:['image']	
		}),
		conButton: SC.ButtonView.extend({
		      layout: {top: 5, right: 5, width:15,height:15},
		      controlSize: SC.SMALL_CONTROL_SIZE,
			  titleMinWidth: 0,
			  action: "visibleTool",	
		      icon: 'sc-icon-options-16',
			  targetBinding: '.parentView.parentView',
		//      classNames: ['face'],
			  classNames: ['face','conButton']
		    }),
		flipButton: SC.ButtonView.extend({
			layout: { bottom: 5, right: 5, width: 16, height: 16 },
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
			title:  "i",
			action: "doFlip",
			targetBinding: '.parentView.parentView',
			classNames: ['face']
		})
	}),
 	backView: SC.View.extend({
		layout: { width: 196, height: 196 },
		classNames:['face', 'back'],
		childViews: 'changeButton selectButton doneButton '.w(),
		changeButton: SC.ButtonView.extend({
			layout: { bottom: 5, left: 5, width: 100, height: 16 },
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
		   	title:  "change",
		    action: 'changeView',    
			target: 'LabBenchDemo.creatController',
		    classNames: ['face']
		}),
		selectButton: SC.SelectButtonView.extend({
			layout: { top: 70, centerX: 0, width: 150, height:100 },	
			//Type1 - selectionValue not defined by the user
			title: 'containers',
			objects: [ { title: "testtube", icon: 'select-button-icon'},
			//openTT     { title: "beaker", icon: 'select-button-icon'},
				{ title: "pipette", icon: 'select-button-icon'}],
				//{ title: "pipette", icon: 'select-button-icon', pos: 3 }],
				//{ title: "lemon", icon: 'select-button-icon', pos: 4 }],
			nameKey: 'title',
		    theme: 'square',
		    iconKey: 'icon',
		    value: 'chicolate',
		    valueKey: 'title'
			//checkboxEnabled: YES
		}),
		doneButton: SC.ButtonView.extend({
			layout: { bottom: 5, right: 5, width: 40, height: 16 },
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
			title:  "Done",
			action: "doFlip",
			targetBinding: '.parentView.parentView',
			classNames: ['face']
		})
	}),
	doFlip: function() {
		var idx;
		var classArray = this.get('classNames');
		console.log(classArray.join(','));
		if ((idx = classArray.indexOf('flipped')) != -1) {
			classArray.splice(idx, 1);
		} else {
			classArray[classArray.length] = 'flipped';
		}
		this.set('classNames', classArray);
		this.set('layerNeedsUpdate', true);
	},
	changePicture: function() {
		var val = this.backView.selectButton.get('value');
		if (val == 'testtube'){
			this.set('widgetPicture',openTT.get('picture'));
			this.frontView.set('layout',{ width: openTT.get('x')+20, height: openTT.get('y')+20 });
			this.frontView.topImage.set('layout', {centerX: 0, top: 5, width: openTT.get('x'), height: openTT.get('y')});
		}
		if (val == 'pipette') { // pippette is so big one, and it's a problem here, making a small image can solve this problem
			this.set('widgetPicture', pipette.get('picture'));
			this.frontView.set('layout',{ width: pipette.get('x')+20, height: pipette.get('y')+20 });
			this.frontView.topImage.set('layout', {centerX: 0, top: 5, width: pipette.get('x'), height: pipette.get('y')});
		}
	},
/*	init: function() {
		arguments.callee.base.apply(this,arguments);
		this.set('layout', {left:10,top:10,width:252, height:250});
		//this.cardView.set('layout',{ left:  0, top: 0, width: 200, height: 250 });
	},*/
	visibleTool: function(){
		console.log("visible");
		var val= this.toolView.get('isVisible');
		var distance = this.frontView.get('layout');
		console.log(distance.width);
		this.toolView.set('layout',	{left:(distance.width+3), top:0, width:50, height:50});
		
     	if(val==YES) {
			this.toolView.set('isVisible',NO);
		}
		if(val==NO) {
			this.toolView.set('isVisible',YES);
		}
	},
	mix: function() {
	      var idx;
	      var classArray = this.get('classNames');

	      this.frontView.set('widgetPicture', closedTT.get('picture'));
		  this.frontView.set('layout',{ width: closedTT.get('x')+20, height: closedTT.get('y')+20 });
		  this.frontView.topImage.set('layout', {centerX: 0, top: 5, width: closedTT.get('x'), height: closedTT.get('y')});

	      console.log(classArray.join(','));
	      if ((idx = classArray.indexOf('mix')) == -1) { 
		    classArray[classArray.length] = 'mix';
		  }
		  this._timer = SC.Timer.schedule({ target: this, action: "unmix", repeats: NO, interval: 1000 });
	      this.set('layerNeedsUpdate', true);
	      this.set('classNames', classArray);
	      this.toolView.set('isVisible',NO);
	  },

	unmix: function() {
	      var idx;
	      var classArray = this.get('classNames');

	      console.log(classArray.join(','));
	      if ((idx = classArray.indexOf('mix')) != -1) {
	      classArray.splice(idx, 1);
	      }
	  this.set('layerNeedsUpdate', true);
	  this.set('classNames', classArray);
	  this.toolView.set('isVisible',NO);

	  //   this.cardView.set('widgetPicture',openTT.get('picture'));
	//    this.cardView.set('background', lightblue);
//		this.frontView.frontView.set('layout',{ width: closedTT.get('x')+20, height: closedTT.get('y')+20 });
//		this.frontView.frontView.topImage.set('layout', {centerX: 0, top: 5, width: closedTT.get('x'), height: closedTT.get('y')});
		}
});
