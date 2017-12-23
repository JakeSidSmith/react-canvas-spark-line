import React from 'react';
import renderer from 'react-test-renderer';
import SparkLine from '../src';

describe('SparkLine', () => {

  it('should render a canvas with the provided width and height', () => {
    const tree = renderer.create(
      <SparkLine
        width={80}
        height={20}
        data={[1, 2, 3]}
        color="red"
      />
    );
    expect(tree).toMatchSnapshot();
  });

});
