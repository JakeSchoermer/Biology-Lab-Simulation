// ==========================================================================
// Project:   LabBenchDemo.creatController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
//sc_require('core');

//var bluePipp = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "5");
LabBenchDemo.creatController = SC.Object.create(
/** @scope LabBenchDemo.creatController.prototype */ {
 //  view: null,
  // TODO: Add your own code here.
    _cardPool:[],
    

		createyellowPipp: function(){
		var card;
		var idx;


		card = LabBenchDemo.PippView.create({
			init:function(){
				arguments.callee.base.apply(this,arguments);
				this.frontView.set('widgetPicture','/static/lab_bench_demo/en/e133d8bf1d3bcfc7bbfc842e402b5286178256cc/resources/images/yelpipclose.png');
			}
		});
		
	  card.set('layerNeedsUpdate', true);
	  LabBenchDemo.getPath('mainPage.mainPane').appendChild(card);
	  this._cardPool.push(card);
	
		},
    
		destory: function(){
		console.log("destroy");
		this.destroy();
		},
		
    createbluePipp: function(){
		var card;
		var idx;

		card = LabBenchDemo.PippView.create({
					init:function(){
						arguments.callee.base.apply(this,arguments);
						this.frontView.set('widgetPicture','/static/lab_bench_demo/en/e133d8bf1d3bcfc7bbfc842e402b5286178256cc/resources/images/pipBlueNum.png');
					}
		});

		
	  card.set('layerNeedsUpdate', true);
	  LabBenchDemo.getPath('mainPage.mainPane').appendChild(card);
	  this._cardPool.push(card);
},
	createTtube: function(){
		//var pool = this._cardPool, card;
		var card;
		var idx;

      
		card = LabBenchDemo.TestView.create();
         
		 var classArray = card.get('classNames');
	   console.log(classArray.join(','));
	    if ((idx = classArray.indexOf('flipped')) != -1) {
	    	classArray.splice(idx, 1);
	    }
			card.set('classNames', classArray);
	    card.set('layerNeedsUpdate', true);
	    LabBenchDemo.getPath('mainPage.mainPane').appendChild(card);
	    this._cardPool.push(card);

	  },
	destroyTtube: function(){
			var card;
	    while(this._cardPool.length>0){
			card=this._cardPool.pop();
			card.destroy();
			console.log("destroy");
			
	}
},
		
	changeView: function(){
		this._cardPool[0].destroy();
		
	}	
	
		

	
/*	returnToPool: function(card){
		this._cardPool.push(card);
	}*/

}) ;
