import React, { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const FormSelectField = React.memo(
  ({
    name,
    rules,
    fullWidth,
    className,
    required = false,
    size,
    options,
    color = "secondary",
    label,
    labelKey = "label",
    isAsterisk,
    removeBorderAndOutline = false,
    selectedTextColor = "",
    variant = "standard",
    disabled,
    onSelectionChange = () => {},
    ...rest
  }) => {
    const {
      control,
      formState: { errors },
      trigger,
    } = useFormContext();
    const { getFieldState } = control;
    const [menuOpen, setMenuOpen] = useState(false);
    const theme = useTheme();
    const { mode } = theme.palette;

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
            const { invalid, error } = getFieldState(name);
            return (
              <TextField
                select
                name={name}
                required={required}
                value={value == null ? "" : value}
                onChange={(e) => {
                  onChange(e);
                  onSelectionChange(e);
                  trigger(name);
                }}
                disabled={disabled}
                onBlur={onBlur}
                error={error ? true : false}
                aria-invalid={invalid ? "true" : "false"}
                helperText={error?.message}
                size={size}
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment
                //       position="end"
                //       sx={{ cursor: 'pointer' }}
                //       onClick={handleArrowClick}
                //     >
                //       <IconButton
                //         size="small"
                //         sx={{
                //           p: '2px',
                //         }}
                //       >
                //         {menuOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                //       </IconButton>
                //     </InputAdornment>
                //   ),
                // }}
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
                color={color}
                label={`${label ?? ""}${isAsterisk ? "*" : ""}`}
                {...rest}
                ref={selectRef}
                inputRef={inputRef}
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
    );
  }
);
export default FormSelectField;
