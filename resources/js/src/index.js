import { Sortable } from '@shopify/draggable';

const divs = document.querySelectorAll('.js-translator .checkbox-group > div');

Array.from(divs).forEach((div)=>{
  const move = document.createElement("div");
  move.className = "icon move";
  div.prepend(move);
});


function SimpleList() {
  const containerSelector = '.js-translator .checkbox-group';
  const containers = document.querySelectorAll(containerSelector);
  if (containers.length === 0) {
    return false;
  }
  const sortable = new Sortable(containers, {
    draggable: '.checkbox-group > div',
    handle:'div.move',
    mirror: {
      appendTo: containerSelector,
      constrainDimensions: true,
    },
  });
  return sortable;
}

SimpleList();
