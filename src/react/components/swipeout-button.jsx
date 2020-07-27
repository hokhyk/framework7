import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs, emit } from '../shared/utils';
import { colorClasses } from '../shared/mixins';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  text? : string
  confirmTitle? : string
  confirmText? : string
  overswipe? : boolean
  close? : boolean
  delete? : boolean
  href? : string
  COLOR_PROPS
  onClick? : (event?: any) => void
*/

const SwipeoutButton = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    children,
    text,
    confirmTitle,
    confirmText,
    overswipe,
    close,
    delete: deleteProp,
    href,
  } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  const onClick = (e) => {
    emit(props, 'click', e);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(
    className,
    {
      'swipeout-overswipe': overswipe,
      'swipeout-delete': deleteProp,
      'swipeout-close': close,
    },
    colorClasses(props),
  );

  return (
    <a
      ref={elRef}
      href={href || '#'}
      id={id}
      style={style}
      data-confirm={confirmText || undefined}
      data-confirm-title={confirmTitle || undefined}
      className={classes}
      {...dataAttrs}
      onClick={onClick}
    >
      {children && children.length ? children : text}
    </a>
  );
});

SwipeoutButton.displayName = 'f7-swipeout-button';

export default SwipeoutButton;
