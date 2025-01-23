"use client"
import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "@/utils/axiosInstance";

const TopicModal = ({
  setTopics,
  topics
}) => {

  const [topicTitle, setTopicTitle] = useState("");
  const [topicOrder, setTopicOrder] = useState(123123123);
  const [error, setError] = useState("");
  const closeModalButtonRef = useRef(null);

  const topicId = topics.length + 1;

  const topicPost = async () => {

    const formData = {
      id:topicId,
      title:topicTitle,
      order:parseInt(topicOrder,10),
      //course:0,
      lessons:[]
    }


    try {
      
      if (!formData?.title) {
        setError("Topigiň adyny giriziň! ");
      }

      if (formData?.title) {
        setTopics((oldTopics)=> [...oldTopics, formData])
        setTopicTitle("");
        setTopicOrder(123123123);
        closeModalButtonRef.current.click();

      }

    } catch (err) {
      console.error(err);
    }
  }


  return (
    <>
      <div
        className="rbt-default-modal modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
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
                    <h5 className="modal-title mb--20" id="exampleModalLabel">
                      Topik goş
                    </h5>
                    <div className="course-field mb--20">
                      <label htmlFor="modal-field-1">Topigyň ady</label>
                      <input 
                        id="modal-field-1" 
                        type="text"
                        onChange={(e)=>setTopicTitle(e.target.value)}
                      />
                      <small>
                        <i className="feather-info"></i> Topik bu kursyň bölümidir. Her topik bir ýa-da birnäçe sapaklary, testleri we ýumuşlary öz içine alýar.
                      </small>
                    </div>
                    <div className="course-field mb--20">
                      <label htmlFor="modal-field-1">Topigiň orny</label>
                      <input 
                        id="modal-field-1" 
                        type="number"
                        onChange={(e)=>setTopicOrder(e.target.value)}
                      />
                      <small>
                        <i className="feather-info"></i> 
                        Topigiň durmaly ornuny giriziň.
                      </small>
                    </div>
                    {/* <div className="course-field mb--20">
                      <label htmlFor="modal-field-2">Topic Summary</label>
                      <textarea id="modal-field-2"></textarea>
                      <small>
                        <i className="feather-info"></i> Add a summary of short
                        text to prepare students for the activities for the
                        topic. The text is shown on the course page beside the
                        tooltip beside the topic name.
                      </small>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer pt--30">
            <div className="top-circle-shape"></div>
              <button
                className="rbt-btn btn-border btn-md radius-round-10"
                //data-bs-dismiss="modal" //duzetmeli
                onClick={topicPost}
              >
                Goş
              </button>
              <button
                type="button"
                className="rbt-btn btn-border btn-md radius-round-10"
                data-bs-dismiss="modal"
                ref={closeModalButtonRef}
              >
                Çyk
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicModal;
