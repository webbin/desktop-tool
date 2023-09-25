import React from 'react';
import { Col, Row } from 'antd';

import { CommandData } from '../types';
import CommandItem from './CommandItem';

interface Props {
  data: CommandData[];
  onRefresh: () => void;
}

export default function CommandList(props: Props) {
  const { data, onRefresh } = props;
  return (
    <div
      style={{
        // backgroundColor: '#fee',
        // borderRadius: 10,
        marginTop: 40,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
        minHeight: 100,
        display: 'flex',
      }}
    >
      {data.length ? (
        data.map((item, index) => {
          const key = `item-${index}`;
          if (index % 2 === 0) {
            const nextItem = data[index + 1];
            return (
              <Row key={key}>
                <Col>
                  <CommandItem data={item} />
                </Col>
                <Col>
                  {nextItem ? <CommandItem data={nextItem} /> : <div />}
                </Col>
              </Row>
            );
          }
          return null;
        })
      ) : (
        <div>
          <span
            style={{
              alignSelf: 'center',
              alignContent: 'center',
              display: 'flex',
            }}
          >
            没有找到指令，请新增
          </span>
          <button type="button" onClick={onRefresh}>
            刷新
          </button>
        </div>
      )}
    </div>
  );
}
