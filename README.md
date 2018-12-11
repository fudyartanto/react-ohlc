### Demo URL: [https://fudyartanto.github.io/react-ohlc/](https://fudyartanto.github.io/react-ohlc/)

# Table of Contents
1. [Run Example Project](#example)
2. [Usage](#usage)
3. [Contribution](#contribution)
4. [Code Guideline](#code-guideline)

## Run Example Projetc
```bash
git clone https://github.com/fudyartanto/react-ohlc.git
cd react-ohlc
npm install && npm run build
cd example
cp .env.example .env
npm install && npm start
```
* Note: Please change .env variable to your corresponding value. You can get alpha advantage api key here [https://www.alphavantage.co](https://www.alphavantage.co)

## Usage

This library still not released yet, so please refer to this repo directly. Add this line to your package.json dependencies.

```javascript
{
  "dependencies": {
    "react-ohlc": "https://github.com/fudyartanto/react-ohlc.git",
  }
}
```

```javascript
import Ohlc from 'react-ohlc'
import React, { Component } from 'react'

const data = {
   'Time Series (Daily)': {
     '2018-12-06': {
        '1. open': '105.8200',
        '2. high': '109.2400',
        '3. low': '105.0000',
        '4. close': '109.1900',
        '5. volume': '47269789',
      },
      '2018-12-04': {
        '1. open': '111.9400',
        '2. high': '112.6373',
        '3. low': '108.2115',
        '4. close': '108.5200',
        '5. volume': '45196984',
      },
   },
}

class Example extends Component<Props, State> {
  render() {
    return (
      <Ohlc height={800} data={data}/>
    )
  }
}
```

## Contribution
Open terminal and run this command bellow in the root folder of project
```bash
npm start
```
Open another terminal and run this command bellow
```bash
cd example
npm start
```
## Code Guideline
- Always using flow
- Our lint rule is extended from [Standart JS](https://standardjs.com)
- Unit test is important. We are using jest to run our unit testing. [Read More..](https://jestjs.io)
- Please dont skip test when commit and push.

