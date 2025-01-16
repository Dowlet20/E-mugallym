"use client"

import Image from "next/image";
import {useEffect, useState} from "react";
import axios from "axios";
import img1 from "../../public/images/tab/tabs-10.jpg";

import axiosInstance from "@/utils/axiosInstance_user";

const InstructorRegistration = () => {
  const [professions, setProfessions] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState(0);
  const [img, setImg] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [info, setInfo] = useState({

      first_name:"",
      last_name:"",
      middle_name:"",
      username:"",
      phone_number:"",
      email:"",
      // password:"",
      // confirm_password:"",
      biography:"",
      type:"instructor",

    }
  )

  const handleFileImg = (event) => {
    if (event.target.files && event.target.files.length > 0) {  
      setImg(event.target.files[0]); 
    }
  };

  const handleFileThumbnail = (event) => {
    if (event.target.files && event.target.files.length > 0) {  
      setThumbnail(event.target.files[0]); 
    }
  };

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/profession");
        setProfessions(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  
  const handleChange = (e) => {
    setSelectedProfession(e.target.value);
  } 

  // console.log(img);
  // console.log(thumbnail);
  // console.log(info?.username);
  // console.log(info?.first_name);
  // console.log(info?.last_name);
  // console.log(info?.middle_name);
  // console.log(info?.phone_number);
  // console.log(info?.email);
  // console.log(info?.biography);
  // console.log(selectedProfession);

  const postInstructor = async (e) => {
    e.preventDefault();


    if (!img || !thumbnail || !info?.username || !info?.first_name || !info?.last_name || !info?.middle_name || !info?.email || !selectedProfession || !info?.phone_number || !info?.biography) {
      alert("Maglumatynyzy doly giriziň!");
      return;
    }

    const formData = new FormData();

    formData.append("img", img);
    formData.append("thumbnail", thumbnail);
    formData.append("username", info?.username);
    formData.append("first_name", info?.first_name);
    formData.append("middle_name", info?.middle_name);
    formData.append("last_name", info?.last_name);
    formData.append("profession", selectedProfession);
    formData.append("phone_number", info?.phone_number);
    formData.append("biography", info?.biography);
    formData.append("email", info?.email);
    formData.append("type", "instructor");
    formData.append("order", 1000000); //duzetmeli

    const url="http://216.250.12.100:5000/api/user/";

    try {
      
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.id);
      localStorage.setItem('teacher_id', response.data.id);
      e.target.reset();
      // duzetmeli kabir zatlar menzes bolmaly dal diyip yalnyslyk cykarmaly
    } catch (error) {
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
    }

  }


  return (
    <>
      <div className="row pt--60 g-5">
        <div className="col-lg-4">
          <div className="thumbnail">
            <Image
              className="radius-10 w-100"
              src={img1}
              alt="Corporate Template"
            />
          </div>
        </div>

        <div className="col-lg-8">
          <div className="rbt-contact-form contact-form-style-1 max-width-auto">
            <div className="section-title text-start">
              <span className="subtitle bg-primary-opacity">
                Mugallym bolmak üçin
              </span>
            </div>
            <h3 className="title">Mugallym Registrasiýa</h3>
            <hr className="mb--30" />
            <form action="#" onSubmit={postInstructor} className="row row--15">
              <div className="col-lg-6">
                <div className="form-group">
                  <input 
                    name="con_name" 
                    type="text" 
                    placeholder="Ady"
                    onChange={(e) => setInfo((info)=> ({
                      ...info,
                      "first_name":e.target.value,
                    }))} 
                  />
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    name="con_lastname"
                    type="text"
                    placeholder="Familiýasy"
                    onChange={(e) => setInfo((info)=> ({
                      ...info,
                      "last_name":e.target.value,
                    }))} 
                  />

                  <span className="focus-border"></span>
                </div>
              </div>
              
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    name="con_middlename"
                    type="text"
                    placeholder="Atasynyň ady"
                    onChange={(e) => setInfo((info)=> ({
                      ...info,
                      "middle_name":e.target.value,
                    }))} 
                  />
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    name="con_username"
                    type="text"
                    placeholder="Ulanyjy ady"
                    onChange={(e) => setInfo((info)=> ({
                      ...info,
                      "username":e.target.value,
                    }))} 
                  />
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    name="con_phone"
                    type="text"
                    placeholder="Telefon nomeri"
                    onChange={(e) => setInfo((info)=> ({
                      ...info,
                      "phone_number":e.target.value,
                    }))} 
                  />
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <input 
                  name="con_email" 
                  type="email" 
                  placeholder="Email"
                  onChange={(e) => setInfo((info)=> ({
                    ...info,
                    "email":e.target.value,
                  }))}  
                />
                  <span className="focus-border"></span>
                </div>
              </div>

              {/* <div className="col-lg-6">
                <div className="form-group">
                  <input
                    name="con_password"
                    type="password"
                    placeholder="Açar sözi"
                  />
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    name="con_passwordconfirm"
                    type="password"
                    placeholder="Açar sözi tassyklamak"
                  />
                  <span className="focus-border"></span>
                </div>
              </div> */}


              <div className="col-lg-6">
                <div className="form-group">
                  <span className="select-label d-block">
                    Mugallymyň suratyny saýlaň
                  </span>
                <input 
                  type="file" 
                  onChange={handleFileImg} 
                />
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <span className="select-label d-block">
                    Mugallym paneli üçin suraty saýlaň
                  </span>
                  <input 
                    type="file" 
                    onChange={handleFileThumbnail} 
                  />
                  <span className="focus-border"></span>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="filter-select">
                  <span className="select-label d-block">Mugallymyň hünäri</span>
                  <div className="filter-select rbt-modern-select search-by-category">
                    <select value={selectedProfession} onChange={handleChange}>
                      <option value={0}>Hünärini saýla</option>
                      {professions?.map((profession,index) => {
                        return (
                          <option value={profession?.id} key={index}>
                            {profession?.title}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <span className="focus-border"></span>
                </div>
              </div>
              
              <div className="col-lg-12">
                <div className="form-group">
                  <textarea 
                    placeholder="Bio"
                    onChange={(e) => setInfo((info)=> ({
                      ...info,
                      "biography":e.target.value,
                    }))}  
                  ></textarea>
                  <span className="focus-border"></span>
                </div>
              </div>


              <div className="col-lg-12">
                <div className="form-submit-group">
                  <button
                    type="submit"
                    className="rbt-btn btn-md btn-gradient hover-icon-reverse w-100"
                  >
                    <span className="icon-reverse-wrapper">
                      <span className="btn-text">Mugallym bolmak</span>
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorRegistration;
