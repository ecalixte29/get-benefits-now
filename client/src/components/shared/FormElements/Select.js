import React from "react";
import PropTypes from "prop-types";

const Select = ({
  label,
  options,
  id,
  onChange,
}) => {
  return (
    <div kev={id} className="relative mb-5">
      <label class="block text-gray-700 text-base font-bold mb-2" for="year">
        {label}
      </label>
      <select
        class="block appearance-none w-full bg-white border-light focus:border-light ring-0 focus:ring-0 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline shadow-md"
        id="year"
        onChange={onChange}
      >
        {options.map(option => (
            <option>{option}</option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Select;
