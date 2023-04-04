import "../component/style/Carousel.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//import from Cloudinary
import { Cloudinary } from "@cloudinary/url-gen/instance/Cloudinary";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

//Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: "drn8zqbqe",
  },
});

function Moviepage() {
  const [movieList, setmovieList] = useState([]);
  const [directorList, setdirectorList] = useState([]);
  const [actorList, setactorList] = useState([]);
  const [reviewList, setreviewList] = useState([]);

  useEffect(() => {
    const getmovie = () => {
      axios.get("http://localhost:3001/Moviepage").then((response) => {
        setmovieList(response.data);
      });
    };

    const getdirector = () => {
      axios.get("http://localhost:3001/getDirector").then((response) => {
        setdirectorList(response.data);
      });
    };

    const getactor = () => {
      axios.get("http://localhost:3001/getActor").then((response) => {
        setactorList(response.data);
      });
    };

    const getreview = () => {
      axios.get("http://localhost:3001/getReview").then((response) => {
        setreviewList(response.data);
      });
    };

    getmovie();
    getdirector();
    getactor();
    getreview();
  }, []);

  let Param = useParams();
  let ID = parseInt(Param.ID);
  return (
    <body
      style={{
        backgroundColor: "#51484f",
        padding: "100px 125px",
        color: "#fff",
      }}
      className="d-flex"
    >
      <Container>
        {movieList.map((val) => {
          // to show all the movie title
          if (val.MovieID === ID) {
            return (
              <Container>
                <Row>
                  <span className="d-inline p-2 mb-4 text-white border-start border-warning border-4">
                    <h1>
                      <strong>{val.Title}</strong>
                    </h1>
                  </span>
                  <br />
                  <br />
                  <br />
                  <br />
                </Row>
                <Row>
                  <Col className="col-sm-5">
                    <img
                      class="img-fluid"
                      src={val.ImageLink}
                      alt="Data not found!"
                      style={{ maxHeight: "700px" }}
                    />
                  </Col>
                  <Col
                    className="col-sm-7"
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    <Row className="mb-3">
                      <p>{val.Description}</p>
                    </Row>
                    <Row className="mb-3">
                      <div style={{ display: "flex" }}>
                        <p className="col-sm-2 ps-3  border-start border-warning border-4">
                          <strong>Director</strong>
                        </p>
                        <div className="col-sm-3">
                          {directorList.map((val, key) => {
                            // to show all the movie title
                            if (val.MovieID === ID) {
                              return (
                                <div>
                                  <p>{val.DirectorName}</p>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <Row>
                        <p className="col-sm-2 ps-3  border-start border-warning border-4">
                          <strong>Stars</strong>
                        </p>
                        {actorList.map((val, key) => {
                          //set image resolution and focus it on face
                          const showImageURL = cld
                            .image(val.ActorImageLink)
                            .resize(fill().width(350).height(350).gravity(focusOn(FocusOn.face())))
                            .setDeliveryType("fetch")
                            .toURL();

                          // to show all the movie title
                          if (val.MovieID === ID) {
                            return (
                              <Col sm={3}>
                                <img
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    maxHeight: "150px",
                                    maxWidth: "150px",
                                    objectFit: "cover",
                                  }}
                                  className="rounded-circle"
                                  src={showImageURL}
                                />
                                <p>{val.ActorName}</p>
                              </Col>
                            );
                          }
                        })}
                      </Row>
                    </Row>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <span className="d-inline p-2 mb-4 text-white border-start border-warning border-4">
                    <h2>
                      <strong>Review</strong>
                    </h2>
                  </span>
                </Row>

                <Row className="mt-5">
                  {reviewList.map((val, key) => {
                    // to show all the movie title
                    if (val.MovieID === ID) {
                      return (
                        <div
                          className="p-3 rounded-4"
                          style={{
                            background: "#679267",
                          }}
                        >
                          <Row>
                            <div className="col-sm-8 ps-5">
                              <p>{val.Nickname}</p>
                              <p>{val.Date}</p>
                            </div>

                            <div
                              className="col-sm-4"
                              style={{
                                display: "flex",
                                justifyContent: "right",
                              }}
                            >
                              <p className="p-3">{val.Score}</p>
                              <img className="p-3" src="#" alt="popcorn" />
                            </div>
                          </Row>
                          <hr />
                          <Row>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                minHeight: "100px",
                              }}
                            >
                              <p>{val.review}</p>
                            </div>
                          </Row>
                        </div>
                      );
                    }
                  })}
                </Row>
              </Container>
            );
          }
        })}
      </Container>
    </body>
  );
}

export default Moviepage;
