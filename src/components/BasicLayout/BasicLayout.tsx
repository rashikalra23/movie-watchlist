import React from "react";
import { Layout } from "antd";
import FooterComponent from "../Footer/FooterComponent";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routes";
import WatchlistPanel from "../Watchlist/WatchlistPanel";

const { Footer, Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  height: "80vh",
  color: "black",
  backgroundColor: "#fff",
};

const siderStyle: React.CSSProperties = {
  color: "red",
  backgroundColor: "#fff",
  borderRight: "0.1rem solid #efeeee",
};

const footerStyle: React.CSSProperties = {
  color: "red",
  backgroundColor: "#fff",
  maxHeight: "5vh",
  borderTop: "0.1rem solid #efeeee",
};

const BasicLayout: React.FC = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Sider width="22%" style={siderStyle}>
      <WatchlistPanel />
    </Sider>
    <Layout>
      <Content style={contentStyle}>
        <Routes>
          {ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </Content>
      <Footer style={footerStyle}>
        <FooterComponent />
      </Footer>
    </Layout>
  </Layout>
);

export default BasicLayout;
