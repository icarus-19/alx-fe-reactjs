
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrease = () => {
    setCount(prevCount => prevCount - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter">
      <h2>Current Value: {count}</h2>
      <div className="counter-buttons">
        <button onClick={increase} className="btn btn-add">
          +
        </button>
        <button onClick={reset} className="btn btn-reset">
          Reset
        </button>
        <button onClick={decrease} className="btn btn-subtract">
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;