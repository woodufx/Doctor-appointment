import React, { useState, FC } from 'react';
import 'styles/components/slider/iconSlider.scss';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Slider } from 'antd';

interface IconSliderProps {
  max: number;
  min: number;
  onChange: (value: number) => void;
}

const IconSlider: FC<IconSliderProps> = (props) => {
  const { max, min } = props;
  const [value, setValue] = useState(0);

  const handleChange = (value: number) => {
    setValue(value);
    props.onChange(value);
  }

  const mid = Number(((max - min) / 2).toFixed(5));
  const preColorCls = value >= mid ? '' : 'icon-wrapper-active';
  const nextColorCls = value >= mid ? 'icon-wrapper-active' : '';

  return (
    <div className="icon-wrapper">
      <SmileOutlined className={preColorCls} />
      <Slider {...props} onChange={handleChange} value={value} />
      <FrownOutlined className={nextColorCls} />
    </div>
  );
};

export default IconSlider;
