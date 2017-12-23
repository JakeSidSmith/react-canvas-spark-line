# SparkLine

**Simple canvas SparkLine React component**

## Install

```shell
npm install react-canvas-spark-line --save --save-exact
```

## Usage

```javascript
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
        width={100}
        height={30}
        color="red"
        data={data}
      />
    );
  }
}
```
