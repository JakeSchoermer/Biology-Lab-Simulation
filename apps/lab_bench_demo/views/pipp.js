// ==========================================================================
// Project:   LabBenchDemo.PippView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
sc_require('views/widget');

var bluePipp = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "5");
var hundred=0;
var ten=0;
var one=0;
var dem=0;

//var yellowPipp = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "2");
LabBenchDemo.PippView = LabBenchDemo.WidgetView.extend(
/** @scope LabBenchDemo.PippView.prototype */ {

  // TODO: Add your own code here.
	init: function(){
		sc_super();
		this.frontView.set('widgetPicture',bluePipp.get('picture'));
		this.frontView.set('layout',{left:0, top:0, width:bluePipp.get('x'), height:bluePipp.get('y')});
		this.frontView.topImage.set('layout',{centerX:0, bottom:0, width:bluePipp.get('x'), height:bluePipp.get('y')});
		this.toolView.mixButton.set('isEnabled',NO);
		
      var hundredView= SC.ButtonView.create({
			layout:{top:145,centerX:3, width: 20, height:15},
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,

			title: hundred.toString(),
		  //  action: LabBenchDemo.CardView.create(),
			targetBinding: '.parentView'
		});


		var tenView= SC.ButtonView.create({
			layout:{top:160, centerX:3, width: 20, height:15},
	     	controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
			title: ten.toString(),

			targetBinding: '.parentView'

		});

		var oneView= SC.ButtonView.create({
			layout:{top:175, centerX:3, width: 20, height:15},
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
			title: one.toString(),

			targetBinding: '.parentView'

		});

		var demView= SC.ButtonView.create({
			layout:{top:193, centerX:3, width: 20, height:15},
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
			title: dem.toString(),

			targetBinding: '.parentView'

		});

		

		var decreButton= SC.View.create({
			layout: {top:50,left:10,width:20,height:20},

			classNames:['number'],
			//titleMinwidth:0,
			backgroundColor: 'white',        


			mouseDown: function(evt){
				this._time = SC.Timer.schedule({ target: this, action: "decrement", repeats: YES, interval: 100 });
			},	
			mouseUp: function(evt) {
				this._time.invalidate();
			},
			decrement: function(){

					var number;
					number= dem+one*10+ten*100+hundred*1000;
					if(number<=0){
						this._time.set('isPaused', YES) ;
					}else{
						number--;
					}

					hundred=parseInt(number/1000, 10);
					ten=parseInt((number-hundred*1000)/100, 10);
					one=parseInt((number-hundred*1000-ten*100)/10, 10);
					dem=parseInt((number-hundred*1000-ten*100-one*10), 10);

				demView.set('title',dem.toString());
				oneView.set('title',one.toString());
				tenView.set('title',ten.toString());
				hundredView.set('title',hundred.toString());
			}
		});


		var increButton= SC.View.create({
			layout: {top:50,right:10,width:20,height:20},

		  classNames:['number'],
			backgroundColor: 'lightblue',        


			mouseDown: function(evt){
				console.log("increse");
				this._timer = SC.Timer.schedule({ target: this, action: "increment", repeats: YES, interval: 100 });
			},	
			mouseUp: function(evt) {
				this._timer.invalidate();
			},
			increment: function(){
				dem=dem+1;
				if(dem==10){
					dem=0;
					one=one+1;
					if(one==10){
						one=0;
						ten++;
						if(ten==10){
							ten=0;
							hundred++;
							if(hundred==10){
								dem=9;
								one=9;
								hundred=9;
								ten=9;
								this._timer.set('isPaused', YES) ;
							}
						}
					}
				}
				demView.set('title',dem.toString());
				oneView.set('title',one.toString());
				tenView.set('title',ten.toString());
				hundredView.set('title',hundred.toString());
			}
		});

		this.frontView.appendChild(demView);
			this.frontView.appendChild(oneView);
				this.frontView.appendChild(tenView);
					this.frontView.appendChild(hundredView);
						this.frontView.appendChild(decreButton);
							this.frontView.appendChild(increButton);
		}

});
