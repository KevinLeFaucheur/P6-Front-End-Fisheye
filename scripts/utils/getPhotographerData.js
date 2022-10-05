export const getPhotographers = async () => {
    const response = await fetch('../data/photographers.json');
    return response.json();
};
