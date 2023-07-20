const Statscard = ({content, heading, icon}: {content: number, heading: string, icon: string})=> {
          return (
             <div style={{width: "50%", height: "auto", padding: "1em 1.4em", margin: "1em 1.4em",  boxShadow: "0 11px 15px -7px rgb(0 0 0 / 20%), 0 24px 38px 3px rgb(0 0 0 / 14%), 0 9px 46px 8px rgb(0 0 0 / 12%)"}}>
                <section style={{width: "100%", textAlign: "center"}}>
                    {/* content */}
                       {content}
                </section>
                <div style={{display: "flex", alignItems: "center", justifyContent:"center", gap: "4px", width: "100%"}}>
                    <div>{icon}</div>
                    <h2>{heading}</h2>
                </div>
            </div>
         )
}
 export default Statscard