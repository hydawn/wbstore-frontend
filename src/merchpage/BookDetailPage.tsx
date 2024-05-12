interface Prop {
  bookId: string
  setBookId: Function
}

export default function BookDetailPage({ bookId, setBookId }: Prop) {
  return <>this is detail page for {bookId}</>;
}
