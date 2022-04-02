import "./loading.css"

export default function Loading(){
  return(
      <div className="box">
        <h2 className= "loading"> Por favor, digite sua cidade </h2>
        <div class="center">
          <div class ="dot-1"/>
          <div class ="dot-2"/>
          <div class ="dot-3"/>
        </div>
      </div>
  )
}
