export const camelToCapital = (str: string) => {
    return str.replace(/([A-Z])/g, ' $1').replace(/\b\w/g, function (word) {
      return word.toUpperCase();
    });
  };
  