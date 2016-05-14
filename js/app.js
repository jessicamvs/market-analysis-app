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
  imageEls: document.getElementById('productDisplay'),

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
    for(i in allProducts) {
      if (elementId === allProducts[i].name) {
        allProducts[i].tally += 1;
        this.totalClicks += 1;
      }
    }
  },

  displayResults: function() {
    var buttonResults = document.getElementById('resultsButton');
    buttonResults.hidden = false;

    var buttonReset = document.getElementById('resetButton');

    buttonResults.addEventListener('click', function() {
      buttonResults.hidden = true;
      buttonReset.hidden = false;
      var ulEl = document.createElement('ul');

      for(obj in allProducts) {
        var liElOne = document.createElement('li');
        liElOne.textContent = allProducts[obj].name.charAt(0).toUpperCase() + allProducts[obj].name.slice(1) + ' received ' + allProducts[obj].tally + ' votes.';
        ulEl.appendChild(liElOne);
      }

      var liElTwo = document.createElement('li');
      liElTwo.textContent = 'Total Votes: ' + productRank.totalClicks;
      ulEl.appendChild(liElTwo);

      document.getElementById('results').appendChild(ulEl);
    });
  },

// When you hit 15 clicks show button.
  showButton: function() {
    // probably have to write an event here that will remove button once we click it
  },

  onClick: function() {
    // We want to tally the vote and reload images again and once total clicks equals 15 we want to show display results button
  }
};

// productRank.imageEls.addEventListener('click', productRank.onClick);
productRank.displayImages();
