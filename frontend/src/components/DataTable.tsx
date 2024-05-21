import React, { useState } from "react";
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
  const [valuesToUpdateProduct, setValuesToUpdateProduct] = useState<any>({
    id: 0,
    productLabel: "",
    productDescription: "",
    stock: 0,
    price: 0,
  });

  const [valuesToUpdateUser, setValuesToUpdateUser] = useState<any>({
    id: 0,
    nickName: "",
    strikes: 0,
    statusF: "",
  });

  const [valuesToUpdateReport, setValuesToUpdateReport] = useState<any>({
    id: 0,
    type: "",
    reason: "",
    isHandled: false,
    reportDate: new Date(),
    from: 0,
    to: 0,
    projectId: 0,
  });

  const navigate = useNavigate();

  const handleDeleteReport = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      deleteData(`http://localhost:3001/api/reports/${id}`);
    }
  };
  const handleDeleteUser = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      deleteData(`http://localhost:3001/api/user/${id}`);
    }
  };
  const handleDeleteProduct = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      deleteData(`http://localhost:3001/api/products/${id}`);
    }
  };
  const handleDeleteProject = (
    projectId: number,
    clientId: Number,
    projectTitle: string
  ) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      deleteData(`http://localhost:3001/api/project/${projectId}`);
      send(
        {
          message: `Your project with title : ${projectTitle} has been deleted`,
          userId: clientId,
        },
        "http://localhost:3001/api/notification/"
      );
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    minWidth: 200,
    flex: 1,
    renderCell: (params) => {
      const handleClickProduct = (
        id: number,
        productLabel: string,
        productDescription: string,
        stock: number,
        price: number
      ) => {
        setValuesToUpdateProduct({
          id,
          productLabel,
          productDescription,
          stock,
          price,
        });

        setIsOpen(true);
      };

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

      const handleClickReport = (
        id: number,
        type: string,
        reason: string,
        isHandled: boolean,
        reportDate: Date,
        from: number,
        to: number,
        projectId: number
      ) => {
        setValuesToUpdateReport({
          id,
          type,
          reason,
          isHandled,
          reportDate,
          from,
          to,
          projectId,
        });

        setIsOpen(true);
      };
      return (
        <div className="flex items-center">
          <button
            onClick={() => navigate(`/${slug}/${params.row.id}`)}
            className="btn btn-square btn-ghost"
          >
            {relatedTo == "products" ||
            relatedTo == "orders" ||
            relatedTo == "admins" ||
            relatedTo == "reports" ? (
              ""
            ) : (
              <HiOutlineEye />
            )}
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
                : relatedTo == "report"
                ? handleClickReport(
                    params.row.id,
                    params.row.type,
                    params.row.reason,
                    params.row.isHandled,
                    params.row.reportDate,
                    params.row.from,
                    params.row.to,
                    params.row.projectId
                  )
                : relatedTo == "products"
                ? handleClickProduct(
                    params.row.id,
                    params.row.productLabel,
                    params.row.productDescription,
                    params.row.stock,
                    params.row.price
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
            onClick={() => {
              relatedTo == "project"
                ? handleDeleteProject(
                    params.row.id,
                    params.row.clientId,
                    params.row.name
                  )
                : relatedTo == "report"
                ? handleDeleteReport(params.row.id)
                : relatedTo == "user"
                ? handleDeleteUser(params.row.id)
                : relatedTo == "products"
                ? handleDeleteProduct(params.row.id)
                : "";
            }}
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
          values={
            relatedTo == "project"
              ? valuesToUpdate
              : relatedTo == "report"
              ? valuesToUpdateReport
              : relatedTo == "products"
              ? valuesToUpdateProduct
              : valuesToUpdateUser
          }
          relatedTo={relatedTo}
        />
      )}
    </div>
  );
};

export default DataTable;
