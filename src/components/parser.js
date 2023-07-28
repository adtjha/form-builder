export const decodeData = (encodedData) => {
    // Create an empty array to store the decoded objects
    const decodedData = [];

    // Iterate through the encoded data
    encodedData.forEach((item) => {
        const { type, content } = item;
        const originalObject = { type, ...content };
        decodedData.push(originalObject);
    });

    // Return the array of decoded objects
    return decodedData;
}

export const encodeData = (inputData) => {
    // Create an empty array to store the processed objects
    const encodedData = [];

    // Iterate through the input data
    inputData.forEach((item) => {
        const { type, ...content } = item;
        encodedData.push({ type, content });
    });

    // Return the array of encoded objects
    return encodedData;
}
