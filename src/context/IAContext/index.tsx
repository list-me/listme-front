import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import IAModalSelectItems from "../../components/IA/IAModalSelectItems";
import CollectInformation from "../../components/IA/CollectInformation";
import LoadingIA from "../../components/IA/LoadingIA";
import ReviewModal from "../../components/IA/ReviewModal";
import ReviewPopUp from "../../components/IA/ReviewPopUp";

// Definição da interface para o contexto
interface IAContextType {
  IAMode: boolean;
  setIAMode: React.Dispatch<React.SetStateAction<boolean>>;
  rowSelectedToIA: number[];
  setRowSelectedToIA: React.Dispatch<React.SetStateAction<number[]>>;
  parseInputToList: (input: string) => number[];
  setModalInformationOpened: React.Dispatch<React.SetStateAction<boolean>>;
  convertData: ({ data }: { data: string | number[] }) => void;
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
  const [textSelectedToIa, setTextSelectedToIa] = useState("");

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

  const convertListToInput = useCallback((list: number[]): string => {
    if (list.length === 0) {
      return "";
    }

    const sortedList = [...list].sort((a, b) => a - b);
    const ranges: string[] = [];
    let rangeStart = sortedList[0];
    let rangeEnd = sortedList[0];

    for (let i = 1; i < sortedList.length; i++) {
      if (sortedList[i] === rangeEnd + 1) {
        rangeEnd = sortedList[i];
      } else {
        ranges.push(
          rangeStart === rangeEnd
            ? `${rangeStart + 1}`
            : `${rangeStart + 1}-${rangeEnd + 1}`,
        );
        rangeStart = sortedList[i];
        rangeEnd = sortedList[i];
      }
    }

    ranges.push(
      rangeStart === rangeEnd
        ? `${rangeStart + 1}`
        : `${rangeStart + 1}-${rangeEnd + 1}`,
    );
    const intervalString = ranges.join(", ");
    setTextSelectedToIa(intervalString);
    return intervalString;
  }, []);

  const convertData = useCallback(
    ({ data }: { data: string | number[] }): void => {
      if (typeof data === "string") {
        parseInputToList(data);
      } else {
        convertListToInput(data);
      }
    },
    [convertListToInput, parseInputToList],
  );

  const values = {
    IAMode,
    setIAMode,
    rowSelectedToIA,
    setRowSelectedToIA,
    parseInputToList,
    setModalInformationOpened,
    convertData,
  };

  return (
    <IAContext.Provider value={values}>
      {children}
      {IAMode && (
        <IAModalSelectItems
          convertData={convertData}
          setTextSelectedToIa={setTextSelectedToIa}
          textSelectedToIa={textSelectedToIa}
        />
      )}
      {modalInformationOpened && (
        <CollectInformation
          setModalInformationOpened={setModalInformationOpened}
        />
      )}
      {/* {!modalInformationOpened && <ReviewModal />} */}
      {/* <LoadingIA /> */}
      {/* <ReviewPopUp /> */}
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
