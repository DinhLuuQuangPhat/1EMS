import {EditorContentType} from "./toolbar/EditorToolbarUtil";

export const EditorMode = {
  empty: "",
  review: "review",
  compose: "compose"
}

export const getTemplateProps = (content) => {
  const props = {
    INVALID: 0,
    LOGO_COL: 0,
    CODE_COL: 0,
    DATE_COL: 0,
    VLUE_COL: 0,
    CNTN_COL: 0,
    NOTE_COL: 0,
    EMPL_COL: 0,
    FILE_COL: 0,
  }

  const templateNode = document.createElement('div');
  templateNode.style.cssText = 'position:absolute; opacity:0; z-index:-1; display: none';
  templateNode.innerHTML = content;
  // document.body.appendChild(templateNode);

  const tags = templateNode.getElementsByClassName("editor-comp");
  for (let tag of tags) {
    const name = tag.attributes && tag.attributes.name && tag.attributes.name.value ? tag.attributes.name.value : "";

    if(name !== ""){
      switch (name){
        case EditorContentType.LOGO_COL.name: props.LOGO_COL += 1; break;
        case EditorContentType.CODE_COL.name: props.CODE_COL += 1;break;
        case EditorContentType.DATE_COL.name: props.DATE_COL += 1;break;
        case EditorContentType.VLUE_COL.name: props.VLUE_COL += 1;break;
        case EditorContentType.CNTN_COL.name: props.CNTN_COL += 1;break;
        case EditorContentType.NOTE_COL.name: props.NOTE_COL += 1;break;
        case EditorContentType.EMPL_COL.name: props.EMPL_COL += 1;break;
        case EditorContentType.FILE_COL.name: props.FILE_COL += 1;break;
        default: break;
      }
    }
  }

  return {
    hasLogo: props.LOGO_COL > 0,
    hasCode: props.CODE_COL > 0,
    hasDate: props.DATE_COL > 0,
    hasValue: props.VLUE_COL > 0,
    hasCNTN: props.CNTN_COL > 0,
    hasNote: props.NOTE_COL > 0,
    hasEmployees: props.EMPL_COL > 0,
    hasAttachFiles: props.FILE_COL > 0,
  }
}