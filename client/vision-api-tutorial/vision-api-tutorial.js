var routes = ['startpage', 'base64', 'postman', 'conclusion'];
var currentTab = new ReactiveVar('startpage');

if (Meteor.isClient) {
  Template.pagenav.helpers({
    routes: function(){
      return routes;
    }
  });
  Template.pagenav.events({
    'click button': function () {
      //`this` is the value of the dynamic template
      currentTab.set(this.toString());
    }
  });
  Template.pageNavItem.helpers({
    activeItemClass: function () {
      if(this.toString() == currentTab.get()){
        return 'active';
      }
    }
  });

  Template['vision-api-tutorial'].helpers({
    tab: function () {
      return currentTab.get();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
