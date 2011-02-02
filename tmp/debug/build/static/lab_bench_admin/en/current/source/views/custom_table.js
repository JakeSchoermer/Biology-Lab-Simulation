// ==========================================================================
// Project:   LabBenchAdmin.CustomTableView
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals LabBenchAdmin */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
LabBenchAdmin.CustomTableView = SC.View.extend(
/** @scope LabBenchAdmin.CustomTableView.prototype */ {

    //Custom View to Display Table Data

    title: '',

    //Array that Defines Column Data
    //columns:[],

    displayProperties: ['title'],

    render: function(context, firstTime) {
      arguments.callee.base.apply(this,arguments);

      var title = this.get('title');
      var columns = this.get ('columns');

      title = title.begin('div').addClass('custom-table-title');

      title = title.end();
    }



});
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_admin');