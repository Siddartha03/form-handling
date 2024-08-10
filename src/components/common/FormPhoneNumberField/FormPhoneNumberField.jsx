import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';
import 'react-international-phone/style.css';

const FormPhoneNumberField = ({
  name,
  rules,
  fullWidth,
  className,
  inputClassName,
  rows,
  variant = 'outlined',
  size = 'small',
  color = 'secondary',
  isAsterisk,
  label = '',
  readOnly = false,
  margin = 'normal',
  showHelperError = false,
  errorMessage = 'Mobile number not valid',
  defaultCountry = 'in',
  defaultCountryCode = '+91',
  defaultValue = '',
  isEdit = '',
  onInputChange = () => {},
  disabled,
  ...rest
}) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: isEdit && defaultValue ? '' : defaultCountry,
    value: isEdit && defaultValue ? defaultValue : defaultCountryCode,
    countries: defaultCountries,
    forceDialCode: true,
    onChange: (data) => {
      onInputChange(data);
    },
  });

  const { control, setError, clearErrors } = useFormContext();
  const { getFieldState } = control;

  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phoneNumber) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phoneNumber));
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    isPhoneValid(inputValue)
      ? clearErrors(name)
      : setError(name, { type: 'custom', message: errorMessage });
  }, [inputValue]);

  return (
    <FormControl margin={margin} fullWidth={fullWidth} className={className} size={size}>
      <Controller
        name={name}
        control={control}
        noRef={true}
        render={({ field }) => {
          const { name, value, onChange, onBlur } = field;
          const { invalid, error } = getFieldState(name);
          return (
            <TextField
              disabled={disabled}
              variant="outlined"
              inputProps={{ readOnly: readOnly }}
              className={inputClassName}
              InputLabelProps={{ shrink: true }}
              label={`${label ?? ''}${isAsterisk ? '*' : ''}`}
              color={color}
              size={size}
              value={inputValue}
              onChange={(e) => {
                onChange(e);
                handlePhoneValueChange(e);
              }}
              type="tel"
              inputRef={inputRef}
              onBlur={onBlur}
              error={error ? true : false}
              aria-invalid={invalid ? 'true' : 'false'}
              helperText={error?.message}
              FormHelperTextProps={{ sx: { color: showHelperError ? '#D5213F' : '' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ marginRight: '2px', marginLeft: '-8px' }}
                  >
                    <Select
                      disabled={disabled}
                      MenuProps={{
                        style: {
                          height: '300px',
                          width: '360px',
                          top: '10px',
                          left: '-34px',
                        },
                        transformOrigin: {
                          vertical: 'top',
                          horizontal: 'left',
                        },
                      }}
                      sx={{
                        width: 'max-content',
                        // Remove default outline (display only on focus)
                        fieldset: {
                          display: 'none',
                        },
                        '&.Mui-focused:has(div[aria-expanded="false"])': {
                          fieldset: {
                            display: 'none',
                          },
                        },
                        // Update default spacing
                        '.MuiSelect-select': {
                          padding: '0 0 0 4px',
                          paddingRight: '24px !important',
                        },
                        svg: {
                          right: 0,
                        },
                      }}
                      value={country.iso2}
                      onChange={(e) => setCountry(e.target.value)}
                      renderValue={(value) => (
                        <FlagImage iso2={value} style={{ display: 'flex' }} />
                      )}
                    >
                      {defaultCountries.map((c) => {
                        const country = parseCountry(c);
                        return (
                          <MenuItem key={country.iso2} value={country.iso2}>
                            <FlagImage iso2={country.iso2} style={{ marginRight: '8px' }} />
                            <Typography marginRight="8px">{country.name}</Typography>
                            <Typography color="gray">+{country.dialCode}</Typography>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </InputAdornment>
                ),
              }}
              {...rest}
            />
          );
        }}
      ></Controller>
    </FormControl>
  );
};

export default FormPhoneNumberField;
