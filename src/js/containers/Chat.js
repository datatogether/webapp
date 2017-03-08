import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { loginUser } from '../actions/session'
import { selectSessionUser } from '../selectors/session'
import { selectMessagesByRoom } from '../selectors/messages'
import ValidInput from '../components/ValidInput'
import validateInvite from '../validators/invite'


// TODO - add validation logic
class Chat extends React.Component {
  constructor(props) {
    super(props);
    [ 'handleChange', 'handleChatSubmit'].forEach(m => this[m] = this[m].bind(this));
  }

  componentWillMount() {
    if (this.props.user != null ) {
      browserHistory.push('/browse')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user != null ) {
      browserHistory.push('/browse')
    }
  }

  handleChatSubmit(e) {
    e.preventDefault()
    this.props.loginUser(this.state.username, this.state.password)
  }

  handleChange(name, value, e) {
    console.log(name, value);
    const inv = Object.assign({}, this.state, { [name] : value });
    inv.validation = validateInvite(inv);

    console.log(inv);
    this.setState(inv);
  }

  render() {
    const { inviteId, messages } = this.props;

    return (
      <div id="container">
        <div className="container">
          <div>{messages.map((msg, i) => {
            return <p key={i}>{msg}</p>
          })}</div>  
          <form className="yellow form col-md-4 offset-md-4" method="POST" action={"/invites/" + inviteId + "/accept"}>
            <hr className="yellow" />
            <h3>Welcome!</h3>
            <hr className="yellow" />
          </form>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {

}

Chat.defaultProps = {

}

function mapStateToProps(state, ownProps) {

  return {
    inviteId : ownProps.params.id,
    messages : selectMessagesByRoom(state),
    user : selectSessionUser(state),
  }
}

export default connect(mapStateToProps, {
  loginUser
})(Chat)