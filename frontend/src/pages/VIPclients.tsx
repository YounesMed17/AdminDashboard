import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../components/DataTable";
import { get } from "../utilFunctions/getData";
//import toast from "react-hot-toast";
import AddData from "../components/AddData";
import { useParams } from "react-router-dom";

const VIPclients = () => {
  const [users, setUsers] = React.useState<any[]>([]);
  const [admin, setAdmin] = useState({ role: "" });

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await get(`http://localhost:3001/api/user/${id}`);

      setAdmin({ role: res.role });
    }

    fetchData();
  }, []);
  const fetchProjects = async () => {
    const res = await get("http://localhost:3001/api/user/allVIPClients");
    const values = await res;

    const formattedUsers = values.map((item) => {
      // Parse createdAt string into Date object
      const createdAtDate = new Date(item.creationDate);

      // Format date to desired format (day-month-year)
      const formattedDate = `${createdAtDate.getDate()}-${
        createdAtDate.getMonth() + 1
      }-${createdAtDate.getFullYear()}`;

      return {
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        email: item.email,
        phone: 20668574,
        createdAt: formattedDate,
        status: item.status,
        verified: false,
        strikes: item.strikesNbr,
        nickName: item.nickname,
      };
    });

    setUsers(formattedUsers);
  };
  useEffect(() => {
    // Fetch projects initially
    fetchProjects();

    // Set interval to fetch projects every 3 seconds
    const intervalId = setInterval(fetchProjects, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "firstName",
      headerName: "Name",
      minWidth: 160,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-3 items-center">
            <div className="avatar">
              <div className="w-6 xl:w-9 rounded-full">
                <img
                  src={params.row.img || "/Portrait_Placeholder.png"}
                  alt="user-picture"
                />
              </div>
            </div>
            <span className="mb-0 pb-0 leading-none">
              {params.row.firstName} {params.row.lastName}
            </span>
          </div>
        );
      },
    },
    {
      field: "nickName",
      type: "string",
      headerName: "NickName",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "email",
      type: "string",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
      cellClassName: "MuiDataGridCell-center", // Apply center alignment
    },
    {
      field: "phone",
      type: "string",
      headerName: "Phone",
      minWidth: 120,
      flex: 1,
      cellClassName: "MuiDataGridCell-center", // Apply center alignment
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 100,
      type: "string",
      flex: 1,
      cellClassName: "MuiDataGridCell-center", // Apply center alignment
    },
    {
      field: "status",
      headerName: "Status",
      width: 80,
      type: "string",
      flex: 1,
    },
    {
      field: "strikes",
      headerName: "Strikes",
      width: 30,
      type: "number",
      flex: 1,
    },
  ];

  return admin.role == "AccountsAdmin" || admin.role == "SuperAdmin" ? (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Users
            </h2>
            {users && users.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {users.length} Users Found
              </span>
            )}
          </div>
          <button onClick={() => setIsOpen(true)} className="btn btn-primary">
            Add New User +
          </button>
        </div>
        <DataTable
          slug="user"
          relatedTo="user"
          columns={columns}
          rows={users}
        />

        {isOpen && (
          <AddData slug={"user"} isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      </div>
    </div>
  ) : (
    <h1
      className="flex justify-center items-center mt-[150px] "
      style={{ color: "red", fontWeight: "bold", fontSize: "55px" }}
    >
      You Are Not Authorized Here !
    </h1>
  );
};

export default VIPclients;
