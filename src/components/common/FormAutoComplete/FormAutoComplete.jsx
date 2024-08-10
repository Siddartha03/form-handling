import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { CircularProgress, FormControl, styled, useTheme } from "@mui/material";
import useDebounce from "../../../customHooks/useDebounce";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Custom styled component to handle chip overflow
const ChipContainer = styled("div")({
  display: "flex",
  flexWrap: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const FormAutoComplete = React.memo(
  ({
    name,
    rules,
    fullWidth,
    className,
    label,
    labelKey = "label",
    size,
    options,
    totalCount,
    handleFetchNext = () => {},
    resetSearch = () => {},
    multiple,
    isAsterisk,
    limitTags = 1,
    onSelectionChange = () => {},
    loading = false,
    open,
    setOpen = () => {},
    ...rest
  }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    const { getFieldState } = control;
    const [searchUsers, setSearchUsers] = useState("");
    const theme = useTheme();

    const fetchNext = useCallback(() => {
      if (options?.length < totalCount) {
        const offset = options?.length;
        handleFetchNext(searchUsers, offset);
      }
    }, [options, totalCount, handleFetchNext, searchUsers]);

    // useEffect(() => {
    //   if ((searchUsers && searchUsers?.length > 2) || searchUsers == '') {
    //     resetSearch(searchUsers);
    //   }
    // }, [searchUsers]);

    const debounceSearch = useDebounce(searchUsers, 400);

    useEffect(() => {
      handleFetchNext(searchUsers, 0);
    }, [debounceSearch]);

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
            const { invalid, error } = getFieldState(name);
            // Ensure value is an array when multiple is true
            const normalizedValue = multiple ? (Array.isArray(value) ? value : []) : value ?? "";

            return (
              <Autocomplete
                id="checkboxes-tags-demo"
                multiple={multiple}
                name={name}
                size={size}
                autoComplete
                options={options || []}
                disableCloseOnSelect={multiple}
                limitTags={limitTags}
                label={`${label ?? ""}${isAsterisk ? "*" : ""}`}
                value={normalizedValue}
                sx={{
                  "& .MuiAutocomplete-clearIndicator": {
                    color: theme.palette.grey.P1000,
                  },
                  "& .MuiAutocomplete-tag": {
                    maxWidth: "calc(100% - 30px)",
                  },
                }}
                onChange={(e, val) => {
                  !multiple && setSearchUsers("");
                  onChange(val);
                  onSelectionChange(e, val);
                }}
                inputValue={searchUsers}
                onInputChange={(event, newInputValue, reason) => {
                  if (!multiple || reason === "input") {
                    setSearchUsers(newInputValue);
                  }
                }}
                error={error ? error.message : undefined}
                aria-invalid={invalid ? "true" : "false"}
                loading={loading}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                  !options.length && setSearchUsers("");
                }}
                ListboxProps={{
                  style: {
                    maxHeight: "300px",
                    border: "secondary",
                    fontSize: "14px",
                  },
                  // onScroll: (event) => {
                  //   const listboxNode = event.currentTarget;
                  //   if (
                  //     listboxNode.scrollTop + listboxNode.clientHeight + 10 >=
                  //     listboxNode.scrollHeight
                  //   ) {
                  //     fetchNext();
                  //   }
                  // },
                }}
                renderOption={(props, option, { selected }) => {
                  const { ...optionProps } = props;
                  const key = option.id || option[labelKey];
                  return (
                    <li key={key} {...optionProps}>
                      {multiple ? (
                        <>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option[labelKey]}
                        </>
                      ) : (
                        option[labelKey]
                      )}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color="secondary"
                    label={`${label ?? ""}${isAsterisk ? "*" : ""}`}
                    error={error ? true : false}
                    aria-invalid={invalid ? "true" : "false"}
                    helperText={error?.message}
                    InputProps={{
                      ...params.InputProps,
                      // type: multiple ? 'search' : 'text',
                      type: "text",
                      endAdornment: (
                        <Fragment>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      ),
                    }}
                  />
                )}
                {...rest}
              />
            );
          }}
        ></Controller>
      </FormControl>
    );
  }
);

export default FormAutoComplete;
