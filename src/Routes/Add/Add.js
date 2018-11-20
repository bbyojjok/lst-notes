import React, { Component } from "react";
import Editor from "../../Components/Editor";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_NOTE = gql`
  mutation createNote($title: String!, $content: String!) {
    createNote(title: $title, content: $content) @client {
      id
    }
  }
`;

export default class Add extends Component {
  render() {
    return (
      <Mutation mutation={ADD_NOTE}>
        {createNote => {
          this.createNote = createNote;
          return <Editor onSave={this._onSave} />;
        }}
      </Mutation>
    );
  }

  _onSave = (title, content) => {
    const {
      history: { push }
    } = this.props;
    if (title !== "" && content !== "") {
      this.createNote({ variables: { title, content } });
      push("/");
    }
  };
}
