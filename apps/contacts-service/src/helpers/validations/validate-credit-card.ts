import creditCardType, { getTypeInfo } from "credit-card-type";

export function validateCreditCard(creditCardNumber: string) {
  const cardType = creditCardType(creditCardNumber);
  if (cardType.length !== 1) {
    return false;
  }

  const creditCardDetails = getTypeInfo(cardType[0].type);
  if (!creditCardDetails.lengths.includes(creditCardNumber.length)) {
    return false;
  }

  return true;
}
