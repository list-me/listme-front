/* eslint-disable */

import { Form } from "antd";
import { ok } from "assert";
import { debounce } from "lodash";
import { useContext, useEffect, useRef, useState } from "react";
import { productContext } from "../../context/products";

import { IInputProps } from "./Input.d";
import { Container, Label, InputCustom } from "./styles";

interface InputRef extends HTMLInputElement {
  input: any; // ou outro tipo específico
}

export const Input: React.FC<IInputProps> = ({
  label,
  name,
  type,
  value,
  autoFocus,
  width,
  height,
  bordered = false,
  handleCustomChange,
  placeholder,
  background,
  validation,
  padding,
  onPressEnter = () => {},
}) => {
  const [inputText, setInputText] = useState<string>("");
  const { handleFilter } = useContext(productContext);
  const inputRef = useRef<InputRef | null>(null);

  const validateExactWord = (rule: any, word: any) => {
    if (validation?.matchWord) {
      if (word && word.trim() === validation.matchWord) {
        return Promise.resolve();
      }
      return Promise.reject(
        Error(`Digite ${validation.matchWord} para prosseguir`),
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "f") {
        event.preventDefault();
        inputRef.current!.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Container>
      {label?.length ? (
        <Label>
          <span>
            {label}{" "}
            <span style={{ color: "red", fontWeight: 700 }}> "excluir" </span>
          </span>
        </Label>
      ) : null}
      <Form.Item
        className="formInput"
        name={name}
        rules={[{ validator: validateExactWord }]}
      >
        <InputCustom
          ref={inputRef}
          style={{ height: height ?? "35px", width }}
          placeholder={placeholder}
          type={type}
          name={name}
          custom={{ background, bordered, padding }}
          value={value ?? inputText}
          autoComplete="off"
          onChange={(e) => {
            const newValue = e.target.value;
            setInputText(newValue);

            if (handleCustomChange) handleCustomChange(newValue);
          }}
          autoFocus={autoFocus}
          onPressEnter={() => onPressEnter()}
        />
      </Form.Item>
    </Container>
  );
};
