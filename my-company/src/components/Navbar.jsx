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

export default Navbar