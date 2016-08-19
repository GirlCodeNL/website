if(Meteor.isClient) {
  BlazeLayout.setRoot('.page-container');
  Template.nav.helpers({
    activeClass(page) {
      const active = FlowRouter.getRouteName() === page || FlowRouter.getParam('pageName') === page;
      return active && 'active';
    }
  });

  let navIsOpen = false;
  Template.body.events({
    'mouseover': function(e){
      if(navIsOpen) {
        onClickBody(e);
      }
    }
  });

  function onClickBody(ev) {
    let isOnNav = $(ev.target).parents('.subnav').length > 0 || ev.target.classList.contains('has-subnav');
    if (!isOnNav) {
      toggleNav();
    }
  }

  function toggleNav(){
    navIsOpen = !navIsOpen;
    document.querySelector('.subnav').classList[navIsOpen ? 'add' : 'remove']('expanded');
  }

  Template.nav.events({
    'click li a': function (e) {
      const url = e.target.getAttribute('href');
      FlowRouter.go(url);
    },
    'mouseover .has-subnav': function(e) {
      toggleNav();
    }
  });

}
