import Link from "next/link";
import React from "react";

const Content = ({ topics, courseSlug, course_duration }) => {
  return (
    <>
      <div className="rbt-course-feature-inner">
        <div className="section-title">
          <h4 className="rbt-title-style-3" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Kursyň wideolary
            <span className="rbt-badge-5 ml--10" style={{ marginLeft: '-10px' }}>
              {course_duration}
            </span>
          </h4>
        </div>
        <div className="rbt-accordion-style rbt-accordion-02 accordion">
          <div className="accordion" id="accordionExampleb2">
            {topics?.map((item, innerIndex) => (
              <div className="accordion-item card" key={innerIndex}>
                <h2
                  className="accordion-header card-header"
                  id={`headingTwo${innerIndex}`}
                >
                  <button
                    className={`accordion-button ${
                      !innerIndex===0 ? "collapsed" : ""
                      //item.collapsed
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseTwo${innerIndex + 1}`}
                    aria-expanded={innerIndex===0} //item.expand
                    aria-controls={`collapseTwo${innerIndex + 1}`}
                  >
                    {item?.title}
                    <span className="rbt-badge-5 ml--10">
                      {item.topic_duration}
                    </span>
                  </button>
                </h2>
                <div
                  id={`collapseTwo${innerIndex + 1}`}
                  className={`accordion-collapse collapse ${
                    innerIndex===0 ? "show" : "" //item.isShow
                  }`}
                  aria-labelledby={`headingTwo${innerIndex}`}
                  data-bs-parent="#accordionExampleb2"
                >
                  <div className="accordion-body card-body pr--0">
                    <ul className="rbt-course-main-content liststyle">
                      {item?.lessons?.map((list, subIndex) => (
                        <li key={subIndex}>
                          <Link href={`/lesson/${list.slug}/${courseSlug}`}>
                            <div className="course-content-left">
                              {/* list.playIcon */}
                              {true ? (
                                <i className="feather-play-circle"></i>
                              ) : (
                                <i className="feather-file-text"></i>
                              )}
                              <span className="text">{list.title}</span>
                            </div>
                            {/* list.status */}
                            {true ? (
                              <div className="course-content-right">
                                <span className="min-lable">
                                  {list.lesson_duration}
                                </span>
                                {/* <span className="rbt-badge variation-03 bg-primary-opacity">
                                  <i className="feather-eye"></i>
                                  <span> </span>  
                                  Gysgaça
                                </span> */}
                              </div>
                            ) : (
                              <div className="course-content-right">
                                <span className="course-lock">
                                  <i className="feather-lock"></i>
                                </span>
                              </div>
                            )}
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

export default Content;
