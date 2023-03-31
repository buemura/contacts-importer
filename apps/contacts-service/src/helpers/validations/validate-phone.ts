import { phonePattern } from "../regex";

export function validatePhone(phone: string) {
  if (!phonePattern.test(phone)) {
    return false;
  }

  return true;
}
