import React from "react";
import { FormControl, TextField, Typography, useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const FormTextField = React.memo(
  ({
    name,
    rules,
    fullWidth,
    className,
    inputClassName,
    required = false,
    multiline,
    rows,
    size = "small",
    color = "secondary",
    isAsterisk,
    label = "",
    readOnly = false,
    margin = "normal",
    showHelperError = false,
    onInputChange = () => {},
    maxChars = 500,
    showCharRemaining = false,
    ...rest
  }) => {
    const {
      control,
      formState: { errors },
      trigger,
      setError,
      watch,
    } = useFormContext();
    const { getFieldState } = control;

    const theme = useTheme();
    const watchName = watch(name);
    const charCount = watchName?.length || 0;

    return (
      <FormControl margin={margin} fullWidth={fullWidth} className={className} size={size}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          noRef={true}
          render={({ field }) => {
            const { name, value = "", onChange, onBlur } = field;
            const { invalid, error } = getFieldState(name);

            return (
              <>
                <TextField
                  name={name}
                  required={required}
                  value={value || ""}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue.length <= maxChars) {
                      onChange(e);
                      onInputChange(e);
                      trigger(name);
                    } else if (inputValue.length < charCount) {
                      // Allow reducing text length
                      onChange(e);
                      onInputChange(e);
                      trigger(name);
                    }
                  }}
                  onPaste={(e) => {
                    const pastedText = e.clipboardData.getData("text");
                    if (pastedText.length + charCount > maxChars) {
                      // Prevent pasting if it exceeds maxChars
                      e.preventDefault();
                      setError(name, {
                        type: "custom",
                        message: `Cannot paste more than ${maxChars} characters.`,
                      });
                    }
                  }}
                  onBlur={onBlur}
                  error={error ? true : false}
                  aria-invalid={invalid ? "true" : "false"}
                  helperText={error?.message}
                  FormHelperTextProps={{ sx: { color: showHelperError ? "#D5213F" : "" } }}
                  size={size}
                  color={color}
                  multiline={multiline}
                  rows={rows}
                  inputProps={{ maxLength: 10000, readOnly: readOnly }}
                  className={inputClassName}
                  InputLabelProps={{ shrink: true }}
                  label={`${label ?? ""}${isAsterisk ? "*" : ""}`}
                  {...rest}
                />
                {showCharRemaining && (
                  <Typography variant="caption" color={theme.palette.text.hint} mt={1}>{`${
                    maxChars - charCount
                  }/${maxChars} characters remaining.`}</Typography>
                )}
              </>
            );
          }}
        ></Controller>
      </FormControl>
    );
  }
);

export default FormTextField;
