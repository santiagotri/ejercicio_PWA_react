
const{useState, useEffect} = require("react");

function Personaje(){
    const[personajes, setPersonajes] = useState([]);
    const[bannerInformacion, setBannerInformacion] = useState("");
    useEffect(
        ()=>{
            if(!navigator.onLine){
                if(localStorage.getItem("cantidadPersonajes")===null){
                    setBannerInformacion("Esperando a tener conexión...")
                }else{
                    setBannerInformacion("Personajes (Offline)")
                    var temp = []
                    for(var i = 0; i<parseInt(localStorage.getItem("cantidadPersonajes"));i++){
                        temp.push(JSON.parse(localStorage.getItem("personaje"+i.toString())))
                    }
                    console.log("Conexion perdida, usando los personajes guardados en memoria")
                    setPersonajes(temp)

                }
            }else{
                setBannerInformacion("Cargando...")
                fetch("https://gateway.marvel.com/v1/public/characters?ts=1635290078374&apikey=07386e923bad1d5f5fe16df121091808&hash=5f94a9bc55b24013e668b74f7d6b8cac").then(res=>res.json()).then(res=>{
                    setBannerInformacion("Personajes")
                    setPersonajes(res.data.results);
                    for(var i =0; i<res.data.results.length;i++){
                        localStorage.setItem("personaje"+i.toString(), JSON.stringify(res.data.results[i]))
                    }
                    localStorage.setItem("cantidadPersonajes",res.data.results.length);
                })
            }
        }
    ,[])

    let renderPersonajes = ()=>{
        console.log("lista", personajes)
        return Object.values(personajes).map((personaje)=>{
                return <div className="col-3">
                    <img src={personaje.thumbnail.path+"."+ personaje.thumbnail.extension} className="img-fluid" alt={"foto de "+personaje.name}></img>
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