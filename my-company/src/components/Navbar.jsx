import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
      <Link to="/about" style={{ marginRight: '15px' }}>About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  )
}

function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #ccc',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Logo/Brand */}
      <div style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333'
      }}>
        My Company
      </div>

      {/* Navigation Links */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px'
      }}>
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            color: '#333',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '4px',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#e9ecef'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Home
        </Link>
        <Link 
          to="/about" 
          style={{ 
            textDecoration: 'none', 
            color: '#333',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '4px',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#e9ecef'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          About
        </Link>
        <Link 
          to="/contact" 
          style={{ 
            textDecoration: 'none', 
            color: '#333',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '4px',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#e9ecef'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Contact
        </Link>
      </div>

      {/* Optional: Right side (could be login button, etc.) */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        {/* Add additional elements here if needed */}
      </div>
    </nav>
  )
}

export default Navbar