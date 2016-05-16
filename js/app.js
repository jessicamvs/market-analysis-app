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
  buttonResults: document.getElementById('resultsButton'),
  buttonReset: document.getElementById('resetButton'),

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
        // this.displayImages();
        console.log(allProducts[name].name + ' has ' + allProducts[name].tally + ' clicks');
        console.log('Total clicks thus far is ' + productRank.totalClicks);
      }
    }
  },

  displayResults: function() {
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
  },

  showButton: function() {
    this.buttonResults.hidden = false;

    this.buttonResults.addEventListener('click', function() {
      productRank.buttonResults.hidden = true;
      productRank.buttonReset.hidden = false;
      productRank.displayResults();
    });

    this.buttonReset.addEventListener('click', function() {
      productRank.buttonReset.hidden = true;
      location.reload();
    });
  },

  onClick: function() {
    if(event.target.id === productRank.imageLeft.id || event.target.id === productRank.imageMid.id || event.target.id === productRank.imageRight.id) {
      if((productRank.totalClicks + 1) % 15 === 0) {
        productRank.tallyClicks(event.target.id);
        productRank.imageEls.removeEventListener('click', productRank.onClick);
        productRank.showButton();
      } else {
        productRank.tallyClicks(event.target.id);
        productRank.displayImages();
      }
    } else {
      alert('Please click an image.');
    }
  }
};

productRank.displayImages();
productRank.imageEls.addEventListener('click', productRank.onClick);
