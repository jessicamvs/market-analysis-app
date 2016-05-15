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
  leftObj: null,
  midObj: null,
  rightObj: null,
  imageEls: document.getElementById('productDisplay'),
  imageLeft: document.getElementById('img1'),
  imageMid: document.getElementById('img2'),
  imageRight: document.getElementById('img3'),

  getRandomIndex: function() {
    return Math.floor(Math.random() * allProducts.length);
  },

  displayImages: function() {
    this.leftObj = allProducts[this.getRandomIndex()];
    this.midObj = allProducts[this.getRandomIndex()];
    this.rightObj = allProducts[this.getRandomIndex()];

    if (this.leftObj === this.midObj || this.leftObj === this.rightObj || this.midObj === this.rightObj) {
      this.displayImages();
    } else {
      this.imageLeft.src = this.leftObj.path;
      this.imageLeft.id = this.leftObj.name;

      this.imageMid.src = this.midObj.path;
      this.imageMid.id = this.midObj.name;

      this.imageRight.src = this.rightObj.path;
      this.imageRight.id = this.rightObj.name;
    }
  },

  tallyClicks: function(elementId) {
    for(name in allProducts) {
      if (elementId === allProducts[name].name) {
        allProducts[name].tally += 1;
        this.totalClicks += 1;
        console.log(allProducts[name].name + ' has ' + allProducts[name].tally + ' clicks');
        console.log('Total clicks thus far is ' + productRank.totalClicks);
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
    if(this.totalClicks % 15 === 0) {
      // this.displayResults();
    }
    // location.reload
    // We want to tally the vote and reload images again and once total clicks equals 15 we want to show display results button
  }
};
productRank.displayImages();

productRank.imageEls.addEventListener('click', function() {
  console.log(event.target.id);
  productRank.tallyClicks(event.target.id);
});
// productRank.imageEls.addEventListener('click', productRank.onClick());
