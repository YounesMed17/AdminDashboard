// import React from 'react';
import { useEffect, useState } from "react";
import TopDealsBox from "../components/topDealsBox/TopDealsBox";

import { MdGroup, MdAssessment } from "react-icons/md";
import { get } from "../utilFunctions/getData";

const Home = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [freelancersCount, setFreelancersCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [VIPClientsCount, setVIPClientsCount] = useState(0);
  const [doneProjects, setDoneProjects] = useState(0);
  const [inProgressProjects, setInProgressProjects] = useState(0);
  const [onHoldProjects, setOnHoldProjects] = useState(0);
  const [totalRevenu, setTotalRevenu] = useState(0);
  const [allProjectsCount, setAllProjectsCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await get(
        "http://localhost:3001/api/project/getallProjectsCount"
      );
      setAllProjectsCount(res.projectCount);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await get(
        "http://localhost:3001/api/project/getDoneProjectsCount"
      );
      setDoneProjects(res.projectCount);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await get(
        "http://localhost:3001/api/project/getTotalPriceProjectsSum"
      );
      setTotalRevenu(res.totalPriceSum);
    }

    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const res = await get(
        "http://localhost:3001/api/project/getnotAssignedProjectsCount"
      );
      setOnHoldProjects(res.projectCount);
    }

    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const res = await get(
        "http://localhost:3001/api/project/getinProgressProjectsCount"
      );
      setInProgressProjects(res.projectCount);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await get("http://localhost:3001/api/user/getUsersCount");
      setUsersCount(res.usersCount);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await get(
        "http://localhost:3001/api/user/getfreelancersCount"
      );
      setFreelancersCount(res.freelancerCount);
    }

    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const res = await get("http://localhost:3001/api/user/getClientsCount");
      setClientsCount(res.clientCount);
    }

    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      const res = await get(
        "http://localhost:3001/api/user/getVIPClientsCount"
      );
      setVIPClientsCount(res.VIPClientCount);
    }

    fetchData();
  }, []);

  return (
    // screen
    <div className="home w-full p-0 m-0">
      {/* grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 grid-flow-dense auto-rows-[minmax(200px,200px)] xl:auto-rows-[minmax(150px,200px)] gap-3 xl:gap-3 px-0">
        <div
          className=" bg-slate-200 box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2 flex flex-col justify-center items-center"
          style={{ height: "150px", fontSize: "1.5rem" }}
        >
          <div className="flex justify-start items-start">
            <MdAssessment style={{ fontSize: "2rem" }} />
            <p style={{ fontSize: "1.5rem", marginLeft: "10px" }}>
              All projects Revenu:
            </p>
          </div>
          <p style={{ fontSize: "2rem" }}>{totalRevenu} DT</p>
        </div>

        <div
          className="bg-red-300		 box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2 flex flex-col justify-center items-center"
          style={{ height: "150px", fontSize: "1.5rem" }}
        >
          <div className="flex justify-start items-start">
            <MdAssessment style={{ fontSize: "2rem" }} />
            <p style={{ fontSize: "1.5rem", marginLeft: "10px" }}>
              All projects number:
            </p>
          </div>
          <p style={{ fontSize: "2rem" }}>{allProjectsCount}</p>
        </div>

        <div
          className="bg-orange-300 box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2 flex flex-col justify-center items-center"
          style={{ height: "150px", fontSize: "1.5rem" }}
        >
          <div className="flex justify-start items-start">
            <MdAssessment style={{ fontSize: "2rem" }} />
            <p style={{ fontSize: "1.5rem", marginLeft: "10px" }}>
              All done projects number:
            </p>
          </div>
          <p style={{ fontSize: "2rem" }}>{doneProjects}</p>
        </div>

        <div
          className="bg-red-200	 box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2 flex flex-col justify-center items-center"
          style={{ height: "150px", fontSize: "1.5rem" }}
        >
          <div className="flex justify-start items-start">
            <MdAssessment style={{ fontSize: "2rem" }} />
            <p style={{ fontSize: "1.5rem", marginLeft: "10px" }}>
              All in progress projects number:
            </p>
          </div>
          <p style={{ fontSize: "2rem" }}>{inProgressProjects}</p>
        </div>

        <div
          className=" bg-red-200 box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2 flex flex-col justify-center items-center"
          style={{ height: "150px", fontSize: "1.5rem" }}
        >
          <div className="flex justify-start items-start">
            <MdAssessment style={{ fontSize: "2rem" }} />
            <p style={{ fontSize: "1.5rem", marginLeft: "10px" }}>
              All not assigned projects number:
            </p>
          </div>
          <p style={{ fontSize: "2rem" }}>{onHoldProjects}</p>
        </div>

        <div
          className=" bg-purple-300  box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2 flex flex-col justify-center items-center"
          style={{ height: "150px", fontSize: "1.5rem" }}
        >
          <div className="flex justify-start items-start">
            <MdGroup style={{ fontSize: "2rem" }} />
            <p style={{ fontSize: "1.5rem", marginLeft: "10px" }}>
              All users number:
            </p>
          </div>
          <p style={{ fontSize: "2rem" }}>{usersCount}</p>
        </div>

        <div
          className=" bg-gray-200 box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2 flex flex-col justify-center items-center"
          style={{ height: "150px", fontSize: "1.5rem" }}
        >
          <div className="flex justify-start items-start">
            <MdGroup style={{ fontSize: "2rem" }} />
            <p style={{ fontSize: "1.5rem", marginLeft: "10px" }}>
              All VIP clients number:
            </p>
          </div>
          <p style={{ fontSize: "2rem" }}>{VIPClientsCount || 0}</p>
        </div>

        <div
          className=" bg-blue-100 box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2 flex flex-col justify-center items-center"
          style={{ height: "150px", fontSize: "1.5rem" }}
        >
          <div className="flex justify-start items-start">
            <MdGroup style={{ fontSize: "2rem" }} />
            <p style={{ fontSize: "1.5rem", marginLeft: "10px" }}>
              All freelancers number :
            </p>
          </div>
          <p style={{ fontSize: "2rem" }}>{freelancersCount}</p>
        </div>

        <div
          className=" bg-blue-100 box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2 flex flex-col justify-center items-center"
          style={{ height: "150px", fontSize: "1.5rem" }}
        >
          <div className="flex justify-start items-start">
            <MdGroup style={{ fontSize: "2rem" }} />
            <p style={{ fontSize: "1.5rem", marginLeft: "10px" }}>
              All clients number:
            </p>
          </div>
          <p style={{ fontSize: "2rem" }}>{clientsCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
