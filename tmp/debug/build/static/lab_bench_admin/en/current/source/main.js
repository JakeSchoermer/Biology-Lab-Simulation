// ==========================================================================
// Project:   LabBenchAdmin
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals LabBenchAdmin */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
LabBenchAdmin.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  LabBenchAdmin.getPath('mainPage.mainPane').append() ;

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  var clients = LabBenchAdmin.store.find(LabBenchAdmin.CLIENTDATAQUERY);

  LabBenchAdmin.dbViewController.set('content', clients); 

  // TODO: Set the content property on your primary controller
  // ex: LabBenchAdmin.contactsController.set('content',LabBenchAdmin.contacts);

} ;

function main() {
	LabBenchAdmin.main();
	//LabBenchAdmin.dbViewController.get_all_records;
}; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_admin');