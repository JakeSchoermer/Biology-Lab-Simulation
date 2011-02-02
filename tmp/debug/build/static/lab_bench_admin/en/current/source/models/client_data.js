// ==========================================================================
// Project:   LabBenchAdmin.ClientData
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals LabBenchAdmin */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
LabBenchAdmin.ClientData = SC.Record.extend(
/** @scope LabBenchAdmin.ClientData.prototype */ {

    primaryKey: 'ID', //Tell the record to use ID instead of guid

    //Tell SC.Record that the data type is a string

    //we are using 'data', to conform to the naming convention,
    //but we are over-riding this with 'DATA', because that is the
    //JSON that is being sent down by the server
    //see -> frameworks/datastore/models/record_attribute.js Line:85

    //We can also over-right any other value that is set
    
    data: SC.Record.attr(String, {key:'DATA'})

}) ;


//Set up query, so that a store can search the data store

LabBenchAdmin.CLIENTDATAQUERY = SC.Query.local(LabBenchAdmin.ClientData);; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_admin');