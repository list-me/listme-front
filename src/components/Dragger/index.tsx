/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Form, Input, Tree } from "antd";
import { toast } from "react-toastify";
import { IDraggerProps } from "./Dragger.d";
import { Container, Content, IconContent } from "./styles";
import { ReactComponent as MenuIcon } from "../../assets/menu-small-gray.svg";

import { ReactComponent as TrashIcon } from "../../assets/trash-icon.svg";

// eslint-disable-next-line import/prefer-default-export
export const Dragger: React.FC<IDraggerProps> = ({
  options,
  setOptions = (values: any) => {},
  form,
}) => {
  console.log('options', options)
  useEffect(() => {}, [options]);

  return (
    <Container>
      {options.map((item, index) => {
        const fieldName = `option${index}`;

        return (
          <Content key={fieldName}>
            <Form.Item
              wrapperCol={{ flex: "auto" }}
              label={index + 1}
              name={fieldName}
              rules={[
                {
                  message: "A opção deve conter até 15 caracteres",
                  max: 15,
                  required: true,
                  whitespace: true,
                },
              ]}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              initialValue={item}
            >
              <p style={{ display: "none" }}>{item}</p>
              <Input
                value={item}
                onChange={(e) => {
                  const updatedOptions = [...options];
                  updatedOptions[index] = e.target.value;
                  setOptions(updatedOptions);
                  form.setFieldsValue({ [fieldName]: e.target.value });
                }}
                onPressEnter={(e) => {
                  form
                    .validateFields([fieldName])
                    .then(() => {
                      if (options.length === 12) {
                        toast.warn(
                          "Este campo não pode conter mais que 12 opções",
                        );
                        return;
                      }

                      setOptions([...options, ""]);
                    })
                    .catch((errors: any) => {
                      console.log("Errors in form: ", errors);
                    });
                }}
                autoFocus={index === options.length - 1}
              />
            </Form.Item>
            <IconContent
              onClick={() => {
                if (options.length <= 2) {
                  toast.warning("Necessário conter ao menos duas opções");
                  return;
                }

                const newState = [...options];
                newState.splice(index, 1);
                setOptions(newState);
              }}
            >
              <TrashIcon />
            </IconContent>
          </Content>
        );
      })}
    </Container>
  );
};
