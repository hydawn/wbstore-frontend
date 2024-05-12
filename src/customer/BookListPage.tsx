import { useState, useEffect } from 'react';
import { BookInfo } from '../types/BookTypes.tsx';
import LoadingPage from '../LoadingPage.tsx';

interface BookListPageProp {
  setBookId: Function,
  getBooks: Function
}

export default function BookListPage({ setBookId, getBooks }: BookListPageProp) {
  const [bookInfoList, setBookInfoList] = useState<Array<BookInfo> | null>(null);
  const [bookPage, setBookPage] = useState(1);

  useEffect(() => {getBooks(setBookInfoList, bookPage, 10)}, []);

  interface PresentBookInfoProp {
    bookInfo: BookInfo
  };

  function PresentBookInfo({bookInfo}: PresentBookInfoProp) {
    function BookPicture() {
      // TODO: jpeg? -- I need an image type
      const base64Image = `data:image/jpeg;base64,${bookInfo.image_description}`;
      return <img src={base64Image} alt={bookInfo.name}/>
    }
    function BookTextDetail() {
      return (<>
        <b>{bookInfo.name}</b>
        <b>${bookInfo.price}$</b>
        {bookInfo.online_date}
        {bookInfo.text_description}
      </>);
    }
    function MoreDetailButton() {
      return <button className="btn" onClick={() => {
        setBookId(bookInfo.id);
      }}>更多</button>;
    }
    return (<>
      <BookPicture />
      <BookTextDetail />
      <MoreDetailButton />
    </>);
  }

  interface BookListRowProp {
    data: BookInfo,
    index: number
  };

  function BookListRow({data, index}: BookListRowProp) {
    return <li key={index}><PresentBookInfo bookInfo={data} /></li>
  }

  interface Prop { bookInfoList: Array<BookInfo> }

  function BookList({bookInfoList}: Prop) {
    return (<ul>{bookInfoList.map((i, index) => ( <BookListRow data={i} index={index} /> ))}</ul>);
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
