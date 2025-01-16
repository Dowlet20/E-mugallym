import BackToTop from "@/app/backToTop";
import LessonPage from "./(lesson)";

export const metadata = {
  title:
    "Questions Below Each Other - Online Courses & Education NEXTJS14 Template",
  description: "Online Courses & Education NEXTJS14 Template",
};

const LessonLayout = () => {
  console.log("men");
  return (
    <>
      <LessonPage />
      <BackToTop />
    </>
  );
};

export default LessonLayout;
