export const firstLetter = (string) => {
  if (string) {
    let newString;
    const array = string.split(" ");
    newString = array[0].charAt(0).toUpperCase();
    newString += array[1].charAt(0).toUpperCase();
    return newString;
  } else {
    return;
  }
};
