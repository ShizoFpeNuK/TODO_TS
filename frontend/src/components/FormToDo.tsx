import { EditOutlined, FileAddOutlined } from "@ant-design/icons";
import { Card, Form, Input } from "antd"
import { IForm, IToDoNew } from "../models";
import { CardBody, CardTitle } from "../style/card";

interface FormProps {
  form: IForm,
  todo: IToDoNew,
}


export const FormAddToDo = (props: any) => {

  return (
    <Card title={props.form.title} headStyle={CardTitle} bodyStyle={CardBody} style={{marginBottom: "40px"}} actions={[
        <div onClick={props.createToDo} className='icon'><FileAddOutlined key="add" /></div>
      ]}>
        <Form form={props.form.sentForm} layout="vertical">
            <Form.Item noStyle>
                <Input value={props.todo.title} onChange={e => props.setTitle(e.target.value)} style={{marginBottom: "30px"}} placeholder="Введите заголовок" />
            </Form.Item>
            <Form.Item noStyle>
                <Input value={props.todo.description} onChange={e => props.setDescription(e.target.value)} placeholder="Введите описание" />
            </Form.Item>
        </Form>
    </Card>
  );
};

export const FormUpdateToDo = (props: any) => { 

  return (
    <Card title={props.form.title} headStyle={CardTitle} bodyStyle={CardBody} style={{marginBottom: "40px"}} actions={[
        <div onClick={() => props.todo.function.updateToDo(props.todo.id)} className='icon'><EditOutlined key="edit" /></div>
      ]}>
      <Form form={props.form.form} layout="vertical">
        <Form.Item noStyle>
          <Input value={props.todo.title} onChange={e => props.todo.function.setTitle(e.target.value)} style={{marginBottom: "30px"}} placeholder="Введите заголовок" />
        </Form.Item>
        <Form.Item noStyle>
          <Input value={props.todo.description} onChange={e => props.todo.function.setDescription(e.target.value)} placeholder="Введите описание" />
        </Form.Item>
      </Form>
    </Card>
  );
};