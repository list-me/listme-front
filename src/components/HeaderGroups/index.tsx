import React, { useEffect, useState } from "react";
import {
  ButtonNewGroup,
  ButtonOthersColumns,
  ContainerGroups,
  ContainerHeaderGroups,
  IconButton,
  ItemGroup,
  ItemGroupLeftContent,
  ItemGroupRightContent,
  Tuto,
} from "./styles";

import { ReactComponent as NewGroupIcon } from "../../assets/new-group-icon.svg";
import { ReactComponent as OthersColumnsIcon } from "../../assets/others-columns.svg";
import { ReactComponent as SettingsGroup } from "../../assets/settings-group.svg";
import { ReactComponent as EyeGroup } from "../../assets/eye-group.svg";
import { ReactComponent as NotEyeGroup } from "../../assets/not-eye-group.svg";

interface IGroup {
  color: string;
  label: string;
  total: number;
}

function HeaderGroups({
  fields,
  groups,
  selectedGroup,
  setSelectedGroup,
  editModeGroup,
  setEditModeGroup,
  setGroupReferenceEditMode,
  setIdsColumnsSelecteds,
}: {
  fields: any;
  groups: IGroup[];
  selectedGroup: string;
  setSelectedGroup: React.Dispatch<React.SetStateAction<string>>;
  editModeGroup: "" | "group" | "ungroup";
  setEditModeGroup: React.Dispatch<
    React.SetStateAction<"" | "group" | "ungroup">
  >;
  setGroupReferenceEditMode: React.Dispatch<React.SetStateAction<string>>;
  setIdsColumnsSelecteds: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element {
  function handleSelectGroup(value: string): void {
    if (selectedGroup === value) {
      setSelectedGroup("");
    } else {
      setSelectedGroup(value);
    }
  }

  const groupsToView =
    groups?.filter((item) => item.label && item.color && item.total) || [];

  return (
    <>
      <ContainerHeaderGroups>
        <ContainerGroups>
          {groupsToView?.length > 0 &&
            groupsToView.map((group) => (
              <ItemGroup
                onClick={() => handleSelectGroup(group.label)}
                active={selectedGroup === group.label}
                notActive={
                  selectedGroup !== group.label && selectedGroup !== ""
                }
              >
                <ItemGroupLeftContent>
                  <svg
                    width="12"
                    height="11"
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.33333 0.666992H4L6 2.66699H10.6667C11.0203 2.66699 11.3594 2.80747 11.6095 3.05752C11.8595 3.30756 12 3.6467 12 4.00033V9.33366C12 9.68728 11.8595 10.0264 11.6095 10.2765C11.3594 10.5265 11.0203 10.667 10.6667 10.667H1.33333C0.979711 10.667 0.640573 10.5265 0.390524 10.2765C0.140476 10.0264 0 9.68728 0 9.33366V2.00033C0 1.6467 0.140476 1.30756 0.390524 1.05752C0.640573 0.807468 0.979711 0.666992 1.33333 0.666992Z"
                      fill={group.color || "pink"}
                    />
                  </svg>

                  <p>{group.label}</p>
                </ItemGroupLeftContent>
                <ItemGroupRightContent>
                  <IconButton>
                    {selectedGroup !== group.label && selectedGroup !== "" ? (
                      <NotEyeGroup />
                    ) : (
                      <EyeGroup />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      const ids = fields
                        .filter((item: any) => item.group === group.label)
                        .map((item: any) => item.id);
                      setIdsColumnsSelecteds(ids);
                      setEditModeGroup("ungroup");
                      setGroupReferenceEditMode(group.label);
                    }}
                  >
                    <SettingsGroup />
                  </IconButton>
                </ItemGroupRightContent>
              </ItemGroup>
            ))}
        </ContainerGroups>
        {groupsToView.length > 0 && (
          <ButtonOthersColumns
            onClick={() =>
              selectedGroup !== "others"
                ? setSelectedGroup("others")
                : setSelectedGroup("")
            }
          >
            <OthersColumnsIcon />
            {selectedGroup !== "others"
              ? "Ver colunas desagrupadas"
              : "Ver todas as colunas"}
          </ButtonOthersColumns>
        )}
        <ButtonNewGroup onClick={() => setEditModeGroup("group")}>
          <NewGroupIcon />
          Novo grupo
        </ButtonNewGroup>
      </ContainerHeaderGroups>
      {(editModeGroup === "group" || editModeGroup === "ungroup") && (
        <Tuto>
          <p>Selecione as colunas que deseja agrupar</p>
        </Tuto>
      )}
    </>
  );
}

export default HeaderGroups;
