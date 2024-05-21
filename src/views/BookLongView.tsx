import { BookInfo } from "../types/BookTypes";

interface Prop {
  bookInfo: BookInfo
  MoreDetailButton: () => JSX.Element
}

export default function BookLongView({bookInfo, MoreDetailButton}: Prop) {
  function BookPicture() {
    const base64Image = `data:${bookInfo.image_type};base64,${bookInfo.image_description}`;
    return <img src={base64Image} className="card-img-top" alt={bookInfo.name}/>
  }

  return <>
    <BookPicture />
    <div className="card-body">
      <h5 className="card-title">{bookInfo.name}</h5>
      <MoreDetailButton />
    </div>
  </>;
}
