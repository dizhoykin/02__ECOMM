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

const taxValue = 0.0975;

const addFeatureValue = (element, className, value) => {
  const featureValueElement = element.querySelector(className);
  featureValueElement.textContent = value;
};

const addImageValue = (element, className, item) => {
  const imageValueElement = element.querySelector(className);
  imageValueElement.alt = item.alt;
  imageValueElement.src = 'images/' + item.image;
};

const menuItems = document.querySelectorAll('.menu-item');
const emptyText = document.querySelector('.empty');

const cartItemTemplate = document.querySelector('#cart-item-template').content;
const cartItemNode = cartItemTemplate.querySelector('.cart-item');
const cartSummary = document.querySelector('.cart-summary');

const subtotal = document.querySelector('.amount.subtotal');
const tax = document.querySelector('.amount.tax');
const total = document.querySelector('.amount.total');

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
    addFeatureValue(cartItem, '.price', '$' + menuItemsDB[i].price / 100);
    addFeatureValue(cartItem, '.item-subtotal', '$' + (menuItemsDB[i].price / 100 * quantityTotal.textContent).toFixed(2));
    addImageValue(cartItem, '.plate-image', menuItemsDB[i]);

    const decreaseButton = cartItem.querySelector('.decrease');
    const increaseButton = cartItem.querySelector('.increase');

    increaseButton.addEventListener('click', () => {
      quantity.textContent++;
      quantityTotal.textContent++;
      addFeatureValue(cartItem, '.item-subtotal', '$' + (menuItemsDB[i].price / 100 * quantityTotal.textContent).toFixed(2));
    });

    decreaseButton.addEventListener('click', () => {
      if (Number(quantity.textContent) > 1) {
        quantity.textContent--;
        quantityTotal.textContent--;
        addFeatureValue(cartItem, '.item-subtotal', '$' + (menuItemsDB[i].price / 100 * quantityTotal.textContent).toFixed(2));
      } else {
        plateButtons.classList.add('add');
        plateButtons.classList.remove('in-cart');
        plateButtons.innerHTML = 'Add to Cart';
        cartSummary.removeChild(cartItem);
        plateButtons.disabled = false;
        subtotal.textContent = '$00.00';
        tax.textContent = '$0.00';
        total.textContent = '$00.00';
      }
    });

    cartSummary.appendChild(cartItem);
    plateButtons.disabled = true;
  });
};

const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (!cartSummary.hasChildNodes()) {
      emptyText.classList.remove('invisible');
    } else {
      const subtotalsList = document.querySelectorAll('.item-subtotal');
      const subtotalsArray = [...subtotalsList];
      const subtotalsValuesArray = [];
      subtotalsArray.forEach(subtotalsArrayItem => {
        subtotalsValuesArray.push(Number(subtotalsArrayItem.textContent.substr(1)));
      });

      const subtotalSum = subtotalsValuesArray.reduce((a, b) => a + b);
      subtotal.textContent = '$' + subtotalSum.toFixed(2);
      tax.textContent = '$' + (subtotalSum * taxValue).toFixed(2);
      total.textContent = '$' + (subtotalSum * (1 + taxValue)).toFixed(2);
    }
  });
});
const config = {childList: true, characterData: true, subtree: true};
observer.observe(cartSummary, config);
