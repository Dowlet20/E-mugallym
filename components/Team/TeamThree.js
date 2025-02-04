import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";

import TeamHead from "./TeamHead";

import axiosInstance from "@/utils/axiosInstance_user";
import { Ripple } from "react-css-spinners";

const TeamThree = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchData =async () => {
      try {
        const response = await axiosInstance.get("/user");
        setUsers(response.data);
        setLoading(false);
      }
      catch (err) {
        console.error(err)
      }
    } 
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex bg-transparent"  style={{height: '100vh'}}>
        <Ripple
          color="rgba(12,235,115,1)"
          size={115}
          thickness={7}
          className="mx-auto align-self-center"
        />
      </div>
    );
  }

  return (
    <>
      <div className="container">
        {/* <TeamHead title="Team (Modern)." desc="Modern Circle Style." /> */}

        <div className="row row--15 mt_dec--30">
          {users?.map((user, innerIndex) => {
            if (!user?.first_name && !user?.img) return;
            return (
            <div className="col-lg-4 col-md-6 col-12 mt--30" key={innerIndex}>
                <div
                  className="rbt-team team-style-default rbt-hover-02"
                >
                  <div className="inner">
                    <div className="thumbnail">
                      <Link href={`/profile/${user?.id}`}>
                        <Image
                          src={user?.img ? user?.img : "/images/team/team-01.jpg"}
                          width={415}
                          height={555}
                          priority
                          alt="Corporate Template"
                        />
                      </Link>
                    </div>
                    <div className="content">
                      <h2 className="title">
                      <div className="rbt-card-text" style={{
                        width: '100%', // Adjust width as needed
                        height: '1.5em', // Set height to accommodate one line
                        overflow: 'hidden', // Hide overflowing text
                        display: '-webkit-box', // Use flexbox for the text container
                        WebkitBoxOrient: 'vertical', // Required for the box layout
                        WebkitLineClamp: 1, // Limit to 1 line
                        textOverflow: 'ellipsis', // Show ellipsis when text overflows
                        lineHeight: '1.5em', // Set line height for proper spacing
                      }}>
                        <Link href={`/profile/${user?.id}`}>
                          {user?.first_name+" "+user?.last_name}
                        </Link>
                      </div>
                      </h2>
                      <h6 className="subtitle theme-gradient">
                      <div className="rbt-card-text" style={{
                        width: '100%', // Adjust width as needed
                        height: '1.5em', // Set height to accommodate one line
                        overflow: 'hidden', // Hide overflowing text
                        display: '-webkit-box', // Use flexbox for the text container
                        WebkitBoxOrient: 'vertical', // Required for the box layout
                        WebkitLineClamp: 1, // Limit to 1 line
                        textOverflow: 'ellipsis', // Show ellipsis when text overflows
                        lineHeight: '1.5em', // Set line height for proper spacing
                      }}>
                        {user?.profession?.title}
                      </div>
                      </h6>
                      <span className="team-form">
                        <i className="feather-map-pin"></i>
                        {/* <span className="location">{item.location}</span> duzetmeli */}
                      </span>
                      <div className="description">
                      <div className="rbt-card-text" style={{
                        width: '100%', // Adjust width as needed
                        margin: '10px auto', // Center the div with margins
                        height: '6em', // Set height to accommodate exactly four lines
                        overflow: 'hidden', // Hide overflowing text
                        display: '-webkit-box', // Use flexbox for the text container
                        WebkitBoxOrient: 'vertical', // Required for the box layout
                        WebkitLineClamp: 4, // Limit to 4 lines
                        textOverflow: 'ellipsis', // Show ellipsis when text overflows
                        lineHeight: '1.5em', // Set line height for proper spacing
                      }}>
                        {user?.biography} 
                      </div>
                      </div>
                      <ul className="social-icon social-default icon-naked mt--20">
                        <li>
                          <Link href="https://www.facebook.com/">
                            <i className="feather-facebook"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="https://www.twitter.com">
                            <i className="feather-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link href="https://www.instagram.com/">
                            <i className="feather-instagram"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
             </div>
            )})}
        </div>
      </div>
    </>
  );
};

export default TeamThree;
