import './App.css';
import 'antd';
import axios from 'axios';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Row, Col, Card, Button, Space, Form, Pagination } from 'antd';
import { CardTitle, CardBody } from './style/card';
import { ButtonView } from './style/button';
import { IToDo } from './models';
import { useEffect, useState } from 'react';
import { FormAddToDo, FormUpdateToDo } from './components/FormToDo';

function App() {
  const pathDefault: string = 'http://localhost:4000/todos';
  const [ToDoList, setToDoList] = useState<Array<IToDo>>([]);
  const [form] = Form.useForm();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isOpenWindowCreate, setIsOpenWindowCreate] = useState<boolean>(true);
  const [ToDoID, setToDoID] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const pageSize: number = 5;
  let oldTitle: string;
  let oldDescription: string;

  function openWindowCreate() {
    setIsOpenWindowCreate(true);
    setTitle("");
    setDescription("");
  }

  function openWindowUpdate(ToDoID: string) {
    setIsOpenWindowCreate(false);
    setTitle(ToDoList.filter(ToDo => ToDo.id === ToDoID)[0].title);
    setDescription(ToDoList.filter(ToDo => ToDo.id === ToDoID)[0].description);
    setToDoID(ToDoID);
  }

  function byField(field: any) {
    return (a: any, b: any) => a[field] > b[field] ? 1 : -1;
  }



  async function getToDoList() {
    await axios.get(pathDefault)
      .then((res) => {
        setToDoList(e => res.data.result.sort(byField("updatedAt")));
        setToDoList(e => res.data.result.sort(byField("isCompleted")));
      }).catch((error) => {
        console.log(error);
      })
  }

  async function createToDo() {
    if (title && description) {
      await axios.post(pathDefault, {
        title: title,
        description: description,
      }).then((res) => {
        getToDoList();
        setTitle("");
        setDescription("");
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  async function updateToDo(ToDoID: string) {
    if (title || description) {
      oldTitle = title;
      oldDescription = description;
      if (!title) {
        oldTitle = ToDoList.filter(ToDo => ToDo.id === ToDoID)[0].title;
      }
      if (!description) {
        oldDescription = ToDoList.filter(ToDo => ToDo.id === ToDoID)[0].description;
      }
      await axios.patch(pathDefault + '/' + ToDoID, {
        title: oldTitle,
        description: oldDescription,
      }).then((res) => {
        getToDoList();
        setTitle("");
        setDescription("");
        setToDoID("");
        setIsOpenWindowCreate(true);
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  async function deleteToDoList() {
    await axios.delete(pathDefault)
      .then((res) => {
        getToDoList();
        setTitle("");
        setDescription("");
        setToDoID("");
        setIsOpenWindowCreate(true);
      }).catch((error) => {
        console.log(error);
      })
  }

  async function deleteToDo(ID: string) {
    axios.delete(pathDefault + '/' + ID)
      .then((res) => {
        getToDoList();
        setTitle("");
        setDescription("");
        setToDoID("");
        setIsOpenWindowCreate(true);
      }).catch((error) => {
        console.log(error);
      })
  }

  async function completedToDo(ID: string, completed: boolean) {
    await axios.patch(pathDefault + '/' + ID, {
      isCompleted: !completed,
    })
      .then((res) => {
        getToDoList();
      }).catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getToDoList();
  }, [])

  return (
    <div className="App">
      <Row gutter={40}>
        <Col span={16}>
          {ToDoList.filter((ToDo, index) => {
            return index + 1 <= page * pageSize && index >= (page - 1) * pageSize
          }).map(ToDo =>
            <Card title={ToDo.title} key={ToDo.id} headStyle={CardTitle} bodyStyle={CardBody} style={{ marginBottom: "20px" }}
              extra={[
                <div onClick={() => completedToDo(ToDo.id, ToDo.isCompleted)} className='icon icon--green' key={ToDo.id}>
                  {ToDo.isCompleted && <CheckOutlined key="completed" />}
                </div>,
                <div onClick={() => completedToDo(ToDo.id, ToDo.isCompleted)} className='icon icon--red' key={ToDo.updatedAt}>
                  {!ToDo.isCompleted && <CloseOutlined key="noCompleted" />}
                </div>
              ]} actions={[
                <div onClick={() => deleteToDo(ToDo.id)} className='icon'><DeleteOutlined key="delete" /></div>,
                <div onClick={() => openWindowUpdate(ToDo.id)} className='icon'><EditOutlined key="edit" /></div>,
              ]}>
              {ToDo.description}
            </Card>
          )}
          <Pagination
            current={page}
            pageSize={pageSize}
            onChange={setPage}
            total={ToDoList.length || 0}
          />
        </Col>
        <Col span={8}>
          {isOpenWindowCreate &&
            <FormAddToDo form={{ title: "Создать", sentForm: form }} todo={{ title: title, description: description }} createToDo={createToDo} setTitle={setTitle} setDescription={setDescription} /> //setTitle, setDescription
            // <FormUpdateToDo form={{title: "Изменить", form: form}} todo={{title: title, description: description, id: ToDoID, todoFunction: {updateToDo, setTitle, setDescription}}}/>
          }
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <Card title="Панель управления" headStyle={CardTitle} bodyStyle={CardBody}>
                <Space>
                  <Space.Compact direction="vertical">
                    <Button onClick={getToDoList} style={ButtonView}>Получить все</Button>
                    <Button onClick={deleteToDoList} style={ButtonView}>Удалить все</Button>
                    <Button onClick={openWindowCreate} style={ButtonView}>Создать</Button>
                  </Space.Compact>
                </Space>
              </Card>
            </Col>
            <Col span={8}></Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}


export default App;