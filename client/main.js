import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import './routes.js';

BlazeLayout.setRoot('.page-container');
Template.nav.helpers({
  activeClass(page) {
    const active = FlowRouter.getRouteName() === page || FlowRouter.getParam('pageName') === page;
    return active && 'active';
  }
});

Template.nav.events({
  'click li a:not(.has-subnav)': function (e) {
    const url = e.target.getAttribute('href');
    FlowRouter.go(url);
  },
});
