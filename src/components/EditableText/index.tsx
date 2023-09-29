/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { InputEditable, SpanEditable, TitleEditable } from "./styles";
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
  const { template } = useProductContext();
  const [text, setText] = useState<string>(initialContent);
  const ref = useRef<HTMLDivElement | null>(null);
  const hiddenSpanRef = useRef<HTMLParagraphElement | null>(null);
  const refInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    }
    if (hiddenSpanRef.current) {
      ref.current!.style.width = `${hiddenSpanRef.current.offsetWidth}px`;
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [text, isEditing, setIsEditing]);

  useEffect(() => {
    if (isEditing) {
      refInput.current?.focus();
    }
  }, [isEditing]);

  function updateTitle(): void {
    try {
      templateRequests.update(template.id, { name: text });
      toast.success("Template atualizado com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar template");
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") {
      event.preventDefault();
      setIsEditing(false);
    }
  }

  return (
    <div ref={ref}>
      {isEditing ? (
        <>
          <InputEditable
            ref={refInput}
            type="text"
            value={text}
            onChange={(e) =>
              setText(() => {
                if (e.target.value === "") return initialContent;
                return e.target.value;
              })
            }
            onBlur={() => {
              setIsEditing(false);
              updateTitle();
            }}
            // eslint-disable-next-line react/jsx-no-bind
            onKeyDown={handleKeyDown}
          />
          <SpanEditable
            ref={hiddenSpanRef}
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
        <TitleEditable onClick={() => setIsEditing(true)}>{text}</TitleEditable>
      )}
    </div>
  );
}

export default EditableText;
