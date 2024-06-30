import React from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'


const Navbar = () => {
  let history = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token')
    history("/login")
  }
  const location = useLocation()
  return (
    <div>
      <nav className="navbar navbar-expand-lg " style={{backgroundColor: "#e3f2fd"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/Home">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/Home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <Link to="/login"><button className="btn btn-light me-md-2"  type="button">Login</button></Link>
      <Link to="/signup"><button className="btn btn-light"  type="button">SignUp</button></Link>
      </div>: <button onClick={handleLogout} className="btn btn-light" type="button">Log Out</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
