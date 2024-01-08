
const STEP_TRINH_KI = 1;
const STEP_PHE_DUYET = 2;
const STEP_THUC_HIEN = 3;

const ProcessValidation = {
  validate:  (steps ) => {
    let ROLEAPRV = 1;
    let isValid = true;
    let trinhKiCount = 0;
    let pheDuyetCount = 0;

    steps.forEach((step) => {
      if(step.ROLEAPRV != null && `${step.ROLEAPRV}`.trim() !== ""){
        const stepRoleAPRV = Number(step.ROLEAPRV);

        // kiem tra theo dung thu tu hay khong. Phai tu 1 > 2 > 3 khong chap nhan 1 > 3 > 2.
        if(stepRoleAPRV === ROLEAPRV || stepRoleAPRV === ROLEAPRV + 1){
          if(stepRoleAPRV === STEP_TRINH_KI){
            trinhKiCount += 1;
          }

          if(stepRoleAPRV === STEP_PHE_DUYET){
            pheDuyetCount += 1;
          }

          ROLEAPRV = stepRoleAPRV;
        } else {
          isValid = false;
        }
      } else {
        isValid = false;
      }
    });

    // buoc xet duyet phai theo thu tu.
    if(! isValid){
      return false;

      // phai co day du buoc trinh ki va phe duyet
    } else if(trinhKiCount < 1 || ROLEAPRV < STEP_PHE_DUYET){
      return false;

      // buoc phe duyet chi duoc xuat hien 1 lan
    } else if (pheDuyetCount > 1){
      return false;
    } else {
      return true;
    }
  }
}

export default ProcessValidation