import React from 'react';
import widgets from '../Reusable/widgets';
import profile1 from '../Reusable/dummy_profile_photos/profile1.jpg';
import profile9 from '../Reusable/dummy_profile_photos/profile9.jpg';
import profile10 from '../Reusable/dummy_profile_photos/profile10.jpg';

const members = [
  {
    name: 'Erica',
    src: 'https://drive.google.com/thumbnail?id=1BxhrkgT0ypUe2Dt-zD2-Kr8lvwel93ym',
  },
  {
    name: 'Peter',
    src: profile1,
  },
  {
    name: 'Jason',
    src: profile9,
  },
  {
    name: 'Ginny',
    src: profile10,
  },
];
const avatar = (name, src) => widgets.memberAvatar(`${name}`, `${src}`);

const Members = () => (
  <div id="Members">
    <div className="heading">Members</div>
    <div className="navBarWidget" style={{ border: 'none' }}>
      {members.map((member) => widgets.member(member.name, avatar(member.name, member.src)))}
    </div>
  </div>
);

export default Members;
