import { useSelector, useDispatch } from "react-redux";
import Liability from "../components/Liability";
import Modal from "../components/Modal";
import { setEdit } from "../features/liabilities/liabilitiesSlice";

const Liabilities = () => {
  const dispatch = useDispatch();
  const { liabilities, edit } = useSelector((state) => state.liabilities);

  return (
    <div className="relative">
      <button
        onClick={() => dispatch(setEdit())}
        type="button"
        className={`w-full flex justify-center items-center px-6 py-1 text-white ${
          edit ? "bg-red-600" : "bg-green-400"
        } rounded ${edit ? "hover:bg-red-400" : "hover:bg-green-300"} `}
      >
        {edit ? "Close" : "Add"}
      </button>
      {edit && <Modal />}
      <div className="flex flex-col  gap-5">
        {liabilities.map((liability) => (
          <Liability key={liability.id} liability={liability} edit={edit} />
        ))}
      </div>
    </div>
  );
};

export default Liabilities;
