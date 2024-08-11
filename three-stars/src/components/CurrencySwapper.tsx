import { Button, TextField } from "@mui/material";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/hooks";
import {
  onChangeInputCurrency,
  onChangeInputValue,
  onChangeOutputCurrency,
  onChangeOutputValue,
  onSetCodes,
  onSwapCurrencies,
} from "../store/slices/currencySlice";
import {
  useGetCodesQuery,
  useGetConvertCurrenciesQuery,
} from "../services/currencyService";

const CurrencySwapper: FC = () => {
  const dispatch = useDispatch();
  const store = useAppSelector((state) => state.currencySlice);

  const { data: codes, isFetching: isCodesFetching } = useGetCodesQuery(null, {
    skip: !!store.codes.length,
  });
  const {
    data: converResult,
    isFetching,
    error: fetchError,
  } = useGetConvertCurrenciesQuery(
    {
      from: store.inputCurrency.currency!,
      to: store.outputCurrency.currency!,
      amount: store.inputCurrency.value!,
    },
    {
      skip:
        !store.inputCurrency.value ||
        !store.inputCurrency.currency ||
        !store.outputCurrency.currency,
    }
  );

  useEffect(() => {
    if (codes) {
      dispatch(onSetCodes(codes.supported_codes.map((code) => code[0])));
    }
  }, [codes]);

  useEffect(() => {
    if (converResult) {
      dispatch(onChangeOutputValue(converResult.conversion_result));
    }
  }, [converResult]);

  return (
    <div className="flex flex-col gap-4 w-full items-center p-8">
      <div className="text-2xl">Начните вводить значение</div>
      <div className="flex flex-col gap-4">
        <div>
          <TextField
            value={store.inputCurrency.value}
            type="number"
            onChange={(e) => {
              dispatch(onChangeInputValue(Number(e.target.value)));
            }}
            disabled={isFetching}
            error={!!fetchError}
            helperText={fetchError ? "Ошибка конвертации" : ""}
          />
          <TextField
            select
            value={store.inputCurrency.currency}
            onChange={(e) => {
              dispatch(onChangeInputCurrency(e.target.value));
            }}
            SelectProps={{
              native: true,
            }}
            variant="filled"
            sx={{
              select: {
                padding: "16px",
              },
            }}
            disabled={isCodesFetching || !!fetchError}
          >
            {store.codes.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </TextField>
        </div>
        <Button
          onClick={() => {
            dispatch(onSwapCurrencies());
          }}
          disabled={isFetching || isCodesFetching || !!fetchError}
        >
          Поменять
        </Button>
        <div>
          <TextField value={store.outputCurrency.value} disabled />
          <TextField
            select
            value={store.outputCurrency.currency}
            onChange={(e) => {
              dispatch(onChangeOutputCurrency(e.target.value));
            }}
            SelectProps={{
              native: true,
            }}
            variant="filled"
            sx={{
              select: {
                padding: "16px",
              },
            }}
            disabled={isCodesFetching || !!fetchError}
          >
            {store.codes.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </TextField>
        </div>
      </div>
    </div>
  );
};

export { CurrencySwapper };
