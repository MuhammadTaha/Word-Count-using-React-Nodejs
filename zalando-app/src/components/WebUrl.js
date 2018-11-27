import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as axios from "axios";
import * as urlRegex from "url-regex";

 class WebUrl extends Component {

  constructor(props){
    super(props);

    this.backend_url = "http://localhost:3001/scrap-web"
    this.state = {
        fields: {
          urltext:"",
        },
        errors: {}
    };

 }

 handleValidation(){
     let fields = this.state.fields;
     let errors = {};
     let formIsValid = true;

     //URL
     if(!fields["urltext"]){
        formIsValid = false;
        errors["urltext"] = "Cannot be empty";
     }

     if(typeof fields["urltext"] !== "undefined"){

        if(this.isURL(fields["urltext"])){
          formIsValid = false;
          errors["urltext"] = "Url is not valid";
          console.log("here")

        }

    } else {
      
      // this.getURLDetails(fields["urltext"])
    }

    this.setState({errors: errors});
    return formIsValid;
}


getURLDetails(url){
    console.log("in get url details")

    axios.get(this.backend_url, {
      params: {
          url:url
      }
    },)
    .then( (response) => {
      console.log("response", response);
      if(this.rows_data != undefined){
        this.rows_data = JSON.parse(response.data)
      }
    })
    .catch( (error) => {
      console.log(error);
    });
}

isURL(str) {
  // var pattern = new RegExp("^(https?:\\/\\/)?"+ // protocol
  // "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|"+ // domain name
  // "((\\d{1,3}\\.){3}\\d{1,3}))"+ // OR ip (v4) address
  // "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*"+ // port and path
  // "(\\?[;&a-z\\d%_.~+=-]*)?"+ // query string
  // "(\\#[-a-z\\d_]*)?$","i"); // fragment locator

   var pattern = new RegExp("https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)");
  
  
   return pattern.test(str);
}


contactSubmit(e){
     e.preventDefault();

     if(this.handleValidation()){
      let fields = this.state.fields;
      this.getURLDetails(fields["urltext"])
      console.log("Form submitted");
     }
 }

 handleChange(field, e){         
     let fields = this.state.fields;
     fields[field] = e.target.value;        
     this.setState({fields});
 }


 renderTableRows(array) {
   if(array != undefined){

    return (array.map(item => {
      <tr>
        <td > {item.word} </td><td > {item.count} </td>
      </tr>
      }
    ));
    }
  }

  render() {
    const { resetLabel, incrementLabel, decrementLabel, increment, decrement, resetCount } = this.props;

    return (
      <div className="weburl">
        <form className="form-url" onSubmit= {this.contactSubmit.bind(this)}>
          <label htmlFor="basic-url">Enter Url</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">Enter URL here</span>
            </div>
              <input type="text" placeholder = "https://example.com/users/" refs="urltext" className="form-control" id="basic-url" aria-describedby="basic-addon3" onChange = {this.handleChange.bind(this, "urltext")} value={this.state.fields["urltext"]}></input>

          </div>
          <div >
                <span style={{color: "red",fontSize:18}}>{this.state.errors["urltext"]}</span>
              </div>

          <div><button className="btn btn-primary"  type="submit">Submit</button>
          </div>
        </form>

          <div style={{marginTop :"4%"}}className="data-table">
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
              <tr>
                <th>Word</th>
                <th>Number of Occurance</th>
              </tr> 
                </thead>
                <tbody>
                  {this.renderTableRows(this.rows_data)}
                </tbody>

              </table>
            </div>


      </div>
      
    );
  }
}

export default WebUrl;

