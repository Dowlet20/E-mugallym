"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import img from "../../public/images/others/thumbnail-placeholder.svg";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import { Ripple } from "react-css-spinners";

const InfoForm = ({
  setCreateCourseId,
  setCreateCourseSlug,
  setCreateCourseTitle,
  acButtonRef,
  setTitle,
  setShort_description,
  setDescription,
  setLearning_outcomes,
  setRequirements,
  setSelectedLevel,
  setSelectedLanguage,
  setSelectedValues,
  setSelectedImage,
  categories,
  levels,
  languages,
  setPaid,
  setCertified,
  setPrice,
  setDiscount,
  setPreview,
  setStart_date,
  selectedLevel,
  selectedLanguage,
  paid,
  preview,
  certified
}) => {
  const [inp, setInp] = useState(100);
  // 1
  
  const handleImageChange = (event) => {
    const file = event.target.files[0]; 

    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file)); 
    } else {
      alert('Please select a valid image file.');
    }
  };


  const handleCheckboxChange = (event) => {
    const value = parseInt(event.target.value, 10);
    
    if (event.target.checked) {
      setSelectedValues((prevValues) => [...prevValues, value]);
    } else {
      setSelectedValues((prevValues) =>
        prevValues.filter((item) => item !== value)
      );
    }
  };


  const handleLevelSelect = (e) => {
    const value = e.target.value;

    setSelectedLevel(value);
  }


  const handleLanguageSelect = (e) => {
    const value = e.target.value;

    setSelectedLanguage(value);
  }

  

  return (
    <>
     {/* {loading && (
      <div className="d-flex bg-transparent"  style={{height: '100vh'}}>
        <Ripple
          color="rgba(12,235,115,1)"
          size={115}
          thickness={7}
          className="mx-auto align-self-center"
        />
      </div>
     )} */}
      <form onSubmit={()=>{}} className="rbt-course-field-wrapper rbt-default-form">
        <div className="course-field mb--15">
          <label htmlFor="field-1">
            Kursyň ady
          </label>
          <input 
            id="field-1"  
            type="text" 
            placeholder="Täze kurs" 
            onChange={(e)=>setTitle(e.target.value)}
          />
          <small className="d-block mt_dec--5">
            <i className="feather-info"></i> 
            Ady 30 simwoldan ybarat bolmaly.
          </small>
        </div>
        

        <div className="course-field mb--15">
          <label htmlFor="aboutCourse">
            Kurs barada gysgaça maglumat
          </label>
          <textarea 
            id="aboutCourse" 
            rows="10"
            onChange={(e)=>setShort_description(e.target.value)}
          >
          </textarea>
          <small className="d-block mt_dec--5">
            <i className="feather-info"></i> 
            HTML ýa-da ýönekeý tekste rugsat berilýär, şekiljikler goýmaly däl. Bu meýdan gözlemek üçin ulanylýar, şonuň üçin gysga we manynyly düşündiriň!
          </small>
        </div>

        <div className="course-field mb--20">
          <h6>Kategoriýalary saýlaň</h6>
          <div style={{ marginTop: '2rem', marginLeft: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {categories.length===0 ? [] : 
                categories?.map((category, index) => {
                  return (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`checkbox${category?.id}`}
                        style={{
                            width: '3.5em',  
                            height: '3.5em', 
                            border: '2px solid #007bff',
                            borderRadius: '5px',
                            transition: 'background-color 0.3s, border-color 0.3s',
                        }}
                        value={category?.id}
                        onChange={handleCheckboxChange}
                      />
                      
                      <label
                        className="form-check-label"
                        htmlFor={`checkbox${category?.id}`}
                        style={{
                          fontSize: '16px',
                          color: '#333',
                          marginLeft: '10px',
                          cursor: 'pointer',
                        }}
                      >
                        {category?.title}
                      </label>
                    </div>
                  )
                })
              }
            </div>
          </div>
          
        </div>

        <div className="course-field mb--15 edu-bg-gray">
          <h6>Kurs sazlamalary</h6>
          <div className="rbt-course-settings-content">
            <div className="row g-5">
              <div className="col-lg-6">
                <div className="tab-content">
                  <div
                    className="tab-pane fade advance-tab-content-1 active show"
                    id="general"
                    role="tabpanel"
                    aria-labelledby="general-tab"
                  >
                    <div className="course-field mb--20">
                      <label htmlFor="field-4">Kynçylyk derejesi</label>
                      <div className="rbt-modern-select bg-transparent height-45 mb--10">
                        <select 
                          value={selectedLevel}
                          onChange={handleLevelSelect} 
                          className="w-100" 
                          id="field-4"
                        >
                          <option key={""} value={0}>
                              Derejesini saýlaň
                          </option>
                          {
                            levels.length ===0 ? [] : levels.map(
                              (level,index) => {
                                return (
                                <option value={level?.id} key={index}>
                                  {level?.title}
                                </option>        
                                )
                              }
                            )
                          }
                        </select>
                      </div>
                      <small>
                        <i className="feather-info"></i> 
                        Okuwyň kynçylyk derejesi
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="tab-content">
                  <div
                    className="tab-pane fade advance-tab-content-1 active show"
                    id="general"
                    role="tabpanel"
                    aria-labelledby="general-tab"
                  >
                    <div className="course-field mb--20">
                      <label htmlFor="field-4">Dili</label>
                      <div className="rbt-modern-select bg-transparent height-45 mb--10">
                        <select 
                          value={selectedLanguage}
                          onChange={handleLanguageSelect} 
                          className="w-100" 
                          id="field-4"
                        >
                          <option key={""} value={0}>
                              Dili saýlaň
                          </option>
                          {
                            languages.length ===0 ? [] : languages.map(
                              (language,index) => {
                                return (
                                <option value={language?.id} key={index}>
                                  {language?.title}
                                </option>        
                                )
                              }
                            )
                          }
                        </select>
                      </div>
                      <small>
                        <i className="feather-info"></i> Kursyň dilini saýlaň
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="course-field mb--15 edu-bg-gray">
          <h6>Okuw tölegi</h6>
          <div className="rbt-course-settings-content">
            <div className="row">
              <div className="col-lg-4">
                <div className="advance-tab-button advance-tab-button-1">
                  <ul
                    className="rbt-default-tab-button nav nav-tabs"
                    id="coursePrice"
                    role="tablist"
                  >
                    <li className="nav-item w-100" role="presentation">
                      <a
                        href="#"
                        className={`${paid ? "bg-primary text-white" : ""}`}
                        id="paid-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#paid"
                        role="tab"
                        aria-controls="paid"
                        aria-selected="true"
                        onClick={(e)=>{
                          e.preventDefault();
                          setPaid(true);
                        }}
                      >
                        <span>Tölegli</span>
                      </a>
                    </li>
                    <li className="nav-item w-100" role="presentation">
                      <a
                        href="#"
                        id="free-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#free"
                        role="tab"
                        aria-controls="free"
                        aria-selected="false"
                        onClick={(e)=>{
                          e.preventDefault();
                          setPaid(false);
                        }}
                      >
                        <span>Mugt</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="tab-content">
                  <div
                    className="tab-pane fade advance-tab-content-1 active show"
                    id="paid"
                    role="tabpanel"
                    aria-labelledby="paid-tab"
                  >
                    <div className="course-field mb--15">
                      <label htmlFor="regularPrice-1">Adaty baha (TMT)</label>
                      <input
                        id="regularPrice-1"
                        type="number"
                        placeholder="$ Adaty baha"
                        onChange={(e)=>setPrice(price=>e.target.value)}
                      />
                      <small className="d-block mt_dec--5">
                        <i className="feather-info"></i> Okuwyň bahasy aýlyk haklaryny öz içine alýar.
                      </small>
                    </div>

                    <div className="course-field mb--15">
                      <label htmlFor="discountedPrice-1">
                        Arzanladyş bahasy  (TMT)
                      </label>
                      <input
                        id="discountedPrice-1"
                        type="number"
                        placeholder="$ Arzanladyş bahasy"
                        onChange={(e)=>setDiscount(discount=>e.target.value)}
                      />
                      <small className="d-block mt_dec--5">
                        <i className="feather-info"></i> 
                        Okuwyň bahasy aýlyk haklaryny öz içine alýar.
                      </small>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade advance-tab-content-1"
                    id="free"
                    role="tabpanel"
                    aria-labelledby="free-tab"
                  >
                    <div className="course-field">
                      <p className="b3">Bu okuw hemmeler üçin mugt.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="course-field mb--20">
          <h6>Kursyň suraty</h6>
          <div className="rbt-create-course-thumbnail upload-area">
            <div className="upload-area">
              <div className="brows-file-wrapper" data-black-overlay="9">
                <input
                  onChange={handleImageChange}
                  accept="image/*"
                  name="createinputfile"
                  id="createinputfile"
                  type="file"
                  className="inputfile"
                />
                <Image
                  id="createfileImage"
                  src={preview ? preview : img}
                  width={797}
                  height={262}
                  alt="file image"
                />

                <label
                  className="d-flex"
                  htmlFor="createinputfile"
                  title="No File Choosen"
                >
                  <i className="feather-upload"></i>
                  <span className="text-center">Faýly saýlaň</span>
                </label>
              </div>
            </div>
          </div>

          <small>
            <i className="feather-info"></i> <b>Ölçegi:</b> 700x430 pixels,
            <b>elýeterli faýl formatlar:</b> JPG, JPEG, PNG, GIF, WEBP
          </small>
        </div>
      <div
        // id="accCollapseSix"
        // className="accordion-collapse collapse"
        // aria-labelledby="accSix"
        // data-bs-parent="#tutionaccordionExamplea1"
      >
        <div className="accordion-body card-body rbt-course-field-wrapper rbt-default-form row row-15">
          <div className="col-lg-6">
            <div className="course-field mb--15">
              <label htmlFor="startDate">Başlaýan wagty</label>
              <input 
                type="date" 
                id="startDate" 
                name="startDate"
                onChange={(e)=>{setStart_date(e.target.value)}}
              />
            </div>
          </div>

          <div className="col-lg-3">
            <div className="course-field mb--15">
              <button
                className={certified ? "bg-primary border text-white w-100 p-3" : "border p-3 w-100"}
                onClick={() => setCertified(true)}
                style={{
                  border: '2px solid',
                  borderColor: '#e9ecef',
                  backgroundColor: "white",
                  borderRadius: '6px',
                  padding: '15px'
                }}
              >
                <span>Sertifikatlaşdyrylan</span>
              </button>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="course-field mb--15">
              <button
                className={!certified ? "bg-primary border text-white w-100 p-3" : "border p-3 w-100"}
                onClick={() => setCertified(false)}
                style={{
                  border: '2px solid',
                  borderColor: '#e9ecef',
                  backgroundColor: "white",
                  borderRadius: '6px',
                  padding: '15px'
                }}
              >
                <span>Sertifikatlaşdyrmadyk</span>
              </button>
            </div>
          </div>


          <div className="col-lg-6">
            <div className="course-field mb--15">
              <label htmlFor="whatLearn">Gerekli</label>
              <textarea
                id="whatLearn"
                rows="5"
                placeholder="Kursyň peýdalaryny goşuň."
                onChange={(e)=>setRequirements(e.target.value)}
              ></textarea>
              <small className="d-block mt_dec--5">
                <i className="feather-info"></i> 
                Her setirini aýratyn ýazyň.
              </small>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="course-field mb--15">
              <label htmlFor="description">Düşündiriliş</label>
              <textarea
                id="description"
                rows="5"
                placeholder="Kursyň peýdalaryny goşuň."
                onChange={(e)=>setDescription(e.target.value)}
              ></textarea>
              <small className="d-block mt_dec--5">
                <i className="feather-info"></i> 
                Her setirini aýratyn ýazyň.
              </small>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="course-field mb--15">
              <label htmlFor="description">Kurs barada doly düşündiriliş</label>
              <textarea
                id="description"
                rows="5"
                placeholder="Kursyň peýdalaryny goşuň."
                onChange={(e)=>setLearning_outcomes(e.target.value)}
              ></textarea>
              <small className="d-block mt_dec--5">
                <i className="feather-info"></i> 
                Her setirini aýratyn ýazyň.
              </small>
            </div>
          </div>
          <div className="col-lg-12">
              {/* <button
                className="rbt-btn btn-gradient hover-icon-reverse w-100 text-center"
                type="submit"
                disabled={loading}
              >
                    Kursy döretmek
                <span className="icon-reverse-wrapper">
                  <span className="btn-text">
                  </span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right"></i>
                  </span>
                </span>
              </button> */}
            </div>
        </div>
      </div>
      </form>
    </>
  );
};

