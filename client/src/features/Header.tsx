import { Link, NavLink } from "react-router-dom"

const Header: React.FC = () => {
  return (
    <header className="py-3 mb-4 border-bottom d-flex flex-wrap justify-content-center">
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <i className="bi-activity me-2"></i>
        <span className="fs-4">Transaction Tracker</span>
      </Link>

      <ul className="nav nav-pills ms-4">
        <li className="nav-item">
          <NavLink
            to="/"
            className={(navData) =>
              navData.isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/add"
            className={(navData) =>
              navData.isActive ? "nav-link active" : "nav-link"
            }
          >
            Add Transaction
          </NavLink>
        </li>
      </ul>
    </header>
  )
}

export default Header
