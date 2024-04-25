import React from "react";
import {
  ButtonPaginationPublicListList,
  PaginationTablePublicListList,
} from "./styles";
import { ReactComponent as DoubleArrowLeft } from "../../../../../../../assets/doubleArrowLeft.svg";
import { ReactComponent as ArrowLeftPagination } from "../../../../../../../assets/arrowLeftPagination.svg";
import { ReactComponent as DoubleArrowRight } from "../../../../../../../assets/doubleArrowRight.svg";
import { ReactComponent as ArrowRightPagination } from "../../../../../../../assets/arrowRightPagination.svg";
import { ReactComponent as EllipsisPagination } from "../../../../../../../assets/ellipsisPagination.svg";

function PaginationTablePublicListListComponent({
  currentPage,
  setCurrentPage,
  totalPages,
}: {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}): JSX.Element {
  const buttons = Array(totalPages).fill("");

  return (
    <PaginationTablePublicListList>
      <ButtonPaginationPublicListList
        isDisabled={currentPage <= 1}
        type="button"
        onClick={() => setCurrentPage(1)}
      >
        <DoubleArrowLeft />
      </ButtonPaginationPublicListList>
      <ButtonPaginationPublicListList
        isDisabled={currentPage <= 1}
        type="button"
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        <ArrowLeftPagination />
      </ButtonPaginationPublicListList>
      {buttons.map((_item, index: number) => (
        <ButtonPaginationPublicListList
          isActive={index + 1 === currentPage}
          type="button"
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </ButtonPaginationPublicListList>
      ))}
      {totalPages > 10 && (
        <ButtonPaginationPublicListList type="button">
          <EllipsisPagination />
        </ButtonPaginationPublicListList>
      )}
      <ButtonPaginationPublicListList
        isDisabled={currentPage >= totalPages}
        type="button"
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        <ArrowRightPagination />
      </ButtonPaginationPublicListList>
      <ButtonPaginationPublicListList
        isDisabled={currentPage >= totalPages}
        type="button"
        onClick={() => setCurrentPage(totalPages)}
      >
        <DoubleArrowRight />
      </ButtonPaginationPublicListList>
    </PaginationTablePublicListList>
  );
}

export default PaginationTablePublicListListComponent;
