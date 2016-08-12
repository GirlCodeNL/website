if(Meteor.isClient) {
  BlazeLayout.setRoot('.page-container');
  Template.nav.helpers({
    activeClass(page) {
      console.log(FlowRouter.getRouteName(), page);
      const active = FlowRouter.getRouteName() === page || FlowRouter.getParam('pageName') === page;
      return active && 'active';
    }
  });
  Template.nav.events({
    'click li a': function (e) {
      const url = e.target.getAttribute('href');
      FlowRouter.go(url);
    }
  });

}
