import { orderContent } from "./content";

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

export const convertDataChart = (data, type) => {
    try {
        const object = {}
        Array.isArray(data) && data.forEach((opt) => {
            if(!object[opt[type]]) {
                object[opt[type]] = 1
            } else {
                object[opt[type]]+=1
                console.log('c;getBase64', object[opt[type]], typeof(object[opt[type]]))
            }
        })
        const results = Array.isArray(Object.keys(object)) && Object.keys(object).map((item) => {
            return {
                name: orderContent.payment[item],
                value: object[item]
            }
        })
        return results
    }catch(e) {
        return []
    }
  }

export const renderOptions = (arr) => {
    let results = [];
    if (arr) {
        results = arr.map((opt) => {
            return {
                value: opt,
                label: opt,
            };
        });
    }
    results.push({
        label: 'Thêm type',
        value: 'add_type'
    });

    return results;
};