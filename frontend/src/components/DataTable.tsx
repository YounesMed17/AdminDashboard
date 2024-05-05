import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import {
  HiOutlinePencilSquare,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi2";
import ProjectData from "./ProjectData";
import { deleteData } from "../utilFunctions/deleteData";
import { send } from "../utilFunctions/sendData";

interface DataTableProps {
  slug: string;
  relatedTo: string;
  columns: GridColDef[];
  rows: object[];
}

const DataTable: React.FC<DataTableProps> = ({
  slug,
  relatedTo,
  columns,
  rows,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  /*
  const prevIsOpenRef = React.useRef<boolean>();
  useEffect(() => {
    prevIsOpenRef.current = isOpen;
  }, [isOpen]);

  const prevIsOpen = prevIsOpenRef.current;

  useEffect(() => {
    // Check if isOpen was true and changed to false
    if (prevIsOpen && !isOpen) {
      setTimeout(function () {
        // Code to refresh the page
        window.location.reload();
      }, 200);
    }
  }, [isOpen, prevIsOpen]);*/
  const [valuesToUpdate, setValuesToUpdate] = useState<any>({
    id: 0,
    title: "",
    totalPrice: 0,
    status: "",
    isPublished: false,
    deadline: new Date(),
    freelancerId: 0,
    clientId: 0,
  });
  const [valuesToUpdateUser, setValuesToUpdateUser] = useState<any>({
    id: 0,
    nickName: "",
    strikes: 0,
    statusF: "",
  });
  const navigate = useNavigate();

  const handleDelete = (
    projectId: number,
    clientId: Number,
    projectTitle: string
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete && relatedTo == "project") {
      deleteData(`http://localhost:3001/api/project/${projectId}`);
      send(
        {
          message: `Your project with title : ${projectTitle} has been deleted`,
          userId: clientId,
        },
        "http://localhost:3001/api/notification/"
      );
    } else if (confirmDelete && relatedTo == "user") {
      deleteData(`http://localhost:3001/api/user/${id}`);
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      const handleClickUser = (
        id: number,
        nickName: string,
        strikes: number,
        statusU: string
      ) => {
        setValuesToUpdateUser({
          id,
          nickName,
          strikes,
          statusU,
        });

        setIsOpen(true);
      };
      const handleClick = (
        id: number,
        title: string,
        totalPrice: number,
        status: string,
        isPublished: boolean,
        deadline: Date,
        freelancerId: number,
        clientId: number
      ) => {
        setValuesToUpdate({
          id,
          title,
          totalPrice,
          status,
          isPublished,
          deadline,
          freelancerId,
          clientId,
        });

        setIsOpen(true);
      };
      return (
        <div className="flex items-center">
          <button
            onClick={() => navigate(`/${slug}/${params.row.id}`)}
            className="btn btn-square btn-ghost"
          >
            <HiOutlineEye />
          </button>
          <button
            onClick={() => {
              relatedTo == "project"
                ? handleClick(
                    params.row.id,
                    params.row.name,
                    params.row.totalPrice,
                    params.row.status,
                    params.row.isPublished,
                    params.row.deadline,
                    params.row.freelancerId,
                    params.row.clientId
                  )
                : handleClickUser(
                    params.row.id,
                    params.row.nickName,
                    params.row.strikes,
                    params.row.status
                  );
            }}
            className="btn btn-square btn-ghost"
          >
            <HiOutlinePencilSquare />
          </button>
          <button
            onClick={() =>
              handleDelete(params.row.id, params.row.clientId, params.row.name)
            }
            className="btn btn-square btn-ghost"
          >
            <HiOutlineTrash />
          </button>
        </div>
      );
    },
  };

  return (
    <div className="w-full bg-base-100 text-base-content">
      <DataGrid
        className="dataGrid p-0 xl:p-3 w-full bg-base-100 text-white"
        rows={rows}
        columns={[...columns, actionColumn]}
        getRowHeight={() => "auto"}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
      {isOpen && (
        <ProjectData
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          values={relatedTo == "project" ? valuesToUpdate : valuesToUpdateUser}
          relatedTo={relatedTo}
        />
      )}
    </div>
  );
};

export default DataTable;
