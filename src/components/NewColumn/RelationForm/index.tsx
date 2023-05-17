import React, { useContext, useEffect, useState } from "react";
import { InputNumber, Radio, RadioChangeEvent, Select, Space } from "antd";
import { Content, Loader } from "./styles";
import { IPropsRelationForm, RelationOptions, Mapping } from "./RelationForm.d";
import { templateRequests } from "../../../services/apis/requests/template";
import { toast } from "react-toastify";
import { productContext } from "../../../context/products";

export const RelationForm: React.FC<IPropsRelationForm> = ({
  value,
  currentFields,
  handleChangeOptions,
}) => {
  console.log({ value });

  const OPTIONS_TEMPLATE = {
    OTHER: "Outro Catálogo",
    SAME: "Mesmo Catálogo",
  };

  const OPTIONS_MAPPING = {
    FOR_ONE: {
      label: "Entre um produto",
      value: "oneToOne",
    },
    FOR_MORE: {
      label: "Entre muitos",
      value: "manyToMany",
    },
  };

  const OPTIONS_AGREEMENT = {
    BILATERAL: "bilateral",
    UNILATERAL: "unilateral",
  };

  const getLimit = (options?: any): string => {
    return options ? options[0]["limit"] : "1";
  };

  const getAgreementType = (options?: any): string => {
    return options ? options[0]["agreementType"] : "unilateral";
  };

  const getCurrentField = (options?: any): string => {
    console.log({ options });
    if (options) {
      console.log("entrou");
      // const type =
      //   options[0]["templateId"] == window.location.pathname.substring(10)
      //     ? OPTIONS_TEMPLATE.SAME
      //     : OPTIONS_TEMPLATE.OTHER;

      // if (type == OPTIONS_TEMPLATE.SAME) {
      //   return options[0]["originField"];
      // }

      console.log("valor", options[0]["field"]);
      return options[0]["field"];
    }

    return "";
  };

  const getCurrentOriginField = (options?: any): string => {
    return options ? options[0]["originField"] : "";
  };

  const getTemplateRelation = (options?: any): string => {
    if (options) {
      return options[0]["templateId"] == window.location.pathname.substring(10)
        ? OPTIONS_TEMPLATE.SAME
        : OPTIONS_TEMPLATE.OTHER;
    }

    return OPTIONS_TEMPLATE.SAME;
  };

  const getTemplateId = (options?: any): string => {
    return options && options[0]["templateId"] ? options[0]["templateId"] : "";
  };

  const [template, setTemplate] = useState<Mapping[]>([]);
  const [fields, setFields] = useState<Mapping[]>([]);
  const [originFields, setOriginFields] = useState<Mapping[]>([]);

  const [templateRelation, setTemplateRelation] = useState<string>(
    getTemplateRelation(value.options),
  );
  const [agreementType, setAgreementType] = useState<string>(
    getAgreementType(value.options),
  );
  const [limit, setLimit] = useState<string | number>(getLimit(value?.options));
  const [fieldId, setFieldId] = useState<string>(value.options[0].field);

  console.log({ fieldId });

  const [originFieldId, setOriginFieldId] = useState<string>(
    getCurrentOriginField(value?.options),
  );

  const [templateId, setTemplateId] = useState<string>(
    getTemplateId(value.options),
  );

  const [isEdit, setIsEdit] = useState<boolean>(Object.keys(value).length > 1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleState = (e: RadioChangeEvent) => {
    const { value } = e.target;

    if (OPTIONS_TEMPLATE.OTHER && !template.length) {
      const current = window.location.pathname.substring(10);
      templateRequests.list({ limit: 100 }).then((resolve) => {
        const data = resolve as Array<any>;
        const templates = data
          .map((e) => {
            return { value: e.id, label: e.name };
          })
          .filter((e) => e.value !== current);

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
        // setFieldId("");
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
    setFieldId(value.options[0].field);
    if (value && Object.keys(value).length > 1) {
      const options = value.options[0] as unknown as RelationOptions;
      setLimit(options.limit);

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

          setOriginFields(customFields);
        });
    }
  }, []);

  useEffect(() => {
    if (templateRelation == OPTIONS_TEMPLATE.SAME) {
      setAgreementType(OPTIONS_AGREEMENT.UNILATERAL);
    }
  }, [templateRelation]);

  return (
    <Content>
      <div>
        <div className="section">
          <label className="label">Selecione o Catálogo</label>
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
          <div className="containerFields">
            <div className="selectContainer">
              <label className="label">Selecione o catálogo</label>
              <Select
                style={{
                  height: "30px",
                  border: "1px solid #DEE2E6",
                }}
                onChange={(e: string) => {
                  handleChangeTemplate(e);
                  const current = {
                    limit: limit,
                    field: fieldId,
                    originField: originFieldId,
                    agreementType: agreementType,
                    templateId: e,
                  };
                  handleChangeOptions(current);
                }}
                placeholder="Seleciones o template"
                defaultValue={
                  template.find((e) => e.value == templateId)?.value
                }
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
            <div className="selectField">
              <span className="label">Atributo para exibição</span>
              <Select
                style={{
                  height: "30px",
                  border: "1px solid #DEE2E6",
                }}
                onChange={(e: string) => {
                  setFieldId(e);
                  const current = {
                    limit: limit,
                    field: e,
                    originField: originFieldId,
                    agreementType: agreementType,
                    templateId: templateId,
                  };
                  handleChangeOptions(current);
                }}
                defaultValue={
                  fields.find((e) => e.value == fieldId)?.value
                    ? fields.find((e) => e.value == fieldId)?.value
                    : ""
                }
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
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="section">
          <label className="label">Número máximo de vínculos</label>
          <InputNumber
            min={1}
            max={999}
            defaultValue={limit}
            onChange={(e) => {
              if (e) {
                setLimit(e);

                console.log({ fieldId });

                const current = {
                  limit: e,
                  field: fieldId,
                  originField: originFieldId,
                  agreementType: agreementType,
                  templateId: templateId,
                };
                handleChangeOptions(current);
              }
            }}
            controls
            bordered
          />
          {/* <Radio.Group
            buttonStyle="solid"
            // defaultValue="oneToOne"
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
              handleChangeOptions({ limit: e.target.value });
            }}
            options={Object.values(OPTIONS_MAPPING)}
            className="radio-group"
            disabled={isEdit}
          >
            <Space>
              {Object.values(OPTIONS_MAPPING).map((option) => {
                return (
                  <Radio.Button key={Math.random()} value={option}>
                    {option.label}
                  </Radio.Button>
                );
              })}
            </Space>
          </Radio.Group> */}
        </div>
        {isLoading ? (
          <Loader className="lds-roller">
            <div className="loading-spinner"></div>
          </Loader>
        ) : (
          <div className="selectField">
            <label className="label">Atributo do catálogo atual</label>
            <Select
              style={{
                height: "30px",
                border: "1px solid #DEE2E6",
              }}
              onChange={(e: string) => {
                setOriginFieldId(e);

                if (templateRelation == OPTIONS_TEMPLATE.SAME) {
                  setFieldId(e);
                  const current = {
                    limit: limit,
                    field: e,
                    originField: originFieldId,
                    agreementType: agreementType,
                    templateId: templateId,
                  };
                  handleChangeOptions(current);
                }

                const current = {
                  limit: limit,
                  field: fieldId,
                  originField: e,
                  agreementType: agreementType,
                  templateId: templateId,
                };
                handleChangeOptions(current);
              }}
              defaultValue={
                originFields.find((e) => e.value == originFieldId)?.value
                  ? originFields.find((e) => e.value == originFieldId)?.value
                  : ""
              }
              placeholder="Escolha uma coluna"
              disabled={isEdit}
              value={originFieldId}
            >
              {originFields.map((item, index) => {
                return (
                  <Select.Option key={index} value={item.value}>
                    {" "}
                    {item.label}{" "}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
        )}
      </div>
      <div className="section">
        <label className="label">Tipo de vinculo</label>
        <Radio.Group
          buttonStyle="solid"
          // defaultValue={agreementType}
          value={agreementType}
          onChange={(e) => {
            setAgreementType(e.target.value);
            const current = {
              limit: limit,
              field: fieldId,
              originField: originFieldId,
              agreementType: e.target.value,
              templateId: templateId,
            };
            handleChangeOptions(current);
          }}
          options={Object.values(OPTIONS_AGREEMENT)}
          className="radio-group"
          disabled={isEdit}
        >
          <Space>
            {Object.values(OPTIONS_AGREEMENT).map((option: string) => {
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
