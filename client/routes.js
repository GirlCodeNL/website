import { FlowRouter } from 'meteor/kadira:flow-router';
import utils from '../imports/scripts/utils';

FlowRouter.route('/', {
  name: 'welcome',
  triggersEnter: [function () {
    Meteor.defer(function () {
      classListHelper(document.querySelector('main')).add('light-theme').remove('dark-theme');
    });
  }],
  action: function(){
    BlazeLayout.render('content', { content: 'welcome' });
    window.document.title = 'Welcome to GirlCode tutorials!';
  }
});

FlowRouter.route('/blog', {
  name: 'blog',
  triggersEnter: [],
  action: function (params) {
    BlazeLayout.render('content', { content: 'blog' });
    // let blog = new mediumBlog();
    // blog.init();
  },
  subscriptions() {
    this.register("latestMediumPosts", Meteor.subscribe("latestMediumPosts"));
    this.register("latestWpPosts", Meteor.subscribe("latestWpPosts"));
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
    window.document.title = 'GirlCode - ' + params.pageName;
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
      window.document.title = params.pageName;
    }
});
