import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../components/DataTable";
import { get } from "../utilFunctions/getData";
//import toast from "react-hot-toast";

const Reports = () => {
  const [reports, setReports] = useState<any[]>([]);

  const fetchProjects = async () => {
    const res = await get("http://localhost:3001/api/reports/all");
    const values = await res;

    const Reports = values.map((item: any) => {
      // Parse createdAt string into Date object
      const reportDate = new Date(item.reportDate);

      // Format date to desired format (day-month-year)
      const formattedDate = `${reportDate.getDate()}-${
        reportDate.getMonth() + 1
      }-${reportDate.getFullYear()}`;

      return {
        id: item.id,
        type: item.type,
        reason: item.reason,
        isHandled: item.isHandled,
        reportDate: formattedDate,
        from: item.from,
        to: item.to,
        projectId: item.projectId,
      };
    });

    setReports(Reports);
  };

  useEffect(() => {
    // Fetch projects initially
    fetchProjects();

    // Set interval to fetch projects every 3 seconds
    const intervalId = setInterval(fetchProjects, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "type",
      type: "string",
      headerName: "Type",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "reason",
      type: "string",
      headerName: "Reason",
      minWidth: 80,
      flex: 1,
    },
    {
      field: "reportDate",
      type: "string",
      headerName: "ReportDate",
      minWidth: 150,
      flex: 1,
      cellClassName: "MuiDataGridCell-center", // Apply center alignment
    },
    {
      field: "from",
      type: "string",
      headerName: "From (user id)",
      minWidth: 80,
      flex: 1,
      cellClassName: "MuiDataGridCell-center", // Apply center alignment
    },
    {
      field: "to",
      headerName: "To (user id)",
      minWidth: 80,
      type: "string",
      flex: 1,
      cellClassName: "MuiDataGridCell-center", // Apply center alignment
    },
    {
      field: "isHandled",
      headerName: "Is Hundled",
      minWidth: 80,
      type: "boolean",
      flex: 1,
    },
  ];

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Reports
            </h2>
            {reports && reports.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {reports.length} Reports Found
              </span>
            )}
          </div>
        </div>
        <DataTable
          slug="report"
          relatedTo="report"
          columns={columns}
          rows={reports}
        />
      </div>
    </div>
  );
};

export default Reports;
