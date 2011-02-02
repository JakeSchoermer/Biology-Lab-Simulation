(function(){var a="sproutcore/standard_theme";if(!SC.BUNDLE_INFO){throw"SC.BUNDLE_INFO is not defined!"
}if(SC.BUNDLE_INFO[a]){return}SC.BUNDLE_INFO[a]={requires:["sproutcore/empty_theme"],styles:["/static/sproutcore/standard_theme/en/8b65428a7dcfa2226586b487bde1bf11560de2aa/stylesheet-packed.css","/static/sproutcore/standard_theme/en/8b65428a7dcfa2226586b487bde1bf11560de2aa/stylesheet.css"],scripts:["/static/sproutcore/standard_theme/en/8b65428a7dcfa2226586b487bde1bf11560de2aa/javascript-packed.js"]}
})();LabBenchDemo=SC.Application.create({NAMESPACE:"LabBenchDemo",VERSION:"0.1.0",store:SC.Store.create().from(SC.Record.fixtures)});
var zoomFactorArray=[0.1,0.25,0.5,0.75,1,1.25,1.33,1.5,1.75,2];LabBenchDemo.bgPanning=SC.ObjectController.create({zoomPos:4,_originalwidth:null,originalwidth:function(){var a=this._originalwidth;
if(!a){a=(document.height-20)*3658/1481}return a}.property(),_originalheight:null,originalheight:function(){var a=this._originalheight;
if(!a){a=document.height-36}return a}.property(),Zoom:function(c,b){var g=c.get("direction"),f=this.get("zoomPos"),d=this.get("originalwidth"),h=this.get("originalheight");
if(g==="out"){if(f>=0&f<zoomFactorArray.length-1){f++}else{alert("Cannot Zoom In Any Further!")
}}else{if(g==="in"){if(f>0&f<zoomFactorArray.length){f--}else{alert("Cannot Zoom Out Further!")
}}else{alert("Zoom got called, but I don't know what button you pressed?")}}LabBenchDemo.mainPage.mainPane.AppCanvas.WidgetContainer.set("zoomPos",f);
var e=d*zoomFactorArray[f];var a=h*zoomFactorArray[f];LabBenchDemo.mainPage.mainPane.AppCanvas.WidgetContainer.set("layout",{width:e,height:a,left:(document.width-20-e)/2,top:(h-a+36*2)/2});
LabBenchDemo.mainPage.mainPane.AppCanvas.WidgetContainer.LabImgView.set("layout",{width:e,height:a,left:0,top:0});
LabBenchDemo.mainPage.mainPane.AppCanvas.WidgetContainer.GraphView.set("layout",{width:e*0.158,height:a*0.236,left:e*0.2475,top:a*0.3825});
LabBenchDemo.mainPage.mainPane.AppCanvas.WidgetContainer.GraphView.jsxGraph1.set("layout",{width:e*0.158,height:a*0.236,left:0,top:0})
},mouseDown:function(a){this.set("isDragging",YES);var b=this.get("layout");this._mouseDownInfo={pageX:a.pageX,pageY:a.pageY,left:b.left,top:b.top};
return YES},mouseDragged:function(a){var b=this._mouseDownInfo,c;c=b.left+(a.pageX-b.pageX);
if(this.parentView.get("layout").left>-this.parentView.get("layout").width&this.parentView.get("layout").left<document.width+this.parentView.get("layout").width){this.parentView.adjust("left",c)
}return YES},mouseUp:function(a){this.set("isDragging",NO);this.mouseDragged(a);this._mouseDownInfo=null;
return YES},touchStart:function(a){this.mouseDown(a)},touchDragged:function(a){this.mouseDragged(a)
},touchEnd:function(a){this.mouseUp(a)},});LabBenchDemo.contextPanelController=SC.ObjectController.create({recordID:null,create:function(a){LabBenchDemo.contextPanel.append();
return YES},destroy:function(){LabBenchDemo.contextPanel.remove();return YES},getArticleTitle:function(a){return LabBenchDemo.store.find(LabBenchDemo.Articles,a).get("ArticleTitle")
},getArticleText:function(a){return LabBenchDemo.store.find(LabBenchDemo.Articles,a).get("ArticleText")
},});LabBenchDemo.creatController=SC.Object.create({_cardPool:[],createyellowPipp:function(){var b;
var a;b=LabBenchDemo.PippView.create({init:function(){arguments.callee.base.apply(this,arguments);
this.frontView.set("widgetPicture","/static/lab_bench_demo/en/e133d8bf1d3bcfc7bbfc842e402b5286178256cc/resources/images/yelpipclose.png")
}});b.set("layerNeedsUpdate",true);LabBenchDemo.getPath("mainPage.mainPane").appendChild(b);
this._cardPool.push(b)},destory:function(){console.log("destroy");this.destroy()},createbluePipp:function(){var b;
var a;b=LabBenchDemo.PippView.create({init:function(){arguments.callee.base.apply(this,arguments);
this.frontView.set("widgetPicture","/static/lab_bench_demo/en/e133d8bf1d3bcfc7bbfc842e402b5286178256cc/resources/images/pipBlueNum.png")
}});b.set("layerNeedsUpdate",true);LabBenchDemo.getPath("mainPage.mainPane").appendChild(b);
this._cardPool.push(b)},createTtube:function(){var c;var b;c=LabBenchDemo.TestView.create();
var a=c.get("classNames");console.log(a.join(","));if((b=a.indexOf("flipped"))!=-1){a.splice(b,1)
}c.set("classNames",a);c.set("layerNeedsUpdate",true);LabBenchDemo.getPath("mainPage.mainPane").appendChild(c);
this._cardPool.push(c)},destroyTtube:function(){var a;while(this._cardPool.length>0){a=this._cardPool.pop();
a.destroy();console.log("destroy")}},changeView:function(){this._cardPool[0].destroy()
}});LabBenchDemo.solutionSelectors=SC.ObjectController.create({mouseEntered:function(){this.set("classNames",["sc-view","ContextPanelSelector-selected-border"]);
this.displayDidChange()},mouseExited:function(){this.set("classNames",["sc-view","ContextPanelSelector-unselected-border"]);
this.displayDidChange()},});LabBenchDemo.tasksController=SC.ArrayController.create({});
LabBenchDemo.Articles=SC.Record.extend({guid:SC.Record.attr(Number),ArticleTitle:SC.Record.attr(String),ArticleText:SC.Record.attr(String)});
LabBenchDemo.BgPanning=SC.Record.extend({});LabBenchDemo.WidgetTypes=SC.Record.extend({});
LabBenchDemo.contextPanel=SC.PanelPane.create({layout:{width:400,height:300,centerX:0,centerY:0},contentView:SC.View.design({layout:{top:0,bottom:0,left:0,right:0},backgroundColor:"white",childViews:"ScrollView ArticleTitle CloseBtn".w(),ArticleTitle:SC.LabelView.design({layout:{top:0,bottom:0,left:7,right:0,height:22,width:350},tagName:"h1",classNames:["ArticleTitle"],value:function(){var a=LabBenchDemo.contextPanelController.get("recordID");
if(!a){a=1}return LabBenchDemo.contextPanelController.getArticleTitle(a)}.property(),}),CloseBtn:SC.ButtonView.design({layout:{top:2,right:2,width:50,height:50},title:"X",controlSize:SC.SMALL_CONTROL_SIZE,target:"LabBenchDemo.contextPanelController",action:"destroy",}),ScrollView:SC.ScrollView.design({layout:{top:50,bottom:0,left:5,right:5},borderStyle:SC.BORDER_NONE,hasHorizontalScroller:NO,contentView:SC.TextFieldView.design({layout:{top:0,left:0,bottom:0,right:0},isTextArea:YES,isEnabled:NO,value:function(){var a=LabBenchDemo.contextPanelController.get("recordID");
if(!a){a=1}return LabBenchDemo.contextPanelController.getArticleText(a)}.property(),})})})});
LabBenchDemo.MyDragView=SC.View.extend({touchStart:function(b){var a=this.get("frame");
this._touch={start:{x:b.pageX,y:b.pageY},ourStart:{x:a.x,y:a.y,width:a.width,height:a.height}};
return YES},touchesDragged:function(a,h){var b=this._touch;var g=this.get("frame");
var c=this.get("parentView").get("frame");var e,d;e=b.ourStart.x+a.pageX-b.start.x;
if(e<0){e=0}else{if(e>=(c.width-g.width)){e=(c.width-g.width)}}d=b.ourStart.y+a.pageY-b.start.y;
if(d<0){d=0}else{if(d>=(c.height-g.height)){d=(c.height-g.height)}}this.set("layout",{left:e,top:d,width:b.ourStart.width,height:b.ourStart.height})
},touchEnd:function(){},extend:function(){arguments.callee.base.apply(this,arguments)
},mouseDown:function(a){this.touchStart(a)},mouseDragged:function(a){this.touchesDragged(a)
},mouseUp:function(a){this.touchEnd(a)}});sc_require("views/my_drag");var openTT=LabBenchDemo.store.find(LabBenchDemo.WidgetTypes,"1");
var closedTT=LabBenchDemo.store.find(LabBenchDemo.WidgetTypes,"2");var pipette=LabBenchDemo.store.find(LabBenchDemo.WidgetTypes,"4");
var testtube=LabBenchDemo.store.find(LabBenchDemo.WidgetTypes,"3");var ttubefill=LabBenchDemo.store.find(LabBenchDemo.WidgetTypes,"5");
LabBenchDemo.WidgetView=LabBenchDemo.MyDragView.extend({layout:{centerX:0,centerY:0,width:252,height:400},classNames:["widget"],childViews:"toolView frontView backView".w(),toolView:SC.View.extend({layout:{right:0,top:0,width:50,height:50},backgroundColor:"lightblue",classNames:["face"],isVisible:NO,childViews:"mixButton tooltwoButton".w(),mixButton:SC.ButtonView.design({layout:{top:0,centerX:0,width:40,height:15},controlSize:SC.SMALL_CONTROL_SIZE,titleMinWidth:0,title:"MIX",action:"mix",targetBinding:".parentView.parentView",classNames:["face"]}),tooltwoButton:SC.ButtonView.design({layout:{top:20,centerX:0,width:40,height:15},controlSize:SC.SMALL_CONTROL_SIZE,titleMinWidth:0,action:"destroy",target:"LabBenchDemo.creatController",title:"tool2",classNames:["face"]})}),frontView:SC.View.extend({layout:{width:openTT.get("x")+20,height:openTT.get("y")+20},backgroundColor:"blue",widgetPicture:openTT.get("picture"),classNames:["face","front"],childViews:"conButton flipButton topImage".w(),topImage:SC.ImageView.design({layout:{centerX:0,bottom:0,width:openTT.get("x"),length:openTT.get("y")},useImageCache:YES,contentBinding:".parentView",contentValueKey:"widgetPicture",classNames:["image"]}),conButton:SC.ButtonView.extend({layout:{top:5,right:5,width:15,height:15},controlSize:SC.SMALL_CONTROL_SIZE,titleMinWidth:0,action:"visibleTool",icon:"sc-icon-options-16",targetBinding:".parentView.parentView",classNames:["face","conButton"]}),flipButton:SC.ButtonView.extend({layout:{bottom:5,right:5,width:16,height:16},controlSize:SC.SMALL_CONTROL_SIZE,titleMinWidth:0,title:"i",action:"doFlip",targetBinding:".parentView.parentView",classNames:["face"]})}),backView:SC.View.extend({layout:{width:196,height:196},classNames:["face","back"],childViews:"changeButton selectButton doneButton ".w(),changeButton:SC.ButtonView.extend({layout:{bottom:5,left:5,width:100,height:16},controlSize:SC.SMALL_CONTROL_SIZE,titleMinWidth:0,title:"change",action:"changeView",target:"LabBenchDemo.creatController",classNames:["face"]}),selectButton:SC.SelectButtonView.extend({layout:{top:70,centerX:0,width:150,height:100},title:"containers",objects:[{title:"testtube",icon:"select-button-icon"},{title:"pipette",icon:"select-button-icon"}],nameKey:"title",theme:"square",iconKey:"icon",value:"chicolate",valueKey:"title"}),doneButton:SC.ButtonView.extend({layout:{bottom:5,right:5,width:40,height:16},controlSize:SC.SMALL_CONTROL_SIZE,titleMinWidth:0,title:"Done",action:"doFlip",targetBinding:".parentView.parentView",classNames:["face"]})}),doFlip:function(){var b;
var a=this.get("classNames");console.log(a.join(","));if((b=a.indexOf("flipped"))!=-1){a.splice(b,1)
}else{a[a.length]="flipped"}this.set("classNames",a);this.set("layerNeedsUpdate",true)
},changePicture:function(){var a=this.backView.selectButton.get("value");if(a=="testtube"){this.set("widgetPicture",openTT.get("picture"));
this.frontView.set("layout",{width:openTT.get("x")+20,height:openTT.get("y")+20});
this.frontView.topImage.set("layout",{centerX:0,top:5,width:openTT.get("x"),height:openTT.get("y")})
}if(a=="pipette"){this.set("widgetPicture",pipette.get("picture"));this.frontView.set("layout",{width:pipette.get("x")+20,height:pipette.get("y")+20});
this.frontView.topImage.set("layout",{centerX:0,top:5,width:pipette.get("x"),height:pipette.get("y")})
}},visibleTool:function(){console.log("visible");var a=this.toolView.get("isVisible");
var b=this.frontView.get("layout");console.log(b.width);this.toolView.set("layout",{left:(b.width+3),top:0,width:50,height:50});
if(a==YES){this.toolView.set("isVisible",NO)}if(a==NO){this.toolView.set("isVisible",YES)
}},mix:function(){var b;var a=this.get("classNames");this.frontView.set("widgetPicture",closedTT.get("picture"));
this.frontView.set("layout",{width:closedTT.get("x")+20,height:closedTT.get("y")+20});
this.frontView.topImage.set("layout",{centerX:0,top:5,width:closedTT.get("x"),height:closedTT.get("y")});
console.log(a.join(","));if((b=a.indexOf("mix"))==-1){a[a.length]="mix"}this._timer=SC.Timer.schedule({target:this,action:"unmix",repeats:NO,interval:1000});
this.set("layerNeedsUpdate",true);this.set("classNames",a);this.toolView.set("isVisible",NO)
},unmix:function(){var b;var a=this.get("classNames");console.log(a.join(","));if((b=a.indexOf("mix"))!=-1){a.splice(b,1)
}this.set("layerNeedsUpdate",true);this.set("classNames",a);this.toolView.set("isVisible",NO)
}});sc_require("views/widget");var bluePipp=LabBenchDemo.store.find(LabBenchDemo.WidgetTypes,"5");
var hundred=0;var ten=0;var one=0;var dem=0;LabBenchDemo.PippView=LabBenchDemo.WidgetView.extend({init:function(){arguments.callee.base.apply(this,arguments);
this.frontView.set("widgetPicture",bluePipp.get("picture"));this.frontView.set("layout",{left:0,top:0,width:bluePipp.get("x"),height:bluePipp.get("y")});
this.frontView.topImage.set("layout",{centerX:0,bottom:0,width:bluePipp.get("x"),height:bluePipp.get("y")});
this.toolView.mixButton.set("isEnabled",NO);var a=SC.ButtonView.create({layout:{top:145,centerX:3,width:20,height:15},controlSize:SC.SMALL_CONTROL_SIZE,titleMinWidth:0,title:hundred.toString(),targetBinding:".parentView"});
var c=SC.ButtonView.create({layout:{top:160,centerX:3,width:20,height:15},controlSize:SC.SMALL_CONTROL_SIZE,titleMinWidth:0,title:ten.toString(),targetBinding:".parentView"});
var b=SC.ButtonView.create({layout:{top:175,centerX:3,width:20,height:15},controlSize:SC.SMALL_CONTROL_SIZE,titleMinWidth:0,title:one.toString(),targetBinding:".parentView"});
var f=SC.ButtonView.create({layout:{top:193,centerX:3,width:20,height:15},controlSize:SC.SMALL_CONTROL_SIZE,titleMinWidth:0,title:dem.toString(),targetBinding:".parentView"});
var d=SC.View.create({layout:{top:50,left:10,width:20,height:20},classNames:["number"],backgroundColor:"white",mouseDown:function(g){this._time=SC.Timer.schedule({target:this,action:"decrement",repeats:YES,interval:100})
},mouseUp:function(g){this._time.invalidate()},decrement:function(){var g;g=dem+one*10+ten*100+hundred*1000;
if(g<=0){this._time.set("isPaused",YES)}else{g--}hundred=parseInt(g/1000,10);ten=parseInt((g-hundred*1000)/100,10);
one=parseInt((g-hundred*1000-ten*100)/10,10);dem=parseInt((g-hundred*1000-ten*100-one*10),10);
f.set("title",dem.toString());b.set("title",one.toString());c.set("title",ten.toString());
a.set("title",hundred.toString())}});var e=SC.View.create({layout:{top:50,right:10,width:20,height:20},classNames:["number"],backgroundColor:"lightblue",mouseDown:function(g){console.log("increse");
this._timer=SC.Timer.schedule({target:this,action:"increment",repeats:YES,interval:100})
},mouseUp:function(g){this._timer.invalidate()},increment:function(){dem=dem+1;if(dem==10){dem=0;
one=one+1;if(one==10){one=0;ten++;if(ten==10){ten=0;hundred++;if(hundred==10){dem=9;
one=9;hundred=9;ten=9;this._timer.set("isPaused",YES)}}}}f.set("title",dem.toString());
b.set("title",one.toString());c.set("title",ten.toString());a.set("title",hundred.toString())
}});this.frontView.appendChild(f);this.frontView.appendChild(b);this.frontView.appendChild(c);
this.frontView.appendChild(a);this.frontView.appendChild(d);this.frontView.appendChild(e)
}});sc_require("views/widget");var openTT=LabBenchDemo.store.find(LabBenchDemo.WidgetTypes,"1");
var closedTT=LabBenchDemo.store.find(LabBenchDemo.WidgetTypes,"2");LabBenchDemo.TestView=LabBenchDemo.WidgetView.extend({init:function(){arguments.callee.base.apply(this,arguments);
this.frontView.set("widgetPicture",openTT.get("picture"));this.frontView.topImage.set("layout",{centerX:0,bottom:0,width:openTT.get("x"),heigth:openTT.get("y")})
}});var widget_width=(document.height-20)*3658/1481;var widget_height=document.height-36;
var hundred=0;var ten=0;var one=0;var dem=0;var flag=0;var testtube=LabBenchDemo.store.find(LabBenchDemo.WidgetTypes,"1");
var beaker=LabBenchDemo.store.find(LabBenchDemo.WidgetTypes,"2");var pipette=LabBenchDemo.store.find(LabBenchDemo.WidgetTypes,"3");
LabBenchDemo.mainPage=SC.Page.design({mainPane:SC.MainPane.design({childViews:"AppCanvas yellowpippView bluepippView ttubebtnView reloadView".w(),AppCanvas:SC.View.design({childViews:"WidgetContainer AppToolbar".w(),layout:{top:10,left:10,right:10,bottom:10},backgroundColor:"white",WidgetContainer:SC.View.design({childViews:"LabImgView SafetyDisposalSelector PippetContainerSelector BubbleBathSolutionSelector LabJackSelector MuscleTissueSelector GasLineSelector".w(),layout:{width:widget_width,height:widget_height,top:36,centerX:0},originalwidthBinding:"LabBenchDemo.bgPanning.originalwidth",originalheightBinding:"LabBenchDemo.bgPanning.originalheight",zoomPosBinding:"LabBenchDemo.bgPanning.zoomPos",LabImgView:SC.ImageView.design({layout:{width:widget_width,height:widget_height},value:"/static/lab_bench_demo/en/e133d8bf1d3bcfc7bbfc842e402b5286178256cc/resources/images/laboratory.svg",useImageCache:YES,mouseDown:LabBenchDemo.bgPanning.mouseDown,mouseDragged:LabBenchDemo.bgPanning.mouseDragged,mouseUp:LabBenchDemo.bgPanning.mouseUp,touchStart:LabBenchDemo.bgPanning.touchStart,touchEnd:LabBenchDemo.bgPanning.touchEnd,touchDragged:LabBenchDemo.bgPanningEnd,}),SafetyDisposalSelector:SC.View.design({layout:{width:130,height:135,left:33,top:315},classNames:"ContextPanelSelector-unselected-border",mouseEntered:LabBenchDemo.solutionSelectors.mouseEntered,mouseExited:LabBenchDemo.solutionSelectors.mouseExited,mouseDown:function(){LabBenchDemo.contextPanelController.set("recordID",1);
LabBenchDemo.contextPanelController.create();return YES},}),PippetContainerSelector:SC.View.design({layout:{width:150,height:60,left:145,top:510},classNames:"ContextPanelSelector-unselected-border",mouseEntered:LabBenchDemo.solutionSelectors.mouseEntered,mouseExited:LabBenchDemo.solutionSelectors.mouseExited,mouseDown:function(){LabBenchDemo.contextPanelController.set("recordID",2);
LabBenchDemo.contextPanelController.create();return YES},}),BubbleBathSolutionSelector:SC.View.design({layout:{width:90,height:120,left:1005,top:20},classNames:"ContextPanelSelector-unselected-border",mouseEntered:LabBenchDemo.solutionSelectors.mouseEntered,mouseExited:LabBenchDemo.solutionSelectors.mouseExited,mouseDown:function(){LabBenchDemo.contextPanelController.set("recordID",3);
LabBenchDemo.contextPanelController.create();return YES},}),LabJackSelector:SC.View.design({layout:{width:220,height:200,left:650,top:265},classNames:"ContextPanelSelector-unselected-border",mouseEntered:LabBenchDemo.solutionSelectors.mouseEntered,mouseExited:LabBenchDemo.solutionSelectors.mouseExited,mouseDown:function(){LabBenchDemo.contextPanelController.set("recordID",4);
LabBenchDemo.contextPanelController.create();return YES},}),MuscleTissueSelector:SC.View.design({layout:{width:90,height:250,left:1035,top:230},classNames:"ContextPanelSelector-unselected-border",mouseEntered:LabBenchDemo.solutionSelectors.mouseEntered,mouseExited:LabBenchDemo.solutionSelectors.mouseExited,mouseDown:function(){LabBenchDemo.contextPanelController.set("recordID",5);
LabBenchDemo.contextPanelController.create();return YES},}),GasLineSelector:SC.View.design({layout:{width:120,height:160,left:1350,top:360},classNames:"ContextPanelSelector-unselected-border",mouseEntered:LabBenchDemo.solutionSelectors.mouseEntered,mouseExited:LabBenchDemo.solutionSelectors.mouseExited,mouseDown:function(){LabBenchDemo.contextPanelController.set("recordID",6);
LabBenchDemo.contextPanelController.create();return YES},}),}),AppToolbar:SC.ToolbarView.design({childViews:"AppTitleLabel ZoomOutBtn ZoomInBtn".w(),layout:{top:0,left:0,right:0,height:36},anchorLocation:SC.ANCHOR_TOP,classNames:"AppToolbar",AppTitleLabel:SC.LabelView.design({layout:{height:26,width:200,top:5,left:10},fontSize:SC.LARGE_SIZE,tagName:"h1",classNames:["AppTitleLabel"],value:"Biology Lab Simulation"}),ZoomOutBtn:SC.ButtonView.design({layout:{height:32,width:32,top:2,bottom:2,right:46},controlSize:SC.SMALL_CONTROL_SIZE,fontWeight:SC.BOLD_WEIGHT,classNames:"AppToolbarButtons",title:"<p>-</p>",target:"LabBenchDemo.bgPanning",action:"Zoom",direction:"in"}),ZoomInBtn:SC.ButtonView.design({layout:{height:32,width:32,top:2,bottom:2,right:10},controlSize:SC.SMALL_CONTROL_SIZE,classNames:"AppToolbarButtons",title:"<p>+</p>",target:"LabBenchDemo.bgPanning",action:"Zoom",direction:"out"})})}),yellowpippView:SC.ButtonView.design({layout:{left:5,top:241,width:100,height:100},title:" ",action:"createyellowPipp",target:"LabBenchDemo.creatController",classNames:["yellowpipbtn toolbar"]}),bluepippView:SC.ButtonView.design({layout:{left:5,top:141,width:100,height:100},title:" ",action:"createbluePipp",target:"LabBenchDemo.creatController",classNames:["bluepipbtn toolbar"]}),ttubebtnView:SC.ButtonView.design({layout:{left:5,top:41,width:100,height:100},title:" ",action:"createTtube",target:"LabBenchDemo.creatController",classNames:["ttubebtn toolbar"]}),reloadView:SC.ButtonView.design({layout:{left:5,top:341,width:100,height:100},title:" ",action:"destroyTtube",target:"LabBenchDemo.creatController",classNames:["reload toolbar"]})})});
LabBenchDemo.main=function main(){LabBenchDemo.getPath("mainPage.mainPane").append()
};function main(){LabBenchDemo.main()}LabBenchDemo.MainView=SC.View.extend({});