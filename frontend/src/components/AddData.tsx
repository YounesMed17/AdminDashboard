import React, { FormEvent, useEffect, useState } from "react";
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

  // add user
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formUserIsEmpty, setFormUserIsEmpty] = useState(false);
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [productLabel, setProductLabel] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUpload = e.target.files[0];
      setFile(imageUpload);
      setPreview(URL.createObjectURL(imageUpload));
    }
  };
  useEffect(() => {
    setFormUserIsEmpty(
      (firstName === "" ||
        lastName === "" ||
        nickname === "" ||
        email === "" ||
        phone === "") &&
        (productLabel === "" ||
          productDescription === "" ||
          price == 0 ||
          stock == 0 ||
          file === null)
    );
  }, [
    firstName,
    lastName,
    nickname,
    email,
    phone,
    productLabel,
    productDescription,
    price,
    file,
    stock,
  ]);
  const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productLabel", productLabel);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("productDescription", productDescription);
    formData.append("file", file as Blob);
    console.log(formData);

    try {
      const response = await fetch("http://localhost:3001/add-product", {
        method: "POST",
        body: formData,
      });
      console.log(formData);
      if (response.ok) {
        alert("Product added successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "An error occurred while adding the product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formUserIsEmpty && slug == "user") {
      const formData = {
        first_name: firstName,
        last_name: lastName,
        email,
        nickname,
        role: role,
        status: "active",
        password: password,
      };
      // Send POST request to backend
      send(formData, "http://localhost:3001/api/user/inscriptionUser");
    }

    if (!formUserIsEmpty && slug == "products") {
      const formData = {
        productLabel,
        productDescription,
        price,
        stock,
        file,
      };
      send(formData, "http://localhost:3001/api/products/api/addProducts");
    }
  };

  useEffect(() => {
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
          onSubmit={handleSubmit2}
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="First Name"
            className={
              slug == "products" ? "hidden" : "input input-bordered w-full"
            }
            name="firstName"
            id="firstName"
            onChange={(element) => setFirstName(element.target.value)}
          />

          <input
            type="text"
            placeholder="Product Name"
            className={
              slug != "products" ? "hidden" : "input input-bordered w-full"
            }
            name="Name"
            id="Name"
            onChange={(element) => setProductLabel(element.target.value)}
          />
          <input
            type="text"
            placeholder="Product Description"
            className={
              slug != "products" ? "hidden" : "input input-bordered w-full"
            }
            name="Name"
            id="Name"
            onChange={(element) => setProductDescription(element.target.value)}
          />

          <input
            type="number"
            placeholder="price"
            className={
              slug != "products" ? "hidden" : "input input-bordered w-full"
            }
            name="price"
            id="price"
            onChange={(element) => setPrice(element.target.value)}
          />

          <input
            type="number"
            placeholder="stock"
            className={
              slug != "products" ? "hidden" : "input input-bordered w-full"
            }
            name="stock"
            id="stock"
            onChange={(element) => setStock(element.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            className={
              slug == "products" ? "hidden" : "input input-bordered w-full"
            }
            name="lastName"
            id="lastName"
            onChange={(element) => setLastName(element.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className={
              slug == "products" ? "hidden" : "input input-bordered w-full"
            }
            name="email"
            id="email"
            onChange={(element) => setEmail(element.target.value)}
          />
          <input
            type="text"
            placeholder="Nickname"
            className={
              slug == "products" ? "hidden" : "input input-bordered w-full"
            }
            name="nickname"
            id="nickname"
            onChange={(element) => setNickname(element.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className={
              slug == "products" ? "hidden" : "input input-bordered w-full"
            }
            name="phone"
            id="phone"
            onChange={(element) => setPhone(element.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            className={
              slug == "products" ? "hidden" : "input input-bordered w-full"
            }
            name="password"
            id="password"
            onChange={(element) => setPassword(element.target.value)}
          />
          <label className={slug == "admin" ? "form-control w-full" : "hidden"}>
            <div className="label">
              <span className="label-text">Admin Role</span>
            </div>
            <select
              className="select select-bordered"
              value={role}
              onChange={(element) => setRole(element.target.value)}
            >
              <option value="AccountsAdmin">AccountsAdmin</option>
              <option value="ChatAdmin">ChatAdmin</option>
              <option value="ProjectsAdmin">ProjectsAdmin</option>
            </select>
          </label>

          <label
            className={slug == "products" ? "form-control w-full" : "hidden"}
          >
            <div className="label">
              <span className="label-text">Pick a product photo</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={loadImage}
            />
          </label>
          {preview && preview !== "" && (
            <div className="w-full flex flex-col items-start gap-3">
              <span>Product Preview</span>
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={preview} alt="profile-upload" />
                </div>
              </div>
            </div>
          )}
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
