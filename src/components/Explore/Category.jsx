/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
const Category = ({ name, index }) => {
  const [isChecked, setCheck] = useState(false);
  return (
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
      <Card.Header onClick={setCheck(true)}>
        <div className="categoryText">{name}</div>
        {isChecked ? <CheckCircleIcon /> : null}
      </Card.Header>
    </Card>
  );
};

export default Category;
