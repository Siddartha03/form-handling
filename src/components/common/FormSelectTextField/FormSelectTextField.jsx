import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, InputAdornment, MenuItem, TextField } from "@mui/material";
import "./FormSelectTextField.scss";
import ExpandArrow from "../../../icons/ExpandArrow";

const FormSelectTextField = ({
  textFieldName,
  textFieldLabel,
  textFieldRules,
  textFieldFullWidth,
  textFieldClassName,
  textFieldInputClassName,
  textFieldRequired = false,
  isAsterisk,
  multiline,
  rows,
  inputType = "text",
  setInputType,
  textFieldSize,
  textFieldColor = "secondary",
  selectFieldName,
  selectFieldLabel,
  selectFieldRules,
  selectFieldRequired,
  selectFieldSize,
  selectFieldColor,
  options,
  onTextChange = () => {},
  onSelectChange = () => {},
  disabled,
  labelKey = "label",
  ...rest
}) => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();
  const { getFieldState } = control;

  const [menuOpen, setMenuOpen] = useState(false);

  const selectRef = useRef(null);
  const inputRef = useRef(null);
  const arrowIconRef = useRef(null);

  const handleArrowClick = () => {
    if (!disabled) {
      setMenuOpen(!menuOpen);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleClickOutside = (event) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target) &&
      arrowIconRef.current &&
      !arrowIconRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="form-select-text-field">
      <FormControl
        margin="normal"
        fullWidth={textFieldFullWidth}
        className={textFieldClassName}
        size={textFieldSize}
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Controller
          name={textFieldName}
          control={control}
          rules={textFieldRules}
          noRef={true}
          render={({ field }) => {
            const { name, value, onChange, onBlur } = field;
            const { invalid, error } = getFieldState(name);
            return (
              <TextField
                name={textFieldName}
                label={`${textFieldLabel ?? ""}${isAsterisk ? "*" : ""}`}
                required={textFieldRequired}
                value={value}
                onChange={(e) => {
                  onChange(e);
                  onTextChange(e);
                  trigger(name);
                }}
                onBlur={onBlur}
                error={error ? true : false}
                aria-invalid={invalid ? "true" : "false"}
                helperText={error?.message}
                size={textFieldSize}
                color={textFieldColor}
                multiline={multiline}
                rows={rows}
                inputProps={{ maxLength: 10000 }}
                className={textFieldInputClassName}
                InputLabelProps={{ shrink: true }}
                type={inputType}
                style={{
                  width: "65%",
                }}
                {...rest}
              />
            );
          }}
        ></Controller>

        <Controller
          name={selectFieldName}
          control={control}
          rules={selectFieldRules}
          noRef={true}
          render={({ field }) => {
            const { name, value, onChange, onBlur } = field;
            const { invalid, error } = getFieldState(name);
            return (
              <TextField
                select
                name={name}
                required={selectFieldRequired}
                value={value == null ? "" : value}
                onChange={(e) => {
                  onChange(e);
                  onSelectChange(e);
                  trigger(name);
                }}
                onBlur={onBlur}
                error={error ? true : false}
                aria-invalid={invalid ? "true" : "false"}
                helperText={error?.message}
                size={selectFieldSize}
                style={{
                  width: "35%",
                }}
                SelectProps={{
                  open: menuOpen,
                  onClose: () => setMenuOpen(false),
                  // To open the menu when clicking on the select box
                  onClick: () => !disabled && setMenuOpen(!menuOpen),
                  MenuProps: {
                    style: {
                      height: "360px",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ExpandArrow
                        handleExpandArrowClick={handleArrowClick}
                        // ref={arrowIconRef}
                      />
                    </InputAdornment>
                  ),
                }}
                color={selectFieldColor}
                ref={selectRef}
                inputRef={inputRef}
                {...rest}
              >
                {options && options.length === 0 && <MenuItem></MenuItem>}
                {options &&
                  options.length > 0 &&
                  options.map((item) => (
                    <MenuItem
                      key={`${item.key}`}
                      value={`${item.value}`}
                      disabled={item?.disabled}
                      sx={{ color: item.color }}
                    >
                      {item[labelKey]}
                    </MenuItem>
                  ))}
              </TextField>
            );
          }}
        ></Controller>
      </FormControl>
    </div>
  );
};

export default FormSelectTextField;
