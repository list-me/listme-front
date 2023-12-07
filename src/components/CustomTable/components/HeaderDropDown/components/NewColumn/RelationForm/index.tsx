import React, { useEffect, useState } from "react";
import { Radio, RadioChangeEvent, Select, Space } from "antd";
import { toast } from "react-toastify";
import { Content, CustomNumber, Loader } from "./styles";
import { IPropsRelationForm, RelationOptions, Mapping } from "./RelationForm.d";
import { templateRequests } from "../../../../../../../services/apis/requests/template";

// eslint-disable-next-line import/prefer-default-export
export function RelationForm({
  value,
  handleChangeOptions,
}: IPropsRelationForm): JSX.Element {
  const OPTIONS_TEMPLATE = {
    OTHER: "Outro Catálogo",
    SAME: "Mesmo Catálogo",
  };

  const OPTIONS_AGREEMENT = {
    BILATERAL: "bilateral",
    UNILATERAL: "unilateral",
  };

  const getLimit = (options?: any): string => {
    return options ? options[0].limit : "1";
  };

  const getAgreementType = (options?: any): string => {
    return options ? options[0].agreementType : "unilateral";
  };

  const getCurrentField = (options?: any): string => {
    return options ? options[0].field : "";
  };

  const getCurrentOriginField = (options?: any): string => {
    return options ? options[0].originField : "";
  };

  const getTemplateRelation = (options?: any): string => {
    if (options) {
      return options[0].templateId == window.location.pathname.substring(10)
        ? OPTIONS_TEMPLATE.SAME
        : OPTIONS_TEMPLATE.OTHER;
    }

    return OPTIONS_TEMPLATE.SAME;
  };

  const getTemplateId = (options?: any): string => {
    return options && options[0].templateId ? options[0].templateId : "";
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
  const [fieldId, setFieldId] = useState<string>(
    getCurrentField(value.options),
  );

  const [originFieldId, setOriginFieldId] = useState<string>(
    getCurrentOriginField(value?.options),
  );

  const [templateId, setTemplateId] = useState<string>(
    getTemplateId(value.options),
  );

  const [isEdit, setIsEdit] = useState<boolean>(Object.keys(value).length > 1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleState = (e: RadioChangeEvent) => {
    const currentValue = e.target.value;

    if (!template.length) {
      setTemplateId("");

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

    setTemplateRelation(currentValue);
  };

  const handleChangeTemplate = async (
    currentTemplateId: string,
  ): Promise<void> => {
    setIsLoading(true);
    try {
      templateRequests.get(currentTemplateId).then((temp) => {
        const customFields = temp.fields.fields
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
    if (value.options) {
      setFieldId(value.options[0].field);
    }

    if (value && Object.keys(value).length > 1) {
      const currentOptions = value.options[0] as unknown as RelationOptions;
      setLimit(currentOptions.limit);

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
          setTemplateId(window.location.pathname.substring(10));
        });
    }
  }, []);

  useEffect(() => {
    if (!isEdit) {
      if (templateRelation == OPTIONS_TEMPLATE.SAME) {
        setAgreementType(OPTIONS_AGREEMENT.UNILATERAL);
        setTemplateId(window.location.pathname.substring(10));
      } else {
        setTemplateId("");
      }
    }
  }, [templateRelation]);

  return (
    <Content>
      <div>
        <div className="section">
          <label className="label">Relacionar com:</label>
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
            <div className="selectCatalog">
              <label className="label">Selecione o catálogo</label>
              <Select
                style={{
                  height: "30px",
                  border: "1px solid #DEE2E6",
                }}
                onChange={(e: string) => {
                  handleChangeTemplate(e);
                  const current = {
                    limit,
                    field: fieldId,
                    originField: originFieldId,
                    agreementType,
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
                    limit,
                    field: e,
                    originField: originFieldId,
                    agreementType,
                    templateId,
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
          <CustomNumber
            min={1}
            max={9999}
            defaultValue={limit}
            onChange={(e) => {
              if (e) {
                setLimit(e);
                const current = {
                  limit: e,
                  field: fieldId,
                  originField: originFieldId,
                  agreementType,
                  templateId,
                };
                handleChangeOptions(current);
              }
            }}
            controls
            bordered
          />
        </div>
        {isLoading ? (
          <Loader className="lds-roller">
            <div className="loading-spinner" />
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
                    limit,
                    field: e,
                    originField: e,
                    agreementType,
                    templateId,
                  };
                  handleChangeOptions(current);
                }
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
              limit,
              field: fieldId,
              originField: originFieldId,
              agreementType: e.target.value,
              templateId,
            };
            handleChangeOptions(current);
          }}
          options={Object.values(OPTIONS_AGREEMENT)}
          className="radio-group"
          disabled={templateRelation == OPTIONS_TEMPLATE.SAME || isEdit}
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
}
