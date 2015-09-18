class App extends React.Component {
  render() {
    var currentNumber = this.props.relay.variables.first;
    var buttonStyle = {};

    if (!this.props.posts.posts.pageInfo.hasNextPage) {
      buttonStyle.display = 'none';
    }
    return (
        <div>
          <h1>Blog Post List</h1>
          <ul>
            {this.props.posts.posts.edges.map(edge =>
              <li>{edge.node.title} (ID: {edge.node.id})</li>
            )}
          </ul>
          <button 
            style={buttonStyle} 
            onClick={() => this.props.relay.setVariables({first: currentNumber + 1})}>
              next
          </button>
        </div>
    );
  }
}

export default Relay.createContainer(App, {
  initialVariables: {
    first: 1
  },
  fragments: {
    posts: () => Relay.QL`
      fragment on PostsViewer {
        posts(first: $first) {
          edges {
            node {
              id,
              title,
            }
          },
          pageInfo {
            hasNextPage
          }
        }
      }
    `,
  }
});