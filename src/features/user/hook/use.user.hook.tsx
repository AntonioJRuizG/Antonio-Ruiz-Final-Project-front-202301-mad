import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.js";
import { UserStructure } from "../model/user.model.js";
import { UserRepo } from "../services/repository/user.repo.js";
import * as ac from "../reducer/user.action.creator";

export function useUsers(repo: UserRepo) {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const regUser = async (user: Partial<UserStructure>) => {
    try {
      await repo.registerUser(user);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const logUser = async (user: Partial<UserStructure>) => {
    try {
      const userData = await repo.loginUser(user);
      dispatch(ac.loadCreator(userData.user));
      return userData;
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
