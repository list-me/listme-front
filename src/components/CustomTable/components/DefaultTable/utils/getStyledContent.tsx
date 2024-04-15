import { renderToString } from "react-dom/server";
import { ReactComponent as DropDownIconSmall } from "../../../../../assets/chevron-down-small.svg";
import logoShop from "../../../../../assets/images/logoShop.png";
import logoNexaas from "../../../../../assets/images/logoNexass2.png";

const svgStringDropDownSmall: string = renderToString(<DropDownIconSmall />);

const BASE_STYLES = `
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 51px;
  padding: 0 1.5rem;
  font-family: 'Satoshi Regular';
  `;
const PLUS_BASE_STYLES = `
  display: flex;
  align-items: center;
  justify-content: center;
  height: 51px;
  padding: 0 1.5rem;
  font-family: 'Satoshi Regular';
  `;

const TEXT_STYLE = `
  font-size: 14px;
  color: rgb(134, 142, 150);
  margin: 0;
  text-align: center;
  `;
const PLUS_STYLE = `
  font-size: 30px;
  color: rgb(134, 142, 150);
  margin: 0;
  text-align: center;
  `;

const REQUIRED_STYLE = `
  border: 1px solid rgb(255, 0, 0);
  border-radius: 20px;
  color: rgb(255, 0, 0);
  padding-inline: 7px;
  margin: 0;
  font-size: 12px;
`;

const FLEX_GAP_STYLE = `
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SVG_STYLE = `
  cursor: pointer;
  border: none;
  background: none;
`;

const ICON_STYLE = `
  display: flex;
  align-items: center;
  pointer-events: none;
`;
const REQUIRED_INTEGRATION = `
  height: 32px;
  min-width: 32px;
  background: white;
  border-radius: 50px;
  display: flex;
  gap: 4px;
  padding: 4px;
  align-items: center;
  position: relative;
  z-index: 999999999999999999999999999;
`;
const MORE_REQUIRED_INTEGRATION = `
  height: 24px;
  width: 24px;
  background: #FF6B6B;
  color:#FFFFFF;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const REQUIRED_INTEGRATION_BUTTON = `
  display: flex;
  border: none;
  background: none;
  padding: 0;
`;

const getStyledContent = (
  iconType: any,
  valueToVisible: string,
  isRequired: boolean,
  colData: any,
  editModeGroup: "group" | "ungroup" | "",
  idsColumnsSelecteds: string[],
) => {
  const integrationsList = colData?.integrations;
  const moreNumber = integrationsList - 1;
  const colSelected = idsColumnsSelecteds.includes(colData?.id);

  return `
    <div style="${valueToVisible !== "+" ? BASE_STYLES : PLUS_BASE_STYLES}">
     ${
       valueToVisible !== "+" &&
       editModeGroup &&
       valueToVisible &&
       ((!colData.group && editModeGroup === "group") ||
         (colData.group && editModeGroup === "ungroup"))
         ? `<input class='checkGroup' type="checkbox" ${
             colSelected ? "checked" : ""
           } />`
         : ""
     }
      <div style="${FLEX_GAP_STYLE}">
        ${renderToString(iconType)}
        <p style="${
          valueToVisible !== "+" ? TEXT_STYLE : PLUS_STYLE
        }">${valueToVisible}</p>
      </div>
      <div style="${FLEX_GAP_STYLE}">
        ${isRequired ? `<p style="${REQUIRED_STYLE}">Obrigatório</p>` : ""}
        ${
          valueToVisible && valueToVisible !== "+"
            ? `<button style="${SVG_STYLE}" class="dropDown">
                <div style="${ICON_STYLE}">${svgStringDropDownSmall}</div>
              </button>`
            : ""
        }
        ${
          integrationsList?.length
            ? `<div style="${REQUIRED_INTEGRATION}" >
          <button style="${REQUIRED_INTEGRATION_BUTTON}" class="REQUIRED_INTEGRATION_BUTTON">
            <svg class="REQUIRED_INTEGRATION_BUTTON" xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
              <path d="M10 18C10.9849 18 11.9602 17.806 12.8701 17.4291C13.7801 17.0522 14.6069 16.4997 15.3033 15.8033C15.9997 15.1069 16.5522 14.2801 16.9291 13.3701C17.306 12.4602 17.5 11.4849 17.5 10.5C17.5 9.51509 17.306 8.53982 16.9291 7.62987C16.5522 6.71993 15.9997 5.89314 15.3033 5.1967C14.6069 4.50026 13.7801 3.94781 12.8701 3.5709C11.9602 3.19399 10.9849 3 10 3C8.01088 3 6.10322 3.79018 4.6967 5.1967C3.29018 6.60322 2.5 8.51088 2.5 10.5C2.5 12.4891 3.29018 14.3968 4.6967 15.8033C6.10322 17.2098 8.01088 18 10 18Z" stroke="#FF6B6B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 7.16675H10.0083" stroke="#FF6B6B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.16797 10.5H10.0013V13.8333H10.8346" stroke="#FF6B6B" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
         ${
           integrationsList[0].provider === "nexaas"
             ? `<img src="${logoNexaas}" />`
             : `<img src="${logoShop}" />`
         }

          ${
            moreNumber
              ? `<div  style="${MORE_REQUIRED_INTEGRATION}">+${moreNumber}</div>`
              : ""
          }
        </div>`
            : ""
        }
      </div>
    </div>

  `;
};

export default getStyledContent;
