# Correios.JS
Node package for track Correios objects.

### Installation
````bash
npm install correios.js
````

### Example
```javascript
const correios = require('correios.js');

correios.track('XXXXXXXXXXXXX').then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```

### Return
```json
{
    "codigo": "XXXXXXXXXXXXX",
    "eventos": [
        {
            "data": "01/01/2019",
            "hora": "00:00",
            "local": "CURITIBA / PR",
            "evento": "Objeto encaminhado",
            "mensagem": "de Unidade de Tratamento em CURITIBA / PR para Agência dos Correios em Mariopolis / PR"
        }
    ]
}
```

### Built With
* [Node.js](https://nodejs.org/en/)

### Authors
* **Giovani de Oliveira** - [xxgicoxx](https://github.com/xxgicoxx)