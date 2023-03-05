import React from "react";
import akkorhotel from "../Register/akkorhotel.png";

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <a class="navbar-brand" href="/home">Akkor Hotel</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="brand" href="/home">
            <img src={akkorhotel} width="40" alt="akkorhotel"/>
          </a>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/register">Register</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/login">Login</a>
              </li>
              
            </ul>
          </div>
          
          
        </div>
      </nav> 
    )
    
}

export default Navbar;