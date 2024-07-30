import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import IAModalSelectItems from "../../components/IA/IAModalSelectItems";
import CollectInformation from "../../components/IA/CollectInformation";

// Definição da interface para o contexto
interface IAContextType {
  IAMode: boolean;
  setIAMode: React.Dispatch<React.SetStateAction<boolean>>;
  rowSelectedToIA: number[];
  setRowSelectedToIA: React.Dispatch<React.SetStateAction<number[]>>;
  parseInputToList: (input: string) => number[];
  setModalInformationOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

// Criação do contexto com um valor inicial
const IAContext = createContext<IAContextType | undefined>(undefined);
interface IAContextProviderProps {
  children: ReactNode;
}

export const IAContextProvider: React.FC<IAContextProviderProps> = ({
  children,
}) => {
  const [IAMode, setIAMode] = useState(true);
  const [modalInformationOpened, setModalInformationOpened] = useState(false);
  const [rowSelectedToIA, setRowSelectedToIA] = useState<number[]>([]);

  const parseInputToList = useCallback((input: string): number[] => {
    if (!input.trim()) {
      setRowSelectedToIA([]);
      return [];
    }

    const ranges = input.split(",").map((item) => item.trim());
    const result: number[] = [];

    ranges.forEach((range) => {
      if (range.includes("-")) {
        const [start, end] = range.split("-").map(Number);
        // eslint-disable-next-line no-plusplus
        for (let i = start; i <= end; i++) {
          result.push(i - 1);
        }
      } else {
        result.push(Number(range) - 1);
      }
    });

    setRowSelectedToIA(result);

    return result;
  }, []);

  const values = {
    IAMode,
    setIAMode,
    rowSelectedToIA,
    setRowSelectedToIA,
    parseInputToList,
    setModalInformationOpened,
  };

  return (
    <IAContext.Provider value={values}>
      {children}
      {IAMode && <IAModalSelectItems parseInputToList={parseInputToList} />}
      {modalInformationOpened && (
        <CollectInformation
          setModalInformationOpened={setModalInformationOpened}
        />
      )}
    </IAContext.Provider>
  );
};

export const useIAContext = (): IAContextType => {
  const context = useContext(IAContext);
  if (!context) {
    throw new Error("useIAContext must be used within a IAContextProvider");
  }
  return context;
};
