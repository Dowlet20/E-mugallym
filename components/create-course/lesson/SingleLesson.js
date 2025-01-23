"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axiosInstance, { base_URL } from "@/utils/axiosInstance";
import axios from "axios";

const SingleLesson = ({
    index,
    lesson,
    deleteLesson
  }) => {
  const {  title } = lesson;
  // const { attributes, listeners, setNodeRef, transform, transition } =
  //   useSortable({ id });

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // };

  return (
    <>
      <div
        className="d-flex justify-content-between rbt-course-wrape mb-4"
        // ref={setNodeRef}
        // style={style}
        // {...attributes}
        // {...listeners}
      >
        <div className="col-10 inner d-flex align-items-center gap-2">
          <i className="feather-menu cursor-scroll"></i>
          <h6 className="rbt-title mb-0">{title}</h6>
        </div>
        <div className="col-2 inner">
          <ul 
            className="rbt-list-style-1 rbt-course-list d-flex gap-2"
          >
            <li
              style={{
              display: 'flex',
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '0',
              margin: '0',
            }}
            >
              <a
                onClick={()=> {
                  const userConfirmed = window.confirm("Siz bu sapagy pozmak isleýärsiňizmi? ");
                  if (userConfirmed) {
                    deleteLesson(index);
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0',
                  margin: '0',
                }}
              >
                <i className="feather-trash"></i>
              </a>
            </li>
            <li>
              <i
                className="feather-edit"
                data-bs-toggle="modal"
                data-bs-target="#Quiz"
              ></i>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SingleLesson;


// 1 const deleteLesson = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await axiosInstance.delete(`/api/lesson/${slug}/`);
//     setTrigger(true);
//   } catch (err) {
//     console.error(err);
//   }
// }
