import ReactDOM from 'react-dom';

const getContext = jest.fn(() => {
  return {
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    beginPath: jest.fn(),
    closePath: jest.fn(),
    rect: jest.fn(),
    clip: jest.fn(),
    stroke: jest.fn(),
    fill: jest.fn(),
  };
});

const getAttribute = jest.fn((attribute) => {
  return attribute;
});

const setAttribute = jest.fn((attribute) => {
  return attribute;
});

jest.spyOn(ReactDOM, 'findDOMNode').mockImplementation(() => ({
  getContext,
  getAttribute,
  setAttribute,
}) as unknown as HTMLCanvasElement);
