import { Link } from 'react-router-dom';

function Home () {
    if(window === undefined){
        return <div>Requires a browser to run</div>;
    }

    return (
        <>
            <Link to='/cube' className="App-link">
                Cube
            </Link>
            <Link to='/cylinder' className="App-link">
                Cylinder
            </Link>
            <Link to='/sphere' className="App-link">
                Sphere
            </Link>
        </>
    );
};

export default Home;