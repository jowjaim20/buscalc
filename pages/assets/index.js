
import { useSelector, useDispatch } from "react-redux";
import Asset from "../components/Asset";
import AssetModal from "../components/AssetModal";
import ForEditAssetModal from "../components/ForEditAssetModal";
import ForEditModal from "../components/ForEditModal";
import Liability from "../components/Liability";
import Modal from "../components/Modal";
import {
  
  getDataError,
  getDataStatus,
  toggleAddAsset,
} from "../features/assets/assetsSlice";


const Assets = () => {
  const dispatch = useDispatch();
  const { assets, edit, add} = useSelector((state) => state.assets);
  const dataStatus = useSelector(getDataStatus);
  const error = useSelector(getDataError);



  return (
    <div className="flex relative flex-col justify-start h-screen text-center">
      <button
        onClick={() => dispatch(toggleAddAsset())}
        type="button"
        className={`w-full flex justify-center items-center px-6 py-1 text-white ${
          edit || add ? "bg-red-600" : "bg-green-400"
        } rounded ${edit || add ? "hover:bg-red-400" : "hover:bg-green-300"} `}
      >
        {edit || add ? "Close" : "Add"}
      </button>
      {add && <AssetModal />}
      {edit && <ForEditAssetModal />}
      {dataStatus === "loading" && <div>loading...</div>}
      {dataStatus === "failed" && (
        <div className="text-red-600">
          {error}
          <br></br>Please reload the app
        </div>
      )}
      {dataStatus === 'succeed' && assets.length < 1 && <div>No post to show</div>}
      <div className="flex flex-col gap-5">
        {assets.map((asset) => (
          <Asset key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default Assets;