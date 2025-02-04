"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import axiosInstance from "@/utils/axiosInstance";

const LessonSidebar = ({course_slug, lesson_slug, topic_id}) => {
  const [activeTab, setActiveTab] = useState(false);
  const [topics, setTopics] = useState([]);
  useEffect(()=>{
    setActiveTab(topic_id)
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/topics/?course__slug=${course_slug}`);
        setTopics(response.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (course_slug) {
      fetchData();
    }
  },[topic_id, course_slug]);

  
  return (
    <>
      <div className="rbt-course-feature-inner rbt-search-activation">
        <div className="section-title">
          <h4 className="rbt-title-style-3">Sapaklar</h4>
        </div>
        <div className="lesson-search-wrapper">
          <form action="#" className="rbt-search-style-1">
            <input
              className="rbt-search-active"
              type="text"
              placeholder="Sapak gözle"
            />
            <button className="search-btn disabled">
              <i className="feather-search"></i>
            </button>
          </form>
        </div>
        <hr className="mt--10" />
        <div className="rbt-accordion-style rbt-accordion-02 for-right-content accordion">
          <div className="accordion" id="accordionExampleb2">
            {topics?.map((topic, index) => (
                <div className="accordion-item card" key={index}>
                  
                  <h2
                    className="accordion-header card-header"
                    id={`headingTwo${index + 1}`}
                  >
                    <button
                      className={`accordion-button ${
                        topic?.id === activeTab ? "" : "collapsed"
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      aria-expanded={topic?.id === activeTab}
                      data-bs-target={`#collapseTwo${index + 1}`}
                      aria-controls={`collapseTwo${index + 1}`}
                      onClick={() => setActiveTab(topic?.id)}
                    >
                      {topic.title}
                      <span className="rbt-badge-5 ml--10">
                      {topic.topic_duration}
                    </span>
                    </button>
                  </h2>
                  <div
                    id={`collapseTwo${index + 1}`}
                    className={`accordion-collapse collapse
                     ${
                      topic?.id === activeTab ? "show" : ""
                    }`}
                    aria-labelledby={`headingTwo${index + 1}`}
                  >
                    <div className="accordion-body card-body">
                      <ul className="rbt-course-main-content liststyle">
                        {topic.lessons.map((lesson, innerIndex) => (
                          <li key={innerIndex}>
                            <Link
                              className={
                                lesson?.slug === lesson_slug ? "active" : ""
                              }
                              href={`/lesson/${lesson?.slug}/${course_slug}`}
                              onClick={() => setActiveTab(topic?.id)}
                            >
                              <div className="course-content-left">
                                {/* {innerData.iconHelp ? (
                                  <i className="feather-help-circle"></i>
                                ) : (
                                  <i
                                    className={`feather-${
                                      innerData.iconFile
                                        ? "file-text"
                                        : "play-circle"
                                    }`}
                                  ></i>
                                )} */}
                                <i
                                  className={`feather-play-circle`}
                                ></i>
                                <span className="text">
                                  {lesson.title}
                                  <span className="min-lable ml--15">
                                  {lesson.lesson_duration}
                                </span>
                                </span>
                              </div>
                              {/* <div className="course-content-right">
                                {innerData.lable && innerData.time > 0 ? (
                                  <span className="min-lable">
                                    {innerData.time} min
                                  </span>
                                ) : (
                                  ""
                                )}
                                <span
                                  className={`rbt-check ${
                                    isActive(innerData.lssonLink)
                                      ? ""
                                      : "unread"
                                  }`}
                                >
                                  <i
                                    className={`feather-${
                                      isActive(innerData.lssonLink)
                                        ? "check"
                                        : "circle"
                                    }`}
                                  ></i>
                                </span>
                              </div> */}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonSidebar;
