import Image from "next/image";
import Link from "next/link";

import React from "react";

import awardImg from "../../public/images/icons/card-icon-1.png";


const Biography = ({ checkMatchProfile, user }) => {
  return (
    <>
      <div className="col-lg-12 mt--30">
        <div className="profile-content rbt-shadow-box" >
          <h4 className="rbt-title-style-3">Biografiýa</h4>
          <div className="row g-5">
            <div className="col-lg-8">
              <p className="mt--10 mb--20">{user?.biography}</p>
              {/* <ul className="social-icon social-default justify-content-start">
                  {item.social.map((social, index) => (
                    <li key={index}>
                      <Link href={social.link}>
                        <i className={`feather-${social.icon}`}></i>
                      </Link>
                    </li>
                  ))}
                </ul> */}
              <ul className="rbt-information-list mt--15">
                <li>
                  <Link href="#">
                    <i className="feather-phone"></i>
                    {user?.phone_number}
                  </Link>
                </li>
                <li>
                  <Link href="mailto:hello@example.com">
                    <i className="feather-mail"></i>
                    {user?.email}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 offset-lg-2">
              <div className="feature-sin best-seller-badge text-end h-100">
                <span className="rbt-badge-2 w-100 text-center badge-full-height">
                  <span className="image">
                    <Image
                      src={awardImg}
                      width={50}
                      height={50}
                      priority
                      alt="Best Seller Icon"
                    />
                  </span>
                  Ýokary derejeli
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Biography;
