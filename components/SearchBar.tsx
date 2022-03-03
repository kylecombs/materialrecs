import React from 'react';
import { Input } from 'semantic-ui-react';

interface IFilters {
  search: string;
}

interface Props {
  filters: IFilters;
  setFilters?: React.Dispatch<React.SetStateAction<IFilters>>;
}

const SearchBar: React.FC<Props> = ({ filters, setFilters }) => {
  return (
    <div>
      <Input placeholder='Search...' />
    </div>
  );
};

export default SearchBar;
