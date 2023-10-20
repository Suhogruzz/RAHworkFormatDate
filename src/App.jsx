import { useState } from 'react'

function DateTime(props) {
  return (
      <p className="date">{props.date}</p>
  )
}

function withHOC(Component) {
  return function PrettierComponent(props) {
    const now = new Date(), date = new Date(props.date);
    const hrs = ((now - date) / 1000 / 60 / 60).toFixed(2);
    let result;

    if (hrs >= 1) result = `${(hrs / 1).toFixed()} часов назад`;
    if (hrs > 24) result = `${(hrs / 24).toFixed()} дней назад`;
    if (hrs < 1) result = `${(hrs * 100)} минут назад`;

    return (
      <Component date={result} />
    )
  }
}

const DateTimePretty = withHOC(DateTime);

function Video(props) {
  return (
      <div className="video">
          <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          <DateTimePretty date={props.date}  />
      </div>
  )
}

function VideoList(props) {
  return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
  const [list, setList] = useState([
      {
          url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
          date: '2023-10-20 21:50:00'
      },
      {
          url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
          date: '2023-10-20 20:50:00'
      },
      {
          url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
          date: '2018-02-03 23:16:00'
      },
      {
          url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
          date: '2018-01-03 12:10:00'
      },
      {
          url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
          date: '2018-01-01 16:17:00'
      },
      {
          url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
          date: '2017-12-02 05:24:00'
      },
  ]);

  return (
      <VideoList list={list} />
  );
}