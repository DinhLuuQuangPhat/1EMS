import React, { useEffect, useState } from "react";
import TextEditorCompose from "../../../../comps/texteditor/TextEditorCompose";
import viewDocumentTemplate from "../../../document-template/services/viewDocumentTemplate";
import ComposeEditorLayout from "../../../../comps/layout/ComposeEditorLayout";
import viewDocumentDetail from "../../services/viewDocumentDetail";
import { useWorkspaceContext } from "../../../../comps/workspace/WorkspaceContext";
import { Action } from "../../../../comps/workspace/actions";
import updateDocument from "../../services/updateDocument";
import { useComposeDocumentContext } from "../../context/ComposeDocumentContextProvider";
import { postFileService } from "../../../../components/PDKCT/Service";

export default function ComposeDocument({
  mode,
  template,
  documentCode,
  isReviewMode,
  onCreateSuccess,
  onUpdateSuccess,
  onError,
}) {
  const { action } = useWorkspaceContext();
  const { files } = useComposeDocumentContext();

  const { viewItem } = viewDocumentTemplate();
  const { viewDetail } = viewDocumentDetail();
  const { updateItem } = updateDocument();

  const [content, setContent] = useState("");
  const [fieldData, setFieldData] = useState({});
  const [templateDetail, setTemplateDetail] = useState(null);
  const [document, setDocument] = useState(null);

  useEffect(() => {
    if (template != null) {
      loadDocumentTemplate(template.ITEMCODE);
    }
  }, [template]);

  useEffect(() => {
    if (templateDetail != null && documentCode != null) {
      loadDocument(templateDetail, documentCode);
    }
  }, [templateDetail, documentCode]);

  useEffect(() => {
    if (action && action.action === Action.request_save) {
      saveDocuments(
        (res) => {
          const docData = res.RETNDATA[0];

          if (mode === "add-new") {
            if (files.length > 0) {
              postFileService(docData.DDDD, docData.KKKK0000, files, () => {
                onCreateSuccess(docData);
              });
            } else {
              onCreateSuccess(docData);
            }
          } else {
            onUpdateSuccess(docData);
          }
        },
        () => {
          onError();
        }
      );
    }
  }, [action]);

  const loadDocumentTemplate = (templateCode) => {
    viewItem(templateCode, (res) => {
      setTemplateDetail(res.RETNDATA[0]);
      // set document content;
      setContent(res.RETNDATA[0].HTMLTEXT);
    });
  };

  const loadDocument = (templateDetail, KKKK0000) => {
    const data = {
      COMPCODE: templateDetail.COMPCODE,
      ITEMCODE: templateDetail.DCMNCODE,
      KKKK0000: KKKK0000,
    };

    viewDetail(data, (res) => {
      const docData = res.RETNDATA[0];
      setDocument(docData);

      setFieldData({
        DDDD: docData.DDDD,
        DCMNCODE: docData.DCMNCODE,
        KKKK0000: docData.KKKK0000,

        LOGO_COL: docData.LOGO_COL,
        CODE_COL: docData.MAINCODE, // "<Ngày chứng từ>"
        DATE_COL: docData.MAINDATE, // "<Giá trị>"
        VLUE_COL: docData.VLUENUMB,
        CNTN_COL: docData.CNTNTEXT,
        NOTE_COL: docData.NOTETEXT, // "<Diễn giải>"
        EMPL_COL: docData.EMPLCODE, // "<Mã nhân viên nhận>",

        FILE_COL: docData.LINKFILE,

        DCMNFILE: docData.DCMNFILE,
      });
    });
  };

  const saveDocuments = (onSuccess, onErrorFunc) => {
    const requestData = {
      LOGO_COL: fieldData.LOGO_COL,
      CODE_COL: fieldData.MAINCODE,
      DATE_COL: fieldData.DATE_COL,
      VLUE_COL: fieldData.VLUE_COL,
      CNTN_COL: fieldData.CNTN_COL,
      NOTE_COL: fieldData.NOTE_COL,
      EMPL_COL: fieldData.EMPL_COL,
    };

    if (document != null) {
      updateItem(
        false,
        {
          template: templateDetail,
          document: {
            MAINCODE: document.MAINCODE,
            KKKK0000: document.KKKK0000,
          },
        },
        requestData,
        onSuccess,
        onErrorFunc
      );
    } else {
      updateItem(true, templateDetail, requestData, onSuccess, onErrorFunc);
    }
  };

  const onPropsChange = (props) => {
    setFieldData(props);
  };

  return (
    <ComposeEditorLayout className={mode + "-mode"}>
      <TextEditorCompose
        content={content}
        values={fieldData}
        onChange={onPropsChange}
        disabled={isReviewMode}
      />
    </ComposeEditorLayout>
  );
}
