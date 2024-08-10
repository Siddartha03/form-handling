export const addressMapper = (list, name, code) => {
  return list?.map((data) => ({
    id: Math.random() * 10,
    label: data[name],
    value: data[code],
    key: data[code],
  }));
};
