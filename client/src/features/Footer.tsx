const Footer: React.FC = () => {
  return (
    <footer className="mt-auto d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <a
          href="https://getbootstrap.com/"
          className="me-2 text-muted text-decoration-none lh-1"
          target="_blank"
          rel="noreferrer"
        >
          <i className="bi-bootstrap"></i>
        </a>
        <span className="text-muted">Made by Dijwar Bozyel</span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <a
            className="text-muted"
            href="https://github.com/didactic-goggles"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi-github"></i>
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
