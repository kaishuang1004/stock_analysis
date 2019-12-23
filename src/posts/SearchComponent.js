import React, { Component } from 'react';

function search(term){
    return function(x){
      return x.title.toLowerCase().includes(term.toLowerCase()) || !term;   //The includes() method determines whether a string contains the characters of a specified string.
   
        
    }
}

export default search;