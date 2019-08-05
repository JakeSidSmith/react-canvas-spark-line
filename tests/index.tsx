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

  describe('areaColor', () => {
    it('should be optional', () => {
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

    it('should accept a string', () => {
      const tree = renderer.create(
          <SparkLine
              width={80}
              height={20}
              data={[1, 2, 3]}
              color="red"
              areaColor="red"
          />
      );
      expect(tree).toMatchSnapshot();
    });

    it('should accept an array of strings', () => {
      const tree = renderer.create(
          <SparkLine
              width={80}
              height={20}
              data={[1, 2, 3]}
              color="red"
              areaColor={['red', 'white']}
          />
      );

      expect(tree).toMatchSnapshot();
    });
  });
});
