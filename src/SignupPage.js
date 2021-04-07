import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class SignupPage extends React.Component {
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            新規会員登録
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
                Signup
              </Button>
            </Segment>
          </Form>
          <Message>
            すでにアカウントを持っていますか？
            <Link to="/login">ログイン</Link>
          </Message>
          {this.props.signupErr.length > 0 ? (
            <div className="text-red-500 text-xl">{this.props.signupErr}</div>
          ) : null}
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(SignupPage);
