"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
const CourseFilterTwo = () => {
  const [show, setShow] = useState(true);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [paid, setPaid] = useState(true);
  

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/category/");
        setCategories(response.data);
        const response_level = await axiosInstance.get("/api/level/");
        setLevels(response_level.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    
    if (event.target.checked) {
      setSelectedValues((prevValues) => [...prevValues, value]);
    } else {
      setSelectedValues((prevValues) =>
        prevValues.filter((item) => item !== value)
      );
    }
  };

  const handleCheckboxChangeLevel = (event) => {
    const value = event.target.value;
    
    if (event.target.checked) {
      setSelectedLevels((prevValues) => [...prevValues, value]);
    } else {
      setSelectedLevels((prevValues) =>
        prevValues.filter((item) => item !== value)
      );
    }
  };



  return (
    <>
      <div className="col-lg-9">
        <div className="rbt-sidebar-widget-wrapper filter-top-2 mt--60">
          <div className="row g-5">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div
                className={`rbt-single-widget rbt-widget-categories ${
                  show ? "has-show-more" : ""
                }`}
              >
                <div className="inner">
                  <h4 className="rbt-widget-title-2">Kategoriýalar</h4>
                  <ul className="rbt-sidebar-list-wrapper categories-list-check has-show-more-inner-content">
                  {categories?.length===0 ? [] : 
                      categories?.map((category, index) => {
                        return (
                          <li className="rbt-check-group" key={index}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`checkbox${category?.id}`}
                              style={{
                                  width: '3.5em',  
                                  height: '3.5em', 
                                  border: '2px solid #007bff',
                                  borderRadius: '5px',
                                  transition: 'background-color 0.3s, border-color 0.3s',
                              }}
                              value={category?.slug}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`checkbox${category?.id}`}
                              style={{
                                fontSize: '16px',
                                color: '#333',
                                marginLeft: '10px',
                                cursor: 'pointer',
                              }}
                            >
                              {category?.title}
                            </label>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
                <div
                  className={`rbt-show-more-btn ${show ? "" : "active"}`}
                  onClick={() => setShow(!show)}
                >
                  Doly aç
                </div>
              </div>
            </div>

            

            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="rbt-single-widget rbt-widget-prices">
                <div className="inner">
                  <h4 className="rbt-widget-title-2">Bahasy</h4>
                  <ul className="rbt-sidebar-list-wrapper prices-list-check">
                    <li className="rbt-check-group">
                      <input
                        id="prices-list-1"
                        type="checkbox"
                        name="prices-list-1"
                      />
                      <label htmlFor="prices-list-1">
                        Hemmesi 
                        {/* <span className="rbt-lable count">15</span> */}
                      </label>
                    </li>
                    <li className="rbt-check-group">
                      <input
                        id="prices-list-2"
                        type="checkbox"
                        name="prices-list-2"
                      />
                      <label htmlFor="prices-list-2">
                        Mugt 
                        {/* <span className="rbt-lable count">0</span> */}
                      </label>
                    </li>
                    <li className="rbt-check-group">
                      <input
                        id="prices-list-3"
                        type="checkbox"
                        name="prices-list-3"
                      />
                      <label htmlFor="prices-list-3">
                        Tölegli
                        {/* <span className="rbt-lable count">10</span> */}
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="rbt-single-widget rbt-widget-lavels">
                <div className="inner">
                  <h4 className="rbt-widget-title-2">Derejeler</h4>
                  <ul className="rbt-sidebar-list-wrapper lavels-list-check">
                    <li className="rbt-check-group" key={""}>
                      <input
                        id="lavels-list-1"
                        type="checkbox"
                        name="lavels-list-1"
                      />
                      <label htmlFor="lavels-list-1">
                        Ähli derejeler
                        {/* <span className="rbt-lable count">15</span> */}
                      </label>
                    </li>
                    {
                      levels.length ===0 ? [] : levels.map(
                        (level,index) => {
                          return (
                          <li className="rbt-check-group" key={index}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`check${level?.id}`}
                              // style={{
                              //     width: '3.5em',  
                              //     height: '3.5em', 
                              //     border: '2px solid #007bff',
                              //     borderRadius: '5px',
                              //     transition: 'background-color 0.3s, border-color 0.3s',
                              // }}
                              value={level?.slug}
                              onChange={handleCheckboxChangeLevel}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`check${level?.id}`} //duzetmeli
                              // style={{
                              //   fontSize: '16px',
                              //   color: '#333',
                              //   marginLeft: '10px',
                              //   cursor: 'pointer',
                              // }}
                            >
                              {level?.title}
                            </label>
                          </li>        
                          )
                        }
                      )
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseFilterTwo;












{/* <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="rbt-single-widget rbt-widget-rating">
                <div className="inner">
                  <h4 className="rbt-widget-title-2">Ratings</h4>
                  <ul className="rbt-sidebar-list-wrapper rating-list-check">
                    <li className="rbt-check-group">
                      <input id="cat-radio-1" type="radio" name="rbt-radio" />
                      <label htmlFor="cat-radio-1">
                        <span className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </span>
                        <span className="rbt-lable count">5</span>
                      </label>
                    </li>
                    <li className="rbt-check-group">
                      <input id="cat-radio-2" type="radio" name="rbt-radio" />
                      <label htmlFor="cat-radio-2">
                        <span className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="off fas fa-star"></i>
                        </span>
                        <span className="rbt-lable count">4</span>
                      </label>
                    </li>
                    <li className="rbt-check-group">
                      <input id="cat-radio-3" type="radio" name="rbt-radio" />
                      <label htmlFor="cat-radio-3">
                        <span className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="off fas fa-star"></i>
                          <i className="off fas fa-star"></i>
                        </span>
                        <span className="rbt-lable count">3</span>
                      </label>
                    </li>
                    <li className="rbt-check-group">
                      <input id="cat-radio-4" type="radio" name="rbt-radio" />
                      <label htmlFor="cat-radio-4">
                        <span className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="off fas fa-star"></i>
                          <i className="off fas fa-star"></i>
                          <i className="off fas fa-star"></i>
                        </span>
                        <span className="rbt-lable count">2</span>
                      </label>
                    </li>

                    <li className="rbt-check-group">
                      <input id="cat-radio-5" type="radio" name="rbt-radio" />
                      <label htmlFor="cat-radio-5">
                        <span className="rating">
                          <i className="fas fa-star"></i>
                          <i className="off fas fa-star"></i>
                          <i className="off fas fa-star"></i>
                          <i className="off fas fa-star"></i>
                          <i className="off fas fa-star"></i>
                        </span>
                        <span className="rbt-lable count">1</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}

            {/* <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="rbt-single-widget rbt-widget-instructor">
                <div className="inner">
                  <h4 className="rbt-widget-title-2">Instructors</h4>
                  <ul className="rbt-sidebar-list-wrapper instructor-list-check">
                    <li className="rbt-check-group">
                      <input
                        id="ins-list-1"
                        type="checkbox"
                        name="ins-list-1"
                      />
                      <label htmlFor="ins-list-1">
                        Slaughter <span className="rbt-lable count">15</span>
                      </label>
                    </li>
                    <li className="rbt-check-group">
                      <input
                        id="ins-list-2"
                        type="checkbox"
                        name="ins-list-2"
                      />
                      <label htmlFor="ins-list-2">
                        Patrick <span className="rbt-lable count">20</span>
                      </label>
                    </li>
                    <li className="rbt-check-group">
                      <input
                        id="ins-list-3"
                        type="checkbox"
                        name="ins-list-3"
                      />
                      <label htmlFor="ins-list-3">
                        Angela <span className="rbt-lable count">10</span>
                      </label>
                    </li>
                    <li className="rbt-check-group">
                      <input
                        id="ins-list-4"
                        type="checkbox"
                        name="ins-list-4"
                      />
                      <label htmlFor="ins-list-4">
                        Fatima Asrafy
                        <span className="rbt-lable count">15</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}

            {/* <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="rbt-single-widget rbt-widget-features">
                <div className="inner">
                  <h4 className="rbt-widget-title-2">Features</h4>
                  <ul className="rbt-sidebar-list-wrapper features-list-check">
                    <li className="rbt-check-group">
                      <input
                        id="features-list-1"
                        type="checkbox"
                        name="features-list-1"
                      />
                      <label htmlFor="features-list-1">
                        SubTitle<span className="rbt-lable count">15</span>
                      </label>
                    </li>
                    <li className="rbt-check-group">
                      <input
                        id="features-list-2"
                        type="checkbox"
                        name="features-list-2"
                      />
                      <label htmlFor="features-list-2">
                        Quizzes <span className="rbt-lable count">0</span>
                      </label>
                    </li>
                    <li className="rbt-check-group">
                      <input
                        id="features-list-3"
                        type="checkbox"
                        name="features-list-3"
                      />
                      <label htmlFor="features-list-3">
                        Coding Skill <span className="rbt-lable count">10</span>
                      </label>
                    </li>
                    <li className="rbt-check-group">
                      <input
                        id="features-list-4"
                        type="checkbox"
                        name="features-list-4"
                      />
                      <label htmlFor="features-list-4">
                        Practice Test
                        <span className="rbt-lable count">10</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}

