import Canvasimo from 'canvasimo';
import PropTypes from 'prop-types';
import React from 'react';
import Slik from 'slik';

interface SparkLineProps {
  data: ReadonlyArray<number>;
  width: number;
  height: number;
  color: string;
  animate?: boolean;
  animationDuration?: number;
  includeZero?: boolean;
  areaOpacity?: number;
}

interface SparkLineState {
  transition: number;
}

export class SparkLine extends React.Component<SparkLineProps, SparkLineState> {
  public static propTypes: Record<keyof SparkLineProps, PropTypes.Validator<any>> = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    includeZero: PropTypes.bool,
    areaOpacity: PropTypes.number,
  };

  public static defaultProps: Partial<SparkLineProps> = {
    includeZero: true,
    animationDuration: 1000,
    areaOpacity: 0.3,
  };

  private animation: Slik.Animation;
  private unsubscribe: Slik.unsubscribe;
  private element?: HTMLCanvasElement | null;
  private canvas?: Canvasimo;

  constructor (props: SparkLineProps) {
    super(props);

    this.state = {
      transition: 0,
    };

    this.animation = new Slik.Animation({
      from: 0,
      to: 1,
      duration: props.animationDuration,
      ease: (value) => {
        return Slik.Easing.EaseInSine(Slik.Easing.EaseInSine(value));
      },
    });

    this.unsubscribe = this.animation.subscribe('update', this.onTransition);
  }

  public componentDidMount () {
    window.addEventListener('resize', this.draw);

    if (this.element) {
      this.canvas = new Canvasimo(this.element);
      this.draw();
    }

    if (this.props.animate) {
      this.animation.reset().start();
    }
  }

  public componentDidUpdate () {
    this.draw();
  }

  public componentWillUnmount () {
    this.animation.stop();
    this.unsubscribe();
    window.removeEventListener('resize', this.draw);
  }

  public render () {
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

  private onTransition = (value: number) => {
    this.setState({
      transition: value,
    });
  }

  private storeRef = (element: HTMLCanvasElement) => {
    this.element = element;
  }

  private mapValueY (value: number, height: number, min: number, max: number) {
    const diff = max - min;

    const offset = height - 0.5;
    const calculated = ((value - min) / diff) * (height - 1);

    return offset - calculated;
  }

  private draw = () => {
    if (this.canvas) {
      const { color, width, height, includeZero, areaOpacity } = this.props;

      let { data } = this.props;
      let { transition } = this.state;
      let max = Math.max(...data);
      let min = Math.min(...data);

      const allValuesAreTheSame = max === min;

      max = includeZero && max < 0 ? 0 : max;
      min = includeZero && min > 0 ? 0 : min;

      transition = this.props.animate ? transition : 1;

      data = data.length === 1 ? data.concat(data[0]) : data;

      const datas = data.map((value, index) => {
        return {
          x: width / (data.length - 1) * index,
          y: allValuesAreTheSame ? height / 2 : this.mapValueY(value, height, min, max),
        };
      });

      const dataFill = [...datas];

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
        .setOpacity(areaOpacity!)
        .beginPath()
        .fillPath(dataFill, color);
    }
  }
}

export default SparkLine;
