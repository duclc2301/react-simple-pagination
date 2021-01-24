import List from 'components/List';
import Pagination from 'components/Pagination';
import SearchForm from 'components/SearchForm';
import useFetchData from 'hooks/useFetchData';
import { useState } from 'react';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

export type Post = {
  objectID: string;
  title: string;
  url: string;
};

export type Response = {
  hits: Post[];
  hitsPerPage: number;
};

const App = () => {
  const [hitsPerPage] = useState<number>(100);
  const [pageLimit] = useState<number>(10);
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>('react');

  const url = `${API_ENDPOINT}${searchTerm}&hitsPerPage=${hitsPerPage}`;

  const { response, loading, error } = useFetchData<Response>(url, {
    hits: [],
    hitsPerPage,
  });

  const totalRecords = response.hitsPerPage;
  const offset = (activePage - 1) * pageLimit;
  const currentPosts: Post[] = response.hits.slice(offset, offset + pageLimit);

  const handleOnSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const onPageChange = (activePage: number) => {
    setActivePage(activePage);
  };

  if (error)
    return (
      <div className="container mt-5">
        <h5>Something went wrong</h5>
      </div>
    );

  return (
    <div className="container mt-5">
      <SearchForm onSearch={handleOnSearch} loading={loading} />
      <List lists={currentPosts} />
      <Pagination
        pageLimit={pageLimit}
        totalRecords={totalRecords}
        activePage={activePage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default App;
