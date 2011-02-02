LabBenchAdmin.canvasPanels = SC.Page.create({
	
	dbView: SC.View.design ({
		
		childViews: 'SplitView' .w(),
		
		layout: {left:0, right: 0, top:0, bottom:0},
		backgroundColor: 'gray',
		
		SplitView: SC.SplitView.design({
			
			
			layoutDirection: SC.LAYOUT_VERTICAL,
			
			topLeftView: SC.ScrollView.design	({

				layout: {left: 0, right: 0, top: 0, bottom: 0},
				backgroundColor: 'green',


                childViews: 'contentView'.w(),

				contentView: SC.ListView.design({
                    layout: { left: 0, right: 0, top: 0, bottom: 0 },
                    contentBinding: 'LabBenchAdmin.dbViewController.arrangedObjects',
                    contentValueKey: 'data'
                })
				
//				mainList: SC.TableView.design({
//				    layout: { left: 0, right: 0, top: 0, bottom: 0 },
//				    backgroundColor: "white",
//
//					columns: [
//                      SC.TableColumn.create({
//                        key:   'ID',
//                        label: 'ID',
//                        width: 100
//                      }),
//                      SC.TableColumn.create({
//                        key:   'data',
//                        label: 'DATA on Server',
//                        width: 500
//                      })
//                    ],
//
//                contentBinding: 'LabBenchAdmin.dbViewController.arrangedObjects'
//				//selectionBinding: 'TableExample.usersController.selection',
//				//sortedColumnBinding: 'TableExample.usersController.sortedColumn',
//				//selectOnMouseDown: YES,
//				//recordType: TableExample.User
//
//				})//End mainList


				
			}),
			
			dividerView: SC.SplitDividerView.design({
				layout: {}
			}),
			
			bottomRightView: SC.View.design({
				
				childViews: 'RefreshBtn'.w(),
				
				layout: {left: 0, right: 0, top: 0, bottom: 0},
			    backgroundColor: "blue",
				
				RefreshBtn: SC.ButtonView.design ({
					layout: {right: 0, bottom: 0, width: 100, height: 36},
                    //controlSize: SC.LARGE_CONTROL_SIZE,
					fontWeight: SC.BOLD_WEIGHT,
                    
                    title: 'Refresh',

                    target: 'LabBenchAdmin.dbViewController',
                    action: 'get_all_records'
                    
				})
				
			})
		})
		
	})//End of dbView
}); //End of Canvas Panels

/*


*/; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_admin');