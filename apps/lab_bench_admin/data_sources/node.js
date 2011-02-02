// ==========================================================================
// Project:   LabBenchAdmin.NodeDataSource
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals LabBenchAdmin */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
LabBenchAdmin.NodeDataSource = SC.DataSource.extend(
/** @scope LabBenchAdmin.NodeDataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {

    // TODO: Add handlers to fetch data for specific queries.  
    // call store.dataSourceDidFetchQuery(query) when done.

	SC.Request.getUrl('/api/get_all_records').json()
	    .notify(this, 'didFetch', store, query)
        .send();
    return YES ; // return YES if you handled the query
  },

  didFetch: function(response, store, query) {
    if (SC.ok(response)){
      var result = response.get('body');
      console.log(result);
      store.loadRecords(query.get('recordType'), result)
      store.dataSourceDidFetchQuery(query);
    } else {
      console.log("Data Source Errored - didFetch");
      store.dataSourceDidErrorQuery(query);
    }
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.

    SC.Request.getUrl('/api/get_record/'+storeKey).json()
      .notify(this, 'didRetrieve', store, storeKey)
      .send();
    
    return YES ; // return YES if you handled the storeKey
  },

 didRetrieve: function (response, store, query) {

     if (SC.ok(response, store, query)) {
         var result = response.get('body');
         console.log(result);
         store.loadRecords(query.get('recordType'), result)
         store.dataSourceDidFetchQuery(query);
     } else {
         console.log("Data Source Errored - did Retrieve");
         store.dataSourceDidErrorQuery(query);
     }
  },

  
  createRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit new records to the data source.
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO ; // return YES if you handled the storeKey
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO ; // return YES if you handled the storeKey
  }
  
}) ;
