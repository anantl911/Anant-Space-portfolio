import { backendApi } from "./axios";
import { filePaths } from "./paths";


const FileApi = {
    upload: async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);

        const res = await backendApi.post(filePaths.upload, { body: formData });

        // TODO: LOOK into this later.
        // editor.chain().focus().setImage({ src: result.data.url }).run();
        return res;
    }
}

export default FileApi;