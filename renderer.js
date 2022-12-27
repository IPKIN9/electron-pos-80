const sendButton = document.getElementById('print-button')
sendButton.addEventListener('click', function(){
	window.api.invoke('myfunc', { message: 'Hello World' })
  .then(function(res) {
      console.log(res); // will print "this worked!" to the browser console
  })
  .catch(function(err) {
      console.error(err); // will print "this didn't work!" to the browser console.
  });
})