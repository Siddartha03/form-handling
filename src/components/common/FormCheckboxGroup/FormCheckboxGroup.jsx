import React from 'react';

import { useController, useWatch } from 'react-hook-form';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material';

const FormCheckboxGroup = (props) => {
  const { config, control, label, name, options, rules, ...rest } = props;

  const {
    field: { ref, value, onChange, ...inputProps },
    formState: { errors },
  } = useController({
    name,
    control,
    defaultValue: [],
    rules,
  });

  const selectedCheckboxesArr = useWatch({ control, name: name }) || [];

  const handleChange = (value) => {
    const newArray = [...selectedCheckboxesArr];
    const item = value;
    if (newArray.length > 0) {
      const index = newArray.findIndex((x) => x?.value === item?.value);
      if (index === -1) {
        newArray.push(item);
      } else {
        newArray.splice(index, 1);
      }
    } else {
      newArray.push(item);
    }
    onChange(newArray);
  };

  return (
    <>
      <div>
        <FormControl className={rest?.className}>
          {label && <FormLabel label={label} />}
          <FormGroup>
            {options.map((option, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      value?.length > 0 &&
                      value?.some((checked) => checked?.value === option[config.value])
                    }
                    {...inputProps}
                    inputRef={ref}
                    onChange={() => handleChange(option)}
                    disabled={rest?.disabled}
                  />
                }
                label={<p className="body2">{option[config.label]}</p>}
                key={option[config.value] + index}
              />
            ))}
          </FormGroup>
        </FormControl>
        <FormHelperText error variant="outlined">
          {errors?.[name]?.message || ' '}
        </FormHelperText>
      </div>
    </>
  );
};

export default FormCheckboxGroup;
