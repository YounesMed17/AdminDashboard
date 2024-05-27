import React, { useEffect, useState } from "react";
import { get } from "../utilFunctions/getData";

interface ProjectData {
  id: string;
  name: string;
  description: string;
  deadline: string;
  status: string;
  createdAt: string;
  totalPrice: number;
}

const Project: React.FC = () => {
  const [project, setProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await get(`http://localhost:3001/api/project/${id}`);
      const item = await res;
      // Parse createdAt string into Date object
      const createdAtDate = new Date(item.creationDate);
      const deadline = new Date(item.deadLine);
      // Format date to desired format (day-month-year)
      const formattedDate1 = `${createdAtDate.getDate()}-${
        createdAtDate.getMonth() + 1
      }-${createdAtDate.getFullYear()}`;
      const formattedDate2 = `${deadline.getDate()}-${
        deadline.getMonth() + 1
      }-${deadline.getFullYear()}`;

      const Project = {
        id: item.id,
        name: item.name,
        description: item.description,
        deadline: formattedDate2,
        status: item.status,
        createdAt: formattedDate1,
        totalPrice: item.totalPrice,
      };

      setProject(Project);
    }

    fetchData();
  }, []);
  console.log(project?.length + "aaaaaaaaaaaa");
  return (
    // screen
    <div id="singleProject" className="w-full p-0 m-0">
      {/* container */}
      <div className="w-full grid xl:grid-cols-2 gap-10 mt-5 xl:mt-0">
        {/* column 1 */}
        <div className="w-full flex flex-col items-start gap-10">
          {/* profile block */}
          <div className="w-full flex flex-col items-start gap-5">
            {/* photo block */}
            <div className="w-full flex items-center gap-3">
              <div className="flex items-center gap-3 xl:gap-8 xl:mb-4">
                <div className="avatar">
                  <div className="w-24 xl:w-36 rounded-full">
                    <img src="/Portrait_Placeholder.png" alt="avatar" />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h3 className="font-semibold text-xl xl:text-3xl dark:text-white">
                    {project?.name}
                  </h3>

                  <span className="font-normal text-base">Member</span>
                </div>
              </div>
            </div>
            {/* detail block */}
            <div className="w-full flex gap-8">
              <div className="w-full grid grid-cols-3 xl:flex gap-5 xl:gap-8">
                {/* column 1 */}
                <div className="col-span-1 flex flex-col items-start gap-3 xl:gap-5">
                  <span>Title</span>
                  <span>description</span>
                  <span>Status</span>
                  <span>Deadline</span>
                </div>
                {/* column 2 */}
                <div className="col-span-2 flex flex-col items-start gap-3 xl:gap-5">
                  <span className="font-semibold">{project?.name}</span>
                  <span className="font-semibold">{project?.description}</span>
                  <span className="font-semibold">{project?.status}</span>
                  <span className="font-semibold">{project?.deadline}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
