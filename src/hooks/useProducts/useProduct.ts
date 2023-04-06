import {useContextSelector} from "use-context-selector";
import { productContext } from "../../context/products";

export function useProduct() {
  const dataProvider = useContextSelector(productContext, product => product.filteredData);
  const headerTable = useContextSelector(productContext, product => product.headerTable);
  const colHeaders = useContextSelector(productContext, product => product.colHeaders);
  const template = useContextSelector(productContext, product => product.template);
  const hidden = useContextSelector(productContext, product => product.hidden);
  const filter = useContextSelector(productContext, product => product.filter);
  const handleSave = useContextSelector(productContext, product => product.handleSave);
  const handleDelete = useContextSelector(productContext, product => product.handleDelete);
  const handleResize = useContextSelector(productContext, product => product.handleResize);
  const handleHidden = useContextSelector(productContext, product => product.handleHidden);
  const handleFilter = useContextSelector(productContext, product => product.handleFilter);
  const handleFreeze = useContextSelector(productContext, product => product.handleFreeze);
  const handleMove = useContextSelector(productContext, product => product.handleMove);
  const handleNewColumn = useContextSelector(productContext, product => product.handleNewColumn);
  const handleRedirectAndGetProducts = useContextSelector(productContext, product => product.handleRedirectAndGetProducts);
  const COMPONENT_CELL_PER_TYPE = useContextSelector(productContext, product => product.COMPONENT_CELL_PER_TYPE);

  return {
    dataProvider,
    headerTable,
    colHeaders,
    template,
    hidden,
    filter,
    handleSave,
    handleDelete,
    handleResize,
    handleHidden,
    handleFilter,
    handleFreeze,
    handleMove,
    handleNewColumn,
    handleRedirectAndGetProducts,
    COMPONENT_CELL_PER_TYPE
  }
}