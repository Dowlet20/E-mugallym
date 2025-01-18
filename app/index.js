"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Store from "@/redux/store";
import Context from "@/context/Context";

import HeaderStyleTen from "@/components/Header/HeaderStyle-Ten";
import MobileMenu from "@/components/Header/MobileMenu";
import Cart from "@/components/Header/Offcanvas/Cart";
import CategoryHeadTwo from "@/components/Category/CategoryHeadTwo";
import CourseFilterOneToggle from "@/components/Category/Filter/CourseFilterOneToggle";
import Pagination from "@/components/Common/Pagination";
import Separator from "@/components/Common/Separator";
import FooterOne from "@/components/Footer/Footer-One";

import axiosInstance from "@/utils/axiosInstance";
import {Ripple} from 'react-css-spinners'

const CourseFilteTwoTogglePage = () => {
  const [courses, setCourse] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  const startIndex = (page - 1) * 6;
  const getSelectedCourse = courses.slice(startIndex, startIndex + 6);

  const handleClick = (num) => {
    setPage(num);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  let slug="";
  let paid="";
  let user="";
  let ordering="";


  useEffect(() => {
    const fetchData = async () => {
      try {
        ///api/courses/?search=asd&ordering=1&category=slug_1,slug_2&paid=true&user=20
        const url =`/api/courses/${slug ? `?category_slug=${slug}` : ""}${slug && paid ? `&paid=${paid}` : !slug && paid ? `?paid=${paid}` : ""}${(slug || paid) && user ? `&user=${user}` : !slug && !paid && user ? `?user=${user}` : ""}${(slug || paid || user) && search ? `&search=${search}` : !slug && !paid && !user && search ? `?search=${search}` : ""}${(slug || paid || user || search) && ordering ? `&ordering=${ordering}` : !slug && !paid && !user && !search && ordering ? `?ordering=${ordering}` : ""}`;
        const response = await axiosInstance.get(url);
        const allCourse = response.data;
        setCourse(allCourse);
        setTotalPages(Math.ceil(allCourse.length / 6));
        setLoading(false);
      
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [setTotalPages, setCourse, search]);
  
  // if (loading) {
  //   return (
  //   <div>  
  //     <Ripple
  //       color="rgba(74,42,161,1)"
  //       size={115}
  //       thickness={7}
  //     />
  //   </div>)
  // }

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
          <HeaderStyleTen headerSticky="rbt-sticky" headerType={true} />
          <MobileMenu />
          <Cart />

          <CategoryHeadTwo 
            category={courses} 
            setSearch={setSearch}
          />
          <div className="rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="inner">
              <div className="container">
                <CourseFilterOneToggle 
                  course={getSelectedCourse} 
                />
                {courses.length > 6 ? (
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

export default CourseFilteTwoTogglePage;
