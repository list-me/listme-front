/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  InputEditable,
  SpanEditable,
  TitleEditable,
  TitleEditableError,
} from "./styles";
import { useProductContext } from "../../context/products";
import { templateRequests } from "../../services/apis/requests/template";

function EditableText({
  initialContent,
  isEditing,
  setIsEditing,
}: {
  initialContent: string;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [initial, setInitial] = useState(initialContent);
  const { template } = useProductContext();
  const [text, setText] = useState<string>(initialContent);
  const [error, setError] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);
  const refInput = useRef<HTMLInputElement | null>(null);

  const clear = useCallback(() => {
    setError("");
    setText(initial);
    setIsEditing(false);
  }, [setError, setText, setIsEditing, initial]);

  const updateTitle = useCallback(async () => {
    if (initial !== text) {
      try {
        setInitial(text);
        console.log("iuiuiu");
        await templateRequests.update(template.id, { name: text });
        setIsEditing(false);
        toast.success("Template atualizado com sucesso");
      } catch (er: any) {
        toast.error("Erro ao atualizar template");
      }
    } else {
      clear();
    }
  }, [initial, text, template?.id, setIsEditing, clear]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (text?.length < 5) {
        setError("O nome deve ser mais longo ou igual a 5 caracteres.");
      } else if (ref.current && !ref.current.contains(event.target as Node)) {
        updateTitle();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [text, isEditing, setIsEditing, updateTitle]);

  useEffect(() => {
    if (isEditing) {
      refInput.current?.focus();
    }
  }, [isEditing]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      event.preventDefault();
      if (text?.length >= 5) {
        updateTitle();
      } else {
        setError("O nome deve ser mais longo ou igual a 5 caracteres.");
      }
    }
    if (event.key === "Escape") {
      event.preventDefault();
      clear();
    }
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {isEditing ? (
        <>
          <InputEditable
            ref={refInput}
            type="text"
            value={text}
            onChange={(e) => {
              setError("");
              setText(() => e.target.value);
            }}
            // eslint-disable-next-line react/jsx-no-bind
            onKeyDown={handleKeyDown}
            error={error}
          />
          <SpanEditable
            style={{
              visibility: "hidden",
              whiteSpace: "pre",
              position: "absolute",
              minWidth: "0px",
            }}
          >
            {text}
          </SpanEditable>
        </>
      ) : (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <TitleEditable
          onClick={() => {
            setError("");
            setIsEditing(true);
          }}
        >
          {text}
        </TitleEditable>
      )}
      <TitleEditableError>{error}</TitleEditableError>
    </div>
  );
}

export default EditableText;
