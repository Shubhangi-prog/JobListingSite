import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { skills } from '../../utils/skills';
import { fetchJobsByIdApi, updateJobApi } from "../../apis/Job";
import useAuth from '../../hooks/useAuth';

function JobUpdate() {
    const token = useAuth();
    const { jid } = useParams();
    const navigate = useNavigate();

    const validJobTypes = ["Full-Time", "Part-Time", "Internship"];
    const validLocationTypes = ["On-Site", "Remote", "Hybrid"];

    const [input, setInput] = useState({
        companyName: '', companyLogo: '', jobPosition: '', jobDuration: '', monthlySalary: '', jobType: '', locationType: '', jobLocation: '', jobDescription: '', aboutCompany: '', skillsRequired: [], additionalInfo: ''
    });

    const [error, setError] = useState({
        companyName: '', companyLogo: '', jobPosition: '', jobDuration: '', monthlySalary: '', jobType: '', locationType: '', jobLocation: '', jobDescription: '', aboutCompany: '', skillsRequired: '', additionalInfo: ''
    });

    const [skillInput, setSkillInput] = useState('');
    const [searchedSkills, setSearchedSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const searchSkill = (e) => {
        const value = e.target.value;
        setSkillInput(value);
        setSearchedSkills(skills.filter(skill => skill.toLowerCase().includes(value.toLowerCase())));
    };

    const selectSkill = (skill) => {
        if (!selectedSkills.includes(skill))
            setSelectedSkills((prevSkills) => [...prevSkills, skill]);
        setSkillInput('');
    };

    const removeSelectedSkill = (item) => {
        setSelectedSkills((prevSkills) => prevSkills.filter((skill) => skill !== item));
    };

    const getInputValue = (e) => {
        const { id, value } = e.target;
        setInput((prevInput) => ({ ...prevInput, [id]: value }));
    };

    const isValidSalary = (value) => {
        const salary = Number(value);
        return !isNaN(salary) && salary > 0;
    };

    const isValidSkills = (value) => {
        return Array.isArray(value) && value.every(skill => typeof skill === 'string');
    };

    const isValidImage = (value) => {
        const logoRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|webp))$/i;
        return logoRegex.test(value);
    };

    const updateJob = async () => {
        const data = await updateJobApi(jid, input, token);
        if (data) navigate(`/job/details/${jid}`);
    };

    const validateForm = (e) => {
        e.preventDefault();

        let isValid = true;
        let newError = {};

        for (let key in input) {
            const value = input[key];

            if (typeof value === 'string' && value.trim().length === 0) {
                newError[key] = 'This field is required';
                isValid = false;
            } else if (key === 'companyLogo' && !isValidImage(value)) {
                newError[key] = 'Logo must be a valid URL ending in png, jpg, jpeg, svg or webp';
                isValid = false;
            } else if (key === 'monthlySalary' && !isValidSalary(value)) {
                newError[key] = 'Monthly salary must be a number and greater than 0';
                isValid = false;
            } else if (key === 'jobType' && !validJobTypes.includes(value)) {
                newError[key] = `Job type must be one of ${validJobTypes.join(', ')}`;
                isValid = false;
            } else if (key === 'locationType' && !validLocationTypes.includes(value)) {
                newError[key] = `Location type must be one of ${validLocationTypes.join(', ')}`;
                isValid = false;
            } else if (key === 'skillsRequired' && selectedSkills.length === 0 || !isValidSkills(selectedSkills)) {
                newError[key] = 'Select at least one skill';
                isValid = false;
            } else {
                newError[key] = '';
            }
        }

        setError(newError);

        if (isValid) updateJob();
    };

    useEffect(() => {
        setInput((prevInput) => ({ ...prevInput, skillsRequired: selectedSkills }));
    }, [selectedSkills])

    useEffect(() => {
        const fetchJobsById = async () => {
            const data = await fetchJobsByIdApi(jid);
            if (data) {
                setInput(data);
                setSelectedSkills(data.skillsRequired);
            }
        };

        fetchJobsById();
    }, []);

    return (
        <div className="flex flex-col">
            <Link to={`/job/details/${jid}`} className="absolute top-5 left-5 bg-gray-50 hover:bg-gray-200 p-2 px-2.5 rounded-lg">
                <img src="/icons/arrow-left.svg" width={15} alt="Go back" />
            </Link>
            <div className="flex flex-row h-full">
                <div className="w-full md:w-3/6 p-5 pt-16 md:px-20 md:pt-20">
                    <h2 className="font-semibold text-3xl md:text-4xl mb-8">Update job description</h2>
                    <form className="space-y-4" onSubmit={validateForm} autoComplete="off">
                        <div className="md:flex md:items-center">
                            <label className="block font-medium md:w-2/5 mb-1 md:mb-0 pr-4" htmlFor="companyName">Company Name</label>
                            <div className="w-full">
                                <input className="w-full border border-gray-200 rounded py-2 px-4" id="companyName" type="text" value={input.companyName} onChange={getInputValue} placeholder="Enter your company name here" />
                                <label className="text-sm text-red-500 font-medium" htmlFor="companyName">{error.companyName}</label>
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <label className="block font-medium md:w-2/5 mb-1 md:mb-0 pr-4" htmlFor="companyLogo">Add logo URL</label>
                            <div className="w-full">
                                <input className="w-full border border-gray-200 rounded py-2 px-4" id="companyLogo" type="text" value={input.companyLogo} onChange={getInputValue} placeholder="Enter the link" />
                                <label className="text-sm text-red-500 font-medium" htmlFor="companyLogo">{error.companyLogo}</label>
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <label className="block font-medium md:w-2/5 mb-1 md:mb-0 pr-4" htmlFor="jobPosition">Job Position</label>
                            <div className="w-full">
                                <input className="w-full border border-gray-200 rounded py-2 px-4" id="jobPosition" type="text" value={input.jobPosition} onChange={getInputValue} placeholder="Enter job position" />
                                <label className="text-sm text-red-500 font-medium" htmlFor="jobPosition">{error.jobPosition}</label>
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <label className="block font-medium md:w-2/5 mb-1 md:mb-0 pr-4" htmlFor="jobDuration">Job Duration</label>
                            <div className="w-full">
                                <input className="w-full border border-gray-200 rounded py-2 px-4" id="jobDuration" type="text" value={input.jobDuration} onChange={getInputValue} placeholder="Enter job position" />
                                <label className="text-sm text-red-500 font-medium" htmlFor="jobDuration">{error.jobDuration}</label>
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <label className="block font-medium md:w-2/5 mb-1 md:mb-0 pr-4" htmlFor="monthlySalary">Monthly Salary</label>
                            <div className="w-full">
                                <input className="w-full border border-gray-200 rounded py-2 px-4" id="monthlySalary" type="text" value={input.monthlySalary} onChange={getInputValue} placeholder="Enter Amount in rupees" />
                                <label className="text-sm text-red-500 font-medium" htmlFor="monthlySalary">{error.monthlySalary}</label>
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <label className="block font-medium md:w-2/5 mb-1 md:mb-0 pr-4" htmlFor="jobType">Job Type</label>
                            <div className="w-full">
                                <select className="w-full border border-gray-200 rounded py-2 px-4" id="jobType" value={input.jobType} onChange={getInputValue}>
                                    <option value="" disabled hidden>Select</option>
                                    {validJobTypes.map((job, index) => (
                                        <option key={index} value={job}>{job}</option>
                                    ))}
                                </select>
                                <label className="text-sm text-red-500 font-medium" htmlFor="jobType">{error.jobType}</label>
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <label className="block font-medium md:w-2/5 mb-1 md:mb-0 pr-4" htmlFor="locationType">Remote/Office</label>
                            <div className="w-full">
                                <select className="w-full border border-gray-200 rounded py-2 px-4" id="locationType" value={input.locationType} onChange={getInputValue}>
                                    <option value="" disabled hidden>Select</option>
                                    {validLocationTypes.map((loc, index) => (
                                        <option key={index} value={loc}>{loc}</option>
                                    ))}
                                </select>
                                <label className="text-sm text-red-500 font-medium" htmlFor="locationType">{error.locationType}</label>
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <label className="block font-medium md:w-2/5 mb-1 md:mb-0 pr-4" htmlFor="jobLocation">Location</label>
                            <div className="w-full">
                                <input className="w-full border border-gray-200 rounded py-2 px-4" id="jobLocation" type="text" value={input.jobLocation} onChange={getInputValue} placeholder="Enter Location" />
                                <label className="text-sm text-red-500 font-medium" htmlFor="jobLocation">{error.jobLocation}</label>
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <label className="block font-medium md:w-2/5 mb-1 md:mb-0 pr-4" htmlFor="jobDescription">Job Description</label>
                            <div className="w-full">
                                <textarea className="w-full border border-gray-200 rounded py-2 px-4" id="jobDescription" value={input.jobDescription} onChange={getInputValue} placeholder="Type the job description" />
                                <label className="text-sm text-red-500 font-medium" htmlFor="jobDescription">{error.jobDescription}</label>
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <label className="block font-medium md:w-2/5 mb-1 md:mb-0 pr-4" htmlFor="aboutCompany">About Company</label>
                            <div className="w-full">
                                <textarea className="w-full border border-gray-200 rounded py-2 px-4" id="aboutCompany" value={input.aboutCompany} onChange={getInputValue} placeholder="Type about your company" />
                                <label className="text-sm text-red-500 font-medium" htmlFor="aboutCompany">{error.aboutCompany}</label>
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <label className="block font-medium md:w-2/5 mb-1 md:mb-0 pr-4" htmlFor="skillsRequired">Skills Required</label>
                            <div className="w-full relative">
                                <input className="w-full border border-gray-200 rounded py-2 px-4" id="skillsRequired" type="text" value={skillInput} onChange={searchSkill} placeholder="Enter the must have skills" />
                                <label className="text-sm text-red-500 font-medium" htmlFor="skillsRequired">{error.skillsRequired}</label>
                                {skillInput.trim().length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
                                        {searchedSkills.length > 0 ? (
                                            searchedSkills.map((skill, index) => (
                                                <button key={index} onClick={() => selectSkill(skill)} className="w-full text-left px-4 py-2 hover:bg-gray-100">{skill}</button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-2 text-gray-500">No skills found</div>
                                        )}
                                    </div>
                                )}
                                {selectedSkills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {selectedSkills.map((skill, index) => (
                                            <div key={index} className="flex items-center gap-2 bg-red-100 filter-item">
                                                <span className="ps-2">{skill}</span>
                                                <button type="button" className="flex justify-center items-center bg-red-500 h-[35px] w-[35px]" onClick={() => removeSelectedSkill(skill)}>
                                                    <img src="/icons/x-mark.svg" width={15} alt="" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <label className="block font-medium md:w-2/5 mb-1 md:mb-0 pr-4" htmlFor="additionalInfo">Information</label>
                            <div className="w-full">
                                <textarea className="w-full border border-gray-200 rounded py-2 px-4" id="additionalInfo" value={input.additionalInfo} onChange={getInputValue} placeholder="Enter the additional information" />
                                <label className="text-sm text-red-500 font-medium" htmlFor="additionalInfo">{error.additionalInfo}</label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Link to={`/job/details/${jid}`} className="text-[#C2C2C2] border border-gray-300 font-medium rounded text-center px-10 py-2">Cancel</Link>
                            <button type="submit" className="text-white bg-[#ED5353] font-medium rounded text-center px-10 py-2">Update Job</button>
                        </div>
                    </form>
                </div>
                <div className="fixed top-0 right-0 w-3/6 hidden md:block">
                    <img className="w-full h-screen object-cover" src="/images/job-hero.webp" alt="" />
                    <h1 className="absolute mx-32 text-4xl text-white text-center font-semibold inline-block top-20">
                        Recruiter add job details here
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default JobUpdate;