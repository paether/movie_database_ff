import { useParams, useNavigate } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>back</button>
      detail {id}
    </div>
  );
}

export default Detail;
