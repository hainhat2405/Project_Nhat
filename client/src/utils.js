export const jsJsonString = (data) => {
    try {
        JSON.parse(data)

    } catch (error) {
        return false
    }
    return true;
}

// export const getBase64 = (file) =>
//     new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//     });

export const converPrice = (price) => {
    try{
        const result = price?.toLocaleString().replaceAll(',',',')
        return `${result} VND`

    }catch (error){
        return null
    }
}