export const validationConsts = {
    MIN_DESCRIPTION_LENGTH: 10,
    MAX_DESCRIPTION_LENGTH: 300,
    MIN_TRAITS_COUNT: 3,
    MAX_TRAITS_COUNT: 8,
};

export const isValidURL = (url: string): boolean => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
};