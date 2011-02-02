// ==========================================================================
// Project:   LabBenchDemo - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

var widget_width = (document.height-20)*3658/1481; // BAD ... NEVER use global objects!!
var widget_height = document.height-36;

// Functions
// This page describes the main user interface for your application.  
var hundred=0;
var ten=0;
var one=0;
var dem=0;
var flag=0;
var testtube = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "1");
var beaker = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "2");
var pipette = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "3");

// This page describes the main user interface for your application.  
LabBenchDemo.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.

  mainPane: SC.MainPane.design({	
		childViews: 'AppCanvas yellowpippView bluepippView ttubebtnView reloadView'.w(),
		
		    AppCanvas: SC.View.design({
		    	childViews: 'WidgetContainer AppToolbar'.w(),
				layout: { top: 10, left: 10, right: 10, bottom: 10 },
		      	backgroundColor:'white',
				
				WidgetContainer: SC.View.design ({
						
						childViews: 'LabImgView GraphView SafetyDisposalSelector PippetContainerSelector BubbleBathSolutionSelector LabJackSelector MuscleTissueSelector GasLineSelector'.w(),
						layout: {width: widget_width, height: widget_height, top: 36, centerX:0}, // centerX: -10 will offset 10px to the left from center
						
						originalwidthBinding: 'LabBenchDemo.bgPanning.originalwidth',
						originalheightBinding: 'LabBenchDemo.bgPanning.originalheight',
						zoomPosBinding: 'LabBenchDemo.bgPanning.zoomPos',
							
						LabImgView: SC.ImageView.design ({
				   		layout: {width: widget_width, height: widget_height},
							
							value: sc_static('resources/images/laboratory.svg'),
							useImageCache: YES, //Allows image to load in the background
							
							//Mouse Events
							mouseDown: LabBenchDemo.bgPanning.mouseDown,
							mouseDragged: LabBenchDemo.bgPanning.mouseDragged,
							mouseUp: LabBenchDemo.bgPanning.mouseUp,

							//Touch Events
							touchStart: LabBenchDemo.bgPanning.touchStart,
							touchEnd: LabBenchDemo.bgPanning.touchEnd,
							touchDragged: LabBenchDemo.bgPanningEnd

							}), //End of LabImgView
							
							GraphView: SC.View.design ({

								layout: {width: widget_width*0.158, height: widget_height*0.236, left: widget_width*0.2475/*317*/, top: widget_height*0.3825 /*234*/},
								childViews: 'jsxGraph1' .w(),
								backgroundColor:'black',

								jsxGraph1: SC.View.design({
									//Graph Created Using JSXGraph
								    layout: {width: widget_width*0.158, height: widget_height*0.236, centerX:0, centerY:0},
										
									classNames: "jxgbox",
									    layerDidChange: function() {
									      this.set('layerNeedsUpdate', YES);
									    }.observes('layer'),

									    updateLayer: function() {
										sc_super();
									    layer = this.get('layer');
											if (layer) {
												var brd = JXG.JSXGraph.initBoard(layer.id, {axis:true, originX: 10, originY: widget_height*0.236/2 /*Centre Y Axis Line*/, unitX: 1, unitY:20});
													brd.suspendUpdate();												
										        	//var point = [];   /*Define Points on Graph*/
										        	//point[0] = brd.create('point', [50,0], {style:6});
										        	brd.update();
										        	/*
													var pol = brd.lagrangePolynomial(point);
										        	var g = brd.create('functiongraph', [pol, -10, 10], {strokeWidth:3});
										        	var g2 = brd.create('functiongraph', [brd.D(pol), -10, 10],{dash:3, strokeColor:'#ff0000'});
													*/
													//var pol = brd.lagrangePolynomial(point);
													var g = brd.create('functiongraph', [function(x){return 2*Math.sin(x);},-Math.PI,100*Math.PI], {strokeWidth:1});
													brd.unsuspendUpdate();
										   	} //End if statement
										  }  //End of function
									}) //End of jsxGraph
								}), //End GraphView
								
								
								//---------------- Selectors -------------------------------------
								
								SafetyDisposalSelector: SC.View.design ({

									layout: {width: widget_width*0.086/*130*/, height: widget_height*0.24/*135*/, left: widget_width*0.02 /*33*/, top: widget_height*0.52/*315*/},
									classNames: 'ContextPanelSelector-unselected-border',
									
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										
										LabBenchDemo.contextPanelController.set('recordID' , 1);
										
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									}
									
								}), //End of SafetyDisposalSelector
								
								PippetContainerSelector: SC.View.design ({

									layout: {width: widget_width*0.0951/*150*/, height: widget_height*0.08/*60*/, left: widget_width*0.098/*145*/, top: widget_height*0.85/*510*/},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									
									
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 2);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									}
									
								}), //End of PippetContainerSelector
								
								BubbleBathSolutionSelector: SC.View.design ({

									layout: {width: widget_width*0.055/*90*/, height: widget_height*0.180/*120*/, left: widget_width*0.66/*1005*/, top: widget_height*0.04/*20*/},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 3);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									}
									
								}), //End of BubbleSolutionSelector	
								
								LabJackSelector: SC.View.design ({

									layout: {width: widget_width*0.138/*220*/, height: widget_height*0.335/*200*/, left: widget_width*0.43/*650*/, top: widget_height*0.45/*265*/},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 4);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									}
									
								}), //End of LabJackSelector
								
								MuscleTissueSelector: SC.View.design ({

									layout: {width: widget_width*0.055 /*90*/, height: widget_height*0.41875 /*200*/, left: widget_width*0.680 /*1035*/, top: widget_height*0.4 /*230*/},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 5);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									}
									
								}), //End of MuscleTissueSelector
								
								GasLineSelector: SC.View.design ({

									layout: {width: widget_width*0.078/*120*/, height: widget_height*0.255/*160*/, left: widget_width*0.885/*1350*/, top: widget_height*0.6/*360*/},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 6);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									}
									
								}) //End of GasLineSelector
								
								//--------------------- End of Selectors -----------------------
								
								/*RaphaelBeaker: SC.View.extend(SC.ContentDisplay, {
									
									classNames: 'Front',
									
						            layerDidChange: function() {
						                this.set('layerNeedsUpdate', YES);
						            }.observes('layer'),

						            updateLayer: function() {
						                sc_super();

										var canvas = Raphael(widget_width*0.081, widget_height*0.755, widget_width*0.1147/2, widget_height*0.3605/2);
																				
										
										//Variables for empty and full x_vals
										var empty_y = 100;
										var full_y = widget_height*0.03;

										var empty_height = 0;
										var full_height = widget_height*0.3605/2-widget_height*0.03

										var margin_x = widget_width*0.006; //Margin between side of canvas and liquid
										var margin_y = widget_width*0.082; //Margin between top of canvas and liquid high point
										
										//Draw Liquid (Xpos, Ypos, width, height )
										var liquid = canvas.rect(margin_x, full_y, 200-margin_y, full_height);
										//var liquid = canvas.rect(margin_x, empty_y, 200-margin_y, empty_height);
										
										liquid.attr('fill', '#990066');
										liquid.attr('stroke', '');
										
										
										//Beaker Image - Drawn After liquid so that it renders in front
										var beaker_image = canvas.image("static/lab_bench_demo/en/current/resources/images/beaker.png", 0, 0, widget_width*0.1147/2, widget_height*0.3605/2);

										//Animation
										var anim_time = 2000;
										//liquid.animate({y: empty_y, y: full_y}, anim_time);
										//liquid.animate({height: empty_height, height: full_height}, 4000);
										
										return YES;
									}
						        })*/
								
								
																
					}), //End of WidgetContainer
										
		
					AppToolbar: SC.ToolbarView.design ({
						
						childViews: 'AppTitleLabel ZoomOutBtn ZoomInBtn'.w(),
						
						layout: {top:0, left:0, right:0, height:36},
						anchorLocation: SC.ANCHOR_TOP,
						classNames: 'AppToolbar', //CSS Class
						
						AppTitleLabel: SC.LabelView.design ({
							layout: {height:26, width:200, top:5, left: 10},
							fontSize: SC.LARGE_SIZE,
							tagName:"h1",
							classNames:['AppTitleLabel'],
							value: "Biology Lab Simulation"
						}),
						
						ZoomOutBtn: SC.ButtonView.design ({
							layout: {height:32, width:32, top:2, bottom:2, right: 46},
							controlSize: SC.SMALL_CONTROL_SIZE,
							fontWeight: SC.BOLD_WEIGHT,
							classNames: "AppToolbarButtons",
							title: '<p>-</p>',
							target: "LabBenchDemo.bgPanning",
							action: "Zoom",
							direction: "in"
						}), //End of ZoomOutBtn
						
						ZoomInBtn: SC.ButtonView.design ({
							layout: {height:32, width:32, top:2, bottom:2, right: 10},
							controlSize: SC.SMALL_CONTROL_SIZE,
							classNames: "AppToolbarButtons",
							title: '<p>+</p>',
							target: "LabBenchDemo.bgPanning",
							action: "Zoom",
							 
							direction: "out"
						}) //End of ZoomInBtn
					}) //End of AppToolbar
		    	}), //End of AppCanvas View
			
			//Yellow Pippet
			yellowpippView: SC.ButtonView.design({
			layout: { left: 5, top: 241, width: 100, height: 100 },      
			title: " ",      
			action: 'createyellowPipp',    
			target: 'LabBenchDemo.creatController',


			classNames: ['yellowpipbtn toolbar']
			}),
				
				//Blue Pippet
		    bluepippView: SC.ButtonView.design({
			  layout: { left: 5, top: 141, width: 100, height: 100 },      
			  title: " ",      
			  action: 'createbluePipp',    
			  target: 'LabBenchDemo.creatController',

			  classNames: ['bluepipbtn toolbar']
			}),
				//Test Tube
		    ttubebtnView: SC.ButtonView.design({      
			  layout: { left: 5, top: 41, width: 100, height: 100 },      
			  title: " ",      
			  action: 'createTtube',    
			  target: 'LabBenchDemo.creatController',

			  classNames: ['ttubebtn toolbar']
		  }),
			
			//Button to Refresh Buttons
			reloadView: SC.ButtonView.design({      
			  layout: { left: 5, top: 341, width: 100, height: 100 },      
			  title: " ",      
			  action: 'destroyTtube',    
			  target: 'LabBenchDemo.creatController',


			  classNames: ['reload toolbar']    
		})
  }) //End of MainPane
}); //End LabBenchDemo.mainPage
