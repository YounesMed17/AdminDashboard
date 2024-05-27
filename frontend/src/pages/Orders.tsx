import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../components/DataTable";
import { get } from "../utilFunctions/getData";

const Orders = () => {
  const [users, setUsers] = useState<any[]>([]);

  const fetchOrders = async () => {
    const res = await get("http://localhost:3001/api/orders/all");

    const formattedUsers = res.map((item: any) => {
      // Parse createdAt string into Date object

      return {
        id: item.id,
        name: item.name,
        email: item.email,
        adress: item.adress,
        city: item.city,
        phone: item.phoneNumber,
        status: item.status,
        userId: item.userId,
        productId: item.productId,
      };
    });

    setUsers(formattedUsers);
  };

  useEffect(() => {
    // Fetch projects initially
    fetchOrders();

    // Set interval to fetch projects every 3 seconds
    const intervalId = setInterval(fetchOrders, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },

    {
      field: "productId",
      type: "string",
      headerName: "Product id",
      minWidth: 30,
      flex: 1,
    },
    {
      field: "name",
      type: "string",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
      cellClassName: "MuiDataGridCell-center", // Apply center alignment
    },
    {
      field: "adress",
      type: "string",
      headerName: "Adress",
      minWidth: 250,
      flex: 1,
      cellClassName: "MuiDataGridCell-center", // Apply center alignment
    },
    {
      field: "city",
      type: "string",
      headerName: "City",
      minWidth: 80,
      flex: 1,
      cellClassName: "MuiDataGridCell-center", // Apply center alignment
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 100,
      type: "string",
      flex: 1,
      cellClassName: "MuiDataGridCell-center", // Apply center alignment
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 60,
      flex: 1,
      renderCell: (params) => {
        if (params.row.status == "pending") {
          return (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-warning"></div>
              <div className="text-sm font-medium text-warning">
                {params.row.status}
              </div>
            </div>
          );
        } else if (params.row.status == "Dispatch") {
          return (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-info"></div>
              <div className="text-sm font-medium text-info">
                {params.row.status}
              </div>
            </div>
          );
        } else if (params.row.status == "cancelled") {
          return (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-error"></div>
              <div className="text-sm font-medium text-error">
                {params.row.status}
              </div>
            </div>
          );
        } else if (params.row.status == "completed") {
          return (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <div className="text-sm font-medium text-success">
                {params.row.status}
              </div>
            </div>
          );
        } else {
          return (
            <div className="flex items-center gap-2">
              <div className="badge bg-neutral-content badge-xs"></div>
              <span className="text-sm font-semibold text-neutral-content">
                Unknown
              </span>
            </div>
          );
        }
      },
    },
    {
      field: "userId",
      headerName: "UserId",
      width: 30,
      type: "number",
      flex: 1,
    },
  ];
  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Orders
            </h2>
            {users && users.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {users.length} Users Found
              </span>
            )}
          </div>
        </div>
        <DataTable
          slug="oreders"
          relatedTo="orders"
          columns={columns}
          rows={users}
        />
      </div>
    </div>
  );
};

export default Orders;
