import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from 'moment';
import { fetchJobsByIdApi } from "../../apis/Job";
import Navbar from "../../components/Navbar";

function JobDetails() {
  const { jid } = useParams();
  const [userData, setUserdata] = useState({});
  const [JobData, setJobdata] = useState({});

  const { companyName, companyLogo, jobPosition, monthlySalary, jobDuration, jobType, locationType, jobLocation, jobDescription, aboutCompany, skillsRequired, additionalInfo, updatedAt } = JobData;

  const fetchJobsById = async () => {
    const data = await fetchJobsByIdApi(jid);
    if (data) setJobdata(data);
  };

  useEffect(() => {
    fetchJobsById();
  }, []);

  return (
    <div className="bg-[#FFEEEE]">
      <Navbar setUserdata={setUserdata} />
      <div className="container mx-auto px-3 md:px-12 pb-12">
        <div className="text-center text-xl md:text-3xl font-medium bg-white shadow md:-translate-y-[15px] p-4 md:p-10 mt-5 md:mt-0">
          {jobPosition} {locationType} job/internship at {companyName}
        </div>
        <div className="shadow bg-white p-4 md:p-10 mt-10">
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-2">
            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-3 font-medium text-gray-500">
                <span>{moment(updatedAt).fromNow()}</span>
                <span>{jobType}</span>
                <span className="flex items-center gap-2"><img src={companyLogo} width={40} alt="" /> {companyName}</span>
              </p>
              <p className="text-xl md:text-3xl font-semibold">{jobPosition}</p>
              <p className="text-red-500 font-medium">{jobLocation}</p>
            </div>
            <div>
              {userData.token && (
                <Link to={`/job/update/${jid}`} className="w-[110px] text-white px-6 py-2 bg-[#ED5353] rounded">Edit Job</Link>
              )}
            </div>
          </div>
          <div className="py-5 flex gap-16">
            <p className="flex flex-col">
              <span className="flex gap-1 text-gray-500"><img src="/icons/money.svg" width={20} alt="money icon" />Stipend</span>
              <span>₹{monthlySalary}/month</span>
            </p>
            <p className="flex flex-col">
              <span className="flex gap-1 text-gray-500"><img src="/icons/calender.svg" width={15} alt="calender icon" />Duration</span>
              <span>{jobDuration}</span>
            </p>
          </div>
          <div className="text-lg flex flex-col gap-5">
            <div>
              <p className="font-semibold py-3">About company</p>
              <p className="text-gray-600">{aboutCompany}</p>
            </div>
            <div>
              <p className="font-semibold py-3">About the job/internship</p>
              <p className="text-gray-600 flex flex-col">{jobDescription}</p>
            </div>
            <div>
              <p className="font-semibold py-3">Skill(s) Required</p>
              <p className="flex flex-wrap gap-3">
                {skillsRequired && skillsRequired.map((skill, index) => (
                  <span className="bg-[#FFEEEE] rounded-full px-5 py-1" key={index}>{skill}</span>
                ))}
              </p>
            </div>
            <div>
              <p className="font-semibold py-3">Additional Information</p>
              <p className="text-gray-600">{additionalInfo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
