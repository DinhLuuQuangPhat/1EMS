import PageLayout from "../../comps/layout/PageLayout.jsx";
import ManageProcess from "./containers/ManageProcess.jsx";

export default function CreateProcessPage() {
  return (
    <PageLayout className={"create-process-page"} title={"THIẾT KẾ QUY TRÌNH TRÌNH KÝ"}>
      <ManageProcess/>
    </PageLayout>
  )
}