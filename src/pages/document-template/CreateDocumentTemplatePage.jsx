import PageLayout from "../../comps/layout/PageLayout.jsx";
import DocumentTemplate from "./containers/DocumentTemplate.jsx";

export default function CreateDocumentTemplatePage() {
  return (
    <PageLayout className={"design-document-page"} title={"THIẾT KẾ MẪU CHỨNG TỪ"}>
      <DocumentTemplate/>
    </PageLayout>
  )
}