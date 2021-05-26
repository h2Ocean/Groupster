import React from 'react';
import widgets from '../Reusable/widgets';

const Members = () => (
  <div id="Members">
    <div
      className="navBarWidget"
      style={{ paddingTop: '30px', border: 'none' }}
    >
      {widgets.member('Amber')}
      {widgets.member('Peter')}
      {widgets.member('Jason')}
    </div>
  </div>
);

export default Members;
