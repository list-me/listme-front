import React, { useEffect, useState } from "react";
import { CustomRadio } from "../../Radio";
import { Checkbox, Form, Radio, RadioChangeEvent, Select, Space } from "antd";
import { Content } from "./styles";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import {
  IPropsRelationForm,
  RelationOptions,
  Template,
} from "./RelationForm.d";
import { templateRequests } from "../../../services/apis/requests/template";

export const RelationForm: React.FC<IPropsRelationForm> = ({
  value,
  templateName,
}) => {
  const OPTIONS_TEMPLATE = {
    OTHER: "Outro Catálogo",
    SAME: "Mesmo Catálogo",
  };

  const OPTIONS_AGREEMENT = {
    FOR_ONE: {
      label: "Entre um produto",
      value: "oneToOne",
    },
    FOR_MORE: {
      label: "Entre muitos",
      value: "manyToMany",
    },
  };

  const getMapping = (options?: any): string => {
    return options ? options[0]["mappingType"] : "oneToOne";
  };
  const [template, setTemplate] = useState<Template[]>([]);
  const [templateRelation, setTemplateRelation] = useState<string>(
    OPTIONS_TEMPLATE.SAME,
  );
  const [agreementType, setAgreementType] = useState<any>(
    getMapping(value?.options),
  );
  const [mappingType, setMappingType] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(Object.keys(value).length > 1);
  const [field, setField] = useState<any>("");

  const handleState = (e: RadioChangeEvent) => {
    const { value } = e.target;

    if (OPTIONS_TEMPLATE.OTHER && !template.length) {
      templateRequests.list({ limit: 100 }).then((resolve) => {
        console.log({ resolve });
        const data = resolve as Array<any>;
        const templates = data.map((e) => {
          return { value: e.id, label: e.name };
        });

        setTemplate(templates);
      });
    }

    setTemplateRelation(value);
  };

  const options = ["Mesmo Catálogo", "Outro Catálogo"];

  const fields = [
    {
      label: "Option",
      value: "1",
    },
    {
      label: "Option",
      value: "2",
    },
    {
      label: "Option1",
      value: "3",
    },
    {
      label: "Option2",
      value: "4",
    },
    {
      label: "Option3",
      value: "5",
    },
    {
      label: "Option4",
      value: "6",
    },
    {
      label: "Option5",
      value: "7",
    },
    {
      label: "Option6",
      value: "8",
    },
    {
      label: "Option7",
      value: "9",
    },
    {
      label: "Option8",
      value: "20",
    },
    {
      label: "Option9",
      value: "21",
    },
    {
      label: "Option",
      value: "11",
    },
    {
      label: "Option4",
      value: "22",
    },
    {
      label: "Option5",
      value: "23",
    },
    {
      label: "Option6",
      value: "24",
    },
  ];

  useEffect(() => {
    if (value && Object.keys(value).length > 1) {
      console.log({ value });
      const mapping = value.options[0] as unknown as RelationOptions;
      console.log({ mapping });
      setMappingType(mapping.mappingType);
    }
  }, []);

  return (
    <Content>
      <div>
        <div className="section">
          <label className="label">Relacionar com</label>
          <Radio.Group
            buttonStyle="solid"
            value={templateRelation}
            onChange={handleState}
            options={options}
            className="radio-group"
            disabled={isEdit}
          >
            <Space direction="vertical">
              {options.map((option: string) => {
                return (
                  <Radio.Button key={Math.random()} value={option}>
                    {option}
                  </Radio.Button>
                );
              })}
            </Space>
          </Radio.Group>
        </div>
        {templateRelation == "Outro Catálogo" ? (
          <div className="selectContainer">
            <label className="label">Selecione o catálogo</label>
            <Form.Item
              name="type"
              rules={[{ required: true, message: "Escolha o tipo de valor" }]}
            >
              <Select
                style={{
                  height: "30px",
                  border: "1px solid #DEE2E6",
                }}
                onChange={(e: string) => {
                  console.log({ e });
                }}
                placeholder="Seleciones o template"
              >
                {template.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.label}>
                      {" "}
                      {item.label}{" "}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
        ) : (
          <></>
        )}
        <div className="section">
          <label className="label">Tipo de Relacionamento</label>
          <Radio.Group
            buttonStyle="solid"
            defaultValue="oneToOne"
            value={agreementType}
            onChange={(e) => setAgreementType(e.target.value)}
            options={Object.values(OPTIONS_AGREEMENT)}
            className="radio-group"
            disabled={isEdit}
          >
            <Space>
              {Object.values(OPTIONS_AGREEMENT).map((option) => {
                return (
                  <Radio.Button key={Math.random()} value={option}>
                    {option.label}
                  </Radio.Button>
                );
              })}
            </Space>
          </Radio.Group>
        </div>
        <div className="selectContainer">
          <label className="label">Relacionar com</label>
          <Form.Item
            name="type"
            rules={[{ required: true, message: "Escolha o tipo de valor" }]}
          >
            <Select
              style={{
                height: "30px",
                border: "1px solid #DEE2E6",
              }}
              //   onChange={(e: string) => {
              //     setField(e);
              //   }}
              placeholder="Informe o nome do campo"
              disabled={isEdit}
            >
              {fields.map((item, index) => {
                return (
                  <Select.Option key={index} value={item.value}>
                    {" "}
                    {item.label}{" "}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
      </div>
      <div className="section">
        <label className="label">Tipo de vinculo</label>
        <Radio.Group
          buttonStyle="solid"
          value={mappingType}
          onChange={(e) => setMappingType(e.target.value)}
          options={["Bilateral", "Unilateral"]}
          className="radio-group"
          disabled={isEdit}
        >
          <Space>
            {options.map((option: string) => {
              return (
                <Radio.Button key={Math.random()} value={option}>
                  {option}
                </Radio.Button>
              );
            })}
          </Space>
        </Radio.Group>
      </div>
    </Content>
  );
};
