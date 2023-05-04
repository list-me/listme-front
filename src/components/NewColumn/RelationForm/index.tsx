import React, { useEffect, useState } from "react";
import { Radio, RadioChangeEvent, Select, Space } from "antd";
import { Content, Loader } from "./styles";
import { IPropsRelationForm, RelationOptions, Mapping } from "./RelationForm.d";
import { templateRequests } from "../../../services/apis/requests/template";
import { toast } from "react-toastify";

export const RelationForm: React.FC<IPropsRelationForm> = ({
  value,
  currentFields,
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

  const getMappingType = (options?: any): string => {
    return options ? options[0]["mappingType"] : "oneToOne";
  };

  const getCurrentField = (options?: any): string => {
    return options ? options[0]["field"] : "";
  };

  const getTemplateRelation = (options?: any): string => {
    return options &&
      options[0]["templateId"] == window.location.pathname.substring(10)
      ? OPTIONS_TEMPLATE.SAME
      : OPTIONS_TEMPLATE.OTHER;
  };

  const getTemplateId = (options?: any): string => {
    return options && options[0]["templateId"] ? options[0]["templateId"] : "";
  };

  const [template, setTemplate] = useState<Mapping[]>([]);
  const [fields, setFields] = useState<Mapping[]>([]);
  const [templateRelation, setTemplateRelation] = useState<string>(
    getTemplateRelation(value.options),
  );
  const [agreementType, setAgreementType] = useState<any>(
    getMappingType(value?.options),
  );
  const [mappingType, setMappingType] = useState<string>("");
  const [fieldId, setFieldId] = useState<string>(
    getCurrentField(value?.options),
  );
  const [templateId, setTemplateId] = useState<string>(
    getTemplateId(value.options),
  );

  const [isEdit, setIsEdit] = useState<boolean>(Object.keys(value).length > 1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleState = (e: RadioChangeEvent) => {
    const { value } = e.target;

    if (OPTIONS_TEMPLATE.OTHER && !template.length) {
      templateRequests.list({ limit: 100 }).then((resolve) => {
        const data = resolve as Array<any>;
        const templates = data.map((e) => {
          return { value: e.id, label: e.name };
        });

        setTemplate(templates);
      });
    }

    setTemplateRelation(value);
  };

  const handleChangeTemplate = async (templateId: string): Promise<void> => {
    setIsLoading(true);
    try {
      templateRequests.get(templateId).then((template) => {
        const customFields = template.fields.fields
          .filter((e: any) => e.type !== "relation")
          .map((field: any) => {
            return {
              value: field.id,
              label: field.title,
            };
          });

        setFields(customFields);
      });

      setIsLoading(false);
      setTemplateId(templateId);
    } catch (error) {
      setIsLoading(false);
      toast.error("Ocorreu um erro ao carregar os campos deste catálogo");
    }
  };

  const options = ["Mesmo Catálogo", "Outro Catálogo"];

  useEffect(() => {
    if (value && Object.keys(value).length > 1) {
      const options = value.options[0] as unknown as RelationOptions;
      setMappingType(options.mappingType);

      if (getTemplateRelation(value?.options) === OPTIONS_TEMPLATE.OTHER) {
        handleChangeTemplate(getTemplateId(value.options)).then();
        if (!template.length) {
          templateRequests.list({ limit: 100 }).then((resolve) => {
            const data = resolve as Array<any>;
            const templates = data.map((e) => {
              return { value: e.id, label: e.name };
            });

            setTemplate(templates);
          });
        }
      }
    } else {
      templateRequests
        .get(window.location.pathname.substring(10))
        .then((template) => {
          const customFields = template.fields.fields
            .filter((e: any) => e.type !== "relation")
            .map((field: any) => {
              return {
                value: field.id,
                label: field.title,
              };
            });

          setFields(customFields);
        });
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
            <Select
              style={{
                height: "30px",
                border: "1px solid #DEE2E6",
              }}
              onChange={handleChangeTemplate}
              placeholder="Seleciones o template"
              defaultValue={template.find((e) => e.value == templateId)?.value}
              value={templateId}
              disabled={isEdit}
            >
              {template.map((item, index) => {
                return (
                  <Select.Option key={index} value={item.value}>
                    {" "}
                    {item.label}{" "}
                  </Select.Option>
                );
              })}
            </Select>
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
        {isLoading ? (
          <Loader className="lds-roller">
            <div className="loading-spinner"></div>
          </Loader>
        ) : (
          <div className="selectContainer">
            <label className="label">Relacionar com</label>
            {/* <Form.Item
              name="type"
              rules={[{ required: true, message: "Escolha o tipo de valor" }]}
            > */}
            <Select
              style={{
                height: "30px",
                border: "1px solid #DEE2E6",
              }}
              onChange={(e: string) => {
                // setField(e);
                console.log({ e });
              }}
              defaultValue={fields.find((e) => e.value == fieldId)?.value}
              placeholder="Escolha uma coluna"
              disabled={isEdit}
              value={fieldId}
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
            {/* </Form.Item> */}
          </div>
        )}
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
