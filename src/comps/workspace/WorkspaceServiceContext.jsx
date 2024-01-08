import {createContext, useContext} from "react";

const WorkspaceService = createContext({
  onView: (id, callBackFunc) => {
    console.log("trigger update events.");
    callBackFunc();
  },

  onCreate: (data, callBackFunc) => {
    console.log("trigger onCreate events.", data);
    callBackFunc();
  },

  onUpdate: (data, callBackFunc) => {
    console.log("trigger update events.", data);
    callBackFunc();
  },

  onDelete: (callBackFunc) => {
    console.log("trigger after delete events.");
    callBackFunc();
  },

  onRevert: (callBackFunc) => {
    console.log("trigger revert events.");
    callBackFunc();
  },
});

export default WorkspaceService;

export const useWorkspaceService = () => {
  const context = useContext(WorkspaceService);
  if (!context) {
    throw new Error('useWorkspaceService must be used within an WorkspaceService');
  }
  return context;
};