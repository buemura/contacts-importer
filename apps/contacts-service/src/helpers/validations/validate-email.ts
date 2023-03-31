import { emailPattern } from "../regex";

export function validateEmail(email: string) {
  if (!emailPattern.test(email)) {
    return false;
  }

  return true;
}
