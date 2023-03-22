import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.js";
import { UserProps } from "../model/user.model.js";
import { UserRepo } from "../services/repository/user.repo.js";
import * as ac from "../reducer/user.action.creator";

export function useUsers(repo: UserRepo) {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const regUser = async (user: Partial<UserProps>) => {
    try {
      await repo.registerUser(user);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const logUser = async (user: Partial<UserProps>) => {
    try {
      const userData = await repo.loginUser(user);
      dispatch(ac.loadCreator(userData));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    users,
    regUser,
    logUser,
  };
}
