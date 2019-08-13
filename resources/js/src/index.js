import { Sortable } from '@shopify/draggable';

const divs = document.querySelectorAll('.js-translator .checkbox-group > div');

function SimpleList() {
  const containerSelector = '.js-translator .checkbox-group';
  const containers = document.querySelectorAll(containerSelector);
  if (containers.length === 0) {
    return false;
  }
  const sortable = new Sortable(containers, {
    draggable: '.checkbox-group > .translator__row',
    handle:'div.translator__reorder',
    mirror: {
      appendTo: containerSelector,
      constrainDimensions: true,
    },
  });
  return sortable;
}

SimpleList();

