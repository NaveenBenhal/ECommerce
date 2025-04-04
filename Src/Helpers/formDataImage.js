export const formDataImage = (getImage,type) => {
    try {
        const file = getImage[0];
        const imgName = file.path.split("/").pop();

        const formData = new FormData();
        formData.append(type, {  // Ensure "ProductImage" matches Multer's field name
            uri: file.path,
            type: file.mime,
            name: imgName,
        });

        return formData;
    } catch (e) {
        console.log("formDataImage ERR", e);
        throw e;
    }
};