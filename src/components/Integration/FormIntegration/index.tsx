import { IFieldsByID } from "../../../pages/companyIntegration/companyIntegration";
import DefaultForm from "./DefaultForm";

function FormIntegration({ data }: { data: IFieldsByID }): JSX.Element {
  return (
    <DefaultForm
      leftColumnName="Propriedades de payloads Nexaas"
      centerColumnName="Catálogo ListMe"
      rightColumnName="Campo ListMe"
      dataForm={data}
    />
  );
}

export default FormIntegration;
