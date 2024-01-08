import {Quill} from "react-quill";

var Embed = Quill.import('blots/embed');

export  default  class MyCustomBlock extends Embed {
  static blotName = 'select';
  static tagName = 'select';

  static create(value) {
    var node = super.create(value);
    //node.innerHTML = `<select>${value}</select>`;

    const option1 = document.createElement('option');
    option1.innerText = 'option1';

    option1.contentEditable = 'false';
    node.appendChild(option1);

    const option2 = document.createElement('option');
    option2.innerText = 'option2';

    option2.contentEditable = 'false';
    node.appendChild(option2);

    return node;
  }

  static value(node) {
    return node.innerHTML;
  }
}