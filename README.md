# SparkLine

[![CircleCI](https://circleci.com/gh/JakeSidSmith/react-canvas-spark-line.svg?style=svg)](https://circleci.com/gh/JakeSidSmith/react-canvas-spark-line)

**Simple canvas SparkLine React component**

![Examples](https://raw.githubusercontent.com/JakeSidSmith/react-canvas-spark-line/master/images/examples.gif)

## Install

```shell
npm install react-canvas-spark-line --save --save-exact
```

## Usage

```javascript
import SparkLine from 'react-canvas-spark-line';

const data = [
  1,
  2,
  3
];

class MyComponent extends Component {
  render () {
    return (
      <SparkLine
        animate
        animationDuration={2000} // Default: 1000 (milliseconds)
        width={100}
        height={30}
        color="red"
        data={data}
        includeZero={false} // Default: true
        areaOpacity={0} // Default: 0.3
      />
    );
  }
}
```
