var example = (function() {

  var example = {
    init: function(){
      console.log('hey there!');
    }
  };

  return example;
}());


  document.querySelector('.yourSelector') && example.init(); //example

///-** write here a list of modules. Follow the example

///-** a file for production is created in js/build/script.js
