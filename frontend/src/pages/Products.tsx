import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../components/DataTable";
import { get } from "../utilFunctions/getData";
import { useParams } from "react-router-dom";
import AddData from "../components/AddData";

const Products = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [admin, setAdmin] = useState({ role: "" });

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const res = await get(`http://localhost:3001/api/user/${id}`);

      setAdmin({ role: res.role });
    }

    fetchData();
  }, []);

  const fetchOrders = async () => {
    const res = await get("http://localhost:3001/api/products/all");

    const formattedUsers = res.map((item) => {
      // Parse createdAt string into Date object

      return {
        id: item.id,
        productLabel: item.productLabel,
        productDescription: item.productDescription,
        price: item.price,
        stock: item.stock,
        link: item.link,
      };
    });

    setUsers(formattedUsers);
  };
  const [isOpen, setIsOpen] = useState(false);

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
      field: "productLabel",
      type: "string",
      headerName: "Product",
      minWidth: 300,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-3 items-center">
            <div className="avatar">
              <div className="w-6 xl:w-[75px] rounded-full">
                <img
                  src={`http://localhost:3001/uploads/${params.row.link} `}
                  alt="user-picture"
                />
              </div>
            </div>
            <span className="mb-0 pb-0 leading-none">
              {params.row.productLabel}
            </span>
          </div>
        );
      },
    },
    {
      field: "productDescription",
      type: "string",
      headerName: "Description",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "price",
      type: "string",
      headerName: "Price",
      minWidth: 60,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 60,
      type: "number",
      flex: 1,
    },
  ];
  return admin.role == "ProductsAdmin" || admin.role == "SuperAdmin" ? (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Products
            </h2>
            {users && users.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {users.length} Users Found
              </span>
            )}
          </div>
          <button onClick={() => setIsOpen(true)} className="btn btn-primary">
            Add New Product +
          </button>
        </div>
        <DataTable
          slug="products"
          relatedTo="products"
          columns={columns}
          rows={users}
        />
        {isOpen && (
          <AddData slug={"products"} isOpen={isOpen} setIsOpen={setIsOpen} />
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

export default Products;
