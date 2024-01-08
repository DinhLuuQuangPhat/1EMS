import WorkspaceContextProvider, {useWorkspaceContext} from "./WorkspaceContext.jsx";
import FormLayout from "../layout/FormLayout";

const Workspace = (props) => {
  return (
    <WorkspaceContextProvider>
      <WorkspaceContent>{props.children}</WorkspaceContent>
    </WorkspaceContextProvider>
  )
}
export default Workspace;

const WorkspaceContent = (props) => {
  const { mode } = useWorkspaceContext();

  return (
    <FormLayout>
      <div className={`workspace-content ${mode}-mode`}>
        {props.children}
      </div>
    </FormLayout>
  )
}