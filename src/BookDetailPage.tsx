// fetch detail info from web and present it

interface Prop {
  bookId: string
  setBookId: Function
  setPageState: Function
}

export default function BookDetailPage({bookId, setBookId, setPageState}: Prop) {
  // fetch book info
  return (<>
      this is a more detail page for book with bookid of {bookId}
      <button className="btn" onClick={() => {setPageState('book list')}}>hit to return to list</button>
  </>);
}
