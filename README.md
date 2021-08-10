# Correios.js
Node.js package for track Correios objects.

<p align="center">
  <img src="https://i.imgur.com/CqURI8i.png">
</p>

# Prerequisites
* [Node.js](https://nodejs.org/en/)

# Installation
````
npm install correios.js
````

# Example
```javascript
const correios = require('correios.js');

(async () => {
  try {
    const track = await correios.track('PX547037143BR');
    console.log(track);
  } catch (error) {
    console.error(error);
  }
})();
```

# Built With
* [Node.js](https://nodejs.org/en/)

# Authors
* [xxgicoxx](https://github.com/xxgicoxx)

### Acknowledgments
* [FlatIcon](https://www.flaticon.com/)