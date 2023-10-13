/* eslint-disable react/jsx-props-no-spreading */
import React, {
  TextareaHTMLAttributes,
  PropsWithChildren,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
} from 'react';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

type AutoTextAreaProps = PropsWithChildren<TextAreaProps>;

export default function AutoTextArea(props: AutoTextAreaProps) {
  const { children, style, value, ...rest } = props;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [height, setHeight] = useState<number>();

  const resize = () => {
    if (textareaRef.current) {
      const h = textareaRef.current.scrollHeight;
      console.log('clientHeight: ', textareaRef.current.clientHeight);
      console.log('offset height ', textareaRef.current.offsetHeight);
      console.log('textarea scroll height: ', h);
      setHeight(h + 10);
    }
  };

  // useEffect(() => {
  //   resize();
  // }, []);

  useEffect(() => {
    console.log(
      'use effect , scroll height ',
      textareaRef.current?.scrollHeight
    );
    // resize();
  }, [value]);

  useLayoutEffect(() => {
    console.log(
      'layout effect , scroll height ',
      textareaRef.current?.scrollHeight
    );
    resize();
  }, [value]);

  console.log('textarea render ', value);
  console.log(
    'textarea render scroll height: ',
    textareaRef.current?.scrollHeight
  );

  return (
    <div style={{ height, display: 'flex', flexDirection: 'column' }}>
      <textarea
        ref={textareaRef}
        {...rest}
        style={{
          ...style,
          alignSelf: 'stretch',
          height: '100%',
        }}
        value={value}
      >
        {children}
      </textarea>
    </div>
  );
}
