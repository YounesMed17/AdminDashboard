import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { modifyData } from "../utilFunctions/modifyData";
import { send } from "../utilFunctions/sendData";
import { Button } from "@mui/material";

interface AddDataProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  values;
  relatedTo: string;
}

const ProjectData: FC<AddDataProps> = ({
  isOpen,
  setIsOpen,
  values,
  relatedTo,
}) => {
  console.log("dad dz  ddd" + relatedTo);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(values.title);
  const [totalPrice, setTotalPrice] = useState(values.totalPrice);
  const [isPublished, setIsPublished] = useState(values.isPublished);
  const [deadline, setDeadline] = useState(values.deadline);
  const [formProductIsEmpty, setFormProductIsEmpty] = useState(false);
  const [status, setStatus] = useState(values.status);
  const [statusU, setStatusU] = useState(values.statusU);
  const [nickName, setNickName] = useState(values.nickName);
  const [strike, setStrike] = useState(values.strikes);
  const [isHandled, setIsHandled] = useState(values.isHandled);
  const [sendStrike, setSendStrike] = useState(false);
  const [productLabel, setProductLabel] = useState(values.productLabel);
  const [productDescription, setProductDescription] = useState(
    values.productDescription
  );
  const [price, setPrice] = useState(values.price);
  const [stock, setStock] = useState(values.stock);

  console.log(values);
  //console.log(values);
  useEffect(() => {
    if (
      values.deadline &&
      typeof values.deadline === "string" &&
      relatedTo == "project"
    ) {
      const parts = values.deadline.split("-");
      if (parts.length === 3) {
        const formattedDeadline = `${parts[2]}-${parts[1].padStart(
          2,
          "0"
        )}-${parts[0].padStart(2, "0")}`;
        setDeadline(formattedDeadline);
      }
    }
  }, [values.deadline]);
  console.log("dzadaz" + values.strikes, strike, values.statusU, statusU);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(false);
    setIsOpen(false);
  };

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);
  async function updateProject() {
    if (relatedTo == "report") {
      await modifyData(
        {
          type: values.type,
          reason: values.reason,
          isHandled: true,
          reportDate: values.reportDate,
          from: values.from,
          to: values.to,
          projectId: values.projectId,
        },
        `http://localhost:3001/api/reports/${values.id}`
      );
      if (sendStrike) {
        await modifyData(
          {},
          `http://localhost:3001/api/user/strike/${values.to}`
        );
      }
    }

    if (relatedTo == "project") {
      await modifyData(
        { name: title, totalPrice, status, isPublished, deadLine: deadline },
        `http://localhost:3001/api/report/${values.id}`
      );

      if (values.totalPrice != totalPrice) {
        await send(
          {
            message: `Your project total price has been changed by an admin from ${values.totalPrice} to ${totalPrice} `,
            userId: values.clientId,
          },
          "http://localhost:3001/api/notification/"
        );
      }

      if (values.title != title) {
        await send(
          {
            message: `Your project title has been changed by an admin from ${values.title} to ${title}`,
            userId: values.clientId,
          },
          "http://localhost:3001/api/notification/"
        );
      }

      if (values.status != status) {
        const id1 = await send(
          {
            message: `Your project status has been changed by an admin from ${values.status} to ${status}`,
            userId: values.clientId,
          },
          "http://localhost:3001/api/notification/"
        );
      }
    } else if (relatedTo == "products") {
      await modifyData(
        {
          productLabel,
          productDescription,
          stock,
          price,
        },
        `http://localhost:3001/api/products/${values.id}`
      );
    } else if (relatedTo == "user") {
      await modifyData(
        {
          nickname: nickName,
          status: strike == 3 ? "suspended" : statusU,
          strikesNbr: strike,
        },
        `http://localhost:3001/api/user/${values.id}`
      );
    }
    if (values.nickName != nickName) {
      await send(
        {
          message: `Your nickName has been changed from ${values.nickName} to ${nickName}`,
          userId: values.id,
        },
        "http://localhost:3001/api/notification/"
      );
      console.log("nickname");
    }

    if (values.statusU != statusU) {
      await send(
        {
          message: `Your status has been changed from ${values.statusU} to ${statusU}`,
          userId: values.id,
        },
        "http://localhost:3001/api/notification/"
      );
      console.log("status");
    }
    if (values.strikes != strike) {
      send(
        {
          message: `Your strikes number has been changed from ${values.strikes} to ${strike} \n PS: You will be suspended after 3 strikes`,
          userId: values.id,
        },
        "http://localhost:3001/api/notification/"
      );
    }
    if (strike == 3) {
      send(
        {
          message: `You have been suspended as consequences of getting 3 strikes`,
          userId: values.id,
        },
        "http://localhost:3001/api/notification/"
      );
    }
  }
  function sendStrikes() {
    setSendStrike(!sendStrike);
  }

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
      <div
        className={`w-[80%] xl:w-[50%] rounded-lg p-7   bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${
          showModal ? "translate-y-0" : "translate-y-full"
        }
            ${showModal ? "opacity-100" : "opacity-0"}`}
      >
        <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
          <button
            onClick={() => {
              setShowModal(false);
              setIsOpen(false);
            }}
            className="absolute top-5 right-3 btn btn-ghost btn-circle"
          >
            <HiOutlineXMark className="text-xl font-bold" />
          </button>
          <span className="text-2xl font-bold">
            {relatedTo == "user"
              ? "Update user data"
              : relatedTo == "project"
              ? "Update project data"
              : relatedTo == "report"
              ? "Update report data"
              : ""}
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <label
            className={
              relatedTo == "report" ? "form-control w-full " : "hidden"
            }
          >
            <div className="label">
              <span className="label-text">Did you handle the report</span>
            </div>
            <select
              className="select select-bordered"
              value={isHandled}
              onChange={(element) => setIsHandled(element.target.value)}
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </label>
          <label
            className={
              relatedTo == "report" ? "form-control w-[80%] mt-[11%]" : "hidden"
            }
          >
            <Button onClick={sendStrikes} variant="outlined">
              {!sendStrike ? "Add strike to the user" : "Cancel strike"}
            </Button>
          </label>
          <label
            className={
              relatedTo == "project" ? "form-control w-full" : "hidden"
            }
          >
            <div className="label">
              <span className="label-text">Change Title</span>
            </div>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
              name="title"
              id="title"
              value={title}
              onChange={(element) => setTitle(element.target.value)}
            />
          </label>
          <label
            className={
              relatedTo == "project" ? "form-control w-full" : "hidden"
            }
          >
            <div className="label">
              <span className="label-text">Change Total price</span>
            </div>
            <input
              type="text"
              placeholder="Total price"
              className="input input-bordered w-full"
              value={totalPrice}
              onChange={(element) => setTotalPrice(element.target.value)}
            />
          </label>
          <label
            className={
              relatedTo == "project" ? "form-control w-full" : "hidden"
            }
          >
            <div className="label">
              <span className="label-text">Change deadline</span>
            </div>
            <input
              type="date"
              className="input input-bordered w-full"
              value={deadline}
              onChange={(element) => setDeadline(element.target.value)}
            />
          </label>

          <label
            className={
              relatedTo == "project" ? "form-control w-full" : "hidden"
            }
          >
            <div className="label">
              <span className="label-text">Publish project</span>
            </div>
            <select
              className="select select-bordered"
              value={isPublished == true ? 1 : 0}
              onChange={(element) => setIsPublished(element.target.value)}
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </label>

          <label
            className={
              relatedTo == "project" ? "form-control w-full" : "hidden"
            }
          >
            <div className="label">
              <span className="label-text">Change status</span>
            </div>
            <select
              className="select select-bordered"
              value={status}
              onChange={(element) => setStatus(element.target.value)}
            >
              <option value="inProgress">In progress</option>
              <option value="done">Done</option>
              <option value="onHold">On Hold</option>
            </select>
          </label>
          <label
            className={relatedTo == "user" ? "form-control w-full" : "hidden"}
          >
            <div className="label">
              <span className="label-text">Change nickName</span>
            </div>
            <input
              type="text"
              placeholder="nickname"
              className="input input-bordered w-full"
              name="nickname"
              id="nickname"
              value={nickName}
              onChange={(element) => setNickName(element.target.value)}
            />
          </label>

          <label
            className={relatedTo == "user" ? "form-control w-full" : "hidden"}
          >
            <div className="label">
              <span className="label-text">Update Strikes number</span>
            </div>
            <input
              type="number"
              min="0"
              max="3"
              className="input input-bordered w-full"
              name="strike"
              id="strike"
              value={strike}
              onChange={(element) => setStrike(element.target.value)}
            />
          </label>

          <label
            className={relatedTo == "user" ? "form-control w-full" : "hidden"}
          >
            <div className="label">
              <span className="label-text">Change status</span>
            </div>
            <select
              className="select select-bordered"
              value={statusU}
              onChange={(element) => setStatusU(element.target.value)}
            >
              <option value="nonVerified">Not Verified</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </label>

          <label
            className={
              relatedTo == "products" ? "form-control w-full" : "hidden"
            }
          >
            <div className="label">
              <span className="label-text">Change Product Label</span>
            </div>
            <input
              type="text"
              placeholder="Product Label"
              className="input input-bordered w-full"
              value={productLabel}
              onChange={(element) => setProductLabel(element.target.value)}
            />
          </label>

          <label
            className={
              relatedTo == "products" ? "form-control w-full" : "hidden"
            }
          >
            <div className="label">
              <span className="label-text">Change Product Description</span>
            </div>
            <input
              type="text"
              placeholder="Product Description"
              className="input input-bordered w-full"
              value={productDescription}
              onChange={(element) =>
                setProductDescription(element.target.value)
              }
            />
          </label>

          <label
            className={
              relatedTo == "products" ? "form-control w-full" : "hidden"
            }
          >
            <div className="label">
              <span className="label-text">Change stock</span>
            </div>
            <input
              type="number"
              placeholder="Stock"
              className="input input-bordered w-full"
              value={stock}
              onChange={(element) => setStock(element.target.value)}
            />
          </label>

          <label
            className={
              relatedTo == "products" ? "form-control w-full" : "hidden"
            }
          >
            <div className="label">
              <span className="label-text">Changeprice</span>
            </div>
            <input
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
              value={price}
              onChange={(element) => setPrice(element.target.value)}
            />
          </label>

          <button
            className={`mt-5 btn ${
              formProductIsEmpty ? "btn-disabled" : "btn-primary"
            } btn-block col-span-full font-semibold`}
            onClick={updateProject}
          >
            {relatedTo == "user"
              ? "Update user"
              : relatedTo == "project"
              ? "Update project"
              : relatedTo == "report"
              ? "Update report"
              : relatedTo == "products"
              ? "Update product"
              : ""}
          </button>
        </form>
      </div>
    </div>
  );

  return null;
};

export default ProjectData;
