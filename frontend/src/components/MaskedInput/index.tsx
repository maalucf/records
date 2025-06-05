import React, { forwardRef } from "react";
import InputMask, { Props as InputMaskProps } from "react-input-mask";
import { Input } from "antd";

// Colocamos um displayName no final para o ESLint não reclamar.
const MaskedInput = forwardRef<HTMLInputElement, InputMaskProps>((props, ref) => {
  return (
    <InputMask
      {...props}
      // Encaminha a ref recebida diretamente para o <input> interno
      inputRef={ref}
    >
      {(inputProps) => (
        // O children de InputMask recebe apenas um argumento, 
        // que já inclui onChange, value, placeholder, mask etc.
        <Input {...inputProps} />
      )}
    </InputMask>
  );
});

// ESLint: “Component definition is missing display name”
MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
