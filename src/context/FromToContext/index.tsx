import React, { createContext, useContext, useState } from "react";

interface FromToContextType {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  data: CSVRow[];
  setData: React.Dispatch<React.SetStateAction<CSVRow[]>>;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

interface CSVRow {
  [key: string]: string;
}

const FromToContext = createContext<FromToContextType | undefined>(undefined);

export function FromToContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<CSVRow[]>([]);
  const [fileName, setFileName] = useState<string>("");

  const value = {
    currentStep,
    setCurrentStep,
    data,
    setData,
    fileName,
    setFileName,
  };

  return (
    <FromToContext.Provider value={value}>{children}</FromToContext.Provider>
  );
}

export const useFromToContext = (): FromToContextType => {
  const context = useContext(FromToContext);
  if (!context) {
    throw new Error(
      "useFromToContext must be used within a FromToContextProvider",
    );
  }
  return context;
};
