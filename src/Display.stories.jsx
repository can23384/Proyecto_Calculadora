import React from 'react';
import Display from './Display';

export default {
  title: 'Display',
  component: Display,
};

export const Zero = () => <Display value="0" />;
export const Error = () => <Display value="ERROR" />;
export const LongNumber = () => <Display value="123456789" />;
