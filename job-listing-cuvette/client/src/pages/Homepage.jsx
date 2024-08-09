import React, { useEffect, useState } from "react";
import { fetchAllJobsApi } from "../apis/Job";

import Navbar from "../components/Navbar";
import JobFilter from "../components/job/JobFilter";
import JobCard from "../components/job/JobCard";

function Homepage() {
  const [userData, setUserdata] = useState({});
  const [JobData, setJobdata] = useState({});
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState([]);

  const fetchAllJobs = async () => {
    const data = await fetchAllJobsApi({ title, skills });
    if (data) setJobdata(data);
  };

  useEffect(() => {
    fetchAllJobs();
  }, [title, skills]);

  return (
    <>
      <Navbar setUserdata={setUserdata} />
      <div className="container mx-auto p-4 md:px-12">
        <JobFilter setTitle={setTitle} setSkills={setSkills} />
        <div className="flex flex-col gap-5 my-[70px]">
          <JobCard JobData={JobData} userData={userData} />
        </div>
      </div>
    </>
  );
}

export default Homepage;
