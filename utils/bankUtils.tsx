import { banksData } from "@/constant/wallet/bank-constant";

export function getBankFromIBAN(iban: string): Bank | undefined {
  let bankCode;
  if (iban.startsWith("IR")) {
    bankCode = iban.substring(4, 7);
  } else {
    bankCode = iban.substring(2, 5);
  }
  return banksData.find((bank) => bank.ibanCode === bankCode);
}
export function getBankFromCard(cardNumber: string): Bank | undefined {
  const cardPrefix = cardNumber.substring(0, 6); // Extract first 6 digits of the card
  return banksData.find((bank) =>
    bank.cardPrefixes.some((prefix) => cardPrefix.startsWith(prefix))
  );
}
