'use strict';

const request = require("request");
const cheerio = require('cheerio');
const rp = require('request-promise');
var htmlParser = require('html-parser');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const unique = require('unique-words');


module.exports = {

getWebWordCount : async function (url){


    //   var url = " https://www.w3schools.com/";
    // // console.log("in rest")
    // // afterLoad('https://www.w3schools.com/', function(html){
    // //   console.log("in the html")
    // //    console.log(html);
    // // });
    
    // request('https://www.w3schools.com/', function (error, response, html) {
    //   console.log(html)
    //     if (!error && response.statusCode == 200) {
    //         var $ = cheerio.load(html);
    //         // Get text 
    //         console.log("------- with request module -------")
    //         console.log($.text());
    //         // Get HTML 
    //         //console.log($.html());
    //     }
    // });
    // const html = fetch(url).text(); // html as text
    // const doc = new DOMParser().parseFromString(html, 'text/html');
    // doc.title; 
    // console.log(doc.body);
    
    
    
    // const url = 'https://www.w3schools.com/';
    var jsonString = [];
    rp(url)
      .then( function(html){    
    
        const dom = new JSDOM(
          html
        );
        
        const document = dom.window.document;
        var nodes = dom.window.document.getElementsByTagName('p');
    
        for (var i = 0; i < nodes.length; i++) { 
          // console.log(jsonString);      
          jsonString.push(unique.counts(nodes[i].textContent));
        }
        console.log(jsonString);
        // console.log(JSON.stringify(jsonString));
        
         return  JSON.stringify(jsonString);
      })
      .catch(function(err){
        //handle error
        console.log(err)
      });
    }
};