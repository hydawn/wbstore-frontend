import { useState, useEffect } from 'react';
import axios from "axios";

interface BookInfo {
  id: string,
  name: string,
  text_description: string,
  image_description: string,
  price: number,
  online_date: string,
  stock_inventory: number,
  added_by_user: number
}

function getAllBooks(setBookInfoList: Function, page_number: number, per_page: number) {
  axios.get(
    '/api/search_merchandise',
    { params: {merchandise_name: '.*', per_page: per_page, page_number: page_number} }
  ).then(resp => {
    console.log('got /api/search_merchandise: ', resp);
    setBookInfoList(resp.data.data as Array<BookInfo>);
  }).catch(resp => {
    console.error('/api/search_merchandise error:', resp)
  })
}

interface BookListPageProp {
  setOnPage: Function
  setBookId: Function
  setBookPageState: Function
}

export default function BookListPage({setOnPage, setBookId, setBookPageState }: BookListPageProp) {
  const [bookInfoList, setBookInfoList] = useState<Array<BookInfo> | null>(null);
  const [bookPage, setBookPage] = useState(1);

  useEffect(() => {getAllBooks(setBookInfoList, bookPage, 10)}, []);

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
        setBookPageState('book detail');
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
      <button className="btn" onClick={() => setBookPage(bookPage + 1)}>下一页</button>
      <button className="btn" onClick={() => setBookPage(bookPage - 1)}>上一页</button>
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
    {bookInfoList ? <DrawBookStorePage bookInfoList={bookInfoList} /> : <div>Loading...</div>}
  </>);
}
