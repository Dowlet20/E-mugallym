import Image from "next/image";
import Link from "next/link";

const CourseBreadcrumb = ({ getMatchCourse, course }) => {
  return (
    <>
      <div className="col-lg-8">
        <div className="content text-start">
          <ul className="page-list">
            <li className="rbt-breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li>
              <div className="icon-right">
                <i className="feather-chevron-right"></i>
              </div>
            </li>
            <li className="rbt-breadcrumb-item active">
              {course?.category?.[0].title} 
            </li>
          </ul>
          <h2 className="title">{course.title}</h2>
          <p className="description">{course.short_description}</p>

          <div className="d-flex align-items-center mb--20 flex-wrap rbt-course-details-feature">
            <div className="feature-sin best-seller-badge">
              <span className="rbt-badge-2">
                <span className="image">
                  {getMatchCourse.awardImg && (
                    <Image
                      src={getMatchCourse.awardImg}
                      width={30}
                      height={30}
                      alt="Best Seller Icon"
                    />  
                  )}
                </span>
                {/* {getMatchCourse.sellsType} duzetmeli */}  Ýokary derejeli
                {/* duzetmeli */}
              </span>
            </div>

            <div className="feature-sin rating">
              <Link href="#">{getMatchCourse.star}</Link>
              <Link href="#">
                <i className="fa fa-star"></i>
              </Link>
              <Link href="#">
                <i className="fa fa-star"></i>
              </Link>
              <Link href="#">
                <i className="fa fa-star"></i>
              </Link>
              <Link href="#">
                <i className="fa fa-star"></i>
              </Link>
              <Link href="#">
                <i className="fa fa-star"></i>
              </Link>
            </div>

            <div className="feature-sin total-rating">
              <Link className="rbt-badge-4" href="#">
                {/* {getMatchCourse.ratingNumber} rating düzetmeli */} 13 reýting
              </Link>
            </div>

            <div className="feature-sin total-student">
              {/* <span> {getMatchCourse.studentNumber} students</span> düzetmeli */} 3213 gören
            </div>
          </div>

          <div className="rbt-author-meta mb--20">
            <div className="rbt-avater">
              <Link href={`/profile/${course?.user?.id}`}>
                {getMatchCourse.userImg && (
                  <Image
                    width={40}
                    height={40}
                    src={course?.user?.img ? course?.user?.img : "/images/banner/gallery-banner-03.jpg"}
                    alt={course?.user?.username}
                  />
                )}
              </Link>
            </div>
            <div className="rbt-author-info">
              <Link href={`/profile/${course?.user?.id}`}>
                {course?.user?.first_name} {course?.user?.middle_name} {course?.user?.last_name}
              </Link>
            </div>
          </div>

          <ul className="rbt-meta">
            <li>
              <i className="feather-calendar"></i>Soňky üýgedilen wagty {course?.start_date?.slice(0,10)} <span> </span>
              {/* duzetmeli */}
            </li>
            <li>
              <i className="feather-globe"></i>
              {course?.language?.title}
            </li>
            <li>
              {course.certified ? (<><i className="feather-award"></i> sertifikatlaşdyrylan</>) :(<></>)}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CourseBreadcrumb;
