/* 
 * Search Controller
 */

Ext.define('IpadApp.controller.searchController', {
 extend : 'Ext.app.Controller',
 
 config: {
  profile: Ext.os.deviceType.toLowerCase(),
  stores : ['Countries'],
  models : ['Country'],
  refs: {
   myContainer: 'searchView'//myContainer
  },
  control: {
   'searchView': {
    activate: 'onActivate'
   },
   'searchView searchfield[itemId=searchBox]' : {
    clearicontap : 'onClearSearch',
    keyup: 'onSearchKeyUp'
   }
  } 
 
 },
 
 onActivate: function() {
  console.log('Main container is active');
 },
 
 onSearchKeyUp: function(searchField) {
  queryString = searchField.getValue();
  console.log(this,'Please search by: ' + queryString);
 
  var store = Ext.getStore('Countries');
  store.clearFilter();
 
  if(queryString){
   var thisRegEx = new RegExp(queryString, "i");
   store.filterBy(function(record) {
    if (thisRegEx.test(record.get('text')) ||
      thisRegEx.test(record.get('content'))) {
     return true;
    };
    return false;
   });
  }
 
 },
 
 onClearSearch: function() {
  console.log('Clear icon is tapped');
  var store = Ext.getStore('Countries');
  store.clearFilter();
 },
 
 init: function() {
  console.log('Controller initialized');
 }
 
});