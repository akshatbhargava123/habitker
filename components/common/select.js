import { Button, RadioButtonGroup } from "@chakra-ui/core";

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;
  return (
    <Button
      ref={ref}
      variantColor={isChecked ? "blue" : "gray"}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      {...rest}
    />
  );
});

const Select = ({
  placeholder,
  defaultValue,
  options,
  onChange,
  inline = true,
  className = '',
}) => {
	return (
    <RadioButtonGroup
			isInline={inline}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      defaultValue={defaultValue}
    >
      {options.map((option, key) => (
				<CustomRadio
					key={key}
					value={option.value}
				>
					{option.label}
				</CustomRadio>
			))}
    </RadioButtonGroup>
	);
};

export default Select;
