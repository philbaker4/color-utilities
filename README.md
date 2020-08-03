# color-utilities

This is a lightweight library for color manipulation and linear gradient creation. The library was born out of frustration when trying to create and color vanilla Javascript data visualizations. I struggled to find lightweight, easy to use, and reliable resources to manipulate colors and generate customized multicolor linear gradients, so I started writing my own. Enjoy!

## Getting Started


### Installation
```bash
$ npm install color-utilities
```

### Usage
```js{18-31,34}
import { getMultiColorLinearGradient } from 'color-utilities'

const multiColorGradientDefinition = [
  {
    minVal: 0,
    minColor: 'red',
    maxVal: 1,
    maxColor: 'blue',
  },
  {
    minVal: 1,
    minColor: 'blue',
    maxVal: 3,
    maxColor: 'yellow',
  },
];
getMultiColorDataGradient(multiColorGradientDefinition, 12, 'RGB_ARRAY')
---
[
    { color: [204, 0, 51], minVal: 0, maxVal: 0.25 },
    { color: [153, 0, 102], minVal: 0.25, maxVal: 0.5 },
    { color: [102, 0, 153], minVal: 0.5, maxVal: 0.75 },
    { color: [51, 0, 204], minVal: 0.75, maxVal: 1 },
    { color: [28, 28, 227], minVal: 1, maxVal: 1.25 },
    { color: [57, 57, 198], minVal: 1.25, maxVal: 1.5 },
    { color: [85, 85, 170], minVal: 1.5, maxVal: 1.75 },
    { color: [113, 113, 142], minVal: 1.75, maxVal: 2 },
    { color: [142, 142, 113], minVal: 2, maxVal: 2.25 },
    { color: [170, 170, 85], minVal: 2.25, maxVal: 2.5 },
    { color: [198, 198, 57], minVal: 2.5, maxVal: 2.75 },
    { color: [227, 227, 28], minVal: 2.75, maxVal: 3 },
]
---
getColorFromMultiColorDataGradient(multiColorGradientDefinition, 12, 0.5, 'RGB_ARRAY', true)
---
[102, 0, 153]
---

```

### [Complete Documentation](https://color-utilities-doc.vercel.app/)

## Development

Playground.ts can be used as a sandbox area to play around with existing functionality and develop new features. To run: 

```bash
$ npm run playground
```

### Testing
```bash
$ npm run test
```


## Feedback & Contributions

Feeback and contributions are both more than welcome. Feel free to submit issues and/or pull requests.



