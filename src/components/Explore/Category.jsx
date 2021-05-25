/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

// eslint-disable-next-line no-unused-vars
const categoryColors = [
  'rgba(199, 167, 232, 0.7)',
  'rgba(62, 181, 149, 0.6)',
  'rgba(101, 147, 166, 0.7)',
  'rgba(204, 188, 66, 0.7)',
  'rgba(235, 144, 131, 0.7)',
  'rgba(235, 181, 130, 0.7)',
  'rgba(189, 189, 189, 0.7)',
  'rgba(137, 137, 255, 0.6)',
  'rgba(218, 155, 232, 0.7)',
];

// eslint-disable-next-line object-curly-newline
const Category = ({ name, index, addToCategories, categories }) => {
  const [selected, select] = useState(false);
  return (
    <Card
      border="primary"
      key={index}
      className="categoryCard"
      style={{
        border: `2px solid ${categoryColors[index]}`,
        borderRadius: '20px',
        opacity: '0.9',
        backgroundColor: selected ? `${categoryColors[index]}` : null,
      }}
      onClick={(e) => {
        e.preventDefault();
        select(!selected);
        addToCategories([...categories, name]);
      }}
    >
      <Card.Header>
        <div className="categoryText">{name}</div>
      </Card.Header>
    </Card>
  );
};

export default Category;
