/* eslint-disable react/prop-types */
import React from 'react';
import { Card } from 'react-bootstrap';

const categoryColors = [
  '#C7A7E8',
  '#AEE5F2',
  '#B1DBA8',
  '#F5E2AB',
  '#EB9083',
  '#EBB582',
  '#bdbdbd',
  '#8989FF',
  '#DA9BE8',
];
const Category = ({ name, index }) => (
  <Card
    border="primary"
    key={index}
    className="categoryCard"
    style={{
      backgroundColor: `${categoryColors[index]}`,
      borderRadius: '30px',
      opacity: '0.9',
    }}
  >
    <Card.Header>
      <div className="categoryText">{name}</div>
    </Card.Header>
  </Card>
);

export default Category;
