import 'react-quill/dist/quill.snow.css';
import { Quill} from 'react-quill';
import {EditorContentType} from "../toolbar/EditorToolbarUtil";

const Embed = Quill.import('blots/embed');

export class EmplField extends Embed {
  static blotName = EditorContentType.EMPL_COL.blotName;
  static tagName = EditorContentType.EMPL_COL.blotName;

  static create(data) {
    const node = super.create("");
    node.innerHTML = "&#65279;";
    node.contentEditable = 'false';

    node.setAttribute('class', "editor-comp");
    node.setAttribute('type', data.type);
    node.setAttribute('name', data.name);
    node.setAttribute('title', data.title);

    return node;
  }

  static value(domNode) {
    return {
      type:  domNode.getAttribute('type'),
      name: domNode.getAttribute('name'),
      title: domNode.getAttribute('title')
    };
  }
}


