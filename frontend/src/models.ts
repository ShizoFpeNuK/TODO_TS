import { FormInstance } from "antd";

export interface IToDo {
  createdAt: string;
  description: string;
  id: string;
  isCompleted: boolean;
  title: string;
  updatedAt: string;
}

export interface IForm {
  title: string;
  sentForm: FormInstance<any>;
}

export interface IToDoNew {
  description: string;
  id?: string;
  title: string;
  // createToDo: (path: string) => void;
  // setTitle: React.Dispatch<React.SetStateAction<string>>;
  // setDescription: React.Dispatch<React.SetStateAction<string>>
}