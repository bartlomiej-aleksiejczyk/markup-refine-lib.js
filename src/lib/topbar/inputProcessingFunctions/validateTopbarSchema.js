import Ajv from "ajv/dist/2020";
import addFormats from "ajv-formats";
import topbarInputSchema from "../topbarInputSchema.json";

const ajv = new Ajv();
addFormats(ajv);

export function validateTopbarSchema(data) {
  const validate = ajv.compile(topbarInputSchema);

  return validate(data);
}
