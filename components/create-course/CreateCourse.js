"use client";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackToTopCR from "./BackToTopCR";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Select from "react-select";


import CreateCourseData from "../../data/createCourse.json";

import svgImg from "../../public/images/icons/certificate-none.svg";
import svgImg2 from "../../public/images/icons/certificate-none-portrait.svg";

import InfoForm from "./InfoForm";
import TopicModal from "./QuizModals/TopicModal";
import AdditionalForm from "./AdditionalForm";
import LessonModal from "./QuizModals/LessonModal";
import QuizModal from "./QuizModals/QuizModal";
import AssignmentModal from "./QuizModals/AssignmentModal";
import UpdateModal from "./QuizModals/UpdateModal";
import Lesson from "./lesson/Lesson";
import axiosInstance from "@/utils/axiosInstance";
import { useAppContext } from "@/context/Context";
import { Ripple } from "react-css-spinners";

const CreateCourse = () => {
  const progressRef = useRef(null);
  const { isLightTheme, toggleTheme } = useAppContext();
  const fileInputRef = useRef(null);
  const acButtonRef = useRef(null);
  const [createCourseId, setCreateCourseId] = useState(0);
  const [createCourseSlug, setCreateCourseSlug] = useState("");
  const [createCourseTitle, setCreateCourseTitle] = useState("");
  const [trigger, setTrigger] = useState(false);
  
  const [topics, setTopics] = useState([]);



  //create-course
  const [title, setTitle] = useState("");
  const [short_description, setShort_description] = useState("");
  const [description, setDescription] = useState("");
  const [learning_outcomes, setLearning_outcomes] = useState("");
  const [teacherId, setTeacherId] = useState(null);
  const [requirements, setRequirements] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [paid, setPaid] = useState(true);
  const [certified, setCertified] = useState(true);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [preview, setPreview] = useState(null);
  const [start_date, setStart_date] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentTopicId, setCurrentTopicId] = useState(null);

  const [error, setError] = useState({
    kurs_title:true,
    short_description:true,
    description:true,
    learning_outcomes:true,
    teacherId: true,
    requirements:true,
    selectedLevel: true,
    selectedLanguage:true,
    selectedValues:true,
    selectedImage:true,
    price:true
  });

  const lessonPost = async (title, topicId, course, order, file, type="video") => {
  
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('topic', topicId);
    formData.append('course', course);
    formData.append('order', order);
    formData.append('material', file); 
    formData.append('type', type); 
  
    try {
      const response = await axiosInstance.post(
        "/api/lesson/", 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      //setLessonTitle(""); 
      //titleInputRef.current.value="";
      //setLessonOrder(123123123); 
      //orderInputRef.current.value="";
      //setFile(null); 
      //setFileName("Faýl saýlanylmadyk! ");
      //closeModalButtonRef.current.click();
    } catch (err) {
      console.error("Error during lesson post:", err);
    } 
  };

  const topicPost = async (title, course, order) => {

    const formData = {
      title: title,
      course: course,
      order: order
    }


    try {

      if (formData?.title && formData?.course) {
        const response = await axiosInstance.post("/api/topics/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        //setTopicTitle("");
        //setTopicOrder(123123123);
        return response.data?.id;
      }

    } catch (err) {
      console.error(err);
      return;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!title) {
      setError((prevError)=> ({
        ...prevError,
        kurs_title:false
      }));
      progressRef.current.click();
      return;
    }

    if (!short_description) {
      setError((prevError)=> ({
        ...prevError,
        short_description:false
      }));
      progressRef.current.click();
      return;
    }

    if (selectedValues.length===0) {
      setError((prevError)=> ({
        ...prevError,
        selectedValues:false
      }));
      progressRef.current.click();
      return;
    }
    
    if (!selectedLevel) {
      setError((prevError)=> ({
        ...prevError,
        selectedLevel:false
      }));
      progressRef.current.click();
      return;
    }
    
    if (!selectedLanguage) {
      setError((prevError)=> ({
        ...prevError,
        selectedLanguage:false
      }));
      progressRef.current.click();
      return;
    }
   
    if (paid && !price) {
      setError((prevError)=> ({
        ...prevError,
        price:false
      }));
      progressRef.current.click();
      return;
    }
    
    if (!selectedImage) {
      setError((prevError)=> ({
        ...prevError,
        selectedImage:false
      }));
      progressRef.current.click();
      return;
    }
    
    if (!requirements) {
      setError((prevError)=> ({
        ...prevError,
        requirements:false
      }));
      progressRef.current.click();
      return;
    }

    if (!description) {
      setError((prevError)=> ({
        ...prevError,
        description:false
      }));
      progressRef.current.click();
      return;
    }
    
    if (!learning_outcomes) {
      setError((prevError)=> ({
        ...prevError,
        learning_outcomes:false
      }));
      progressRef.current.click();
      return;
    }

    if (!teacherId) {
      setError((prevError)=> ({
        ...prevError,
        teacherId:false
      }));
      progressRef.current.click();
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('short_description', short_description);
    formData.append('description', description);
    formData.append('learning_outcomes', learning_outcomes);
    formData.append('user', teacherId);
    formData.append('requirements', requirements);
    formData.append('level', selectedLevel);
    formData.append('language', selectedLanguage);
    selectedValues.forEach(value=>{
      formData.append('category', value);
    })
    formData.append('thumbnail', selectedImage);
    formData.append('price', price);
    formData.append('discount', discount);
    formData.append('is_active', false);
    formData.append('paid', paid);
    formData.append('certified', certified);
    formData.append('start_date', start_date);
    
    try {
      const response = await axiosInstance.post(
        "/api/courses/", 
        formData, 
        {
          headers: {
            'Content-Type':'multipart-data',
          }  
        }
      );
      
      const courseId= response.data?.id;

      for (const topic of topics) {

        const topicId = await topicPost(topic?.title, courseId, topic?.order);
        for (const lesson of topic.lessons) {

          await lessonPost(lesson?.title, topicId, courseId, lesson?.order, lesson?.material, lesson?.type)
        }
      }
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setTitle("");
      setShort_description("");
      setDescription("");
      setLearning_outcomes("");
      setRequirements("");
      setSelectedLevel(0);
      setSelectedLanguage(0);
      setSelectedValues([]);
      setSelectedImage(null);
      setPrice(0);
      setDiscount(0);
      setPreview(null);
      setStart_date(null);
      setTopics([]);
      setCurrentTopicId(null);
      toast.success("Siziň kursyňyz döredildi! ", {
        autoClose: 3000
      })
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = parseInt(localStorage.getItem("teacher_id"), 10);
      setTeacherId(id);
    }
  }, []);

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/category/");
        setCategories(response.data);
        const response_level = await axiosInstance.get("/api/level/");
        setLevels(response_level.data);
        const response_lang = await axiosInstance.get("/api/language/");
        setLanguages(response_lang.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);



   const handleDelete = (ind) => {
    try {
      setTopics((prevTopics) =>
      prevTopics.filter((topic) => topic.id !== ind)
    );
    } catch(err) {
      console.error(err);
    }
  }

    return (
      <div style={{ position: "relative" }}>
        <ToastContainer autoClose={3000} />
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <Ripple
            color="rgba(12,235,115,1)"
            size={115}
            thickness={7}
            className="mx-auto align-self-center"
          />
        </div>
      )}
      <div className="row g-5">
        <div className="col-lg-8">
          <div className="rbt-accordion-style rbt-accordion-01 rbt-accordion-06 accordion">
            <div className="accordion" id="tutionaccordionExamplea1">
              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="accOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#accCollapseOne"
                    aria-expanded="true"
                    aria-controls="accCollapseOne"
                  >
                    Kursy döretmek
                  </button>
                </h2>
                <div
                  id="accCollapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="accOne"
                  data-bs-parent="#tutionaccordionExamplea1"
                >
                  <div className="accordion-body card-body">
                    <InfoForm 
                      acButtonRef={acButtonRef}
                      setTitle={setTitle}
                      title={title}
                      setShort_description={setShort_description}
                      short_description={short_description}
                      setDescription={setDescription}
                      description={description}
                      setLearning_outcomes={setLearning_outcomes}
                      learning_outcomes={learning_outcomes}
                      setRequirements={setRequirements}
                      requirements={requirements}
                      setSelectedLevel={setSelectedLevel}
                      selectedLevel={selectedLevel}
                      selectedLanguage={selectedLanguage}
                      selectedValues={selectedValues}
                      paid={paid}
                      preview={preview}
                      certified={certified}
                      setSelectedLanguage={setSelectedLanguage}
                      setSelectedValues={setSelectedValues}
                      setSelectedImage={setSelectedImage}
                      selectedImage={selectedImage}
                      categories={categories}
                      levels={levels}
                      languages={languages}
                      setPaid={setPaid}
                      setCertified={setCertified}
                      setPrice={setPrice}
                      price={price}
                      setDiscount={setDiscount}
                      setPreview={setPreview}
                      setStart_date={setStart_date}
                      error={error}
                      setError={setError}
                      discount={discount}
                      start_date={start_date}
                    />
                  </div>
                </div>
              </div>

              <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="accTwo">
                  <button
                    ref={acButtonRef}
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#accCollapseTwo"
                    aria-expanded="false"
                    aria-controls="accCollapseTwo"
                  >
                    Kursa degişli topikleri döretmek
                  </button>
                </h2>
                <div
                  id="accCollapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="accTwo"
                  data-bs-parent="#tutionaccordionExamplea1"
                >
                  <div className="accordion-body card-body rbt-course-field-wrapper rbt-default-form">
                    <div className="course-field mb--15"> 
                      <div style={{
                        padding:'20px'
                      }}>

                        {createCourseId ? 
                        (
                          <>
                            <small
                              className="d-block mt_dec--5"
                              style={{ 
                                fontSize: '1.5rem', 
                                marginBottom:'7px' 
                              }}
                            >
                              <i className="feather-info"> </i> 
                              Kursa degişli topikleri döretmek üçin ilki kursy dörediň
                            </small>
                            <small
                              className="d-block mt_dec--5"
                              style={{ fontSize: '1.5rem' }}
                            >
                              <i className="feather-info"> </i> 
                              Eger-de siz kursy öň döreden bolsaňyz, ol kursa mugallym panelinde goşup bilersiňiz! 
                            </small>
                          </>
                        )
                        : (
                          <>
                            <small>
                              Kursyň ady:
                            </small>
                            <h2 
                              className="accordion-header card-header"
                              style={{ fontSize: '2.0rem' }}
                            >
                                {title}
                            </h2>
                            <div className="accordion-body card-body">
                              {topics.length===0 ? (<></>) : 
                                topics.map((topic, index) => {
                                  return (
                                    <Lesson
                                      key={index}
                                      topicId={topic?.id}
                                      setTopics={setTopics}
                                      topic={topic}
                                      // handleFileChange={handleFileChange}
                                      // handleImportClick={handleImportClick}
                                      fileInputRef={fileInputRef}
                                      id={`accOne${index+1}`}
                                      target={`accCollapseOne${index+1}`}
                                      expanded={true}
                                      text="1-nji Sapak"
                                      start={0}
                                      end={4}
                                      trigger={trigger}
                                      setTrigger={setTrigger}
                                      createCourseId={createCourseId}
                                      handleDelete={handleDelete}
                                      setCurrentTopicId={setCurrentTopicId}
                                      currentTopicId={currentTopicId}
                                      //selectedCourseId={selectedOption}
                                    />
                                  )
                                })
                              }

                              <button
                                className="rbt-btn btn-md btn-gradient hover-icon-reverse"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                <span className="icon-reverse-wrapper">
                                  <span className="btn-text">Täze Topigi goşuň</span>
                                  <span className="btn-icon">
                                    <i className="feather-plus-circle"></i>
                                  </span>
                                  <span className="btn-icon">
                                    <i className="feather-plus-circle"></i>
                                  </span>
                                </span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="mt--10 row g-5">
            <div className="col-lg-4">
              <Link
                className="rbt-btn hover-icon-reverse bg-primary-opacity w-100 text-center"
                href="/course-details"
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">
                    Gysgaça syn
                  </span>
                  <span className="btn-icon">
                    <i className="feather-eye"></i>
                  </span>
                  <span className="btn-icon">
                    <i className="feather-eye"></i>
                  </span>
                </span>
              </Link>
            </div>
            <div className="col-lg-8">
              <button
              type="button"
              disabled={loading}
                className="rbt-btn btn-gradient hover-icon-reverse w-100 text-center"
                href="#"
                onClick={(e)=>{
                  handleSubmit(e);
                }}
              >
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">
                    Kursy döretmek
                  </span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="rbt-create-course-sidebar course-sidebar sticky-top rbt-shadow-box rbt-gradient-border">
            <div className="inner">
              <div className="section-title mb--30">
                <h4 className="title">
                  Kurs ýüklemek boýunça maslahatlar
                </h4>
              </div>
              <div className="rbt-course-upload-tips">
                <ul className="rbt-list-style-1">
                  <li>
                    <i className="feather-check"></i> Kursyň bahasyny giriziň ýa-da mugt ediň.
                  </li>
                  <li>
                    <i className="feather-check"></i> Kurs eskiziniň standart ölçegi 700x430.
                  </li>
                  <li>
                    <i className="feather-check"></i> Wideo bölümi kursyň umumy wideosyna gözegçilik edýär.
                  </li>
                  <li>
                    <i className="feather-check"></i> "Kursy döretmek", kursy döredýän we gurnaýan ýeriňizdir.
                  </li>
                  <li>
                    <i className="feather-check"></i> Sapaklary, wiktorinalary we ýumuşlary döretmek üçin “Kursy döretmek” bölüminde mowzuklar goşuň.
                  </li>
                  <li>
                    <i className="feather-check"></i> Zerur şertler, bu aýratyn dersi almazdan ozal tamamlanmaly esasy kurslara degişlidir.
                  </li>
                  <li>
                    <i className="feather-check"></i> Goşmaça maglumatlar bölümindäki maglumatlar kursyň bir sahypasynda görkezilýär.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TopicModal 
        setTopics={setTopics}
        topics={topics}
        //selectedCourseId={selectedOption} 
      />
      <UpdateModal />
      <LessonModal 
        topicId={currentTopicId}
        setTopics={setTopics}
        currentTopicId={currentTopicId}
      />
      <QuizModal />
      <AssignmentModal />
      <BackToTopCR 
        progressRef={progressRef}
      />
    </div>
  );
};

export default CreateCourse;














































































































































































































// 1 const previewImages = CreateCourseData.createCourse[0].landscape.filter(
  //   (item) => item.type === "preview"
  // );
  // const portImages = CreateCourseData.createCourse[0].landscape.filter(
  //   (item) => item.type === "port"
  // );


  // const handleImportClick = (e) => {
  //   e.preventDefault();
  //   fileInputRef.current.click();
  // };
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  // };

 
    // const customStyles = {
    //   control: (provided) => ({
    //     ...provided,
    //     height: '40px', 
    //     minHeight: '40px', 
    //     display: 'flex',
    //     alignItems: 'center',
    //     padding: '0 8px',
    //   }),
    //   placeholder: (provided) => ({
    //     ...provided,
    //     fontSize: '14px',
    //     display: 'flex', 
    //     alignItems: 'center',
    //     marginBottom:'10px'
    //   }),
    //   singleValue: (provided) => ({
    //     ...provided,
    //     fontSize: '16px', 
    //     display: 'flex',
    //     alignItems: 'center',
    //   }),
    //   input: (provided) => ({
    //     ...provided,
    //     marginTop: '-10px',
    //     display: 'flex',
    //     alignItems: 'center',
    //     fontSize: '14px',
    //   }),
    //   dropdownIndicator: (provided) => ({
    //     ...provided,
    //     padding: '0 8px',
    //     paddingBottom:"10px",
    //     display: 'flex', 
    //     alignItems: 'center',
    //   }),
    //   indicatorSeparator: (provided) => ({
    //     ...provided,
    //     display: 'none',
    //   }),
    // };








 // const darkModeStyles = {
  //   control: (provided) => ({
  //     ...provided,
  //     backgroundColor: '#333',
  //     borderColor: '#555',
  //     color: '#fff',
  //   }),
  //   menu: (provided) => ({
  //     ...provided,
  //     backgroundColor: '#333',
  //     color: '#fff',
  //   }),
  //   option: (provided, state) => ({
  //     ...provided,
  //     padding: '10px',
  //     backgroundColor: state.isSelected ? '#4CAF50' : state.isFocused ? '#555' : '#333',
  //     color: state.isSelected ? '#fff' : '#ddd',
  //     cursor: 'pointer',
  //   }),
  //   placeholder: (provided) => ({
  //     ...provided,
  //     color: '#aaa',
  //   }),
  //   input: (provided) => ({
  //     ...provided,
  //     color: '#fff',
  //   }),
  //   singleValue: (provided) => ({
  //     ...provided,
  //     color: '#fff',
  //   }),
  //   indicatorSeparator: () => ({
  //     display: 'none',
  //   }),
  //   dropdownIndicator: (provided) => ({
  //     ...provided,
  //     color: '#fff',
  //   }),
  // };

  // const lightModeStyles = {
  //   control: (provided) => ({
  //     ...provided,
  //     backgroundColor: '#fff',
  //     borderColor: '#ccc',
  //     color: '#333',
  //   }),
  //   menu: (provided) => ({
  //     ...provided,
  //     backgroundColor: '#fff',
  //     color: '#333',
  //   }),
  //   option: (provided, state) => ({
  //     ...provided,
  //     padding: '10px',
  //     backgroundColor: state.isSelected ? '#4CAF50' : state.isFocused ? '#e4e4e4' : '#fff',
  //     color: state.isSelected ? '#fff' : '#333',
  //     cursor: 'pointer',
  //   }),
  //   placeholder: (provided) => ({
  //     ...provided,
  //     color: '#888',
  //   }),
  //   input: (provided) => ({
  //     ...provided,
  //     color: '#333',
  //   }),
  //   singleValue: (provided) => ({
  //     ...provided,
  //     color: '#333',
  //   }),
  //   indicatorSeparator: () => ({
  //     display: 'none',
  //   }),
  //   dropdownIndicator: (provided) => ({
    //     ...provided,
    //     color: '#333',
    //   }),
    // };
    
    
    // const currentStyles = isDarkMode ? darkModeStyles : lightModeStyles;



  // const loadOptions = async (inputValue) => {
  //   const url = !inputValue ? "/api/courses" : `/api/courses/?search=${inputValue}`; 
    
  //   try {
      
  //     const response = await axiosInstance.get(url);
      
  //     const options = response.data.map(item=> ({
  //       label: item.title,
  //       value: item.id,
  //       anotherValue:item.slug
  //     }))

  //     return options;
      
  //   } catch (err) {
  //     console.error(err);
  //     return [];
  //   }
  // };

  // const handleChange = selectedOption => {

  //   setSelectedOption(selectedOption?.value);
  //   setSelectedCourse(selectedOption?.anotherValue);

  // };

{/* <small 
  className="d-block mt_dec--5"
  style={{
    marginLeft:'20px'
  }}
>
  <i className="feather-info"></i><span>  </span> 
  Egerde siz täze kursy ýokarda girizip duran bolsaňyz 
</small>
  <AsyncSelect
    cacheOptions
    loadOptions={loadOptions}
    defaultOptions
    value={selectedOption?.label}
    onChange={handleChange}
    placeholder="Goýmaly topigiň kursyny saýlaň..."
    styles={customStyles}
  /> */}

  {/* <Lesson
    handleFileChange={handleFileChange}
    handleImportClick={handleImportClick}
    fileInputRef={fileInputRef}
    id="accOne2"
    target="accCollapseOne2"
    expanded={false}
    text="2-nji sapak"
    start={4}
    end={8}
  /> */}


  {/* <div className="accordion-item card">
    <h2 className="accordion-header card-header" id="accThree3">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#accCollapseThree3"
        aria-expanded="false"
        aria-controls="accCollapseThree3"
      >
        Kurs dörediji
      </button>
    </h2>
    <div
      id="accCollapseThree3"
      className="accordion-collapse collapse"
      aria-labelledby="accThree3"
      data-bs-parent="#tutionaccordionExamplea12"
    >
    </div>
  </div>

  <div className="accordion-item card rbt-course-field-wrapper">
    <h2 className="accordion-header card-header" id="accSix">
      <button
        className="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#accCollapseSix"
        aria-expanded="false"
        aria-controls="accCollapseSix"
      >
        Goşmaça maglumat
      </button>
    </h2>
    <AdditionalForm />
  </div> */}


  {/* sahalanma sablony <div className="accordion-item card">
                <h2 className="accordion-header card-header" id="accSeven">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#accCollapseEight"
                    aria-expanded="false"
                    aria-controls="accCollapseEight"
                  >
                    Şahadatnama şablony
                  </button>
                </h2>
                <div
                  id="accCollapseEight"
                  className="accordion-collapse collapse"
                  aria-labelledby="accSeven"
                  data-bs-parent="#tutionaccordionExamplea1"
                >
                  <div className="accordion-body card-body">
                    <div className="advance-tab-button advance-tab-button-1">
                      <ul
                        className="rbt-default-tab-button nav nav-tabs"
                        id="myTab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <a
                            href="#"
                            className="active"
                            id="landscape-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#landscape"
                            role="tab"
                            aria-controls="landscape"
                            aria-selected="true"
                          >
                            <span>Albom</span>
                          </a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a
                            href="#"
                            id="portrait-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#portrait"
                            role="tab"
                            aria-controls="portrait"
                            aria-selected="false"
                          >
                            <span>Portret</span>
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="tab-content">
                          <div
                            className="tab-pane fade advance-tab-content-1 active show"
                            id="landscape"
                            role="tabpanel"
                            aria-labelledby="landscape-tab"
                          >
                            <div className="row g-5 mt--10">
                              <div className="col-lg-4">
                                <div className="certificate-inner rbt-image-checkbox">
                                  <input
                                    type="radio"
                                    id="option1"
                                    name="radio-group"
                                    defaultValue="option1"
                                  />
                                  <label htmlFor="option1">
                                    <Image
                                      src={svgImg}
                                      alt="Certificate Image"
                                    />
                                  </label>
                                </div>
                              </div>
                              {CreateCourseData &&
                                previewImages.map((data, index) => (
                                  <div className="col-lg-4" key={index}>
                                    <div className="certificate-inner rbt-image-checkbox">
                                      <input
                                        type="radio"
                                        id={`option${index + 2}`}
                                        name="radio-group"
                                        defaultValue={`option${index + 2}`}
                                      />
                                      <label htmlFor={`option${index + 2}`}>
                                        <Image
                                          src={data.img}
                                          width={242}
                                          height={188}
                                          alt="Certificate Image"
                                        />
                                      </label>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>

                          <div
                            className="tab-pane fade advance-tab-content-1"
                            id="portrait"
                            role="tabpanel"
                            aria-labelledby="portrait-tab"
                          >
                            <div className="row g-5 mt--10">
                              <div className="col-lg-4">
                                <div className="certificate-inner rbt-image-checkbox">
                                  <input
                                    type="radio"
                                    id="optionport1"
                                    name="radio-group"
                                    defaultValue="optionport1"
                                  />
                                  <label htmlFor="optionport1">
                                    <Image
                                      src={svgImg2}
                                      alt="Certificate Image"
                                    />
                                  </label>
                                </div>
                              </div>
                              {CreateCourseData &&
                                portImages.map((data, index) => (
                                  <div className="col-lg-4" key={index}>
                                    <div className="certificate-inner rbt-image-checkbox">
                                      <input
                                        type="radio"
                                        id={`optionport${index + 3}`}
                                        name="radio-group"
                                        defaultValue={`optionport${index + 3}`}
                                      />
                                      <label htmlFor={`optionport${index + 3}`}>
                                        <Image
                                          src={data.img}
                                          width={242}
                                          height={340}
                                          alt="Certificate Image"
                                        />
                                      </label>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}