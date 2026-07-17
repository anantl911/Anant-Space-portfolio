import { backendApi } from "./axios";
import { filePaths } from "./paths";


const FileApi = {
    upload: async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);

        const res = await backendApi.post(filePaths.upload, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return res;
    }
}

export default FileApi;