$.get("https://glacial-journey-2279.herokuapp.com/data", function(data){
	/*console.log(data.apiKey);
	var session = OT.initSession(data.apiKey, data.sessionId);
	session.on("streamCreated", function(event){
		session.subscribe(event.stream);
	});
	session.connect(data.token, function(error){
		var publisher = OT.initPublisher();

		session.publish(publisher);
	});*/

// Initialize an OpenTok Session object
/*
var session = TB.initSession(data.sessionId);

// Initialize a Publisher, and place it into the element with id="publisher"
var publisher = TB.initPublisher(data.apiKey, 'publisher');

// Attach event handlers
session.on({

  // This function runs when session.connect() asynchronously completes
  sessionConnected: function(event) {
    // Publish the publisher we initialzed earlier (this will trigger 'streamCreated' on other
    // clients)
    session.publish(publisher);
  },

  // This function runs when another client publishes a stream (eg. session.publish())
  streamCreated: function(event) {
    // Create a container for a new Subscriber, assign it an id using the streamId, put it inside
    // the element with id="subscribers"
    var subContainer = document.createElement('div');
    subContainer.id = 'stream-' + event.stream.streamId;
    document.getElementById('subscribers').appendChild(subContainer);

    // Subscribe to the stream that caused this event, put it inside the container we just made
    session.subscribe(event.stream, subContainer);
  }

});

// Connect to the Session using the 'apiKey' of the application and a 'token' for permission
session.connect(data.apiKey, data.token); */

 var session = OT.initSession(data.sessionId);
      var publisher = OT.initPublisher($('.publisher')[0], {
          insertMode: 'append',
          width: '100%',
          height: '100%',
          style: {
            buttonDisplayMode: 'off'
          }
        });

      session.on('streamCreated', function(event) {
      	session.subscribe(event.stream, $('.subscriber')[0], {
      		insertMode: 'append',
      		width: '100%',
      		height: '100%',
      		style: {
      			buttonDisplayMode: 'off'
      		}
      	});
      });

      session.on('sessionDisconnected', function(event) {
      	$('.waiting').remove();
      	$('.ending').removeClass('hidden');
      });

      session.connect(data.apiKey, data.token, function(error) {
        if (error) {
          return console.log('session connection error');
        }

        session.publish(publisher);
        $('.waiting').addClass('hidden');
      });

      $('.end-button').on('click', function(event) {
      	session.disconnect();
      });


});
