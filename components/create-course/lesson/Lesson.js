"use client";

import { useEffect, useState, useRef } from "react";

import CourseData from "../../../data/course-details/courseData.json";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import LessonModal from "../QuizModals/LessonModal";

import SingleLesson from "./SingleLesson";
import axiosInstance from "@/utils/axiosInstance";

const Lesson = ({
  setTopics,
  handleFileChange,
  handleImportClick,
  fileInputRef,
  target,
  expanded,
  text,
  start,
  end,
  id,
  topic,
  setTrigger,
  handleDelete,
  setCurrentTopicId,
  currentTopicId
}) => {
  
  const [courseList, setCourseList] = useState(CourseData.courseDetails);
  const [hydrated, setHydrated] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCourseList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  if (!hydrated) {
    return null;
  }

  

  const deleteLesson = (ind, topicId) => {
    setTopics((prevTopics) => {
      
      const topicIndex = prevTopics.findIndex((topic) => topic.id === topicId);
    
      
      if (topicIndex !== -1) {
        const updatedTopics = [...prevTopics];
        updatedTopics[topicIndex] = {
          ...updatedTopics[topicIndex], 
          
          lessons: updatedTopics[topicIndex].lessons.filter(
            (_, index) => index !== ind
          ),
        };
    
        return updatedTopics; 
      }
    
      
      return prevTopics;
    });


    try {

    } catch (err) {
      console.error(err);
    }
   }


  return (
    <>
      <div className="accordion-item card mb--20">
        <h2
          className="accordion-header card-header rbt-course"
          id={id}
          onClick={() => setToggle(!toggle)}
        >
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${target}`}
            aria-expanded={toggle}
            aria-controls={target}
          >
            {topic?.title}
          </button>
          <span
            className="rbt-course-icon rbt-course-edit"
            data-bs-toggle="modal"
            data-bs-target="#UpdateTopic"
          ></span>
          <span 
            className="rbt-course-icon rbt-course-del"
            onClick={()=> {
              const userConfirmed = window.confirm("Siz bu topigi pozmak isleýärsiňizmi? ");
              if (userConfirmed) {
                handleDelete(topic?.id);
              }
            }}
          >
          </span>
        </h2>
        <div
          id={target}
          className={`accordion-collapse collapse ${toggle ? "show" : ""}`}
          aria-labelledby={id}
          data-bs-parent="#tutionaccordionExamplea12"
        >
          <div className="accordion-body card-body">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              
              <SortableContext
                items={topic?.lessons}
                strategy={verticalListSortingStrategy}
                >
                {
                  topic?.lessons.length ===0 ? (<></>) :
                  topic?.lessons.map((lesson,ind) => (
                   <SingleLesson 
                    key={ind} 
                    lesson={lesson} 
                    index={ind}
                    deleteLesson={deleteLesson}
                  />
                ))}
              </SortableContext>
            </DndContext>

            <div className="d-flex flex-wrap justify-content-between align-items-center">
              <div className="gap-3 d-flex flex-wrap">
                <button
                  className="rbt-btn btn-border hover-icon-reverse rbt-sm-btn"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#Lesson"
                  onClick={() => setCurrentTopicId(topic?.id)}
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Lesson</span>
                    <span className="btn-icon">
                      <i className="feather-plus-square"></i>
                    </span>
                    <span className="btn-icon">
                      <i className="feather-plus-square"></i>
                    </span>
                  </span>
                </button>
                <button
                  className="rbt-btn btn-border hover-icon-reverse rbt-sm-btn"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#Quiz"
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Quiz</span>
                    <span className="btn-icon">
                      <i className="feather-plus-square"></i>
                    </span>
                    <span className="btn-icon">
                      <i className="feather-plus-square"></i>
                    </span>
                  </span>
                </button>
                <button
                  className="rbt-btn btn-border hover-icon-reverse rbt-sm-btn"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#Assignment"
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Assignments </span>
                    <span className="btn-icon">
                      <i className="feather-plus-square"></i>
                    </span>
                    <span className="btn-icon">
                      <i className="feather-plus-square"></i>
                    </span>
                  </span>
                </button>
              </div>
              <div className="mt-3 mt-md-0">
                <button
                  className="rbt-btn btn-border hover-icon-reverse rbt-sm-btn"
                  onClick={handleImportClick}
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Import Quiz </span>
                    <span className="btn-icon">
                      <i className="feather-download"></i>
                    </span>
                    <span className="btn-icon">
                      <i className="feather-download"></i>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lesson;



