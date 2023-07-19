/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as OTPAuth from "otpauth";

export interface TotpValues {
  issuer: string;
  label: string;
  algorithm: string;
  digits: number;
  period: number;
  secret: string;
}

export function useTotp(values: TotpValues) {
  try {
    new OTPAuth.TOTP(values);
  } catch (error) {
    return "error";
  }
  const totp = new OTPAuth.TOTP(values);
  const toekn = totp.generate();
  return toekn;
}