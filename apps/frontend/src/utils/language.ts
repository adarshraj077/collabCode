
const normalizeLanguage = (value: string) => {
  if (value === "js") return "javascript";
  if (value === "ts") return "typescript";
  return value;
};

export default normalizeLanguage;