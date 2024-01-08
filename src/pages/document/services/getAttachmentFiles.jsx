import {useWorkspaceContext} from "../../../comps/workspace/WorkspaceContext";

export default function getAttachmentFiles(){
  const {id} = useWorkspaceContext();

  console.log(id);
}