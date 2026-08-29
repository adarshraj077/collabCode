function generateRandomString(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = new Uint32Array(6);

  crypto.getRandomValues(randomValues);

  return Array.from(randomValues, value => chars[value % chars.length]).join("");
}


export default generateRandomString;

