/* eslint-disable */
const profile = {
   username: '',
   password: 'HASHED',
   name: '',
   pfp: 'GOOGLE FIREBASE LINK',
   email: '',
   orgs: [{ORGID}],
   age: 0,
   channels: [{CHANNELID}],
};

const organization = {
   name: '',
   desc: '',
   admin: [
      {PROFILEID},
   ],
   owner: {profileID}
};

const channel = {
   name: '',
   desc: '',
   category: {CATEGORYID},
   subCategory: {SUBCATEGORYID},
   roles: [
      {ROLEID}
   ],
   admin: [
      {PROFILEID},
   ],
   owner: {PROFILEID},
   org: {ORGID},
   users: [
      {
         profile: {PROFILEID},
         role: {ROLEID}
      },
   ]
};

const role = {
   channel: {CHANNELID},
   name: '',
   permissions: [
      //BOOLEANS HERE
   ],
};

const category = {
   name: '',
   subCategory: [
      {SUBCATEGORYID}
   ]
};

const subCategory = {
   name: '',
   channels: [
      {CHANNELID},
   ],
};

