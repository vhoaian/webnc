import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";

export default function Welcome() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        style={{ display: "flex", justifyContent: "center" }}
        maxWidth="md"
      >
        <h1 style={{ textAlign: "center" }}>
          Chào mừng bạn đến với hệ thống Sprint Retrospective. Vui lòng chọn
          chức năng đăng nhập để sử dụng dịch vụ.
        </h1>
      </Container>
    </React.Fragment>
  );
}
