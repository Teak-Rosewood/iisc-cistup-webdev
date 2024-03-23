import { useState } from "react";
import { uploadImage } from "../requests/carDetection";
import { getInference } from "../requests/carDetection";

function Predict() {
    const [isloading, setIsLoading] = useState<boolean>(false);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [predictedImage, setPredictedImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [vehicles, setVehicle] = useState({ Car: 0, Truck: 0, Motorcycle: 0, Bus: 0 });
    const [predicted, setPredicted] = useState<boolean>(false);
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
            setImageURL(URL.createObjectURL(event.target.files[0]));
        }
    };

    const uploadImageToServer = async () => {
        if (file) {
            setIsLoading(true);
            await uploadImage(file);
            await runDetection();
            setIsLoading(false);
        } else {
        }
    };

    const runDetection = async () => {
        const res = await getInference(file?.name);
        if (!res) return;
        console.log(res.vehicles);
        setVehicle(res.vehicles);
        setPredictedImage(`data:image/jpg;base64,${res.image}`);
        setPredicted(true);
    };

    return (
        <>
            <div className="text-xl font-semibold">Upload Image for Detection using YOLOv8</div>
            <div className="py-3">
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    onChange={handleImageUpload}
                />
            </div>
            <button
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={uploadImageToServer}
            >
                Upload Image and Detect Cars
            </button>
            {isloading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {imageURL && !predicted ? (
                        <>
                            <div className="text-xl font-semibold"> Image Preview</div>
                            <img src={imageURL} alt="Uploaded" />
                        </>
                    ) : null}
                    {predicted && predictedImage && imageURL ? (
                        <>
                            <div className="flex flex-row">
                                <div className="m-1">
                                    <div className="text-xl font-semibold">Uploaded Image</div>
                                    <img src={imageURL} alt="Uploaded" />
                                </div>
                                <div className="m-1">
                                    <div className="text-xl font-semibold">Predicted Image</div>
                                    <img src={predictedImage} alt="Predicted" />
                                </div>
                            </div>
                            <div className="text-xl font-semibold">
                                Cars: {vehicles["Car"]} Trucks: {vehicles["Truck"]} Motorcycles: {vehicles["Motorcycle"]} Buses: {vehicles["Bus"]}
                            </div>
                        </>
                    ) : null}
                </>
            )}
        </>
    );
}

export default Predict;
