"use client";
"use strict"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";

import CourseData from "../../../data/course-details/courseData.json";
import UserProfile from "@/components/User-Profile/User-Profile";
import Biography from "@/components/User-Profile/User-Biography";
import UserCourses from "@/components/User-Profile/User-Courses";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import axiosInstance_user from "@/utils/axiosInstance_user";
import axiosInstance from "@/utils/axiosInstance";
import { Ripple } from "react-css-spinners";

const SingleProfile = ({ getParams }) => {
  const [user, setUser] = useState({});
  const [courses, setCourses] = useState([]);
  const router = useRouter();
  const postId = parseInt(getParams.profileId);
  let getCourse;
  const [loading, setLoading] = useState(true);

  getCourse = JSON.parse(JSON.stringify(CourseData.courseDetails));

  const checkMatchProfile = getCourse.find((course) => course.id === postId);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        
        const response_user = await axiosInstance_user.get(`/api/user/${postId}`);
        setUser(response_user.data);

        const response = await axiosInstance.get(`/api/courses/?user=${postId}`);
        setCourses(response.data);
        setLoading(false);

      } catch (err) {
        console.error(err)
      }
    } 
    if (postId) {
      fetchData();
    }
  },[]);

  if (loading) {
    return (
      <div className="d-flex bg-transparent"  style={{height: '100vh'}}>
        <Ripple
          color="rgba(12,235,115,1)"
          size={115}
          thickness={7}
          className="mx-auto align-self-center"
        />
      </div>
    );
  }


  return (
    <>
      <Provider store={Store}>
        <Context>
          <HeaderStyleTen headerSticky="" headerType={true} />
          <MobileMenu />
          <Cart />

          <div className="rbt-page-banner-wrapper">
            <div className="rbt-banner-image"></div>
          </div>
          <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="container">
              <div className="row">
                <UserProfile checkMatchProfile={checkMatchProfile} user={user} />
                <Biography user={user} checkMatchProfile={checkMatchProfile} />
              </div>
              <div className="rbt-profile-course-area mt--60">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="sction-title">
                      <h2 className="rbt-title-style-3">
                        Mugallymyň beýleki kurslary
                      </h2>
                    </div>
                  </div>
                </div>
                {/* <div className="row g-5 mt--5">
                  {checkMatchProfile &&
                    checkMatchProfile.relatedCourse.map((data, index) => (
                      <UserCourses {...data} key={index} relatedCourse={data} />
                    ))}
                </div> */}
                <div className="row g-5 mt--5">
                  <UserCourses {...courses} key={"ssss"} courses={courses} />
                </div>
              </div>
            </div>
          </div>

          <Separator />
          <FooterOne />
        </Context>
      </Provider>
    </>
  );
};

export default SingleProfile;
