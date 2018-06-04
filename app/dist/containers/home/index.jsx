/* @flow */
import React from 'react';
import handler from './handler';
import Albums from './albums';

export default handler(({ activePage, fetchPage }) => (
  <div>
    <Albums />
    {/* 加載按鈕 */}
    <div
      styleName={`fetch-more ${activePage === 10 ? 'done' : ''}`}
      onClick={fetchPage}>
      {activePage === 10 ? '沒有更多資料' : '載入更多'}
    </div>
  </div>
));
