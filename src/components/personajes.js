const{useState, useEffect} = require("react");

function Personaje(){
    const[personajes, setPersonajes] = useState([]);
    const[bannerInformacion, setBannerInformacion] = useState("");
    useEffect(
        ()=>{
            if(!navigator.onLine){
                if(localStorage.getItem("personajes")===null){
                    setBannerInformacion("Esperando a tener conexión...")
                }else{
                    setBannerInformacion("Personajes")
                    setPersonajes(localStorage.getItem("personajes"));
                    
                }
            }else{
                setBannerInformacion("Cargando...")
                fetch("https://gateway.marvel.com/v1/public/characters?ts=1635290078374&apikey=07386e923bad1d5f5fe16df121091808&hash=5f94a9bc55b24013e668b74f7d6b8cac").then(res=>res.json()).then(res=>{
                    setBannerInformacion("Personajes")
                    setPersonajes(res.data.results);
                    console.log("lista", res.data.results)
                    localStorage.setItem("personajes",res.data.results);
                })
            }
        }
    ,[])

    let renderPersonajes = ()=>{
        return Object.values(personajes).map((personaje)=>{
            {console.log(personaje.name)}
                <div className="col-3">

                    <h2>{personaje.name}</h2>
                    <p>{personaje.description}</p>
                    
                </div>
            })
        
    }
    return (
    <>
    <h1> {bannerInformacion}</h1>
    <div className="row">
            {renderPersonajes()}
    </div></>
    )
}

export default Personaje;