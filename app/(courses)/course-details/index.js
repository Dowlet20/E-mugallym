"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import sal from "sal.js";
import CourseData from "../../../data/course-details/courseData.json";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";

import MobileMenu from "@/components/Header/MobileMenu";
import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import Cart from "@/components/Header/Offcanvas/Cart";
import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";
import CourseHead from "@/components/Course-Details/Course-Sections/course-head";
import CourseDetailsOne from "@/components/Course-Details/CourseDetails-One";
import CourseActionBottom from "@/components/Course-Details/Course-Sections/Course-Action-Bottom";
import axiosInstance from "@/utils/axiosInstance";
import SimilarCourses from "@/components/Course-Details/Course-Sections/SimilarCourses";
import { Ripple } from "react-css-spinners";


const SingleCourse = ({ getParams }) => {
  const router = useRouter();
  const slug = getParams.courseId;
  const [loading, setLoading] = useState(true);

  const [course, setCourse] = useState({});
  let getCourse;


  

  getCourse = JSON.parse(JSON.stringify(CourseData.courseDetails));

  const checkMatch = getCourse.find((course) => course.id === 1);


  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/courses/${slug}/`);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
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

  // useEffect(() => {
  //   if (!checkMatch && postId) {
  //     router.push("/course-filter-one-toggle");
  //   }

  //   sal({
  //     threshold: 0.01,
  //     once: true,
  //   });
  // }, [checkMatch, router]);

  return (
    <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderStyleTen headerSticky="" headerType={true} />
          <Cart />

          <div className="rbt-breadcrumb-default rbt-breadcrumb-style-3">
            <CourseHead
              checkMatch={checkMatch !== undefined ? checkMatch : ""}
              course = {course}
            />
          </div>

          <div className="rbt-course-details-area ptb--60">
            <div className="container">
              <div className="row g-5">
                <CourseDetailsOne
                  checkMatchCourses={checkMatch !== undefined ? checkMatch : ""}
                  course={course}
                />
              </div>
            </div>
          </div>

          <CourseActionBottom
            checkMatchCourses={checkMatch !== undefined ? checkMatch : ""}
          />

          {/* <div className="rbt-related-course-area bg-color-white pt--60 rbt-section-gapBottom">
            <SimilarCourses
              checkMatchCourses={
                checkMatch !== undefined ? checkMatch.similarCourse : ""
              }
            />
          </div> */}

          <Separator />
          <FooterOne />
        </Context>
      </Provider>
    </>
  );
};

export default SingleCourse;
