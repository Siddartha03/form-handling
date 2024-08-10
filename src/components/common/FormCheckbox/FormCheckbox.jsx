import React from 'react';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const FormCheckbox = React.memo(
  ({
    name,
    rules,
    checked,
    fullWidth,
    className,
    required,
    size,
    options,
    showLabel = true,
    variant = 'standard',
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
        variant={variant}
      >
        <Controller
          name={name}
          control={control}
          rules={rules}
          noRef={true}
          render={({ field }) => {
            const { name, value, onChange, onBlur } = field;
            return showLabel ? (
              <FormControlLabel
                label={rest?.label}
                control={
                  <Checkbox
                    checked={!!value}
                    name={name}
                    value={!!value}
                    onChange={onChange}
                    onBlur={onBlur}
                    size={size}
                    {...rest}
                  />
                }
              />
            ) : (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!value}
                    name={name}
                    value={!!value}
                    onChange={onChange}
                    onBlur={onBlur}
                    size={size}
                    {...rest}
                  />
                }
              />
            );
          }}
        ></Controller>
      </FormControl>
    );
  },
);
export default FormCheckbox;
