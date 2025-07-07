import React from 'react';

const ColorPicker = ({ activeColor, onColorChange, colorLabels }) => {
  return (
    <div className='product-colors'>
      <button
        className={activeColor === 'yellow' ? 'active' : ''}
        onClick={() => onColorChange('yellow')}
      >
        {colorLabels.yellow}
      </button>
      <button
        className={activeColor === 'white' ? 'active' : ''}
        onClick={() => onColorChange('white')}
      >
        {colorLabels.white}
      </button>
      <button
        className={activeColor === 'rose' ? 'active' : ''}
        onClick={() => onColorChange('rose')}
      >
        {colorLabels.rose}
      </button>
    </div>
  );
};

export default ColorPicker; 