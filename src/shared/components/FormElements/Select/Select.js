import SelectComponent from "react-select";
import { Controller } from "react-hook-form";
import "./Select.css";

const Select = props => {
  const {
    name,
    options,
    label,
    error,
    isMulti,
    placeholder = "Select...",
  } = props;
  return (
    <div
      className={`select-form-control ${
        error && "select-form-control--invalid"
      }`}
    >
      <label>{label}</label>
      <Controller
        control={props.control}
        name={name}
        render={({ field: { value, onChange } }) => {
          return isMulti ? (
            <SelectComponent
              options={options}
              isMulti
              value={value}
              className="react-select-container"
              classNamePrefix="react-select"
              onChange={onChange}
              placeholder={placeholder}
            />
          ) : (
            <SelectComponent
              className="react-select-container"
              classNamePrefix="react-select"
              options={options}
              value={options.find(c => c.value === value)}
              onChange={val => onChange(val.value)}
              placeholder={placeholder}
            />
          );
        }}
      />

      <p>{error}</p>
    </div>
  );
};

export default Select;
