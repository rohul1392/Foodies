import './AboutScreen.css'
const AboutScreen = () => {
    return ( 
    <>
    <div className="jumbotron">
        <div className="container-fluid">
            <div className="header-content-inner">
                <h1>Welcome to BIMI KITCHEN</h1> 
                <h3>We are proud of our long history of making delicious meals, warm and 
                friendly atmosphere and professional staff.</h3>
            </div>
        </div>
    </div>
    <div className="service">
    <div className="bg-service bg-section" id="service">
        <div className="container-fluid text-center">
            <h2>Services</h2>
            <div className="row service-round-3 slideanim">
                <div className="col-sm-4 text-center round">
                    <div className="service-round b-party">
                        <i className="fa fa-4x fa fa-birthday-cake sr-icons"></i>
                    </div>
                    <h4>Birthday party</h4>
                    <p>For more information please contact us.</p>
                </div>
                <div className="col-sm-4 text-center round">
                    <div className="service-round wedding">
                        <i className="fa fa-4x fa fa-heart sr-icons"></i>
                    </div>    
                    <h4>Wedding</h4>
                    <p>For more information please contact us</p>
                </div>
                <div className="col-sm-4 text-center round">
                    <div className="service-round b-dinner">
                        <i className="fa fa-4x fa fa-suitcase  sr-icons"></i>
                    </div>
                    <h4>Business dinner</h4>
                    <p>For more information please contact us.</p>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div className="responsive-map">
<iframe title='map' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14604.945260934202!2d90.4219535!3d23.7745978!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c78bc678693d%3A0x3e87f7b866c0e38!2sEast%20West%20University!5e0!3m2!1sen!2sbd!4v1655535919278!5m2!1sen!2sbd" width="600" height="450" frameborder="0" style={{border:0}} allowfullscreen></iframe>
</div>
    
    </> 
    );
}
 
export default AboutScreen;

