import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { theme } from 'styles';

interface IValueProps extends HTMLAttributes<HTMLInputElement> {
  title: HTMLInputElement['title'];
  maxLength?: number;
  max?: number;
  min?: number;
  placeholder?: string;
  readOnly?: boolean;
  type?: 'text' | 'number' | 'email' | 'password';
  value: string;
}

function Value(props: IValueProps) {
  const { type = 'text', ...restProps } = props;
  return <StyledInput type={type} {...restProps} />;
}

export default Value;

const StyledInput = styled.input`
  width: 100%;
  color: ${theme.white};

  ::placeholder {
    color: ${theme.white};
  }

  :focus {
    ::-webkit-input-placeholder,
    textarea:focus::-webkit-input-placeholder {
      /* WebKit browsers */
      color: transparent;
    }

    :-moz-placeholder,
    textarea:focus:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: transparent;
    }

    ::-moz-placeholder,
    textarea:focus::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: transparent;
    }

    :-ms-input-placeholder,
    textarea:focus:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: transparent;
    }
  }

  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  [type='number'] {
    -moz-appearance: textfield;
  }
`;
