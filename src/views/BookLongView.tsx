import { BookInfo } from "../types/BookTypes";

interface Prop {
  bookInfo: BookInfo
}

export default function BookLongView({bookInfo}: Prop) {
  function BookPicture() {
    // TODO: jpeg? -- I need an image type
    const base64Image = `data:${bookInfo.image_type};base64,${bookInfo.image_description}`;
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

  return <><BookPicture /><BookTextDetail /></>;
}
