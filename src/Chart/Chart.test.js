import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './Chart';
import jsonFiles from './data/jp_android_native_rect.json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(Chart(jsonFiles), div);
});
