import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, useTheme } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const FormDatepicker = React.memo(
  ({
    name,
    rules,
    label,
    fullWidth,
    className,
    required = false,
    size = 'small',
    isAsterisk,
    min = null,
    max = null,
    disablePast,
    disableFuture,
    shouldDisableDate = () => {},
    onChangeDate = () => {},
    views = ['year', 'month', 'day'],
    format = 'DD/MM/YYYY',
    ...rest
  }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    const theme = useTheme();
    const { getFieldState } = control;

    return (
      <FormControl margin="normal" fullWidth={fullWidth} className={className} size={size}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => {
            const { name, value, onChange, onBlur } = field;
            const { invalid, error } = getFieldState(name);

            // Convert value to dayjs object if it's a string
            const dateValue = typeof value === 'string' ? dayjs(value) : value;

            return (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name={name}
                  label={`${label ?? ''}${isAsterisk ? '*' : ''}`}
                  onChange={(e) => {
                    onChange(e);
                    onChangeDate(e);
                  }}
                  onBlur={onBlur}
                  value={dateValue}
                  views={views}
                  minDate={min}
                  maxDate={max}
                  disablePast={disablePast}
                  disableFuture={disableFuture}
                  shouldDisableDate={shouldDisableDate}
                  format={format}
                  slotProps={{
                    textField: {
                      size: size,
                      fullWidth: fullWidth,
                      helperText: error?.message,
                      error: invalid,
                    },
                  }}
                  sx={{
                    '& .MuiSvgIcon-root': { fill: theme.palette.secondary.main },
                  }}
                  {...rest}
                />
              </LocalizationProvider>
            );
          }}
        ></Controller>
      </FormControl>
    );
  },
);

export default FormDatepicker;
