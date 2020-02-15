# Correios.JS
Node package for track Correios objects.

<p align="center">
  <img src="https://i.imgur.com/CqURI8i.png">
</p>

### Installation
````
npm install correios.js
````

### Example
```javascript
const correios = require('correios.js');

correios.track('PX547037143BR').then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(error);
});
```

### Response example
```json
{
  code: 'PX547037143BR',
  events: [
    {
      date: '16/12/2019',
      hour: '14:19',
      location: 'Mariopolis / PR',
      event: 'Objeto entregue ao destinatário',
      message: ''
    },
    {
      date: '16/12/2019',
      hour: '08:42',
      location: 'Mariopolis / PR',
      event: 'Objeto aguardando retirada no endereço indicado',
      message: 'Para retirá-lo, é preciso informar o código do objeto e apresentar documentação que comprove ser o destinatário ou pessoa por ele oficialmente autorizada.'        
    },
    {
      date: '11/12/2019',
      hour: '09:03',
      location: 'CURITIBA / PR',
      event: 'Objeto encaminhado',
      message: 'de Unidade de Tratamento em CURITIBA / PR para Agência dos Correios em Mariopolis / PR'
    },
    {
      date: '09/12/2019',
      hour: '15:00',
      location: 'CAJAMAR / SP',
      event: 'Objeto encaminhado',
      message: 'de Unidade de Tratamento em CAJAMAR / SP para Unidade de Tratamento em CURITIBA / PR'
    },
    {
      date: '04/12/2019',
      hour: '15:20',
      location: 'CACHOEIRO DE ITAPEMIRIM / ES',
      event: 'Objeto encaminhado',
      message: 'de Agência dos Correios em CACHOEIRO DE ITAPEMIRIM / ES para Unidade de Tratamento em CAJAMAR / SP'
    },
    {
      date: '03/12/2019',
      hour: '18:13',
      location: 'CACHOEIRO DE ITAPEMIRIM / ES',
      event: 'Objeto postado após o horário limite da unidade',
      message: 'Sujeito a encaminhamento no próximo dia útil'
    }
  ]
}
```

### Built With
* [Node.js](https://nodejs.org/en/)

### Authors
* **Giovani de Oliveira** - [xxgicoxx](https://github.com/xxgicoxx)

### Acknowledgments
* [FlatIcon](https://www.flaticon.com/) - Icon