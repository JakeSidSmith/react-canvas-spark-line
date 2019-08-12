declare module 'slik' {
  /*
  Should define more specific types for `from` and `to` values
  number, object, array, immutable
  */

  type events = 'all' | 'start' | 'stop' | 'pause' | 'end' | 'update' | 'loop';
  type EasingFunction = (input: number) => number;
  type EventListener = (values: any) => void;
  type unsubscribe = () => void;

  interface IAnimationConfig {
    from?: any;
    to?: any;

    duration?: number;
    delay?: number;
    fps?: number;

    loop?: boolean;

    ease?: EasingFunction;
  }

  interface IEasing {
    Linear: EasingFunction;
    EaseInOutSine: EasingFunction;
    EaseInSine: EasingFunction;
    EaseOutSine: EasingFunction;
    Dip: EasingFunction;
    Spring: EasingFunction;
  }

  export class Animation {
    constructor(config: IAnimationConfig);
    public from(input: any): Animation;
    public to(input: any): Animation;

    public fps(input: number): Animation;
    public duration(input: number): Animation;
    public delay(input: number): Animation;

    public loop(input: boolean): Animation;

    public invert(): Animation;
    public reverse(): Animation;
    public start(): Animation;
    public play(): Animation;
    public stop(): Animation;
    public reset(): Animation;
    public pause(): Animation;

    public ease(easingFunction: EasingFunction): Animation;
    public bind(event: events, callback: EventListener): Animation;
    public unbind(event: events, callback: EventListener): Animation;
    public on(event: events, callback: EventListener): Animation;
    public off(event: events, callback: EventListener): Animation;
    public first(callback: (values: any) => void): Animation;
    public then(callback: (values: any) => void): Animation;

    public playing(): boolean;
    public looping(): boolean;

    public subscribe(event: events, callback: EventListener): unsubscribe;
  }

  export const Easing: IEasing;

  namespace Slik {}
}
