import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setShareId } from "../../actions/user";

export const Share = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShareId(id));

    navigate("/");
  }, [dispatch, navigate, id]);
};
