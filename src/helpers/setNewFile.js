const setNewFile = pickerResult => {
  const splittedUri = pickerResult.uri.split('.');
  const imgType = splittedUri[splittedUri.length - 1];

  const newFile = {
    uri: pickerResult.uri,
    type: `test/${imgType}`,
    name: `test.${imgType}`,
  };

  return newFile;
};

export default setNewFile