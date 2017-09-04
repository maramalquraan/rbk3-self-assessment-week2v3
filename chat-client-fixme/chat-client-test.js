describe('chat-client-fixme', function() {
  it('should invoke a provided function inside of `postData`', function() {
    var fns = ['getData', 'processData', 'checkNewData', 'displayData'];
    var fnCache = {};

    // Temporarily overwrite every provided function with a no-op spy
    // while still saving references to the actual functions
    fns.forEach(function(fn) {
      fnCache[fn] = window[fn];
      window[fn] = sinon.spy();
    });

    // Set up mock responses
    var xhr = sinon.useFakeXMLHttpRequest();
    var requests = [];
    xhr.onCreate = function (req) {
      requests.push(req);
    };

    // Post a message and synchronously respond
    postData('why hello there', 'taser');
    requests[0].respond(200, {}, '');

    // Assert that at least one function was called
    fns.filter(function(fn) {
      return window[fn].called;
    }).should.not.be.empty;

    // Cleanup
    xhr.restore();
    fns.forEach(function(fn) {
      window[fn] = fnCache[fn];
    });
  });

  it('should invoke `getData` inside of `postData`', function() {
    // Temporarily overwrite every provided function with a no-op spy
    // while still saving references to the actual functions
    var oldGetData = window.getData;
    window.getData = sinon.spy();

    // Set up mock responses
    var xhr = sinon.useFakeXMLHttpRequest();
    var requests = [];
    xhr.onCreate = function (req) {
      requests.push(req);
    };

    // Post a message and synchronously respond
    postData('why hello again', 'taser');
    requests[0].respond(200, {}, '');

    // Assert that getData was called
    window.getData.called.should.be.true;

    // Cleanup
    xhr.restore();
    window.getData = oldGetData;
  });

  it('should invoke a provided function after a message has been successfully posted', function() {
    var fns = ['getData', 'processData', 'checkNewData', 'displayData'];
    var fnCache = {};

    // Temporarily overwrite every provided function with a no-op spy
    // while still saving references to the actual functions
    fns.forEach(function(fn) {
      fnCache[fn] = window[fn];
      window[fn] = sinon.spy();
    });

    // Set up mock responses
    var xhr = sinon.useFakeXMLHttpRequest();
    var requests = [];
    xhr.onCreate = function (req) {
      requests.push(req);
    };

    // Post a message
    postData('why hello again', 'taser');

    // Assert that no function has been called
    // before a response is sent
    fns.filter(function(fn) {
      return window[fn].called;
    }).should.be.empty;

    // Simulate response
    requests[0].respond(200, {}, '');

    // Assert that a function has been called
    fns.filter(function(fn) {
      return window[fn].called;
    }).should.not.be.empty;

    // Cleanup
    xhr.restore();
    fns.forEach(function(fn) {
      window[fn] = fnCache[fn];
    });
  });

  it('should invoke `getData` after a message has been successfully posted', function() {
    // Temporarily overwrite every provided function with a no-op spy
    // while still saving references to the actual functions
    var oldGetData = window.getData;
    window.getData = sinon.spy();

    // Set up mock responses
    var xhr = sinon.useFakeXMLHttpRequest();
    var requests = [];
    xhr.onCreate = function (req) {
      requests.push(req);
    };

    // Post a message
    postData('why hello again', 'taser');

    // Assert that getData has not been called
    // before a response is sent back
    window.getData.called.should.be.false;

    // Simulate response
    requests[0].respond(200, {}, '');

    // Assert that getData has been called
    window.getData.called.should.be.true;

    // Cleanup
    xhr.restore();
    window.getData = oldGetData;
  });
});
