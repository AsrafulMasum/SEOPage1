import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://seopage1-seven.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
