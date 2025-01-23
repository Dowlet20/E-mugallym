"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import img from "../../../public/images/others/thumbnail-placeholder.svg";
import Lesson from "../lesson/Lesson";
import axiosInstance from "@/utils/axiosInstance";

const LessonModal = ({
  topicId,
  setTopics,
  currentTopicId
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
  const [type, setType] = useState("video");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lessonPost = () => {
    console.log("Topic ID:", currentTopicId);
    setIsSubmitting(true);
  
    if (!file) {
      alert("Faýly giriziň!");
      return;
    }
  
    if (!lessonTitle) {
      setError("Sapagyň adyny giriziň!");
      return;
    }
  
    const order = parseInt(lessonOrder, 10);
  
    const formData = {
      title: lessonTitle,
      order: order,
      material: file,
      type: type,
      topicId:currentTopicId
    };
  
    try {
      setTopics((prevTopics) => {
        console.log("Previous Topics:", prevTopics);
        console.log("Updating Topic ID:", currentTopicId);
  
        const topicIndex = prevTopics.findIndex((topic) => topic.id === currentTopicId);
        console.log("Found Topic Index:", topicIndex);
  
        if (topicIndex !== -1) {
          const updatedTopics = [...prevTopics];
          updatedTopics[topicIndex] = {
            ...updatedTopics[topicIndex],
            lessons: [...updatedTopics[topicIndex].lessons, formData],
          };
  
          console.log("Updated Topics:", updatedTopics);
          return updatedTopics;
        }
  
        console.warn("Topic ID not found:", currentTopicId);
        return prevTopics;
      });
  
      // Reset form fields
      setLessonTitle("");
      titleInputRef.current.value = "";
      setLessonOrder(123123123);
      orderInputRef.current.value = "";
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
    setFileName(file?.name);
    setFile(file);
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
