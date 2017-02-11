import { FlowRouter } from 'meteor/kadira:flow-router';
import { classListHelper } from '../imports/scripts/utils';

FlowRouter.route('/', {
  name: 'welcome',
  triggersEnter: [function () {
    Meteor.defer(function () {
      classListHelper(document.querySelector('main')).add('light-theme').remove('dark-theme');
    });
  }],
  action: function(){
    BlazeLayout.render('content', { content: 'welcome' });
    window.document.title = 'Welcome to Girl Code!';
  }
});

FlowRouter.route('/blog', {
  name: 'blog',
  triggersEnter: [],
  action: function (params) {
    BlazeLayout.render('content', { content: 'blog' });
    window.document.title = 'Girl Code - blog';
  },
  subscriptions() {
    this.register("latestMediumPosts", Meteor.subscribe("latestMediumPosts"));
  }
});

FlowRouter.route('/:pageName', {
  name: 'pages',
  triggersEnter: [function () {
    Meteor.defer(function () {
      classListHelper(document.querySelector('main')).add('light-theme').remove('dark-theme');
    });
  }],
  action: function(params){
    BlazeLayout.render('content', { content: params.pageName });
    window.document.title = 'Girl Code - ' + params.pageName;
  }
});

FlowRouter.route('/tutorials/:pageName', {
    name: 'tutorials',
    triggersEnter: [function () {
      Meteor.defer(function () {
        classListHelper(document.querySelector('main')).add('dark-theme').remove('light-theme');
      });
    }],
    action: function(params) {
      BlazeLayout.render('content', { content: params.pageName });
      window.document.title = 'Girl Code - ' + params.pageName;
    }
});
