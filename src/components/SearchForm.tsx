import type { ChangeEvent, FunctionComponent } from 'react';
import { FormEvent, useState } from 'react';

type SearchTermProps = {
  onSearch: (searchTerm: string) => void;
  loading: boolean;
};

const SearchForm: FunctionComponent<SearchTermProps> = (props) => {
  const { onSearch, loading } = props;
  const [value, setValue] = useState<string>('react');

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value) return;
    onSearch(value);
  };

  return (
    <form className="form-inline" onSubmit={handleOnSubmit}>
      <div className="form-group">
        <label htmlFor="search" className="mr-sm-2">
          Search:
        </label>
        <input
          type="text"
          className="form-control form-control-sm mr-sm-2"
          id="search"
          value={value}
          onChange={handleOnChange}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-sm"
        disabled={!value}
      >
        {loading && <span className="spinner-border spinner-border-sm"></span>}{' '}
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
