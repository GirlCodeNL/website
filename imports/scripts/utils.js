classListHelper = function classListHelper(element) {
  let list = element.classList;
  console.log(list);

  return {
    toggle: function(classNames){list.toggle(classNames); return this;},
    add: function(classNames){list.add(classNames); return this;},
    remove: function(classNames) {list.remove(classNames); return this;}
  }
}
