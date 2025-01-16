"use client";
import {useEffect, useState} from "react";
import LessonSidebar from "@/components/Lesson/LessonSidebar";
import LessonPagination from "@/components/Lesson/LessonPagination";
import LessonTop from "@/components/Lesson/LessonTop";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import videojs from 'video.js'
import {useRouter} from "next/navigation";
import { useParams } from "next/navigation";
import React from "react";
import { base_URL } from "@/utils/axiosInstance";

import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const LessonPage = () => {
  const params = useParams();
  const lesson_slug= params?.lessonId;
  const course_slug= params?.courseId;

  const [lesson, setLesson] = useState({});
  const [lesson_title, setLesson_title] = useState('');



  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/lesson/${lesson_slug}`);
        setLesson(response.data);
        setLesson_title(response.data?.title)
      } catch (err) {
        console.error(err);
      }
    }

    if (lesson_slug) {
      fetchData();
    }
  }, []);

  return (
    <>
      <div className="rbt-lesson-area bg-color-white">
        <div className="rbt-lesson-content-wrapper">
          <div className="rbt-lesson-leftsidebar">
            <LessonSidebar course_slug={course_slug} lesson_slug={lesson_slug} topic_id={lesson?.topic} />
          </div>

          <div className="rbt-lesson-rightsidebar overflow-hidden lesson-video">
            <LessonTop lesson_title={lesson_title} course_slug={course_slug} />
            <div className="inner">
              <div className="plyr__video-embed rbtplayer">
              <ReactPlayer
                url={lesson_slug ? `${base_URL}api/lesson/${lesson_slug}/material` : "https://www.youtube.com/embed/qKzhrXqT6oE"}
                width="100%"
                height="100%"
                playing={false} // Start playing immediately
                controls={true} // Show controls (play/pause, volume, etc.)
                light={false} // Don't show the thumbnail if video is playable
              />
                {/* <CldVideoPlayer  we have lazy load
                  id="course"
                  width={'1920'}
                  height={'1080'}
                  style={{ minHeight: "615px" }}
                  src={lesson_slug ? `${base_URL}api/lesson/${lesson_slug}/material` : "https://www.youtube.com/embed/qKzhrXqT6oE"}
                /> */}
                {/* <iframe
                  className="w-100"
                  src={lesson_slug ? `${base_URL}api/lesson/${lesson_slug}/material` : "https://www.youtube.com/embed/qKzhrXqT6oE"}
                  style={{ minHeight: "615px" }}
                  crossOrigin="anonymous"  // Add this attribute
                ></iframe> */}
              </div>
              <div className="content">
                <div className="section-title">
                  <h4>Kurs barada</h4>
                  <p>
                  Geliň geçmişiň iň uly hitlerini seljereliň we nämäni öwreneliň
                    bu ýollary şeýle aýratynlaşdyrýar
                  </p>
                </div>
              </div>
            </div>
            {/* <LessonPagination urlPrev="#" urlNext="/lesson-intro" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonPage;
