
import "./print.css";
import styled from "styled-components";

export default function ComposeEditorLayout({className, children}){
  return(
    <ComposeEditorLayoutStyle className={`compose-editor-layout border-solid border-1 bg-gray-50 mt-5 ${className}`}>
      <div className={"p-3"} style={{position: "relative"}}>
        {children}
      </div>
    </ComposeEditorLayoutStyle>
  )
}

const ComposeEditorLayoutStyle = styled.div`
  .editor-review-comp{
    cursor: pointer;
    
    &:hover{
      background: #ccc;
    }
  }
  
  &.review-mode{
    border: 2px solid #ccc;
  }
  
  &.add-new-mode{
    border: 2px solid springgreen;
  }
  
  &.edit-mode{
    border: 2px solid dodgerblue;
  }
`;


