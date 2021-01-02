import { incrementCount } from "../services/commerceService";

export const incrementCounterAction = () => async (dispatch, getState) => {
  const newCount = await incrementCount();
  dispatch({
    type: "INCREMENT",
    payload: newCount,
  });
};
