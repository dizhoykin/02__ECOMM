const menuItemsDB = [
    {
        name: 'French Fries with Ketchup',
        price: 223,
        image: 'plate__french-fries.png',
        alt: 'French Fries',
        count: 0
    },
    {
        name: 'Salmon and Vegetables',
        price: 512,
        image: 'plate__salmon-vegetables.png',
        alt: 'Salmon and Vegetables',
        count: 0
    },
    {
        name: 'Spaghetti Meat Sauce',
        price: 782,
        image: 'plate__spaghetti-meat-sauce.png',
        alt: 'Spaghetti with Meat Sauce',
        count: 0
    },
    {
        name: 'Bacon, Eggs, and Toast',
        price: 599,
        image: 'plate__bacon-eggs.png',
        alt: 'Bacon, Eggs, and Toast',
        count: 0
    },
    {
        name: 'Chicken Salad with Parmesan',
        price: 698,
        image: 'plate__chicken-salad.png',
        alt: 'Chicken Salad with Parmesan',
        count: 0
    },
    {
        name: 'Fish Sticks and Fries',
        price: 634,
        image: 'plate__fish-sticks-fries.png',
        alt: 'Fish Sticks and Fries',
        count: 0
    }
]


const addFeatureValue = (element, className, value) => {
  const featureValueElement = element.querySelector(className);
  featureValueElement.textContent = value;
};

const menuItems = document.querySelectorAll('.menu-item');
const emptyText = document.querySelector('.empty');

const cartItemTemplate = document.querySelector('#cart-item-template').content;
const cartItemNode = cartItemTemplate.querySelector('.cart-item');
const cartSummary = document.querySelector('.cart-summary');

for (let i = 0; i < menuItems.length; i++) {
  let plateButtons = menuItems[i].querySelector('.content').querySelector('.add');
  plateButtons.addEventListener('click', () => {
    plateButtons.classList.remove('add');
    plateButtons.classList.add('in-cart');
    plateButtons.innerHTML = '<img src="images/check.svg" alt="Check" /> In Cart';
    emptyText.classList.add('invisible');

    const cartItem = cartItemNode.cloneNode(true);
    const quantity = cartItem.querySelector('.quantity');
    const quantityTotal = cartItem.querySelector('.quantity-total');
    addFeatureValue(cartItem, '.name', menuItemsDB[i].name);
    addFeatureValue(cartItem, '.price','$' + menuItemsDB[i].price / 100);
    addFeatureValue(cartItem, '.subtotal','$' + (menuItemsDB[i].price / 100 * quantityTotal.textContent).toFixed(2));


    const decreaseButton = cartItem.querySelector('.decrease');
    const increaseButton = cartItem.querySelector('.increase');

    increaseButton.addEventListener('click', () => {
      quantity.textcontent = quantity.textContent++;
      quantityTotal.textcontent = quantityTotal.textContent++;
      addFeatureValue(cartItem, '.subtotal','$' + (menuItemsDB[i].price / 100 * quantityTotal.textContent).toFixed(2));
    });


    cartSummary.appendChild(cartItem);

  });
};
