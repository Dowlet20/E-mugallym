import BackToTop from "@/app/backToTop";
import SingleCourse from "../index";

export const metadata = {
  title: "E-Mugallym",
  description: "E-Mugallym",
};

const SingleCourseLayout = ({ params }) => {
  return (
    <>
      <SingleCourse getParams={params} />
      <BackToTop />
    </>
  );
};

export default SingleCourseLayout;
