"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import img from "../../../public/images/others/thumbnail-placeholder.svg";
import Lesson from "../lesson/Lesson";
import axiosInstance from "@/utils/axiosInstance";

const LessonModal = ({
  topicId,
  createCourseId,
  selectedCourseId,
  setTrigger
}) => {
  const fileInputRef = useRef(null);
  const titleInputRef =useRef(null);
  const orderInputRef =useRef(null);
  const closeModalButtonRef=useRef(null);
  const [activeButton, setActiveButton] = useState(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonOrder, setLessonOrder] = useState(123123123);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Faýl saýlanylmadyk! ");
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const lessonPost = async () => {
  
    setIsSubmitting(true);

    if (!file) {
      alert('Faýly giriziň!');
      return;
    }
  
    if (!lessonTitle) {
      setError("Sapagyň adyny giriziň!");
      return;
    }
  
    if (!selectedCourseId && !createCourseId) {
      setError("Topigiň kursyny giriziň!");
      return;
    }
  
    if (!topicId) {
      setError("Topigi saýlaň!");
      return;
    }
  
    const course = selectedCourseId ? selectedCourseId : createCourseId ? createCourseId : 0;
    const order = parseInt(lessonOrder, 10);
  
    
    const formData = new FormData();
    formData.append('title', lessonTitle);
    formData.append('topic', topicId);
    formData.append('course', course);
    formData.append('order', order);
    formData.append('material', file); 
    formData.append('type', 'video'); 
  
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
      
      setLessonTitle(""); 
      titleInputRef.current.value="";
      setLessonOrder(123123123); 
      orderInputRef.current.value="";
      setTrigger(true); 
      setFile(null); 
      setFileName("Faýl saýlanylmadyk! ");
      closeModalButtonRef.current.click();
    } catch (err) {
      console.error("Error during lesson post:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const handleImportClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setFile(file);
    // if (file) {
    //   console.log("Selected file:", file.name);
    // }
  };
  return (
    <>
      <div
        className="rbt-default-modal modal fade"
        id="Lesson"
        tabIndex="-1"
        aria-labelledby="LessonLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="rbt-round-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="feather-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="inner rbt-default-form">
                <div className="row">
                  <div className="col-lg-12">
                    <h5 className="modal-title mb--20" id="LessonLabel">
                      Sapak goş
                    </h5>
                    <div className="course-field mb--20">
                      <label htmlFor="modal-field-1">
                        Sapagyň ady
                      </label>
                      <input 
                        ref={titleInputRef}
                        id="modal-field-1" 
                        type="text" 
                        onChange={(e)=>setLessonTitle(e.target.value)}
                      />
                      <small>
                        <i className="feather-info"> </i> 
                        Sapagyň adyny giriz
                      </small>
                    </div>
                    <div className="course-field mb--20">
                      <label htmlFor="modal-field-2">
                        Sapagyň durmaly tertibi
                      </label>
                      <input 
                        ref={orderInputRef}
                        id="modal-field-2" 
                        type="number" 
                        onChange={
                          (e)=>setLessonOrder(e.target.value)
                        }
                      />
                      <small>
                        <i className="feather-info"> </i> 
                        Sapagyň durmaly tertibini giriz
                      </small>
                    </div>
                    <div className="course-field mb--20">
                      <h6>
                        Sapagyň videosyny giriziň
                      </h6>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        margin: '20px',
                        padding: '20px',
                        //backgroundColor: '#f9f9f9',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      }}>
                        <input
                          type="file"
                          accept="video/*"
                          id="fileInput"
                          style={{
                            display: 'none', 
                            backgroundColor: '#f0f0f0', 
                            border: '1px solid #ccc', 
                            padding: '10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            width: '100%', 
                            fontSize: '16px',
                          }}
                          onChange={handleFileChange}
                        />
                        
                        <label 
                          htmlFor="fileInput"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '15px 30px',
                            backgroundColor: '#faf6fd',
                            color: 'black',
                            fontSize: '14px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease, transform 0.2s ease',
                          }}
                        >
                          <span style={{ marginRight: '10px' }} className="file-label-text">{fileName}</span>
                          <span style={{ fontSize: '18px' }} className="file-upload-icon">📂</span>
                        </label>
                      </div>

                      <small>
                        <i className="feather-info"> </i> 
                        Siz diňe wideo ýükläp bilýärsiňiz
                      </small>
                    </div>
                    <div>
                      <button
                        className={`btn btn-lg ${activeButton === 1 ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setActiveButton(1)}
                      >
                        Video 
                      </button>
                      
                      <button
                        className={`btn btn-lg ${activeButton === 2 ? "btn-secondary" : "btn-outline-secondary"}`}
                        onClick={() => setActiveButton(2)}
                        style={{ marginLeft: '8px' }} /* 2 units gap */
                      >
                        Document
                      </button>
                    </div>
                    <small>
                        <i className="feather-info"> </i> 
                        Girizmeli faýlyň görnüşini saýlaň
                      </small>
                    {/* <div className="course-field mb--20">
                      <h6>Video Source</h6>
                      <div className="rbt-modern-select bg-transparent height-45 w-100 mb--10">
                        <select className="w-100">
                          <option>Select Video Source</option>
                          <option>External URL </option>
                          <option>Youtube </option>
                          <option>Vimo</option>
                          <option>facebook</option>
                          <option>twitter</option>
                        </select>
                      </div>
                    </div> */}
                    {/* <div className="course-field mb--15">
                      <label>Video playback time</label>
                      <div className="row row--15">
                        <div className="col-lg-4">
                          <input type="number" placeholder="00" />
                          <small className="d-block mt_dec--5">
                            <i className="feather-info"></i> Hour.
                          </small>
                        </div>
                        <div className="col-lg-4">
                          <input type="number" placeholder="00" />
                          <small className="d-block mt_dec--5">
                            <i className="feather-info"></i> Minute.
                          </small>
                        </div>
                        <div className="col-lg-4">
                          <input type="number" placeholder="00" />
                          <small className="d-block mt_dec--5">
                            <i className="feather-info"></i> Second.
                          </small>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="course-field mb--20">
                      <h6>Upload exercise files to the Lesson</h6>
                      <div className="rbt-modern-select bg-transparent height-45 w-100 mb--10">
                        <button
                          className="rbt-btn btn-md btn-border hover-icon-reverse"
                          onClick={handleImportClick}
                        >
                          <span className="icon-reverse-wrapper">
                            <span className="btn-text">Upload Attachments</span>
                            <span className="btn-icon">
                              <i className="feather-paperclip"></i>
                            </span>
                            <span className="btn-icon">
                              <i className="feather-paperclip"></i>
                            </span>
                          </span>
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                      </div>
                    </div> */}
                    {/* <div className="course-field mb--20">
                      <p className="rbt-checkbox-wrapper mb--5 d-flex">
                        <input
                          id="rbt-checkbox-11"
                          name="rbt-checkbox-11"
                          type="checkbox"
                          defaultValue="yes"
                        />
                        <label htmlFor="rbt-checkbox-11">
                          Enable Course Preview
                        </label>
                      </p>
                    </div> */}
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="top-circle-shape"></div>
            <div className="modal-footer pt--30 justify-content-between">
              <button
                ref={closeModalButtonRef}
                type="button"
                className="rbt-btn btn-border btn-md radius-round-10"
                data-bs-dismiss="modal"
              >
                Çyk
              </button>
              <div className="content">
                <button 
                  type="button" 
                  className="rbt-btn btn-md"
                  onClick={lessonPost}
                  disabled={isSubmitting}
                >
                  Sapagy goş
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonModal;
