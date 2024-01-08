import HTMLReactParser from "html-react-parser";
import {useTextEditorContext} from "./TextEditorProvider.jsx";

function TextEditorReview() {
  const {content} = useTextEditorContext();

  const options = {
    replace: (node, index) => {
      if (node != null && node.attribs != null) {
        const value = node.attribs.value;

        if (node.attribs.class === 'input-comp') {
          return <span className={'input-comp-val'}>{value}</span>;

        } else if (node.attribs.class === "select-comp") {
          return <span className={'select-comp-val'}>{value}</span>;

        } else if (node.attribs.class === "image-comp") {
          return <span className={'image-comp-val'}>{value}</span>;

        } else if (node.attribs.class === "date-comp") {
          return <span className={'date-comp-val'}>{value}</span>;

        } else if (node.attribs.class === "money-comp") {
          return <span className={'money-comp-val'}>{value}</span>;

        } else if (node.attribs.class === "user-comp") {
          return <span className={'user-comp-val'}>{value}</span>;

        } else if (node.attribs.class === "text-comp") {
          return <span className={'text-comp-val'}>{value}</span>;
        }
      }
    },
  };

  return (
    <>{HTMLReactParser(content, options)}</>
  );
}

export default TextEditorReview;