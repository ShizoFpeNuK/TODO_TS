import { EditOutlined, FileAddOutlined } from "@ant-design/icons";
import { Card, Form, Input } from "antd"
import { IToDoChange, IToDoNew } from "../models";
import { CardBody, CardTitle } from "../style/card";

interface FormAddProps {
  todoNew: IToDoNew,
}

interface FormChangeProps {
  todoChange: IToDoChange,
}

export const FormAddToDo = ({todoNew}: FormAddProps) => {
  const [form] = Form.useForm();

  return (
    <Card title={"Создать"} headStyle={CardTitle} bodyStyle={CardBody} style={{ marginBottom: "40px" }} actions={[
      <div onClick={todoNew.createToDo} className='icon'><FileAddOutlined key="add" /></div>
    ]}>
      <Form form={form} layout="vertical">
        <Form.Item noStyle>
          <Input value={todoNew.title} onChange={e => todoNew.setTitle(e.target.value)} style={{ marginBottom: "30px" }} placeholder="Введите заголовок" />
        </Form.Item>
        <Form.Item noStyle>
          <Input value={todoNew.description} onChange={e => todoNew.setDescription(e.target.value)} placeholder="Введите описание" />
        </Form.Item>
      </Form>
    </Card>
  );
};

export const FormUpdateToDo = ({todoChange}: FormChangeProps) => {
  const [form] = Form.useForm();

  return (
    <Card title={"Изменить"} headStyle={CardTitle} bodyStyle={CardBody} style={{ marginBottom: "40px" }} actions={[
      <div onClick={() => todoChange.updateToDo(todoChange.id)} className='icon'><EditOutlined key="edit" /></div>
    ]}>
      <Form form={form} layout="vertical">
        <Form.Item noStyle>
          <Input value={todoChange.title} onChange={e => todoChange.setTitle(e.target.value)} style={{ marginBottom: "30px" }} placeholder="Введите заголовок" />
        </Form.Item>
        <Form.Item noStyle>
          <Input value={todoChange.description} onChange={e => todoChange.setDescription(e.target.value)} placeholder="Введите описание" />
        </Form.Item>
      </Form>
    </Card>
  );
};