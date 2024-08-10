import React from 'react';
import { FormControl, FormControlLabel, Switch } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const FormSwitchField = React.memo(
  ({ name, rules, fullWidth, className, required, size, color = 'primary', ...rest }) => {
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
          noRef={true}
          render={({ field }) => {
            const { name, value, onChange, onBlur } = field;
            const { invalid, error } = getFieldState(name);

            return (
              <FormControlLabel
                control={
                  <Switch
                    name={name}
                    checked={!!value}
                    onChange={onChange}
                    onBlur={onBlur}
                    aria-invalid={invalid ? 'true' : 'false'}
                    size={size}
                    color={color}
                    {...rest}
                  />
                }
                label={rest?.label}
              />
            );
          }}
        ></Controller>
      </FormControl>
    );
  },
);
export default FormSwitchField;
