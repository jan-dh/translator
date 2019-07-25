import { Sortable } from '@shopify/draggable';

function SimpleList() {
  const containerSelector = '.js-translator .checkbox-group';
  const containers = document.querySelectorAll(containerSelector);
  if (containers.length === 0) {
    return false;
  }
  const sortable = new Sortable(containers, {
    draggable: '.checkbox-group > div',
    handle:'label',
    mirror: {
      appendTo: containerSelector,
      constrainDimensions: true,
    },
  });
  return sortable;
}

SimpleList();
