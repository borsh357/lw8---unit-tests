function replaceString(text, searchStr, newStr) {
  if (!text || !searchStr || typeof newStr !== 'string') {
    return false;
  }
  text = text.toLowerCase();
  searchStr = searchStr.toLowerCase();
  newStr = newStr.toLowerCase();
  if (text.indexOf(searchStr) === -1) {
    return false;
  }
  for (var i = 0; i < text.length; i++) {
    text = text.replace(searchStr, newStr);
  }
  return text;
}

function isArrayEqual(firstArray, secondArray) {
  if (Array.isArray(firstArray) && Array.isArray(secondArray) && firstArray.length === secondArray.length) {
    var isEqual = true;
    for (var i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) {
        isEqual = false;
        break;
      }
    }
    return isEqual;
  } else {
    return false;
  }
}

function flatArray(array) {
  if (Array.isArray(array)) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      if (!Array.isArray(array[i]) && typeof array[i] === 'number' && !Number.isNaN(array[i])) {
        newArray.push(array[i]);
      } else if (Array.isArray(array[i])) {
        for (var j = 0; j < array[i].length; j++) {
          if (typeof array[i][j] === 'number' && !Number.isNaN(array[i][j])) {
            newArray.push(array[i][j]);
          }
        }
      }
    }
    return newArray;
  } else {
    return false;
  }
}

function isTimeRangesIntersect(timeRange1, timeRange2) {
  if (!Array.isArray(timeRange1) && !Array.isArray(timeRange2) || timeRange1.length !== 2 ||
    timeRange2.length !== 2 || timeRange1[0] < timeRange2[0] &&
    timeRange1[1] <= timeRange2[0] || timeRange1[0] > timeRange2[
      0] && timeRange2[1] <= timeRange1[0]) return false;
  else return true;
}

function check(data, expectedType) {
  var result = false;

  if (expectedType === 'array' && Array.isArray(data)) {
    result = true;
  }

  if (expectedType === 'number' && typeof data === 'number') {
    result = true;
  }
  if (expectedType === 'string' && typeof data === 'string') {
    result = true;
  }

  if (expectedType === 'object' && data !== null && data.constructor === Object) {
    result = true;
  }

  if (expectedType === 'null' && data === null) {
    result = true;
  }

  return result;
}

function Player(tracklist) {
  if (!tracklist) this.tracks = [];
  if (tracklist && !Array.isArray(tracklist)) {
    throw new Error('Invalid tracklist');
  }
  if (tracklist) {
    for (var i = 0; i < tracklist.length; i++) {
      if (typeof tracklist[i] !== 'string') {
        throw new Error('Invalid tracklist');
      }
    }
    this.tracks = tracklist;
    this.currentTrack = tracklist[0]
  }
  this.status = 'pause';
  this.display = function() {
    if (this.tracks.length > 0) {
      return 'Track: ' + this.currentTrack + ' Status: ' + this.status;
    } else {
      return 'Tracklist empty';
    }
  };
  this.play = function() {
    if (this.tracks.length > 0) this.status = 'play';
  };
  this.pause = function() {
    if (this.tracks.length > 0) this.status = 'pause';
  };
  this.next = function() {
    if (this.currentTrack !== this.tracks[this.tracks.length - 1]) {
      this.currentTrack = this.tracks[this.tracks.indexOf(this.currentTrack) + 1];
    } else {
      this.currentTrack = this.tracks[0];
    }
  };
  this.prev = function() {
    if (this.currentTrack != this.tracks[0]) {
      this.currentTrack = this.tracks[this.tracks.indexOf(this.currentTrack) - 1];
    } else {
      this.currentTrack = this.tracks[this.tracks.length - 1];
    }
  };
}

function Cashbox() {
  this.amount = 0;
  this.history = [];
  this.status = 'closed';
  this.open = function(incomingCash) {
    if (incomingCash < 0 || typeof incomingCash !== 'number' || Number.isNaN(incomingCash) ||
      incomingCash === Infinity || this.status === 'opened')
      return false;
    this.amount = incomingCash;
    this.status = 'opened';
  };
  this.addPayment = function(payment) {
    if (typeof payment !== 'object' || typeof payment.amount !== 'number' || Number.isNaN(
        payment.amount) || payment.amount === Infinity || payment.amount <= 0 || typeof payment
      .info !== 'string' || payment.info.trim().length === 0 || this.status === 'closed') return false;
    this.amount += payment.amount;
    this.history.push({ time: new Date(), info: payment.info.trim(), amount: payment.amount });
  };
  this.refundPayment = function(refund) {
    if (typeof refund !== 'object' || typeof refund.amount !== 'number' || Number.isNaN(
        refund.amount) || refund.amount === Infinity || refund.amount <= 0 || typeof refund
      .info !== 'string' || refund.info.trim().length === 0 || refund.amount > this.amount ||
      this.status === 'closed')
      return false;
    this.amount -= refund.amount;
    this.history.push({ time: new Date(), info: refund.info.trim(), amount: refund.amount });
  };
};