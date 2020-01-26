module.exports = {
  getId: url => {
    const lastIndex = url.lastIndexOf("/");

    if (lastIndex !== -1) {
      if (url.slice(lastIndex + 1) === "products") {
        return null;
      }
      return url.slice(lastIndex + 1);
    }
  }
};
