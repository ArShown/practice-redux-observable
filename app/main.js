import React from 'react';
import { render } from 'react-dom';
import router from '~/core/router';
// 以下為動態資料，依需求修改 ====================================

render(
  router({
    //masterComponent: Master,
    routerIndex: '/index'
  }),
  document.getElementById('container')
);
