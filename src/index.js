import Canvasimo from 'canvasimo';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
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
  constructor (props) {
    super(props);

    this.draw = this.draw.bind(this);
  }

  componentDidMount () {
    window.addEventListener('resize', this.draw);

    this.element = ReactDOM.findDOMNode(this);

    if (this.element) {
      this.canvas = new Canvasimo(this.element);
      this.draw();
    }
  }

  componentDidUpdate () {
    this.draw();
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.draw);
  }

  draw () {
    if (this.canvas) {
      const { color, width, height } = this.props;
      let { data, transition } = this.props;
      const max = Math.max.apply(null, data) + 1;

      transition = this.props.animate ? transition : 1;

      data = data.length === 1 ? data.concat(data[0]) : data;

      const datas = data.map((number, index) => {
        return {
          x: width / (data.length - 1) * index * 2,
          y: height * 2 - number / max * height * 2
        };
      });

      const dataFill = [].concat(datas);

      dataFill.unshift({x: 0, y: height * 2});
      dataFill.push({x: width * 2, y: height * 2});

      this.canvas
        .clearCanvas()
        .beginPath()
        .plotRect(0, 0, width * 2 * transition, height * 2)
        .clip()
        .setStrokeWidth(2)
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
  data: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default animate(SparkLine, {transition: animation}, {bind: 'update', startOnMount: true, stopOnUnmount: true});
