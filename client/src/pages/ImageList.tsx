import { useEffect, useState } from "react";

function ImageList() {
    const [predictedImages, setPredictedImages] = useState([]);
    const [nonPredictedImages, setNonPredictedImages] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/images`)
            .then((response) => response.json())
            .then((data) => {
                setPredictedImages(data.predicted_images);
                setNonPredictedImages(data.non_predicted_images);
            });
    }, []);

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">Original Images</h1>
            <div className="flex flex-wrap justify-center">
                {nonPredictedImages.map((image, index) => (
                    <img key={index} src={`data:image/jpeg;base64,${image}`} alt="Non-Predicted" className="w-64 h-64 object-cover m-2" />
                ))}
            </div>

            <h1 className="text-2xl font-bold">Predicted Images</h1>
            <div className="flex flex-wrap justify-center">
                {predictedImages.map((image, index) => (
                    <img key={index} src={`data:image/jpeg;base64,${image}`} alt="Predicted" className="w-64 h-64 object-cover m-2" />
                ))}
            </div>
        </div>
    );
}

export default ImageList;
