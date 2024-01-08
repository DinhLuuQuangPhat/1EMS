import GetCompanyToken from "../../comps/testing/step_one/GetCompanyToken";
import React from "react";
import PageLayout from "../../comps/layout/PageLayout";

export function GetTokenPage() {
  return (
    <PageLayout className={"get-token-page"} title={"Get Token Page"}>
      <GetCompanyToken />
    </PageLayout>
  )
}
