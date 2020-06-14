import React from 'react'
import HomeNavBar from '../components/HomeNavBar'
import ShopSearch from '../components/ShopSearch'
import ProfileInfo from '../components/ProfileInfo';

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      profile: false
    }
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(name, value){
    this.setState({[name]: value})
  }

  render(){
    const account = this.props.location.state !== undefined &&
                    this.props.location.state.account === 'seller' ?
                    'seller' : 'buyer'
    const info = this.props.location.state !== undefined ? 
                 this.props.location.state.accountInfo : {}
    return (        
      <div>
        <HomeNavBar accountType={account} handleProfile={() => this.handleEvent('profile', true)}/>
        {account === 'buyer' && <ShopSearch/>}
        {this.state.profile && <ProfileInfo isOpen={this.state.profile} 
                                            accountType={account} 
                                            info={info}
                                            handleProfile={() => this.handleEvent('profile', false)}/>}
      </div>      
    )
  }

}

export default HomeScreen