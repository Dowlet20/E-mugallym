import BackToTop from "@/app/backToTop";
import CreateCoursePage from "./index";

export const metadata = {
  title: "E-Mugallym",
  description: "E-Mugallym",
};

const CreateCourseLayout = () => {
  //dunno
  return (
    <>
      <CreateCoursePage />
      <BackToTop />
    </>
  );
};

export default CreateCourseLayout;
