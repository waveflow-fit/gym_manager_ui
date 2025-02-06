export const convertFormDataToJson = (formData: FormData) => {
    return formData.entries().reduce((prevVal, currVal) => {
        const [key, val] = currVal;
        prevVal[key] = val
        return prevVal
    }, {})
}