import { Link } from "react-router-dom";
import routers from "./routers/routers.js";
import styled from "styled-components";

export function EntryPage() {
  return (
    <IndexPageStyle>
      <h1>Please Select a menu below.</h1>

      <nav>
        <ul>
          <li>
            <Link to={routers.index}>Trang Index</Link>
          </li>

          <li>
            <Link to={routers.get_token}>Get Token</Link>
          </li>

          <li>
            <Link to={routers.document.create_template}>
              THIẾT KẾ MẪU CHỨNG TỪ
            </Link>
          </li>

          <li>
            <Link to={routers.document.generate}>
              TẠO CHỨNG TỪ TỪ MẪU THIẾT KẾ
            </Link>
          </li>

          <li>
            <Link to={routers.process.create}>THIẾT KẾ QUY TRÌNH TRÌNH KÝ</Link>
          </li>
        </ul>
      </nav>
    </IndexPageStyle>
  );
}

const IndexPageStyle = styled.div`
  background: #fff;
  height: 100%;
`;
