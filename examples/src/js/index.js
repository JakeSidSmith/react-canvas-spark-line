import React from 'React';
import ReactDOM from 'react-dom';
import SparkLine from '../../../src/index';

const DATA = [
  1,
  2,
  9,
  4,
  8,
  3,
  8,
  3
];

class App extends React.Component {
  render () {
    return (
      <div>
        <SparkLine
          animate
          animationDuration={2000}
          width={100}
          height={30}
          color="red"
          data={DATA}
        />

        <SparkLine
          animate
          width={100}
          height={30}
          color="green"
          data={[100]}
        />

        <SparkLine
          animate
          width={100}
          height={30}
          color="blue"
          data={[0]}
        />

        <SparkLine
          animate
          width={100}
          height={30}
          color="red"
          data={[10, 10]}
        />

        <SparkLine
          width={100}
          height={30}
          color="green"
          data={[1, 2, 1]}
        />

        <SparkLine
          width={100}
          height={30}
          color="blue"
          data={[1, 2, 1]}
          includeZero={false}
        />

        <SparkLine
          width={100}
          height={30}
          color="red"
          data={[-10, 20, 5]}
        />

        <SparkLine
          width={100}
          height={30}
          color="green"
          data={[-10, -20, -5]}
        />

        <SparkLine
          width={100}
          height={30}
          color="blue"
          data={[-10, -20, -5]}
          includeZero={false}
          areaOpacity={0}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
