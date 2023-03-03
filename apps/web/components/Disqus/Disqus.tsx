import { Component } from "react";
import { UI } from "@myth/ui";
import { DisqusPostList } from "./DisqusPostList";
import { DISQUS_API_URL } from "./constants";
import { sortTreeNodes } from "./utils";

interface DisqusProps {
  shortname: string;
  config: {
    apiKey?: string;
    identifier: string;
    url?: string;
    title?: string;
  };
}

interface DisqusState {
  thread: number;
  comments: any[];
}

export class Disqus extends Component<DisqusProps, DisqusState> {
  componentDidMount() {
    console.log("componentDidMount");

    this.fetchThread();
  }

  shouldComponentUpdate(nextProps: DisqusProps) {
    console.log("shouldComponentUpdate");

    return this.props === nextProps;
  }

  componentDidUpdate(prevProps: DisqusProps) {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  async fetchThread() {
    const queryEndpoint = `/threads/details.json?api_key=${this.props.config.apiKey}&forum=${this.props.shortname}&thread:ident=${this.props.config.identifier}`;
    const response = await fetch(`${DISQUS_API_URL}${queryEndpoint}`);
    const data = await response.json();

    if (data.response.id) {
      this.setState({ thread: parseInt(data.response.id) }, () => {
        this.fetchComments();
      });
    }
  }

  async fetchComments() {
    const queryEndpoint = `/threads/listPosts.json?api_key=${this.props.config.apiKey}&thread=${this.state.thread}`;
    const response = await fetch(`${DISQUS_API_URL}${queryEndpoint}`);
    const data = await response.json();

    if (data.response) {
      this.setState({ comments: sortTreeNodes(data.response) });
    }
  }

  render() {
    return (
      <UI.Box role="thread" minW="100%">
        <div>Forum ID: {this.state?.thread}</div>
        <br />

        <DisqusPostList posts={this.state?.comments} />
      </UI.Box>
    );
  }
}
