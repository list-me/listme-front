import React, { useState } from "react";
import { ReactComponent as ChevronsIcon } from "../../../../../../assets/chevrons-left.svg";
import { ReactComponent as ChevronIcon } from "../../../../../../assets/chevron-left.svg";
import { ButtonPaginationError, ContainerPaginationError } from "./styles";

interface PaginationProps {
  limit: number;
  offset: number;
  total: number;
  onPageChange: (newOffset: number) => void;
}

const PaginationSidebarError: React.FC<PaginationProps> = ({
  limit,
  offset,
  total,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / limit);

  const [displayPage, setDisplayPage] = useState(offset + 1);

  const handlePageChange = (newPage: number): void => {
    const newOffset = newPage - 1;
    onPageChange(newOffset);
    setDisplayPage(newPage);
  };

  const renderPageNumbers = (): JSX.Element[] => {
    const pageNumbers = [];
    const maxPages = Math.min(totalPages, 5);
    let startPage = displayPage - Math.floor(maxPages / 2);
    startPage = Math.max(startPage, 1);
    const endPage = Math.min(startPage + maxPages - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => (
      <ButtonPaginationError
        type="button"
        key={number}
        active={number === offset + 1}
        className={number === offset + 1 ? "active" : ""}
        onClick={() => {
          if (number !== offset + 1) handlePageChange(number);
        }}
      >
        {number}
      </ButtonPaginationError>
    ));
  };

  return (
    <ContainerPaginationError>
      <ButtonPaginationError
        type="button"
        onClick={() => handlePageChange(1)}
        disabled={offset + 1 === 1}
      >
        <ChevronsIcon />
      </ButtonPaginationError>
      <ButtonPaginationError
        type="button"
        onClick={() => handlePageChange(offset + 1 - 1)}
        disabled={offset + 1 === 1}
      >
        <ChevronIcon />
      </ButtonPaginationError>
      {renderPageNumbers()}
      <ButtonPaginationError
        type="button"
        onClick={() => handlePageChange(offset + 1 + 1)}
        right
        disabled={offset + 1 === totalPages}
      >
        <ChevronIcon />
      </ButtonPaginationError>
      <ButtonPaginationError
        type="button"
        right
        onClick={() => handlePageChange(totalPages)}
        disabled={offset + 1 === totalPages}
      >
        <ChevronsIcon />
      </ButtonPaginationError>
    </ContainerPaginationError>
  );
};

export default PaginationSidebarError;
