export const formatTableName = (tableName: string) => {
  if (process.env.NODE_ENV === 'test') {
    return `${tableName}-test`;
  }
  return tableName;
};
