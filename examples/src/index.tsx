import React from 'react';
import ReactDOM from 'react-dom';
import SparkLine from '../../src/index';

const data: number[] = [];

for (let i = 0; i < 20; i += 1) {
  data.push(Math.random() * 10);
}

class App extends React.Component {
  public render () {
    return (
      <>
        <p>Random data with zero line and default area</p>
        <SparkLine
          animate
          animationDuration={2000}
          width={100}
          height={30}
          color="red"
          data={data}
        />

        <p>Random data without zero line and no area</p>
        <SparkLine
          animate
          animationDuration={2000}
          width={100}
          height={30}
          color="red"
          data={data}
          includeZero={false}
          areaOpacity={0}
        />

        <p>Random data with area color</p>
        <SparkLine
          animate
          animationDuration={2000}
          width={100}
          height={30}
          color="red"
          data={data}
          areaColor="orange"
        />

        <p>Random data with area gradient</p>
        <SparkLine
          animate
          animationDuration={2000}
          width={100}
          height={30}
          color="red"
          data={data}
          areaColor={['red', 'white']}
        />

        <p>Single value (100)</p>
        <SparkLine
          animate
          width={100}
          height={30}
          color="green"
          data={[100]}
        />

        <p>Single value (0)</p>
        <SparkLine
          animate
          width={100}
          height={30}
          color="blue"
          data={[0]}
        />

        <p>2 identical values ([10, 10])</p>
        <SparkLine
          animate
          width={100}
          height={30}
          color="red"
          data={[10, 10]}
        />

        <p>Include zero line ([1, 2, 1])</p>
        <SparkLine
          width={100}
          height={30}
          color="green"
          data={[1, 2, 1]}
        />

        <p>Without zero line ([1, 2, 1])</p>
        <SparkLine
          width={100}
          height={30}
          color="blue"
          data={[1, 2, 1]}
          includeZero={false}
        />

        <p>Negative value ([-10, 20, 5])</p>
        <SparkLine
          width={100}
          height={30}
          color="red"
          data={[-10, 20, 5]}
        />

        <p>All negative values with zero line ([-10, -20, -5])</p>
        <SparkLine
          width={100}
          height={30}
          color="green"
          data={[-10, -20, -5]}
        />

        <p>All negative values without zero line ([-10, -20, -5])</p>
        <SparkLine
          width={100}
          height={30}
          color="blue"
          data={[-10, -20, -5]}
          includeZero={false}
        />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
