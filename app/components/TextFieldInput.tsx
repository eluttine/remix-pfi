import React from "react";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
};

export const TextFieldInput = (props: Props) => {
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control">
        <input
          className="input"
          type="text"
          name={props.name}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
};
