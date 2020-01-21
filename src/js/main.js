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

var tracks = ['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3', 'song5.mp3'];
var Player = {
  currentTrack: tracks[0],
  status: 'pause',
  display: function() {
    return 'Track: ' + this.currentTrack + ' Status: ' + this.status;
  },
  play: function() {
    this.status = 'play';
  },
  pause: function() {
    this.status = 'pause';
  },
  next: function() {
    if (this.currentTrack != tracks[tracks.length - 1]) {
      this.currentTrack = tracks[tracks.indexOf(this.currentTrack) + 1];
    } else {
      this.currentTrack = tracks[0];
    }
  },
  prev: function() {
    if (this.currentTrack != tracks[0]) {
      this.currentTrack = tracks[tracks.indexOf(this.currentTrack) - 1];
    } else {
      this.currentTrack = tracks[tracks.length - 1];
    }
  }
};

var cashbox = {
  amount: 0,
  history: [],
  status: 'closed',
  open: function(incomingCash) {
    if (incomingCash < 0 || typeof incomingCash !== 'number' || Number.isNaN(incomingCash) ||
      incomingCash === Infinity || this.status === 'opened')
      return false;
    this.amount = incomingCash;
    this.status = 'opened';
  },
  addPayment: function(payment) {
    if (typeof payment !== 'object' || typeof payment.amount !== 'number' || Number.isNaN(
        payment.amount) || payment.amount === Infinity || payment.amount <= 0 || typeof payment
      .info !== 'string' || payment.info.trim().length === 0 || this.status === 'closed') return false;
    this.amount += payment.amount;
    this.history.push({ time: new Date(), info: payment.info.trim(), amount: payment.amount });
  },
  refundPayment: function(refund) {
    if (typeof refund !== 'object' || typeof refund.amount !== 'number' || Number.isNaN(
        refund.amount) || refund.amount === Infinity || refund.amount <= 0 || typeof refund
      .info !== 'string' || refund.info.trim().length === 0 || refund.amount > this.amount ||
      this.status === 'closed')
      return false;
    this.amount -= refund.amount;
    this.history.push({ time: new Date(), info: refund.info.trim(), amount: refund.amount });
  },
};