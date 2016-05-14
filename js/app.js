var allProducts = [];
var productNames = ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'water_can','wine_glass'];
// TODO: see the pattern here, and what you need to fill in?

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.tally = 0;
  allProducts.push(this);
}

for(i in productNames) {
  new Product(productNames[i], 'img/' + productNames[i] + '.jpg');
}

var productRank = {
  totalClicks: 0,
  leftObj: null,
  midObj: null,
  rightObj: null,

  // TODO: All the properties of the object! What do you think you need? Try to write one piece at a time and make sure it does what you want before writing a little more.
  // NOTE: A-C-P reminder... Make very intentional and iterative changes to your code, and then A-C-P.

  getRandomIndex: function() {
    return Math.floor(Math.random() * allProducts.length);
  },

  displayImages: function() {
    var imageLeft = document.getElementById('img1');
    var imageMid = document.getElementById('img2');
    var imageRight = document.getElementById('img3');
    imageLeft.src = allProducts[this.getRandomIndex()].path;
    imageMid.src = allProducts[this.getRandomIndex()].path;
    imageRight.src = allProducts[this.getRandomIndex()].path;
    // TODO: Hmm... what's going to happen here?
  },

  tallyClicks: function(elementId) {
    // TODO: Hmm... what's going to happen here?
  },

  displayResults: function() {
    // TODO: Hmm... what's going to happen here?
  },

  showButton: function() {
    // TODO: Hmm... what's going to happen here?
  },

  onClick: function() {
    // TODO: Hmm... what's going to happen here?
  }
};

productRank.displayImages();
// productRank.imageEls.addEventListener('click', productRank.onClick);
// productRank.displayImages();
