FlowRouter.route('/', {
  name: 'welcome',
  action: function(){
    BlazeLayout.render('content', { tutorial: 'welcome' });
    window.document.title = 'Welcome to GirlCode tutorials!';
  }
})
FlowRouter.route('/tutorials/:pageName', {
    name: 'tutorials',
    action: function(params) {
      BlazeLayout.render('content', { tutorial: params.pageName });
      window.document.title = params.pageName;
    }
});
