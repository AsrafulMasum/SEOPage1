import { TbFileStack } from "react-icons/tb";
import { RiTodoFill, RiWechatLine } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import { FaRegCalendarDays } from "react-icons/fa6";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useLoadPublicData from "../Hooks/useLoadPublicData";

const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

const Card = () => {
  const axiosPublic = useAxiosPublic();
  const {data, refetch} = useLoadPublicData("/files")
  const { register, handleSubmit } = useForm();

  let [isOpen, setIsOpen] = useState(false);
  let [uploadedFiles, setUploadedFiles] = useState([]);

  function closeModal() {
    setIsOpen(false);
    setUploadedFiles([]);
  }

  function openModal() {
    setIsOpen(true);
  }

  const getFileExtension = (filename) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  };

  const uploadToImgBB = async (file) => {
    try {
      await axiosPublic.delete("/files");

      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(imgHostingApi, formData);

      if (response.data.data) {
        const imgURL = {
          imgURL: response.data.data.url,
        };
        // store in DB
        if (imgURL) {
          const res = await axiosPublic.post("/files", imgURL);
          console.log(res.data);
          if(res?.data?.insertedId){
            refetch()
          }
        }
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image to imgbb:", error.message);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    const newFiles = Array.from(data?.file);

    const uploadedFile = newFiles?.map((file) => {
      return {
        originalName: file.name,
        extension: getFileExtension(file.name),
      };
    });

    setUploadedFiles((prevFiles) => [...prevFiles, ...uploadedFile]);

    newFiles?.forEach(async (file) => {
      await uploadToImgBB(file);
    });
  };

  return (
    <>
      <div className="w-96 px-4 py-3 bg-white rounded-md shadow-lg">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-semibold">
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <p>Charry Dou</p>
          </span>
          <span className="flex items-center gap-2 font-semibold">
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <p>Charry Dou</p>
          </span>
        </div>

        <div className="flex justify-between items-center mt-4 text-gray-600">
          <div className="flex items-center gap-1">
            <TbFileStack />
            <p>Lorem ipsum dolor sit amet, con...</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
            <RiTodoFill />
            <p className="font-semibold">1/2</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 text-gray-600">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <p className="font-semibold text-sm bg-gray-100 p-[6px] rounded-full">
            12+
          </p>
          <div className="flex items-center gap-1 text-gray-600">
            <RiWechatLine className="text-lg" />
            <p className="font-semibold text-sm">15</p>
          </div>
          <div
            onClick={openModal}
            className="flex items-center gap-1 cursor-pointer"
          >
            <GrAttachment />
            <p className="font-semibold text-sm">{data?.length}</p>
          </div>
          <div className="flex items-center gap-1">
            <FaRegCalendarDays />
            <p className="font-semibold text-sm">30-12-23</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Upload Image
                  </Dialog.Title>
                  <button
                    onClick={closeModal}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none"
                  >
                    ✕
                  </button>

                  <div className="mt-4">
                    {/* <input
                      type="file"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleAttachment}
                    >
                      Got it, thanks!
                    </input> */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input
                        {...register("file", { required: true })}
                        type="file"
                        multiple
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      />
                      <button className="inline-flex justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none">
                        Upload
                      </button>
                    </form>

                    {/* Display the list of uploaded files */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-lg font-medium mb-2">
                          Uploaded Files:
                        </h4>
                        <ul>
                          {uploadedFiles.map((file, index) => (
                            <li key={index} className="mb-1">
                              <strong>{file.originalName}</strong> (.
                              {file.extension})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Card;
