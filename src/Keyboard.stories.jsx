import React from 'react';
import Keyboard from './Keyboard';

export default {
  title: 'Keyboard',
  component: Keyboard,
};

export const Default = () => <Keyboard onClick={console.log} />;
