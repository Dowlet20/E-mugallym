"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useAppContext } from "@/context/Context";

import Pagination from "@/components/Common/Pagination";

const CourseFilterOneToggle = ({ course, start, end }) => {
  const { toggle } = useAppContext();
  const [courses, setCourse] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const startIndex = (page - 1) * 6;

  const getSelectedCourse = courses.slice(startIndex, startIndex + 6);

  const handleClick = (num) => {
    setPage(num);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setCourse(course);
    setTotalPages(Math.ceil(course.length / 6));
  }, [setTotalPages, setCourse, getSelectedCourse]);

  return (
    <>
      <div
        className={`rbt-course-grid-column ${
          !toggle ? "active-list-view" : ""
        }`}
      >
        {course.slice(start, end).map((data, index) => (
          <div className="course-grid-3" key={index}>
            <div
              className={`rbt-card variation-01 rbt-hover ${
                !toggle ? "card-list-2" : ""
              }`}
            >
              <div className="rbt-card-img">
                <Link href={`/course-details/${data?.slug}`}>
                <div style={{ height: '244px', overflow: 'hidden', position: 'relative' }}>
                  <Image
                    src={data?.thumbnail ? data?.thumbnail : "/images/course/course-01.jpg"}
                    alt="Card image"
                    layout="fill" 
                    objectFit="cover" 
                  />
              </div>
                  <div className="rbt-badge-3 bg-white">
                    <span>-{data?.discount}%</span>
                    <span>Off</span>
                  </div>
                </Link>
              </div>
              <div className="rbt-card-body">
                <div className="rbt-card-top">
                  <div className="rbt-review">
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="rating-count">
                      {/* ({data.review} Reviews duzetmeli  ) 12 Reviews */} 12 Teswir
                    </span>
                  </div>
                  <div className="rbt-bookmark-btn">
                    <Link className="rbt-round-btn" title="Bookmark" href="#">
                      <i className="feather-bookmark"></i>
                    </Link>
                  </div>
                </div>

                <h4 className="rbt-card-title">
                  <div style={{
                    width: '100%', // Adjust width as needed
                    height: '3em', // Set height to accommodate exactly two lines
                    overflow: 'hidden', // Hide overflowing text
                    display: '-webkit-box', // Use flexbox for the text container
                    WebkitBoxOrient: 'vertical', // Required for the box layout
                    WebkitLineClamp: 2, // Limit to 2 lines
                    textOverflow: 'ellipsis', // Show ellipsis when text overflows
                    lineHeight: '1.5em', // Set line height for proper spacing
                }}>
                    <Link href={`/course-details/${data?.slug}`}>
                      {data?.title}
                    </Link>
                  </div>
                </h4>

                <ul className="rbt-meta">
                  {/* <li>
                    <i className="feather-book"></i>
                    {data.lesson} Lessons duzetmeli 10 lesson
                  </li> */}
                  <li>
                    {/* <i className="feather-users"></i> */}
                    {/* {data.student} Students duzetmeli */} {data?.category?.[0]?.title}
                  </li>
                </ul>
                <div className="rbt-card-text" style={{
                  width: '100%', // Adjust width as needed
                  height: '6em', // Set height to accommodate exactly four lines
                  overflow: 'hidden', // Hide overflowing text
                  display: '-webkit-box', // Use flexbox for the text container
                  WebkitBoxOrient: 'vertical', // Required for the box layout
                  WebkitLineClamp: 4, // Limit to 4 lines
                  textOverflow: 'ellipsis', // Show ellipsis when text overflows
                  lineHeight: '1.5em', // Set line height for proper spacing
                }}>
                  {data?.short_description}
                    
                </div>
                <div className="rbt-author-meta mb--10">
                  <div className="rbt-avater">
                    <Link href={`/profile/${data?.user?.id}`}>
                      <Image
                        src={data?.user?.img ? data?.user?.img : "/images/client/avatar-02.png"} 
                        // src={"/images/client/avatar-02.png"}
                        width={33}
                        height={33}
                        alt="Sophia Jaymes"
                      />
                    </Link>
                  </div>
                  <div className="rbt-author-info">
                    <Link href={`/profile/${data?.user?.id}`}>
                      {data?.user?.first_name + " " + data?.user?.last_name }
                    </Link>
                  </div>
                </div>
                <div className="rbt-card-bottom">
                  <div className="rbt-price">
                    <span className="current-price">{data?.price} TMT</span>
                    <span className="off-price">{parseInt(data?.price+data?.price*data?.discount/100,10)} TMT</span>
                  </div>
                  <Link
                    className="rbt-btn-link"
                    href={`/course-details/${data?.slug}`}
                  >
                    Doly aç<i className="feather-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {course.length > 6 ? (
        <div className="row">
          <div className="col-lg-12 mt--60">
            <Pagination
              totalPages={totalPages}
              pageNumber={page}
              handleClick={handleClick}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CourseFilterOneToggle;
