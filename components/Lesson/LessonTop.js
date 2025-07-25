import Link from "next/link";
import React from "react";

const LessonTop = ({ sidebar, setSidebar, lesson_title, course_slug }) => {
  
  return (
    <>
      <div className="lesson-top-bar">
        <div className="lesson-top-left">
          <div className="rbt-lesson-toggle">
            <button
              className={`lesson-toggle-active btn-round-white-opacity ${
                !sidebar ? "sidebar-hide" : ""
              }`}
              title="Toggle Sidebar"
              onClick={setSidebar}
            >
              <i className="feather-arrow-left"></i>
            </button>
          </div>
          <h5>{lesson_title}</h5>
        </div>
        <div className="lesson-top-right">
          <div className="rbt-btn-close">
            <Link
              href={`/course-details/${course_slug}`}
              title="Go Back to Course"
              className="rbt-round-btn"
            >
              <i className="feather-x"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonTop;
