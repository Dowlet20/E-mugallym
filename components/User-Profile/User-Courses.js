"use client";
"use strict"
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import sal from "sal.js";

const UserCourses = ({ courses }) => {
  useEffect(() => {
    sal({
      threshold: 0.01,
      once: true,
    });
  }, []);

  console.log(courses);

  return (
    <>
      {courses.isEmpty ? [] : courses.map((course, index) => (
        <div
          className="col-lg-4 col-md-6 col-sm-12 col-12"
          // data-sal-delay="150"
          // data-sal="slide-up"
          // data-sal-duration="800"
          key={index}
        >
          <div className="rbt-card variation-01 rbt-hover">
            <div className="rbt-card-img">
              <Link href={`/course-details/${course?.slug}`}>
                <Image
                  src={course?.thumbnail ? course?.thumbnail : "/images/course/course-online-01.jpg"}
                  width={355}
                  height={244}
                  alt="Card image"
                />
                <div className="rbt-badge-3 bg-white">
                  <span>-{course?.discount}%</span>
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
                    {/* ({data.rating} duzetmeli Reviews) */} 12 teswir
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
                  <Link href={`/course-details/${course?.slug}`}>
                    {course?.title}
                  </Link>
                </div>
              </h4>

              <ul className="rbt-meta">
                <li>
                  <i className="feather-book"></i>
                  {/* {data.lesson} duzetmeli Lessons */} 11 Sapak
                </li>
                <li>
                  <i className="feather-users"></i>
                  {/* {data.student} duzetmeli Students */} 436 Talyp
                </li>
              </ul>

              <div className="rbt-card-text">
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
                  {course?.short_description}
                </div>
              </div>
              <div className="rbt-author-meta mb--10">
                <div className="rbt-avater">
                  <Link href={`/profile/${course?.user?.id}`}>
                    <Image
                      src={course?.user?.img ? course?.user?.img : "/images/course/course-online-01.jpg"}
                      width={33}
                      height={33}
                      alt="Sophia Jaymes"
                    />
                  </Link>
                </div>
                <div className="rbt-author-info">
                  <Link href={`/profile/${course?.user?.id}`}>
                    {course?.user?.first_name} {course?.user?.last_name}
                  </Link>
                </div>
              </div>
              <div className="rbt-card-bottom">
                <div className="rbt-price">
                  <span className="current-price">{course?.price} TMT</span>
                  <span className="off-price">{course?.price + course?.price * course?.discount / 100} TMT</span>
                </div>
                <Link
                  className="rbt-btn-link"
                  href={`/course-details/${course?.slug}`}
                >
                  Giňişleýin
                  <i className="feather-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserCourses;
