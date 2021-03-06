import React, { Component } from "react";
import Editor from "../../Components/Editor";

import { Query, Mutation } from "react-apollo";
import { GET_NOTE } from "../../queries";

import gql from "graphql-tag";

const EDIT_NOTE = gql`
  mutation editNote($id: Int!, $title: String!, $content: String!) {
    editNote(id: $id, title: $title, content: $content) @client {
      id
    }
  }
`;

export default class Edit extends Component {
  render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    return (
      <Query query={GET_NOTE} variables={{ id }}>
        {({ data }) =>
          data.note ? (
            <Mutation mutation={EDIT_NOTE}>
              {editNote => {
                this.editNote = editNote;
                return (
                  <Editor
                    title={data.note.title}
                    content={data.note.content}
                    id={data.note.id}
                    onSave={this._onSave}
                  />
                );
              }}
            </Mutation>
          ) : null
        }
      </Query>
    );
  }
  _onSave = (title, content, id) => {
    const {
      history: { push }
    } = this.props;
    if (title !== "" && content !== "" && id) {
      this.editNote({ variables: { id, title, content } });
      console.log("_onSave update note");
      push(`/note/${id}`);
    }
  };
}
