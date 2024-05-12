import { useState, useEffect } from 'react';
import { BookInfo } from '../types/BookTypes.tsx';
import LoadingPage from '../LoadingPage.tsx';
import BookLongView from '../views/BookLongView.tsx';

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
    return <button className="btn" onClick={() => {
      setBookId(bookInfo.id);
    }}>更多</button>;
  }
  return (<>
    <BookLongView bookInfo={bookInfo} />
    <MoreDetailButton />
  </>);
}

interface BookListRowProp {
  data: BookInfo
  index: number
  setBookId: Function
};

function BookListRow({data, index, setBookId}: BookListRowProp) {
  return <li key={index}><PresentBookInfo bookInfo={data} setBookId={setBookId} /></li>
}

export default function BookListPage({ setBookId, getBooks }: BookListPageProp) {
  const [bookInfoList, setBookInfoList] = useState<Array<BookInfo> | null>(null);
  const [bookPage, setBookPage] = useState(1);

  useEffect(() => {getBooks(setBookInfoList, bookPage, 10)}, []);


  interface Prop { bookInfoList: Array<BookInfo> }

  function BookList({bookInfoList}: Prop) {
    return (<ul>{
      bookInfoList.map((i, index) => ( <BookListRow data={i} index={index} setBookId={setBookId} /> ))
    }</ul>);
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
    <BookList bookInfoList={bookInfoList} />
    <BookListNavBar />
    </>
    );
  }

  return (<>
    {bookInfoList ? <DrawBookStorePage bookInfoList={bookInfoList} /> : <LoadingPage />}
  </>);
}
