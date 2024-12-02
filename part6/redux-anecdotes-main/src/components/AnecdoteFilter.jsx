import React from 'react';
import { useDispatch } from 'react-redux';
import { addFilterText } from '../reducers/filterReducer';

const AnecdoteFilter = () => {
  const dispatch = useDispatch();
  const filterChange = (e) => {
    dispatch(addFilterText(e.target.value));
  };
  return (
    <div>
      <label>Filter</label>
      <input name="filter" onChange={filterChange} />
    </div>
  );
};

export default AnecdoteFilter;
