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
          width={100}
          height={30}
          color="blue"
          data={[1, 2, 1]}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
