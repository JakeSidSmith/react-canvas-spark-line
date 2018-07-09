import Canvasimo from 'canvasimo';
import PropTypes from 'prop-types';
import React from 'react';
import Slik from 'slik';

export class SparkLine extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      transition: 0
    };

    this.animation = new Slik.Animation({
      from: 0,
      to: 1,
      duration: props.animationDuration,
      ease: (value) => {
        return Slik.Easing.EaseInSine(Slik.Easing.EaseInSine(value));
      }
    });

    this.unsubscribe = this.animation.subscribe('update', this.onTransition);
  }
  componentDidMount () {
    window.addEventListener('resize', this.draw);

    if (this.element) {
      this.canvas = new Canvasimo(this.element);
      this.draw();
    }

    if (this.props.animate) {
      this.animation.reset().start();
    }
  }

  componentDidUpdate () {
    this.draw();
  }

  componentWillUnmount () {
    this.animation.stop();
    this.unsubscribe();
    window.removeEventListener('resize', this.draw);
  }

  onTransition = (value) => {
    this.setState({
      transition: value
    });
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
      let { data } = this.props;
      let { transition } = this.state;
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
        .setSize(width, height)
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
        width={width * 2}
        height={height * 2}
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
  animationDuration: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  includeZero: PropTypes.bool
};

SparkLine.defaultProps = {
  includeZero: true,
  animationDuration: 1000
};

export default SparkLine;
