import React, { useEffect, useMemo, useState } from "react"
import useSubscribers from "../../Hooks/Realtime/useSubscribers"
import GettingStarted from "../learning/chartjs/gettingstarted"
import Table from "../Table"
import Timeseries from "./Series"
import Statscard from "./Stats"

const RealTime:React.FC = ()=> {

       const [queu] = useSubscribers({websocketUrl: "ws://localhost:8080"})
       const [cols, setCols] = useState< {
         Header: string;
         accessor: string;
     }[]>([])
       const [data_, setData] = useState([])
       const [stats, setStats] = useState<Array<{
         time: number;
         subscriptions: number;
         unsubs: number;
         down_or_upgrade: number;
     }> | undefined>()
    
      
        const [point, setPoint] = useState<typeof queu[0]>()
       useEffect(()=> {
        if(queu?.length !== 0){
            
           const m = queu.shift()
          
      // unsubs 
           if(m) 
             setData(m.unsubs)
     
        
           
           setPoint(m)
        }
      }, [queu])


      useEffect(()=> {
         if(point?.stats){
            setStats(prev => {
               // console.log("stats", prev)
               if(prev)
                  return [...prev, point?.stats]
               
               return [point?.stats]
              })
         }
      }, [point])


      useEffect(()=> {
               if(cols.length == 0 && data_[0]){
               let cols = Object.keys(data_[0])
               const relevant = cols.slice(3).
                                        map((col)=> ({Header: col, accessor: col}))
            
                  setCols(relevant)
              }
      }, [data_])

          return (
             <div style={{display: "flex", width: "100vw", height: "100vh", justifyContent: "flex-start", gap: "5px"}}>
              {/* */}
                <div style={{flex: 1}}>
                <Statscard content={point?.subscriptions.length ?? 0} heading={"subscribers"} icon={"🤖"}/>
          
                {  stats && stats[0] !== undefined ?  <Timeseries  stats={stats}/> : <></>}
                </div>

                <div style={{flex: 1, display: "flex", height: "100%", alignItems: "center", justifyContent: "center"}}>
                { data_.length !== 0 && cols && <Table data={data_} columns={cols}/>} 
                </div>
              
             
            </div>
         )
}
 export default RealTime
