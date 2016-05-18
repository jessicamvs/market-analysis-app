var allProducts = [];
var productNames = ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'water_can','wine_glass'];
var jsonVotes;

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.tally = 0;
  allProducts.push(this);
  productRank.data.datasets[0].data.push(this.tally);
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
  data: {
    labels: productNames,
    datasets: [
      {
        label: 'Votes',
        backgroundColor: '#d5f4f0',
        data: []
      }
    ]
  },

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
        this.data.datasets[0].data[name] = allProducts[name].tally;
        jsonVotes = JSON.stringify(this.data.datasets[0].data);
        localStorage.setItem('storedVotes', jsonVotes);
        console.log(jsonVotes);

        this.totalClicks += 1;
        console.log(allProducts[name].name + ' has ' + allProducts[name].tally + ' clicks');
        console.log('Total clicks thus far is ' + productRank.totalClicks);
      }
    }
  },

  displayResults: function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: this.data,
    });
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
      alert('That\'s not an image.');
    }
  }
};

for(i in productNames) {
  new Product(productNames[i], 'img/' + productNames[i] + '.jpg');
}

if (localStorage.storedVotes) {
  productRank.data.datasets[0].data = JSON.parse(localStorage.getItem('storedVotes'));
  for(j in allProducts) {
    allProducts[j].tally = productRank.data.datasets[0].data[j];
  }
};

productRank.displayImages();
productRank.imageEls.addEventListener('click', productRank.onClick);
