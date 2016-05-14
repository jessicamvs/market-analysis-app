var allProducts = [];
var productNames = ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'water_can','wine_glass'];

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

  getRandomIndex: function() {
    return Math.floor(Math.random() * allProducts.length);
  },

  displayImages: function() {
    var imageLeft = document.getElementById('img1');
    var imageMid = document.getElementById('img2');
    var imageRight = document.getElementById('img3');

    while (imageLeft.src === imageMid.src || imageLeft.src === imageRight.src || imageMid.src === imageRight.src) {
      imageLeft.src = allProducts[this.getRandomIndex()].path;
      imageMid.src = allProducts[this.getRandomIndex()].path;
      imageRight.src = allProducts[this.getRandomIndex()].path;
    }
  },

  tallyClicks: function(elementId) {
    elementId.tally += 1;
    this.totalClicks += 1;
  },

  displayResults: function() {
    // make this unhidden then add click event that will make this disappear and display list of results and make reset button vissible

  },

  showButton: function() {
    // probably have to write an event here that will remove button once we click it
  },

  onClick: function() {
    // We want to tally the vote and reload images again and once total clicks equals 15 we want to show display results button
  }
};

// productRank.imageEls.addEventListener('click', productRank.onClick);
// productRank.displayImages();
