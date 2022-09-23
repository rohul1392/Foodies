const CheckoutCancelled = () => {
    return ( 
        <div className="root">
        <div className="card">
        <div style={{'border-radius':'200px', 'height':'200px', 'width':'200px', background: '#F8FAF5',margin:'0 auto'}}>
          <i className="cancelledmark">x</i>
        </div>
          <h1>Cancelled</h1> 
          <p>We purchased request has been cancelled</p>
        </div>
      </div>  
     );
}
 
export default CheckoutCancelled;