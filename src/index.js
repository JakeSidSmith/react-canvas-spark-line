import Canvasimo from 'canvasimo';
import PropTypes from 'prop-types';
import React from 'react';
import { animate } from 'react-slik';
import Slik from 'slik';

const animation = new Slik.Animation({
  from: 0,
  to: 1,
  duration: 1000,
  ease: (value) => {
    return Slik.Easing.EaseInSine(Slik.Easing.EaseInSine(value));
  }
});

export class SparkLine extends React.Component {
  componentDidMount () {
    window.addEventListener('resize', this.draw);

    if (this.element) {
      this.canvas = new Canvasimo(this.element);
      this.draw();
    }

    if (this.props.animate) {
      animation.reset().start();
    }
  }

  componentDidUpdate () {
    this.draw();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.draw);
  }

  storeRef = (element) => {
    this.element = element;
  }

  mapValueY (value, height, min, max) {
    const diff = max - min;

    const offset = height - 0.5;
    const calculated = ((value - min) / diff) * (height - 1);

    return offset - calculated;
  }

  draw = () => {
    if (this.canvas) {
      const { color, width, height, includeZero } = this.props;
      let { data, transition } = this.props;
      let max = Math.max.apply(null, data);
      let min = Math.min.apply(null, data);

      const allValuesAreTheSame = max === min;

      max = includeZero && max < 0 ? 0 : max;
      min = includeZero && min > 0 ? 0 : min;

      transition = this.props.animate ? transition : 1;

      data = data.length === 1 ? data.concat(data[0]) : data;

      const datas = data.map((value, index) => {
        return {
          x: width / (data.length - 1) * index,
          y: allValuesAreTheSame ? height / 2 : this.mapValueY(value, height, min, max)
        };
      });

      const dataFill = [].concat(datas);

      dataFill.unshift({x: 0, y: height});
      dataFill.push({x: width, y: height});

      this.canvas
        .clearCanvas()
        .setDensity(2)
        .beginPath()
        .plotRect(0, 0, width * transition, height)
        .clip()
        .setStrokeWidth(1)
        .beginPath()
        .strokePath(datas, color)
        .setOpacity(0.3)
        .beginPath()
        .fillPath(dataFill, color);
    }
  }

  render () {
    const { width, height } = this.props;

    return (
      <canvas
        ref={this.storeRef}
        width={width}
        height={height}
        style={{width, height}}
      />
    );
  }
}

SparkLine.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string,
  animate: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  includeZero: PropTypes.bool
};

SparkLine.defaultProps = {
  includeZero: true
};

export default animate(SparkLine, {transition: animation}, {bind: 'update', startOnMount: false, stopOnUnmount: true});
