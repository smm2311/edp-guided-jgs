import { Link } from "react-router-dom";

export function NavBar() {

    return (
        <>

        <nav className="navbar navbar-expand-lg bg-body-tertiary">

        <div className="container-fluid">

          <a className="navbar-brand">Star Wars Universe Lookup</a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link to="/characters">Characters</Link>
              </li>

              <li className="nav-item">
                <Link to="/films">Films</Link>
              </li>

              <li className="nav-item">
                <Link to="/planets">Planets</Link>
              </li>

            </ul>

            {/* SEARCH BAR HERE */}

          </div>
        </div>
      </nav>
      </>
    );
}