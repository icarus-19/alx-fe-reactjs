import { useState } from "react";
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Counter: {count}</h2>
      <div>
        <button onClick={decrement} style={{ margin: '0 5px' }}>
          -
        </button>
        <button onClick={reset} style={{ margin: '0 5px' }}>
          Reset
        </button>
        <button onClick={increment} style={{ margin: '0 5px' }}>
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
useState