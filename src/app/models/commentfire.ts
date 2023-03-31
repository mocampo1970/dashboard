import { IComment } from "../interfaces/icomment";
import * as _ from 'lodash';

// Firebase
export class Commentfire implements IComment{

    constructor(data){
        _.set(this, 'data', data)
    }

    get user(){
        return _.get(this, 'data.user');
    }

    get date(){
        return _.get(this, 'data.date');
    }   
    
    get text(){
        return _.get(this, 'data.text');
    }    

    get post(){
        return _.get(this, 'data.post');
    }    
    


}
