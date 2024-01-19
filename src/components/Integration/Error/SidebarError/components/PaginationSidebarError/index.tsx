import React from "react";
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
  const currentPage = Math.floor(offset / limit) + 1;

  const handlePageChange = (newPage: number): void => {
    const newOffset = (newPage - 1) * limit;
    onPageChange(newOffset);
  };

  const renderPageNumbers = (): JSX.Element[] => {
    const pageNumbers = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <ButtonPaginationError
        type="button"
        key={number}
        active={number === offset + 1}
        className={number === currentPage ? "active" : ""}
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
        disabled={currentPage === 1}
      >
        <ChevronsIcon />
      </ButtonPaginationError>
      <ButtonPaginationError
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronIcon />
      </ButtonPaginationError>
      {renderPageNumbers()}
      <ButtonPaginationError
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        right
        disabled={currentPage === totalPages}
      >
        <ChevronIcon />
      </ButtonPaginationError>
      <ButtonPaginationError
        type="button"
        right
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ChevronsIcon />
      </ButtonPaginationError>
    </ContainerPaginationError>
  );
};

export default PaginationSidebarError;
