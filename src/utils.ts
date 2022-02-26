export const getRandomInt = () => Math.ceil(Math.random()*100);

export const setPrice = (price: number) => price.toLocaleString().concat(' $');
