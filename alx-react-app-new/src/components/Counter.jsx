import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  const reset = () => {
    setCount(0)
  }

  return (
    <div style={{
      padding: '20px',
      border: '2px solid #007bff',
      borderRadius: '10px',
      maxWidth: '300px',
      margin: '20px auto',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <h2>Counter: {count}</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '15px'
      }}>
        <button 
          onClick={decrement}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Decrement -
        </button>
        
        <button 
          onClick={reset}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
        
        <button 
          onClick={increment}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Increment +
        </button>
      </div>
      
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <p>Click the buttons to change the counter value!</p>
      </div>
    </div>
  )
}

export default Counter