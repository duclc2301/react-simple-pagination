import type { FunctionComponent, MouseEvent } from 'react';

type PaginationProps = {
  pageLimit: number;
  totalRecords: number;
  activePage: number;
  onPageChange: (activePage: number) => void;
};

const Pagination: FunctionComponent<PaginationProps> = (props) => {
  const { totalRecords = 0, pageLimit = 10, activePage, onPageChange } = props;
  const totalPages = Math.ceil(totalRecords / pageLimit);
  const totalNumbers = [...Array(totalPages + 1).keys()].slice(1);

  const handleOnClick = (
    page: number,
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    const activePage = Math.max(0, Math.min(page, totalPages));
    return onPageChange(activePage);
  };

  return (
    <nav>
      <ul className="pagination">
        {totalNumbers.map((page) => (
          <li
            key={page}
            className={activePage === page ? 'page-item active' : 'page-item'}
          >
            <a
              href="!#"
              className="page-link"
              onClick={(event) => handleOnClick(page, event)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
