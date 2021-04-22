import react from 'react'
import { connect } from 'react-redux'
import { get_users } from '../../store/action'
import firebase from '../../config/firebase'
import './chat.css'

class Chat extends react.Component {
    constructor() {
        super()
        this.state = {
            chat_user: {},
            chats: [],
            message: ""

        }
    }
    chat = (user) => {
        this.setState({
            chat_user: user
        })
        let current_user = this.props.current_user;
        let chat_user = user;
        let merge_uid = this.merge_uid(current_user.uid, chat_user.uid)

        this.get_messages(merge_uid)

    }
    get_messages = (uid) => {
        firebase.database().ref('/').child(`chats/${uid}`).on('child_added', (messages) => {
            // console.log("messages==>",messages.val())
            this.state.chats.push(messages.val())
            this.setState({
                chats: this.state.chats
            })
            
        })
    }

    sendMessage = () => {
        let user = this.props.current_user;
        let chat_user = this.state.chat_user;
        let merge_uid = this.merge_uid(user.uid, chat_user.uid)

        firebase.database().ref('/').child(`chats/${merge_uid}`).push({
            message: this.state.message,
            name: user.name,
            uid: user.uid
        })


        // this.state.chats.push({
        //     message: this.state.message,
        //     name:user.name,
        //     uid:user.uid
        // })
        this.setState({

            message: ""

        })

    }


    merge_uid = (uid1, uid2) => {
        if (uid1 < uid2) {
            return uid1 + uid2
        } else {
            return uid2 + uid1
        }
    }



    componentDidMount() {
        this.props.get_users()
    }
    render() {
        // console.log("chats:",this.props.chats)
        var user = this.props.current_user;
        return (
            <div>
                <div className="userdata">
                    <img className="avatar" src={user.profile} alt="" />
                    <h2 className="username">{user.name}</h2>
                </div>


                <div style={{ display: 'flex' }}>
                    <div className="chatusers">
                        <h2>Chat Users</h2>
                        <ul>
                            {this.props.users.map((v, i) => {
                                return (v.uid !== user.uid &&
                                    <li key={i}><img className="profile-avatar" src={v.profile} width='20' /> {v.name} <button className="btn" onClick={() => this.chat(v)} >Chat</button></li>)

                            })
                            }
                        </ul>
                    </div>
                    <div className="Chatsection" >
                        <h4>Chat</h4>
                        {
                            Object.keys(this.state.chat_user).length ?
                                <div>
                                    <h4><img src={this.state.chat_user.profile} width='20' /> {this.state.chat_user.name} </h4>
                                    <ul>
                                        {this.state.chats.map((v, i) => {
                                            return <li style={{ color: v.uid === user.uid ? 'red' : 'green' }} key={i}>{v.message}</li>
                                        })

                                        }
                                    </ul>
                                    <input className="chatinput" value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} type='text' placeholder="Enter Your message" />
                                    <button className="btn" onClick={() => this.sendMessage()}>Send</button>
                                </div>

                                :
                                <h4>No user</h4>
                        }


                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    current_user: state.current_user,
    users: state.users
})
const mapDispatchToProp = (dispatch) => ({
    get_users: () => dispatch(get_users())
})

export default connect(mapStateToProps, mapDispatchToProp)(Chat);