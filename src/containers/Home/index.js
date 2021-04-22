import react from 'react'
import { connect } from 'react-redux';
import {facebook_login} from '../../store/action'
import './Home.css'
class Home extends react.Component{
    // static getDerivedStateFromProps(props,state){
    //     console.log("updated props",props)
    //     return {
          
    //     }
    //  }

    render(){
        return(
            <div className="container">
                <h1>
                    Login
                    </h1> 
                    <br/>
                    <h2><button className="btn" onClick={()=>this.props.facebook_login(this.props.history)}>Facebook Login</button></h2>
                
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    users: state.users,
})
const mapDispatchToProp=(dispatch)=>({
    facebook_login:(history)=>dispatch(facebook_login(history))
}) 

export default connect(mapStateToProps, mapDispatchToProp)(Home);