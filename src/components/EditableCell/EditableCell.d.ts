import React from "react";

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: any;
  handleSave: (record: Item) => void;
  key: string;
}

export type { EditableCellProps };
