import { firebaseConfig } from "./firebase-config";
import { initializeApp } from "firebase/app";
import { EuphoniumProps } from "../../model/euphonium.model";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const newImage = async (info: Partial<EuphoniumProps>, file: File) => {
  const storagaRef = ref(storage, info.instrumentModel);
  await uploadBytes(storagaRef, file);
  const imgUrl = await getDownloadURL(storagaRef);
  info.image = imgUrl;
};
