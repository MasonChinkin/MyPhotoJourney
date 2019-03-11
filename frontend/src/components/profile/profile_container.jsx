import {connect} from 'react-redux';
import Profile from './profile';


const msp = state => ({
  currentUser: state.session.user.id,
  journeys: [{name: "Journey1", description: "A very nice journey", url:"/journeys/123aksn3m2ma72d3bndaf7"}]
});

const mdp = dispatch => ({

});


export default connect(msp, mdp)(Profile);