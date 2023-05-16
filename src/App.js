import { getImage } from "./utils/helpers";
import { Patient } from "./pages/patients";
function App() {

  const loginUser = {name:'lisa',role:"operator",profile:'../public/images/image.png'}
  
  return (
    <div className="App">
      <header className="App-header text-white">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <img src={getImage('Logo.png')} className="w-10" />
            </div>
            <div className="col-6">
              <div className="d-flex justify-content-end align-items-center p-1">
                <img src={getImage('Notifications.png')} alt="Notifications" className="mx-2 w-5 h-5 pt-1" />
                <img src={getImage('user.png')} alt="User" className="mx-2 pt-1"/> 
                <div className="p-2">
                  <h6 className=" ">{loginUser.name}</h6>
                  <h6 className="">{loginUser.role}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="main p-3 bg-orange-300">
        <div className="container-fluid bg-light">
           <Patient/>
        </div>
      </section>
    </div>
  );
}

export default App;
