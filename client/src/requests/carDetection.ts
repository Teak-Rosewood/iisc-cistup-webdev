
export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(import.meta.env.VITE_APP_SERVER_URL)
    const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        return false;
    }
    const res = await response.json();
    return res.message;
}

export const getInference = async (filename: string | undefined) => {
    if (filename) {
        const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/cars/predict/${filename}`, {
            method: 'GET',
        });
        if (!response.ok) {
            return false;
        }
        const res = await response.json();
        return res;
    }
}