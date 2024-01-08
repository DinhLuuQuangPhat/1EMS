import { EditorInputType } from "../input/EditorInput";
import { Quill } from "react-quill";
import moment from "moment";

const nowDay = moment(new Date()).format("DD/MM/YYYY");

export const EditorContentType = {
  LOGO_COL: {
    blotName: "comp-logo",
    target: "LOGO",
    name: "LOGO_COL",
    type: EditorInputType.background_img,
    title: "LOGO",
  },
  CODE_COL: {
    blotName: "comp-code",
    target: "CODE",
    name: "CODE_COL",
    type: EditorInputType.text,
    title: "CT000000",
  },
  DATE_COL: {
    blotName: "comp-date",
    target: "DATE",
    name: "DATE_COL",
    type: EditorInputType.date,
    title: nowDay,
  },

  VLUE_COL: {
    blotName: "comp-value",
    target: "VLUE",
    name: "VLUE_COL",
    type: EditorInputType.money,
    title: "#,##0.###",
  },
  CNTN_COL: {
    blotName: "comp-cntn",
    target: "CNTN",
    name: "CNTN_COL",
    type: EditorInputType.textarea,
    title: "Noi dung...",
  },
  NOTE_COL: {
    blotName: "comp-note",
    target: "NOTE",
    name: "NOTE_COL",
    type: EditorInputType.textarea,
    title: "Dien giai...",
  },
  EMPL_COL: {
    blotName: "comp-empl",
    target: "EMPL",
    name: "EMPL_COL",
    type: EditorInputType.user,
    title: "Nguoi Nhan",
  },
  FILE_COL: {
    blotName: "comp-file",
    target: "FILE",
    name: "FILE_COL",
    type: EditorInputType.attach_files,
    title: "File Dinh Kem",
  },
};

const generateTag = (data, tag) => {
  if (tag === "div") {
    return `<div class="document-field-comp" type="${data.type}" title="${data.name}" contenteditable="false">${data.title}</div>`;
  } else {
    return ` <span class="document-field-comp" type="${data.type}" title="${data.name}" title="${data.title}" contenteditable="false">${data.title}</span> `;
  }
};
export function insert_LOGO(args) {
  handleCreateTag(this.quill, EditorContentType.LOGO_COL);
}
export function insert_soCT(args) {
  handleCreateTag(this.quill, EditorContentType.CODE_COL);
}
export function insert_ngayCT(args) {
  handleCreateTag(this.quill, EditorContentType.DATE_COL);
}
export function insert_triGia(args) {
  handleCreateTag(this.quill, EditorContentType.VLUE_COL);
}
export function insert_noiDung(args) {
  handleCreateTag(this.quill, EditorContentType.CNTN_COL);
}
export function insert_dienGiai(args) {
  handleCreateTag(this.quill, EditorContentType.NOTE_COL);
}
export function insert_nguoiNhan(args) {
  handleCreateTag(this.quill, EditorContentType.EMPL_COL);
}
export function insert_fileDinhKem(args) {
  handleCreateTag(this.quill, EditorContentType.FILE_COL);
}

function handleCreateTag_rm(quill, data) {
  const content = getContentHTMl(data.name);
  console.log("handleCreateTag.....................................", content);

  let range = quill.getSelection(true);
  quill.clipboard.dangerouslyPasteHTML(
    range.index + range.length + 1,
    content.html
  );
  quill.insertText(range.index + range.length + 1, " ");
  quill.setSelection(range.index + range.length + 1);
}

function handleCreateTag(quill, data) {
  let range = quill.getSelection(true);
  try {
    quill.format(data.blotName, {
      type: data.type,
      name: data.name,
      title: data.title,
    });
  } catch (e) {}
  // quill.insertText(range.index + range.length + 1, ' ');
  // quill.setSelection(range.index + range.length + 3);

  setTimeout(() => {
    quill.setSelection(quill.getSelection().index + 2);
  }, 100);
}

function handleCreateTag2(quill, data) {
  let range = quill.getSelection(true);
  quill.deleteText(range.index, range.length);
  quill.insertEmbed(range.index, "link", {
    type: data.type,
    name: data.name,
    title: data.title,
  });
  quill.insertText(range.index + range.length + 1, " ");
  quill.setSelection(range.index + range.length + 1);
}

function handleCreateTag3(quill, data) {
  console.log("...............................", data);

  let range = quill.getSelection(true);
  quill.insertEmbed(
    range.index + 1,
    "link",
    { type: data.type, name: data.name, title: data.title },
    Quill.sources.USER
  );
  quill.setSelection(range.index + 2, Quill.sources.SILENT);
}

export const getContentHTMl = (name) => {
  switch (name) {
    case EditorContentType.LOGO_COL.name:
      return {
        html: generateTag(EditorContentType.LOGO_COL, "span"),
        size: EditorContentType.LOGO_COL.title.length,
      };
    case EditorContentType.CODE_COL.name:
      return {
        html: generateTag(EditorContentType.CODE_COL, "span"),
        size: EditorContentType.CODE_COL.title.length,
      };
    case EditorContentType.DATE_COL.name:
      return {
        html: generateTag(EditorContentType.DATE_COL, "span"),
        size: EditorContentType.DATE_COL.title.length,
      };
    case EditorContentType.VLUE_COL.name:
      return {
        html: generateTag(EditorContentType.VLUE_COL, "span"),
        size: EditorContentType.VLUE_COL.title.length,
      };
    case EditorContentType.CNTN_COL.name:
      return {
        html: generateTag(EditorContentType.CNTN_COL, "span"),
        size: EditorContentType.CNTN_COL.title.length,
      };
    case EditorContentType.NOTE_COL.name:
      return {
        html: generateTag(EditorContentType.NOTE_COL, "div"),
        size: EditorContentType.NOTE_COL.title.length,
      };
    case EditorContentType.EMPL_COL.name:
      return {
        html: generateTag(EditorContentType.EMPL_COL, "div"),
        size: EditorContentType.EMPL_COL.title.length,
      };
    case EditorContentType.FILE_COL.name:
      return {
        html: generateTag(EditorContentType.FILE_COL, "div"),
        size: EditorContentType.FILE_COL.title.length,
      };
    default:
      return "";
  }
};
