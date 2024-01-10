import { TbFileStack } from "react-icons/tb";
import { RiTodoFill, RiWechatLine } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import { FaRegCalendarDays } from "react-icons/fa6";

const Card = () => {
  return (
    <>
      <div className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-lg">
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
          <p className="font-semibold text-sm">12+</p>
          <div className="flex items-center gap-1 text-gray-600">
            <RiWechatLine className="text-lg" />
            <p className="font-semibold text-sm">15</p>
          </div>
          <div className="flex items-center gap-1">
            <GrAttachment />
            <p className="font-semibold text-sm">0</p>
          </div>
          <div className="flex items-center gap-1">
            <FaRegCalendarDays />
            <p className="font-semibold text-sm">30-12-23</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
