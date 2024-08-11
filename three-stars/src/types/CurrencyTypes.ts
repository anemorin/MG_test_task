/** Начальное состояние стора */
export interface IInitialStateType {
  inputCurrency: ICurrency;
  outputCurrency: ICurrency;
  codes: string[];
}

export interface ICurrency {
  value?: number;
  currency?: string;
}

export interface ICodesResponse {
  result: string;
  supported_codes: string[][];
}

export interface ICurrencyConvertRequest {
  from: string;
  to: string;
  amount: number;
}

export interface ICurrencyConvertResponse {
  result: string;
  conversion_result: number;
}
