import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../utilFunctions/getData";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Box,
  ImageList,
  ImageListItem,
} from "@mui/material";

interface SkillData {
  skills: string;
  domain: string;
}

const User = () => {
  const { id } = useParams();

  const [user, setUser] = useState<any>({});
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [pictures, setPictures] = useState<any[]>([]);
  useEffect(() => {
    // Fetch pictures when the component mounts
    const fetchPictures = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/file/user/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setPictures(data); // Update state with fetched pictures
        } else {
          console.error("Failed to fetch pictures");
        }
      } catch (error) {
        console.error("Error fetching pictures:", error);
      }
    };

    fetchPictures();
  }, []); // Empty dependency array to run effect only once

  useEffect(() => {
    async function fetchData() {
      const res = await get(`http://localhost:3001/api/user/${id}`);
      const item = await res;
      // Parse createdAt string into Date object
      const createdAtDate = new Date(item.creationDate);

      // Format date to desired format (day-month-year)
      const formattedDate = `${createdAtDate.getDate()}-${
        createdAtDate.getMonth() + 1
      }-${createdAtDate.getFullYear()}`;

      const userData = {
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        email: item.email,
        phone: item.phoneNumber || 206685574,
        createdAt: formattedDate,
        status: item.status,
        verified: false, // Assuming this is a boolean value
        strikes: item.strikesNbr,
      };

      setUser(userData);
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchSkills() {
      const res = await get(
        `http://localhost:3001/api/userSkills/alluserskillsdomains/${id}`
      );
      const values = await res;

      const userSkills = values.map((item: any) => ({
        skills: item.skillName,
        domain: item.domaine,
      }));

      setSkills(userSkills);
    }

    fetchSkills();
  }, [id]);

  return (
    <div
      id="singleUser"
      className="w-[65%] flex justify-center gap-[50px] items-center flex-col"
    >
      <div className="">
        <div className="w-full flex flex-col items-start gap-10">
          <div className="w-full flex flex-col items-start gap-5">
            <div className="w-full flex items-center gap-3">
              <div className="flex items-center gap-3 xl:gap-8 xl:mb-4">
                <div className="avatar">
                  <div className="w-24 xl:w-36 rounded-full">
                    <img src="/Portrait_Placeholder.png" alt="avatar" />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <h3 className="font-semibold text-xl xl:text-3xl dark:text-white">
                    {user.firstName} {user.lastName}
                  </h3>
                  <span className="font-normal text-base">Member</span>
                </div>
              </div>
            </div>
            <div className="w-full flex gap-8">
              <div className="w-full grid grid-cols-3 xl:flex gap-5 xl:gap-8">
                <div className="col-span-1 flex flex-col items-start gap-3 xl:gap-5">
                  <span>First Name</span>
                  <span>Last Name</span>
                  <span>Email</span>
                  <span>Phone</span>
                  <span>Status</span>
                </div>
                <div className="col-span-2 flex flex-col items-start gap-3 xl:gap-5">
                  <span className="font-semibold">{user.firstName}</span>
                  <span className="font-semibold">{user.lastName}</span>
                  <span className="font-semibold">{user.email}</span>
                  <span className="font-semibold">{user.phone}</span>
                  <span className="font-semibold">
                    {user.verified ? "Verified" : "Not Verified"}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full mt-[50px]">
              <Table>
                <TableHead>
                  <TableRow className="bg-[#dcdcdc]">
                    <TableCell>Skills</TableCell>
                    <TableCell>Domain</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {skills.map((skill, index) => (
                    <TableRow
                      key={index}
                      className={index % 2 === 0 ? "bg-[#fff]" : "bg-[#f7f7f7]"}
                    >
                      <TableCell>{skill.skills}</TableCell>
                      <TableCell>{skill.domain}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <Box
              sx={{
                width: "100%",
              }}
            >
              <ImageList variant="masonry" cols={3} gap={8}>
                {pictures.map((item, index) => (
                  <ImageListItem key={index}>
                    <img
                      srcSet={`http://localhost:3001/uploads/${item.link}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`http://localhost:3001/uploads/${item.link}?w=248&fit=crop&auto=format`}
                      alt="portfolio img"
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
