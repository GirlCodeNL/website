FlowRouter.route('/', {
  name: 'welcome',
  triggersEnter: [function () {
    Meteor.defer(function () {
      document.querySelector('main').classList.add('light-theme').remove('dark-theme');
    });
  }],
  action: function(){
    BlazeLayout.render('content', { content: 'welcome' });
    window.document.title = 'Welcome to GirlCode tutorials!';
  }
});

FlowRouter.route('/:pageName', {
  name: 'pages',
  triggersEnter: [function () {
    Meteor.defer(function () {
      document.querySelector('main').classList.add('light-theme').remove('dark-theme');
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
        document.querySelector('main').classList.add('dark-theme').remove('light-theme');
      });
    }],
    action: function(params) {
      BlazeLayout.render('content', { content: params.pageName });
      window.document.title = params.pageName;
    }
});
