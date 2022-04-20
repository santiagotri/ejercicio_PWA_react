const{useState, useEffect} = require("react");

function Joke(){
    const[joke, setJoke] = useState("");

    useEffect(
        ()=>{
            if(!navigator.onLine){
                if(localStorage.getItem("joke")===null){
                    setJoke("Esperando a tener conexión...")
                }else{
                    setJoke(localStorage.getItem("joke")+"(Offline)");
                    
                }
            }else{
                setJoke("Cargando...")
                fetch("https://gateway.marvel.com/v1/public/characters?ts=1635290078374&apikey=07386e923bad1d5f5fe16df121091808&hash=5f94a9bc55b24013e668b74f7d6b8cac").then(res=>res.json()).then(res=>{
                    setJoke(res.code);
                    localStorage.setItem("joke",res.code);
                })
            }
        }
    ,[])

    return (<h1>{joke}</h1>)
}

export default Joke;