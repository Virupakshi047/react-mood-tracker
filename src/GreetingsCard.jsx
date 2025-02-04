import React from 'react';

function GreetingsCard() {

    let name = ""
    if(name){
        return <h1>Hello {name}</h1>;
    }else 
    return <h1>Hello, world!</h1>;

}

export default GreetingsCard;