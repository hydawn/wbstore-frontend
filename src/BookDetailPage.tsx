// fetch detail info from web and present it

interface Prop {
  bookId: string
  setBookId: Function
  setOnPage: Function
}

export default function BookDetailPage({ bookId, setBookId, setOnPage }: Prop) {
  function ReturnButton() {
    return <button className="btn" onClick={() => {setBookId('')}}>返回</button>;
  }

  return (<>
      this is a more detail page for book with bookid of {bookId}
      <ReturnButton />
  </>);
}
