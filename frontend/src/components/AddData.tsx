import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";
import { send } from "../utilFunctions/sendData";

interface AddDataProps {
  slug: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddData: React.FC<AddDataProps> = ({
  slug,
  isOpen,
  //   columns,
  setIsOpen,
}) => {
  // global
  const [showModal, setShowModal] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  // add user
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formUserIsEmpty, setFormUserIsEmpty] = React.useState(false);

  const loadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUpload = e.target.files[0];
      setFile(imageUpload);
      setPreview(URL.createObjectURL(imageUpload));
    }
  };
  useEffect(() => {
    setFormUserIsEmpty(
      firstName === "" ||
        lastName === "" ||
        nickname === "" ||
        email === "" ||
        phone === ""
    );
  }, [firstName, lastName, nickname, email, phone]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formUserIsEmpty) {
      const formData = {
        first_name: firstName,
        last_name: lastName,
        email,
        nickname,
        role: "VIPclient",
        status: "active",
        password: "vip123456789",
      };
      // Send POST request to backend
      send(formData, "http://localhost:3001/api/user/inscriptionUser");
    }
  };

  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black/75 z-[99]">
      <div
        className={`w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative transition duration-300 flex flex-col items-stretch gap-5 ${
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
          <span className="text-2xl font-bold">Add new {slug}</span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full"
            name="firstName"
            id="firstName"
            onChange={(element) => setFirstName(element.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full"
            name="lastName"
            id="lastName"
            onChange={(element) => setLastName(element.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            name="email"
            id="email"
            onChange={(element) => setEmail(element.target.value)}
          />
          <input
            type="text"
            placeholder="Nickname"
            className="input input-bordered w-full"
            name="nickname"
            id="nickname"
            onChange={(element) => setNickname(element.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className="input input-bordered w-full"
            name="phone"
            id="phone"
            onChange={(element) => setPhone(element.target.value)}
          />

          {/*<label className="form-control w-full">
              <div className="label">
                <span className="label-text">
                  Pick a profile photo
                </span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={loadImage}
              />
            </label>
            {preview && preview !== '' && (
              <div className="w-full flex flex-col items-start gap-3">
                <span>Profile Preview</span>
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={preview} alt="profile-upload" />
                  </div>
                </div>
              </div>
            )} */}
          <button
            className={`mt-5 btn ${
              formUserIsEmpty ? "btn-disabled" : "btn-primary"
            } btn-block col-span-full font-semibold`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddData;
