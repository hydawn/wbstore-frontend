import { useState } from 'react';
import { BookInfo } from '../types/BookTypes.tsx';
import axios from 'axios';
import SearchButtons, { Updater, Stater } from "../query/SearchButtons.tsx";

interface SearchBarProp {
  setBookInfoList: Function
}

export default function SearchBar({setBookInfoList}: SearchBarProp) {
  const [searchStatus, setSearchStatus] = useState('商品名');
  const [name, setName] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [merchant, setMerchant] = useState<string | null>(null);
  const [useRegex, setUseRegex] = useState<boolean>(false);
  const simpleSearch = [ '商品名', '描述', '商家' ];
  // a map from string to function
  const updaterMap: Updater = {
    '商品名': setName,
    '描述': setText,
    '商家': setMerchant,
  };
  const staterMap: Stater = {
    '商品名': name,
    '描述': text,
    '商家': merchant,
  };

  // reset all filters to default
  function setSearchFilterDefault() {
    setName(null);
    setText(null);
    setMerchant(null);
    setUseRegex(false);
  }


  async function handleSearch() {
    await axios.get(
      '/api/search_merchandise',
      {params: {name: name, text_description: text, merchant: merchant, per_page: 3, page_number: 1}}
    ).then(resp => {
      console.log('got:', resp);
      setBookInfoList(resp.data.data.data_list as Array<BookInfo>);
    }).catch(resp => {
      console.error('error search_merchandise:', resp)
    })
  }

  // return <div className="input-group mb-3">
  //   <input type="text" className="form-control" placeholder="商品名" aria-label="search name" aria-describedby="button-addon2" ref={searchNameRef} />
  //   <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={() => {searchBookInfo()}}>搜索</button>
  // </div>;
  function handleDropdownClick(statusTo: string) {
    setSearchFilterDefault();
    setSearchStatus(statusTo);
  }

  return <SearchButtons
    simpleSearch={simpleSearch}
    searchStatus={searchStatus}
    handleDropdownClick={handleDropdownClick}
    ReservedButton={() => <></>}
    handleSearch={handleSearch}
    useRegex={useRegex}
    setUseRegex={setUseRegex}
    setSearchFilterDefault={setSearchFilterDefault}
    updaterMap={updaterMap}
    staterMap={staterMap}
  />;
}
