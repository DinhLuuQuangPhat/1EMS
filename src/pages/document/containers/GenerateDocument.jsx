import { useEffect, useRef, useState } from "react";
import SelectDocumentTemplate from "../../document-template/components/SelectDocumentTemplate.jsx";
import InputGroup from "../../../comps/input/InputGroup.jsx";
import Button from "../../../comps/button/Button";
import { ButtonIcons } from "../../../comps/button/ButtonIcons";
import styled from "styled-components";
import { useWorkspaceContext } from "../../../comps/workspace/WorkspaceContext";
import {
  Action,
  WorkspaceAction,
  WorkspaceMode,
} from "../../../comps/workspace/actions";
import Workspace from "../../../comps/workspace/Workspace";
import DocumentTemplateService from "../../document-template/context/DocumentTemplateService";
import { WorkspaceToolbar } from "../../../comps/workspace/WorkspaceToolbar";
import SelectDocument from "../components/SelectDocument";
import ComposeDocument from "../components/template/ComposeDocument";
import { useReactToPrint } from "react-to-print";
import { ComposeDocumentContextProvider } from "../context/ComposeDocumentContextProvider";

import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";
import useDeleteDocument from "../services/deleteDocument";

export default function GenerateDocument() {
  return (
    <Workspace>
      <DocumentTemplateService>
        <GenerateDocumentContainer />
      </DocumentTemplateService>
    </Workspace>
  );
}

function GenerateDocumentContainer() {
  const { deleteItem } = useDeleteDocument();
  const { mode, changeMode, action, dispatchAction } = useWorkspaceContext();

  const [templateCode, setTemplateCode] = useState("");
  const [template, setTemplate] = useState(null);

  const [documentCode, setDocumentCode] = useState("");
  const [totalDocument, setTotalDocument] = useState(0);
  const [message, setMessage] = useState({
    type: "",
    msg: "",
  });

  useEffect(() => {
    if (action && action.action === Action.request_print) {
      handlePrint();
    }
  }, [action]);

  const onSelectTemplate = (item) => {
    setTemplateCode(item.ITEMCODE);
    setTemplate(item);

    setDocumentCode("");
    changeMode(WorkspaceMode.default);
    dispatchAction(Action.default);
  };

  const onSelectDocumentCode = (documentCode) => {
    setDocumentCode(documentCode);
    changeMode(WorkspaceMode.default);
    dispatchAction(Action.default);
  };

  const loadDocument = (documentCode) => {
    setDocumentCode(documentCode);
    changeMode(WorkspaceMode.view);
    dispatchAction(Action.default);
  };

  const onDocumentChange = (size) => {
    setTotalDocument(size);
  };

  const handleOnCreateSuccess = (document) => {
    setDocumentCode(document.KKKK0000);
    dispatchAction(Action.refresh);
    changeMode(WorkspaceMode.view);
    setMessage({ type: "success", msg: "Thêm thành công." });
  };

  const handleOnUpdateSuccess = (document) => {
    setDocumentCode(document.KKKK0000);
    dispatchAction(Action.refresh);
    changeMode(WorkspaceMode.view);
    setMessage({ type: "success", msg: "Lưu thành công." });
  };

  const handleOnError = () => {
    setMessage({ type: "error", msg: "Không thể cập nhật nội dung." });
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      dispatchAction(Action.default);
    },
  });

  const handleOnDelete = (callBackFunc) => {
    if (documentCode) {
      deleteItem(documentCode, () => {
        setDocumentCode("");
        changeMode(WorkspaceMode.default);
        callBackFunc();
      });
    }
  };

  return (
    <div>
      <GenerateDocToolbarWrapper>
        <div className={"input-groups"}>
          <InputGroup label={"Loại chứng từ"} className={"mb-0"}>
            <SelectDocumentTemplate
              value={templateCode}
              onChange={onSelectTemplate}
            />
          </InputGroup>

          <InputGroup
            label={
              "Số chứng từ" +
              (totalDocument >= 0 ? " (" + totalDocument + ")" : "")
            }
            className={"mb-0"}
            addons={
              <Button
                icon={ButtonIcons.load}
                disabled={!(templateCode && documentCode)}
                onClick={() => loadDocument(documentCode)}
              >
                Load
              </Button>
            }
          >
            <SelectDocument
              action={action}
              templateCode={templateCode}
              value={documentCode}
              onChange={onSelectDocumentCode}
              onOptionChange={(val) => onDocumentChange(val)}
            />
          </InputGroup>
        </div>

        <WorkspaceToolbar
          onDelete={handleOnDelete}
          actions={[
            WorkspaceAction.add,
            WorkspaceAction.edit,
            WorkspaceAction.delete,
            WorkspaceAction.save,
            WorkspaceAction.print,
          ]}
        />
      </GenerateDocToolbarWrapper>

      {template && mode === WorkspaceMode.add_new && (
        <ComposeDocumentContextProvider>
          <ComposeDocument
            mode={"add-new"}
            template={template}
            isReviewMode={false}
            onCreateSuccess={handleOnCreateSuccess}
            onError={handleOnError}
          />
        </ComposeDocumentContextProvider>
      )}

      {template && documentCode && mode === WorkspaceMode.view && (
        <PrintLayoutStyle className={"print-layout"} ref={componentRef}>
          <ComposeDocument
            mode={"review"}
            template={template}
            documentCode={documentCode}
            isReviewMode={true}
          />
        </PrintLayoutStyle>
      )}

      {template && documentCode && mode === WorkspaceMode.edit && (
        <ComposeDocumentContextProvider>
          <ComposeDocument
            mode={"edit"}
            template={template}
            documentCode={documentCode}
            isReviewMode={false}
            onUpdateSuccess={handleOnUpdateSuccess}
            onError={handleOnError}
          />
        </ComposeDocumentContextProvider>
      )}

      <NotificationGroup
        style={{
          right: 0,
          bottom: 0,
          alignItems: "flex-start",
          flexWrap: "wrap-reverse",
        }}
      >
        <Fade>
          {message.type === "success" && (
            <Notification
              type={{
                style: "success",
                icon: false,
              }}
              closable={true}
              onClose={() =>
                setMessage({
                  type: "",
                  msg: "",
                })
              }
            >
              <span>{message.msg}</span>
            </Notification>
          )}

          {message.type === "error" && (
            <Notification
              type={{
                style: "error",
                icon: false,
              }}
              closable={true}
              onClose={() =>
                setMessage({
                  type: "",
                  msg: "",
                })
              }
            >
              <span>{message.msg}</span>
            </Notification>
          )}
        </Fade>
      </NotificationGroup>
    </div>
  );
}

const PrintLayoutStyle = styled.div``;

const GenerateDocToolbarWrapper = styled.div`
  display: flex;
  gap: 32px;

  .input-groups {
    flex-grow: 1;
    display: flex;
    gap: 16px;

    .input-group-fields {
      margin-bottom: 0 !important;

      .input-group-field {
        max-width: calc(100% - 120px);
      }
    }
  }

  .create-document-toolbar {
    white-space: nowrap;
  }
`;
