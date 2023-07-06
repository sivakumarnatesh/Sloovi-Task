import { Layout } from "antd";
import Task from "./components/Task/Task";

function App() {
  
  const { Header, Sider, Content } = Layout;

  const layoutStyle = {
    height:'100vh',
  };

  const headerStyle = {
    textAlign: "center",
    color: "#000000",
    height: 64,
    lineHeight: "64px",
    backgroundColor: "#FFFFFF",
    borderBottom: '0.1px solid lightgray',
  };

  const contentStyle = {
    backgroundColor: "#FAFBFF",
  };

  const siderStyle = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#101840",
  };



  return (
    <div>
      <Layout style={layoutStyle}>
        <Sider style={siderStyle}>Sider</Sider>
        <Layout>
          <Header style={headerStyle}>Header</Header>
          <Content style={contentStyle}>
            <Task />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
