

describe('Phone', function() {
  it('should be callable as a constructor', function() {
    var phone = new Phone();
    should.exist(phone);
    phone.should.be.an.instanceof(Phone);
    // a phone is not necessarily a smart phone
    phone.should.not.be.an.instanceof(SmartPhone);
  });

  it('should have a `phoneNumber` property', function() {
    var phone = new Phone(4125435843);
    phone.should.have.property('phoneNumber');
  });

  it('should allow the `phoneNumber` to be set in the constructor', function() {
    var myNumber = 4125435843;
    var phone = new Phone(myNumber);
    phone.phoneNumber.should.be.equal(myNumber);
  });

  it('should have a `send` method', function() {
    var phone = new Phone(4125435843);
    phone.send.should.be.an.instanceof(Function);
  });

  it('should send a message to another phone number', function() {
    var myNumber = 4125435843;
    var momsNumber = 4126538374;
    var message = 'Hi mom!';

    var phone = new Phone(myNumber);
    var result = phone.send(momsNumber, message);

    // should get back a message about the phone number being sent
    result.should.equal('sending the message "' + message + '" to the phone number ' + momsNumber + ' from ' + myNumber);
  });

  it('should not re-create new methods for each new instance', function() {
    // This works because objects are passed by reference. So if two 
    // functions are actually sharing the method, then a look up on both 
    // instances will literally be the same object (triple equals). This is NOT 
    // asserting that they simply have the same text in the function.
    var myPhone = new Phone(4125435843);
    var momsPhone = new Phone(4126538374);
    myPhone.send.should.equal(momsPhone.send);
  });

  it('should get its `send` method from the Phone prototype', function() {
    var phone = new Phone();
    phone.send.should.equal(Phone.prototype.send);
  });

  it('should only have the `send` method on the Phone prototype', function() {
    var phoneMethods = Object.keys(Phone.prototype);
    phoneMethods.should.eql(['send']);
  });
});

describe('SmartPhone', function() {
  it('should be callable as a constructor', function() {
    var phone = new SmartPhone();
    should.exist(phone);
    phone.should.be.an.instanceof(SmartPhone);
    // all smart phones are phones. make sure SmartPhone's prototype is a Phone
    phone.should.be.an.instanceof(Phone);
  });

  it('should have an `email` and `phoneNumber` property', function() {
    var phone = new SmartPhone(4125435843, 'me@vctr.me');
    phone.should.have.property('email');
    phone.should.have.property('phoneNumber');
  });

  it('should allow the `phoneNumber` and `email` properties to be set in the constructor', function() {
    var myNumber = 4125435843;
    var myEmail = 'me@vctr.me';
    var phone = new SmartPhone(myNumber, myEmail);

    phone.phoneNumber.should.be.equal(myNumber);
    phone.email.should.be.equal(myEmail);
  });

  it('should have a `send` method', function() {
    var phone = new SmartPhone(4125435843);
    phone.send.should.be.an.instanceof(Function);
  });

  it('should send a message to another phone number', function() {
    var myNumber = 4125435843;
    var momsNumber = 4126538374;
    var message = 'Hi mom!';

    var phone = new SmartPhone(myNumber);
    var result = phone.send(momsNumber, message);

    // should get back a message about the phone number being sent
    result.should.equal('sending the message "' + message + '" to the phone number ' + momsNumber + ' from ' + myNumber);
  });

  it('should send a message to another email address, too!', function() {
    var myNumber = 4125435843;
    var myEmail = 'me@vctr.me';
    var momsEmail = 'mom@gmail.com';
    var message = 'Hi mom!';

    var phone = new SmartPhone(myNumber, myEmail);
    var result = phone.send(momsEmail, message);

    result.should.equal('sending the message "' + message + '" to email ' + momsEmail + ' from ' + myEmail);
  });

  it('should not re-create new methods for each new instance', function() {
    // This works because objects are passed by reference. So if two 
    // functions are actually sharing the method, then a look up on both 
    // instances will literally be the same object (triple equals). This is NOT 
    // asserting that they simply have the same text in the function.
    var myPhone = new SmartPhone();
    var momsPhone = new SmartPhone();
    myPhone.send.should.equal(momsPhone.send);
  });

  it('should override `Phone`s `send()` method', function() {
    var smartPhone = new SmartPhone();
    var notSoSmartPhone = new Phone();
    smartPhone.send.should.not.equal(notSoSmartPhone.send);
  });

  it('should get its `send` method from the SmartPhone prototype', function() {
    var smartPhone = new SmartPhone();
    smartPhone.send.should.equal(SmartPhone.prototype.send);
  });

  it('should only have the `constructor` and `send` methods on the SmartPhone prototype', function() {
    // You should not need to create references to any parent methods on the child class.
    // Instead use those parent methods directly.
    var smartPhoneMethods = Object.keys(SmartPhone.prototype);
    smartPhoneMethods.should.eql(['constructor', 'send']);
  });
});

