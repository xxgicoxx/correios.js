# Correios.JS
Node package for track Correios objects.

### Installation
````
npm install correios.js
````

### Example
```javascript
const correios = require('correios.js');

correios.track('TRACKING_CODE').then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```

### Response example
```json
{
    "code": "TRACKING_CODE",
    "events": [
        {
            "date": "DD/MM/YYYY",
            "hour": "HH:mm",
            "location": "LOCATION",
            "event": "EVENT",
            "message": "MESSAGE"
        }
    ]
}
```

### Built With
* [Node.js](https://nodejs.org/en/)

### Authors
* **Giovani de Oliveira** - [xxgicoxx](https://github.com/xxgicoxx)