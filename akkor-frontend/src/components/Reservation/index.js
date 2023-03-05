import React from "react";

function Reservation() {
    return (
        <section className="reservation-form" >
            <div className="container">
                <h2>Enjoy Your Holiday</h2>
                <span>Search and Book Hotel</span>

                <form action="">
                    <input type="text" placeholder="Search City" name='' id='' />
                    <div className="flex-space">
                        <span>Check In</span>
                        <input type='date' placeholder="Check In" />
                        
                        <span>Check Out</span>
                        <input type='date' placeholder="Check Out" />
                    </div>
                    <div className="flex-space">
                        <input type='number' placeholder="Adult(s)(+18)" />
                        <input type='number' placeholder="Children(0-17)" />
                    </div>
                    <div className="flex-space">
                        <input type="number" placeholder="Rooms" />
                        

                    </div>
                    <button className="btn">Submit</button>
                    

                </form>

            </div>
        </section>
    )
    
}

export default Reservation;