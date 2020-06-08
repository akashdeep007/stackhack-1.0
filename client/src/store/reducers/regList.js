import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    regList : null,
    regType : {
        self : 0,
        other : 0,
        coorporate : 0,
        group : 0
    }
  }

  const typeUpdate = (state, action) => {
    switch(action.regType){
        case 'self': return updateObject(state, { regType : {...state.regType, self : action.typeCount}});
        case 'other':return updateObject(state, { regType : { ...state.regType, other : action.typeCount}});
        case 'group':return updateObject(state, { regType : {...state.regType, group : action.typeCount}});
        case 'coorporate':return updateObject(state, { regType : {...state.regType,  coorporate : action.typeCount}});
        default: break;
    }
};
  
  
  const reducer = (state = initialState, action) => {
    switch(action.type){
      case actionTypes.REGLIST_UPDATE : return updateObject(state, {regList : action.regList});
      case actionTypes.REGTYPE_UPDATE : return typeUpdate(state, action);
      default: return state;
    }
  }
  
  export default reducer;