import PageLayout from "../../comps/layout/PageLayout.jsx";
import GenerateDocument from "./containers/GenerateDocument.jsx";

export default function GenerateDocumentPage() {
  return (
    <PageLayout className={"generate-document-page"} title={"TẠO CHỨNG TỪ TỪ MẪU THIẾT KẾ"}>
      <GenerateDocument/>
    </PageLayout>
  )
}