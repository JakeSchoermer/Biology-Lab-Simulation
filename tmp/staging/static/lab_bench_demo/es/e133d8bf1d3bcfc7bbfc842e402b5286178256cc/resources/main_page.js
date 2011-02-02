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
						
						childViews: 'LabImgView SafetyDisposalSelector PippetContainerSelector BubbleBathSolutionSelector LabJackSelector MuscleTissueSelector GasLineSelector'.w(),
						layout: {width: widget_width, height: widget_height, top: 36, centerX:0}, // centerX: -10 will offset 10px to the left from center
						
						originalwidthBinding: 'LabBenchDemo.bgPanning.originalwidth',
						originalheightBinding: 'LabBenchDemo.bgPanning.originalheight',
						zoomPosBinding: 'LabBenchDemo.bgPanning.zoomPos',
							
						LabImgView: SC.ImageView.design ({
				   		layout: {width: widget_width, height: widget_height},
							
							value: '/static/lab_bench_demo/es/e133d8bf1d3bcfc7bbfc842e402b5286178256cc/resources/images/laboratory.svg',
							useImageCache: YES, //Allows image to load in the background
							
							//Mouse Events
							mouseDown: LabBenchDemo.bgPanning.mouseDown,
							mouseDragged: LabBenchDemo.bgPanning.mouseDragged,
							mouseUp: LabBenchDemo.bgPanning.mouseUp,

							//Touch Events
							touchStart: LabBenchDemo.bgPanning.touchStart,
							touchEnd: LabBenchDemo.bgPanning.touchEnd,
							touchDragged: LabBenchDemo.bgPanningEnd,

							}), //End of LabImgView
							
						
								
								
								//---------------- Selectors -------------------------------------
								
								SafetyDisposalSelector: SC.View.design ({

									layout: {width: 130, height: 135, left: 33, top: 315},
									classNames: 'ContextPanelSelector-unselected-border',
									
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										
										LabBenchDemo.contextPanelController.set('recordID' , 1);
										
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									},
									
								}), //End of SafetyDisposalSelector
								
								PippetContainerSelector: SC.View.design ({

									layout: {width: 150, height: 60, left: 145, top: 510},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									
									
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 2);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									},
									
								}), //End of PippetContainerSelector
								
								BubbleBathSolutionSelector: SC.View.design ({

									layout: {width: 90, height: 120, left: 1005, top: 20},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 3);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									},
									
								}), //End of BubbleSolutionSelector	
								
								LabJackSelector: SC.View.design ({

									layout: {width: 220, height: 200, left: 650, top: 265},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 4);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									},
									
								}), //End of LabJackSelector
								
								MuscleTissueSelector: SC.View.design ({

									layout: {width: 90, height: 250, left: 1035, top: 230},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 5);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									},
									
								}), //End of MuscleTissueSelector
								
								GasLineSelector: SC.View.design ({

									layout: {width: 120, height: 160, left: 1350, top: 360},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 6);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									},
									
								}), //End of GasLineSelector
								
								
								//--------------------- End of Selectors -----------------------
																
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
