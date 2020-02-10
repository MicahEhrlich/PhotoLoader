import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Image from './component/Image';

const PICSUM_URL = 'https://picsum.photos/v2/list';

const App = () => {
  const [picList, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [grayscale, setGrayscale] = useState(false);
  const [filter, setFilter] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const getImageList = async () => {
    const res = await axios.get(`${PICSUM_URL}/?page=${page}&limit=30`);
    setList(res.data);
    setPage(page + 1);
  };

  const getImageGrid = () => {
    let lowercasedFilter = filter.toLowerCase();
    let filteredData = picList.filter(item => {
      return Object.keys(item.id).some(key =>
        item.author.toLowerCase().includes(lowercasedFilter)
      );
    });

    setFilteredList(
      filteredData.map((pic, i) => {
        return (
          <div key={i}>
            <Image image={pic.id} author={pic.author} grayscale={grayscale} />
          </div>
        );
      })
    );
  };

  const handleChange = () => {
    setGrayscale(!grayscale);
  };

  const setFilterValue = e => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    getImageGrid();
  }, [picList, grayscale, filter]);

  return (
    <div className='App'>
      <header className='App-header'>
        <h2>Photo Loader</h2>
      </header>
      <label>
        Grayscale:
        <input type='checkbox' value={grayscale} onChange={handleChange} />
      </label>
      <label>
        Search:
        <input type='text' value={filter} onChange={setFilterValue} />
      </label>
      <button onClick={getImageList}>Load Images</button>
      <div className='wrapper'>{filteredList}</div>
    </div>
  );
};

export default App;
