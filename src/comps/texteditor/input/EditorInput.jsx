import EditorDate, {EditorDateCompose} from "./EditorDate";
import EditorAttachFile, {EditorAttachFileCompose} from "./EditorAttachFile";
import EditorUser, {EditorUserCompose} from "./EditorUser";
import EditorMoney, {EditorMoneyCompose} from "./EditorMoney";
import EditorText, {EditorTextCompose} from "./EditorText";
import EditorNumber, {EditorNumberCompose} from "./EditorNumber";
import EditorParagraph, {EditorParagraphCompose} from "./EditorParagraph";
import EditorTextArea, {EditorTextAreaCompose} from "./EditorTextArea";
import {useTextEditorContext} from "../context/TextEditorProvider";
import EditorLogo from "./EditorLogo";

export const EditorInputClassName = "editor-comp";

export const EditorInputType = {
  background_img: 'comp-background-img',
  image: 'comp-image',
  date: 'comp-date',
  number: 'comp-number',
  text: 'comp-text',
  paragraph: 'comp-paragraph',
  textarea: 'comp-textarea',
  money: 'comp-money',
  user: 'comp-user',
  attach_files: 'comp-attach-files',
}
export default function EditorInput({type, name, placeholder}) {
  const { disabled} = useTextEditorContext();

  if (disabled) {
    switch (type) {
      case EditorInputType.date:
        return <EditorDate name={name}/>;
      case EditorInputType.number:
        return <EditorNumber name={name}/>;
      case EditorInputType.text:
        return <EditorText name={name}/>;
      case EditorInputType.paragraph:
        return <EditorParagraph name={name}/>;
      case EditorInputType.textarea:
        return <EditorTextArea name={name}/>;
      case EditorInputType.money:
        return <EditorMoney name={name}/>;

      case EditorInputType.background_img:
        return <EditorLogo name={name}/>;

      case EditorInputType.user:
        return <EditorUser name={name}/>;
      case EditorInputType.attach_files:
        return <EditorAttachFile name={name}/>;
      default:
        return null;
    }
  } else {
    switch (type) {
      case EditorInputType.date:
        return <EditorDateCompose name={name} placeholder={placeholder}/>;
      case EditorInputType.number:
        return <EditorNumberCompose name={name} placeholder={placeholder}/>;
      case EditorInputType.text:
        return <EditorTextCompose name={name} placeholder={placeholder}/>;
      case EditorInputType.paragraph:
        return <EditorParagraphCompose name={name} placeholder={placeholder}/>;
      case EditorInputType.textarea:
        return <EditorTextAreaCompose name={name} placeholder={placeholder}/>;
      case EditorInputType.money:
        return <EditorMoneyCompose name={name} placeholder={placeholder}/>;

      case EditorInputType.background_img:
        return <EditorLogo name={name}/>;

      case EditorInputType.user:
        return <EditorUserCompose name={name} placeholder={placeholder}/>;
      case EditorInputType.attach_files:
        return <EditorAttachFileCompose name={name} placeholder={placeholder}/>;
      default:
        return null;
    }
  }

}
