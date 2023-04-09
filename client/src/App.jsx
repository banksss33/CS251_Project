import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import InputGroup from "react-bootstrap/InputGroup";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Hub from "./Page/Homepage";
import SignIn from "./Page/SignIn";
import Showall from "./Page/Showall";
import Moviepage from "./Page/Moviepage";
import "../src/component/style/SearchBar.css";
import { Col, Container, Row } from "react-bootstrap";
import NotFound from "./Page/NotFound";

function App() {
  const [movieList, setmovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const onchange = (event) => setSearchTerm(event.target.value);

  useEffect(() => {
    const getmovie = () => {
      axios.get("http://localhost:3001/Moviepage").then((response) => {
        setmovieList(response.data);
      });
    };

    getmovie();
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        fixed="top"
        variant="dark"
        className="d-flex shadow justify-content-between"
        style={{
          paddingLeft: "40px",
          paddingRight: "40px",
          zIndex: 10,
        }}
      >
        <LinkContainer to="/">
          <Navbar.Brand>!ICON!</Navbar.Brand>
        </LinkContainer>

        <Nav>
          <InputGroup>
            <InputGroup.Text
              className="shadow"
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <box-icon name="search" />
            </InputGroup.Text>

            <Form.Control
              id="searchmovie"
              aria-label="Text input with dropdown button"
              type="text"
              value={searchTerm}
              placeholder="Search"
              onChange={onchange}
              style={{
                backgroundColor: "transparent",
                border: "none",
                width: "500px",
              }}
              className="shadow text-light"
            />
            {/* Data results */}
            <Container className="dropdownSearch">
              {/* filter for search */}
              {movieList
                .filter((val) => {
                  const search = searchTerm.toLowerCase();
                  const name = val.Title.toLowerCase();

                  return search && name.startsWith(search);
                })
                .map((val, key) => {
                  // to show all the movie title
                  return (
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/Moviepage/${val.MovieID}`}
                      onClick={() => {
                        setSearchTerm("");
                      }}
                    >
                      <Row key={key} className="rowSearch border-bottom">
                        <Col className="d-flex">
                          <img
                            style={{
                              paddingTop: "0.5%",
                              paddingBottom: "0.5%",
                              width: "75px",
                              height: "100%",
                              minHeight: "105px",
                            }}
                            src={val.ImageLink}
                          />
                          <div className="clickSearch">
                            <strong>{val.Title}</strong>
                            <p>{val.Year}</p>
                          </div>
                        </Col>
                      </Row>
                    </Link>
                  );
                })}
            </Container>
          </InputGroup>

          <LinkContainer to="/WatchList">
            <Nav.Link>WatchList</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/SignIn">
            <Nav.Link>SignIn</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>

      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Moviepage/:ID" element={<Moviepage />} />
        <Route path="/WatchList" element={<Showall />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
