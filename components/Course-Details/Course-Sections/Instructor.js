import Image from "next/image";
import Link from "next/link";
import React from "react";

const Instructor = ({ checkMatchCourses, course }) => {
  const teacher =  [
    {
      "link": "https://www.facebook.com",
      "icon": "facebook"
    },
    {
      "link": "https://www.twitter.com",
      "icon": "twitter"
    },
    {
      "link": "https://www.instagram.com",
      "icon": "instagram"
    },
    {
      "link": "https://www.linkdin.com",
      "icon": "linkedin"
    }
  ]
  return (
    <>
      <div className="about-author border-0 pb--0 pt--0">
        <div className="section-title mb--30">
          <h4 className="rbt-title-style-3">Mugallym barada</h4>
        </div>
        <div className="media align-items-center">
            <div className="thumbnail">
              <Link href={`/profile/${course?.user?.id}`}>
                <Image
                  src={course?.user?.img ? course?.user?.img : "/images/client/avatar-02.png"}
                  width={250}
                  height={250}
                  alt="Author Images"
                />
              </Link>
            </div>
            <div className="media-body">
              <div className="author-info">
                <h5 className="title">
                  <Link
                    className="hover-flip-item-wrapper"
                    href={`/profile/${course?.user?.id}`}
                  >
                    {course?.user?.first_name} {course?.user?.last_name}
                  </Link>
                </h5>
                <span className="b3 subtitle">
                  {course?.category?.[0]?.title}
                  {/* duzetmeli */}
                </span>
                <ul className="rbt-meta mb--20 mt--10">
                  {/* <li>
                    <i className="fa fa-star color-warning"></i>
                    {teacher.ratingNumber} Reviews
                    <span className="rbt-badge-5 ml--5">
                      {teacher.star} Rating
                    </span>
                  </li> duzetmeli */}
                  <li>
                    <i className="feather-users"></i>
                     {/* {teacher.studentNumber} duzetmeli */} Studentleriniň sany 22
                  </li>
                  <li>
                    <Link href="#">
                      <i className="feather-video"></i>
                       {/* {teacher.course}  */}
                       Kurslarynyň sany 14
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="content">
                  <div className="description">
                    <div style={{
                      width: '100%', // Adjust width as needed
                      height: '7.5em', // Set height to accommodate exactly five lines (1.5em * 5)
                      overflow: 'hidden', // Hide overflowing text
                      display: '-webkit-box', // Use flexbox for the text container
                      WebkitBoxOrient: 'vertical', // Required for the box layout
                      WebkitLineClamp: 5, // Limit to 5 lines
                      textOverflow: 'ellipsis', // Show ellipsis when text overflows
                      lineHeight: '1.5em', // Set line height for proper spacing
                  }}>
                    {course?.user?.biography}
                  </div>
                </div>

                <ul className="social-icon social-default icon-naked justify-content-start">
                  <li key={0}>
                    {course?.user?.phone_number}    
                  </li>
                  {teacher.map((social, index) => (
                    <li key={index}>
                      <Link href={social.link}>
                        <i className={`feather-${social.icon}`}></i>
                      </Link>
                    </li>
                  ))} 
                  {/* duzetmeli */}
                 
                </ul>
              </div>
            </div>
          </div>
        {/* {checkMatchCourses.body.map((teacher, innerIndex) => (
        ))} */}
      </div>
    </>
  );
};

export default Instructor;