export default InfoForm;


// const [title, setTitle] = useState("");
  // const [short_description, setShort_description] = useState("");
  // const [description, setDescription] = useState("");
  // const [learning_outcomes, setLearning_outcomes] = useState("");
  // const [teacherId, setTeacherId] = useState(null);
  // const [requirements, setRequirements] = useState("");
  // const [selectedLevel, setSelectedLevel] = useState(0);
  // const [selectedLanguage, setSelectedLanguage] = useState(0);
  // const [selectedValues, setSelectedValues] = useState([]);
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [categories, setCategories] = useState([]);
  // const [levels, setLevels] = useState([]);
  // const [languages, setLanguages] = useState([]);
  // const [paid, setPaid] = useState(true);
  // const [certified, setCertified] = useState(true);
  // const [price, setPrice] = useState(0);
  // const [discount, setDiscount] = useState(0);
  // const [preview, setPreview] = useState(null);
  // const [start_date, setStart_date] = useState(null);
  // const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

    
  //   if (!title || !short_description || !description || !learning_outcomes || !teacherId || !requirements || !selectedLevel || !selectedLanguage || selectedValues.length ===0 || !selectedImage || !start_date) {
  //     alert("Ähli maglumatlary doly giriziň! ")
  //     return;
  //   }

  //   setLoading(true);
    
  //   const formData = new FormData();
  //   formData.append('title', title);
  //   formData.append('short_description', short_description);
  //   formData.append('description', description);
  //   formData.append('learning_outcomes', learning_outcomes);
  //   formData.append('user', teacherId);
  //   formData.append('requirements', requirements);
  //   formData.append('level', selectedLevel);
  //   formData.append('language', selectedLanguage);
  //   selectedValues.forEach(value=>{
  //     formData.append('category', value);
  //   })
  //   //formData.append('category', selectedValues);
  //   formData.append('thumbnail', selectedImage);
  //   formData.append('price', price);
  //   formData.append('discount', discount);
  //   formData.append('is_active', false);
  //   formData.append('paid', paid);
  //   formData.append('certified', certified);
  //   formData.append('start_date', start_date);
  //   // formData.forEach((value, key) => {
  //   //   console.log(`${key}: ${value}`);
  //   // });
    
  //   try {
  //     const response = await axiosInstance.post(
  //       "/api/courses/", 
  //       formData, 
  //       {
  //         headers: {
  //           'Content-Type':'multipart-data',
  //         }  
  //       }
  //     );
  //     setCreateCourseId(response.data.id);
  //     setCreateCourseSlug(response.data.slug);
  //     setCreateCourseTitle(response.data.title);
  //     acButtonRef.current.click();
  //     e.target.reset();

  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
