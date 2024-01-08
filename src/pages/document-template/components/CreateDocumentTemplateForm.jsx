import InputGroup from "../../../comps/input/InputGroup.jsx";
import Input from "../../../comps/input/Input.jsx";
import {useEffect, useState} from "react";
import ButtonGroup from "../../../comps/button/ButtonGroup";
import {ButtonIcons} from "../../../comps/button/ButtonIcons";
import ButtonPrimary from "../../../comps/button/ButtonPrimary";
import ButtonDanger from "../../../comps/button/ButtonDanger";
import InputValue from "../../../comps/input/InputValue";
import generateDocumentTemplateCode from "../services/generateDocumentTemplateCode";
import {useWorkspaceService} from "../../../comps/workspace/WorkspaceServiceContext";

export default function CreateDocumentTemplateForm(props) {
  const {onCreate} = useWorkspaceService()
  const {generateCode, data} = generateDocumentTemplateCode();

  const [maChungTu, setMaChungTu] = useState("");
  const [tenChungTu, setTenChungTu] = useState("");

  // load new ma chung tu.
  useEffect(() => {
    generateCode();
  }, []);

  useEffect(() => {
    if(data && data.RETNDATA && data.RETNDATA.length > 0){
      setMaChungTu(data.RETNDATA[0].DcmnCode);
    }
  }, [data]);

  const handleOnSubmit = () => {
    // call api to create a document
    onCreate({DCMNCODE: maChungTu, DCMNNAME: tenChungTu}, (res) => {
      if(res && res.RETNDATA && res.RETNDATA.length > 0){
        const document = res.RETNDATA[0];
        props.onSuccess(document.DCMNCODE, document.DCMNNAME);
      } else {
        alert("Error:" + JSON.stringify(res));
      }
    });
  }

  return (
    <div className="k-form">
      <div style={{width: 500}}>
        <InputValue layout={"horizontal"} label={"Mã chứng từ"}>{maChungTu}</InputValue>

        <InputGroup layout={"horizontal"} label={"Tên chứng từ"}>
          <Input value={tenChungTu} onChange={(val) => setTenChungTu(val)}/>
        </InputGroup>
      </div>

      <ButtonGroup className={"mt-10"} align={"right"}>
        <ButtonPrimary icon={ButtonIcons.save} onClick={handleOnSubmit}>
          Đồng ý
        </ButtonPrimary>

        <ButtonDanger onClick={props.onCancel}>
          Hủy
        </ButtonDanger>
      </ButtonGroup>
    </div>
  )
}