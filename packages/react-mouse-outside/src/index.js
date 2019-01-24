// @flow
import * as React from 'react';
import { conditionalDebounce } from './debounce';

type RenderProp<P> = P => React.Node;

type Props = {
  onClickOutside?: Function,
  onMoveOutside?: Function,
  delay: number,
  children: RenderProp<React.ElementRef<any>>,
};

/** @visibleName Usage example */
export default class MouseOutside extends React.Component<Props> {
  static defaultProps = {
    delay: 0,
    tag: 'div',
  };

  container = React.createRef /*:: <HTMLElement> */();

  isTargetOutside = (target: EventTarget) => {
    return (
      // $FlowFixMe HTMLDocument isn't supported (https://github.com/facebook/flow/issues/2839)
      (target instanceof HTMLElement || target instanceof HTMLDocument) &&
      (this.container.current instanceof HTMLElement &&
        !this.container.current.contains(target) &&
        document.contains(target))
    );
  };

  handleClickOutside = (evt: Event) => {
    if (this.props.onClickOutside && this.isTargetOutside(evt.target)) {
      this.props.onClickOutside(evt);
    }
  };

  handleMoveOutside = conditionalDebounce((evt: Event) => {
    if (this.props.onMoveOutside && this.isTargetOutside(evt.target)) {
      this.props.onMoveOutside(evt);
    }
  }, this.props.delay);

  componentDidMount() {
    if (this.props.onClickOutside) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
    if (this.props.onMoveOutside) {
      document.addEventListener('mousemove', this.handleMoveOutside, true);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
    document.removeEventListener('mousemove', this.handleMoveOutside, true);
  }

  render() {
    return this.props.children(this.container);
  }
}
