import Image from "next/image";
import React from "react";

import bgImage from "../../public/images/bg/bg-image-22.jpg";

const UserProfile = ({ checkMatchProfile, user }) => {
  return (
    <>
      <div className="col-lg-12">
        <div className="rbt-dashboard-content-wrapper">
          <div className="tutor-bg-photo bg_image bg_image--22 height-350">
            <Image 
              src={user?.thumbnail ? user?.thumbnail : bgImage} 
              layout="fill"
              objectFit="cover" 
              alt="" 
            />
          </div>
            <div className="rbt-tutor-information">
              <div className="rbt-tutor-information-left">
                <div className="thumbnail rbt-avatars size-lg">
                  <Image
                    src={user?.img ? user?.img : bgImage}
                    width={250}
                    height={250}
                    alt="Instructor"
                  />
                </div>
                <div className="tutor-content">
                  <h5 className="title">{user?.first_name} {user?.last_name}</h5>
                  <div className="rbt-review">
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="rating-count">
                      {/* ({item.review} Reviews) duzetmeli */} 12 Teswir
                    </span>
                  </div>
                  <ul className="rbt-meta rbt-meta-white mt--5">
                    <li>
                      <i className="feather-book"></i>
                      {/* {item.course} duzetmeli Courses */} 156 Kurs
                    </li>
                    <li>
                      <i className="feather-users"></i>
                      {/* {item.studentNumber} duzetmeli Students */} 1464 talyp
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default UserProfile;
