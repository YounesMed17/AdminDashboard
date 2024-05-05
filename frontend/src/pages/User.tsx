import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "../utilFunctions/getData";

const User = () => {
  const { id } = useParams();

  const [user, setUser] = React.useState<any[]>([]);

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

      const User = {
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        email: item.email,
        phone: 20668574,
        createdAt: formattedDate,
        status: item.status,
        verified: false,
        strikes: item.strikesNbr,
      };

      setUser(User);
    }

    fetchData();
  }, []);

  return (
    // screen
    <div id="singleUser" className="w-full p-0 m-0">
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
                    {user.firstName} {user.lastName}
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
                  <span>First Name</span>
                  <span>Last Name</span>
                  <span>Email</span>
                  <span>Phone</span>
                  <span>Status</span>
                </div>
                {/* column 2 */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
