import React from 'react';

interface Props {
  data: { [key: string]: string | undefined };
}

export default function PropValueView(props: Props) {
  const { data } = props;
  const keys = Object.keys(data);
  return (
    <div>
      {keys.map((key) => {
        const value = data[key];
        return (
          <div key={key}>
            <div>
              {key}:{value || '<undefined>'}
            </div>
          </div>
        );
      })}
    </div>
  );
}
