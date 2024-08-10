import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const FormRadioButtons = React.memo(
  ({
    name,
    options,
    variant = 'caption',
    defaultValue,
    rules,
    fullWidth,
    className,
    required,
    size,
    value,
    ...rest
  }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    const { getFieldState } = control;
    return (
      <FormControl
        margin="normal"
        fullWidth={fullWidth}
        className={className}
        size={size}
        variant="standard"
      >
        <Controller
          name={name}
          control={control}
          rules={rules}
          noRef={true}
          render={({ field }) => {
            const { name, value, onChange, onBlur } = field;
            return (
              <>
                {rest?.label && (
                  <FormLabel id="demo-radio-buttons-group-label">
                    <Typography variant={variant}>{rest?.label}</Typography>
                  </FormLabel>
                )}
                <RadioGroup
                  defaultValue={defaultValue}
                  name={name}
                  value={value ?? ''}
                  onChange={onChange}
                  row={rest?.align ? false : true}
                >
                  {options?.map((option) => (
                    <FormControlLabel
                      key={option?.key}
                      value={option?.value}
                      control={<Radio size="small" />}
                      label={option?.label}
                      disabled={rest?.disabled}
                    />
                  ))}
                </RadioGroup>
              </>
            );
          }}
        ></Controller>
      </FormControl>
    );
  },
);
export default FormRadioButtons;
