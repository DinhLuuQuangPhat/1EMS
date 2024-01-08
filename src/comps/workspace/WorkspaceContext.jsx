import { createContext, useContext, useEffect, useState} from "react";
import { Action, WorkspaceAction, WorkspaceMode} from "./actions.js";

const WorkspaceContext = createContext({

  id: null,
  item: null,

  mode: WorkspaceMode.default,
  changeMode: (mode) => {
    console.log(mode);
  },

  actions: [],
  disabledActions: [],


  action: {action: Action.default, timestamp: -1},
  dispatchAction: (action) => {
    console.log(action)
  },
  setDisabledActions: (actions) => {
    console.log(actions)
  },

  onSelect: (id) => {
    console.log(id);
  },

  onSelectItem: (item) => {
    console.log(item);
  },

  onView: (id, item) => {
    console.log(id, item);
  },

  onEdit: (id) => {
    console.log(id);
  },

  onSave: (id) => {
    console.log(id);
  },

  onDelete: (id) => {
    console.log(id);
  },

  onReset: () => {

  },
});


const default_actions = [WorkspaceAction.add];

const WorkspaceContextProvider = (props) => {
  const [id, setSelectedId] = useState(null);
  const [item, setItem] = useState(null);

  const [action, setAction] = useState({action: Action.default, timestamp: -1});
  const [actions, setActions] = useState(default_actions);
  const [mode, setMode] = useState(WorkspaceMode.default);
  const [disabledActions, setDisabledActions] = useState([]);

  useEffect(() => {
    return () => {
      resetToDefault();
    }
  }, []);

  useEffect(() => {
    if (mode === WorkspaceMode.default) {
      resetToDefault();

    } else if (mode === WorkspaceMode.custom) {
      // do nothing.....
    } else if (mode === WorkspaceMode.view) {
      setActions([WorkspaceAction.add, WorkspaceAction.edit, WorkspaceAction.delete, WorkspaceAction.print]);

    } else if (mode === WorkspaceMode.add_new) {
      setActions([WorkspaceAction.save, WorkspaceAction.revert]);

    } else if (mode === WorkspaceMode.edit) {
      setActions([WorkspaceAction.save, WorkspaceAction.revert]);

    } else {
      setActions(default_actions);
    }
  }, [mode]);

  const changeMode = (mode) => {
    setMode(mode);
  }

  const onSelect = (id) => {
    setSelectedId(id);
  }

  const onView = (id) => {
    setSelectedId(id);
    changeMode(WorkspaceMode.view);
  }

  const onEdit = (id) => {
    setSelectedId(id);
    changeMode(WorkspaceMode.edit);
  }

  const onSave = (id) => {
    setSelectedId(id);
    changeMode(WorkspaceMode.view);
  }

  const onDelete = () => {
    resetToDefault();
  }

  const resetToDefault = () => {
    setSelectedId(null);
    setItem(null);
    setActions(default_actions);

    changeMode(WorkspaceMode.default);
    dispatchAction(Action.refresh);
  }

  const onSelectItem = (item) => {
    setItem(item);
  }

  const dispatchAction = (action) => {
    setAction({action: action, timestamp: new Date().getTime()})
  }

  return (
    <WorkspaceContext.Provider value={{
      id: id,
      item: item,

      actions: actions,
      disabledActions: disabledActions,

      mode: mode,
      changeMode: changeMode,

      action: action,
      dispatchAction: dispatchAction,
      setDisabledActions: setDisabledActions,

      onSelect: onSelect,
      onSelectItem: onSelectItem,
      onView: onView,
      onEdit: onEdit,
      onSave: onSave,
      onDelete: onDelete,
      onReset: resetToDefault,
    }}>
      {props.children}
    </WorkspaceContext.Provider>
  )
}

export default WorkspaceContextProvider;

export const useWorkspaceContext = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspaceContext must be used within an WorkspaceContextProvider');
  }
  return context;
};