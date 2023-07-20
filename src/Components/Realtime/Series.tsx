import { useEffect, useRef, useState } from "react"
import Chart, { ChartTypeRegistry } from "chart.js/auto"




type stats = {
    time: number;
    subscriptions: number;
    unsubs: number;
    down_or_upgrade: number;
}[]



const Timeseries = ({stats}: {stats: stats})=> {
    const [chart, setChart] = useState<Chart<keyof ChartTypeRegistry, any[], any>>()

    const canvasEl = useRef(null)
    useEffect(()=> {
       
         if(stats && stats.length !== 0){
        //   console.log(stats, "chart stats")
            if(stats.length > 5){
                stats = stats.slice(stats.length-6)
            }
           if(!canvasEl.current)
               return   
             
            const l = Chart.getChart(canvasEl.current)
            if(l){
                l.destroy()
            }

            const config =   {
                type: 'line',
                options: {
                  animation: false,
                  plugins: {
                    legend: {
                      display: true
                    },
                    tooltip: {
                      enabled: true
                    }
                  }
                },
                data: {
                  labels: stats.map(row => {const n = new Date(row.time); return n.getHours() +":" + n.getSeconds()}),
                  datasets: [{data: stats.map(all => all.subscriptions), label: "subscriptions", fill: false}, {data: stats.map(all => all.unsubs), label: "unsubs", fill: false}, {data: stats.map(all => all.down_or_upgrade), label: "down_or_updgrade", fill: false}]
                }
              }


              try {
                  // @ts-ignore
                  const c  = new Chart(canvasEl.current, {type: "line", ...config});
                  setChart(c)
                  
              } catch (error) {
                
              }
         }

    }, [stats])
     


          return (
             <div>
                <canvas style={{width: "100%"}} ref={canvasEl}></canvas>
            </div>
         )
}
 export default Timeseries
