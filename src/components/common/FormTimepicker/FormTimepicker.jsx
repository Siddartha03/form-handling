import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const FormTimepicker = React.memo(
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
    ampm,
    ...rest
  }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
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
                <TimePicker
                  name={name}
                  label={`${label ?? ''}${isAsterisk ? '*' : ''}`}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={dateValue}
                  ampm={ampm}
                  minDate={min}
                  maxDate={max}
                  disablePast={disablePast}
                  disableFuture={disableFuture}
                  slotProps={{
                    textField: {
                      size: size,
                      fullWidth: fullWidth,
                      helperText: error?.message,
                      error: invalid,
                    },
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

export default FormTimepicker;
