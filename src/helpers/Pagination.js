import React from "react";
import Paginated from "react-js-pagination";

const Pagination = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  onChange,
}) => {
  return (
    <Paginated
      hideDisabled
      activePage={activePage}
      itemsCountPerPage={itemsCountPerPage}
      totalItemsCount={totalItemsCount}
      onChange={onChange}
      pageRangeDisplayed={5}
      innerClass="flex items-center justify-center mt-5 text-gray-300"
      itemClass="px-3 py-2 rounded-sm text-xs bg-gray-500 bg-opacity-20 mr-1 cursor-pointer"
      linkClass="link"
      activeClass="bg-red-600 bg-opacity-100 text-white"
      nextPageText={<i className="fas fa-angle-right" />}
      prevPageText={<i className="fas fa-angle-left" />}
      firstPageText={<i className="fas fa-angle-double-left" />}
      lastPageText={<i className="fas fa-angle-double-right" />}
    />
  );
};
export default React.memo(Pagination);
