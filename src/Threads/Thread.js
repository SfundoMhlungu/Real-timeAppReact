console.log("Thread Started")
const GLOBALQUEUE = []

self.onmessage = (e) => {

      const {event, data} = e.data
      let ws = null;
      switch(event){
         case "Start_WS":
              StartWebsocket(data.config, (ws_)=> ws = ws_)
              console.log(ws, "returned_ws")
            break;
         case  "Stop_WS":
               ws.close()
             break; 
         default:
             
            break;
         
      }

}

function tick(){



     setInterval(()=> {
             if(GLOBALQUEUE.length !== 0){
                self.postMessage({event: "realtime", data: GLOBALQUEUE})
                GLOBALQUEUE = []
               
             }

         }, 1000)




}


function StartWebsocket(config, callback){
// "ws://localhost:8080"
        const ws =  new WebSocket(config.url);
    
        console.log(ws)

ws.onmessage = (m) => {
    let parsed = JSON.parse(m.data); 
    // console.log(parsed)
    switch (parsed.type) {
        case "realtime":
            // console.log(parsed.data);

            GLOBALQUEUE.push(parsed.data)
            break;

        case "closing":
             console.log("server websocket closing")
             ws.close()
           break; 
        case "opened":
            console.log("websocket opened")
            callback(ws)
            ws.send(JSON.stringify({event: "realtime"}))
            tick()
        
           break;
    
        default:
            console.log(m)
            break;
  }
} 

}




