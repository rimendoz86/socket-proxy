import config from './config.json'
import { SocketProxy } from '../src/SocketProxy';


(function Test(){
    let newProxy = new SocketProxy(config)
    .OnData((data)=>{
        console.log(data.toString())
    })
    .OnError(err => {
        console.log("ther was an err")
        console.log(err)
    })
    newProxy.Verbose = true;
    newProxy.Close();
})();
