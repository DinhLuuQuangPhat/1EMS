import styled from "styled-components";

export default function TextEditorReview({content}) {
  return (
    <TextEditorStyle className={"ql-editor"} dangerouslySetInnerHTML={{__html: content}} />
  )
}

export const TextEditorStyle = styled.div`
  .editor-comp {
    display: inline;
    background: #FFF;
    border: 1px solid #000;
    text-transform: uppercase;
    color: #000;

    &:before{
      content: attr(title);
      display: inline;
      font-size: 14px;
    }

    &[type="comp-textarea"]{
      padding: 0.5em;
      display: block;
      min-height: 5.2em;
    }

    &[type="comp-attach-files"]{
      display: block;
      padding: 0.5em;
      min-height: 5.2em;

      > span{
        display: block;
        margin-bottom: 0.5em;
      }
    }
  }

`;
