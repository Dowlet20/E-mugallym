"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import "venobox/dist/venobox.min.css";

import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "@/context/Context";
import { addToCartAction } from "@/redux/action/CartAction";

const Viedo = ({ checkMatchCourses, course }) => {
  const pathname = usePathname();
  const { cartToggle, setCart } = useAppContext();
  const [toggle, setToggle] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);

  const isCourseDetailsPage = pathname.startsWith("/course-detail-2");

  // =====> Start ADD-To-Cart
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartReducer);

  const [amount, setAmount] = useState(1);

  const addToCartFun = (id, amount, product) => {
    dispatch(addToCartAction(id, amount, product));
    setCart(!cartToggle);
  };

  useEffect(() => {
    dispatch({ type: "COUNT_CART_TOTALS" });
    localStorage.setItem("hiStudy", JSON.stringify(cart));
  }, [cart]);

  // =====> For video PopUp
  useEffect(() => {
    import("venobox/dist/venobox.min.js").then((venobox) => {
      new venobox.default({
        selector: ".popup-video",
      });
    });

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isHide = currentScrollPos > 200;

      setHideOnScroll(isHide);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {!isCourseDetailsPage ? (
        <Link
          className={`video-popup-with-text video-popup-wrapper text-center popup-video sidebar-video-hidden mb--15 ${
            hideOnScroll ? "d-none" : ""
          }`}
          data-vbtype="video"
          href={course?.preview_video ? course?.preview_video : "https://www.youtube.com/watch?v=nA1Aqp0sPQo"}
        >
          <div className="video-content">
            {checkMatchCourses.courseImg && (
              <Image
                className="w-100 rbt-radius"
                src={course.thumbnail ? course.thumbnail : checkMatchCourses.courseImg}
                width={355}
                height={255}
                alt="Video Images"
              />
            )}
              <div className="position-to-top">
                <span className="rbt-btn rounded-player-2 with-animation">
                  <span className="play-icon"></span>
                </span>
              </div>
              <span className="play-view-text d-block color-white">
                <i className="feather-eye"></i> Bu kursy gözden geçiriň
              </span>
            </div>
          </Link>
       
      ) : (
        ""
      )}
      <div className="content-item-content">
        <div className="rbt-price-wrapper d-flex flex-wrap align-items-center justify-content-between">
          <div className="rbt-price">
            <span className="current-price">{course.price} TMT</span>
            <span className="off-price">{parseInt(course.price+course.price*course.discount/100,10)} TMT</span>
          </div>
          {/* <div className="discount-time">
            <span className="rbt-badge color-danger bg-color-danger-opacity">
              <i className="feather-clock"></i> {checkMatchCourses.days} gün galdy!
            </span>
          </div> duzetmeli */}
        </div>

        <div className="add-to-card-button mt--15">
          <Link
            className="rbt-btn btn-gradient icon-hover w-100 d-block text-center"
            href="#"
            onClick={() =>
              addToCartFun(checkMatchCourses.id, amount, checkMatchCourses)
            }
          >
            <span className="btn-text">Sebede goş</span>
            <span className="btn-icon">
              <i className="feather-arrow-right"></i>
            </span>
          </Link>
        </div>

        <div className="buy-now-btn mt--15">
          <Link
            className="rbt-btn btn-border icon-hover w-100 d-block text-center"
            href="#"
          >
            <span className="btn-text">Satyn al</span>
            <span className="btn-icon">
              <i className="feather-arrow-right"></i>
            </span>
          </Link>
        </div>
        <span className="subtitle">
          <i className="feather-rotate-ccw"></i> 
        </span>
        <div
          className={`rbt-widget-details has-show-more ${
            toggle ? "active" : ""
          }`}
        >
          <ul className="has-show-more-inner-content rbt-course-details-list-wrapper">
            <li>
              <span>Başlaýan wagty</span>
              <span className="rbt-feature-value rbt-badge-5">
                {course?.start_date ? course?.start_date?.slice(0,10) : "5 sagat 20 Min"}
              </span>
            </li>
            <li>
              <span>Bellige alyndy</span>
              <span className="rbt-feature-value rbt-badge-5">
                {/* {course.enrolled} duzetmeli */} 112
              </span>
            </li>
            <li>
              <span>Leksiýalar</span>
              <span className="rbt-feature-value rbt-badge-5">
                {/* {course.lectures} duzetmeli */} 50
              </span>
            </li>
            <li>
              <span>Derejesi</span>
              <span className="rbt-feature-value rbt-badge-5">
                {course?.level?.title ? course?.level?.title : "Orta"}
              </span>
            </li>
            <li>
              <span>Dili</span>
              <span className="rbt-feature-value rbt-badge-5">
                {course?.language?.title ? course.language?.title : "Turkmen"}
              </span>
            </li>
            <li>
              <span>Testler</span>
              <span className="rbt-feature-value rbt-badge-5">
                {course?.quizzes ? course?.quizzes : "10"}
              </span>
            </li>
            <li>
              <span>Sertifikat</span>
              <span className="rbt-feature-value rbt-badge-5">
                {course?.certificated ? "Bar": "Ýok"} 
              </span>
            </li>
            <li>
              <span>Kursy tamamlamak göterimi</span>
              <span className="rbt-feature-value rbt-badge-5">
                {/* {course.pass_percentage} duzetmeli */} 85%
              </span>
            </li>
          </ul>
          <div
            className={`rbt-show-more-btn ${toggle ? "active" : ""}`}
            onClick={() => setToggle(!toggle)}
          >
            Doly görkez
          </div>
        </div>

        <div className="social-share-wrapper mt--30 text-center">
          <div className="rbt-post-share d-flex align-items-center justify-content-center">
            <ul className="social-icon social-default transparent-with-border justify-content-center">
              <li>
                <Link href="https://www.facebook.com/">
                  <i className="feather-facebook"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.twitter.com">
                  <i className="feather-twitter"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/">
                  <i className="feather-instagram"></i>
                </Link>
              </li>
              <li>
                <Link href="https://www.linkdin.com/">
                  <i className="feather-linkedin"></i>
                </Link>
              </li>
            </ul>
          </div>
          <hr className="mt--20" />
          <div className="contact-with-us text-center">
            <p>Kurs barada has giňişleýin</p>
            <p className="rbt-badge-2 mt--10 justify-content-center w-100">
              <i className="feather-phone mr--5"></i> Bize jaň ediň:
              <Link href="#">
                <strong>+993 12 945155</strong>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Viedo;
