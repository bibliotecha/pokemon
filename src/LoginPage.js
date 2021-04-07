import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            ログインしましょう
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={this.props.changeE}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.props.changeP}
              />

              <Button
                color="teal"
                fluid
                size="large"
                onClick={this.props.click}
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            まだアカウント持っていませんか？
            <Link to="/signup">新規会員登録</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
export default LoginPage;
