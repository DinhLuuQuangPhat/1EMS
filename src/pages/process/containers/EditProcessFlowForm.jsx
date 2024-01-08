import React, {useEffect, useMemo, useState} from "react";
import {ProcessHeaderDraggable} from "../component/item/ProcessHeader";
import ProcessIcon from "../component/item/ProcessIcon";
import Modal from "../../../comps/modal/Modal";
import DragDropProvider, {DragNDropUtils} from "../../../comps/drag-n-drop/DragDropProvider";
import DropItem from "../../../comps/drag-n-drop/DropItem";
import DragItem from "../../../comps/drag-n-drop/DragItem";
import styled from "styled-components";
import CreateProcessStepForm from "../component/form/CreateProcessStepForm";
import viewProcessDetail from "../services/viewProcessDetail";
import updateProcess from "../services/updateProcess";
import {Action} from "../../../comps/workspace/actions";
import {Notification} from "@progress/kendo-react-notification";
import ProcessValidation from "../ProcessValidation";


const EditActionType = {
  default: "",
  add_new: "add",
  update: "update",
}
export default function EditProcessFlowForm({action, templateCode, processCode, template, onSuccess}) {
  const {viewProcess, data} = viewProcessDetail();
  const {updateItem} = updateProcess();

  const [errorMsg, setErrorMsg] = useState("");
  const [actionType, setActionType] = useState(EditActionType.default);
  const [steps, setSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState(null);

  const hasData = useMemo(() => {
    return data && data.DETAIL != null && data.DETAIL.length > 0 && data.DETAIL[0].ROLEAPRV;
  }, [data]);

  useEffect(() => {
    viewProcess(templateCode, processCode);
  }, [templateCode, processCode]);

  useEffect(() => {
    if(action && action.action === Action.request_save){
      setErrorMsg("");

      const isValid = ProcessValidation.validate(steps);

      if(isValid){
        updateItem(data, template.ITEMNAME, steps, () => {
          onSuccess(templateCode, processCode);
        });
      } else {
        setErrorMsg("Các bước tờ trình không hợp lệ. Vui lòng kiểm tra lại.")
      }
    }
  }, [action]);

  useEffect(() => {
    if (data) {
      const steps = data.DETAIL.filter((dt) => {
        return dt.ROLEAPRV != null;
      })

      setSteps(steps.map((step, index) => {
        return {
          "PRCSODER": index,

          "WORKNAME": step.WORKNAME,
          "PSJBTYPE": step.PSJBTYPE,
          "PSJBCODE": step.PSJBCODE,

          "ROLEAPRV": step.ROLEAPRV,

          "SENDMAIL": step.SENDMAIL,

          "DLAYTIME": step.DLAYTIME,
          "DLAYTYPE": step.DLAYTYPE,

          "PRCSLIST": step.PRCSLIST,

          "PRCSCODE": step.PRCSCODE,

          "NOTETEXT": step.NOTETEXT
        }
      }));
    }
  }, [data]);

  const onCancel = () => {
    setSelectedStep(null);
  }

  const handleOnDragEnd = (data) => {
    const {target, from, fromIndex, to, toIndex} = data;

    // if add new
    if (from === "object-banks" && to !== "object-banks") {
      onAddNewProcess(target === "staff", toIndex);
    } else {
      onReorderProcess(fromIndex, toIndex)
    }
  }

  const updateProcessAndStep = (newSteps) => {
    setSteps(newSteps.map((st, index) => {
      return {...st, PRCSODER: index}
    }));
    setSelectedStep(null);
  }

  const onShowCurrentProcess = (step) => {
    setActionType(EditActionType.update);
    setSelectedStep(step);
  }

  const onAddNewProcess = (isStaff, toIndex) => {
    setActionType(EditActionType.add_new);
    setSelectedStep({PRCSODER: toIndex, WORKNAME: ""});
  }

  const onReorderProcess = (fromIndex, toIndex) => {
    const reorderSteps = DragNDropUtils.reorder(steps, fromIndex, toIndex);
    const newSteps = reorderSteps.map((rc, index) => {
      return {...rc, PRCSODER: index}
    })
    updateProcessAndStep(newSteps);
  }

  const onDeleteProcess = (data) => {
    const {target} = data;

    const removedSteps = steps.filter((st, index) => {
      return index + "" !== target;
    });

    updateProcessAndStep(removedSteps);
  }

  const handleOnSubmit = (value) => {
    if (actionType === EditActionType.add_new) {
      // increase the current step to 1
      const currentStep = steps.map((st) => {
        if (st.PRCSODER >= value.PRCSODER) {
          return {...st, PRCSODER: st.PRCSODER + 1}
        } else {
          return {...st}
        }
      });

      // then push the value and reorder
      const newStep = [value, ...currentStep].sort((a, b) => {
        return a.PRCSODER - b.PRCSODER;
      });
      // then save.
      updateProcessAndStep(newStep);
    } else {
      const newStep = steps.map((st) => {
        if (st.PRCSODER === value.PRCSODER) {
          return {...value};
        } else {
          return {...st};
        }
      });

      updateProcessAndStep(newStep);
    }
  }

  return (
    <EditProcessFlowFormStyle
      className={"edit-process-flow border-solid border-1 border-blue-700 bg-gray-50 mt-5 update-mode"}>
      {data && (
        <DragDropProvider onDragEnd={handleOnDragEnd} onRemove={onDeleteProcess}>
          <ProcessHeaderDraggable process={data}/>

          <div className={'view-process-step flex'}>
            <DropItem droppableId={"step"}>
              {hasData ? (
                <>
                  {steps.map((step, index) => {
                    return (
                      <React.Fragment key={step.PRCSODER}>
                        <DragItem draggableId={step.PRCSODER + ""} index={index}
                                  onClick={() => onShowCurrentProcess(step)}>
                          <ProcessIcon index={index} group={step.ROLEAPRV} name={step.WORKNAME}/>
                        </DragItem>
                        <div className={'view-process-arrow'}>→</div>
                      </React.Fragment>
                    )
                  })}
                </>
              ) : (
                <>
                  Drop the step here....
                </>
              )}
            </DropItem>
          </div>
        </DragDropProvider>
      )}

      {selectedStep && (
        <Modal title={`Bước ${selectedStep.PRCSODER + 1}: ${selectedStep.WORKNAME}`} onClose={onCancel}>
          <CreateProcessStepForm step={selectedStep} onSubmit={handleOnSubmit} onCancel={onCancel}/>
        </Modal>
      )}

      {errorMsg && (
        <Notification
          type={{
            style: "error",
            icon: false,
          }}
          closable={true}
          onClose={() =>
            setErrorMsg("")
          }
        >
          <span>{errorMsg}</span>
        </Notification>
      )}
    </EditProcessFlowFormStyle>
  )
}

const EditProcessFlowFormStyle = styled.div`
  .view-process-arrow {
    min-width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 125%;
  }

  .view-process-step {
    .drop-item {
      width: 100%;
      padding: 15px;
      background: #FFF !important;
    }

    .drag-item {
      background: #FFF !important;
      border: 1px dashed #ccc;
    }
  }
`;
