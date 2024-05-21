import { useState, useEffect, useRef  } from 'react';
import { BookInfo } from '../types/BookTypes.tsx';
import LoadingPage from '../LoadingPage.tsx';
import BookLongView from '../views/BookLongView.tsx';
import axios from 'axios';

interface BookListPageProp {
  setBookId: Function,
  getBooks: Function
}

interface PresentBookInfoProp {
  bookInfo: BookInfo
  setBookId: Function
};

function PresentBookInfo({bookInfo, setBookId}: PresentBookInfoProp) {
  function MoreDetailButton() {
    return <button className="btn btn-success" onClick={() => {
      setBookId(bookInfo.id);
    }}>更多</button>;
  }
  return (<>
    <BookLongView bookInfo={bookInfo} MoreDetailButton={MoreDetailButton} />
  </>);
}

interface BookListRowProp {
  data: BookInfo
  index: number
  setBookId: Function
};

function BookListRow({data, index, setBookId}: BookListRowProp) {
  return <div className="col-md-4" key={index}>
      <div className="card mb-4">
    <PresentBookInfo bookInfo={data} setBookId={setBookId} />
    </div>
  </div>;
}

interface SearchBarProp {
  setBookInfoList: Function
}

function SearchBar({setBookInfoList}: SearchBarProp) {
  const searchNameRef = useRef<HTMLInputElement>(null);

  async function searchBookInfo() {
    await axios.get(
      '/api/search_merchandise',
      {params: {merchandise_name: searchNameRef.current?.value, per_page: 10, page_number: 1}}
    ).then(resp => {
      console.log('got:', resp);
      setBookInfoList(resp.data.data as Array<BookInfo>);
    }).catch(resp => {
      console.error('error search_merchandise:', resp)
    })
  }

  return <div className="input-group mb-3">
    <input type="text" className="form-control" placeholder="商品名" aria-label="search name" aria-describedby="button-addon2" ref={searchNameRef} />
    <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={() => {searchBookInfo()}}>搜索</button>
  </div>;
}

export default function BookListPage({ setBookId, getBooks }: BookListPageProp) {
  const [bookInfoList, setBookInfoList] = useState<Array<BookInfo> | null>(null);
  const [bookPage, setBookPage] = useState(1);

  useEffect(() => {getBooks(setBookInfoList, bookPage, 10)}, []);

  interface Prop { bookInfoList: Array<BookInfo> }

  function BookList({bookInfoList}: Prop) {
    return (<div className="container mt-5"><div className="row">{
      bookInfoList.map((i, index) => ( <BookListRow data={i} index={index} setBookId={setBookId} /> ))
    }</div></div>);
  }

  function BookListNavBar() {
    return (<>
      <button className="btn btn-primary" onClick={() => {setBookPage(bookPage - 1)}}>上一页</button>
      <button className="btn btn-primary" onClick={() => {setBookPage(bookPage + 1)}}>下一页</button>
    </>);
  }

  function DrawBookStorePage({bookInfoList}: Prop) {
    return (
    <>
    <SearchBar setBookInfoList={setBookInfoList} />
    <BookList bookInfoList={bookInfoList} />
    <BookListNavBar />
    </>
    );
  }

  return (<>
    {bookInfoList ? <DrawBookStorePage bookInfoList={bookInfoList} /> : <LoadingPage />}
  </>);
}
