import { useCallback, useEffect, useState } from "react";





type expectedObj = {
    subscriptions: [];
    unsubs: [];
    down_or_upgrade: [];
   
    stats: {
        time: number;
        subscriptions: number;
        unsubs: number;
        down_or_upgrade: number;
    };
}

let GLOBALQUEUE: Array<expectedObj | undefined> = [];

const useSubscribers = ({websocketUrl}: {websocketUrl: string}) => {
    const [ws, setWebsocket] = useState<undefined | WebSocket>()    
    const [queu, setQueu] = useState<Array<expectedObj | undefined>>([])
    const startTick = useCallback(()=> {
         setInterval(()=> {
             if(GLOBALQUEUE.length !== 0){
                 let t = [...GLOBALQUEUE]
                //  console.log(t)
                setQueu(prev =>  {
                    // console.log("prev", prev)
                    // console.log(t, "t", GLOBALQUEUE, "GB")
                    return [...prev, ...t]
                });
                GLOBALQUEUE = []
                // console.log(GLOBALQUEUE, queu)
             }

         }, 1000)
    }, [ws])
    const handleWsMessages = useCallback(()=> {
        if(ws){
            ws.onmessage = m => {
                try {
                    let parsed: {type: string, data: Record<any, any>} = JSON.parse(m.data); 
                    // console.log(parsed)
                    switch (parsed.type) {
                        case "realtime":
                            // console.log(parsed.data);
                            
                            const temp = parsed.data 
                            temp.stats = {}
                            temp.stats.time = Date.now()
                            // stats
                            temp.stats.subscriptions = temp.subscriptions.length
                            temp.stats.unsubs = temp.unsubs.length
                            temp.stats.down_or_upgrade = temp.down_or_upgrade.length

                            GLOBALQUEUE.push(temp as expectedObj)
                            break;

                        case "closing":
                             console.log("server websocket closing")
                             ws.close()
                           break; 
                        case "opened":
                            console.log("websocket opened")
                            ws.send(JSON.stringify({event: "realtime"}))
                            startTick();
                           break;
                    
                        default:
                            console.log(m)
                            break;
                    }
                } catch (error) {
                    console.log(error, 'prolly failed to parse')
                }
            }
        }
    }, [ws])

    useEffect(()=> {
       if(websocketUrl.length !== 0){
           try {
             const w =  new WebSocket(websocketUrl);
             setWebsocket(w);
           } catch (error) {
                console.log(error)
           }
       }
    }, [websocketUrl])



    useEffect(()=> {
        if(ws){
            // console.log(ws)
            handleWsMessages()
        }
      

    }, [ws])
    
    // useEffect(()=> {GLOBALQUEUE=[]}, [queu])

    return [queu, GLOBALQUEUE]
}




export default useSubscribers







